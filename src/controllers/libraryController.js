const { query } = require('../config/database');
const { successResponse, errorResponse } = require('../utils/response');

/**
 * Helper: Create default library folders for new users
 */
async function createDefaultLibraryFolders(userId) {
  try {
    const defaultFolders = [
      { name: 'My Airport Essentials', icon: 'assets/icons/airport.png', color: '#E3F2FD' },
      { name: 'My Hotel Essentials', icon: 'assets/icons/accommodation.png', color: '#FFE4CC' },
      { name: 'Transport Essentials', icon: 'assets/icons/transportation.png', color: '#FFF9C4' },
      { name: 'My Food Essentials', icon: 'assets/icons/food_drink.png', color: '#FFCDD2' },
      { name: 'My Shopping Essentials', icon: 'assets/icons/shopping.png', color: '#C8E6C9' },
      { name: 'Culture Essentials', icon: 'assets/icons/culture.png', color: '#B3E5FC' },
      { name: 'Meeting Essentials', icon: 'assets/icons/meeting.png', color: '#D7CCC8' },
      { name: 'Sport Essentials', icon: 'assets/icons/sport.png', color: '#F8BBD0' },
      { name: 'Health Essentials', icon: 'assets/icons/health.png', color: '#C5E1A5' },
      { name: 'Business Essentials', icon: 'assets/icons/business.png', color: '#BBDEFB' }
    ];

    for (const folder of defaultFolders) {
      await query(
        'INSERT INTO library_folders (user_id, name, icon, color, item_count) VALUES (?, ?, ?, ?, 0)',
        [userId, folder.name, folder.icon, folder.color]
      );
    }
    
    console.log(`✅ Created ${defaultFolders.length} default folders for user ${userId}`);
    return true;
  } catch (error) {
    console.error('Error creating default library folders:', error);
    return false;
  }
}

/**
 * GET /api/v1/library
 * Get library overview (bookmarks and folders)
 */
const getLibraryItems = async (req, res, next) => {
  try {
    const userId = req.user?.id;

    // If not authenticated, return empty library
    if (!userId) {
      return res.json(successResponse({
        bookmarks: [],
        folders: [],
        stats: {
          total_bookmarks: 0,
          dictionary_count: 0,
          phrases_count: 0,
          vocabulary_count: 0
        },
        message: 'Kitaplığınızı görmek için giriş yapın'
      }));
    }

    // Get recent bookmarks
    // Get user's target language from onboarding
    const userOnboarding = await query(
      'SELECT target_language FROM user_onboarding WHERE user_id = ?',
      [userId]
    );
    const targetLanguage = userOnboarding.length > 0 ? userOnboarding[0].target_language : 'en';

    const bookmarksSql = `
      SELECT 
        b.id as bookmark_id,
        b.item_type,
        b.item_id,
        b.created_at as bookmarked_at,
        CASE 
          WHEN b.item_type = 'dictionary_word' THEN dw.word
          WHEN b.item_type = 'travel_phrase' THEN tp.english_text
          WHEN b.item_type = 'lesson_vocabulary' THEN lv.term
        END as word,
        CASE 
          WHEN b.item_type = 'dictionary_word' THEN dw.translation
          WHEN b.item_type = 'travel_phrase' THEN tp.translation
          WHEN b.item_type = 'lesson_vocabulary' THEN lv.definition
        END as translation
      FROM bookmarks b
      LEFT JOIN dictionary_words dw ON b.item_id = dw.id AND b.item_type = 'dictionary_word' AND dw.target_language = ?
      LEFT JOIN travel_phrases tp ON b.item_id = tp.id AND b.item_type = 'travel_phrase' AND tp.target_language = ?
      LEFT JOIN lesson_vocabulary lv ON b.item_id = lv.id AND b.item_type = 'lesson_vocabulary' AND lv.target_language = ?
      WHERE b.user_id = ?
      AND (
        (b.item_type = 'dictionary_word' AND dw.id IS NOT NULL) OR
        (b.item_type = 'travel_phrase' AND tp.id IS NOT NULL) OR
        (b.item_type = 'lesson_vocabulary' AND lv.id IS NOT NULL)
      )
      ORDER BY b.created_at DESC
      LIMIT 20
    `;

    const bookmarks = await query(bookmarksSql, [targetLanguage, targetLanguage, targetLanguage, userId]);

    // Get folders
    const foldersSql = `
      SELECT 
        f.id,
        f.name,
        f.color,
        f.created_at,
        COUNT(b.id) as item_count
      FROM library_folders f
      LEFT JOIN bookmarks b ON b.folder_id = f.id
      WHERE f.user_id = ?
      GROUP BY f.id
      ORDER BY f.created_at DESC
    `;

    const folders = await query(foldersSql, [userId]);

    // Get stats
    const statsSql = `
      SELECT 
        COUNT(*) as total_bookmarks,
        COUNT(DISTINCT CASE WHEN item_type = 'dictionary_word' THEN 1 END) as dictionary_count,
        COUNT(DISTINCT CASE WHEN item_type = 'travel_phrase' THEN 1 END) as phrases_count,
        COUNT(DISTINCT CASE WHEN item_type = 'lesson_vocabulary' THEN 1 END) as vocabulary_count
      FROM bookmarks
      WHERE user_id = ?
    `;

    const stats = await query(statsSql, [userId]);

    res.json(successResponse({
      bookmarks,
      folders,
      stats: stats[0] || {
        total_bookmarks: 0,
        dictionary_count: 0,
        phrases_count: 0,
        vocabulary_count: 0
      }
    }));
  } catch (error) {
    console.error('Get library items error:', error);
    next(error);
  }
};

