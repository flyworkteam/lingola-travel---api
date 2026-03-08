const { query } = require('./config/database'); // Yolu kendi klasör yapına göre düzelt

async function listAllLessons() {
    try {
        // Sadece başlıkları çekiyoruz ve sıralıyoruz
        const sql = `
            SELECT title 
            FROM lessons 
            ORDER BY course_id ASC, lesson_order ASC
        `;

        const lessons = await query(sql);

        if (lessons.length === 0) {
            console.log('Hiç ders bulunamadı.');
            process.exit(0);
        }

        // Sadece ders isimlerini alt alta yazdır
        lessons.forEach((lesson, index) => {
            console.log(`${index + 1}. ${lesson.title}`);
        });

        process.exit(0);
    } catch (error) {
        console.error('Hata:', error.message);
        process.exit(1);
    }
}

listAllLessons();