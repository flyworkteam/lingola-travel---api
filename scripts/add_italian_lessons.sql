-- Create lessons for Italian courses (course-it-001 to course-it-005)
-- Each course has 12 lessons

-- ITALIAN BASICS COURSE LESSONS  
INSERT INTO lessons (id, course_id, title, description, lesson_order, total_steps, image_url, target_language) VALUES
('lesson-it-001-01', 'course-it-001', 'Greetings', 'Learn how to greet people in Italian', 1, 10, 'assets/images/lesson_greeting.png', 'it'),
('lesson-it-001-02', 'course-it-001', 'Introductions', 'Introduce yourself in Italian', 2, 10, NULL, 'it'),
('lesson-it-001-03', 'course-it-001', 'Politeness', 'Please, thank you, and sorry', 3, 10, NULL, 'it'),
('lesson-it-001-04', 'course-it-001', 'Numbers 1-10', 'Count from 1 to 10', 4, 10, NULL, 'it'),
('lesson-it-001-05', 'course-it-001', 'Common Questions', 'Ask basic questions', 5, 10, NULL, 'it'),
('lesson-it-001-06', 'course-it-001', 'Yes and No', 'Agree and disagree politely', 6, 10, NULL, 'it'),
('lesson-it-001-07', 'course-it-001', 'Directions Basics', 'Left, right, straight', 7, 10, NULL, 'it'),
('lesson-it-001-08', 'course-it-001', 'Time Expressions', 'Now, today, tomorrow', 8, 10, NULL, 'it'),
('lesson-it-001-09', 'course-it-001', 'Family Members', 'Mother, father, sister, brother', 9, 10, NULL, 'it'),
('lesson-it-001-10', 'course-it-001', 'Colors', 'Red, blue, green, yellow', 10, 10, NULL, 'it'),
('lesson-it-001-11', 'course-it-001', 'Weather', 'Sunny, rainy, cold, hot', 11, 10, NULL, 'it'),
('lesson-it-001-12', 'course-it-001', 'Review', 'Practice all basics', 12, 10, NULL, 'it');

-- AIRPORT ITALIAN COURSE LESSONS
INSERT INTO lessons (id, course_id, title, description, lesson_order, total_steps, image_url, target_language) VALUES
('lesson-it-002-01', 'course-it-002', 'Check-in', 'Check in for your flight', 1, 10, 'assets/images/lesson_airport.png', 'it'),
('lesson-it-002-02', 'course-it-002', 'Boarding Pass', 'Get your boarding pass', 2, 10, NULL, 'it'),
('lesson-it-002-03', 'course-it-002', 'Security', 'Pass through security', 3, 10, NULL, 'it'),
('lesson-it-002-04', 'course-it-002', 'Gate Information', 'Find your gate', 4, 10, NULL, 'it'),
('lesson-it-002-05', 'course-it-002', 'Baggage Claim', 'Collect your luggage', 5, 10, NULL, 'it'),
('lesson-it-002-06', 'course-it-002', 'Customs', 'Go through customs', 6, 10, NULL, 'it'),
('lesson-it-002-07', 'course-it-002', 'Lost Baggage', 'Report lost luggage', 7, 10, NULL, 'it'),
('lesson-it-002-08', 'course-it-002', 'Flight Delays', 'Ask about delays', 8, 10, NULL, 'it'),
('lesson-it-002-09', 'course-it-002', 'Seat Selection', 'Choose your seat', 9, 10, NULL, 'it'),
('lesson-it-002-10', 'course-it-002', 'In-flight Service', 'Order food and drinks', 10, 10, NULL, 'it'),
('lesson-it-002-11', 'course-it-002', 'Arrival', 'Navigate the arrival hall', 11, 10, NULL, 'it'),
('lesson-it-002-12', 'course-it-002', 'Review', 'Practice all airport phrases', 12, 10, NULL, 'it');

