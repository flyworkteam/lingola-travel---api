const { query } = require('../config/database');
const { successResponse, errorResponse } = require('../utils/response');

/**
 * GET /api/v1/courses
 * Get all courses (with optional filters)
 */
const getAllCourses = async (req, res, next) => {
  try {
    const { category, is_free, language, limit = 100, offset = 0 } = req.query;
    const userId = req.user?.id;

    console.log('🔍 getAllCourses called');
    console.log('   User ID:', userId);
    console.log('   Query language param:', language);

    // Get user's target language if not provided
    let targetLanguage = language;
    if (!targetLanguage && userId) {
      const userOnboarding = await query(
        'SELECT target_language FROM user_onboarding WHERE user_id = ?',
        [userId]
      );
      console.log('   User onboarding query result:', userOnboarding);
      if (userOnboarding.length > 0) {
        targetLanguage = userOnboarding[0].target_language;
        console.log('   ✅ Found target language from user_onboarding:', targetLanguage);
      }
    }
    targetLanguage = targetLanguage || 'en';
    console.log('   📌 Final target language:', targetLanguage);

    let sql, params;

    if (userId) {
      sql = `
        SELECT 
          c.id,
          c.category,
          c.title,
          c.description,
          c.image_url,
          c.total_lessons,
          c.is_free,
          c.display_order,
          c.target_language,
          IFNULL(ucp.lessons_completed, 0) as lessons_completed,
          IFNULL(ucp.progress_percentage, 0) as progress_percentage
        FROM courses c
        LEFT JOIN user_course_progress ucp ON c.id = ucp.course_id AND ucp.user_id = ?
        WHERE c.target_language = ?
      `;
      params = [userId, targetLanguage];
    } else {
      sql = `
        SELECT 
          c.id,
          c.category,
          c.title,
          c.description,
          c.image_url,
          c.total_lessons,
          c.is_free,
          c.display_order,
          c.target_language,
          0 as lessons_completed,
          0 as progress_percentage
        FROM courses c
        WHERE c.target_language = ?
      `;
      params = [targetLanguage];
    }

    if (category) {
      sql += ' AND c.category = ?';
      params.push(category);
    }

    if (is_free !== undefined) {
      sql += ' AND c.is_free = ?';
      params.push(is_free === 'true' || is_free === '1' ? 1 : 0);
    }

    sql += ' ORDER BY c.display_order ASC, c.created_at DESC';
    
    // Add LIMIT and OFFSET without placeholders (MySQL doesn't handle them well in prepared statements)
    const safeLimit = Math.max(1, Math.min(parseInt(limit) || 100, 1000));
    const safeOffset = Math.max(0, parseInt(offset) || 0);
    sql += ` LIMIT ${safeLimit} OFFSET ${safeOffset}`;

    const courses = await query(sql, params);

    res.json(successResponse({
      courses,
      total: courses.length,
      limit: parseInt(limit),
      offset: parseInt(offset)
    }));
  } catch (error) {
    console.error('Get all courses error:', error);
    next(error);
  }
};

/**
 * GET /api/v1/courses/:id
 * Get single course with lessons
 */
const getCourseById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    // Get course details
    let courseSql, courseParams;
    
    if (userId) {
      courseSql = `
        SELECT 
          c.*,
          IFNULL(ucp.lessons_completed, 0) as lessons_completed,
          IFNULL(ucp.progress_percentage, 0) as progress_percentage,
          IFNULL(ucp.last_accessed_at, NULL) as last_accessed_at
        FROM courses c
        LEFT JOIN user_course_progress ucp ON c.id = ucp.course_id AND ucp.user_id = ?
        WHERE c.id = ?
      `;
      courseParams = [userId, id];
    } else {
      courseSql = `
        SELECT 
          c.*,
          0 as lessons_completed,
          0 as progress_percentage,
          NULL as last_accessed_at
        FROM courses c
        WHERE c.id = ?
      `;
      courseParams = [id];
    }

    const courseResult = await query(courseSql, courseParams);

    if (courseResult.length === 0) {
      return res.status(404).json(errorResponse('NOT_FOUND', 'Kurs bulunamadı'));
    }

    const course = courseResult[0];

    // Get lessons for this course
    let lessonsSql, lessonsParams;
    
    if (userId) {
      lessonsSql = `
        SELECT 
          l.id,
          l.title,
          l.description,
          l.lesson_order,
          l.image_url,
          l.audio_url,
          l.total_steps,
          CASE 
            WHEN ulp.completed = 1 THEN 'completed'
            WHEN ulp.current_step > 1 THEN 'in_progress'
            WHEN l.lesson_order = 1 THEN 'not_started'
            WHEN prev_ulp.completed = 1 THEN 'not_started'
            ELSE 'locked'
          END as user_status,
          CASE 
            WHEN ulp.completed = 1 THEN 100
            WHEN ulp.current_step > 0 THEN ROUND((ulp.current_step / l.total_steps) * 100)
            ELSE 0
          END as user_progress,
          IFNULL(ulp.current_step, 0) as current_step,
          ulp.completed_at
        FROM lessons l
        LEFT JOIN user_lesson_progress ulp ON l.id = ulp.lesson_id AND ulp.user_id = ?
        LEFT JOIN lessons prev_l ON prev_l.course_id = l.course_id AND prev_l.lesson_order = l.lesson_order - 1
        LEFT JOIN user_lesson_progress prev_ulp ON prev_l.id = prev_ulp.lesson_id AND prev_ulp.user_id = ?
        WHERE l.course_id = ?
        ORDER BY l.lesson_order ASC
      `;
      lessonsParams = [userId, userId, id];
    } else {
      lessonsSql = `
        SELECT 
          l.id,
          l.title,
          l.description,
          l.lesson_order,
          l.image_url,
          l.audio_url,
          l.total_steps,
          CASE 
            WHEN l.lesson_order = 1 THEN 'not_started'
            ELSE 'locked'
          END as user_status,
          0 as user_progress,
          0 as current_step,
          NULL as completed_at
        FROM lessons l
        WHERE l.course_id = ?
        ORDER BY l.lesson_order ASC
      `;
      lessonsParams = [id];
    }

    const lessons = await query(lessonsSql, lessonsParams);

    res.json(successResponse({
      course: {
        ...course,
        lessons
      }
    }));
  } catch (error) {
    console.error('Get course by ID error:', error);
    next(error);
  }
};

