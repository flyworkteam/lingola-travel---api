const { query } = require('./config/database');

async function fixSchema() {
    try {
        console.log('🛠️ Tablo yapısı kontrol ediliyor ve düzeltiliyor...');

        // 1. lessons tablosuna eksik sütunları ekle
        // Not: IF NOT EXISTS mantığıyla manuel kontrol yapıyoruz
        const columns = await query("SHOW COLUMNS FROM lessons");
        const columnNames = columns.map(c => c.Field);

        if (!columnNames.includes('focus_word')) {
            console.log('➕ focus_word sütunu ekleniyor...');
            await query("ALTER TABLE lessons ADD COLUMN focus_word VARCHAR(255) AFTER description");
        }

        if (!columnNames.includes('main_sentence')) {
            console.log('➕ main_sentence sütunu ekleniyor...');
            await query("ALTER TABLE lessons ADD COLUMN main_sentence TEXT AFTER focus_word");
        }

        // 2. lesson_vocabulary tablosunu temizle ve yeniden oluştur (Garanti olsun)
        console.log('🧹 lesson_vocabulary tablosu yapılandırılıyor...');
        await query(`DROP TABLE IF EXISTS lesson_vocabulary`);
        await query(`
      CREATE TABLE lesson_vocabulary (
        id VARCHAR(50) PRIMARY KEY,
        lesson_id VARCHAR(50),
        term VARCHAR(255),
        definition TEXT,
        meaning_1 VARCHAR(255),
        example_sentence_1 TEXT,
        meaning_2 VARCHAR(255),
        example_sentence_2 TEXT,
        display_order INT,
        source_language VARCHAR(10) DEFAULT 'tr',
        target_language VARCHAR(10) DEFAULT 'en'
      )
    `);

        console.log('✅ Şema başarıyla güncellendi! Şimdi verileri basabilirsin.');
    } catch (error) {
        console.error('❌ Şema düzeltilirken hata oluştu:', error);
    } finally {
        process.exit(0);
    }
}

fixSchema();