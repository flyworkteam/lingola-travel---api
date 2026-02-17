-- Add one more vocabulary word to lessons that have only 2 words
-- This will bring all courses to 3 words per lesson

-- Airport German (all lessons need 1 more word)
INSERT INTO lesson_vocabulary (lesson_id, term, definition, target_language, source_language) VALUES
('lesson-de-002-02', 'Flughafen', 'airport', 'de', 'en'),
('lesson-de-002-03', 'Ausgang', 'exit', 'de', 'en'),
('lesson-de-002-04', 'Eingang', 'entrance', 'de', 'en'),
('lesson-de-002-05', 'Hilfe', 'help', 'de', 'en'),
('lesson-de-002-06', 'Information', 'information', 'de', 'en'),
('lesson-de-002-07', 'Toilette', 'restroom', 'de', 'en'),
('lesson-de-002-08', 'Restaurants', 'restaurant', 'de', 'en'),
('lesson-de-002-09', 'Wechselstube', 'currency exchange', 'de', 'en'),
('lesson-de-002-10', 'Taxi', 'taxi', 'de', 'en'),
('lesson-de-002-11', 'Bus', 'bus', 'de', 'en'),
('lesson-de-002-12', 'Zug', 'train', 'de', 'en');

-- Airport Italian (all lessons need 1 more word)
INSERT INTO lesson_vocabulary (lesson_id, term, definition, target_language, source_language) VALUES
('lesson-it-002-02', 'aeroporto', 'airport', 'it', 'en'),
('lesson-it-002-03', 'uscita', 'exit', 'it', 'en'),
('lesson-it-002-04', 'entrata', 'entrance', 'it', 'en'),
('lesson-it-002-05', 'aiuto', 'help', 'it', 'en'),
('lesson-it-002-06', 'informazioni', 'information', 'it', 'en'),
('lesson-it-002-07', 'bagno', 'restroom', 'it', 'en'),
('lesson-it-002-08', 'ristorante', 'restaurant', 'it', 'en'),
('lesson-it-002-09', 'cambio', 'currency exchange', 'it', 'en'),
('lesson-it-002-10', 'taxi', 'taxi', 'it', 'en'),
('lesson-it-002-11', 'autobus', 'bus', 'it', 'en'),
('lesson-it-002-12', 'treno', 'train', 'it', 'en');

-- French Basics
INSERT INTO lesson_vocabulary (lesson_id, term, definition, target_language, source_language) 
SELECT l.id, 'merci', 'thank you', 'fr', 'en'
FROM lessons l
JOIN courses c ON l.course_id = c.id
WHERE c.title = 'French Basics'
AND (SELECT COUNT(*) FROM lesson_vocabulary lv WHERE lv.lesson_id = l.id) < 3
LIMIT 12;

-- Hindi Basics  
INSERT INTO lesson_vocabulary (lesson_id, term, definition, target_language, source_language) 
SELECT l.id, 'धन्यवाद', 'thank you', 'hi', 'en'
FROM lessons l
JOIN courses c ON l.course_id = c.id
WHERE c.title = 'Hindi Basics'
AND (SELECT COUNT(*) FROM lesson_vocabulary lv WHERE lv.lesson_id = l.id) < 3
LIMIT 12;

-- Japanese Basics
INSERT INTO lesson_vocabulary (lesson_id, term, definition, target_language, source_language) 
SELECT l.id, 'ありがとう', 'thank you', 'ja', 'en'
FROM lessons l
JOIN courses c ON l.course_id = c.id
WHERE c.title = 'Japanese Basics'
AND (SELECT COUNT(*) FROM lesson_vocabulary lv WHERE lv.lesson_id = l.id) < 3
LIMIT 12;

-- Korean Basics
INSERT INTO lesson_vocabulary (lesson_id, term, definition, target_language, source_language) 
SELECT l.id, '감사합니다', 'thank you', 'ko', 'en'
FROM lessons l
JOIN courses c ON l.course_id = c.id
WHERE c.title = 'Korean Basics'
AND (SELECT COUNT(*) FROM lesson_vocabulary lv WHERE lv.lesson_id = l.id) < 3
LIMIT 12;

