-- Create policies table for storing legal documents (Privacy Policy, Terms of Service, Cookies Policy)
-- This migration should be run once to create the policies system

CREATE TABLE IF NOT EXISTS policies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type ENUM('privacy', 'terms', 'cookies') NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    content LONGTEXT NOT NULL,
    version VARCHAR(50) DEFAULT '1.0',
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_type (type),
    INDEX idx_is_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert initial Privacy Policy (Turkish)
INSERT INTO policies (type, title, content, version) VALUES (
    'privacy',
    'Lingola Travel – Gizlilik Politikası',
    '# Lingola Travel – Gizlilik Politikası

**Son Güncelleme Tarihi: 2025**

Bu Gizlilik Politikası, Lingola Travel mobil uygulamasını ("Uygulama") kullanan tüm kullanıcıların kişisel verilerinin toplanması, kullanılması, saklanması ve korunmasına ilişkin esasları açıklar. Uygulamayı kullanarak bu politikayı kabul etmiş sayılırsınız.

Lingola Travel, kullanıcı gizliliğini ve veri güvenliğini temel ilke olarak benimser. Tüm kişisel veriler, geçerli veri koruma düzenlemelerine (KVKK, GDPR ve ilgili diğer mevzuatlar) uygun şekilde işlenir.

## 1. Toplanan Bilgiler

Uygulama, hizmetlerin sağlanabilmesi amacıyla aşağıdaki veri türlerini toplayabilir:

### 1.1. Kullanıcı Tarafından Sağlanan Veriler

- Ad, takma ad veya profil bilgileri
- E-posta adresi (kayıt, abonelik ve destek işlemleri için)
- Kullanıcının uygulama içindeki seyahat temalı kelime çalışmaları ve oluşturduğu içerikler
- Dil tercihleri, öğrenme seviyesi ve kişiselleştirme ayarları
- Geri bildirimler, talepler ve destek mesajları

### 1.2. Otomatik Olarak Toplanan Veriler

- Cihaz türü, işletim sistemi, model ve teknik bilgiler
- Yaklaşık konum verisi (şehir/ülke bazında)
- Uygulama kullanım alışkanlıkları (oturum süresi, kelime tekrarları, ekran etkileşimleri vb.)
- Performans, hata ve çökme kayıtları

### 1.3. Üçüncü Taraf Entegrasyonları

- Kimlik doğrulama servisleri (Google, Apple vb.)
- Analitik, performans ve uygulama mağazası ölçüm araçları

Toplanan veriler, yalnızca Lingola Travel''ın çalışması, geliştirilmesi ve kullanıcı deneyiminin iyileştirilmesi amacıyla işlenir.

## 2. Verilerin Kullanım Amaçları

Toplanan kişisel veriler aşağıdaki amaçlarla kullanılabilir:

- Uygulamanın doğru ve kesintisiz çalışmasını sağlamak
- Seyahat odaklı kelime öğrenme deneyimini kişiselleştirmek
- Kullanıcı tercihlerini hatırlamak ve geliştirilmiş öğrenme akışı sunmak
- Hata tespiti, performans analizi ve uygulama optimizasyonu
- Kullanıcı taleplerine ve destek başvurularına yanıt vermek
- Yapay zekâ ve öğrenme algoritmalarını geliştirmek (anonimleştirilmiş veri kullanımıyla)
- Yasal yükümlülüklerin yerine getirilmesi

**Kullanıcı verileri hiçbir şekilde üçüncü taraflara satılmaz.**

## 3. Veri Saklama Süresi

Kişisel veriler aşağıdaki esaslara göre saklanır:

- Kullanıcı hesabı aktif olduğu sürece
- Yasal yükümlülüklerin gerektirdiği süre boyunca
- Destek taleplerine ilişkin kayıtlar, işlem tamamlandıktan sonra en fazla 12 ay
- Kullanıcı hesabını sildiğinde, tüm kişisel veriler geri döndürülemez biçimde sistemden silinir

## 4. Verilerin Paylaşımı

Veriler yalnızca aşağıdaki durumlarda paylaşılabilir:

- **Yasal gereklilikler:** Mahkeme kararları ve resmi kurum talepleri
- **Hizmet sağlayıcılar:** Bulut altyapısı, analitik, hata ayıklama ve ödeme sistemleri
- **Kullanıcı onayı:** Kullanıcının açık rızası ile yapılan paylaşımlar

Paylaşılan veriler mümkün olduğunca anonimleştirilir ve minimum veri ilkesi esas alınır.

## 5. Çerezler ve İzleme Teknolojileri

Lingola Travel, uygulama performansını ölçmek ve kullanıcı deneyimini iyileştirmek amacıyla çerezler ve benzeri izleme teknolojileri kullanabilir. Bu teknolojiler:

- Hizmet sürekliliğini sağlama
- Performans optimizasyonu
- Kullanıcı tercihlerini hatırlama

amaçlarına yöneliktir ve kişisel takip amacı taşımaz.

## 6. Kullanıcı Hakları

KVKK ve GDPR kapsamında kullanıcıların sahip olduğu haklar:

- Kişisel verilere erişim talep etme
- Verilerin düzeltilmesini isteme
- Verilerin silinmesini talep etme ("unutulma hakkı")
- Verilerin işlenmesini kısıtlama
- Veri taşınabilirliği talep etme
- Açık rızayı geri çekme hakkı

Bu haklarınızı kullanmak için:

📩 **support@fly-work.com**

## 7. Güvenlik Önlemleri

Lingola Travel, kullanıcı verilerini korumak amacıyla teknik ve idari güvenlik önlemleri uygular:

- SSL / TLS şifreleme
- Güvenlik duvarları ve erişim kontrol sistemleri
- Yetkilendirilmiş erişim protokolleri
- Düzenli güvenlik denetimleri

## 8. Çocukların Gizliliği

Lingola Travel, 13 yaş altı kişilere yönelik değildir ve bu yaş grubundan bilerek veri toplamaz.

Bu tür bir kullanım tespit edilirse ilgili hesap kapatılır ve veriler silinir.

## 9. Politika Değişiklikleri

Lingola Travel, bu Gizlilik Politikası''nı güncelleyebilir.

Güncellemeler uygulama içinde yayımlandığı andan itibaren yürürlüğe girer ve kullanıcılar bilgilendirilir.

## 10. İletişim

Gizlilik Politikası ile ilgili her türlü soru ve talep için:

📩 **support@fly-work.com**',
    '1.0'
);

