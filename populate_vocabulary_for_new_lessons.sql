-- ================================================================
-- ADD VOCABULARY TO NEW LESSONS
-- 2 vocabulary items per lesson with keyvoc1.svg and keyvoc2.svg
-- ================================================================

USE lingola_travel;

-- Helper function: Generate vocabulary for all new lessons
-- Each lesson gets exactly 2 vocabulary items

-- GERMAN LESSONS VOCABULARY
-- Food & Drink (course-de-003)
INSERT INTO lesson_vocabulary (id, lesson_id, term, definition, icon_path, display_order, created_at) VALUES
(UUID(), 'lesson-de-003-01', 'Apfel', 'apple', 'assets/icons/keyvoc1.svg', 1, NOW()),
(UUID(), 'lesson-de-003-01', 'Obst', 'fruit', 'assets/icons/keyvoc2.svg', 2, NOW()),
(UUID(), 'lesson-de-003-02', 'Speisekarte', 'menu', 'assets/icons/keyvoc1.svg', 1, NOW()),
(UUID(), 'lesson-de-003-02', 'Rechnung', 'bill', 'assets/icons/keyvoc2.svg', 2, NOW()),
(UUID(), 'lesson-de-003-03', 'Wasser', 'water', 'assets/icons/keyvoc1.svg', 1, NOW()),
(UUID(), 'lesson-de-003-03', 'Getränk', 'beverage', 'assets/icons/keyvoc2.svg', 2, NOW()),
(UUID(), 'lesson-de-003-04', 'Brötchen', 'bread roll', 'assets/icons/keyvoc1.svg', 1, NOW()),
(UUID(), 'lesson-de-003-04', 'Frühstück', 'breakfast', 'assets/icons/keyvoc2.svg', 2, NOW()),
(UUID(), 'lesson-de-003-05', 'Kuchen', 'cake', 'assets/icons/keyvoc1.svg', 1, NOW()),
(UUID(), 'lesson-de-003-05', 'Dessert', 'dessert', 'assets/icons/keyvoc2.svg', 2, NOW());

-- Accommodation (course-de-004)
INSERT INTO lesson_vocabulary (id, lesson_id, term, definition, icon_path, display_order, created_at) VALUES
(UUID(), 'lesson-de-004-01', 'Reservierung', 'reservation', 'assets/icons/keyvoc1.svg', 1, NOW()),
(UUID(), 'lesson-de-004-01', 'Zimmer', 'room', 'assets/icons/keyvoc2.svg', 2, NOW()),
(UUID(), 'lesson-de-004-02', 'Badezimmer', 'bathroom', 'assets/icons/keyvoc1.svg', 1, NOW()),
(UUID(), 'lesson-de-004-02', 'Handtuch', 'towel', 'assets/icons/keyvoc2.svg', 2, NOW()),
(UUID(), 'lesson-de-004-03', 'Zimmerservice', 'room service', 'assets/icons/keyvoc1.svg', 1, NOW()),
(UUID(), 'lesson-de-004-03', 'Reinigung', 'cleaning', 'assets/icons/keyvoc2.svg', 2, NOW()),
(UUID(), 'lesson-de-004-04', 'Heizung', 'heating', 'assets/icons/keyvoc1.svg', 1, NOW()),
(UUID(), 'lesson-de-004-04', 'Problem', 'problem', 'assets/icons/keyvoc2.svg', 2, NOW()),
(UUID(), 'lesson-de-004-05', 'auschecken', 'check out', 'assets/icons/keyvoc1.svg', 1, NOW()),
(UUID(), 'lesson-de-004-05', 'Schlüssel', 'key', 'assets/icons/keyvoc2.svg', 2, NOW());

-- Shopping (course-de-005)
INSERT INTO lesson_vocabulary (id, lesson_id, term, definition, icon_path, display_order, created_at) VALUES
(UUID(), 'lesson-de-005-01', 'Kleidung', 'clothes', 'assets/icons/keyvoc1.svg', 1, NOW()),
(UUID(), 'lesson-de-005-01', 'Geschäft', 'store', 'assets/icons/keyvoc2.svg', 2, NOW()),
(UUID(), 'lesson-de-005-02', 'kostet', 'costs', 'assets/icons/keyvoc1.svg', 1, NOW()),
(UUID(), 'lesson-de-005-02', 'Preis', 'price', 'assets/icons/keyvoc2.svg', 2, NOW()),
(UUID(), 'lesson-de-005-03', 'anprobieren', 'try on', 'assets/icons/keyvoc1.svg', 1, NOW()),
(UUID(), 'lesson-de-005-03', 'Größe', 'size', 'assets/icons/keyvoc2.svg', 2, NOW()),
(UUID(), 'lesson-de-005-04', 'zahle', 'pay', 'assets/icons/keyvoc1.svg', 1, NOW()),
(UUID(), 'lesson-de-005-04', 'Karte', 'card', 'assets/icons/keyvoc2.svg', 2, NOW()),
(UUID(), 'lesson-de-005-05', 'zurückgeben', 'return', 'assets/icons/keyvoc1.svg', 1, NOW()),
(UUID(), 'lesson-de-005-05', 'Quittung', 'receipt', 'assets/icons/keyvoc2.svg', 2, NOW());

