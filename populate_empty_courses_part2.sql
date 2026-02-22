-- ================================================================
-- POPULATE EMPTY COURSES - PART 2: REMAINING LANGUAGES
-- Spanish, French, Hindi, Japanese, Korean, Portuguese, Russian
-- ================================================================

USE lingola_travel;

-- SPANISH (es) - 4 courses: Trip, Food, Accommodation, Shopping
-- Trip (course-es-002)
INSERT INTO lessons (id, course_id, title, description, lesson_order, total_steps, example_sentence, key_vocabulary_term, target_language, created_at, updated_at) VALUES
('lesson-es-002-01', 'course-es-002', 'Planning Trip', 'Trip planning', 1, 10, 'Voy a visitar España', 'visitar', 'es', NOW(), NOW()),
('lesson-es-002-02', 'course-es-002', 'Booking Tickets', 'Ticket booking', 2, 10, 'Necesito un billete', 'billete', 'es', NOW(), NOW()),
('lesson-es-002-03', 'course-es-002', 'Packing', 'Packing items', 3, 10, 'Debo hacer la maleta', 'maleta', 'es', NOW(), NOW()),
('lesson-es-002-04', 'course-es-002', 'During Travel', 'Traveling', 4, 10, 'El viaje es largo', 'viaje', 'es', NOW(), NOW()),
('lesson-es-002-05', 'course-es-002', 'Arriving', 'Arrival', 5, 10, 'He llegado al hotel', 'llegado', 'es', NOW(), NOW());

-- Food & Drink (course-es-003)
INSERT INTO lessons (id, course_id, title, description, lesson_order, total_steps, example_sentence, key_vocabulary_term, target_language, created_at, updated_at) VALUES
('lesson-es-003-01', 'course-es-003', 'Food Basics', 'Basic food vocabulary', 1, 10, 'Quiero una manzana', 'manzana', 'es', NOW(), NOW()),
('lesson-es-003-02', 'course-es-003', 'At Restaurant', 'Ordering food', 2, 10, 'El menú por favor', 'menú', 'es', NOW(), NOW()),
('lesson-es-003-03', 'course-es-003', 'Drinks', 'Beverages', 3, 10, 'Un vaso de agua por favor', 'agua', 'es', NOW(), NOW()),
('lesson-es-003-04', 'course-es-003', 'Breakfast', 'Breakfast items', 4, 10, 'Quiero pan tostado', 'pan', 'es', NOW(), NOW()),
('lesson-es-003-05', 'course-es-003', 'Desserts', 'Sweet treats', 5, 10, 'El pastel está delicioso', 'pastel', 'es', NOW(), NOW());

-- Accommodation (course-es-004)
INSERT INTO lessons (id, course_id, title, description, lesson_order, total_steps, example_sentence, key_vocabulary_term, target_language, created_at, updated_at) VALUES
('lesson-es-004-01', 'course-es-004', 'Hotel Check-in', 'Checking in', 1, 10, 'Tengo una reserva', 'reserva', 'es', NOW(), NOW()),
('lesson-es-004-02', 'course-es-004', 'Room Facilities', 'Room amenities', 2, 10, 'Dónde está el baño', 'baño', 'es', NOW(), NOW()),
('lesson-es-004-03', 'course-es-004', 'Hotel Services', 'Hotel services', 3, 10, 'Hay servicio de habitación', 'servicio', 'es', NOW(), NOW()),
('lesson-es-004-04', 'course-es-004', 'Problems', 'Reporting issues', 4, 10, 'La calefacción no funciona', 'calefacción', 'es', NOW(), NOW()),
('lesson-es-004-05', 'course-es-004', 'Check-out', 'Leaving hotel', 5, 10, 'Quiero hacer el check-out', 'check-out', 'es', NOW(), NOW());

