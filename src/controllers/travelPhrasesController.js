// Travel Phrases Controller
const { query } = require('../config/database');
const { successResponse, errorResponse } = require('../utils/response');

/**
 * GET /api/v1/travel-phrases
 * Get travel phrases (filtered by target language and category)
 */
const getTravelPhrases = async (req, res, next) => {
  try {
    const { 
      language,       // Target language (en, de, it, fr, ja, es, ru, tr, ko, hi, pt)
      category,       // Airport, Hotel, Taxi, etc.
      phrase_type,    // question, statement, response
      limit = 50, 
      offset = 0 
    } = req.query;
    
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
      // Include bookmark status for authenticated users
      sql = `
        SELECT 
          tp.id,
          tp.category,
          tp.phrase_type,
          tp.english_text,
          tp.translation,
          tp.audio_url,
          tp.display_order,
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
          tp.display_order,
          tp.source_language,
          tp.target_language,
          FALSE as is_bookmarked
        FROM travel_phrases tp
        WHERE tp.target_language = ?
      `;
      params = [targetLanguage];
    }

    // Add optional filters
    if (category) {
      sql += ' AND tp.category = ?';
      params.push(category);
    }

    if (phrase_type) {
      sql += ' AND tp.phrase_type = ?';
      params.push(phrase_type);
    }

    // Order by display_order and limit
    sql += ' ORDER BY tp.display_order ASC, tp.created_at ASC';
    
    const safeLimit = Math.max(1, Math.min(parseInt(limit) || 50, 1000));
    const safeOffset = Math.max(0, parseInt(offset) || 0);
    sql += ` LIMIT ${safeLimit} OFFSET ${safeOffset}`;

    const phrases = await query(sql, params);

    res.json(successResponse({
      phrases,
      total: phrases.length,
      language: targetLanguage,
      category: category || 'all'
    }));
  } catch (error) {
    console.error('Get travel phrases error:', error);
    next(error);
  }
};

/**
 * GET /api/v1/travel-phrases/categories
 * Get all available categories with phrase counts
 */
const getCategories = async (req, res, next) => {
  try {
    const { language } = req.query;
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

    const sql = `
      SELECT 
        category,
        COUNT(*) as phrase_count,
        COUNT(DISTINCT phrase_type) as phrase_types
      FROM travel_phrases
      WHERE target_language = ?
      GROUP BY category
      ORDER BY category ASC
    `;

    const categories = await query(sql, [targetLanguage]);

    res.json(successResponse({
      categories,
      language: targetLanguage
    }));
  } catch (error) {
    console.error('Get travel phrase categories error:', error);
    next(error);
  }
};

/**
 * GET /api/v1/travel-phrases/:id
 * Get single travel phrase by ID
 */
const getTravelPhraseById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    let sql, params;
    
    if (userId) {
      sql = `
        SELECT 
          tp.*,
          CASE WHEN b.id IS NOT NULL THEN TRUE ELSE FALSE END as is_bookmarked
        FROM travel_phrases tp
        LEFT JOIN bookmarks b ON tp.id = b.item_id AND b.user_id = ? AND b.item_type = 'travel_phrase'
        WHERE tp.id = ?
      `;
      params = [userId, id];
    } else {
      sql = `
        SELECT 
          tp.*,
          FALSE as is_bookmarked
        FROM travel_phrases tp
        WHERE tp.id = ?
      `;
      params = [id];
    }

    const phrases = await query(sql, params);

    if (phrases.length === 0) {
      return res.status(404).json(errorResponse('NOT_FOUND', 'Cümle bulunamadı'));
    }

    res.json(successResponse({ phrase: phrases[0] }));
  } catch (error) {
    console.error('Get travel phrase by ID error:', error);
    next(error);
  }
};

module.exports = {
  getTravelPhrases,
  getCategories,
  getTravelPhraseById
};
