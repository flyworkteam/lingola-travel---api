const { query } = require('../config/database');
const { successResponse, errorResponse } = require('../utils/response');

/**
 * Helper: Yeni kullanıcılar için varsayılan klasörleri oluşturur
 */
async function createDefaultLibraryFolders(userId) {
  try {
    const defaultFolders = [
      { name: 'General Essentials', icon: 'assets/images/home/general.png', color: '#FFD166' },
      { name: 'Travel Essentials', icon: 'assets/icons/airport.svg', color: '#B8A7FF' },
      { name: 'Accommodation Essentials', icon: 'assets/icons/acc.svg', color: '#FF9F6A' },
      { name: 'Food & Drink Essentials', icon: 'assets/icons/ffff.svg', color: '#FF8FA5' },
      { name: 'Culture Essentials', icon: 'assets/icons/culture.svg', color: '#B8D9FF' },
      { name: 'Shopping Essentials', icon: 'assets/icons/shopping.svg', color: '#8BDDCD' },
      { name: 'Direction Essentials', icon: 'assets/images/home/direction.png', color: '#F9D26B' },
      { name: 'Sport Essentials', icon: 'assets/icons/sport.svg', color: '#E4B3FF' },
      { name: 'Health Essentials', icon: 'assets/icons/health.svg', color: '#B8FFC9' },
      { name: 'Business Essentials', icon: 'assets/icons/business.png', color: '#A4C8E1' },
      { name: 'Emergency Essentials', icon: 'assets/images/home/emergency.png', color: '#FF6B6B' }
    ];

    for (const folder of defaultFolders) {
      await query(
        'INSERT INTO library_folders (user_id, name, icon, color, item_count) VALUES (?, ?, ?, ?, 0)',
        [userId, folder.name, folder.icon, folder.color]
      );
    }
    return true;
  } catch (error) {
    console.error('Varsayılan klasör oluşturma hatası:', error);
    return false;
  }
}

/**
 * GET /api/v1/library
 * Kütüphane ana sayfa verilerini getirir (Klasörler ve son eklenenler)
 */
const getLibraryItems = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.json(successResponse({ folders: [], bookmarks: [], stats: {} }));
    }

    // YENİ SİSTEM: Artık JOIN yok, direkt tabloya yazdığımız kelimeleri çekiyoruz
    const bookmarksSql = `
      SELECT id as bookmark_id, item_type, item_id, created_at as bookmarked_at, word, translation
      FROM bookmarks
      WHERE user_id = ?
      ORDER BY created_at DESC
      LIMIT 20
    `;
    const bookmarks = await query(bookmarksSql, [userId]);

    const foldersSql = `
      SELECT f.id, f.name, f.color, f.icon, f.created_at, COUNT(li.id) as item_count
      FROM library_folders f
      LEFT JOIN library_items li ON li.folder_id = f.id
      WHERE f.user_id = ?
      GROUP BY f.id
      ORDER BY f.id ASC 
    `;
    const folders = await query(foldersSql, [userId]);

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

    res.json(successResponse({ bookmarks, folders, stats: stats[0] }));
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/v1/library/bookmarks
 */
const getBookmarks = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { type, limit = 50, offset = 0 } = req.query;

    let sql = `SELECT id as bookmark_id, item_type, item_id, created_at as bookmarked_at, word, translation FROM bookmarks WHERE user_id = ?`;
    const params = [userId];

    if (type) {
      sql += ' AND item_type = ?';
      params.push(type);
    }

    const safeLimit = parseInt(limit) || 50;
    const safeOffset = parseInt(offset) || 0;
    sql += ` ORDER BY created_at DESC LIMIT ${safeLimit} OFFSET ${safeOffset}`;

    const bookmarks = await query(sql, params);

    res.json(successResponse({ bookmarks, total: bookmarks.length }));
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/v1/library/bookmarks
 * Favorilere Ekleme (Aynı zamanda uygun klasörü bulup oraya da atar)
 */