-- Shopping (course-es-005)
INSERT INTO lessons (id, course_id, title, description, lesson_order, total_steps, example_sentence, key_vocabulary_term, target_language, created_at, updated_at) VALUES
('lesson-es-005-01', 'course-es-005', 'At the Store', 'Shopping basics', 1, 10, 'Dónde encuentro la ropa', 'ropa', 'es', NOW(), NOW()),
('lesson-es-005-02', 'course-es-005', 'Asking Prices', 'Price inquiries', 2, 10, 'Cuánto cuesta esto', 'cuesta', 'es', NOW(), NOW()),
('lesson-es-005-03', 'course-es-005', 'Trying Things', 'Trying items', 3, 10, 'Puedo probármelo', 'probármelo', 'es', NOW(), NOW()),
('lesson-es-005-04', 'course-es-005', 'Payment', 'Paying', 4, 10, 'Pago con tarjeta', 'pago', 'es', NOW(), NOW()),
('lesson-es-005-05', 'course-es-005', 'Returns', 'Returning items', 5, 10, 'Quiero devolver esto', 'devolver', 'es', NOW(), NOW());

-- FRENCH (fr) - 4 courses: Trip, Food, Accommodation, Shopping
-- Trip (course-fr-002)
INSERT INTO lessons (id, course_id, title, description, lesson_order, total_steps, example_sentence, key_vocabulary_term, target_language, created_at, updated_at) VALUES
('lesson-fr-002-01', 'course-fr-002', 'Planning Trip', 'Trip planning', 1, 10, 'Je vais visiter la France', 'visiter', 'fr', NOW(), NOW()),
('lesson-fr-002-02', 'course-fr-002', 'Booking Tickets', 'Ticket booking', 2, 10, 'J\'ai besoin d\'un billet', 'billet', 'fr', NOW(), NOW()),
('lesson-fr-002-03', 'course-fr-002', 'Packing', 'Packing items', 3, 10, 'Je dois faire ma valise', 'valise', 'fr', NOW(), NOW()),
('lesson-fr-002-04', 'course-fr-002', 'During Travel', 'Traveling', 4, 10, 'Le voyage est long', 'voyage', 'fr', NOW(), NOW()),
('lesson-fr-002-05', 'course-fr-002', 'Arriving', 'Arrival', 5, 10, 'Je suis arrivé à l\'hôtel', 'arrivé', 'fr', NOW(), NOW());

-- Food & Drink (course-fr-003)
INSERT INTO lessons (id, course_id, title, description, lesson_order, total_steps, example_sentence, key_vocabulary_term, target_language, created_at, updated_at) VALUES
('lesson-fr-003-01', 'course-fr-003', 'Food Basics', 'Basic food', 1, 10, 'Je veux une pomme', 'pomme', 'fr', NOW(), NOW()),
('lesson-fr-003-02', 'course-fr-003', 'At Restaurant', 'Ordering food', 2, 10, 'Le menu s\'il vous plaît', 'menu', 'fr', NOW(), NOW()),
('lesson-fr-003-03', 'course-fr-003', 'Drinks', 'Beverages', 3, 10, 'Un verre d\'eau s\'il vous plaît', 'eau', 'fr', NOW(), NOW()),
('lesson-fr-003-04', 'course-fr-003', 'Breakfast', 'Breakfast', 4, 10, 'Je prends un croissant', 'croissant', 'fr', NOW(), NOW()),
('lesson-fr-003-05', 'course-fr-003', 'Desserts', 'Sweet treats', 5, 10, 'Le gâteau est délicieux', 'gâteau', 'fr', NOW(), NOW());

-- Accommodation (course-fr-004)
INSERT INTO lessons (id, course_id, title, description, lesson_order, total_steps, example_sentence, key_vocabulary_term, target_language, created_at, updated_at) VALUES
('lesson-fr-004-01', 'course-fr-004', 'Hotel Check-in', 'Checking in', 1, 10, 'J\'ai une réservation', 'réservation', 'fr', NOW(), NOW()),
('lesson-fr-004-02', 'course-fr-004', 'Room Facilities', 'Room amenities', 2, 10, 'Où est la salle de bain', 'salle', 'fr', NOW(), NOW()),
('lesson-fr-004-03', 'course-fr-004', 'Hotel Services', 'Hotel services', 3, 10, 'Y a-t-il un service en chambre', 'service', 'fr', NOW(), NOW()),
('lesson-fr-004-04', 'course-fr-004', 'Problems', 'Reporting issues', 4, 10, 'Le chauffage ne marche pas', 'chauffage', 'fr', NOW(), NOW()),
('lesson-fr-004-05', 'course-fr-004', 'Check-out', 'Leaving', 5, 10, 'Je voudrais faire le check-out', 'check-out', 'fr', NOW(), NOW());