-- ENGLISH LESSONS VOCABULARY
-- Accommodation (course-004)
INSERT INTO lesson_vocabulary (id, lesson_id, term, definition, icon_path, display_order, created_at) VALUES
(UUID(), 'lesson-en-004-01', 'reservation', 'booking', 'assets/icons/keyvoc1.svg', 1, NOW()),
(UUID(), 'lesson-en-004-01', 'room', 'hotel room', 'assets/icons/keyvoc2.svg', 2, NOW()),
(UUID(), 'lesson-en-004-02', 'bathroom', 'toilet', 'assets/icons/keyvoc1.svg', 1, NOW()),
(UUID(), 'lesson-en-004-02', 'towel', 'bath towel', 'assets/icons/keyvoc2.svg', 2, NOW()),
(UUID(), 'lesson-en-004-03', 'service', 'help', 'assets/icons/keyvoc1.svg', 1, NOW()),
(UUID(), 'lesson-en-004-03', 'concierge', 'reception', 'assets/icons/keyvoc2.svg', 2, NOW()),
(UUID(), 'lesson-en-004-04', 'heating', 'heater', 'assets/icons/keyvoc1.svg', 1, NOW()),
(UUID(), 'lesson-en-004-04', 'broken', 'not working', 'assets/icons/keyvoc2.svg', 2, NOW()),
(UUID(), 'lesson-en-004-05', 'checkout', 'leave hotel', 'assets/icons/keyvoc1.svg', 1, NOW()),
(UUID(), 'lesson-en-004-05', 'key', 'room key', 'assets/icons/keyvoc2.svg', 2, NOW());

-- Culture (course-005)
INSERT INTO lesson_vocabulary (id, lesson_id, term, definition, icon_path, display_order, created_at) VALUES
(UUID(), 'lesson-en-005-01', 'tradition', 'custom', 'assets/icons/keyvoc1.svg', 1, NOW()),
(UUID(), 'lesson-en-005-01', 'culture', 'heritage', 'assets/icons/keyvoc2.svg', 2, NOW()),
(UUID(), 'lesson-en-005-02', 'museum', 'art gallery', 'assets/icons/keyvoc1.svg', 1, NOW()),
(UUID(), 'lesson-en-005-02', 'exhibition', 'display', 'assets/icons/keyvoc2.svg', 2, NOW()),
(UUID(), 'lesson-en-005-03', 'festival', 'celebration', 'assets/icons/keyvoc1.svg', 1, NOW()),
(UUID(), 'lesson-en-005-03', 'event', 'occasion', 'assets/icons/keyvoc2.svg', 2, NOW()),
(UUID(), 'lesson-en-005-04', 'painting', 'artwork', 'assets/icons/keyvoc1.svg', 1, NOW()),
(UUID(), 'lesson-en-005-04', 'artist', 'painter', 'assets/icons/keyvoc2.svg', 2, NOW()),
(UUID(), 'lesson-en-005-05', 'history', 'past', 'assets/icons/keyvoc1.svg', 1, NOW()),
(UUID(), 'lesson-en-005-05', 'monument', 'landmark', 'assets/icons/keyvoc2.svg', 2, NOW());

