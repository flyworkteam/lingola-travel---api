-- ================================================================
-- POPULATE EMPTY COURSES WITH LESSONS AND VOCABULARY
-- Date: 2026-02-21
-- Description: Add 5 lessons to each empty course, 2 vocabulary per lesson
-- ================================================================

USE lingola_travel;

-- Temporary table to store empty courses
CREATE TEMPORARY TABLE IF NOT EXISTS temp_empty_courses AS
SELECT 
  c.id as course_id,
  c.target_language,
  c.category,
  c.display_order
FROM courses c
LEFT JOIN lessons l ON c.id = l.course_id
GROUP BY c.id, c.target_language, c.category, c.display_order
HAVING COUNT(l.id) = 0
ORDER BY c.target_language, c.display_order;

-- Show what we're about to add
SELECT 
  target_language,
  COUNT(*) as courses_to_populate
FROM temp_empty_courses
GROUP BY target_language;

-- ================================================================
-- ADD LESSONS TO EMPTY COURSES
-- Each course gets 5 lessons
-- ================================================================

-- GERMAN (de) - 3 courses
-- Food & Drink (course-de-003)
INSERT INTO lessons (id, course_id, title, description, lesson_order, total_steps, example_sentence, key_vocabulary_term, target_language, created_at, updated_at) VALUES
('lesson-de-003-01', 'course-de-003', 'Food Basics', 'Learn basic food vocabulary', 1, 10, 'Ich möchte einen Apfel', 'Apfel', 'de', NOW(), NOW()),
('lesson-de-003-02', 'course-de-003', 'At the Restaurant', 'Ordering food at restaurants', 2, 10, 'Die Speisekarte bitte', 'Speisekarte', 'de', NOW(), NOW()),
('lesson-de-003-03', 'course-de-003', 'Drinks', 'Common beverages', 3, 10, 'Ein Glas Wasser bitte', 'Wasser', 'de', NOW(), NOW()),
('lesson-de-003-04', 'course-de-003', 'Breakfast', 'Breakfast items', 4, 10, 'Ich nehme ein Brötchen', 'Brötchen', 'de', NOW(), NOW()),
('lesson-de-003-05', 'course-de-003', 'Desserts', 'Sweet treats', 5, 10, 'Der Kuchen ist lecker', 'Kuchen', 'de', NOW(), NOW());

-- Accommodation (course-de-004)
INSERT INTO lessons (id, course_id, title, description, lesson_order, total_steps, example_sentence, key_vocabulary_term, target_language, created_at, updated_at) VALUES
('lesson-de-004-01', 'course-de-004', 'Hotel Check-in', 'Checking into a hotel', 1, 10, 'Ich habe eine Reservierung', 'Reservierung', 'de', NOW(), NOW()),
('lesson-de-004-02', 'course-de-004', 'Room Facilities', 'Room amenities', 2, 10, 'Wo ist das Badezimmer', 'Badezimmer', 'de', NOW(), NOW()),
('lesson-de-004-03', 'course-de-004', 'Hotel Services', 'Hotel services', 3, 10, 'Gibt es einen Zimmerservice', 'Zimmerservice', 'de', NOW(), NOW()),
('lesson-de-004-04', 'course-de-004', 'Problems', 'Reporting issues', 4, 10, 'Die Heizung funktioniert nicht', 'Heizung', 'de', NOW(), NOW()),
('lesson-de-004-05', 'course-de-004', 'Check-out', 'Leaving the hotel', 5, 10, 'Ich möchte auschecken', 'auschecken', 'de', NOW(), NOW());

-- Shopping (course-de-005)
INSERT INTO lessons (id, course_id, title, description, lesson_order, total_steps, example_sentence, key_vocabulary_term, target_language, created_at, updated_at) VALUES
('lesson-de-005-01', 'course-de-005', 'At the Store', 'Shopping basics', 1, 10, 'Wo finde ich die Kleidung', 'Kleidung', 'de', NOW(), NOW()),
('lesson-de-005-02', 'course-de-005', 'Asking Prices', 'Price inquiries', 2, 10, 'Was kostet das', 'kostet', 'de', NOW(), NOW()),
('lesson-de-005-03', 'course-de-005', 'Trying Things', 'Trying items', 3, 10, 'Kann ich das anprobieren', 'anprobieren', 'de', NOW(), NOW()),
('lesson-de-005-04', 'course-de-005', 'Payment', 'Paying for items', 4, 10, 'Ich zahle mit Karte', 'zahle', 'de', NOW(), NOW()),
('lesson-de-005-05', 'course-de-005', 'Returns', 'Returning items', 5, 10, 'Ich möchte das zurückgeben', 'zurückgeben', 'de', NOW(), NOW());

