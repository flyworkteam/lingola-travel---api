const express = require('express');
const router = express.Router();
const policiesController = require('../controllers/policiesController');

/**
 * @route   GET /api/policies/privacy
 * @desc    Get Privacy Policy
 * @access  Public
 */
router.get('/privacy', policiesController.getPrivacyPolicy);

/**
 * @route   GET /api/policies/terms
 * @desc    Get Terms of Service
 * @access  Public
 */
router.get('/terms', policiesController.getTermsOfService);

/**
 * @route   GET /api/policies/cookies
 * @desc    Get Cookies Policy
 * @access  Public
 */
router.get('/cookies', policiesController.getCookiesPolicy);

/**
 * @route   GET /api/policies
 * @desc    Get all policies overview
 * @access  Public
 */
router.get('/', policiesController.getAllPolicies);

module.exports = router;