-- Shopping (course-006)
INSERT INTO lesson_vocabulary (id, lesson_id, term, definition, icon_path, display_order, created_at) VALUES
(UUID(), 'lesson-en-006-01', 'clothes', 'clothing', 'assets/icons/keyvoc1.svg', 1, NOW()),
(UUID(), 'lesson-en-006-01', 'store', 'shop', 'assets/icons/keyvoc2.svg', 2, NOW()),
(UUID(), 'lesson-en-006-02', 'cost', 'price', 'assets/icons/keyvoc1.svg', 1, NOW()),
(UUID(), 'lesson-en-006-02', 'expensive', 'costly', 'assets/icons/keyvoc2.svg', 2, NOW()),
(UUID(), 'lesson-en-006-03', 'try', 'test', 'assets/icons/keyvoc1.svg', 1, NOW()),
(UUID(), 'lesson-en-006-03', 'size', 'fit', 'assets/icons/keyvoc2.svg', 2, NOW()),
(UUID(), 'lesson-en-006-04', 'pay', 'payment', 'assets/icons/keyvoc1.svg', 1, NOW()),
(UUID(), 'lesson-en-006-04', 'card', 'credit card', 'assets/icons/keyvoc2.svg', 2, NOW()),
(UUID(), 'lesson-en-006-05', 'return', 'refund', 'assets/icons/keyvoc1.svg', 1, NOW()),
(UUID(), 'lesson-en-006-05', 'receipt', 'proof', 'assets/icons/keyvoc2.svg', 2, NOW());

-- Direction & Navigation (course-007)
INSERT INTO lesson_vocabulary (id, lesson_id, term, definition, icon_path, display_order, created_at) VALUES
(UUID(), 'lesson-en-007-01', 'station', 'train station', 'assets/icons/keyvoc1.svg', 1, NOW()),
(UUID(), 'lesson-en-007-01', 'where', 'location', 'assets/icons/keyvoc2.svg', 2, NOW()),
(UUID(), 'lesson-en-007-02', 'left', 'turn left', 'assets/icons/keyvoc1.svg', 1, NOW()),
(UUID(), 'lesson-en-007-02', 'right', 'turn right', 'assets/icons/keyvoc2.svg', 2, NOW()),
(UUID(), 'lesson-en-007-03', 'bus', 'public bus', 'assets/icons/keyvoc1.svg', 1, NOW()),
(UUID(), 'lesson-en-007-03', 'subway', 'metro', 'assets/icons/keyvoc2.svg', 2, NOW()),
(UUID(), 'lesson-en-007-04', 'far', 'distance', 'assets/icons/keyvoc1.svg', 1, NOW()),
(UUID(), 'lesson-en-007-04', 'close', 'nearby', 'assets/icons/keyvoc2.svg', 2, NOW()),
(UUID(), 'lesson-en-007-05', 'map', 'guide', 'assets/icons/keyvoc1.svg', 1, NOW()),
(UUID(), 'lesson-en-007-05', 'location', 'place', 'assets/icons/keyvoc2.svg', 2, NOW());

-- Sport (course-008)
INSERT INTO lesson_vocabulary (id, lesson_id, term, definition, icon_path, display_order, created_at) VALUES
(UUID(), 'lesson-en-008-01', 'football', 'soccer', 'assets/icons/keyvoc1.svg', 1, NOW()),
(UUID(), 'lesson-en-008-01', 'play', 'game', 'assets/icons/keyvoc2.svg', 2, NOW()),
(UUID(), 'lesson-en-008-02', 'gym', 'fitness center', 'assets/icons/keyvoc1.svg', 1, NOW()),
(UUID(), 'lesson-en-008-02', 'exercise', 'workout', 'assets/icons/keyvoc2.svg', 2, NOW()),
(UUID(), 'lesson-en-008-03', 'pool', 'swimming pool', 'assets/icons/keyvoc1.svg', 1, NOW()),
(UUID(), 'lesson-en-008-03', 'swim', 'swimming', 'assets/icons/keyvoc2.svg', 2, NOW()),
(UUID(), 'lesson-en-008-04', 'hiking', 'trekking', 'assets/icons/keyvoc1.svg', 1, NOW()),
(UUID(), 'lesson-en-008-04', 'mountain', 'hill', 'assets/icons/keyvoc2.svg', 2, NOW()),
(UUID(), 'lesson-en-008-05', 'equipment', 'gear', 'assets/icons/keyvoc1.svg', 1, NOW()),
(UUID(), 'lesson-en-008-05', 'rent', 'hire', 'assets/icons/keyvoc2.svg', 2, NOW());

