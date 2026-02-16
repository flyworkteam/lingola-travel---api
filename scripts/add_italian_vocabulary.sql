-- Add vocabulary for Italian lessons (example for first 3 lessons)

-- Lesson 1: Greetings (Check-in at Airport)
INSERT INTO lesson_vocabulary (id, lesson_id, term, definition, icon_path, icon_color, display_order, source_language, target_language) VALUES
('vocab-it-001-01', 'lesson-it-002-01', 'Check-in', 'Il processo di registrazione del tuo arrivo in aeroporto', 'assets/icons/checkin.svg', '#4ECDC4', 1, 'tr', 'it'),
('vocab-it-001-02', 'lesson-it-002-01', 'Boarding Pass', 'Un documento fornito da una compagnia aerea durante il check-in', 'assets/icons/boardingpass.svg', '#4ECDC4', 2, 'tr', 'it');

-- Lesson 2: Introductions
INSERT INTO lesson_vocabulary (id, lesson_id, term, definition, icon_path, icon_color, display_order, source_language, target_language) VALUES
('vocab-it-002-01', 'lesson-it-001-02', 'Name', 'Your personal identifier', 'assets/icons/name.svg', '#FF9F6A', 1, 'tr', 'it'),
('vocab-it-002-02', 'lesson-it-001-02', 'Pleased', 'Happy to meet someone', 'assets/icons/happy.svg', '#FF9F6A', 2, 'tr', 'it');

-- Lesson 3: Politeness
INSERT INTO lesson_vocabulary (id, lesson_id, term, definition, icon_path, icon_color, display_order, source_language, target_language) VALUES
('vocab-it-003-01', 'lesson-it-001-03', 'Please', 'A polite way to ask for something', 'assets/icons/please.svg', '#F9D26B', 1, 'tr', 'it'),
('vocab-it-003-02', 'lesson-it-001-03', 'Thank you', 'Expression of gratitude', 'assets/icons/thanks.svg', '#F9D26B', 2, 'tr', 'it');
