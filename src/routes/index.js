const express = require('express');
const router = express.Router();

// Import route modules
const authRoutes = require('./auth');
const coursesRoutes = require('./courses');
const lessonsRoutes = require('./lessons');
const dictionaryRoutes = require('./dictionary');
const profileRoutes = require('./profile');
const libraryRoutes = require('./library');
const travelPhrasesRoutes = require('./travelPhrases');
const notificationsRoutes = require('./notifications');

// Mount routes
router.use('/auth', authRoutes);
router.use('/courses', coursesRoutes);
router.use('/lessons', lessonsRoutes);
router.use('/dictionary', dictionaryRoutes);
router.use('/profile', profileRoutes);
router.use('/library', libraryRoutes);
router.use('/travel-phrases', travelPhrasesRoutes);
router.use('/notifications', notificationsRoutes);

// API info endpoint
router.get('/', (req, res) => {
  res.json({
    success: true,
    data: {
      name: 'Lingola Travel API',
      version: 'v1',
      endpoints: {
        auth: '/api/v1/auth',
        courses: '/api/v1/courses',
        lessons: '/api/v1/lessons',
        dictionary: '/api/v1/dictionary',
        travelPhrases: '/api/v1/travel-phrases',
        profile: '/api/v1/profile',
        library: '/api/v1/library'
      }
    }
  });
});

module.exports = router;