-- ITALIAN DINING COURSE LESSONS
INSERT INTO lessons (id, course_id, title, description, lesson_order, total_steps, image_url, target_language) VALUES
('lesson-it-003-01', 'course-it-003', 'Reservation', 'Book a table', 1, 10, NULL, 'it'),
('lesson-it-003-02', 'course-it-003', 'Menu', 'Order from the menu', 2, 10, NULL, 'it'),
('lesson-it-003-03', 'course-it-003', 'Dietary Needs', 'Allergies and preferences', 3, 10, NULL, 'it'),
('lesson-it-003-04', 'course-it-003', 'Appetizers', 'Order starters', 4, 10, NULL, 'it'),
('lesson-it-003-05', 'course-it-003', 'Main Course', 'Order main dishes', 5, 10, NULL, 'it'),
('lesson-it-003-06', 'course-it-003', 'Drinks', 'Order beverages', 6, 10, NULL, 'it'),
('lesson-it-003-07', 'course-it-003', 'Dessert', 'Order dessert', 7, 10, NULL, 'it'),
('lesson-it-003-08', 'course-it-003', 'Complaints', 'Express concerns politely', 8, 10, NULL, 'it'),
('lesson-it-003-09', 'course-it-003', 'Bill', 'Ask for the check', 9, 10, NULL, 'it'),
('lesson-it-003-10', 'course-it-003', 'Tipping', 'Leave a tip', 10, 10, NULL, 'it'),
('lesson-it-003-11', 'course-it-003', 'Compliments', 'Praise the food', 11, 10, NULL, 'it'),
('lesson-it-003-12', 'course-it-003', 'Review', 'Practice all dining phrases', 12, 10, NULL, 'it');

-- ITALIAN HOTELS COURSE LESSONS
INSERT INTO lessons (id, course_id, title, description, lesson_order, total_steps, image_url, target_language) VALUES
('lesson-it-004-01', 'course-it-004', 'Check-in Hotel', 'Check in at the hotel', 1, 10, NULL, 'it'),
('lesson-it-004-02', 'course-it-004', 'Room Service', 'Order room service', 2, 10, NULL, 'it'),
('lesson-it-004-03', 'course-it-004', 'Facilities', 'Ask about amenities', 3, 10, NULL, 'it'),
('lesson-it-004-04', 'course-it-004', 'WiFi Password', 'Get internet access', 4, 10, NULL, 'it'),
('lesson-it-004-05', 'course-it-004', 'Breakfast', 'Ask about breakfast', 5, 10, NULL, 'it'),
('lesson-it-004-06', 'course-it-004', 'Housekeeping', 'Request cleaning', 6, 10, NULL, 'it'),
('lesson-it-004-07', 'course-it-004', 'Extra Towels', 'Ask for supplies', 7, 10, NULL, 'it'),
('lesson-it-004-08', 'course-it-004', 'Problem Solving', 'Report room issues', 8, 10, NULL, 'it'),
('lesson-it-004-09', 'course-it-004', 'Extension', 'Extend your stay', 9, 10, NULL, 'it'),
('lesson-it-004-10', 'course-it-004', 'Check-out', 'Check out of hotel', 10, 10, NULL, 'it'),
('lesson-it-004-11', 'course-it-004', 'Bill Questions', 'Clarify charges', 11, 10, NULL, 'it'),
('lesson-it-004-12', 'course-it-004', 'Review', 'Practice all hotel phrases', 12, 10, NULL, 'it');

-- ITALIAN SHOPPING COURSE LESSONS
INSERT INTO lessons (id, course_id, title, description, lesson_order, total_steps, image_url, target_language) VALUES
('lesson-it-005-01', 'course-it-005', 'Prices', 'Ask how much something costs', 1, 10, NULL, 'it'),
('lesson-it-005-02', 'course-it-005', 'Sizes', 'Find the right size', 2, 10, NULL, 'it'),
('lesson-it-005-03', 'course-it-005', 'Colors', 'Ask for different colors', 3, 10, NULL, 'it'),
('lesson-it-005-04', 'course-it-005', 'Trying On', 'Try before buying', 4, 10, NULL, 'it'),
('lesson-it-005-05', 'course-it-005', 'Discounts', 'Ask for discounts', 5, 10, NULL, 'it'),
('lesson-it-005-06', 'course-it-005', 'Payment', 'Pay for items', 6, 10, NULL, 'it'),
('lesson-it-005-07', 'course-it-005', 'Receipt', 'Get a receipt', 7, 10, NULL, 'it'),
('lesson-it-005-08', 'course-it-005', 'Returns', 'Return items', 8, 10, NULL, 'it'),
('lesson-it-005-09', 'course-it-005', 'Gift Wrapping', 'Request gift wrap', 9, 10, NULL, 'it'),
('lesson-it-005-10', 'course-it-005', 'Store Hours', 'Ask about hours', 10, 10, NULL, 'it'),
('lesson-it-005-11', 'course-it-005', 'Recommendations', 'Ask for suggestions', 11, 10, NULL, 'it'),
('lesson-it-005-12', 'course-it-005', 'Review', 'Practice all shopping phrases', 12, 10, NULL, 'it');