-- Health (course-009)
INSERT INTO lesson_vocabulary (id, lesson_id, term, definition, icon_path, display_order, created_at) VALUES
(UUID(), 'lesson-en-009-01', 'doctor', 'physician', 'assets/icons/keyvoc1.svg', 1, NOW()),
(UUID(), 'lesson-en-009-01', 'appointment', 'meeting', 'assets/icons/keyvoc2.svg', 2, NOW()),
(UUID(), 'lesson-en-009-02', 'headache', 'pain', 'assets/icons/keyvoc1.svg', 1, NOW()),
(UUID(), 'lesson-en-009-02', 'fever', 'temperature', 'assets/icons/keyvoc2.svg', 2, NOW()),
(UUID(), 'lesson-en-009-03', 'medicine', 'medication', 'assets/icons/keyvoc1.svg', 1, NOW()),
(UUID(), 'lesson-en-009-03', 'pharmacy', 'drugstore', 'assets/icons/keyvoc2.svg', 2, NOW()),
(UUID(), 'lesson-en-009-04', 'ambulance', 'emergency', 'assets/icons/keyvoc1.svg', 1, NOW()),
(UUID(), 'lesson-en-009-04', 'urgent', 'emergency', 'assets/icons/keyvoc2.svg', 2, NOW()),
(UUID(), 'lesson-en-009-05', 'hospital', 'clinic', 'assets/icons/keyvoc1.svg', 1, NOW()),
(UUID(), 'lesson-en-009-05', 'nurse', 'medical staff', 'assets/icons/keyvoc2.svg', 2, NOW());

-- Business (course-010)
INSERT INTO lesson_vocabulary (id, lesson_id, term, definition, icon_path, display_order, created_at) VALUES
(UUID(), 'lesson-en-010-01', 'meeting', 'conference', 'assets/icons/keyvoc1.svg', 1, NOW()),
(UUID(), 'lesson-en-010-01', 'schedule', 'calendar', 'assets/icons/keyvoc2.svg', 2, NOW()),
(UUID(), 'lesson-en-010-02', 'company', 'business', 'assets/icons/keyvoc1.svg', 1, NOW()),
(UUID(), 'lesson-en-010-02', 'colleague', 'coworker', 'assets/icons/keyvoc2.svg', 2, NOW()),
(UUID(), 'lesson-en-010-03', 'terms', 'conditions', 'assets/icons/keyvoc1.svg', 1, NOW()),
(UUID(), 'lesson-en-010-03', 'contract', 'agreement', 'assets/icons/keyvoc2.svg', 2, NOW()),
(UUID(), 'lesson-en-010-04', 'data', 'information', 'assets/icons/keyvoc1.svg', 1, NOW()),
(UUID(), 'lesson-en-010-04', 'report', 'analysis', 'assets/icons/keyvoc2.svg', 2, NOW()),
(UUID(), 'lesson-en-010-05', 'email', 'message', 'assets/icons/keyvoc1.svg', 1, NOW()),
(UUID(), 'lesson-en-010-05', 'document', 'file', 'assets/icons/keyvoc2.svg', 2, NOW());

-- Emergency (course-011)
INSERT INTO lesson_vocabulary (id, lesson_id, term, definition, icon_path, display_order, created_at) VALUES
(UUID(), 'lesson-en-011-01', 'help', 'assistance', 'assets/icons/keyvoc1.svg', 1, NOW()),
(UUID(), 'lesson-en-011-01', 'emergency', 'urgent', 'assets/icons/keyvoc2.svg', 2, NOW()),
(UUID(), 'lesson-en-011-02', 'police', 'officer', 'assets/icons/keyvoc1.svg', 1, NOW()),
(UUID(), 'lesson-en-011-02', 'crime', 'theft', 'assets/icons/keyvoc2.svg', 2, NOW()),
(UUID(), 'lesson-en-011-03', 'fire', 'flames', 'assets/icons/keyvoc1.svg', 1, NOW()),
(UUID(), 'lesson-en-011-03', 'danger', 'hazard', 'assets/icons/keyvoc2.svg', 2, NOW()),
(UUID(), 'lesson-en-011-04', 'passport', 'document', 'assets/icons/keyvoc1.svg', 1, NOW()),
(UUID(), 'lesson-en-011-04', 'lost', 'missing', 'assets/icons/keyvoc2.svg', 2, NOW()),
(UUID(), 'lesson-en-011-05', 'accident', 'crash', 'assets/icons/keyvoc1.svg', 1, NOW()),
(UUID(), 'lesson-en-011-05', 'injury', 'hurt', 'assets/icons/keyvoc2.svg', 2, NOW());

SELECT '✅ Vocabulary added for German and English lessons' as status;
SELECT 
  COUNT(*) as new_vocabulary_count
FROM lesson_vocabulary
WHERE lesson_id LIKE 'lesson-de-%' OR lesson_id LIKE 'lesson-en-%';