const addBookmark = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { item_type, item_id, category, word, translation } = req.body;

    if (!item_id) return res.status(400).json(errorResponse('INVALID_INPUT', 'Item ID gerekli'));

    // GÜVENLİK HİLESİ: Sütunlar yoksa otomatik ekler (UI olmadığı için)
    try { await query('ALTER TABLE bookmarks ADD COLUMN word VARCHAR(255)'); } catch (e) { }
    try { await query('ALTER TABLE bookmarks ADD COLUMN translation TEXT'); } catch (e) { }
    try { await query('ALTER TABLE library_items ADD COLUMN word VARCHAR(255)'); } catch (e) { }
    try { await query('ALTER TABLE library_items ADD COLUMN translation TEXT'); } catch (e) { }

    const checkSql = 'SELECT id FROM bookmarks WHERE user_id = ? AND item_type = ? AND item_id = ?';
    const existing = await query(checkSql, [userId, item_type, item_id]);

    if (existing.length > 0) return res.status(409).json(errorResponse('ALREADY_EXISTS', 'Zaten kaydedilmiş'));

    // 1. Favorilere ekle
    await query(
      'INSERT INTO bookmarks (user_id, item_type, item_id, word, translation) VALUES (?, ?, ?, ?, ?)',
      [userId, item_type, item_id, word || item_id, translation || '']
    );

    try {
      // 2. Klasör ismini kategoriye göre belirle
      let folderNamePattern = '%General%';
      if (category) {
        const catLower = category.toLowerCase();
        if (catLower.includes('general') || catLower.includes('genel')) folderNamePattern = '%General%';
        else if (catLower.includes('travel') || catLower.includes('airport')) folderNamePattern = '%Travel%';
        else if (catLower.includes('accommodation') || catLower.includes('hotel')) folderNamePattern = '%Accommodation%';
        else if (catLower.includes('food') || catLower.includes('drink')) folderNamePattern = '%Food%';
        else if (catLower.includes('culture')) folderNamePattern = '%Culture%';
        else if (catLower.includes('shopping') || catLower.includes('shop')) folderNamePattern = '%Shopping%';
        else if (catLower.includes('direction')) folderNamePattern = '%Direction%';
        else if (catLower.includes('sport')) folderNamePattern = '%Sport%';
        else if (catLower.includes('health')) folderNamePattern = '%Health%';
        else if (catLower.includes('business')) folderNamePattern = '%Business%';
        else if (catLower.includes('emergency')) folderNamePattern = '%Emergency%';
      }

      const folders = await query('SELECT id FROM library_folders WHERE user_id = ? AND name LIKE ? ORDER BY id ASC LIMIT 1', [userId, folderNamePattern]);

      if (folders.length > 0) {
        const folderId = folders[0].id;
        const folderItemCheck = await query('SELECT id FROM library_items WHERE folder_id = ? AND item_type = ? AND item_id = ?', [folderId, item_type, item_id]);

        if (folderItemCheck.length === 0) {
          // Klasöre ekle
          await query(
            'INSERT INTO library_items (folder_id, item_type, item_id, word, translation) VALUES (?, ?, ?, ?, ?)',
            [folderId, item_type, item_id, word || item_id, translation || '']
          );
          await query('UPDATE library_folders SET item_count = item_count + 1 WHERE id = ?', [folderId]);
        }
      }
    } catch (folderError) {
      console.error('Klasöre otomatik ekleme hatası:', folderError);
    }

    res.json(successResponse({ message: 'Başarıyla kaydedildi' }));
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /api/v1/library/bookmarks/:id
 */
const removeBookmark = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { item_type } = req.query;

    if (item_type) {
      await query('DELETE FROM bookmarks WHERE item_id = ? AND item_type = ? AND user_id = ?', [id, item_type, userId]);
      // İlgili kullanıcının klasörlerinden de sil
      await query(
        'DELETE FROM library_items WHERE item_id = ? AND item_type = ? AND folder_id IN (SELECT id FROM library_folders WHERE user_id = ?)',
        [id, item_type, userId]
      );
    } else {
      await query('DELETE FROM bookmarks WHERE id = ? AND user_id = ?', [id, userId]);
    }

    // Klasör sayılarını güncelle
    await query(`
      UPDATE library_folders f
      SET item_count = (SELECT COUNT(*) FROM library_items WHERE folder_id = f.id)
      WHERE user_id = ?
    `, [userId]);

    res.json(successResponse({ message: 'Silindi' }));
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/v1/library/folders
 */
