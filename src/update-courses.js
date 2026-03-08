const { query } = require('./config/database');

async function revertCourses() {
    try {
        console.log('🔄 Görsel yolları eski haline (PNG) döndürülüyor...\n');

        // Eski PNG yollarının haritalandırması (Senin gönderdiğin ilk tabloya göre)
        const updates = [
            { id: 'course-001', icon: 'assets/images/coursegenel.png' },
            { id: 'course-002', icon: 'assets/images/courseairport.png' },
            { id: 'course-003', icon: 'assets/images/courseyemeicme.png' },
            { id: 'course-004', icon: 'assets/images/coursekonaklama.png' },
            { id: 'course-005', icon: 'assets/images/coursekultur.png' },
            { id: 'course-006', icon: 'assets/images/courseshoping.png' },
            { id: 'course-007', icon: 'assets/images/coursenavigation.png' },
            { id: 'course-008', icon: 'assets/images/coursesport.png' },
            { id: 'course-009', icon: 'assets/images/coursehealth.png' },
            { id: 'course-010', icon: 'assets/images/coursebusiness.png' },
            { id: 'course-011', icon: 'assets/images/courseemergency.png' }
        ];

        // Her bir kurs için UPDATE sorgusu çalıştır
        for (const item of updates) {
            await query("UPDATE courses SET image_url = ? WHERE id = ?", [item.icon, item.id]);
        }

        console.log('✅ Tüm yollar başarıyla PNG olarak güncellendi.\n');

    } catch (error) {
        console.error('❌ Geri alma sırasında bir hata oluştu:', error);
    } finally {
        process.exit(0);
    }
}

revertCourses();