/**
 * GET /api/v1/library/bookmarks
 * Get all bookmarked words and phrases
 */
const getBookmarks = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { type, limit = 50, offset = 0 } = req.query;

    // Get user's target language from onboarding
    const userOnboarding = await query(
      'SELECT target_language FROM user_onboarding WHERE user_id = ?',
      [userId]
    );
    const targetLanguage = userOnboarding.length > 0 ? userOnboarding[0].target_language : 'en';

    let sql = `
      SELECT 
        b.id as bookmark_id,
        b.item_type,
        b.item_id,
        b.created_at as bookmarked_at,
        CASE 
          WHEN b.item_type = 'dictionary_word' THEN dw.word
          WHEN b.item_type = 'travel_phrase' THEN tp.english_text
          WHEN b.item_type = 'lesson_vocabulary' THEN lv.term
        END as word,
        CASE 
          WHEN b.item_type = 'dictionary_word' THEN dw.translation
          WHEN b.item_type = 'travel_phrase' THEN tp.translation
          WHEN b.item_type = 'lesson_vocabulary' THEN lv.definition
        END as translation,
        CASE 
          WHEN b.item_type = 'dictionary_word' THEN dc.name
          WHEN b.item_type = 'travel_phrase' THEN tp.category
          ELSE NULL
        END as category
      FROM bookmarks b
      LEFT JOIN dictionary_words dw ON b.item_id = dw.id AND b.item_type = 'dictionary_word' AND dw.target_language = ?
      LEFT JOIN dictionary_categories dc ON dw.category_id = dc.id
      LEFT JOIN travel_phrases tp ON b.item_id = tp.id AND b.item_type = 'travel_phrase' AND tp.target_language = ?
      LEFT JOIN lesson_vocabulary lv ON b.item_id = lv.id AND b.item_type = 'lesson_vocabulary' AND lv.target_language = ?
      WHERE b.user_id = ?
      AND (
        (b.item_type = 'dictionary_word' AND dw.id IS NOT NULL) OR
        (b.item_type = 'travel_phrase' AND tp.id IS NOT NULL) OR
        (b.item_type = 'lesson_vocabulary' AND lv.id IS NOT NULL)
      )
    `;

    const params = [targetLanguage, targetLanguage, targetLanguage, userId];

    if (type) {
      sql += ' AND b.item_type = ?';
      params.push(type);
    }

    const safeLimit = Math.max(1, Math.min(parseInt(limit) || 50, 1000));
    const safeOffset = Math.max(0, parseInt(offset) || 0);
    sql += ` ORDER BY b.created_at DESC LIMIT ${safeLimit} OFFSET ${safeOffset}`;

    const bookmarks = await query(sql, params);

    res.json(successResponse({
      bookmarks,
      total: bookmarks.length
    }));
  } catch (error) {
    console.error('Get bookmarks error:', error);
    next(error);
  }
};