-- Portuguese Basics
INSERT INTO lesson_vocabulary (lesson_id, term, definition, target_language, source_language) 
SELECT l.id, 'obrigado', 'thank you', 'pt', 'en'
FROM lessons l
JOIN courses c ON l.course_id = c.id
WHERE c.title = 'Portuguese Basics'
AND (SELECT COUNT(*) FROM lesson_vocabulary lv WHERE lv.lesson_id = l.id) < 3
LIMIT 12;

-- Russian Basics
INSERT INTO lesson_vocabulary (lesson_id, term, definition, target_language, source_language) 
SELECT l.id, 'спасибо', 'thank you', 'ru', 'en'
FROM lessons l
JOIN courses c ON l.course_id = c.id
WHERE c.title = 'Russian Basics'
AND (SELECT COUNT(*) FROM lesson_vocabulary lv WHERE lv.lesson_id = l.id) < 3
LIMIT 12;

-- Italian Dining
INSERT INTO lesson_vocabulary (lesson_id, term, definition, target_language, source_language) 
SELECT l.id, 'vino', 'wine', 'it', 'en'
FROM lessons l
JOIN courses c ON l.course_id = c.id
WHERE c.title = 'Italian Dining'
AND (SELECT COUNT(*) FROM lesson_vocabulary lv WHERE lv.lesson_id = l.id) < 3
LIMIT 12;

-- Italian Hotels
INSERT INTO lesson_vocabulary (lesson_id, term, definition, target_language, source_language) 
SELECT l.id, 'camera', 'room', 'it', 'en'
FROM lessons l
JOIN courses c ON l.course_id = c.id
WHERE c.title = 'Italian Hotels'
AND (SELECT COUNT(*) FROM lesson_vocabulary lv WHERE lv.lesson_id = l.id) < 3
LIMIT 12;

-- Italian Shopping
INSERT INTO lesson_vocabulary (lesson_id, term, definition, target_language, source_language) 
SELECT l.id, 'prezzo', 'price', 'it', 'en'
FROM lessons l
JOIN courses c ON l.course_id = c.id
WHERE c.title = 'Italian Shopping'
AND (SELECT COUNT(*) FROM lesson_vocabulary lv WHERE lv.lesson_id = l.id) < 3
LIMIT 12;

-- Italian Basics
INSERT INTO lesson_vocabulary (lesson_id, term, definition, target_language, source_language) 
SELECT l.id, 'ciao', 'hello', 'it', 'en'
FROM lessons l
JOIN courses c ON l.course_id = c.id
WHERE c.title = 'Italian Basics'
AND (SELECT COUNT(*) FROM lesson_vocabulary lv WHERE lv.lesson_id = l.id) < 3
LIMIT 12;

-- Terminal Talk
INSERT INTO lesson_vocabulary (lesson_id, term, definition, target_language, source_language) 
SELECT l.id, 'exit', 'çıkış', 'en', 'tr'
FROM lessons l
JOIN courses c ON l.course_id = c.id
WHERE c.title = 'Terminal Talk'
AND (SELECT COUNT(*) FROM lesson_vocabulary lv WHERE lv.lesson_id = l.id) < 3
LIMIT 12;

-- Place an order
INSERT INTO lesson_vocabulary (lesson_id, term, definition, target_language, source_language) 
SELECT l.id, 'price', 'fiyat', 'en', 'tr'
FROM lessons l
JOIN courses c ON l.course_id = c.id
WHERE c.title = 'Place an order'
AND (SELECT COUNT(*) FROM lesson_vocabulary lv WHERE lv.lesson_id = l.id) < 3
LIMIT 12;

-- test test
INSERT INTO lesson_vocabulary (lesson_id, term, definition, target_language, source_language) 
SELECT l.id, 'test', 'test', 'en', 'tr'
FROM lessons l
JOIN courses c ON l.course_id = c.id
WHERE c.title = 'test test'
AND (SELECT COUNT(*) FROM lesson_vocabulary lv WHERE lv.lesson_id = l.id) < 3
LIMIT 12;
