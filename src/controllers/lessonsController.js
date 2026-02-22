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
    const { score = 100 } = req.body;

    // Check if lesson exists
    const lessonSql = 'SELECT id, course_id, total_steps FROM lessons WHERE id = ?';
    const lessons = await query(lessonSql, [id]);

    if (lessons.length === 0) {
      return res.status(404).json(errorResponse('NOT_FOUND', 'Ders bulunamadı'));
    }

    const lesson = lessons[0];
    const courseId = lesson.course_id;

    // Check if already completed
    const existingSql = 'SELECT id FROM user_lesson_progress WHERE user_id = ? AND lesson_id = ?';
    const existing = await query(existingSql, [userId, id]);

    if (existing.length > 0) {
      // Update to completed using correct column names
      const updateSql = `
        UPDATE user_lesson_progress 
        SET completed = 1,
            current_step = ?,
            score = ?,
            xp_earned = 10,
            completed_at = CASE WHEN completed_at IS NULL THEN NOW() ELSE completed_at END,
            updated_at = NOW()
        WHERE id = ?
      `;
      await query(updateSql, [lesson.total_steps, score, existing[0].id]);
    } else {
      // Insert as completed using correct column names
      const insertSql = `
        INSERT INTO user_lesson_progress (user_id, lesson_id, completed, current_step, score, xp_earned, completed_at)
        VALUES (?, ?, 1, ?, ?, 10, NOW())
      `;
      await query(insertSql, [userId, id, lesson.total_steps, score]);
    }

    // Update course progress
    await updateCourseProgress(userId, courseId);

    // Update user stats
    await updateUserStats(userId, 0);

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
           SUM(CASE WHEN ulp.completed = 1 THEN 1 ELSE 0 END) as lessons_completed
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
async function updateUserStats(userId, timeSpentSeconds = 0) {
  try {
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

    const statsSql = 'SELECT * FROM user_stats WHERE user_id = ?';
    const statsResult = await query(statsSql, [userId]);

    if (statsResult.length === 0) {
      // First time completion
      const insertSql = `
        INSERT INTO user_stats 
        (user_id, current_streak, longest_streak, total_lessons_completed, total_xp, last_activity_date)
        VALUES (?, 1, 1, 1, 20, ?)
      `;
      await query(insertSql, [userId, today]);
    } else {
      const stats = statsResult[0];
      let { current_streak, longest_streak, total_lessons_completed, total_xp, last_activity_date } = stats;

      // Convert last_activity_date to string if it's a Date object
      if (last_activity_date instanceof Date) {
        last_activity_date = last_activity_date.toISOString().split('T')[0];
      }

      // Check streak
      if (last_activity_date === today) {
        // Already active today, don't increment streak
      } else if (last_activity_date === yesterday) {
        // Active yesterday, increment streak
        current_streak += 1;
      } else {
        // Streak broken
        current_streak = 1;
      }

      // Update longest streak
      if (current_streak > longest_streak) {
        longest_streak = current_streak;
      }

      const updateSql = `
        UPDATE user_stats 
        SET current_streak = ?,
            longest_streak = ?,
            total_lessons_completed = total_lessons_completed + 1,
            total_xp = total_xp + 20,
            last_activity_date = ?,
            updated_at = NOW()
        WHERE user_id = ?
      `;
      await query(updateSql, [current_streak, longest_streak, today, userId]);
    }
  } catch (error) {
    console.error('Update user stats error:', error);
    // Don't throw, let the lesson completion proceed
  }
}

/**
 * GET /api/v1/lessons/:id/next
 * Get next lesson after completing current one
 */
const getNextLesson = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    // Get current lesson info
    const currentLessonSql = `
      SELECT l.id, l.course_id, l.lesson_order, c.target_language, c.display_order as course_order
      FROM lessons l
      INNER JOIN courses c ON l.course_id = c.id
      WHERE l.id = ?
    `;
    const currentLessonResult = await query(currentLessonSql, [id]);

    if (currentLessonResult.length === 0) {
      return res.status(404).json(errorResponse('NOT_FOUND', 'Mevcut ders bulunamadı'));
    }

    const currentLesson = currentLessonResult[0];

    // Try to find next lesson in same course
    const nextLessonInCourseSql = `
      SELECT l.id, l.title, l.lesson_order, l.course_id, c.title as course_title, c.category
      FROM lessons l
      INNER JOIN courses c ON l.course_id = c.id
      WHERE l.course_id = ? AND l.lesson_order > ?
      ORDER BY l.lesson_order ASC
      LIMIT 1
    `;
    const nextLessonInCourse = await query(nextLessonInCourseSql, [currentLesson.course_id, currentLesson.lesson_order]);

    if (nextLessonInCourse.length > 0) {
      // Found next lesson in same course
      return res.json(successResponse({
        nextLesson: {
          ...nextLessonInCourse[0],
          transition: 'same_course'
        }
      }));
    }

    // No more lessons in current course, find next course
    const nextCourseSql = `
      SELECT c.id, c.title, c.category, c.display_order
      FROM courses c
      WHERE c.target_language = ? AND c.display_order > ?
      ORDER BY c.display_order ASC
      LIMIT 1
    `;
    const nextCourseResult = await query(nextCourseSql, [currentLesson.target_language, currentLesson.course_order]);

    if (nextCourseResult.length === 0) {
      // No more courses available
      return res.json(successResponse({
        nextLesson: null,
        message: 'Tebrikler! Tüm kursları tamamladınız! 🎉'
      }));
    }

    const nextCourse = nextCourseResult[0];

    // Get first lesson of next course
    const firstLessonSql = `
      SELECT l.id, l.title, l.lesson_order, l.course_id, c.title as course_title, c.category
      FROM lessons l
      INNER JOIN courses c ON l.course_id = c.id
      WHERE l.course_id = ?
      ORDER BY l.lesson_order ASC
      LIMIT 1
    `;
    const firstLessonResult = await query(firstLessonSql, [nextCourse.id]);

    if (firstLessonResult.length === 0) {
      // Next course has no lessons
      return res.json(successResponse({
        nextLesson: null,
        message: 'Bir sonraki kursun henüz dersleri yok'
      }));
    }

    res.json(successResponse({
      nextLesson: {
        ...firstLessonResult[0],
        transition: 'new_course'
      }
    }));
  } catch (error) {
    console.error('Get next lesson error:', error);
    next(error);
  }
};

module.exports = {
  getLessonById,
  updateLessonProgress,
  completeLesson,
  getNextLesson
};
