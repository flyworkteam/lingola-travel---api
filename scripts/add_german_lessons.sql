-- Create German lessons for German Basics course
-- Course: General: German Basics (12 lessons)

USE lingola_travel;

-- Get the German Basics course ID
SET @course_id = (SELECT id FROM courses WHERE target_language = 'de' AND title = 'German Basics' LIMIT 1);

-- Insert 12 German lessons with example sentences
INSERT INTO lessons (id, course_id, title, description, example_sentence, key_vocabulary_term, lesson_order, total_steps, target_language) VALUES
('lesson-de-001-01', @course_id, 'Begrüßungen', 'Lernen Sie, wie man Menschen auf Deutsch begrüßt', 'Guten Tag! Wie geht es Ihnen?', 'Guten Tag', 1, 10, 'de'),
('lesson-de-001-02', @course_id, 'Vorstellungen', 'Stellen Sie sich auf Deutsch vor', 'Ich heiße Anna. Freut mich, Sie kennenzulernen.', 'kennenzulernen', 2, 10, 'de'),
('lesson-de-001-03', @course_id, 'Zahlen', 'Grundlegende Zahlen von 1 bis 20', 'Ich möchte zwei Kaffee, bitte.', 'zwei', 3, 10, 'de'),
('lesson-de-001-04', @course_id, 'Farben', 'Lernen Sie die grundlegenden Farben', 'Das Auto ist blau und sehr schön.', 'blau', 4, 10, 'de'),
('lesson-de-001-05', @course_id, 'Familie', 'Familienmitglieder auf Deutsch', 'Meine Mutter ist Lehrerin von Beruf.', 'Mutter', 5, 10, 'de'),
('lesson-de-001-06', @course_id, 'Essen bestellen', 'Im Restaurant Essen bestellen', 'Ich hätte gern eine Pizza mit Salami.', 'hätte gern', 6, 10, 'de'),
('lesson-de-001-07', @course_id, 'Wegbeschreibung', 'Nach dem Weg fragen', 'Wo ist der nächste Bahnhof, bitte?', 'Bahnhof', 7, 10, 'de'),
('lesson-de-001-08', @course_id, 'Einkaufen', 'Im Geschäft einkaufen', 'Was kostet diese Jacke?', 'kostet', 8, 10, 'de'),
('lesson-de-001-09', @course_id, 'Wetter', 'Über das Wetter sprechen', 'Heute ist es sonnig und warm.', 'sonnig', 9, 10, 'de'),
('lesson-de-001-10', @course_id, 'Hobbys', 'Ihre Hobbys beschreiben', 'Ich spiele gern Fußball am Wochenende.', 'spiele', 10, 10, 'de'),
('lesson-de-001-11', @course_id, 'Reisen', 'Reisevokabular', 'Ich möchte nach Berlin fahren.', 'fahren', 11, 10, 'de'),
('lesson-de-001-12', @course_id, 'Smalltalk', 'Alltagsgespräche führen', 'Wie war dein Tag heute?', 'Tag', 12, 10, 'de');

-- Insert vocabulary for first lesson (Greetings)
INSERT INTO lesson_vocabulary (id, lesson_id, term, definition, icon_path, icon_color, display_order, target_language) VALUES
('vocab-de-001-01', 'lesson-de-001-01', 'Guten Tag', 'Formelle Begrüßung am Tag - Good day/Hello', 'assets/icons/greeting.svg', '#4ECDC4', 1, 'de'),
('vocab-de-001-02', 'lesson-de-001-01', 'Wie geht es Ihnen', 'Formell fragen wie es jemandem geht - How are you (formal)', 'assets/icons/question.svg', '#4ECDC4', 2, 'de'),
('vocab-de-001-03', 'lesson-de-001-01', 'Auf Wiedersehen', 'Formeller Abschied - Goodbye (formal)', 'assets/icons/goodbye.svg', '#4ECDC4', 3, 'de');

