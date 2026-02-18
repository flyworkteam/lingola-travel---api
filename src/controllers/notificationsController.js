const { query } = require('../config/database');
const { successResponse, errorResponse } = require('../utils/response');
const axios = require('axios');

/**
 * GET /api/v1/notifications
 * Get user's notifications
 */
const getNotifications = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { limit = 50, offset = 0 } = req.query;

    // Get user's is_premium status
    const userSql = 'SELECT is_premium FROM users WHERE id = ?';
    const userResult = await query(userSql, [userId]);
    const isPremium = userResult.length > 0 && userResult[0].is_premium === 1;

    let sql = `
      SELECT 
        id,
        user_id,
        icon,
        title,
        message,
        is_premium_promo,
        is_read,
        created_at
      FROM notifications
      WHERE user_id = ? OR user_id IS NULL
      ORDER BY 
        CASE WHEN is_premium_promo = 1 THEN 0 ELSE 1 END,
        created_at DESC
    `;

    const params = [userId];

    // Add LIMIT and OFFSET
    const safeLimit = Math.max(1, Math.min(parseInt(limit) || 50, 1000));
    const safeOffset = Math.max(0, parseInt(offset) || 0);
    sql += ` LIMIT ${safeLimit} OFFSET ${safeOffset}`;

    let notifications = await query(sql, params);

    // Filter out premium promo notifications for premium users
    if (isPremium) {
      notifications = notifications.filter(n => !n.is_premium_promo);
    }

    res.json(successResponse({
      notifications,
      total: notifications.length
    }));
  } catch (error) {
    console.error('Get notifications error:', error);
    next(error);
  }
};

/**
 * GET /api/v1/notifications/unread-count
 * Get unread notification count
 */
const getUnreadCount = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const sql = `
      SELECT COUNT(*) as unread_count
      FROM notifications
      WHERE (user_id = ? OR user_id IS NULL) AND is_read = 0
    `;

    const result = await query(sql, [userId]);
    const unreadCount = result[0]?.unread_count || 0;

    res.json(successResponse({ unread_count: unreadCount }));
  } catch (error) {
    console.error('Get unread count error:', error);
    next(error);
  }
};

/**
 * PUT /api/v1/notifications/:id/read
 * Mark notification as read
 */
const markAsRead = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const sql = `
      UPDATE notifications 
      SET is_read = 1 
      WHERE id = ? AND (user_id = ? OR user_id IS NULL)
    `;

    await query(sql, [id, userId]);

    res.json(successResponse({ message: 'Bildirim okundu olarak işaretlendi' }));
  } catch (error) {
    console.error('Mark as read error:', error);
    next(error);
  }
};

/**
 * PUT /api/v1/notifications/read-all
 * Mark all notifications as read
 */
const markAllAsRead = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const sql = `
      UPDATE notifications 
      SET is_read = 1 
      WHERE user_id = ? OR user_id IS NULL
    `;

    await query(sql, [userId]);

    res.json(successResponse({ message: 'Tüm bildirimler okundu' }));
  } catch (error) {
    console.error('Mark all as read error:', error);
    next(error);
  }
};

/**
 * DELETE /api/v1/notifications/:id
 * Delete a notification
 */
const deleteNotification = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Check if notification is premium promo
    const checkSql = 'SELECT is_premium_promo FROM notifications WHERE id = ?';
    const checkResult = await query(checkSql, [id]);

    if (checkResult.length === 0) {
      return res.status(404).json(errorResponse('NOT_FOUND', 'Bildirim bulunamadı'));
    }

    // Premium promo notifications cannot be deleted by free users
    if (checkResult[0].is_premium_promo === 1) {
      const userSql = 'SELECT is_premium FROM users WHERE id = ?';
      const userResult = await query(userSql, [userId]);
      const isPremium = userResult.length > 0 && userResult[0].is_premium === 1;

      if (!isPremium) {
        return res.status(403).json(errorResponse('FORBIDDEN', 'Premium bildirim silinemez'));
      }
    }

    const sql = 'DELETE FROM notifications WHERE id = ? AND (user_id = ? OR user_id IS NULL)';
    await query(sql, [id, userId]);

    res.json(successResponse({ message: 'Bildirim silindi' }));
  } catch (error) {
    console.error('Delete notification error:', error);
    next(error);
  }
};

/**
 * DELETE /api/v1/notifications/all
 * Delete all notifications
 */
