-- Migration: 025_seed_multilingual_content.sql
-- Description: Seed initial content for 10 target languages
-- Date: 2026-02-15

USE lingola_travel;

-- =====================================================================
-- 1. SEED TRAVEL PHRASES (Turkish -> Target)
-- =====================================================================

-- Hello / Merhaba
INSERT INTO travel_phrases (category, english_text, translation, source_language, target_language, phrase_type) VALUES
('General', 'Hello', 'Hallo', 'tr', 'de', 'statement'),
('General', 'Hello', 'Ciao', 'tr', 'it', 'statement'),
('General', 'Hello', 'Bonjour', 'tr', 'fr', 'statement'),
('General', 'Hello', 'こんにちは (Konnichiwa)', 'tr', 'ja', 'statement'),
('General', 'Hello', 'Hola', 'tr', 'es', 'statement'),
('General', 'Hello', 'Привет (Privet)', 'tr', 'ru', 'statement'),
('General', 'Hello', '안녕하세요 (Annyeonghaseyo)', 'tr', 'ko', 'statement'),
('General', 'Hello', 'नमस्ते (Namaste)', 'tr', 'hi', 'statement'),
('General', 'Hello', 'Olá', 'tr', 'pt', 'statement');

-- Thank you / Teşekkürler
INSERT INTO travel_phrases (category, english_text, translation, source_language, target_language, phrase_type) VALUES
('General', 'Thank you', 'Danke', 'tr', 'de', 'statement'),
('General', 'Thank you', 'Grazie', 'tr', 'it', 'statement'),
('General', 'Thank you', 'Merci', 'tr', 'fr', 'statement'),
('General', 'Thank you', 'ありがとう (Arigatou)', 'tr', 'ja', 'statement'),
('General', 'Thank you', 'Gracias', 'tr', 'es', 'statement'),
('General', 'Thank you', 'Спасибо (Spasibo)', 'tr', 'ru', 'statement'),
('General', 'Thank you', '감사합니다 (Gamsahamnida)', 'tr', 'ko', 'statement'),
('General', 'Thank you', 'धन्यवाद (Dhanyavaad)', 'tr', 'hi', 'statement'),
('General', 'Thank you', 'Obrigado', 'tr', 'pt', 'statement');

-- Where is the bathroom? / Tuvalet nerede?
INSERT INTO travel_phrases (category, english_text, translation, source_language, target_language, phrase_type) VALUES
('General', 'Where is the bathroom?', 'Wo ist die Toilette?', 'tr', 'de', 'question'),
('General', 'Where is the bathroom?', 'Dov''è il bagno?', 'tr', 'it', 'question'),
('General', 'Where is the bathroom?', 'Où sont les toilettes ?', 'tr', 'fr', 'question'),
('General', 'Where is the bathroom?', 'トイレはどこですか？ (Toire wa doko desu ka?)', 'tr', 'ja', 'question'),
('General', 'Where is the bathroom?', '¿Dónde está el baño?', 'tr', 'es', 'question'),
('General', 'Where is the bathroom?', 'Где туалет? (Gde tualet?)', 'tr', 'ru', 'question'),
('General', 'Where is the bathroom?', '화장실이 어디예요? (Hwajangshiri eodiyeyo?)', 'tr', 'ko', 'question'),
('General', 'Where is the bathroom?', 'शौचालय कहाँ है? (Shauchaalay kahaan hai?)', 'tr', 'hi', 'question'),
('General', 'Where is the bathroom?', 'Onde fica o banheiro?', 'tr', 'pt', 'question');

-- =====================================================================
-- 2. SEED DICTIONARY WORDS (Turkish -> Target)
-- =====================================================================

-- Airport (dict-cat-011)
INSERT INTO dictionary_words (category_id, word, translation, source_language, target_language) VALUES
('dict-cat-011', 'Havaalanı', 'Flughafen', 'tr', 'de'),
('dict-cat-011', 'Havaalanı', 'Aeroporto', 'tr', 'it'),
('dict-cat-011', 'Havaalanı', 'Aéroport', 'tr', 'fr'),
('dict-cat-011', 'Havaalanı', '空港 (Kuukou)', 'tr', 'ja'),
('dict-cat-011', 'Havaalanı', 'Aeropuerto', 'tr', 'es'),
('dict-cat-011', 'Havaalanı', 'Аэропорт (Aeroport)', 'tr', 'ru'),
('dict-cat-011', 'Havaalanı', '공항 (Gonghang)', 'tr', 'ko'),
('dict-cat-011', 'Havaalanı', 'हवाई अड्डा (Havaee adda)', 'tr', 'hi'),
('dict-cat-011', 'Havaalanı', 'Aeroporto', 'tr', 'pt');

-- Water (dict-cat-004 - Food & Drink)
INSERT INTO dictionary_words (category_id, word, translation, source_language, target_language) VALUES
('dict-cat-004', 'Su', 'Wasser', 'tr', 'de'),
('dict-cat-004', 'Su', 'Acqua', 'tr', 'it'),
('dict-cat-004', 'Su', 'Eau', 'tr', 'fr'),
('dict-cat-004', 'Su', '水 (Mizu)', 'tr', 'ja'),
('dict-cat-004', 'Su', 'Agua', 'tr', 'es'),
('dict-cat-004', 'Su', 'Вода (Voda)', 'tr', 'ru'),
('dict-cat-004', 'Su', '물 (Mul)', 'tr', 'ko'),
('dict-cat-004', 'Su', 'पानी (Paanee)', 'tr', 'hi'),
('dict-cat-004', 'Su', 'Água', 'tr', 'pt');

-- =====================================================================
-- 3. SEED COURSES (1 basic course for each target language)
-- =====================================================================

INSERT INTO courses (category, title, description, target_language, display_order, is_free) VALUES
('Basics', 'German for Beginners', 'Learn essential German phrases for your first trip.', 'de', 1, 1),
('Basics', 'Italian for Beginners', 'Start your Italian journey with basic greetings.', 'it', 1, 1),
('Basics', 'French for Beginners', 'Essential French for travelers and explorers.', 'fr', 1, 1),
('Basics', 'Japanese for Beginners', 'Learn basic Japanese characters and greetings.', 'ja', 1, 1),
('Basics', 'Spanish for Beginners', 'Master the most common Spanish phrases.', 'es', 1, 1),
('Basics', 'Russian for Beginners', 'A quick start guide to speaking Russian.', 'ru', 1, 1),
('Basics', 'Korean for Beginners', 'Introduction to Korean speaking and culture.', 'ko', 1, 1),
('Basics', 'Hindi for Beginners', 'Learn basic Hindi for daily interaction.', 'hi', 1, 1),
('Basics', 'Portuguese for Beginners', 'Speak Portuguese confidently from day one.', 'pt', 1, 1);

-- =====================================================================
-- 4. SEED SAMPLE LESSONS FOR THE COURSES
-- =====================================================================

-- Add one lesson per course
INSERT INTO lessons (course_id, title, description, lesson_order, target_language)
SELECT id, 'Greetings & Basics', 'Learn how to say hello and thank you.', 1, target_language
FROM courses 
WHERE category = 'Basics' AND target_language != 'en';

-- =====================================================================
-- 5. SEED VOCABULARY FOR THE LESSONS
-- =====================================================================

-- This is a bit complex due to foreign keys, but we can do a simple version
-- for the first lesson of each multilingual course.
INSERT INTO lesson_vocabulary (target_language, source_language)
SELECT target_language, 'tr'
FROM courses
WHERE category = 'Basics' AND target_language != 'en';
