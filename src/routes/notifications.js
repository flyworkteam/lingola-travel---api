const express = require('express');
const router = express.Router();
const notificationsController = require('../controllers/notificationsController');
const { authenticateToken } = require('../middleware/auth');

// All routes require authentication
router.use(authenticateToken);

/**
 * @route   GET /api/v1/notifications
 * @desc    Get user's notifications
 * @access  Private
 */
router.get('/', notificationsController.getNotifications);

/**
 * @route   GET /api/v1/notifications/unread-count
 * @desc    Get unread notification count
 * @access  Private
 */
router.get('/unread-count', notificationsController.getUnreadCount);

/**
 * @route   PUT /api/v1/notifications/:id/read
 * @desc    Mark notification as read
 * @access  Private
 */
router.put('/:id/read', notificationsController.markAsRead);

/**
 * @route   PUT /api/v1/notifications/read-all
 * @desc    Mark all notifications as read
 * @access  Private
 */
router.put('/read-all', notificationsController.markAllAsRead);

/**
 * @route   DELETE /api/v1/notifications/:id
 * @desc    Delete a notification
 * @access  Private
 */
router.delete('/:id', notificationsController.deleteNotification);

/**
 * @route   DELETE /api/v1/notifications/all
 * @desc    Delete all notifications
 * @access  Private
 */
router.delete('/all', notificationsController.deleteAllNotifications);

/**
 * @route   POST /api/v1/notifications/register-device
 * @desc    Register device for push notifications
 * @access  Private
 */
router.post('/register-device', notificationsController.registerDevice);

/**
 * @route   DELETE /api/v1/notifications/unregister-device/:playerId
 * @desc    Unregister device
 * @access  Private
 */
router.delete('/unregister-device/:playerId', notificationsController.unregisterDevice);

/**
 * @route   POST /api/v1/notifications/send-push
 * @desc    Send push notification (Admin/System only)
 * @access  Private (Admin)
 * @note    This endpoint should be protected by admin role check in production
 */
router.post('/send-push', notificationsController.sendPushNotification);

module.exports = router;
