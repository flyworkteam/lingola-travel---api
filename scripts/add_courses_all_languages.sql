-- Add 5 courses for each language (Italian, Japanese, French, German, Spanish, Portuguese, Russian, Korean, Hindi)
-- Each language will have: General, Trip, Food & Drink, Accommodation, Shopping

-- ITALIAN COURSES
INSERT INTO courses (id, category, title, description, image_url, display_order, is_free, total_lessons, target_language) VALUES
('course-it-001', 'General', 'Italian Basics', 'Master everyday Italian expressions and basic interactions', 'assets/images/coursegenel.png', 1, 1, 12, 'it'),
('course-it-002', 'Trip', 'Airport Italian', 'Essential Italian phrases for airports and travel terminals', 'assets/images/courseairport.png', 2, 1, 12, 'it'),
('course-it-003', 'Food & Drink', 'Italian Dining', 'Navigate Italian restaurants, cafes, and food markets', 'assets/images/courseyemeicme.png', 3, 0, 12, 'it'),
('course-it-004', 'Accommodation', 'Italian Hotels', 'Check-in and communicate at Italian hotels', 'assets/images/coursekonaklama.png', 4, 0, 12, 'it'),
('course-it-005', 'Shopping', 'Italian Shopping', 'Shop confidently in Italian stores and markets', 'assets/images/courseshoping.png', 5, 0, 12, 'it');

-- JAPANESE COURSES
INSERT INTO courses (id, category, title, description, image_url, display_order, is_free, total_lessons, target_language) VALUES
('course-ja-001', 'General', 'Japanese Basics', 'Master everyday Japanese expressions and basic interactions', 'assets/images/coursegenel.png', 1, 1, 12, 'ja'),
('course-ja-002', 'Trip', 'Airport Japanese', 'Essential Japanese phrases for airports and travel terminals', 'assets/images/courseairport.png', 2, 1, 12, 'ja'),
('course-ja-003', 'Food & Drink', 'Japanese Dining', 'Navigate Japanese restaurants, sushi bars, and food markets', 'assets/images/courseyemeicme.png', 3, 0, 12, 'ja'),
('course-ja-004', 'Accommodation', 'Japanese Hotels', 'Check-in and communicate at Japanese hotels and ryokans', 'assets/images/coursekonaklama.png', 4, 0, 12, 'ja'),
('course-ja-005', 'Shopping', 'Japanese Shopping', 'Shop confidently in Japanese stores and convenience stores', 'assets/images/courseshoping.png', 5, 0, 12, 'ja');

-- FRENCH COURSES
INSERT INTO courses (id, category, title, description, image_url, display_order, is_free, total_lessons, target_language) VALUES
('course-fr-001', 'General', 'French Basics', 'Master everyday French expressions and basic interactions', 'assets/images/coursegenel.png', 1, 1, 12, 'fr'),
('course-fr-002', 'Trip', 'Airport French', 'Essential French phrases for airports and travel terminals', 'assets/images/courseairport.png', 2, 1, 12, 'fr'),
('course-fr-003', 'Food & Drink', 'French Dining', 'Navigate French restaurants, cafes, and patisseries', 'assets/images/courseyemeicme.png', 3, 0, 12, 'fr'),
('course-fr-004', 'Accommodation', 'French Hotels', 'Check-in and communicate at French hotels', 'assets/images/coursekonaklama.png', 4, 0, 12, 'fr'),
('course-fr-005', 'Shopping', 'French Shopping', 'Shop confidently in French boutiques and markets', 'assets/images/courseshoping.png', 5, 0, 12, 'fr');

-- GERMAN COURSES
INSERT INTO courses (id, category, title, description, image_url, display_order, is_free, total_lessons, target_language) VALUES
('course-de-001', 'General', 'German Basics', 'Master everyday German expressions and basic interactions', 'assets/images/coursegenel.png', 1, 1, 12, 'de'),
('course-de-002', 'Trip', 'Airport German', 'Essential German phrases for airports and travel terminals', 'assets/images/courseairport.png', 2, 1, 12, 'de'),
('course-de-003', 'Food & Drink', 'German Dining', 'Navigate German restaurants, beer gardens, and food markets', 'assets/images/courseyemeicme.png', 3, 0, 12, 'de'),
('course-de-004', 'Accommodation', 'German Hotels', 'Check-in and communicate at German hotels', 'assets/images/coursekonaklama.png', 4, 0, 12, 'de'),
('course-de-005', 'Shopping', 'German Shopping', 'Shop confidently in German stores and Christmas markets', 'assets/images/courseshoping.png', 5, 0, 12, 'de');