/**
 * POST /api/v1/library/bookmarks
 * Add a bookmark
 */
const addBookmark = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { item_type, item_id, category } = req.body;

    console.log('📌 Adding bookmark:', { userId, item_type, item_id, category });

    // Validate type
    if (!['dictionary_word', 'travel_phrase', 'lesson_vocabulary'].includes(item_type)) {
      return res.status(400).json(errorResponse('INVALID_INPUT', 'Geçersiz bookmark tipi'));
    }

    if (!item_id) {
      return res.status(400).json(errorResponse('INVALID_INPUT', 'Item ID gerekli'));
    }

    // Check if already bookmarked
    const checkSql = 'SELECT id FROM bookmarks WHERE user_id = ? AND item_type = ? AND item_id = ?';
    const existing = await query(checkSql, [userId, item_type, item_id]);

    if (existing.length > 0) {
      return res.status(409).json(errorResponse('ALREADY_EXISTS', 'Zaten kaydedilmiş'));
    }

    // Insert bookmark
    const insertSql = `
      INSERT INTO bookmarks (user_id, item_type, item_id)
      VALUES (?, ?, ?)
    `;

    await query(insertSql, [userId, item_type, item_id]);
    
    // Also add to appropriate folder based on category
    try {
      // Find matching folder based on category name
      let folderNamePattern = '%Airport%';
      
      if (category) {
        const catLower = category.toLowerCase();
        if (catLower.includes('airport') || catLower.includes('havaalani')) {
          folderNamePattern = '%Airport%';
        } else if (catLower.includes('hotel') || catLower.includes('accommodation') || catLower.includes('konaklama')) {
          folderNamePattern = '%Hotel%';
        } else if (catLower.includes('transport') || catLower.includes('ulaşım')) {
          folderNamePattern = '%Transport%';
        } else if (catLower.includes('food') || catLower.includes('drink') || catLower.includes('yemek')) {
          folderNamePattern = '%Food%';
        } else if (catLower.includes('shopping') || catLower.includes('alışveriş')) {
          folderNamePattern = '%Shopping%';
        } else if (catLower.includes('culture') || catLower.includes('kültür')) {
          folderNamePattern = '%Culture%';
        } else if (catLower.includes('meeting') || catLower.includes('görüşme')) {
          folderNamePattern = '%Meeting%';
        } else if (catLower.includes('sport') || catLower.includes('spor')) {
          folderNamePattern = '%Sport%';
        } else if (catLower.includes('health') || catLower.includes('sağlık')) {
          folderNamePattern = '%Health%';
        } else if (catLower.includes('business') || catLower.includes('iş')) {
          folderNamePattern = '%Business%';
        }
      }
      
      const folders = await query(
        'SELECT id FROM library_folders WHERE user_id = ? AND name LIKE ? ORDER BY created_at ASC LIMIT 1',
        [userId, folderNamePattern]
      );
      
      if (folders.length > 0) {
        const folderId = folders[0].id;
        
        // Check if not already in folder
        const folderItemCheck = await query(
          'SELECT id FROM library_items WHERE folder_id = ? AND item_type = ? AND item_id = ?',
          [folderId, item_type, item_id]
        );
        
        if (folderItemCheck.length === 0) {
          await query(
            'INSERT INTO library_items (folder_id, item_type, item_id) VALUES (?, ?, ?)',
            [folderId, item_type, item_id]
          );
          
          // Update folder item count
          await query(
            'UPDATE library_folders SET item_count = item_count + 1 WHERE id = ?',
            [folderId]
          );
          
          console.log(`✅ Item automatically added to folder ${folderId} (pattern: ${folderNamePattern})`);
        }
      } else {
        // Fallback to first folder if pattern doesn't match
        const fallbackFolders = await query(
          'SELECT id FROM library_folders WHERE user_id = ? ORDER BY created_at ASC LIMIT 1',
          [userId]
        );
        
        if (fallbackFolders.length > 0) {
          const folderId = fallbackFolders[0].id;
          
          const folderItemCheck = await query(
            'SELECT id FROM library_items WHERE folder_id = ? AND item_type = ? AND item_id = ?',
            [folderId, item_type, item_id]
          );
          
          if (folderItemCheck.length === 0) {
            await query(
              'INSERT INTO library_items (folder_id, item_type, item_id) VALUES (?, ?, ?)',
              [folderId, item_type, item_id]
            );
            
            await query(
              'UPDATE library_folders SET item_count = item_count + 1 WHERE id = ?',
              [folderId]
            );
            
            console.log(`✅ Item added to fallback folder ${folderId}`);
          }
        }
      }
    } catch (folderError) {
      console.error('Error adding to folder:', folderError);
      // Don't fail the bookmark if folder addition fails
    }

    res.json(successResponse({ message: 'Kaydedildi' }));
  } catch (error) {
    console.error('Add bookmark error:', error);
    next(error);
  }
};

