# 🔔 OneSignal Push Notification Setup Guide

## Overview
This document provides step-by-step instructions for configuring OneSignal push notifications in Lingola Travel app.

---

## 1. Create OneSignal Account

1. Go to [https://onesignal.com/](https://onesignal.com/)
2. Sign up for a free account
3. Create a new app:
   - **App Name**: Lingola Travel
   - **Platform**: Choose both iOS and Android

---

## 2. iOS Configuration (Apple Push Notification Service - APNS)

### Step 1: Create APNs Auth Key in Apple Developer
1. Go to [https://developer.apple.com/account/resources/authkeys/list](https://developer.apple.com/account/resources/authkeys/list)
2. Click **+ (Create a key)**
3. Key Name: `Lingola Travel Push Notifications`
4. Enable checkbox: **Apple Push Notifications service (APNs)**
5. Click **Continue** → **Register**
6. **Download the .p8 file** (SAVE IT - can only download once!)
7. Note your:
   - **Key ID** (e.g., `ABC123DEF4`)
   - **Team ID** (top right, e.g., `JK42R39DT5`)

### Step 2: Configure OneSignal iOS Settings
1. In OneSignal dashboard → **Settings** → **Platforms** → **Apple iOS**
2. Upload Configuration:
   - Upload your `.p8` file
   - Enter **Key ID**
   - Enter **Team ID**
   - Bundle ID: `com.flywork.lingolatravel`
3. Click **Save**

---

## 3. Android Configuration (Firebase Cloud Messaging - FCM)

### Step 1: Create Firebase Project
1. Go to [https://console.firebase.google.com/](https://console.firebase.google.com/)
2. Click **Add project**
3. Project name: `Lingola Travel`
4. Continue through setup (disable Google Analytics if not needed)

### Step 2: Add Android App to Firebase
1. In Firebase Console → Click **Android icon**
2. Register app:
   - **Package name**: `com.flywork.lingolatravel`
   - **App nickname**: Lingola Travel Android
   - **Debug signing certificate SHA-1**: (Optional for now)
3. Click **Register app**
4. Download `google-services.json` → Save to `lingola_travel/android/app/`
5. Continue through setup (Firebase SDK already added in project)

### Step 3: Get Firebase Server Key
1. Firebase Console → **Project Settings** (⚙️)
2. Go to **Cloud Messaging** tab
3. Under **Project credentials**:
   - Enable **Cloud Messaging API** if not enabled
   - Copy **Server Key** (or **Legacy server key**)

### Step 4: Configure OneSignal Android Settings
1. In OneSignal dashboard → **Settings** → **Platforms** → **Google Android (FCM)**
2. Paste your **Firebase Server Key**
3. Click **Save**

---

## 4. Get OneSignal Credentials

After configuring both platforms:

1. Go to **Settings** → **Keys & IDs**
2. Copy these values:

```
OneSignal App ID: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
REST API Key: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

## 5. Update Flutter App Configuration

### Update `app_config.dart`:
```dart
// lib/Core/Config/app_config.dart
static const String oneSignalAppId = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'; // Paste your App ID
```

### Add `google-services.json` (Android):
- Place the downloaded file in: `android/app/google-services.json`

### Update `Info.plist` (iOS):
Already configured in the project. No additional changes needed for OneSignal.

---

## 6. Update Backend Configuration

### Update `.env` file:
```env
# OneSignal Push Notifications
ONESIGNAL_APP_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
ONESIGNAL_REST_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

## 7. Database Migration (Users Table)

Run this SQL to add OneSignal player ID columns to users table:

```sql
-- Add OneSignal device tracking columns
ALTER TABLE users 
ADD COLUMN onesignal_player_id VARCHAR(255) NULL AFTER device_id,
ADD COLUMN device_platform ENUM('ios', 'android') NULL AFTER onesignal_player_id,
ADD INDEX idx_onesignal_player (onesignal_player_id);
```

---

## 8. Test Push Notifications

### Option 1: Via OneSignal Dashboard
1. Go to **Messages** → **New Push**
2. Configure:
   - **Audience**: Send to Test Users
   - **Message**: Type your test message
3. Click **Send Message**

### Option 2: Via Backend API

**Send Push to All Users:**
```bash
POST /api/v1/notifications/send-push
Authorization: Bearer <admin_token>

{
  "title": "Test Notification",
  "message": "This is a test push notification!",
  "data": {
    "screen": "home",
    "action": "open_course"
  }
}
```

**Send Push to Specific User:**
```bash
POST /api/v1/notifications/send-push
Authorization: Bearer <admin_token>

{
  "user_ids": ["user-uuid-1", "user-uuid-2"],
  "title": "Personal Message",
  "message": "Hello from Lingola Travel!",
  "data": {
    "type": "reminder"
  }
}
```

---

## 9. How It Works

### User Flow:
1. **App Launch**: OneSignal initializes in `main.dart`
2. **Permission Request**: iOS asks permission, Android auto-granted
3. **Device Registration**: 
   - OneSignal generates `player_id`
   - App sends to backend: `POST /api/v1/notifications/register-device`
   - Backend stores player_id in `users` table
4. **User Login**: 
   - Backend sets `external_user_id` on OneSignal
   - Links device to specific user
5. **Send Notification**:
   - Admin/System calls backend API
   - Backend calls OneSignal REST API
   - OneSignal delivers to device
6. **Notification Received**:
   - Foreground: Shows in-app alert
   - Background: Shows system notification
   - Tap opens app with data

### In-App Notifications:
- Stored in database `notifications` table
- Displayed in NotificationsView
- Premium users: No promo notifications
- Free users: Sticky premium promo at top

---

## 10. Troubleshooting

### iOS Not Receiving Notifications
- Verify APNs Auth Key uploaded correctly
- Check Bundle ID matches: `com.flywork.lingolatravel`
- Ensure device has granted notification permission
- Test on physical device (not simulator)

### Android Not Receiving Notifications
- Verify `google-services.json` is in `android/app/`
- Check package name matches: `com.flywork.lingolatravel`
- Enable Firebase Cloud Messaging API in Firebase Console
- Check device has Google Play Services

### No Notifications Showing
- Check OneSignal dashboard → **Delivery** tab for errors
- Verify player_id is registered in database
- Check backend logs for API errors
- Ensure `ONESIGNAL_APP_ID` matches in app and backend

---

## 11. Best Practices

### Notification Content:
- **Title**: Keep under 40 characters
- **Message**: Keep under 120 characters
- **Icon/Image**: Use high-res images (1024x1024)

### Timing:
- Avoid sending at night (respect user's timezone)
- Send learning reminders between 9 AM - 9 PM
- Limit to 1-2 notifications per day

### Segmentation:
- Use tags for targeting:
  - `language`: User's target language
  - `subscription`: free/premium
  - `last_active`: Days since last open
- Send relevant content only

### Data Payload:
- Always include navigation data
- Example:
  ```json
  {
    "screen": "course_detail",
    "course_id": "course-001",
    "lesson_id": "lesson-123"
  }
  ```

---

## 12. Security Notes

⚠️ **IMPORTANT**:
- Keep REST API Key secret (backend only)
- Never expose in mobile app code
- Use backend proxy for sending notifications
- Validate user permissions before sending

---

## Support Resources

- **OneSignal Docs**: [https://documentation.onesignal.com/](https://documentation.onesignal.com/)
- **Firebase Docs**: [https://firebase.google.com/docs](https://firebase.google.com/docs)
- **Apple Developer**: [https://developer.apple.com/](https://developer.apple.com/)

---

## Contact

For implementation issues, contact the development team.

**Created**: February 18, 2026  
**Version**: 1.0.0