-- Shopping (course-fr-005)
INSERT INTO lessons (id, course_id, title, description, lesson_order, total_steps, example_sentence, key_vocabulary_term, target_language, created_at, updated_at) VALUES
('lesson-fr-005-01', 'course-fr-005', 'At the Store', 'Shopping basics', 1, 10, 'Où je trouve les vêtements', 'vêtements', 'fr', NOW(), NOW()),
('lesson-fr-005-02', 'course-fr-005', 'Asking Prices', 'Price inquiries', 2, 10, 'Combien ça coûte', 'coûte', 'fr', NOW(), NOW()),
('lesson-fr-005-03', 'course-fr-005', 'Trying Things', 'Trying items', 3, 10, 'Je peux l\'essayer', 'essayer', 'fr', NOW(), NOW()),
('lesson-fr-005-04', 'course-fr-005', 'Payment', 'Paying', 4, 10, 'Je paie par carte', 'paie', 'fr', NOW(), NOW()),
('lesson-fr-005-05', 'course-fr-005', 'Returns', 'Returning items', 5, 10, 'Je veux retourner ceci', 'retourner', 'fr', NOW(), NOW());

-- HINDI (hi) - 4 courses: Trip, Food, Accommodation, Shopping
-- Trip (course-hi-002)
INSERT INTO lessons (id, course_id, title, description, lesson_order, total_steps, example_sentence, key_vocabulary_term, target_language, created_at, updated_at) VALUES
('lesson-hi-002-01', 'course-hi-002', 'Planning Trip', 'Trip planning', 1, 10, 'Main India jaaunga', 'jaaunga', 'hi', NOW(), NOW()),
('lesson-hi-002-02', 'course-hi-002', 'Booking Tickets', 'Ticket booking', 2, 10, 'Mujhe ticket chahiye', 'ticket', 'hi', NOW(), NOW()),
('lesson-hi-002-03', 'course-hi-002', 'Packing', 'Packing items', 3, 10, 'Mujhe bag pack karna hai', 'bag', 'hi', NOW(), NOW()),
('lesson-hi-002-04', 'course-hi-002', 'During Travel', 'Traveling', 4, 10, 'Yatra lambi hai', 'yatra', 'hi', NOW(), NOW()),
('lesson-hi-002-05', 'course-hi-002', 'Arriving', 'Arrival', 5, 10, 'Main hotel pahunch gaya', 'pahunch', 'hi', NOW(), NOW());

-- Food & Drink (course-hi-003)
INSERT INTO lessons (id, course_id, title, description, lesson_order, total_steps, example_sentence, key_vocabulary_term, target_language, created_at, updated_at) VALUES
('lesson-hi-003-01', 'course-hi-003', 'Food Basics', 'Basic food', 1, 10, 'Mujhe seb chahiye', 'seb', 'hi', NOW(), NOW()),
('lesson-hi-003-02', 'course-hi-003', 'At Restaurant', 'Ordering food', 2, 10, 'Menu dijiye', 'menu', 'hi', NOW(), NOW()),
('lesson-hi-003-03', 'course-hi-003', 'Drinks', 'Beverages', 3, 10, 'Ek glass paani dijiye', 'paani', 'hi', NOW(), NOW()),
('lesson-hi-003-04', 'course-hi-003', 'Breakfast', 'Breakfast', 4, 10, 'Mujhe roti chahiye', 'roti', 'hi', NOW(), NOW()),
('lesson-hi-003-05', 'course-hi-003', 'Desserts', 'Sweet treats', 5, 10, 'Yeh cake bahut achcha hai', 'cake', 'hi', NOW(), NOW());

-- Accommodation (course-hi-004)
INSERT INTO lessons (id, course_id, title, description, lesson_order, total_steps, example_sentence, key_vocabulary_term, target_language, created_at, updated_at) VALUES
('lesson-hi-004-01', 'course-hi-004', 'Hotel Check-in', 'Checking in', 1, 10, 'Mere paas booking hai', 'booking', 'hi', NOW(), NOW()),
('lesson-hi-004-02', 'course-hi-004', 'Room Facilities', 'Room amenities', 2, 10, 'Bathroom kahan hai', 'bathroom', 'hi', NOW(), NOW()),
('lesson-hi-004-03', 'course-hi-004', 'Hotel Services', 'Hotel services', 3, 10, 'Kya room service hai', 'service', 'hi', NOW(), NOW()),
('lesson-hi-004-04', 'course-hi-004', 'Problems', 'Reporting issues', 4, 10, 'Heater kaam nahi kar raha', 'heater', 'hi', NOW(), NOW()),
('lesson-hi-004-05', 'course-hi-004', 'Check-out', 'Leaving', 5, 10, 'Main check-out karna chahta hoon', 'check-out', 'hi', NOW(), NOW());

