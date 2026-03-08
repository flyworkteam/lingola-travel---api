const { body } = require('express-validator');
const { v4: uuidv4 } = require('uuid');
const { query, transaction } = require('../config/database');
const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  hashRefreshToken,
  compareRefreshToken,
  hashPassword,
  comparePassword,
  getRefreshTokenExpiry
} = require('../utils/jwt');
const { successResponse, errorResponse, ErrorCodes } = require('../utils/response');
const { verifyGoogleToken, verifyAppleToken, verifyFacebookToken } = require('../utils/socialAuth');

/**
 * Helper: Create default library folders for new users
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

    console.log(`✅ Created ${defaultFolders.length} default folders for user ${userId}`);
    return true;
  } catch (error) {
    console.error('Error creating default library folders:', error);
    return false;
  }
}

/**
 * Email/Password Login
 */
async function login(req, res) {
  try {
    const { email, password } = req.body;

    const sql = `
      SELECT u.*, uo.target_language, uo.profession, uo.english_level, uo.daily_goal, uo.daily_goal_minutes
      FROM users u
      LEFT JOIN user_onboarding uo ON u.id = uo.user_id
      WHERE u.email = ? AND u.auth_provider = ?
    `;

    const users = await query(sql, [email, 'email']);

    if (users.length === 0) {
      return res.status(401).json(errorResponse(ErrorCodes.ACCOUNT_NOT_FOUND, 'Email kayıtlı değil'));
    }

    const user = users[0];

    const isValidPassword = await comparePassword(password, user.password_hash);
    if (!isValidPassword) {
      return res.status(401).json(errorResponse(ErrorCodes.INVALID_CREDENTIALS, 'Şifre hatalı'));
    }

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    const tokenHash = await hashRefreshToken(refreshToken);
    const expiresAt = getRefreshTokenExpiry();

    await query(
      'INSERT INTO refresh_tokens (user_id, token_hash, expires_at) VALUES (?, ?, ?)',
      [user.id, tokenHash, expiresAt]
    );

    await query('UPDATE users SET last_login_at = NOW() WHERE id = ?', [user.id]);

    await query(
      'INSERT INTO audit_logs (user_id, action, ip_address, user_agent) VALUES (?, ?, ?, ?)',
      [user.id, 'login', req.ip, req.get('user-agent')]
    );

    delete user.password_hash;

    res.json(successResponse({ user, accessToken, refreshToken }));
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json(errorResponse(ErrorCodes.SERVER_ERROR, 'Giriş yapılamadı'));
  }
}

/**
 * Google Sign-In
 */
async function googleLogin(req, res) {
  try {
    const { idToken } = req.body;

    const googleUser = await verifyGoogleToken(idToken);

    if (!googleUser) {
      return res.status(401).json(errorResponse(ErrorCodes.INVALID_CREDENTIALS, 'Google token doğrulanamadı'));
    }

    const sql = `
      SELECT u.*, uo.target_language, uo.profession, uo.english_level, uo.daily_goal, uo.daily_goal_minutes
      FROM users u
      LEFT JOIN user_onboarding uo ON u.id = uo.user_id
      WHERE u.auth_provider = ? AND u.external_auth_id = ?
    `;
    let users = await query(sql, ['google', googleUser.sub]);

    let user;
    let isNewUser = false;

    if (users.length === 0) {
      isNewUser = true;
      const userId = uuidv4();

      await query(
        `INSERT INTO users (id, email, name, photo_url, auth_provider, external_auth_id, trial_started_at) 
         VALUES (?, ?, ?, ?, ?, ?, NOW())`,
        [userId, googleUser.email, googleUser.name, googleUser.picture, 'google', googleUser.sub]
      );

      await query('INSERT INTO user_stats (user_id) VALUES (?)', [userId]);
      await createDefaultLibraryFolders(userId);

      user = {
        id: userId,
        email: googleUser.email,
        name: googleUser.name,
        photo_url: googleUser.picture,
        auth_provider: 'google',
        is_premium: false,
        is_anonymous: false,
        trial_started_at: new Date(),
        target_language: null,
        english_level: null,
        profession: null,
        daily_goal: null,
        daily_goal_minutes: null
      };
    } else {
      user = users[0];
    }

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);
    const tokenHash = await hashRefreshToken(refreshToken);
    const expiresAt = getRefreshTokenExpiry();

    await query('INSERT INTO refresh_tokens (user_id, token_hash, expires_at) VALUES (?, ?, ?)', [user.id, tokenHash, expiresAt]);
    await query('UPDATE users SET last_login_at = NOW() WHERE id = ?', [user.id]);
    await query(
      'INSERT INTO audit_logs (user_id, action, ip_address, user_agent, metadata) VALUES (?, ?, ?, ?, ?)',
      [user.id, isNewUser ? 'google_signup' : 'google_login', req.ip, req.get('user-agent'), JSON.stringify({ isNewUser })]
    );

    delete user.password_hash;
    res.json(successResponse({ user, accessToken, refreshToken }));
  } catch (error) {
    console.error('Google login error:', error);
    res.status(500).json(errorResponse(ErrorCodes.SERVER_ERROR, 'Google girişi başarısız'));
  }
}

