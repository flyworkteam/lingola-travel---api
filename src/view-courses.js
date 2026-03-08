const { query } = require('./config/database');

async function showAllLessons() {
    try {
        console.log('🔍 lessons tablosundaki veriler çekiliyor...\n');

        // Dersleri kurslarına ve sırasına göre gruplayarak getiriyoruz
        const sql = `
      SELECT 
        id,
        course_id,
        title,
        lesson_order,
        total_steps,
        target_language,
        image_url,
        audio_url
      FROM lessons 
      ORDER BY course_id ASC, lesson_order ASC
    `;

        const lessons = await query(sql);

        if (lessons.length === 0) {
            console.log('⚠️ lessons tablosunda henüz hiç ders bulunmuyor.');
        } else {
            console.log(`✅ Toplam ${lessons.length} ders bulundu:\n`);
            // Terminalde tablo şeklinde yazdır
            console.table(lessons);
        }

    } catch (error) {
        console.error('❌ Dersler çekilirken bir hata oluştu:', error);
    } finally {
        process.exit(0);
    }
}

showAllLessons();