-- Shopping (course-hi-005)
INSERT INTO lessons (id, course_id, title, description, lesson_order, total_steps, example_sentence, key_vocabulary_term, target_language, created_at, updated_at) VALUES
('lesson-hi-005-01', 'course-hi-005', 'At the Store', 'Shopping basics', 1, 10, 'Kapde kahan milenge', 'kapde', 'hi', NOW(), NOW()),
('lesson-hi-005-02', 'course-hi-005', 'Asking Prices', 'Price inquiries', 2, 10, 'Yeh kitne ka hai', 'kitne', 'hi', NOW(), NOW()),
('lesson-hi-005-03', 'course-hi-005', 'Trying Things', 'Trying items', 3, 10, 'Kya main try kar sakta hoon', 'try', 'hi', NOW(), NOW()),
('lesson-hi-005-04', 'course-hi-005', 'Payment', 'Paying', 4, 10, 'Main card se payment karunga', 'payment', 'hi', NOW(), NOW()),
('lesson-hi-005-05', 'course-hi-005', 'Returns', 'Returning items', 5, 10, 'Main yeh wapas karna chahta hoon', 'wapas', 'hi', NOW(), NOW());

-- JAPANESE (ja) - 4 courses: Trip, Food, Accommodation, Shopping
-- Trip (course-ja-002)
INSERT INTO lessons (id, course_id, title, description, lesson_order, total_steps, example_sentence, key_vocabulary_term, target_language, created_at, updated_at) VALUES
('lesson-ja-002-01', 'course-ja-002', 'Planning Trip', 'Trip planning', 1, 10, 'Nihon ni ikimasu', 'ikimasu', 'ja', NOW(), NOW()),
('lesson-ja-002-02', 'course-ja-002', 'Booking Tickets', 'Ticket booking', 2, 10, 'Kippu ga hitsuyou desu', 'kippu', 'ja', NOW(), NOW()),
('lesson-ja-002-03', 'course-ja-002', 'Packing', 'Packing items', 3, 10, 'Kaban wo tsumemasu', 'kaban', 'ja', NOW(), NOW()),
('lesson-ja-002-04', 'course-ja-002', 'During Travel', 'Traveling', 4, 10, 'Ryokou wa nagai desu', 'ryokou', 'ja', NOW(), NOW()),
('lesson-ja-002-05', 'course-ja-002', 'Arriving', 'Arrival', 5, 10, 'Hoteru ni tsukimashita', 'tsukimashita', 'ja', NOW(), NOW());

-- Food & Drink (course-ja-003)
INSERT INTO lessons (id, course_id, title, description, lesson_order, total_steps, example_sentence, key_vocabulary_term, target_language, created_at, updated_at) VALUES
('lesson-ja-003-01', 'course-ja-003', 'Food Basics', 'Basic food', 1, 10, 'Ringo ga hoshii desu', 'ringo', 'ja', NOW(), NOW()),
('lesson-ja-003-02', 'course-ja-003', 'At Restaurant', 'Ordering food', 2, 10, 'Menyuu wo kudasai', 'menyuu', 'ja', NOW(), NOW()),
('lesson-ja-003-03', 'course-ja-003', 'Drinks', 'Beverages', 3, 10, 'Mizu wo kudasai', 'mizu', 'ja', NOW(), NOW()),
('lesson-ja-003-04', 'course-ja-003', 'Breakfast', 'Breakfast', 4, 10, 'Pan wo tabemasu', 'pan', 'ja', NOW(), NOW()),
('lesson-ja-003-05', 'course-ja-003', 'Desserts', 'Sweet treats', 5, 10, 'Keeki wa oishii desu', 'keeki', 'ja', NOW(), NOW());