-- ENGLISH (en) - 8 courses
-- Accommodation (course-004)
INSERT INTO lessons (id, course_id, title, description, lesson_order, total_steps, example_sentence, key_vocabulary_term, target_language, created_at, updated_at) VALUES
('lesson-en-004-01', 'course-004', 'Hotel Check-in', 'Checking into a hotel', 1, 10, 'I have a reservation', 'reservation', 'en', NOW(), NOW()),
('lesson-en-004-02', 'course-004', 'Room Facilities', 'Room amenities', 2, 10, 'Where is the bathroom', 'bathroom', 'en', NOW(), NOW()),
('lesson-en-004-03', 'course-004', 'Hotel Services', 'Hotel services', 3, 10, 'Is there room service', 'service', 'en', NOW(), NOW()),
('lesson-en-004-04', 'course-004', 'Problems', 'Reporting issues', 4, 10, 'The heating does not work', 'heating', 'en', NOW(), NOW()),
('lesson-en-004-05', 'course-004', 'Check-out', 'Leaving the hotel', 5, 10, 'I would like to check out', 'checkout', 'en', NOW(), NOW());

-- Culture (course-005)
INSERT INTO lessons (id, course_id, title, description, lesson_order, total_steps, example_sentence, key_vocabulary_term, target_language, created_at, updated_at) VALUES
('lesson-en-005-01', 'course-005', 'Local Customs', 'Understanding customs', 1, 10, 'What is the local tradition', 'tradition', 'en', NOW(), NOW()),
('lesson-en-005-02', 'course-005', 'Museums', 'Visiting museums', 2, 10, 'Where is the museum', 'museum', 'en', NOW(), NOW()),
('lesson-en-005-03', 'course-005', 'Festivals', 'Local festivals', 3, 10, 'When is the festival', 'festival', 'en', NOW(), NOW()),
('lesson-en-005-04', 'course-005', 'Art', 'Discussing art', 4, 10, 'This painting is beautiful', 'painting', 'en', NOW(), NOW()),
('lesson-en-005-05', 'course-005', 'History', 'Historical sites', 5, 10, 'Tell me about the history', 'history', 'en', NOW(), NOW());

-- Shopping (course-006)
INSERT INTO lessons (id, course_id, title, description, lesson_order, total_steps, example_sentence, key_vocabulary_term, target_language, created_at, updated_at) VALUES
('lesson-en-006-01', 'course-006', 'At the Store', 'Shopping basics', 1, 10, 'Where can I find clothes', 'clothes', 'en', NOW(), NOW()),
('lesson-en-006-02', 'course-006', 'Asking Prices', 'Price inquiries', 2, 10, 'How much does this cost', 'cost', 'en', NOW(), NOW()),
('lesson-en-006-03', 'course-006', 'Trying Things', 'Trying items', 3, 10, 'Can I try this on', 'try', 'en', NOW(), NOW()),
('lesson-en-006-04', 'course-006', 'Payment', 'Paying for items', 4, 10, 'I will pay by card', 'pay', 'en', NOW(), NOW()),
('lesson-en-006-05', 'course-006', 'Returns', 'Returning items', 5, 10, 'I want to return this', 'return', 'en', NOW(), NOW());

-- Direction & Navigation (course-007)
INSERT INTO lessons (id, course_id, title, description, lesson_order, total_steps, example_sentence, key_vocabulary_term, target_language, created_at, updated_at) VALUES
('lesson-en-007-01', 'course-007', 'Asking Directions', 'Basic directions', 1, 10, 'Where is the train station', 'station', 'en', NOW(), NOW()),
('lesson-en-007-02', 'course-007', 'Left and Right', 'Understanding directions', 2, 10, 'Turn left at the corner', 'left', 'en', NOW(), NOW()),
('lesson-en-007-03', 'course-007', 'Public Transport', 'Using public transport', 3, 10, 'Which bus goes downtown', 'bus', 'en', NOW(), NOW()),
('lesson-en-007-04', 'course-007', 'Distance', 'Talking about distance', 4, 10, 'How far is it', 'far', 'en', NOW(), NOW()),
('lesson-en-007-05', 'course-007', 'Maps', 'Using maps', 5, 10, 'Can you show me on the map', 'map', 'en', NOW(), NOW());