-- SPANISH COURSES
INSERT INTO courses (id, category, title, description, image_url, display_order, is_free, total_lessons, target_language) VALUES
('course-es-001', 'General', 'Spanish Basics', 'Master everyday Spanish expressions and basic interactions', 'assets/images/coursegenel.png', 1, 1, 12, 'es'),
('course-es-002', 'Trip', 'Airport Spanish', 'Essential Spanish phrases for airports and travel terminals', 'assets/images/courseairport.png', 2, 1, 12, 'es'),
('course-es-003', 'Food & Drink', 'Spanish Dining', 'Navigate Spanish restaurants, tapas bars, and food markets', 'assets/images/courseyemeicme.png', 3, 0, 12, 'es'),
('course-es-004', 'Accommodation', 'Spanish Hotels', 'Check-in and communicate at Spanish hotels', 'assets/images/coursekonaklama.png', 4, 0, 12, 'es'),
('course-es-005', 'Shopping', 'Spanish Shopping', 'Shop confidently in Spanish stores and markets', 'assets/images/courseshoping.png', 5, 0, 12, 'es');

-- PORTUGUESE COURSES
INSERT INTO courses (id, category, title, description, image_url, display_order, is_free, total_lessons, target_language) VALUES
('course-pt-001', 'General', 'Portuguese Basics', 'Master everyday Portuguese expressions and basic interactions', 'assets/images/coursegenel.png', 1, 1, 12, 'pt'),
('course-pt-002', 'Trip', 'Airport Portuguese', 'Essential Portuguese phrases for airports and travel terminals', 'assets/images/courseairport.png', 2, 1, 12, 'pt'),
('course-pt-003', 'Food & Drink', 'Portuguese Dining', 'Navigate Portuguese restaurants, cafes, and pastelarias', 'assets/images/courseyemeicme.png', 3, 0, 12, 'pt'),
('course-pt-004', 'Accommodation', 'Portuguese Hotels', 'Check-in and communicate at Portuguese hotels', 'assets/images/coursekonaklama.png', 4, 0, 12, 'pt'),
('course-pt-005', 'Shopping', 'Portuguese Shopping', 'Shop confidently in Portuguese stores and markets', 'assets/images/courseshoping.png', 5, 0, 12, 'pt');

-- RUSSIAN COURSES
INSERT INTO courses (id, category, title, description, image_url, display_order, is_free, total_lessons, target_language) VALUES
('course-ru-001', 'General', 'Russian Basics', 'Master everyday Russian expressions and basic interactions', 'assets/images/coursegenel.png', 1, 1, 12, 'ru'),
('course-ru-002', 'Trip', 'Airport Russian', 'Essential Russian phrases for airports and travel terminals', 'assets/images/courseairport.png', 2, 1, 12, 'ru'),
('course-ru-003', 'Food & Drink', 'Russian Dining', 'Navigate Russian restaurants, cafes, and food markets', 'assets/images/courseyemeicme.png', 3, 0, 12, 'ru'),
('course-ru-004', 'Accommodation', 'Russian Hotels', 'Check-in and communicate at Russian hotels', 'assets/images/coursekonaklama.png', 4, 0, 12, 'ru'),
('course-ru-005', 'Shopping', 'Russian Shopping', 'Shop confidently in Russian stores and markets', 'assets/images/courseshoping.png', 5, 0, 12, 'ru');

-- KOREAN COURSES
INSERT INTO courses (id, category, title, description, image_url, display_order, is_free, total_lessons, target_language) VALUES
('course-ko-001', 'General', 'Korean Basics', 'Master everyday Korean expressions and basic interactions', 'assets/images/coursegenel.png', 1, 1, 12, 'ko'),
('course-ko-002', 'Trip', 'Airport Korean', 'Essential Korean phrases for airports and travel terminals', 'assets/images/courseairport.png', 2, 1, 12, 'ko'),
('course-ko-003', 'Food & Drink', 'Korean Dining', 'Navigate Korean restaurants, BBQ, and food markets', 'assets/images/courseyemeicme.png', 3, 0, 12, 'ko'),
('course-ko-004', 'Accommodation', 'Korean Hotels', 'Check-in and communicate at Korean hotels', 'assets/images/coursekonaklama.png', 4, 0, 12, 'ko'),
('course-ko-005', 'Shopping', 'Korean Shopping', 'Shop confidently in Korean stores and markets', 'assets/images/courseshoping.png', 5, 0, 12, 'ko');

-- HINDI COURSES
INSERT INTO courses (id, category, title, description, image_url, display_order, is_free, total_lessons, target_language) VALUES
('course-hi-001', 'General', 'Hindi Basics', 'Master everyday Hindi expressions and basic interactions', 'assets/images/coursegenel.png', 1, 1, 12, 'hi'),
('course-hi-002', 'Trip', 'Airport Hindi', 'Essential Hindi phrases for airports and travel terminals', 'assets/images/courseairport.png', 2, 1, 12, 'hi'),
('course-hi-003', 'Food & Drink', 'Hindi Dining', 'Navigate Indian restaurants, street food, and food markets', 'assets/images/courseyemeicme.png', 3, 0, 12, 'hi'),
('course-hi-004', 'Accommodation', 'Hindi Hotels', 'Check-in and communicate at Indian hotels', 'assets/images/coursekonaklama.png', 4, 0, 12, 'hi'),
('course-hi-005', 'Shopping', 'Hindi Shopping', 'Shop confidently in Indian stores and bazaars', 'assets/images/courseshoping.png', 5, 0, 12, 'hi');