/**
 * DELETE /api/v1/library/bookmarks/:id
 * Remove a bookmark
 */
const removeBookmark = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const sql = 'DELETE FROM bookmarks WHERE id = ? AND user_id = ?';
    const result = await query(sql, [id, userId]);

    if (result.affectedRows === 0) {
      return res.status(404).json(errorResponse('NOT_FOUND', 'Bookmark bulunamadı'));
    }

    res.json(successResponse({ message: 'Silindi' }));
  } catch (error) {
    console.error('Remove bookmark error:', error);
    next(error);
  }
};

/**
 * GET /api/v1/library/folders
 * Get user's library folders
 */
const getFolders = async (req, res, next) => {
  try {
    const userId = req.user.id;
    
    console.log('📁 getFolders - User ID:', userId);

    const sql = `
      SELECT 
        lf.id,
        lf.name,
        lf.color,
        lf.created_at,
        COUNT(li.id) as item_count
      FROM library_folders lf
      LEFT JOIN library_items li ON lf.id = li.folder_id
      WHERE lf.user_id = ?
      GROUP BY lf.id, lf.name, lf.color, lf.created_at
      ORDER BY lf.created_at DESC
    `;

    const folders = await query(sql, [userId]);
    
    // If user has no folders, create default ones
    if (folders.length === 0) {
      console.log('📁 No folders found, creating defaults...');
      await createDefaultLibraryFolders(userId);
      // Fetch again after creating
      folders = await query(sql, [userId]);
    }
    
    console.log('📁 Folders result:', folders.map(f => ({ id: f.id, name: f.name, item_count: f.item_count })));

    res.json(successResponse({ folders }));
  } catch (error) {
    console.error('Get folders error:', error);
    next(error);
  }
};

/**
 * POST /api/v1/library/folders
 * Create a new folder
 */
const createFolder = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { name, color = '#3B82F6' } = req.body;

    const sql = 'INSERT INTO library_folders (user_id, name, color) VALUES (?, ?, ?)';
    const result = await query(sql, [userId, name, color]);

    res.json(successResponse({
      folder: {
        id: result.insertId,
        name,
        color
      }
    }));
  } catch (error) {
    console.error('Create folder error:', error);
    next(error);
  }
};

/**
 * DELETE /api/v1/library/folders/:id
 * Delete a folder (and its items)
 */