-- Sport (course-008)
INSERT INTO lessons (id, course_id, title, description, lesson_order, total_steps, example_sentence, key_vocabulary_term, target_language, created_at, updated_at) VALUES
('lesson-en-008-01', 'course-008', 'Sports Activities', 'Common sports', 1, 10, 'I like to play football', 'football', 'en', NOW(), NOW()),
('lesson-en-008-02', 'course-008', 'At the Gym', 'Gym vocabulary', 2, 10, 'Where is the gym', 'gym', 'en', NOW(), NOW()),
('lesson-en-008-03', 'course-008', 'Swimming', 'Pool and swimming', 3, 10, 'Is there a swimming pool', 'pool', 'en', NOW(), NOW()),
('lesson-en-008-04', 'course-008', 'Outdoor Activities', 'Outdoor sports', 4, 10, 'I want to go hiking', 'hiking', 'en', NOW(), NOW()),
('lesson-en-008-05', 'course-008', 'Equipment', 'Sports equipment', 5, 10, 'I need to rent equipment', 'equipment', 'en', NOW(), NOW());

-- Health (course-009)
INSERT INTO lessons (id, course_id, title, description, lesson_order, total_steps, example_sentence, key_vocabulary_term, target_language, created_at, updated_at) VALUES
('lesson-en-009-01', 'course-009', 'At the Doctor', 'Medical visit', 1, 10, 'I need to see a doctor', 'doctor', 'en', NOW(), NOW()),
('lesson-en-009-02', 'course-009', 'Symptoms', 'Describing symptoms', 2, 10, 'I have a headache', 'headache', 'en', NOW(), NOW()),
('lesson-en-009-03', 'course-009', 'Pharmacy', 'At the pharmacy', 3, 10, 'I need medicine', 'medicine', 'en', NOW(), NOW()),
('lesson-en-009-04', 'course-009', 'Emergency', 'Medical emergency', 4, 10, 'Call an ambulance', 'ambulance', 'en', NOW(), NOW()),
('lesson-en-009-05', 'course-009', 'Hospital', 'At the hospital', 5, 10, 'Where is the hospital', 'hospital', 'en', NOW(), NOW());

-- Business (course-010)
INSERT INTO lessons (id, course_id, title, description, lesson_order, total_steps, example_sentence, key_vocabulary_term, target_language, created_at, updated_at) VALUES
('lesson-en-010-01', 'course-010', 'Meetings', 'Business meetings', 1, 10, 'Let us schedule a meeting', 'meeting', 'en', NOW(), NOW()),
('lesson-en-010-02', 'course-010', 'Introductions', 'Professional introductions', 2, 10, 'I work for a technology company', 'company', 'en', NOW(), NOW()),
('lesson-en-010-03', 'course-010', 'Negotiations', 'Business negotiations', 3, 10, 'What are your terms', 'terms', 'en', NOW(), NOW()),
('lesson-en-010-04', 'course-010', 'Presentations', 'Giving presentations', 4, 10, 'Let me show you the data', 'data', 'en', NOW(), NOW()),
('lesson-en-010-05', 'course-010', 'Emails', 'Business correspondence', 5, 10, 'I will send you an email', 'email', 'en', NOW(), NOW());

-- Emergency (course-011)
INSERT INTO lessons (id, course_id, title, description, lesson_order, total_steps, example_sentence, key_vocabulary_term, target_language, created_at, updated_at) VALUES
('lesson-en-011-01', 'course-011', 'Asking for Help', 'Emergency help', 1, 10, 'I need help please', 'help', 'en', NOW(), NOW()),
('lesson-en-011-02', 'course-011', 'Police', 'Contacting police', 2, 10, 'Call the police', 'police', 'en', NOW(), NOW()),
('lesson-en-011-03', 'course-011', 'Fire', 'Fire emergency', 3, 10, 'There is a fire', 'fire', 'en', NOW(), NOW()),
('lesson-en-011-04', 'course-011', 'Lost Items', 'Lost belongings', 4, 10, 'I lost my passport', 'passport', 'en', NOW(), NOW()),
('lesson-en-011-05', 'course-011', 'Accidents', 'Accidents', 5, 10, 'There has been an accident', 'accident', 'en', NOW(), NOW());

-- Continue with remaining languages in next part...
-- SPANISH (es), FRENCH (fr), HINDI (hi), JAPANESE (ja), KOREAN (ko), PORTUGUESE (pt), RUSSIAN (ru)
-- Each will get similar lesson structures

SELECT '✅ Part 1 Complete: German and English lessons added' as status;
