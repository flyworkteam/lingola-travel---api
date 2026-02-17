const { query } = require('../config/database');
const { successResponse, errorResponse } = require('../utils/response');

/**
 * GET /api/v1/lessons/:id
 * Get lesson details with vocabulary
 */
const getLessonById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    // Get lesson details
    let lessonSql, lessonParams;
    
    if (userId) {
      lessonSql = `
        SELECT 
          l.*,
          c.title as course_title,
          c.category as course_category,
          c.is_free as course_is_free,
          c.target_language as course_target_language,
          c.image_url as course_image_url,
          CASE 
            WHEN ulp.completed = 1 THEN 'completed'
            WHEN ulp.current_step > 1 THEN 'in_progress'
            ELSE 'not_started'
          END as user_status,
          CASE 
            WHEN ulp.completed = 1 THEN 100
            WHEN ulp.current_step > 0 THEN ROUND((ulp.current_step / l.total_steps) * 100)
            ELSE 0
          END as user_progress,
          IFNULL(ulp.current_step, 0) as current_step,
          IFNULL(ulp.score, 0) as score,
          IFNULL(ulp.xp_earned, 0) as xp_earned,
          ulp.completed_at as completed_at
        FROM lessons l
        INNER JOIN courses c ON l.course_id = c.id
        LEFT JOIN user_lesson_progress ulp ON l.id = ulp.lesson_id AND ulp.user_id = ?
        WHERE l.id = ?
      `;
      lessonParams = [userId, id];
    } else {
      lessonSql = `
        SELECT 
          l.*,
          c.title as course_title,
          c.category as course_category,
          c.is_free as course_is_free,
          c.target_language as course_target_language,
          c.image_url as course_image_url,
          'not_started' as user_status,
          0 as user_progress,
          0 as current_step,
          0 as score,
          0 as xp_earned,
          NULL as completed_at
        FROM lessons l
        INNER JOIN courses c ON l.course_id = c.id
        WHERE l.id = ?
      `;
      lessonParams = [id];
    }

    const lessons = await query(lessonSql, lessonParams);

    if (lessons.length === 0) {
      return res.status(404).json(errorResponse('NOT_FOUND', 'Ders bulunamadı'));
    }

    const lesson = lessons[0];

    // Check if user has premium access (course-level check)
    if (lesson.course_is_free === 0 && userId) {
      const userSql = 'SELECT is_premium, trial_started_at FROM users WHERE id = ?';
      const users = await query(userSql, [userId]);
      
      if (users.length > 0) {
        const user = users[0];
        const trialEnded = user.trial_started_at && 
          (new Date() - new Date(user.trial_started_at)) > (24 * 60 * 60 * 1000);
        
        if (!user.is_premium && trialEnded) {
          return res.status(403).json(errorResponse('PREMIUM_REQUIRED', 'Bu ders premium üyelik gerektirir'));
        }
      }
    }

    // Get vocabulary for this lesson
    const vocabSql = `
      SELECT 
        id,
        term,
        definition,
        icon_path,
        icon_color,
        audio_url,
        display_order
      FROM lesson_vocabulary
      WHERE lesson_id = ?
      ORDER BY display_order ASC
    `;

    const vocabulary = await query(vocabSql, [id]);

    res.json(successResponse({
      lesson: {
        ...lesson,
        vocabulary
      }
    }));
  } catch (error) {
    console.error('Get lesson error:', error);
    next(error);
  }
};

/**
 * POST /api/v1/lessons/:id/progress
 * Update lesson progress
 */
