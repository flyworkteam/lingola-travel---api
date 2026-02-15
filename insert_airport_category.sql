-- Airport Category and Words
-- Run this SQL file to add Airport category to your database
-- Usage: mysql -u root -p lingola_travel < insert_airport_category.sql

-- Insert Airport category
INSERT INTO dictionary_categories (id, name, icon_path, color, display_order, created_at)
VALUES ('dict-cat-011', 'Airport', 'assets/images/airport.png', '#B8A7FF', 11, NOW())
ON DUPLICATE KEY UPDATE name='Airport';

-- Insert Airport words
INSERT INTO dictionary_words (id, word, translation, category_id, created_at) VALUES
('airport-001', 'Boarding Pass', 'Biniş Kartı', 'dict-cat-011', NOW()),
('airport-002', 'Gate', 'Kapı', 'dict-cat-011', NOW()),
('airport-003', 'Departure', 'Kalkış', 'dict-cat-011', NOW()),
('airport-004', 'Arrival', 'Varış', 'dict-cat-011', NOW()),
('airport-005', 'Check-in', 'Giriş İşlemleri', 'dict-cat-011', NOW()),
('airport-006', 'Passport', 'Pasaport', 'dict-cat-011', NOW()),
('airport-007', 'Luggage', 'Bagaj', 'dict-cat-011', NOW()),
('airport-008', 'Security', 'Güvenlik', 'dict-cat-011', NOW()),
('airport-009', 'Terminal', 'Terminal', 'dict-cat-011', NOW()),
('airport-010', 'Flight', 'Uçuş', 'dict-cat-011', NOW())
ON DUPLICATE KEY UPDATE word=VALUES(word);

-- Verify insertion
SELECT 'Airport category created!' as status;
SELECT COUNT(*) as total_words FROM dictionary_words WHERE category_id = 'dict-cat-011';