-- Insert Terms of Service (Turkish - full content)
INSERT INTO policies (type, title, content, version) VALUES (
    'terms',
    'Lingola Travel – Hizmet Şartları',
    '# Lingola Travel – Hizmet Şartları (Terms of Service)

**Son Güncelleme: 2025**

Bu Hizmet Şartları ("Şartlar"), Lingola Travel mobil uygulamasını ("Uygulama") kullanmanız için geçerli olan kuralları içerir. Uygulamayı kullanarak bu Şartları kabul etmiş sayılırsınız. Şartları kabul etmiyorsanız Uygulama''yı kullanmamalısınız.

Lingola Travel, kullanıcıların yabancı dillerde seyahat, ulaşım, konaklama ve günlük iletişim kelime bilgilerini geliştirmelerine yardımcı olmak amacıyla hazırlanmış bir dil öğrenme uygulamasıdır. Uygulama; resmi eğitim, akademik sertifikasyon veya profesyonel dil eğitimi hizmeti sunmaz.

## 1. Hizmetin Kapsamı

Lingola Travel, kullanıcılara seyahat odaklı yabancı dil kelimelerini öğrenmeye ve kelime bilgisini geliştirmeye yönelik dijital bir öğrenme deneyimi sunar.

Uygulama aşağıdaki hizmetleri içerebilir:

- Seyahat, ulaşım, konaklama ve günlük iletişim kelimeleri
- Tema ve durum bazlı kelime listeleri
- Yapay zekâ destekli kelime önerileri
- Kişisel kelime defteri ve ilerleme takibi
- Kullanıcı alışkanlıklarına göre kişiselleştirilmiş öğrenme deneyimi

Lingola Travel''da sunulan içerikler, resmi bir eğitim programı veya dil yeterliliği garantisi anlamına gelmez.

## 2. Uygulamayı Kullanma Koşulları

Uygulamayı kullanabilmek için:

- En az 13 yaşında olmalısınız
- Hesap bilgilerinizi doğru ve güncel şekilde sağlamalısınız
- Uygulama içeriğini kötüye kullanmamalısınız
- Sunulan içeriklerin destekleyici öğrenme amacı taşıdığını kabul etmelisiniz

## 3. Yasaklı Kullanımlar

Aşağıdaki davranışlar yasaktır:

- Uygulamayı yasa dışı faaliyetler için kullanmak
- Gerçek kişileri veya kurumları taklit etmek
- Nefret söylemi, tehdit, hakaret veya uygunsuz içerik üretmek
- Sisteme izinsiz erişim, hack girişimi veya reverse engineering işlemleri
- Yapay zekâ veya öğrenme sistemlerini manipüle etmeye çalışmak
- Uygulama içeriklerini izinsiz satmak, çoğaltmak veya paylaşmak

## 4. Hesap ve Üyelik

Lingola Travel''da hesap oluşturduğunuzda:

- Sağladığınız bilgilerin doğruluğundan siz sorumlusunuz
- Hesabınızı üçüncü kişilerle paylaşmamalısınız
- Şifre güvenliğiniz size aittir
- Dilediğiniz zaman hesabınızı silebilirsiniz

Lingola Travel, Şartlara aykırı kullanım tespit edilmesi halinde kullanıcı hesaplarını askıya alma veya kapatma hakkını saklı tutar.

## 5. Premium ve Ücretli Hizmetler

Lingola Travel''da bazı özellikler ücretli olabilir. Bu hizmetleri satın alırken:

- Ücretlendirme App Store ve Google Play politikalarına göre yapılır
- Abonelikler dönem sonunda otomatik olarak yenilenebilir
- Abonelik iptalleri mağaza ayarları üzerinden gerçekleştirilir
- Ücret iadeleri ilgili uygulama mağazasının politikalarına tabidir

## 6. İçerik ve Sorumluluk Reddi

Lingola Travel''da sunulan içerikler dijital sistemler ve yapay zekâ destekli mekanizmalarla oluşturulabilir.

İçerikler profesyonel veya akademik görüş yerine geçmez.

Kullanıcı, edindiği bilgileri kendi sorumluluğunda kullanır.

Lingola Travel, seyahat amaçlı dil öğrenme sürecinde kesin başarı veya seviye garantisi vermez.

## 7. Fikri Mülkiyet Hakları

Uygulama tasarımı, yazılımı, kelime içerikleri, metinler, görseller ve yapay zekâ çıktıları dahil olmak üzere tüm içeriklerin kullanım hakları Lingola Travel''a aittir veya lisanslıdır.

İzinsiz olarak:

- Kopyalama
- Çoğaltma
- Satma veya yeniden dağıtma
- Kaynak kodunu inceleme veya değiştirme

işlemleri yapılamaz.

## 8. Veri Gizliliği ve Güvenliği

Lingola Travel tarafından işlenen tüm veriler, Gizlilik Politikası''na uygun şekilde korunur.

Gizlilik Politikası bu Şartların ayrılmaz bir parçasıdır.

Uygulamayı kullanan herkes Gizlilik Politikası''nı kabul etmiş sayılır.

## 9. Hizmette Değişiklikler

Lingola Travel, hizmetlerini geliştirmek amacıyla:

- Uygulama özelliklerini güncelleyebilir, değiştirebilir veya kaldırabilir
- Hizmet Şartlarını güncelleyebilir

Yapılan değişiklikler, uygulama içinde yayımlandığı anda geçerli olur.

## 10. Sorumluluğun Sınırı

Lingola Travel aşağıdakilerden sorumlu değildir:

- İçeriklerin kullanımından doğabilecek sonuçlar
- Uygulamanın hatalı veya kötüye kullanımı
- Cihaz, bağlantı veya internet sorunları
- Üçüncü taraf hizmet sağlayıcılardan kaynaklanan aksaklıklar

Kullanıcı, Uygulama''yı "olduğu gibi" kullanmayı kabul eder.

## 11. Fesih

Lingola Travel aşağıdaki durumlarda kullanıcı hesabını kapatma veya askıya alma hakkını saklı tutar:

- Şartlara aykırı kullanım
- Dolandırıcılık veya kötü niyetli davranış
- Uygunsuz içerik üretimi
- Güvenlik ihlalleri

Kullanıcı, dilediği zaman hesabını silebilir ve uygulamayı kullanmayı bırakabilir.

## 12. Uygulanacak Hukuk

Bu Şartlar, Türkiye Cumhuriyeti yasalarına tabidir.

Uyuşmazlık durumlarında İstanbul Merkez Mahkemeleri ve İcra Daireleri yetkilidir.

## 13. İletişim

Her türlü talep, soru ve bildirim için:

📩 **support@fly-work.com**',
    '1.0'
);