const updateLessonProgress = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { current_step, completed, score, xp_earned } = req.body;

    // Check if lesson exists
    const lessonSql = 'SELECT id, course_id, total_steps FROM lessons WHERE id = ?';
    const lessons = await query(lessonSql, [id]);

    if (lessons.length === 0) {
      return res.status(404).json(errorResponse('NOT_FOUND', 'Ders bulunamadı'));
    }

    const lesson = lessons[0];

    // Check if progress record exists
    const existingSql = 'SELECT id FROM user_lesson_progress WHERE user_id = ? AND lesson_id = ?';
    const existing = await query(existingSql, [userId, id]);

    if (existing.length > 0) {
      // Update existing progress
      const updateSql = `
        UPDATE user_lesson_progress 
        SET current_step = COALESCE(?, current_step),
            completed = COALESCE(?, completed),
            score = COALESCE(?, score),
            xp_earned = COALESCE(?, xp_earned),
            completed_at = CASE 
              WHEN COALESCE(?, completed) = 1 AND completed_at IS NULL THEN NOW() 
              ELSE completed_at 
            END,
            updated_at = NOW()
        WHERE id = ?
      `;
      await query(updateSql, [
        current_step, 
        completed, 
        score, 
        xp_earned, 
        completed, 
        existing[0].id
      ]);
    } else {
      // Insert new progress
      const insertSql = `
        INSERT INTO user_lesson_progress (
          user_id, 
          lesson_id, 
          current_step, 
          completed, 
          score, 
          xp_earned, 
          completed_at
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;
      const completedAt = completed ? new Date() : null;
      await query(insertSql, [
        userId, 
        id, 
        current_step || 1, 
        completed || 0, 
        score || 0, 
        xp_earned || 0, 
        completedAt
      ]);
    }

    // Update course progress
    const courseId = lesson.course_id;
    await updateCourseProgress(userId, courseId);

    res.json(successResponse({ message: 'İlerleme kaydedildi' }));
  } catch (error) {
    console.error('Update lesson progress error:', error);
    next(error);
  }
};

/**
 * POST /api/v1/lessons/:id/complete
 * Mark lesson as completed
 */
const completeLesson = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { time_spent_seconds = 0 } = req.body;

    // Check if lesson exists
    const lessonSql = 'SELECT id, course_id FROM lessons WHERE id = ?';
    const lessons = await query(lessonSql, [id]);

    if (lessons.length === 0) {
      return res.status(404).json(errorResponse('NOT_FOUND', 'Ders bulunamadı'));
    }

    const courseId = lessons[0].course_id;

    // Check if already completed
    const existingSql = 'SELECT id, status FROM user_lesson_progress WHERE user_id = ? AND lesson_id = ?';
    const existing = await query(existingSql, [userId, id]);

    if (existing.length > 0) {
      // Update to completed
      const updateSql = `
        UPDATE user_lesson_progress 
        SET status = 'completed', 
            progress_percentage = 100,
            time_spent_seconds = time_spent_seconds + ?,
            completed_at = NOW(),
            last_accessed_at = NOW()
        WHERE id = ?
      `;
      await query(updateSql, [time_spent_seconds, existing[0].id]);
    } else {
      // Insert as completed
      const insertSql = `
        INSERT INTO user_lesson_progress (user_id, lesson_id, status, progress_percentage, time_spent_seconds, completed_at, last_accessed_at)
        VALUES (?, ?, 'completed', 100, ?, NOW(), NOW())
      `;
      await query(insertSql, [userId, id, time_spent_seconds]);
    }

    // Update course progress
    await updateCourseProgress(userId, courseId);

    // Update user stats
    await updateUserStats(userId, time_spent_seconds);

    res.json(successResponse({ message: 'Ders tamamlandı', xp_earned: 10 }));
  } catch (error) {
    console.error('Complete lesson error:', error);
    next(error);
  }
};

/**
 * Helper: Update course progress based on completed lessons
 */
async function updateCourseProgress(userId, courseId) {
  const sql = `
    SELECT COUNT(*) as total_lessons,
           SUM(CASE WHEN ulp.status = 'completed' THEN 1 ELSE 0 END) as lessons_completed
    FROM lessons l
    LEFT JOIN user_lesson_progress ulp ON l.id = ulp.lesson_id AND ulp.user_id = ?
    WHERE l.course_id = ?
  `;
  
  const results = await query(sql, [userId, courseId]);
  const { total_lessons, lessons_completed } = results[0];
  const progressPercentage = total_lessons > 0 ? (lessons_completed / total_lessons) * 100 : 0;

  const existingSql = 'SELECT id FROM user_course_progress WHERE user_id = ? AND course_id = ?';
  const existing = await query(existingSql, [userId, courseId]);

  if (existing.length > 0) {
    const updateSql = `
      UPDATE user_course_progress 
      SET lessons_completed = ?, progress_percentage = ?, last_accessed_at = NOW()
      WHERE id = ?
    `;
    await query(updateSql, [lessons_completed, progressPercentage, existing[0].id]);
  } else {
    const insertSql = `
      INSERT INTO user_course_progress (user_id, course_id, lessons_completed, progress_percentage, last_accessed_at)
      VALUES (?, ?, ?, ?, NOW())
    `;
    await query(insertSql, [userId, courseId, lessons_completed, progressPercentage]);
  }
}

/**
 * Helper: Update user stats (total time, lessons completed)
 */
async function updateUserStats(userId, timeSpentSeconds) {
  const existingSql = 'SELECT id FROM user_stats WHERE user_id = ?';
  const existing = await query(existingSql, [userId]);

  if (existing.length > 0) {
    const updateSql = `
      UPDATE user_stats 
      SET total_study_time_minutes = total_study_time_minutes + ?,
          lessons_completed = lessons_completed + 1,
          updated_at = NOW()
      WHERE id = ?
    `;
    await query(updateSql, [Math.floor(timeSpentSeconds / 60), existing[0].id]);
  } else {
    const insertSql = `
      INSERT INTO user_stats (user_id, total_study_time_minutes, lessons_completed)
      VALUES (?, ?, 1)
    `;
    await query(insertSql, [userId, Math.floor(timeSpentSeconds / 60)]);
  }
}

module.exports = {
  getLessonById,
  updateLessonProgress,
  completeLesson
};
