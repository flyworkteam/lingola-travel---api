// Travel Phrases Routes
const express = require('express');
const router = express.Router();
const travelPhrasesController = require('../controllers/travelPhrasesController');
const { optionalAuth, authenticateToken } = require('../middleware/auth');

/**
 * GET /api/v1/travel-phrases
 * Get all travel phrases (filtered by language and category)
 * Query params: ?language=en&category=Airport&phrase_type=question
 */
router.get('/', optionalAuth, travelPhrasesController.getTravelPhrases);

/**
 * GET /api/v1/travel-phrases/categories
 * Get all categories with counts
 * Query params: ?language=en
 */
router.get('/categories', optionalAuth, travelPhrasesController.getCategories);

/**
 * GET /api/v1/travel-phrases/:id
 * Get single travel phrase by ID
 */
router.get('/:id', optionalAuth, travelPhrasesController.getTravelPhraseById);

module.exports = router;