-- Accommodation (course-ja-004)
INSERT INTO lessons (id, course_id, title, description, lesson_order, total_steps, example_sentence, key_vocabulary_term, target_language, created_at, updated_at) VALUES
('lesson-ja-004-01', 'course-ja-004', 'Hotel Check-in', 'Checking in', 1, 10, 'Yoyaku ga arimasu', 'yoyaku', 'ja', NOW(), NOW()),
('lesson-ja-004-02', 'course-ja-004', 'Room Facilities', 'Room amenities', 2, 10, 'Toire wa doko desu ka', 'toire', 'ja', NOW(), NOW()),
('lesson-ja-004-03', 'course-ja-004', 'Hotel Services', 'Hotel services', 3, 10, 'Ruumu saabisu wa arimasu ka', 'saabisu', 'ja', NOW(), NOW()),
('lesson-ja-004-04', 'course-ja-004', 'Problems', 'Reporting issues', 4, 10, 'Hiito ga ugokimasen', 'hiito', 'ja', NOW(), NOW()),
('lesson-ja-004-05', 'course-ja-004', 'Check-out', 'Leaving', 5, 10, 'Chekkuauto shitai desu', 'chekkuauto', 'ja', NOW(), NOW());

-- Shopping (course-ja-005)
INSERT INTO lessons (id, course_id, title, description, lesson_order, total_steps, example_sentence, key_vocabulary_term, target_language, created_at, updated_at) VALUES
('lesson-ja-005-01', 'course-ja-005', 'At the Store', 'Shopping basics', 1, 10, 'Fuku wa doko desu ka', 'fuku', 'ja', NOW(), NOW()),
('lesson-ja-005-02', 'course-ja-005', 'Asking Prices', 'Price inquiries', 2, 10, 'Kore wa ikura desu ka', 'ikura', 'ja', NOW(), NOW()),
('lesson-ja-005-03', 'course-ja-005', 'Trying Things', 'Trying items', 3, 10, 'Tameshite mo ii desu ka', 'tameshite', 'ja', NOW(), NOW()),
('lesson-ja-005-04', 'course-ja-005', 'Payment', 'Paying', 4, 10, 'Kaado de haraimasu', 'haraimasu', 'ja', NOW(), NOW()),
('lesson-ja-005-05', 'course-ja-005', 'Returns', 'Returning items', 5, 10, 'Kore wo henpin shitai desu', 'henpin', 'ja', NOW(), NOW());

-- KOREAN (ko) - 4 courses
-- Trip (course-ko-002)
INSERT INTO lessons (id, course_id, title, description, lesson_order, total_steps, example_sentence, key_vocabulary_term, target_language, created_at, updated_at) VALUES
('lesson-ko-002-01', 'course-ko-002', 'Planning Trip', 'Trip planning', 1, 10, 'Hanguk-e gal geoyeyo', 'gal', 'ko', NOW(), NOW()),
('lesson-ko-002-02', 'course-ko-002', 'Booking Tickets', 'Ticket booking', 2, 10, 'Pyo-ga pilyohaeyo', 'pyo', 'ko', NOW(), NOW()),
('lesson-ko-002-03', 'course-ko-002', 'Packing', 'Packing items', 3, 10, 'Gabang-eul ssaya haeyo', 'gabang', 'ko', NOW(), NOW()),
('lesson-ko-002-04', 'course-ko-002', 'During Travel', 'Traveling', 4, 10, 'Yeohaeng-i gileoyo', 'yeohaeng', 'ko', NOW(), NOW()),
('lesson-ko-002-05', 'course-ko-002', 'Arriving', 'Arrival', 5, 10, 'Hotel-e dochakhaesseoyo', 'dochakhaesseoyo', 'ko', NOW(), NOW());

