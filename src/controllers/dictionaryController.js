const { query } = require('../config/database');
const { successResponse, errorResponse } = require('../utils/response');

/**
 * GET /api/v1/dictionary/categories
 * Get all dictionary categories
 */
const getCategories = async (req, res, next) => {
  try {
    const sql = `
      SELECT 
        dc.id,
        dc.name,
        dc.icon_path,
        dc.color,
        dc.display_order,
        COUNT(dw.id) as word_count
      FROM dictionary_categories dc
      LEFT JOIN dictionary_words dw ON dc.id = dw.category_id
      GROUP BY dc.id, dc.name, dc.icon_path, dc.color, dc.display_order
      ORDER BY dc.display_order ASC
    `;

    const categories = await query(sql);
    res.json(successResponse({ categories }));
  } catch (error) {
    console.error('Get dictionary categories error:', error);
    next(error);
  }
};

/**
 * GET /api/v1/dictionary/categories/:id/words
 * Get words by category
 */
const getWordsByCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { limit = 50, offset = 0, language } = req.query;
    const userId = req.user?.id;

    // Get user's target language if not provided
    let targetLanguage = language;
    if (!targetLanguage && userId) {
      const userOnboarding = await query(
        'SELECT target_language FROM user_onboarding WHERE user_id = ?',
        [userId]
      );
      if (userOnboarding.length > 0) {
        targetLanguage = userOnboarding[0].target_language;
      }
    }
    targetLanguage = targetLanguage || 'en';

    let sql, params;
    
    if (userId) {
      sql = `
        SELECT 
          dw.id,
          dw.word,
          dw.translation,
          dw.definition,
          dw.image_url,
          dw.audio_url,
          dw.source_language,
          dw.target_language,
          CASE WHEN b.id IS NOT NULL THEN TRUE ELSE FALSE END as is_bookmarked
        FROM dictionary_words dw
        LEFT JOIN bookmarks b ON dw.id = b.item_id AND b.user_id = ? AND b.item_type = 'dictionary_word'
        WHERE dw.category_id = ? AND dw.target_language = ?
        ORDER BY dw.word ASC
      `;
      params = [userId, id, targetLanguage];
    } else {
      sql = `
        SELECT 
          dw.id,
          dw.word,
          dw.translation,
          dw.definition,
          dw.image_url,
          dw.audio_url,
          dw.source_language,
          dw.target_language,
          FALSE as is_bookmarked
        FROM dictionary_words dw
        WHERE dw.category_id = ? AND dw.target_language = ?
        ORDER BY dw.word ASC
      `;
      params = [id, targetLanguage];
    }
    
    const safeLimit = Math.max(1, Math.min(parseInt(limit) || 50, 1000));
    const safeOffset = Math.max(0, parseInt(offset) || 0);
    sql += ` LIMIT ${safeLimit} OFFSET ${safeOffset}`;

    const words = await query(sql, params);

    res.json(successResponse({
      words,
      total: words.length,
      category_id: id
    }));
  } catch (error) {
    console.error('Get words by category error:', error);
    next(error);
  }
};

/**
 * GET /api/v1/dictionary/search
 * Search dictionary words
 */