/**
 * Apple Sign-In
 */
async function appleLogin(req, res) {
  try {
    const { identityToken, authorizationCode, email, name } = req.body;

    const appleUser = await verifyAppleToken(identityToken);

    if (!appleUser) {
      return res.status(401).json(errorResponse(ErrorCodes.INVALID_CREDENTIALS, 'Apple token doğrulanamadı'));
    }

    const sql = `
      SELECT u.*, uo.target_language, uo.profession, uo.english_level, uo.daily_goal, uo.daily_goal_minutes
      FROM users u
      LEFT JOIN user_onboarding uo ON u.id = uo.user_id
      WHERE u.auth_provider = ? AND u.external_auth_id = ?
    `;
    let users = await query(sql, ['apple', appleUser.sub]);

    let user;
    let isNewUser = false;

    if (users.length === 0) {
      isNewUser = true;
      const userId = uuidv4();
      const userEmail = email || appleUser.email;
      const userName = name || 'Apple User';

      await query(
        `INSERT INTO users (id, email, name, auth_provider, external_auth_id, trial_started_at) 
         VALUES (?, ?, ?, ?, ?, NOW())`,
        [userId, userEmail, userName, 'apple', appleUser.sub]
      );

      await query('INSERT INTO user_stats (user_id) VALUES (?)', [userId]);
      await createDefaultLibraryFolders(userId);

      user = {
        id: userId,
        email: userEmail,
        name: userName,
        photo_url: null,
        auth_provider: 'apple',
        is_premium: false,
        is_anonymous: false,
        trial_started_at: new Date(),
        target_language: null,
        english_level: null,
        profession: null,
        daily_goal: null,
        daily_goal_minutes: null
      };
    } else {
      user = users[0];
      if (email || name) {
        const updates = [];
        const params = [];
        if (email && !user.email) { updates.push('email = ?'); params.push(email); }
        if (name && !user.name) { updates.push('name = ?'); params.push(name); }
        if (updates.length > 0) {
          params.push(user.id);
          await query(`UPDATE users SET ${updates.join(', ')}, updated_at = NOW() WHERE id = ?`, params);
        }
      }
    }

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);
    const tokenHash = await hashRefreshToken(refreshToken);
    const expiresAt = getRefreshTokenExpiry();

    await query('INSERT INTO refresh_tokens (user_id, token_hash, expires_at) VALUES (?, ?, ?)', [user.id, tokenHash, expiresAt]);
    await query('UPDATE users SET last_login_at = NOW() WHERE id = ?', [user.id]);
    await query(
      'INSERT INTO audit_logs (user_id, action, ip_address, user_agent, metadata) VALUES (?, ?, ?, ?, ?)',
      [user.id, isNewUser ? 'apple_signup' : 'apple_login', req.ip, req.get('user-agent'), JSON.stringify({ isNewUser })]
    );

    delete user.password_hash;
    res.json(successResponse({ user, accessToken, refreshToken }));
  } catch (error) {
    console.error('Apple login error:', error);
    res.status(500).json(errorResponse(ErrorCodes.SERVER_ERROR, 'Apple girişi başarısız'));
  }
}