-- Food & Drink (course-ko-003)
INSERT INTO lessons (id, course_id, title, description, lesson_order, total_steps, example_sentence, key_vocabulary_term, target_language, created_at, updated_at) VALUES
('lesson-ko-003-01', 'course-ko-003', 'Food Basics', 'Basic food', 1, 10, 'Sagwa-reul wonhaeyo', 'sagwa', 'ko', NOW(), NOW()),
('lesson-ko-003-02', 'course-ko-003', 'At Restaurant', 'Ordering food', 2, 10, 'Menyu juseyo', 'menyu', 'ko', NOW(), NOW()),
('lesson-ko-003-03', 'course-ko-003', 'Drinks', 'Beverages', 3, 10, 'Mul han jan juseyo', 'mul', 'ko', NOW(), NOW()),
('lesson-ko-003-04', 'course-ko-003', 'Breakfast', 'Breakfast', 4, 10, 'Bbang-eul meogeoyo', 'bbang', 'ko', NOW(), NOW()),
('lesson-ko-003-05', 'course-ko-003', 'Desserts', 'Sweet treats', 5, 10, 'I keikeu-neun massisseoyo', 'keikeu', 'ko', NOW(), NOW());

-- Accommodation (course-ko-004)
INSERT INTO lessons (id, course_id, title, description, lesson_order, total_steps, example_sentence, key_vocabulary_term, target_language, created_at, updated_at) VALUES
('lesson-ko-004-01', 'course-ko-004', 'Hotel Check-in', 'Checking in', 1, 10, 'Yeyag-i isseoyo', 'yeyag', 'ko', NOW(), NOW()),
('lesson-ko-004-02', 'course-ko-004', 'Room Facilities', 'Room amenities', 2, 10, 'Hwajangsil-eun eodi isseoyo', 'hwajangsil', 'ko', NOW(), NOW()),
('lesson-ko-004-03', 'course-ko-004', 'Hotel Services', 'Hotel services', 3, 10, 'Rum seobiseu-ga isseoyo', 'seobiseu', 'ko', NOW(), NOW()),
('lesson-ko-004-04', 'course-ko-004', 'Problems', 'Reporting issues', 4, 10, 'Nan-bang-i an doeeyo', 'nan-bang', 'ko', NOW(), NOW()),
('lesson-ko-004-05', 'course-ko-004', 'Check-out', 'Leaving', 5, 10, 'Chekeaoteu hago sipeoyo', 'chekeaoteu', 'ko', NOW(), NOW());

-- Shopping (course-ko-005)
INSERT INTO lessons (id, course_id, title, description, lesson_order, total_steps, example_sentence, key_vocabulary_term, target_language, created_at, updated_at) VALUES
('lesson-ko-005-01', 'course-ko-005', 'At the Store', 'Shopping basics', 1, 10, 'Ot-eun eodi isseoyo', 'ot', 'ko', NOW(), NOW()),
('lesson-ko-005-02', 'course-ko-005', 'Asking Prices', 'Price inquiries', 2, 10, 'Eolma-eyo', 'eolma', 'ko', NOW(), NOW()),
('lesson-ko-005-03', 'course-ko-005', 'Trying Things', 'Trying items', 3, 10, 'Ipeo bwado dwaeyo', 'ipeo', 'ko', NOW(), NOW()),
('lesson-ko-005-04', 'course-ko-005', 'Payment', 'Paying', 4, 10, 'Kadeu-ro gyejeorhaeyo', 'kadeu', 'ko', NOW(), NOW()),
('lesson-ko-005-05', 'course-ko-005', 'Returns', 'Returning items', 5, 10, 'Igeo-reul banhwan hago sipeoyo', 'banhwan', 'ko', NOW(), NOW());

-- PORTUGUESE (pt) - 4 courses
-- Trip (course-pt-002)
INSERT INTO lessons (id, course_id, title, description, lesson_order, total_steps, example_sentence, key_vocabulary_term, target_language, created_at, updated_at) VALUES
('lesson-pt-002-01', 'course-pt-002', 'Planning Trip', 'Trip planning', 1, 10, 'Vou visitar o Brasil', 'visitar', 'pt', NOW(), NOW()),
('lesson-pt-002-02', 'course-pt-002', 'Booking Tickets', 'Ticket booking', 2, 10, 'Preciso de um bilhete', 'bilhete', 'pt', NOW(), NOW()),
('lesson-pt-002-03', 'course-pt-002', 'Packing', 'Packing items', 3, 10, 'Devo fazer a mala', 'mala', 'pt', NOW(), NOW()),
('lesson-pt-002-04', 'course-pt-002', 'During Travel', 'Traveling', 4, 10, 'A viagem é longa', 'viagem', 'pt', NOW(), NOW()),
('lesson-pt-002-05', 'course-pt-002', 'Arriving', 'Arrival', 5, 10, 'Cheguei ao hotel', 'cheguei', 'pt', NOW(), NOW());