/**
 * GET /api/v1/courses/:id/lessons
 * Get all lessons for a specific course
 */
const getCourseLessons = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    // Check if course exists
    const courseSql = 'SELECT id, title FROM courses WHERE id = ?';
    const courseResult = await query(courseSql, [id]);

    if (courseResult.length === 0) {
      return res.status(404).json(errorResponse('NOT_FOUND', 'Kurs bulunamadı'));
    }

    // Get lessons for this course
    let lessonsSql, lessonsParams;
    
    if (userId) {
      lessonsSql = `
        SELECT 
          l.id,
          l.course_id,
          l.title,
          l.description,
          l.example_sentence,
          l.key_vocabulary_term,
          l.lesson_order,
          l.image_url,
          l.audio_url,
          l.total_steps,
          l.target_language,
          l.created_at,
          l.updated_at,
          CASE 
            WHEN ulp.completed = 1 THEN 'completed'
            WHEN ulp.current_step > 1 THEN 'in_progress'
            WHEN l.lesson_order = 1 THEN 'not_started'
            WHEN prev_ulp.completed = 1 THEN 'not_started'
            ELSE 'locked'
          END as user_status,
          CASE 
            WHEN ulp.completed = 1 THEN 100
            WHEN ulp.current_step > 0 THEN ROUND((ulp.current_step / l.total_steps) * 100)
            ELSE 0
          END as user_progress,
          IFNULL(ulp.current_step, 0) as current_step,
          IFNULL(ulp.score, 0) as score,
          ulp.completed_at
        FROM lessons l
        LEFT JOIN user_lesson_progress ulp ON l.id = ulp.lesson_id AND ulp.user_id = ?
        LEFT JOIN lessons prev_l ON prev_l.course_id = l.course_id AND prev_l.lesson_order = l.lesson_order - 1
        LEFT JOIN user_lesson_progress prev_ulp ON prev_l.id = prev_ulp.lesson_id AND prev_ulp.user_id = ?
        WHERE l.course_id = ?
        ORDER BY l.lesson_order ASC
      `;
      lessonsParams = [userId, userId, id];
    } else {
      lessonsSql = `
        SELECT 
          l.id,
          l.course_id,
          l.title,
          l.description,
          l.example_sentence,
          l.key_vocabulary_term,
          l.lesson_order,
          l.image_url,
          l.audio_url,
          l.total_steps,
          l.target_language,
          l.created_at,
          l.updated_at,
          'not_started' as user_status,
          0 as user_progress,
          0 as current_step,
          0 as score,
          NULL as completed_at
        FROM lessons l
        WHERE l.course_id = ?
        ORDER BY l.lesson_order ASC
      `;
      lessonsParams = [id];
    }

    const lessons = await query(lessonsSql, lessonsParams);

    res.json(successResponse({
      course_id: id,
      course_title: courseResult[0].title,
      lessons,
      total: lessons.length
    }));
  } catch (error) {
    console.error('Get course lessons error:', error);
    next(error);
  }
};

/**
 * GET /api/v1/courses/categories
 * Get all unique categories
 */
const getCategories = async (req, res, next) => {
  try {
    const sql = `
      SELECT 
        category,
        COUNT(*) as course_count,
        SUM(CASE WHEN is_free = 1 THEN 1 ELSE 0 END) as free_course_count
      FROM courses
      GROUP BY category
      ORDER BY category ASC
    `;

    const categories = await query(sql);

    res.json(successResponse({ categories }));
  } catch (error) {
    console.error('Get categories error:', error);
    next(error);
  }
};

/**
 * POST /api/v1/courses/:id/start
 * Mark course as started for user
 */
const startCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Check if course exists
    const courseSql = 'SELECT id, total_lessons FROM courses WHERE id = ?';
    const courses = await query(courseSql, [id]);

    if (courses.length === 0) {
      return res.status(404).json(errorResponse('NOT_FOUND', 'Kurs bulunamadı'));
    }

    // Check if already started
    const progressSql = 'SELECT id FROM user_course_progress WHERE user_id = ? AND course_id = ?';
    const existing = await query(progressSql, [userId, id]);

    if (existing.length > 0) {
      return res.json(successResponse({ message: 'Kurs daha önce başlatılmış' }));
    }

    // Create progress record
    const insertSql = `
      INSERT INTO user_course_progress (user_id, course_id, lessons_completed, progress_percentage, last_accessed_at)
      VALUES (?, ?, 0, 0, NOW())
    `;

    await query(insertSql, [userId, id]);

    res.json(successResponse({ message: 'Kurs başlatıldı' }));
  } catch (error) {
    console.error('Start course error:', error);
    next(error);
  }
};

module.exports = {
  getAllCourses,
  getCourseById,
  getCourseLessons,
  getCategories,
  startCourse
};