async function updatePremiumStatus(req, res) {
  try {
    const userId = req.user.id; // Authentication middleware'den gelmeli
    const { isPremium, subscriptionType, expiresAt } = req.body;

    if (isPremium === undefined) {
      return res.status(400).json(errorResponse(ErrorCodes.VALIDATION_ERROR, 'isPremium durumu gerekli'));
    }

    // Kullanıcının mevcut durumunu kontrol et
    const userCheck = await query('SELECT id FROM users WHERE id = ?', [userId]);
    if (userCheck.length === 0) {
      return res.status(404).json(errorResponse(ErrorCodes.ACCOUNT_NOT_FOUND, 'Kullanıcı bulunamadı'));
    }

    // Premium statüsünü güncelle
    // Not: Veritabanında premium bitiş tarihi (premium_expires_at) veya abonelik tipi tutuyorsanız
    // o alanları da buraya ekleyebilirsiniz. Şimdilik sadece is_premium güncelleniyor.

    let updateSql = 'UPDATE users SET is_premium = ?, updated_at = NOW() WHERE id = ?';
    let updateParams = [isPremium ? 1 : 0, userId];

    // Eğer veritabanınızda bu alanlar varsa SQL'i genişletin (Opsiyonel)
    /*
    if (expiresAt || subscriptionType) {
       updateSql = 'UPDATE users SET is_premium = ?, subscription_type = ?, premium_expires_at = ?, updated_at = NOW() WHERE id = ?';
       updateParams = [isPremium ? 1 : 0, subscriptionType || 'none', expiresAt || null, userId];
    }
    */

    await query(updateSql, updateParams);

    // İşlemi logla
    await query(
      'INSERT INTO audit_logs (user_id, action, ip_address, user_agent, metadata) VALUES (?, ?, ?, ?, ?)',
      [
        userId,
        isPremium ? 'premium_activated' : 'premium_deactivated',
        req.ip,
        req.get('user-agent'),
        JSON.stringify({ subscriptionType, expiresAt })
      ]
    );

    res.json(successResponse({
      message: `Premium statüsü ${isPremium ? 'aktif' : 'pasif'} olarak güncellendi`,
      is_premium: isPremium
    }));

  } catch (error) {
    console.error('Update premium status error:', error);
    res.status(500).json(errorResponse(ErrorCodes.SERVER_ERROR, 'Premium statüsü güncellenemedi'));
  }
}


/**
 * Facebook Login
 */
async function facebookLogin(req, res) {
  try {
    const { accessToken: fbAccessToken } = req.body;

    const facebookUser = await verifyFacebookToken(fbAccessToken);

    if (!facebookUser) {
      return res.status(401).json(errorResponse(ErrorCodes.INVALID_CREDENTIALS, 'Facebook token doğrulanamadı'));
    }

    const sql = `
      SELECT u.*, uo.target_language, uo.profession, uo.english_level, uo.daily_goal, uo.daily_goal_minutes
      FROM users u
      LEFT JOIN user_onboarding uo ON u.id = uo.user_id
      WHERE u.auth_provider = ? AND u.external_auth_id = ?
    `;
    let users = await query(sql, ['facebook', facebookUser.sub]);

    let user;
    let isNewUser = false;

    if (users.length === 0) {
      isNewUser = true;
      const userId = uuidv4();

      await query(
        `INSERT INTO users (id, email, name, photo_url, auth_provider, external_auth_id, trial_started_at) 
         VALUES (?, ?, ?, ?, ?, ?, NOW())`,
        [userId, facebookUser.email, facebookUser.name, facebookUser.picture, 'facebook', facebookUser.sub]
      );

      await query('INSERT INTO user_stats (user_id) VALUES (?)', [userId]);
      await createDefaultLibraryFolders(userId);

      user = {
        id: userId,
        email: facebookUser.email,
        name: facebookUser.name,
        photo_url: facebookUser.picture,
        auth_provider: 'facebook',
        is_premium: false,
        is_anonymous: false,
        trial_started_at: new Date(),
        target_language: null,
        english_level: null,
        profession: null,
        daily_goal: null,
        daily_goal_minutes: null
      };
    } else {
      user = users[0];
    }

    const jwtAccessToken = generateAccessToken(user.id);
    const jwtRefreshToken = generateRefreshToken(user.id);
    const tokenHash = await hashRefreshToken(jwtRefreshToken);
    const expiresAt = getRefreshTokenExpiry();

    await query('INSERT INTO refresh_tokens (user_id, token_hash, expires_at) VALUES (?, ?, ?)', [user.id, tokenHash, expiresAt]);
    await query('UPDATE users SET last_login_at = NOW() WHERE id = ?', [user.id]);
    await query(
      'INSERT INTO audit_logs (user_id, action, ip_address, user_agent, metadata) VALUES (?, ?, ?, ?, ?)',
      [user.id, isNewUser ? 'facebook_signup' : 'facebook_login', req.ip, req.get('user-agent'), JSON.stringify({ isNewUser })]
    );

    delete user.password_hash;
    res.json(successResponse({ user, accessToken: jwtAccessToken, refreshToken: jwtRefreshToken }));
  } catch (error) {
    console.error('Facebook login error:', error);
    res.status(500).json(errorResponse(ErrorCodes.SERVER_ERROR, 'Facebook girişi başarısız'));
  }
}

/**
 * Anonymous Login
 */