-- Food & Drink (course-pt-003)
INSERT INTO lessons (id, course_id, title, description, lesson_order, total_steps, example_sentence, key_vocabulary_term, target_language, created_at, updated_at) VALUES
('lesson-pt-003-01', 'course-pt-003', 'Food Basics', 'Basic food', 1, 10, 'Quero uma maçã', 'maçã', 'pt', NOW(), NOW()),
('lesson-pt-003-02', 'course-pt-003', 'At Restaurant', 'Ordering food', 2, 10, 'O menu por favor', 'menu', 'pt', NOW(), NOW()),
('lesson-pt-003-03', 'course-pt-003', 'Drinks', 'Beverages', 3, 10, 'Um copo de água por favor', 'água', 'pt', NOW(), NOW()),
('lesson-pt-003-04', 'course-pt-003', 'Breakfast', 'Breakfast', 4, 10, 'Quero pão torrado', 'pão', 'pt', NOW(), NOW()),
('lesson-pt-003-05', 'course-pt-003', 'Desserts', 'Sweet treats', 5, 10, 'O bolo está delicioso', 'bolo', 'pt', NOW(), NOW());

-- Accommodation (course-pt-004)
INSERT INTO lessons (id, course_id, title, description, lesson_order, total_steps, example_sentence, key_vocabulary_term, target_language, created_at, updated_at) VALUES
('lesson-pt-004-01', 'course-pt-004', 'Hotel Check-in', 'Checking in', 1, 10, 'Tenho uma reserva', 'reserva', 'pt', NOW(), NOW()),
('lesson-pt-004-02', 'course-pt-004', 'Room Facilities', 'Room amenities', 2, 10, 'Onde fica o banheiro', 'banheiro', 'pt', NOW(), NOW()),
('lesson-pt-004-03', 'course-pt-004', 'Hotel Services', 'Hotel services', 3, 10, 'Há serviço de quarto', 'serviço', 'pt', NOW(), NOW()),
('lesson-pt-004-04', 'course-pt-004', 'Problems', 'Reporting issues', 4, 10, 'O aquecimento não funciona', 'aquecimento', 'pt', NOW(), NOW()),
('lesson-pt-004-05', 'course-pt-004', 'Check-out', 'Leaving', 5, 10, 'Quero fazer o check-out', 'check-out', 'pt', NOW(), NOW());

-- Shopping (course-pt-005)
INSERT INTO lessons (id, course_id, title, description, lesson_order, total_steps, example_sentence, key_vocabulary_term, target_language, created_at, updated_at) VALUES
('lesson-pt-005-01', 'course-pt-005', 'At the Store', 'Shopping basics', 1, 10, 'Onde encontro as roupas', 'roupas', 'pt', NOW(), NOW()),
('lesson-pt-005-02', 'course-pt-005', 'Asking Prices', 'Price inquiries', 2, 10, 'Quanto custa isto', 'custa', 'pt', NOW(), NOW()),
('lesson-pt-005-03', 'course-pt-005', 'Trying Things', 'Trying items', 3, 10, 'Posso experimentar', 'experimentar', 'pt', NOW(), NOW()),
('lesson-pt-005-04', 'course-pt-005', 'Payment', 'Paying', 4, 10, 'Pago com cartão', 'pago', 'pt', NOW(), NOW()),
('lesson-pt-005-05', 'course-pt-005', 'Returns', 'Returning items', 5, 10, 'Quero devolver isto', 'devolver', 'pt', NOW(), NOW());

-- RUSSIAN (ru) - 4 courses
-- Trip (course-ru-002)
INSERT INTO lessons (id, course_id, title, description, lesson_order, total_steps, example_sentence, key_vocabulary_term, target_language, created_at, updated_at) VALUES
('lesson-ru-002-01', 'course-ru-002', 'Planning Trip', 'Trip planning', 1, 10, 'Ya poedu v Rossiyu', 'poedu', 'ru', NOW(), NOW()),
('lesson-ru-002-02', 'course-ru-002', 'Booking Tickets', 'Ticket booking', 2, 10, 'Mne nuzhen bilet', 'bilet', 'ru', NOW(), NOW()),
('lesson-ru-002-03', 'course-ru-002', 'Packing', 'Packing items', 3, 10, 'Ya upakovyvayu sumku', 'sumku', 'ru', NOW(), NOW()),
('lesson-ru-002-04', 'course-ru-002', 'During Travel', 'Traveling', 4, 10, 'Puteshestvie dolgoe', 'puteshestvie', 'ru', NOW(), NOW()),
('lesson-ru-002-05', 'course-ru-002', 'Arriving', 'Arrival', 5, 10, 'Ya priehala v otel', 'priehala', 'ru', NOW(), NOW());

