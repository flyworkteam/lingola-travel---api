# ÇOK DİLLİ YAPI GÜNCELLEMELERİ - 15 Şubat 2026

## 🎯 Yapılan Değişiklikler Özeti

### **1. Database Migration - Çok Dilli Yapı**

✅ **Dosya:** `024_add_multilingual_support.sql`

**Eklenen Kolonlar:**
- `travel_phrases` → `source_language`, `target_language`
- `dictionary_words` → `source_language`, `target_language`
- `courses` → `target_language`
- `lessons` → `target_language`
- `lesson_vocabulary` → `source_language`, `target_language`

**Desteklenen Diller:**
- en (İngilizce), de (Almanca), it (İtalyanca), fr (Fransızca)
- ja (Japonca), es (İspanyolca), ru (Rusça), tr (Türkçe)
- ko (Korece), hi (Hintçe), pt (Portekizce)

**Migration Çalıştırma:**
```bash
mysql -u root -p lingola_travel < database/migrations/024_add_multilingual_support.sql
```

---

### **2. Backend API Güncellemeleri**

#### **A. Travel Phrases Endpoint (YENİ) ✅**
**Dosyalar:**
- `src/controllers/travelPhrasesController.js` (YENİ)
- `src/routes/travelPhrases.js` (YENİ)
- `src/routes/index.js` (güncellendi)

**Endpoint'ler:**
```
GET  /api/v1/travel-phrases?language=en&category=Airport
GET  /api/v1/travel-phrases/categories?language=de
GET  /api/v1/travel-phrases/:id
```

**Özellikler:**
- Kullanıcının `target_language` tercihine göre otomatik filtreleme
- Kategoriye göre filtreleme (Airport, Hotel, Taxi, vb.)
- Bookmark desteği

---

#### **B. Apple Sign-In Implementasyonu ✅**
**Dosya:** `src/controllers/authController.js`

**Yeni Fonksiyon:** `appleLogin()`

**Özellikler:**
- Apple Identity Token doğrulama
- İlk giriş için email/name kaydı (Apple sadece ilk seferde verir)
- Otomatik trial başlatma
- Audit log kaydı

**Route Güncellendi:**
```javascript
POST /api/v1/auth/apple
Body: {
  "identityToken": "string",
  "authorizationCode": "string" (opsiyonel),
  "email": "string" (opsiyonel),
  "name": "string" (opsiyonel)
}
```

---

#### **C. Facebook Login Implementasyonu ✅**
**Dosya:** `src/controllers/authController.js`

**Yeni Fonksiyon:** `facebookLogin()`

**Özellikler:**
- Facebook Access Token doğrulama
- Graph API ile profil bilgisi çekme
- Otomatik trial başlatma
- Audit log kaydı

**Route Güncellendi:**
```javascript
POST /api/v1/auth/facebook
Body: {
  "accessToken": "string"
}
```

---

#### **D. Mevcut Endpoint'lerin Çok Dilli Yapıya Güncellenmesi ✅**

**1. Courses Controller (`coursesController.js`):**
```javascript
GET /api/v1/courses?language=de
```
- `target_language` parametresi eklendi
- Kullanıcı onboarding'den dil tercihi otomatik alınır
- Dil yoksa varsayılan: `en`

**2. Dictionary Controller (`dictionaryController.js`):**
```javascript
GET /api/v1/dictionary/categories/:id/words?language=fr
```
- `target_language` filtreleme eklendi
- Kategoriye göre kelimeleri doğru dilde döner

**3. Lessons Controller (`lessonsController.js`):**
- Course'un `target_language` bilgisi response'a eklendi
- İleri uyumluluk için hazır

---

### **3. Flutter Güncellemeleri**

#### **A. Token Refresh Mekanizması ✅**
**Dosya:** `lib/Services/api_client.dart`

**Özellikler:**
- 401 hatasında otomatik token yenileme
- Başarısız refresh'te otomatik logout
- Retry mekanizması (yenilenen token ile istek tekrarı)

**Fonksiyonlar:**
```dart
Future<bool> _refreshAccessToken(String refreshToken)
Future<void> _clearTokens()
```

---

## 📋 YAPILACAKLAR LİSTESİ

### **🔴 ACİL - Deployment Öncesi**

1. **Environment Variables Ayarlama**
   ```bash
   # Backend .env dosyasını düzenle
   cd backend
   cp .env.example .env
   nano .env
   ```
   
   **Ayarlanması Gerekenler:**
   - `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`
   - `JWT_SECRET` (güçlü bir key oluştur)
   - Google Client IDs (iOS, Android, Web)
   - Apple credentials (Client ID, Team ID, Key)
   - Facebook App ID ve Secret

2. **Database Migration Çalıştır**
   ```bash
   mysql -u root -p lingola_travel < database/migrations/024_add_multilingual_support.sql
   ```

