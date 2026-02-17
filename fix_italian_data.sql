-- Fix Italian Basics Lessons
UPDATE lessons SET 
  example_sentence = 'Ciao, come stai?', 
  key_vocabulary_term = 'Ciao' 
WHERE id = 'lesson-it-001-01';

DELETE FROM lesson_vocabulary WHERE lesson_id = 'lesson-it-001-01';
INSERT INTO lesson_vocabulary (id, lesson_id, term, definition, target_language, source_language) VALUES
(uuid(), 'lesson-it-001-01', 'ciao', 'hello/hi', 'it', 'en'),
(uuid(), 'lesson-it-001-01', 'buongiorno', 'good morning', 'it', 'en'),
(uuid(), 'lesson-it-001-01', 'buonasera', 'good evening', 'it', 'en');

UPDATE lessons SET 
  example_sentence = 'Mi chiamo Mario.', 
  key_vocabulary_term = 'chiamo' 
WHERE id = 'lesson-it-001-02';

DELETE FROM lesson_vocabulary WHERE lesson_id = 'lesson-it-001-02';
INSERT INTO lesson_vocabulary (id, lesson_id, term, definition, target_language, source_language) VALUES
(uuid(), 'lesson-it-001-02', 'mi chiamo', 'my name is', 'it', 'en'),
(uuid(), 'lesson-it-001-02', 'piacere', 'nice to meet you', 'it', 'en'),
(uuid(), 'lesson-it-001-02', 'italiano', 'Italian', 'it', 'en');

UPDATE lessons SET 
  example_sentence = 'Vorrei un caffè, per favore.', 
  key_vocabulary_term = 'favore' 
WHERE id = 'lesson-it-001-03';

DELETE FROM lesson_vocabulary WHERE lesson_id = 'lesson-it-001-03';
INSERT INTO lesson_vocabulary (id, lesson_id, term, definition, target_language, source_language) VALUES
(uuid(), 'lesson-it-001-03', 'per favore', 'please', 'it', 'en'),
(uuid(), 'lesson-it-001-03', 'grazie', 'thank you', 'it', 'en'),
(uuid(), 'lesson-it-001-03', 'prego', 'you are welcome', 'it', 'en');

-- Fix Airport Italian Lessons
UPDATE lessons SET 
  example_sentence = 'Vorrei fare il check-in per il mio volo.', 
  key_vocabulary_term = 'check-in' 
WHERE id = 'lesson-it-002-01';

DELETE FROM lesson_vocabulary WHERE lesson_id = 'lesson-it-002-01';
INSERT INTO lesson_vocabulary (id, lesson_id, term, definition, target_language, source_language) VALUES
(uuid(), 'lesson-it-002-01', 'aeroporto', 'airport', 'it', 'en'),
(uuid(), 'lesson-it-002-01', 'volo', 'flight', 'it', 'en'),
(uuid(), 'lesson-it-002-01', 'check-in', 'check-in', 'it', 'en');

UPDATE lessons SET 
  example_sentence = 'Dov\'è il gate numero cinque?', 
  key_vocabulary_term = 'gate' 
WHERE id = 'lesson-it-002-02';

DELETE FROM lesson_vocabulary WHERE lesson_id = 'lesson-it-002-02';
INSERT INTO lesson_vocabulary (id, lesson_id, term, definition, target_language, source_language) VALUES
(uuid(), 'lesson-it-002-02', 'gate', 'gate', 'it', 'en'),
(uuid(), 'lesson-it-002-02', 'imbarco', 'boarding', 'it', 'en'),
(uuid(), 'lesson-it-002-02', 'biglietto', 'ticket', 'it', 'en');