const getFolders = async (req, res, next) => {
  try {
    const userId = req.user.id;
    let folders = await query(`
      SELECT f.id, f.name, f.color, f.icon, f.created_at, COUNT(li.id) as item_count
      FROM library_folders f
      LEFT JOIN library_items li ON f.id = li.folder_id
      WHERE f.user_id = ?
      GROUP BY f.id ORDER BY f.id ASC
    `, [userId]);

    if (folders.length === 0) {
      await createDefaultLibraryFolders(userId);
      folders = await query('SELECT *, 0 as item_count FROM library_folders WHERE user_id = ? ORDER BY id ASC', [userId]);
    }

    res.json(successResponse({ folders }));
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/v1/library/folders
 */
const createFolder = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { name, color = '#3B82F6', icon = 'assets/images/home/general.png' } = req.body;

    const result = await query('INSERT INTO library_folders (user_id, name, color, icon) VALUES (?, ?, ?, ?)', [userId, name, color, icon]);

    res.json(successResponse({ folder: { id: result.insertId, name, color, icon, item_count: 0 } }));
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /api/v1/library/folders/:id
 */
const updateFolder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { name, color } = req.body;

    await query('UPDATE library_folders SET name = ?, color = ? WHERE id = ? AND user_id = ?', [name, color, id, userId]);
    res.json(successResponse({ message: 'Klasör güncellendi' }));
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /api/v1/library/folders/:id
 */
const deleteFolder = async (req, res, next) => {
  try {
    await query('DELETE FROM library_folders WHERE id = ? AND user_id = ?', [req.params.id, req.user.id]);
    res.json(successResponse({ message: 'Klasör silindi' }));
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/v1/library/folders/:id/items
 */
const getFolderItems = async (req, res, next) => {
  try {
    const { id: folderId } = req.params;
    const userId = req.user.id;
    const { limit = 100, offset = 0 } = req.query;

    // GÜVENLİK HİLESİ: Sütunlar yoksa otomatik ekler
    try { await query('ALTER TABLE library_items ADD COLUMN word VARCHAR(255)'); } catch (e) { }
    try { await query('ALTER TABLE library_items ADD COLUMN translation TEXT'); } catch (e) { }

    const folderCheck = await query('SELECT id FROM library_folders WHERE id = ? AND user_id = ?', [folderId, userId]);
    if (folderCheck.length === 0) return res.status(404).json(errorResponse('NOT_FOUND', 'Klasör bulunamadı'));

    const items = await query(`
      SELECT id as library_item_id, item_type, item_id, created_at, word, translation
      FROM library_items
      WHERE folder_id = ?
      ORDER BY created_at DESC
      LIMIT ? OFFSET ?
    `, [folderId, parseInt(limit) || 100, parseInt(offset) || 0]);

    res.json(successResponse({ folder: folderCheck[0], items, total: items.length }));
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/v1/library/folders/:id/items
 * Klasöre doğrudan öğe ekleme (Örn: Edit modundan veya içeriden)
 */
const addItemToFolder = async (req, res, next) => {
  try {
    const { id: folderId } = req.params;
    const userId = req.user.id;
    const { item_type, item_id, word, translation } = req.body;

    // GÜVENLİK HİLESİ
    try { await query('ALTER TABLE library_items ADD COLUMN word VARCHAR(255)'); } catch (e) { }
    try { await query('ALTER TABLE library_items ADD COLUMN translation TEXT'); } catch (e) { }

    const folderCheck = await query('SELECT id FROM library_folders WHERE id = ? AND user_id = ?', [folderId, userId]);
    if (folderCheck.length === 0) return res.status(404).json(errorResponse('NOT_FOUND', 'Klasör yok'));

    const existCheck = await query('SELECT id FROM library_items WHERE folder_id = ? AND item_type = ? AND item_id = ?', [folderId, item_type, item_id]);
    if (existCheck.length > 0) return res.status(409).json(errorResponse('ALREADY_EXISTS', 'Zaten ekli'));

    await query(
      'INSERT INTO library_items (folder_id, item_type, item_id, word, translation) VALUES (?, ?, ?, ?, ?)',
      [folderId, item_type, item_id, word || item_id, translation || '']
    );

    await query('UPDATE library_folders SET item_count = item_count + 1 WHERE id = ?', [folderId]);

    res.json(successResponse({ message: 'Klasöre başarıyla eklendi' }));
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /api/v1/library/items/:id
 * Klasörün içinden öğe silme
 */
const removeItemFromLibrary = async (req, res, next) => {
  try {
    const { id: libraryItemId } = req.params;
    const userId = req.user.id;

    const itemCheck = await query(
      `SELECT li.id, li.folder_id FROM library_items li INNER JOIN library_folders lf ON li.folder_id = lf.id WHERE li.id = ? AND lf.user_id = ?`,
      [libraryItemId, userId]
    );

    if (itemCheck.length === 0) return res.status(404).json(errorResponse('NOT_FOUND', 'Öğe bulunamadı'));

    await query('DELETE FROM library_items WHERE id = ?', [libraryItemId]);
    await query('UPDATE library_folders SET item_count = GREATEST(item_count - 1, 0) WHERE id = ?', [itemCheck[0].folder_id]);

    res.json(successResponse({ message: 'Öğe silindi' }));
  } catch (error) {
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
  removeItemFromLibrary,
  updateFolder
};