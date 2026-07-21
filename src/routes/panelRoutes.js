const express = require('express');
const crypto = require('crypto');
const { query } = require('../config/database');
const panelAuth = require('../middleware/panelAuth');

const router = express.Router();
router.use(panelAuth);

function positiveInt(value, fallback, max = 100) {
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed) || parsed < 1) return fallback;
  return Math.min(parsed, max);
}

function likeTerm(value) {
  return `%${String(value || '').trim()}%`;
}

function pagination(page, limit, total) {
  return { page, limit, total, totalPages: Math.max(1, Math.ceil(total / limit)) };
}

function cleanString(value, { allowEmpty = false } = {}) {
  if (value === undefined || value === null) return null;
  const trimmed = String(value).trim();
  if (!trimmed && !allowEmpty) return null;
  return trimmed;
}

function newId() {
  return crypto.randomUUID();
}

function mapUser(row) {
  return {
    id: row.id,
    authId: row.email || row.device_id || row.id,
    displayName: row.name || row.email || `Kullanıcı #${row.id}`,
    email: row.email,
    photoUrl: row.photo_url,
    status: 'active',
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    lastLoginAt: row.last_login_at,
    extras: {
      authProvider: row.auth_provider,
      isPremium: row.is_premium === 1 || row.is_premium === true,
      isAnonymous: row.is_anonymous === 1 || row.is_anonymous === true,
      lessonProgress: Number(row.lesson_progress || 0),
      courseProgress: Number(row.course_progress || 0),
    },
  };
}

