-- Fix missing vocabulary for all lessons
-- Add vocabulary for German Basics course (course-de-001)

-- Lesson 3: Zahlen (Numbers)
INSERT IGNORE INTO lesson_vocabulary (id, lesson_id, term, definition, icon_path, icon_color, display_order, target_language, source_language) VALUES
('vocab-de-001-03-01', 'lesson-de-001-03', 'zwei', 'Nummer 2 - Number two', 'assets/icons/numbers.svg', '#4ECDC4', 1, 'de', 'tr'),
('vocab-de-001-03-02', 'lesson-de-001-03', 'Kaffee', 'Ein Getränk - Coffee', 'assets/icons/coffee.svg', '#4ECDC4', 2, 'de', 'tr'),
('vocab-de-001-03-03', 'lesson-de-001-03', 'bitte', 'Höfliches Wort - Please', 'assets/icons/polite.svg', '#4ECDC4', 3, 'de', 'tr');

-- Lesson 4: Farben (Colors)
INSERT IGNORE INTO lesson_vocabulary (id, lesson_id, term, definition, icon_path, icon_color, display_order, target_language, source_language) VALUES
('vocab-de-001-04-01', 'lesson-de-001-04', 'blau', 'Die Farbe des Himmels - Blue', 'assets/icons/colors.svg', '#4ECDC4', 1, 'de', 'tr'),
('vocab-de-001-04-02', 'lesson-de-001-04', 'Auto', 'Ein Fahrzeug - Car', 'assets/icons/car.svg', '#4ECDC4', 2, 'de', 'tr'),
('vocab-de-001-04-03', 'lesson-de-001-04', 'schön', 'Gut aussehend - Beautiful', 'assets/icons/beauty.svg', '#4ECDC4', 3, 'de', 'tr');

-- Lesson 5: Familie (Family)
INSERT IGNORE INTO lesson_vocabulary (id, lesson_id, term, definition, icon_path, icon_color, display_order, target_language, source_language) VALUES
('vocab-de-001-05-01', 'lesson-de-001-05', 'Mutter', 'Weiblicher Elternteil - Mother', 'assets/icons/family.svg', '#4ECDC4', 1, 'de', 'tr'),
('vocab-de-001-05-02', 'lesson-de-001-05', 'Lehrerin', 'Weibliche Lehrperson - Teacher (female)', 'assets/icons/teacher.svg', '#4ECDC4', 2, 'de', 'tr'),
('vocab-de-001-05-03', 'lesson-de-001-05', 'Beruf', 'Job oder Karriere - Profession', 'assets/icons/work.svg', '#4ECDC4', 3, 'de', 'tr');

-- Lesson 6: Essen bestellen (Ordering food)
INSERT IGNORE INTO lesson_vocabulary (id, lesson_id, term, definition, icon_path, icon_color, display_order, target_language, source_language) VALUES
('vocab-de-001-06-01', 'lesson-de-001-06', 'Essen', 'Nahrung - Food', 'assets/icons/food_drink.svg', '#4ECDC4', 1, 'de', 'tr'),
('vocab-de-001-06-02', 'lesson-de-001-06', 'bestellen', 'Etwas anfordern - To order', 'assets/icons/order.svg', '#4ECDC4', 2, 'de', 'tr'),
('vocab-de-001-06-03', 'lesson-de-001-06', 'möchte', 'Wünschen - Would like', 'assets/icons/wish.svg', '#4ECDC4', 3, 'de', 'tr');

-- Lesson 7: Wegbeschreibung (Directions)
INSERT IGNORE INTO lesson_vocabulary (id, lesson_id, term, definition, icon_path, icon_color, display_order, target_language, source_language) VALUES
('vocab-de-001-07-01', 'lesson-de-001-07', 'Weg', 'Route oder Pfad - Way/Path', 'assets/icons/direction.svg', '#4ECDC4', 1, 'de', 'tr'),
('vocab-de-001-07-02', 'lesson-de-001-07', 'links', 'Richtung - Left', 'assets/icons/arrow_left.svg', '#4ECDC4', 2, 'de', 'tr'),
('vocab-de-001-07-03', 'lesson-de-001-07', 'rechts', 'Richtung - Right', 'assets/icons/arrow_right.svg', '#4ECDC4', 3, 'de', 'tr');