const deleteAllNotifications = async (req, res, next) => {
  try {
    const userId = req.user.id;

    // Check if user is premium
    const userSql = 'SELECT is_premium FROM users WHERE id = ?';
    const userResult = await query(userSql, [userId]);
    const isPremium = userResult.length > 0 && userResult[0].is_premium === 1;

    let sql;
    if (isPremium) {
      // Delete all notifications for premium users
      sql = 'DELETE FROM notifications WHERE user_id = ? OR user_id IS NULL';
    } else {
      // Keep premium promo notifications for free users
      sql = 'DELETE FROM notifications WHERE (user_id = ? OR user_id IS NULL) AND is_premium_promo = 0';
    }

    await query(sql, [userId]);

    res.json(successResponse({ message: 'Bildirimler silindi' }));
  } catch (error) {
    console.error('Delete all notifications error:', error);
    next(error);
  }
};

/**
 * POST /api/v1/notifications/register-device
 * Register device for push notifications (OneSignal player ID)
 */
const registerDevice = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { player_id, platform } = req.body;

    if (!player_id || !platform) {
      return res.status(400).json(errorResponse('INVALID_INPUT', 'Player ID ve platform gerekli'));
    }

    // Store player ID in user_devices table (if exists) or update user profile
    // For now, we'll just update the user profile with the latest player ID
    const sql = 'UPDATE users SET onesignal_player_id = ?, device_platform = ? WHERE id = ?';
    await query(sql, [player_id, platform, userId]);

    // Set external user ID on OneSignal
    if (process.env.ONESIGNAL_APP_ID && process.env.ONESIGNAL_REST_API_KEY) {
      try {
        await axios.put(
          `https://onesignal.com/api/v1/players/${player_id}`,
          {
            app_id: process.env.ONESIGNAL_APP_ID,
            external_user_id: userId
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Basic ${process.env.ONESIGNAL_REST_API_KEY}`
            }
          }
        );
      } catch (onesignalError) {
        console.error('OneSignal set external user ID error:', onesignalError.response?.data || onesignalError.message);
      }
    }

    res.json(successResponse({ message: 'Cihaz kaydedildi' }));
  } catch (error) {
    console.error('Register device error:', error);
    next(error);
  }
};

/**
 * DELETE /api/v1/notifications/unregister-device/:playerId
 * Unregister device (on logout)
 */
const unregisterDevice = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { playerId } = req.params;

    // Remove player ID from user profile
    const sql = 'UPDATE users SET onesignal_player_id = NULL, device_platform = NULL WHERE id = ? AND onesignal_player_id = ?';
    await query(sql, [userId, playerId]);

    // Remove external user ID from OneSignal
    if (process.env.ONESIGNAL_APP_ID && process.env.ONESIGNAL_REST_API_KEY) {
      try {
        await axios.put(
          `https://onesignal.com/api/v1/players/${playerId}`,
          {
            app_id: process.env.ONESIGNAL_APP_ID,
            external_user_id: ''
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Basic ${process.env.ONESIGNAL_REST_API_KEY}`
            }
          }
        );
      } catch (onesignalError) {
        console.error('OneSignal remove external user ID error:', onesignalError.response?.data || onesignalError.message);
      }
    }

    res.json(successResponse({ message: 'Cihaz kaydı silindi' }));
  } catch (error) {
    console.error('Unregister device error:', error);
    next(error);
  }
};

/**
 * POST /api/v1/notifications/send-push
 * Send push notification to user(s) (Admin/System only)
 */
const sendPushNotification = async (req, res, next) => {
  try {
    const { user_ids, title, message, data } = req.body;

    if (!title || !message) {
      return res.status(400).json(errorResponse('INVALID_INPUT', 'Başlık ve mesaj gerekli'));
    }

    if (!process.env.ONESIGNAL_APP_ID || !process.env.ONESIGNAL_REST_API_KEY) {
      return res.status(500).json(errorResponse('CONFIG_ERROR', 'OneSignal yapılandırması eksik'));
    }

    // Prepare OneSignal notification payload
    const payload = {
      app_id: process.env.ONESIGNAL_APP_ID,
      headings: { en: title },
      contents: { en: message },
      data: data || {}
    };

    if (user_ids && user_ids.length > 0) {
      // Send to specific users
      payload.include_external_user_ids = user_ids;
    } else {
      // Send to all subscribed users
      payload.included_segments = ['All'];
    }

    // Send via OneSignal REST API
    const response = await axios.post(
      'https://onesignal.com/api/v1/notifications',
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${process.env.ONESIGNAL_REST_API_KEY}`
        }
      }
    );

    res.json(successResponse({
      message: 'Push bildirimi gönderildi',
      onesignal_response: response.data
    }));
  } catch (error) {
    console.error('Send push notification error:', error.response?.data || error.message);
    next(error);
  }
};

module.exports = {
  getNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  deleteAllNotifications,
  registerDevice,
  unregisterDevice,
  sendPushNotification
};