function mapCourse(row) {
  return {
    id: row.id,
    category: row.category,
    title: row.title,
    description: row.description,
    imageUrl: row.image_url,
    displayOrder: Number(row.display_order || 0),
    isFree: row.is_free === 1 || row.is_free === true,
    totalLessons: Number(row.total_lessons || 0),
    targetLanguage: row.target_language,
    lessonCount: Number(row.lesson_count || 0),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function mapLesson(row) {
  return {
    id: row.id,
    courseId: row.course_id,
    courseTitle: row.course_title || null,
    title: row.title,
    description: row.description,
    lessonOrder: Number(row.lesson_order || 0),
    totalSteps: Number(row.total_steps || 10),
    imageUrl: row.image_url,
    audioUrl: row.audio_url,
    targetLanguage: row.target_language,
    exampleSentence: row.example_sentence,
    keyVocabularyTerm: row.key_vocabulary_term,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function mapPhrase(row) {
  return {
    id: row.id,
    category: row.category,
    phraseType: row.phrase_type,
    englishText: row.english_text,
    translation: row.translation,
    audioUrl: row.audio_url,
    displayOrder: row.display_order,
    sourceLanguage: row.source_language,
    targetLanguage: row.target_language,
    createdAt: row.created_at,
  };
}

router.get('/health', (_req, res) => res.json({ ok: true, service: 'lingolatravel-panel' }));

router.get('/options', async (_req, res) => {
  try {
    const categories = await query(
      'SELECT DISTINCT category FROM courses ORDER BY category ASC'
    );
    const phraseCategories = await query(
      'SELECT DISTINCT category FROM travel_phrases ORDER BY category ASC LIMIT 200'
    );
    const courses = await query(
      'SELECT id, title, target_language FROM courses ORDER BY display_order ASC, title ASC'
    );
    return res.json({
      ok: true,
      data: {
        languages: ['en', 'de', 'it', 'fr', 'ja', 'es', 'ru', 'tr', 'ko', 'hi', 'pt'],
        courseCategories: categories.map((r) => r.category),
        phraseCategories: phraseCategories.map((r) => r.category),
        phraseTypes: ['question', 'statement', 'response'],
        courses: courses.map((r) => ({
          id: r.id,
          title: r.title,
          targetLanguage: r.target_language,
        })),
      },
    });
  } catch (error) {
    console.error('Lingola Travel panel options error:', error);
    return res.status(500).json({ ok: false, error: 'Seçenekler alınamadı.' });
  }
});

router.get('/analyse', async (_req, res) => {
  try {
    const [userTotals] = await query(`
      SELECT
        COUNT(*) AS totalUsers,
        SUM(CASE WHEN COALESCE(is_premium, 0) = 1 THEN 1 ELSE 0 END) AS premiumUsers,
        SUM(CASE WHEN DATE(created_at) = CURDATE() THEN 1 ELSE 0 END) AS newUsersToday
      FROM users
    `);

    const [catalog] = await query(`
      SELECT
        (SELECT COUNT(*) FROM courses) AS totalCourses,
        (SELECT COUNT(*) FROM lessons) AS totalLessons,
        (SELECT COUNT(*) FROM travel_phrases) AS totalPhrases
    `);

    const daily = await query(`
      SELECT DATE(created_at) AS date, COUNT(*) AS newUsers
      FROM users
      WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 13 DAY)
      GROUP BY DATE(created_at)
      ORDER BY date ASC
    `);

    const languageRows = await query(`
      SELECT target_language AS label, COUNT(*) AS count
      FROM courses
      GROUP BY target_language
      ORDER BY count DESC
    `);

    return res.json({
      ok: true,
      contractVersion: 1,
      timezone: 'Europe/Istanbul',
      summary: {
        totalUsers: Number(userTotals?.totalUsers || 0),
        premiumUsers: Number(userTotals?.premiumUsers || 0),
        newUsersToday: Number(userTotals?.newUsersToday || 0),
        totalCourses: Number(catalog?.totalCourses || 0),
        totalLessons: Number(catalog?.totalLessons || 0),
        totalPhrases: Number(catalog?.totalPhrases || 0),
      },
      daily: daily.map((row) => ({
        date: row.date,
        newUsers: Number(row.newUsers || 0),
      })),
      insights: {
        premiumSplit: [
          { label: 'Premium', count: Number(userTotals?.premiumUsers || 0) },
          {
            label: 'Ücretsiz',
            count: Math.max(Number(userTotals?.totalUsers || 0) - Number(userTotals?.premiumUsers || 0), 0),
          },
        ],
        courseLanguages: languageRows,
      },
    });
  } catch (error) {
    console.error('Lingola Travel panel analyse error:', error);
    return res.status(500).json({ ok: false, error: 'Analiz verisi alınamadı.' });
  }
});

router.get('/users', async (req, res) => {
  try {
    const page = positiveInt(req.query.page, 1);
    const limit = positiveInt(req.query.limit, 20);
    const offset = (page - 1) * limit;
    const search = cleanString(req.query.search);
    const premium = cleanString(req.query.premium);

    const where = ['1=1'];
    const params = [];
    if (search) {
      where.push('(u.email LIKE ? OR u.name LIKE ? OR u.id LIKE ?)');
      const term = likeTerm(search);
      params.push(term, term, term);
    }
    if (premium === '1' || premium === 'true') where.push('COALESCE(u.is_premium, 0) = 1');
    if (premium === '0' || premium === 'false') where.push('COALESCE(u.is_premium, 0) = 0');
    const whereSql = `WHERE ${where.join(' AND ')}`;

    const countRows = await query(`SELECT COUNT(*) AS total FROM users u ${whereSql}`, params);
    const total = Number(countRows[0]?.total || 0);

    const rows = await query(
      `SELECT u.*,
        (SELECT COUNT(*) FROM user_lesson_progress ulp WHERE ulp.user_id = u.id) AS lesson_progress,
        (SELECT COUNT(*) FROM user_course_progress ucp WHERE ucp.user_id = u.id) AS course_progress
       FROM users u
       ${whereSql}
       ORDER BY u.created_at DESC
       LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    );

    return res.json({
      ok: true,
      data: rows.map(mapUser),
      pagination: pagination(page, limit, total),
    });
  } catch (error) {
    console.error('Lingola Travel panel users error:', error);
    return res.status(500).json({ ok: false, error: 'Kullanıcılar alınamadı.' });
  }
});

router.patch('/users/:userId', async (req, res) => {
  try {
    const userId = cleanString(req.params.userId);
    const exists = await query('SELECT id FROM users WHERE id = ? LIMIT 1', [userId]);
    if (!exists.length) return res.status(404).json({ ok: false, error: 'Kullanıcı bulunamadı.' });

    const sets = [];
    const params = [];
    if (req.body?.isPremium !== undefined) {
      sets.push('is_premium = ?');
      params.push(req.body.isPremium ? 1 : 0);
    }
    if (!sets.length) return res.status(400).json({ ok: false, error: 'Güncellenecek alan yok.' });

    params.push(userId);
    await query(`UPDATE users SET ${sets.join(', ')}, updated_at = NOW() WHERE id = ?`, params);

    const rows = await query('SELECT * FROM users WHERE id = ? LIMIT 1', [userId]);
    return res.json({ ok: true, data: mapUser(rows[0]), message: 'Kullanıcı güncellendi.' });
  } catch (error) {
    console.error('Lingola Travel panel user patch error:', error);
    return res.status(500).json({ ok: false, error: 'Kullanıcı güncellenemedi.' });
  }
});

router.get('/courses', async (req, res) => {
  try {
    const page = positiveInt(req.query.page, 1);
    const limit = positiveInt(req.query.limit, 20);
    const offset = (page - 1) * limit;
    const search = cleanString(req.query.search);
    const language = cleanString(req.query.language);
    const category = cleanString(req.query.category);

    const where = ['1=1'];
    const params = [];
    if (search) {
      where.push('(c.title LIKE ? OR c.category LIKE ? OR c.description LIKE ?)');
      const term = likeTerm(search);
      params.push(term, term, term);
    }
    if (language) {
      where.push('c.target_language = ?');
      params.push(language);
    }
    if (category) {
      where.push('c.category = ?');
      params.push(category);
    }
    const whereSql = `WHERE ${where.join(' AND ')}`;

    const countRows = await query(`SELECT COUNT(*) AS total FROM courses c ${whereSql}`, params);
    const total = Number(countRows[0]?.total || 0);

    const rows = await query(
      `SELECT c.*, (SELECT COUNT(*) FROM lessons l WHERE l.course_id = c.id) AS lesson_count
       FROM courses c
       ${whereSql}
       ORDER BY c.display_order ASC, c.title ASC
       LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    );

    return res.json({ ok: true, data: rows.map(mapCourse), pagination: pagination(page, limit, total) });
  } catch (error) {
    console.error('Lingola Travel panel courses error:', error);
    return res.status(500).json({ ok: false, error: 'Kurslar alınamadı.' });
  }
});

router.get('/courses/:courseId', async (req, res) => {
  try {
    const courseId = cleanString(req.params.courseId);
    const rows = await query(
      `SELECT c.*, (SELECT COUNT(*) FROM lessons l WHERE l.course_id = c.id) AS lesson_count
       FROM courses c WHERE c.id = ? LIMIT 1`,
      [courseId]
    );
    if (!rows.length) return res.status(404).json({ ok: false, error: 'Kurs bulunamadı.' });
    return res.json({ ok: true, data: mapCourse(rows[0]) });
  } catch (error) {
    return res.status(500).json({ ok: false, error: 'Kurs alınamadı.' });
  }
});

router.post('/courses', async (req, res) => {
  try {
    const body = req.body || {};
    const title = cleanString(body.title);
    const category = cleanString(body.category);
    if (!title || !category) {
      return res.status(400).json({ ok: false, error: 'Başlık ve kategori zorunlu.' });
    }
    const id = cleanString(body.id) || newId();
    await query(
      `INSERT INTO courses (id, category, title, description, image_url, display_order, is_free, total_lessons, target_language)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        category,
        title,
        cleanString(body.description, { allowEmpty: true }),
        cleanString(body.imageUrl, { allowEmpty: true }),
        Number(body.displayOrder) || 0,
        body.isFree ? 1 : 0,
        Number(body.totalLessons) || 12,
        cleanString(body.targetLanguage) || 'en',
      ]
    );
    const rows = await query('SELECT * FROM courses WHERE id = ? LIMIT 1', [id]);
    return res.status(201).json({ ok: true, data: mapCourse(rows[0]), message: 'Kurs eklendi.' });
  } catch (error) {
    console.error('Lingola Travel panel course create error:', error);
    return res.status(500).json({ ok: false, error: 'Kurs eklenemedi.' });
  }
});

router.patch('/courses/:courseId', async (req, res) => {
  try {
    const courseId = cleanString(req.params.courseId);
    const exists = await query('SELECT id FROM courses WHERE id = ? LIMIT 1', [courseId]);
    if (!exists.length) return res.status(404).json({ ok: false, error: 'Kurs bulunamadı.' });

    const body = req.body || {};
    const sets = [];
    const params = [];
    const fields = [
      ['category', 'category'],
      ['title', 'title'],
      ['description', 'description'],
      ['imageUrl', 'image_url'],
      ['targetLanguage', 'target_language'],
    ];
    for (const [key, column] of fields) {
      if (body[key] !== undefined) {
        sets.push(`${column} = ?`);
        params.push(cleanString(body[key], { allowEmpty: true }));
      }
    }
    if (body.displayOrder !== undefined) {
      sets.push('display_order = ?');
      params.push(Number(body.displayOrder) || 0);
    }
    if (body.totalLessons !== undefined) {
      sets.push('total_lessons = ?');
      params.push(Number(body.totalLessons) || 0);
    }
    if (body.isFree !== undefined) {
      sets.push('is_free = ?');
      params.push(body.isFree ? 1 : 0);
    }
    if (!sets.length) return res.status(400).json({ ok: false, error: 'Güncellenecek alan yok.' });

    params.push(courseId);
    await query(`UPDATE courses SET ${sets.join(', ')}, updated_at = NOW() WHERE id = ?`, params);
    const rows = await query('SELECT * FROM courses WHERE id = ? LIMIT 1', [courseId]);
    return res.json({ ok: true, data: mapCourse(rows[0]), message: 'Kurs güncellendi.' });
  } catch (error) {
    return res.status(500).json({ ok: false, error: 'Kurs güncellenemedi.' });
  }
});

router.delete('/courses/:courseId', async (req, res) => {
  try {
    const courseId = cleanString(req.params.courseId);
    const exists = await query('SELECT id FROM courses WHERE id = ? LIMIT 1', [courseId]);
    if (!exists.length) return res.status(404).json({ ok: false, error: 'Kurs bulunamadı.' });
    await query('DELETE FROM courses WHERE id = ?', [courseId]);
    return res.json({ ok: true, message: 'Kurs silindi.' });
  } catch (error) {
    return res.status(500).json({ ok: false, error: 'Kurs silinemedi.' });
  }
});

router.get('/lessons', async (req, res) => {
  try {
    const page = positiveInt(req.query.page, 1);
    const limit = positiveInt(req.query.limit, 20);
    const offset = (page - 1) * limit;
    const search = cleanString(req.query.search);
    const courseId = cleanString(req.query.courseId);

    const where = ['1=1'];
    const params = [];
    if (search) {
      where.push('(l.title LIKE ? OR l.description LIKE ? OR c.title LIKE ?)');
      const term = likeTerm(search);
      params.push(term, term, term);
    }
    if (courseId) {
      where.push('l.course_id = ?');
      params.push(courseId);
    }
    const whereSql = `WHERE ${where.join(' AND ')}`;

    const countRows = await query(
      `SELECT COUNT(*) AS total FROM lessons l LEFT JOIN courses c ON c.id = l.course_id ${whereSql}`,
      params
    );
    const total = Number(countRows[0]?.total || 0);

    const rows = await query(
      `SELECT l.*, c.title AS course_title
       FROM lessons l
       LEFT JOIN courses c ON c.id = l.course_id
       ${whereSql}
       ORDER BY l.course_id ASC, l.lesson_order ASC
       LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    );

    return res.json({ ok: true, data: rows.map(mapLesson), pagination: pagination(page, limit, total) });
  } catch (error) {
    return res.status(500).json({ ok: false, error: 'Dersler alınamadı.' });
  }
});

router.get('/lessons/:lessonId', async (req, res) => {
  try {
    const lessonId = cleanString(req.params.lessonId);
    const rows = await query(
      `SELECT l.*, c.title AS course_title
       FROM lessons l LEFT JOIN courses c ON c.id = l.course_id
       WHERE l.id = ? LIMIT 1`,
      [lessonId]
    );
    if (!rows.length) return res.status(404).json({ ok: false, error: 'Ders bulunamadı.' });
    return res.json({ ok: true, data: mapLesson(rows[0]) });
  } catch (error) {
    return res.status(500).json({ ok: false, error: 'Ders alınamadı.' });
  }
});

router.post('/lessons', async (req, res) => {
  try {
    const body = req.body || {};
    const title = cleanString(body.title);
    const courseId = cleanString(body.courseId);
    if (!title || !courseId) {
      return res.status(400).json({ ok: false, error: 'Başlık ve kurs zorunlu.' });
    }
    const id = cleanString(body.id) || newId();
    await query(
      `INSERT INTO lessons (id, course_id, title, description, lesson_order, total_steps, image_url, audio_url, target_language, example_sentence, key_vocabulary_term)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        courseId,
        title,
        cleanString(body.description, { allowEmpty: true }),
        Number(body.lessonOrder) || 1,
        Number(body.totalSteps) || 10,
        cleanString(body.imageUrl, { allowEmpty: true }),
        cleanString(body.audioUrl, { allowEmpty: true }),
        cleanString(body.targetLanguage) || 'en',
        cleanString(body.exampleSentence, { allowEmpty: true }),
        cleanString(body.keyVocabularyTerm, { allowEmpty: true }),
      ]
    );
    const rows = await query(
      `SELECT l.*, c.title AS course_title FROM lessons l LEFT JOIN courses c ON c.id = l.course_id WHERE l.id = ?`,
      [id]
    );
    return res.status(201).json({ ok: true, data: mapLesson(rows[0]), message: 'Ders eklendi.' });
  } catch (error) {
    return res.status(500).json({ ok: false, error: 'Ders eklenemedi.' });
  }
});

router.patch('/lessons/:lessonId', async (req, res) => {
  try {
    const lessonId = cleanString(req.params.lessonId);
    const exists = await query('SELECT id FROM lessons WHERE id = ? LIMIT 1', [lessonId]);
    if (!exists.length) return res.status(404).json({ ok: false, error: 'Ders bulunamadı.' });

    const body = req.body || {};
    const sets = [];
    const params = [];
    const fields = [
      ['courseId', 'course_id'],
      ['title', 'title'],
      ['description', 'description'],
      ['imageUrl', 'image_url'],
      ['audioUrl', 'audio_url'],
      ['targetLanguage', 'target_language'],
      ['exampleSentence', 'example_sentence'],
      ['keyVocabularyTerm', 'key_vocabulary_term'],
    ];
    for (const [key, column] of fields) {
      if (body[key] !== undefined) {
        sets.push(`${column} = ?`);
        params.push(cleanString(body[key], { allowEmpty: true }));
      }
    }
    if (body.lessonOrder !== undefined) {
      sets.push('lesson_order = ?');
      params.push(Number(body.lessonOrder) || 0);
    }
    if (body.totalSteps !== undefined) {
      sets.push('total_steps = ?');
      params.push(Number(body.totalSteps) || 0);
    }
    if (!sets.length) return res.status(400).json({ ok: false, error: 'Güncellenecek alan yok.' });

    params.push(lessonId);
    await query(`UPDATE lessons SET ${sets.join(', ')}, updated_at = NOW() WHERE id = ?`, params);
    const rows = await query(
      `SELECT l.*, c.title AS course_title FROM lessons l LEFT JOIN courses c ON c.id = l.course_id WHERE l.id = ?`,
      [lessonId]
    );
    return res.json({ ok: true, data: mapLesson(rows[0]), message: 'Ders güncellendi.' });
  } catch (error) {
    return res.status(500).json({ ok: false, error: 'Ders güncellenemedi.' });
  }
});

router.delete('/lessons/:lessonId', async (req, res) => {
  try {
    const lessonId = cleanString(req.params.lessonId);
    const exists = await query('SELECT id FROM lessons WHERE id = ? LIMIT 1', [lessonId]);
    if (!exists.length) return res.status(404).json({ ok: false, error: 'Ders bulunamadı.' });
    await query('DELETE FROM lessons WHERE id = ?', [lessonId]);
    return res.json({ ok: true, message: 'Ders silindi.' });
  } catch (error) {
    return res.status(500).json({ ok: false, error: 'Ders silinemedi.' });
  }
});

router.get('/phrases', async (req, res) => {
  try {
    const page = positiveInt(req.query.page, 1);
    const limit = positiveInt(req.query.limit, 20);
    const offset = (page - 1) * limit;
    const search = cleanString(req.query.search);
    const category = cleanString(req.query.category);
    const language = cleanString(req.query.language);

    const where = ['1=1'];
    const params = [];
    if (search) {
      where.push('(english_text LIKE ? OR translation LIKE ? OR category LIKE ?)');
      const term = likeTerm(search);
      params.push(term, term, term);
    }
    if (category) {
      where.push('category = ?');
      params.push(category);
    }
    if (language) {
      where.push('target_language = ?');
      params.push(language);
    }
    const whereSql = `WHERE ${where.join(' AND ')}`;

    const countRows = await query(`SELECT COUNT(*) AS total FROM travel_phrases ${whereSql}`, params);
    const total = Number(countRows[0]?.total || 0);

    const rows = await query(
      `SELECT * FROM travel_phrases ${whereSql} ORDER BY category ASC, display_order ASC, created_at DESC LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    );

    return res.json({ ok: true, data: rows.map(mapPhrase), pagination: pagination(page, limit, total) });
  } catch (error) {
    return res.status(500).json({ ok: false, error: 'İfadeler alınamadı.' });
  }
});

router.post('/phrases', async (req, res) => {
  try {
    const body = req.body || {};
    const englishText = cleanString(body.englishText);
    const translation = cleanString(body.translation);
    const category = cleanString(body.category);
    if (!englishText || !translation || !category) {
      return res.status(400).json({ ok: false, error: 'Kategori, İngilizce metin ve çeviri zorunlu.' });
    }
    const id = cleanString(body.id) || newId();
    await query(
      `INSERT INTO travel_phrases (id, category, phrase_type, english_text, translation, audio_url, display_order, source_language, target_language)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        category,
        cleanString(body.phraseType) || 'question',
        englishText,
        translation,
        cleanString(body.audioUrl, { allowEmpty: true }),
        Number(body.displayOrder) || 0,
        cleanString(body.sourceLanguage) || 'tr',
        cleanString(body.targetLanguage) || 'en',
      ]
    );
    const rows = await query('SELECT * FROM travel_phrases WHERE id = ? LIMIT 1', [id]);
    return res.status(201).json({ ok: true, data: mapPhrase(rows[0]), message: 'İfade eklendi.' });
  } catch (error) {
    return res.status(500).json({ ok: false, error: 'İfade eklenemedi.' });
  }
});

router.patch('/phrases/:phraseId', async (req, res) => {
  try {
    const phraseId = cleanString(req.params.phraseId);
    const exists = await query('SELECT id FROM travel_phrases WHERE id = ? LIMIT 1', [phraseId]);
    if (!exists.length) return res.status(404).json({ ok: false, error: 'İfade bulunamadı.' });

    const body = req.body || {};
    const sets = [];
    const params = [];
    const fields = [
      ['category', 'category'],
      ['phraseType', 'phrase_type'],
      ['englishText', 'english_text'],
      ['translation', 'translation'],
      ['audioUrl', 'audio_url'],
      ['sourceLanguage', 'source_language'],
      ['targetLanguage', 'target_language'],
    ];
    for (const [key, column] of fields) {
      if (body[key] !== undefined) {
        sets.push(`${column} = ?`);
        params.push(cleanString(body[key], { allowEmpty: true }));
      }
    }
    if (body.displayOrder !== undefined) {
      sets.push('display_order = ?');
      params.push(Number(body.displayOrder) || 0);
    }
    if (!sets.length) return res.status(400).json({ ok: false, error: 'Güncellenecek alan yok.' });

    params.push(phraseId);
    await query(`UPDATE travel_phrases SET ${sets.join(', ')} WHERE id = ?`, params);
    const rows = await query('SELECT * FROM travel_phrases WHERE id = ? LIMIT 1', [phraseId]);
    return res.json({ ok: true, data: mapPhrase(rows[0]), message: 'İfade güncellendi.' });
  } catch (error) {
    return res.status(500).json({ ok: false, error: 'İfade güncellenemedi.' });
  }
});

router.delete('/phrases/:phraseId', async (req, res) => {
  try {
    const phraseId = cleanString(req.params.phraseId);
    const exists = await query('SELECT id FROM travel_phrases WHERE id = ? LIMIT 1', [phraseId]);
    if (!exists.length) return res.status(404).json({ ok: false, error: 'İfade bulunamadı.' });
    await query('DELETE FROM travel_phrases WHERE id = ?', [phraseId]);
    return res.json({ ok: true, message: 'İfade silindi.' });
  } catch (error) {
    return res.status(500).json({ ok: false, error: 'İfade silinemedi.' });
  }
});

module.exports = router;
