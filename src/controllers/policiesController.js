const db = require('../config/database');

/**
 * Get Privacy Policy
 * GET /api/policies/privacy
 */
exports.getPrivacyPolicy = async (req, res) => {
  try {
    const rows = await db.query(
      'SELECT title, content, version, updated_at FROM policies WHERE type = ? AND is_active = TRUE ORDER BY version DESC LIMIT 1',
      ['privacy']
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Privacy policy not found'
      });
    }

    res.json({
      success: true,
      data: {
        title: rows[0].title,
        content: rows[0].content,
        version: rows[0].version,
        lastUpdated: rows[0].updated_at
      }
    });
  } catch (error) {
    console.error('❌ Error fetching privacy policy:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching privacy policy'
    });
  }
};

/**
 * Get Terms of Service
 * GET /api/policies/terms
 */
exports.getTermsOfService = async (req, res) => {
  try {
    const rows = await db.query(
      'SELECT title, content, version, updated_at FROM policies WHERE type = ? AND is_active = TRUE ORDER BY version DESC LIMIT 1',
      ['terms']
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Terms of service not found'
      });
    }

    res.json({
      success: true,
      data: {
        title: rows[0].title,
        content: rows[0].content,
        version: rows[0].version,
        lastUpdated: rows[0].updated_at
      }
    });
  } catch (error) {
    console.error('❌ Error fetching terms of service:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching terms of service'
    });
  }
};

/**
 * Get Cookies Policy
 * GET /api/policies/cookies
 */
exports.getCookiesPolicy = async (req, res) => {
  try {
    const rows = await db.query(
      'SELECT title, content, version, updated_at FROM policies WHERE type = ? AND is_active = TRUE ORDER BY version DESC LIMIT 1',
      ['cookies']
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Cookies policy not found'
      });
    }

    res.json({
      success: true,
      data: {
        title: rows[0].title,
        content: rows[0].content,
        version: rows[0].version,
        lastUpdated: rows[0].updated_at
      }
    });
  } catch (error) {
    console.error('❌ Error fetching cookies policy:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching cookies policy'
    });
  }
};

/**
 * Get all policies (for admin or overview)
 * GET /api/policies
 */
exports.getAllPolicies = async (req, res) => {
  try {
    const rows = await db.query(
      'SELECT type, title, version, updated_at FROM policies WHERE is_active = TRUE GROUP BY type HAVING MAX(version)'
    );

    res.json({
      success: true,
      data: rows
    });
  } catch (error) {
    console.error('❌ Error fetching policies:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching policies'
    });
  }
};