const deleteFolder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const sql = 'DELETE FROM library_folders WHERE id = ? AND user_id = ?';
    const result = await query(sql, [id, userId]);

    if (result.affectedRows === 0) {
      return res.status(404).json(errorResponse('NOT_FOUND', 'Klasör bulunamadı'));
    }

    res.json(successResponse({ message: 'Klasör silindi' }));
  } catch (error) {
    console.error('Delete folder error:', error);
    next(error);
  }
};

/**
 * GET /api/v1/library/folders/:id/items
 * Get all items in a specific folder
 */
const getFolderItems = async (req, res, next) => {
  try {
    const { id: folderId } = req.params;
    const userId = req.user.id;
    const { limit = 50, offset = 0 } = req.query;

    // Verify folder belongs to user
    const folderCheck = await query(
      'SELECT id, name FROM library_folders WHERE id = ? AND user_id = ?',
      [folderId, userId]
    );

    if (folderCheck.length === 0) {
      return res.status(404).json(errorResponse('NOT_FOUND', 'Klasör bulunamadı'));
    }

    // Get user's target language from onboarding
    const userOnboarding = await query(
      'SELECT target_language FROM user_onboarding WHERE user_id = ?',
      [userId]
    );
    const targetLanguage = userOnboarding.length > 0 ? userOnboarding[0].target_language : 'en';

    // Get items with full details
    // Sanitize limit and offset (prevent SQL injection)
    const safeLimit = Math.max(1, Math.min(parseInt(limit) || 50, 1000));
    const safeOffset = Math.max(0, parseInt(offset) || 0);

    // Get items with full details (words and phrases)
    const sql = `
      SELECT 
        li.id as library_item_id,
        li.item_type,
        li.item_id,
        li.created_at,
        CASE 
          WHEN li.item_type = 'dictionary_word' THEN dw.word
          WHEN li.item_type = 'travel_phrase' THEN tp.english_text
          WHEN li.item_type = 'lesson_vocabulary' THEN lv.term
        END as word,
        CASE 
          WHEN li.item_type = 'dictionary_word' THEN dw.translation
          WHEN li.item_type = 'travel_phrase' THEN tp.translation
          WHEN li.item_type = 'lesson_vocabulary' THEN lv.definition
        END as translation,
        CASE 
          WHEN li.item_type = 'dictionary_word' THEN dw.audio_url
          WHEN li.item_type = 'travel_phrase' THEN tp.audio_url
          ELSE NULL
        END as audio_url,
        CASE 
          WHEN li.item_type = 'dictionary_word' THEN dw.image_url
          ELSE NULL
        END as image_url,
        CASE 
          WHEN li.item_type = 'dictionary_word' THEN dc.name
          WHEN li.item_type = 'travel_phrase' THEN tp.category
          ELSE NULL
        END as category,
        CASE 
          WHEN li.item_type = 'dictionary_word' THEN dw.source_language
          WHEN li.item_type = 'travel_phrase' THEN tp.source_language
          WHEN li.item_type = 'lesson_vocabulary' THEN lv.source_language
        END as source_language,
        CASE 
          WHEN li.item_type = 'dictionary_word' THEN dw.target_language
          WHEN li.item_type = 'travel_phrase' THEN tp.target_language
          WHEN li.item_type = 'lesson_vocabulary' THEN lv.target_language
        END as target_language
      FROM library_items li
      LEFT JOIN dictionary_words dw ON li.item_id = dw.id AND li.item_type = 'dictionary_word' AND dw.target_language = ?
      LEFT JOIN dictionary_categories dc ON dw.category_id = dc.id
      LEFT JOIN travel_phrases tp ON li.item_id = tp.id AND li.item_type = 'travel_phrase' AND tp.target_language = ?
      LEFT JOIN lesson_vocabulary lv ON li.item_id = lv.id AND li.item_type = 'lesson_vocabulary' AND lv.target_language = ?
      WHERE li.folder_id = ?
      AND (
        (li.item_type = 'dictionary_word' AND dw.id IS NOT NULL) OR
        (li.item_type = 'travel_phrase' AND tp.id IS NOT NULL) OR
        (li.item_type = 'lesson_vocabulary' AND lv.id IS NOT NULL)
      )
      ORDER BY li.created_at DESC
      LIMIT ${safeLimit} OFFSET ${safeOffset}
    `;

    const items = await query(sql, [targetLanguage, targetLanguage, targetLanguage, folderId]);

    res.json(successResponse({
      folder: folderCheck[0],
      items,
      total: items.length
    }));
  } catch (error) {
    console.error('Get folder items error:', error);
    next(error);
  }
};