-- Insert vocabulary for second lesson (Introductions)
INSERT INTO lesson_vocabulary (id, lesson_id, term, definition, icon_path, icon_color, display_order, target_language) VALUES
('vocab-de-002-01', 'lesson-de-001-02', 'Ich heiße', 'Meinen Namen sagen - My name is', 'assets/icons/person.svg', '#4ECDC4', 1, 'de'),
('vocab-de-002-02', 'lesson-de-001-02', 'kennenzulernen', 'Jemanden zum ersten Mal treffen - to meet', 'assets/icons/handshake.svg', '#4ECDC4', 2, 'de'),
('vocab-de-002-03', 'lesson-de-001-02', 'Freut mich', 'Ich bin froh - Pleased to meet you', 'assets/icons/happy.svg', '#4ECDC4', 3, 'de');

-- Get the Airport German course ID
SET @airport_course_id = (SELECT id FROM courses WHERE target_language = 'de' AND title = 'Airport German' LIMIT 1);

-- Insert 12 German Airport lessons
INSERT INTO lessons (id, course_id, title, description, example_sentence, key_vocabulary_term, lesson_order, total_steps, target_language) VALUES
('lesson-de-002-01', @airport_course_id, 'Am Check-in Schalter', 'Check-in am Flughafen', 'Ich möchte für meinen Flug nach London einchecken.', 'einchecken', 1, 10, 'de'),
('lesson-de-002-02', @airport_course_id, 'Sicherheitskontrolle', 'Durch die Sicherheitskontrolle gehen', 'Bitte legen Sie Ihr Laptop in die Wanne.', 'Sicherheitskontrolle', 2, 10, 'de'),
('lesson-de-002-03', @airport_course_id, 'Gate finden', 'Ihr Gate am Flughafen finden', 'Wo ist das Gate B12, bitte?', 'Gate', 3, 10, 'de'),
('lesson-de-002-04', @airport_course_id, 'Duty Free', 'Im Duty Free Shop einkaufen', 'Haben Sie Parfüm ohne Steuer?', 'Duty Free', 4, 10, 'de'),
('lesson-de-002-05', @airport_course_id, 'Boarding', 'An Bord des Flugzeugs gehen', 'Bitte zeigen Sie Ihre Bordkarte.', 'Bordkarte', 5, 10, 'de'),
('lesson-de-002-06', @airport_course_id, 'Im Flugzeug', 'Gespräche im Flugzeug', 'Kann ich bitte eine Decke haben?', 'Decke', 6, 10, 'de'),
('lesson-de-002-07', @airport_course_id, 'Gepäckausgabe', 'Ihr Gepäck abholen', 'Wo ist die Gepäckausgabe für Flug LH123?', 'Gepäckausgabe', 7, 10, 'de'),
('lesson-de-002-08', @airport_course_id, 'Zoll', 'Durch den Zoll gehen', 'Ich habe nichts zu verzollen.', 'Zoll', 8, 10, 'de'),
('lesson-de-002-09', @airport_course_id, 'Taxi nehmen', 'Ein Taxi zum Hotel nehmen', 'Zum Hauptbahnhof, bitte.', 'Taxi', 9, 10, 'de'),
('lesson-de-002-10', @airport_course_id, 'Verspätungen', 'Mit Flugverspätungen umgehen', 'Mein Flug hat zwei Stunden Verspätung.', 'Verspätung', 10, 10, 'de'),
('lesson-de-002-11', @airport_course_id, 'Verbindungsflug', 'Einen Anschlussflug erreichen', 'Wo ist mein Anschlussflug nach München?', 'Anschlussflug', 11, 10, 'de'),
('lesson-de-002-12', @airport_course_id, 'Hilfe brauchen', 'Am Flughafen um Hilfe bitten', 'Können Sie mir bitte helfen?', 'helfen', 12, 10, 'de');

-- Vocabulary for Check-in lesson
INSERT INTO lesson_vocabulary (id, lesson_id, term, definition, icon_path, icon_color, display_order, target_language) VALUES
('vocab-de-airport-01', 'lesson-de-002-01', 'einchecken', 'Seine Ankunft am Flughafen melden - to check in', 'assets/icons/checkin.svg', '#4ECDC4', 1, 'de'),
('vocab-de-airport-02', 'lesson-de-002-01', 'Flug', 'Eine Reise mit dem Flugzeug - flight', 'assets/icons/plane.svg', '#4ECDC4', 2, 'de'),
('vocab-de-airport-03', 'lesson-de-002-01', 'Bordkarte', 'Dokument zum Einsteigen ins Flugzeug - boarding pass', 'assets/icons/boardingpass.svg', '#4ECDC4', 3, 'de');