async function anonymousLogin(req, res) {
  try {
    const { deviceId } = req.body;

    if (!deviceId) {
      return res.status(400).json(errorResponse(ErrorCodes.VALIDATION_ERROR, 'Device ID gerekli'));
    }

    const sql = `
      SELECT u.*, uo.target_language, uo.profession, uo.english_level, uo.daily_goal, uo.daily_goal_minutes
      FROM users u
      LEFT JOIN user_onboarding uo ON u.id = uo.user_id
      WHERE u.device_id = ? AND u.is_anonymous = true
    `;
    let users = await query(sql, [deviceId]);

    let user;
    let isNewUser = false;

    if (users.length === 0) {
      isNewUser = true;
      const userId = uuidv4();

      await query(
        `INSERT INTO users (id, device_id, auth_provider, is_anonymous, trial_started_at) 
         VALUES (?, ?, ?, true, NOW())`,
        [userId, deviceId, 'anonymous']
      );

      await query('INSERT INTO user_stats (user_id) VALUES (?)', [userId]);
      await createDefaultLibraryFolders(userId);

      user = {
        id: userId,
        device_id: deviceId,
        auth_provider: 'anonymous',
        is_anonymous: true,
        is_premium: false,
        trial_started_at: new Date(),
        target_language: null,
        english_level: null,
        profession: null,
        daily_goal: null,
        daily_goal_minutes: null
      };
    } else {
      user = users[0];
    }

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);
    const tokenHash = await hashRefreshToken(refreshToken);
    const expiresAt = getRefreshTokenExpiry();

    await query('INSERT INTO refresh_tokens (user_id, token_hash, expires_at) VALUES (?, ?, ?)', [user.id, tokenHash, expiresAt]);
    await query('UPDATE users SET last_login_at = NOW() WHERE id = ?', [user.id]);
    await query(
      'INSERT INTO audit_logs (user_id, action, ip_address, user_agent, metadata) VALUES (?, ?, ?, ?, ?)',
      [user.id, isNewUser ? 'anonymous_signup' : 'anonymous_login', req.ip, req.get('user-agent'), JSON.stringify({ deviceId })]
    );

    res.json(successResponse({ user, accessToken, refreshToken }));
  } catch (error) {
    console.error('Anonymous login error:', error);
    res.status(500).json(errorResponse(ErrorCodes.SERVER_ERROR, 'Anonim giriş başarısız'));
  }
}

/**
 * Refresh Token
 */
async function refreshToken(req, res) {
  try {
    const { refreshToken: token } = req.body;

    if (!token) return res.status(401).json(errorResponse(ErrorCodes.INVALID_TOKEN, 'Refresh token gerekli'));

    const decoded = verifyRefreshToken(token);
    const tokens = await query('SELECT * FROM refresh_tokens WHERE user_id = ? AND expires_at > NOW()', [decoded.userId]);

    if (tokens.length === 0) return res.status(401).json(errorResponse(ErrorCodes.TOKEN_NOT_FOUND, 'Token bulunamadı veya süresi doldu'));

    let validToken = null;
    for (const t of tokens) {
      if (await compareRefreshToken(token, t.token_hash)) {
        validToken = t;
        break;
      }
    }

    if (!validToken) return res.status(401).json(errorResponse(ErrorCodes.INVALID_TOKEN, 'Geçersiz refresh token'));

    const newAccessToken = generateAccessToken(decoded.userId);
    const newRefreshToken = generateRefreshToken(decoded.userId);
    const newTokenHash = await hashRefreshToken(newRefreshToken);
    const expiresAt = getRefreshTokenExpiry();

    await transaction(async (conn) => {
      await conn.execute('DELETE FROM refresh_tokens WHERE id = ?', [validToken.id]);
      await conn.execute('INSERT INTO refresh_tokens (user_id, token_hash, expires_at) VALUES (?, ?, ?)', [decoded.userId, newTokenHash, expiresAt]);
    });

    res.json(successResponse({ accessToken: newAccessToken, refreshToken: newRefreshToken }));
  } catch (error) {
    console.error('Refresh token error:', error);
    res.status(401).json(errorResponse(ErrorCodes.INVALID_TOKEN, 'Token yenileneme hatası'));
  }
}

/**
 * Logout
 */
async function logout(req, res) {
  try {
    const { refreshToken: token } = req.body;
    if (!token) return res.json(successResponse({ message: 'Çıkış yapıldı' }));

    const decoded = verifyRefreshToken(token);
    await query('DELETE FROM refresh_tokens WHERE user_id = ?', [decoded.userId]);
    await query('INSERT INTO audit_logs (user_id, action, ip_address, user_agent) VALUES (?, ?, ?, ?)', [decoded.userId, 'logout', req.ip, req.get('user-agent')]);

    res.json(successResponse({ message: 'Çıkış yapıldı' }));
  } catch (error) {
    console.error('Logout error:', error);
    res.json(successResponse({ message: 'Çıkış yapıldı' }));
  }
}

module.exports = {
  login, googleLogin, appleLogin, facebookLogin, anonymousLogin, refreshToken, logout, updatePremiumStatus
};