-- Food & Drink (course-ru-003)
INSERT INTO lessons (id, course_id, title, description, lesson_order, total_steps, example_sentence, key_vocabulary_term, target_language, created_at, updated_at) VALUES
('lesson-ru-003-01', 'course-ru-003', 'Food Basics', 'Basic food', 1, 10, 'Ya hochu yabloko', 'yabloko', 'ru', NOW(), NOW()),
('lesson-ru-003-02', 'course-ru-003', 'At Restaurant', 'Ordering food', 2, 10, 'Menyu pozhaluysta', 'menyu', 'ru', NOW(), NOW()),
('lesson-ru-003-03', 'course-ru-003', 'Drinks', 'Beverages', 3, 10, 'Stakan vody pozhaluysta', 'vody', 'ru', NOW(), NOW()),
('lesson-ru-003-04', 'course-ru-003', 'Breakfast', 'Breakfast', 4, 10, 'Ya vozmu hleb', 'hleb', 'ru', NOW(), NOW()),
('lesson-ru-003-05', 'course-ru-003', 'Desserts', 'Sweet treats', 5, 10, 'Tort ochen vkusnyy', 'tort', 'ru', NOW(), NOW());

-- Accommodation (course-ru-004)
INSERT INTO lessons (id, course_id, title, description, lesson_order, total_steps, example_sentence, key_vocabulary_term, target_language, created_at, updated_at) VALUES
('lesson-ru-004-01', 'course-ru-004', 'Hotel Check-in', 'Checking in', 1, 10, 'U menya est bronirovaniye', 'bronirovaniye', 'ru', NOW(), NOW()),
('lesson-ru-004-02', 'course-ru-004', 'Room Facilities', 'Room amenities', 2, 10, 'Gde nahoditsya vannaya', 'vannaya', 'ru', NOW(), NOW()),
('lesson-ru-004-03', 'course-ru-004', 'Hotel Services', 'Hotel services', 3, 10, 'Est li servis v nomer', 'servis', 'ru', NOW(), NOW()),
('lesson-ru-004-04', 'course-ru-004', 'Problems', 'Reporting issues', 4, 10, 'Otopleniye ne rabotaet', 'otopleniye', 'ru', NOW(), NOW()),
('lesson-ru-004-05', 'course-ru-004', 'Check-out', 'Leaving', 5, 10, 'Ya hochu sdolat check-out', 'check-out', 'ru', NOW(), NOW());

-- Shopping (course-ru-005)
INSERT INTO lessons (id, course_id, title, description, lesson_order, total_steps, example_sentence, key_vocabulary_term, target_language, created_at, updated_at) VALUES
('lesson-ru-005-01', 'course-ru-005', 'At the Store', 'Shopping basics', 1, 10, 'Gde nahoditsya odezhda', 'odezhda', 'ru', NOW(), NOW()),
('lesson-ru-005-02', 'course-ru-005', 'Asking Prices', 'Price inquiries', 2, 10, 'Skolko eto stoit', 'stoit', 'ru', NOW(), NOW()),
('lesson-ru-005-03', 'course-ru-005', 'Trying Things', 'Trying items', 3, 10, 'Mozhno primeryat', 'primeryat', 'ru', NOW(), NOW()),
('lesson-ru-005-04', 'course-ru-005', 'Payment', 'Paying', 4, 10, 'Ya zaplatu kartoy', 'zaplatu', 'ru', NOW(), NOW()),
('lesson-ru-005-05', 'course-ru-005', 'Returns', 'Returning items', 5, 10, 'Ya hochu vernut eto', 'vernut', 'ru', NOW(), NOW());

SELECT '✅ Part 2 Complete: All remaining language lessons added' as status;