const searchWords = async (req, res, next) => {
  try {
    const { q, limit = 20 } = req.query;
    const userId = req.user?.id;

    if (!q || q.trim().length < 2) {
      return res.status(400).json(errorResponse('INVALID_INPUT', 'Arama terimi en az 2 karakter olmalı'));
    }

    const searchTerm = `%${q.trim()}%`;
    let sql, params;
    
    if (userId) {
      sql = `
        SELECT 
          dw.id,
          dw.word,
          dw.translation,
          dw.definition,
          dw.image_url,
          dc.name as category_name,
          CASE WHEN b.id IS NOT NULL THEN TRUE ELSE FALSE END as is_bookmarked
        FROM dictionary_words dw
        INNER JOIN dictionary_categories dc ON dw.category_id = dc.id
        LEFT JOIN bookmarks b ON dw.id = b.item_id AND b.user_id = ? AND b.item_type = 'dictionary_word'
        WHERE dw.word LIKE ? OR dw.translation LIKE ?
        ORDER BY 
          CASE WHEN dw.word LIKE ? THEN 1 ELSE 2 END,
          dw.word ASC
      `;
      params = [userId, searchTerm, searchTerm, `${q}%`];
    } else {
      sql = `
        SELECT 
          dw.id,
          dw.word,
          dw.translation,
          dw.definition,
          dw.image_url,
          dc.name as category_name,
          FALSE as is_bookmarked
        FROM dictionary_words dw
        INNER JOIN dictionary_categories dc ON dw.category_id = dc.id
        WHERE dw.word LIKE ? OR dw.translation LIKE ?
        ORDER BY 
          CASE WHEN dw.word LIKE ? THEN 1 ELSE 2 END,
          dw.word ASC
      `;
      params = [searchTerm, searchTerm, `${q}%`];
    }
    
    const safeLimit = Math.max(1, Math.min(parseInt(limit) || 20, 100));
    sql += ` LIMIT ${safeLimit}`;

    const words = await query(sql, params);

    // Save to recent searches if user is logged in
    if (userId) {
      const insertSearch = `
        INSERT INTO recent_searches (user_id, search_query, search_type)
        VALUES (?, ?, 'dictionary')
        ON DUPLICATE KEY UPDATE created_at = NOW()
      `;
      await query(insertSearch, [userId, q.trim()]).catch(err => console.error('Save search error:', err));
    }

    res.json(successResponse({ words, query: q }));
  } catch (error) {
    console.error('Search words error:', error);
    next(error);
  }
};

/**
 * GET /api/v1/dictionary/phrases
 * Get travel phrases with optional category filter (filtered by target language)
 */
const getTravelPhrases = async (req, res, next) => {
  try {
    const { category, limit = 50, offset = 0, language } = req.query;
    const userId = req.user?.id;

    // Get user's target language from onboarding if not provided
    let targetLanguage = language;
    if (!targetLanguage && userId) {
      const userOnboarding = await query(
        'SELECT target_language FROM user_onboarding WHERE user_id = ?',
        [userId]
      );
      if (userOnboarding.length > 0) {
        targetLanguage = userOnboarding[0].target_language;
      }
    }
    
    // Default to English if no language specified
    targetLanguage = targetLanguage || 'en';

    let sql, params;
    
    if (userId) {
      sql = `
        SELECT 
          tp.id,
          tp.category,
          tp.phrase_type,
          tp.english_text,
          tp.translation,
          tp.audio_url,
          tp.source_language,
          tp.target_language,
          CASE WHEN b.id IS NOT NULL THEN TRUE ELSE FALSE END as is_bookmarked
        FROM travel_phrases tp
        LEFT JOIN bookmarks b ON tp.id = b.item_id AND b.user_id = ? AND b.item_type = 'travel_phrase'
        WHERE tp.target_language = ?
      `;
      params = [userId, targetLanguage];
    } else {
      sql = `
        SELECT 
          tp.id,
          tp.category,
          tp.phrase_type,
          tp.english_text,
          tp.translation,
          tp.audio_url,
          tp.source_language,
          tp.target_language,
          FALSE as is_bookmarked
        FROM travel_phrases tp
        WHERE tp.target_language = ?
      `;
      params = [targetLanguage];
    }

    if (category) {
      sql += ' AND tp.category = ?';
      params.push(category);
    }

    sql += ' ORDER BY tp.category ASC, tp.display_order ASC, tp.english_text ASC';
    
    const safeLimit = Math.max(1, Math.min(parseInt(limit) || 50, 1000));
    const safeOffset = Math.max(0, parseInt(offset) || 0);
    sql += ` LIMIT ${safeLimit} OFFSET ${safeOffset}`;

    const phrases = await query(sql, params);

    res.json(successResponse({ 
      phrases, 
      total: phrases.length,
      language: targetLanguage 
    }));
  } catch (error) {
    console.error('Get travel phrases error:', error);
    next(error);
  }
};

module.exports = {
  getCategories,
  getWordsByCategory,
  searchWords,
  getTravelPhrases
};