/**
 * POST /api/v1/library/folders/:id/items
 * Add an item (word or phrase) to a folder
 */
const addItemToFolder = async (req, res, next) => {
  try {
    const { id: folderId } = req.params;
    const userId = req.user.id;
    const { item_type, item_id } = req.body;

    // Validate item_type
    const validTypes = ['dictionary_word', 'travel_phrase', 'lesson_vocabulary'];
    if (!validTypes.includes(item_type)) {
      return res.status(400).json(errorResponse('INVALID_TYPE', 'Geçersiz item tipi'));
    }

    // Verify folder belongs to user
    const folderCheck = await query(
      'SELECT id FROM library_folders WHERE id = ? AND user_id = ?',
      [folderId, userId]
    );

    if (folderCheck.length === 0) {
      return res.status(404).json(errorResponse('NOT_FOUND', 'Klasör bulunamadı'));
    }

    // Check if item already exists in folder
    const existCheck = await query(
      'SELECT id FROM library_items WHERE folder_id = ? AND item_type = ? AND item_id = ?',
      [folderId, item_type, item_id]
    );

    if (existCheck.length > 0) {
      return res.status(409).json(errorResponse('ALREADY_EXISTS', 'Bu öğe zaten klasörde mevcut'));
    }

    // Insert item
    const insertSql = 'INSERT INTO library_items (folder_id, item_type, item_id) VALUES (?, ?, ?)';
    const result = await query(insertSql, [folderId, item_type, item_id]);

    // Update folder item count
    await query(
      'UPDATE library_folders SET item_count = item_count + 1 WHERE id = ?',
      [folderId]
    );

    res.json(successResponse({
      library_item_id: result.insertId,
      message: 'Klasöre eklendi'
    }));
  } catch (error) {
    console.error('Add item to folder error:', error);
    next(error);
  }
};

/**
 * DELETE /api/v1/library/items/:id
 * Remove an item from library (from any folder)
 */
const removeItemFromLibrary = async (req, res, next) => {
  try {
    const { id: libraryItemId } = req.params;
    const userId = req.user.id;

    // Get item and verify ownership through folder
    const itemCheck = await query(
      `SELECT li.id, li.folder_id 
       FROM library_items li
       INNER JOIN library_folders lf ON li.folder_id = lf.id
       WHERE li.id = ? AND lf.user_id = ?`,
      [libraryItemId, userId]
    );

    if (itemCheck.length === 0) {
      return res.status(404).json(errorResponse('NOT_FOUND', 'Öğe bulunamadı'));
    }

    const folderId = itemCheck[0].folder_id;

    // Delete item
    await query('DELETE FROM library_items WHERE id = ?', [libraryItemId]);

    // Update folder item count
    await query(
      'UPDATE library_folders SET item_count = GREATEST(item_count - 1, 0) WHERE id = ?',
      [folderId]
    );

    res.json(successResponse({ message: 'Öğe silindi' }));
  } catch (error) {
    console.error('Remove item from library error:', error);
    next(error);
  }
};

module.exports = {
  getLibraryItems,
  getBookmarks,
  addBookmark,
  removeBookmark,
  getFolders,
  createFolder,
  deleteFolder,
  getFolderItems,
  addItemToFolder,
  removeItemFromLibrary
};