-- Insert Cookies Policy (Turkish - sample content)
INSERT INTO policies (type, title, content, version) VALUES (
    'cookies',
    'Lingola Travel – Çerez Politikası',
    '# Lingola Travel – Çerez Politikası

**Son Güncelleme Tarihi: 2025**

Bu Çerez Politikası, Lingola Travel uygulamasında çerezlerin ve benzeri teknolojilerin nasıl kullanıldığını açıklar.

## 1. Çerez Nedir?

Çerezler, web siteleri ve uygulamalar tarafından cihazınıza kaydedilen küçük metin dosyalarıdır. Bu dosyalar, kullanıcı deneyimini iyileştirmek ve hizmeti optimize etmek için kullanılır.

## 2. Kullandığımız Çerez Türleri

### 2.1. Zorunlu Çerezler

Uygulamanın temel işlevlerini yerine getirmesi için gereklidir.

### 2.2. Performans Çerezleri

Uygulamanın nasıl kullanıldığını anlamamıza yardımcı olur.

### 2.3. Fonksiyonel Çerezler

Kullanıcı tercihlerini hatırlamak için kullanılır.

## 3. Çerez Yönetimi

Kullanıcılar, cihaz ayarları üzerinden çerezleri yönetebilir veya silebilir.

## 4. İletişim

📩 **support@fly-work.com**',
    '1.0'
);