-- Lesson 8: Einkaufen (Shopping)
INSERT IGNORE INTO lesson_vocabulary (id, lesson_id, term, definition, icon_path, icon_color, display_order, target_language, source_language) VALUES
('vocab-de-001-08-01', 'lesson-de-001-08', 'kaufen', 'Etwas erwerben - To buy', 'assets/icons/shopping.svg', '#4ECDC4', 1, 'de', 'tr'),
('vocab-de-001-08-02', 'lesson-de-001-08', 'Preis', 'Kosten - Price', 'assets/icons/price.svg', '#4ECDC4', 2, 'de', 'tr'),
('vocab-de-001-08-03', 'lesson-de-001-08', 'teuer', 'Hoher Preis - Expensive', 'assets/icons/expensive.svg', '#4ECDC4', 3, 'de', 'tr');

-- Lesson 9: Wetter (Weather)
INSERT IGNORE INTO lesson_vocabulary (id, lesson_id, term, definition, icon_path, icon_color, display_order, target_language, source_language) VALUES
('vocab-de-001-09-01', 'lesson-de-001-09', 'Wetter', 'Klimabedingungen - Weather', 'assets/icons/weather.svg', '#4ECDC4', 1, 'de', 'tr'),
('vocab-de-001-09-02', 'lesson-de-001-09', 'Sonne', 'Stern am Himmel - Sun', 'assets/icons/sun.svg', '#4ECDC4', 2, 'de', 'tr'),
('vocab-de-001-09-03', 'lesson-de-001-09', 'Regen', 'Wasser vom Himmel - Rain', 'assets/icons/rain.svg', '#4ECDC4', 3, 'de', 'tr');

-- Lesson 10: Hobbys (Hobbies)
INSERT IGNORE INTO lesson_vocabulary (id, lesson_id, term, definition, icon_path, icon_color, display_order, target_language, source_language) VALUES
('vocab-de-001-10-01', 'lesson-de-001-10', 'Hobby', 'Freizeitaktivität - Hobby', 'assets/icons/hobby.svg', '#4ECDC4', 1, 'de', 'tr'),
('vocab-de-001-10-02', 'lesson-de-001-10', 'spielen', 'Eine Aktivität ausführen - To play', 'assets/icons/play.svg', '#4ECDC4', 2, 'de', 'tr'),
('vocab-de-001-10-03', 'lesson-de-001-10', 'Musik', 'Töne und Melodien - Music', 'assets/icons/music.svg', '#4ECDC4', 3, 'de', 'tr');

-- Lesson 11: Reisen (Travel)
INSERT IGNORE INTO lesson_vocabulary (id, lesson_id, term, definition, icon_path, icon_color, display_order, target_language, source_language) VALUES
('vocab-de-001-11-01', 'lesson-de-001-11', 'Reise', 'Eine Fahrt - Trip/Journey', 'assets/icons/trip.svg', '#4ECDC4', 1, 'de', 'tr'),
('vocab-de-001-11-02', 'lesson-de-001-11', 'Flugzeug', 'Luftfahrzeug - Airplane', 'assets/icons/airport.svg', '#4ECDC4', 2, 'de', 'tr'),
('vocab-de-001-11-03', 'lesson-de-001-11', 'Ticket', 'Fahrkarte - Ticket', 'assets/icons/ticket.svg', '#4ECDC4', 3, 'de', 'tr');

-- Lesson 12: Smalltalk (Small talk)
INSERT IGNORE INTO lesson_vocabulary (id, lesson_id, term, definition, icon_path, icon_color, display_order, target_language, source_language) VALUES
('vocab-de-001-12-01', 'lesson-de-001-12', 'Gespräch', 'Unterhaltung - Conversation', 'assets/icons/conversation.svg', '#4ECDC4', 1, 'de', 'tr'),
('vocab-de-001-12-02', 'lesson-de-001-12', 'sprechen', 'Reden - To speak', 'assets/icons/speak.svg', '#4ECDC4', 2, 'de', 'tr'),
('vocab-de-001-12-03', 'lesson-de-001-12', 'verstehen', 'Begreifen - To understand', 'assets/icons/understand.svg', '#4ECDC4', 3, 'de', 'tr');