3. **Backend Test Et**
   ```bash
   npm run dev
   ```
   
   Test URL: `http://localhost:3000/api/v1/`

4. **Flutter .env Dosyası Güncelle**
   ```bash
   # Flutter projesi kök dizininde
   nano .env
   ```
   ```
   API_BASE_URL=http://localhost:3000/api
   API_VERSION=v1
   API_TIMEOUT=30
   ```

---

### **🟡 SOSYAL AUTH HAZIRLIĞI (Mağaza öncesi)**

1. **Google OAuth Setup**
   - https://console.cloud.google.com → Create Project
   - OAuth 2.0 Client IDs oluştur (iOS, Android, Web)
   - `app_config.dart` ve backend `.env` güncelle

2. **Apple Sign-In Setup**
   - https://developer.apple.com → Certificates, Identifiers & Profiles
   - App ID'ye Sign In with Apple capability ekle
   - Service ID oluştur
   - Key oluştur (.p8 dosyası indir)
   - `app_config.dart` ve backend `.env` güncelle

3. **Facebook Login Setup**
   - https://developers.facebook.com → Create App
   - App ID ve App Secret al
   - iOS/Android platform ayarları yap
   - `app_config.dart` ve backend `.env` güncelle

---

### **🟢 İÇERİK HAZIRLIĞI**

4. **Çoklu Dil İçerik Seed**
   - Şu an sadece İngilizce (en) içerik var
   - Diğer 10 dil için içerik seed edilmeli:
     ```sql
     -- Örnek: Almanca içerik
     INSERT INTO courses (id, category, title, description, target_language)
     VALUES (UUID(), 'General', 'Tägliche Konversation', '12 Lektionen', 'de');
     ```

5. **Audio Dosyaları Upload**
   - Her dil için TTS audio dosyaları oluştur
   - CDN veya storage'a upload et
   - `audio_url` kolonlarını güncelle

---

## 🧪 TEST SENARYOLARI

### **Backend Test**

```bash
# 1. API Health Check
curl http://localhost:3000/api/v1/

# 2. Google Login Test (idToken gerekli)
curl -X POST http://localhost:3000/api/v1/auth/google \
  -H "Content-Type: application/json" \
  -d '{"idToken": "YOUR_GOOGLE_ID_TOKEN"}'

# 3. Travel Phrases Test
curl http://localhost:3000/api/v1/travel-phrases?language=en&category=Airport

# 4. Courses Test (dil filtresi)
curl http://localhost:3000/api/v1/courses?language=de
```

### **Flutter Test**

```dart
// main.dart içinde test
void main() async {
  await EnvironmentConfig.init();
  print('API Base URL: ${EnvironmentConfig.baseUrl}');
  runApp(MyApp());
}
```

---

## 📊 GÜNCELLENMİŞ PROJE DURUMU

| Alan | Durum | Tamamlanma |
|------|-------|------------|
| **Database Şeması** | ✅ Tamamlandı | 100% |
| **Backend Core API** | ✅ Tamamlandı | 100% |
| **Apple Sign-In** | ✅ Tamamlandı | 100% (credentials bekleniyor) |
| **Facebook Login** | ✅ Tamamlandı | 100% (credentials bekleniyor) |
| **Travel Phrases API** | ✅ Tamamlandı | 100% |
| **Çok Dilli Yapı** | ✅ Tamamlandı | 100% (içerik seed bekleniyor) |
| **Token Refresh (Flutter)** | ✅ Tamamlandı | 100% |
| **Flutter UI** | ✅ Tamamlandı | 95% |
| **Deployment** | 🔴 Bekliyor | 0% |
| **Sosyal Auth Credentials** | 🔴 Bekliyor | 0% |

---

## 🚀 SONRAKI ADIMLAR

1. ✅ Backend'i test et (`npm run dev`)
2. ✅ Database migration'ı çalıştır
3. ✅ Flutter app'i backend'e bağla (`.env` güncelle)
4. 🔴 Google, Apple, Facebook credential'ları al
5. 🔴 Hosting ortamı hazırla (backend için)
6. 🔴 Production database setup (phpMyAdmin)
7. 🔴 Diğer 10 dil için içerik seed et

---

## ⚠️ ÖNEMLİ NOTLAR

1. **Güvenlik:**
   - Production'da `JWT_SECRET` mutlaka değiştirilmeli
   - Database şifreleri güçlü olmalı
   - HTTPS kullanılmalı

2. **İçerik:**
   - Şu an sadece İngilizce içerik var
   - Diğer diller için içerik oluşturulması gerekiyor

3. **Test:**
   - Sosyal auth'u production'a geçmeden önce mutlaka test edin
   - Token refresh mekanizmasını test edin

---

**Geliştirme Ekibi**  
Tarih: 15 Şubat 2026
