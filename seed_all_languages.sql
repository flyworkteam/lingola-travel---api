-- Seed data for missing languages only
-- Languages to add: fr (French), pt (Portuguese), ru (Russian), hi (Hindi), ja (Japanese), ko (Korean)
-- Skip: de, en, es, it (already have lessons)

-- ============================================================================
-- FRENCH (fr) - French Basics Lessons
-- ============================================================================

INSERT INTO lessons (id, course_id, title, description, example_sentence, key_vocabulary_term, lesson_order, total_steps, target_language, created_at, updated_at) VALUES
('lesson-fr-001-01', 'course-fr-001', 'Salutations', 'Apprenez à saluer les gens en français', 'Bonjour ! Comment allez-vous ?', 'Bonjour', 1, 10, 'fr', NOW(), NOW()),
('lesson-fr-001-02', 'course-fr-001', 'Présentations', 'Présentez-vous en français', 'Je m''appelle Marie. Enchanté de vous rencontrer.', 'rencontrer', 2, 10, 'fr', NOW(), NOW()),
('lesson-fr-001-03', 'course-fr-001', 'Numéros', 'Apprenez les numéros en français', 'Je voudrais deux cafés, s''il vous plaît.', 'deux', 3, 10, 'fr', NOW(), NOW()),
('lesson-fr-001-04', 'course-fr-001', 'Couleurs', 'Apprenez les couleurs', 'Le ciel est bleu.', 'bleu', 4, 10, 'fr', NOW(), NOW()),
('lesson-fr-001-05', 'course-fr-001', 'Jours', 'Jours de la semaine', 'Aujourd''hui c''est lundi.', 'lundi', 5, 10, 'fr', NOW(), NOW()),
('lesson-fr-001-06', 'course-fr-001', 'Famille', 'Membres de la famille', 'Ma mère est professeure.', 'mère', 6, 10, 'fr', NOW(), NOW()),
('lesson-fr-001-07', 'course-fr-001', 'Nourriture', 'Mots de base sur la nourriture', 'J''aime le pain.', 'pain', 7, 10, 'fr', NOW(), NOW()),
('lesson-fr-001-08', 'course-fr-001', 'Boissons', 'Commander des boissons', 'Puis-je avoir de l''eau ?', 'eau', 8, 10, 'fr', NOW(), NOW()),
('lesson-fr-001-09', 'course-fr-001', 'Directions', 'Demander son chemin', 'Où sont les toilettes ?', 'où', 9, 10, 'fr', NOW(), NOW()),
('lesson-fr-001-10', 'course-fr-001', 'Shopping', 'Phrases d''achat', 'Combien ça coûte ?', 'combien', 10, 10, 'fr', NOW(), NOW()),
('lesson-fr-001-11', 'course-fr-001', 'Urgences', 'Phrases d''urgence', 'J''ai besoin d''aide.', 'aide', 11, 10, 'fr', NOW(), NOW()),
('lesson-fr-001-12', 'course-fr-001', 'Au revoir', 'Dire au revoir', 'À bientôt. Au revoir.', 'Au revoir', 12, 10, 'fr', NOW(), NOW());

INSERT INTO lesson_vocabulary (id, lesson_id, term, definition, icon_path, icon_color, display_order, target_language) VALUES
('vocab-fr-001-01', 'lesson-fr-001-01', 'Bonjour', 'Salutation formelle - Good day/Hello', 'assets/icons/greeting.svg', '#4ECDC4', 1, 'fr'),
('vocab-fr-001-02', 'lesson-fr-001-01', 'Comment allez-vous', 'Demander comment va quelqu''un - How are you', 'assets/icons/question.svg', '#4ECDC4', 2, 'fr'),
('vocab-fr-001-03', 'lesson-fr-001-01', 'Au revoir', 'Adieu formel - Goodbye', 'assets/icons/goodbye.svg', '#4ECDC4', 3, 'fr');

-- ============================================================================
-- PORTUGUESE (pt) - Portuguese Basics Lessons
-- ============================================================================

INSERT INTO lessons (id, course_id, title, description, example_sentence, key_vocabulary_term, lesson_order, total_steps, target_language, created_at, updated_at) VALUES
('lesson-pt-001-01', 'course-pt-001', 'Saudações', 'Aprenda a cumprimentar pessoas em português', 'Olá! Como está?', 'Olá', 1, 10, 'pt', NOW(), NOW()),
('lesson-pt-001-02', 'course-pt-001', 'Apresentações', 'Apresente-se em português', 'Meu nome é João. Prazer em conhecê-lo.', 'conhecê-lo', 2, 10, 'pt', NOW(), NOW()),
('lesson-pt-001-03', 'course-pt-001', 'Números', 'Aprenda números em português', 'Quero dois cafés, por favor.', 'dois', 3, 10, 'pt', NOW(), NOW()),
('lesson-pt-001-04', 'course-pt-001', 'Cores', 'Aprenda as cores', 'O céu é azul.', 'azul', 4, 10, 'pt', NOW(), NOW()),
('lesson-pt-001-05', 'course-pt-001', 'Dias', 'Dias da semana', 'Hoje é segunda-feira.', 'segunda-feira', 5, 10, 'pt', NOW(), NOW()),
('lesson-pt-001-06', 'course-pt-001', 'Família', 'Membros da família', 'Minha mãe é professora.', 'mãe', 6, 10, 'pt', NOW(), NOW()),
('lesson-pt-001-07', 'course-pt-001', 'Comida', 'Palavras básicas de comida', 'Gosto de pão.', 'pão', 7, 10, 'pt', NOW(), NOW()),
('lesson-pt-001-08', 'course-pt-001', 'Bebidas', 'Pedir bebidas', 'Posso tomar água?', 'água', 8, 10, 'pt', NOW(), NOW()),
('lesson-pt-001-09', 'course-pt-001', 'Direções', 'Pedir direções', 'Onde fica o banheiro?', 'onde', 9, 10, 'pt', NOW(), NOW()),
('lesson-pt-001-10', 'course-pt-001', 'Compras', 'Frases de compras', 'Quanto custa isso?', 'quanto', 10, 10, 'pt', NOW(), NOW()),
('lesson-pt-001-11', 'course-pt-001', 'Emergências', 'Frases de emergência', 'Preciso de ajuda.', 'ajuda', 11, 10, 'pt', NOW(), NOW()),
('lesson-pt-001-12', 'course-pt-001', 'Despedidas', 'Dizer adeus', 'Até logo. Tchau.', 'Tchau', 12, 10, 'pt', NOW(), NOW());

INSERT INTO lesson_vocabulary (id, lesson_id, term, definition, icon_path, icon_color, display_order, target_language) VALUES
('vocab-pt-001-01', 'lesson-pt-001-01', 'Olá', 'Saudação informal - Hi/Hello', 'assets/icons/greeting.svg', '#4ECDC4', 1, 'pt'),
('vocab-pt-001-02', 'lesson-pt-001-01', 'Como está', 'Perguntando como alguém está - How are you', 'assets/icons/question.svg', '#4ECDC4', 2, 'pt'),
('vocab-pt-001-03', 'lesson-pt-001-01', 'Tchau', 'Despedida - Goodbye', 'assets/icons/goodbye.svg', '#4ECDC4', 3, 'pt');

-- ============================================================================
-- RUSSIAN (ru) - Russian Basics Lessons
-- ============================================================================

INSERT INTO lessons (id, course_id, title, description, example_sentence, key_vocabulary_term, lesson_order, total_steps, target_language, created_at, updated_at) VALUES
('lesson-ru-001-01', 'course-ru-001', 'Приветствия', 'Научитесь приветствовать людей по-русски', 'Здравствуйте! Как дела?', 'Здравствуйте', 1, 10, 'ru', NOW(), NOW()),
('lesson-ru-001-02', 'course-ru-001', 'Представления', 'Представьтесь по-русски', 'Меня зовут Иван. Приятно познакомиться.', 'познакомиться', 2, 10, 'ru', NOW(), NOW()),
('lesson-ru-001-03', 'course-ru-001', 'Числа', 'Выучите числа на русском', 'Я хочу два кофе, пожалуйста.', 'два', 3, 10, 'ru', NOW(), NOW()),
('lesson-ru-001-04', 'course-ru-001', 'Цвета', 'Выучите цвета', 'Небо голубое.', 'голубое', 4, 10, 'ru', NOW(), NOW()),
('lesson-ru-001-05', 'course-ru-001', 'Дни', 'Дни недели', 'Сегодня понедельник.', 'понедельник', 5, 10, 'ru', NOW(), NOW()),
('lesson-ru-001-06', 'course-ru-001', 'Семья', 'Члены семьи', 'Моя мама учительница.', 'мама', 6, 10, 'ru', NOW(), NOW()),
('lesson-ru-001-07', 'course-ru-001', 'Еда', 'Основные продукты питания', 'Я люблю хлеб.', 'хлеб', 7, 10, 'ru', NOW(), NOW()),
('lesson-ru-001-08', 'course-ru-001', 'Напитки', 'Заказ напитков', 'Можно мне воду?', 'воду', 8, 10, 'ru', NOW(), NOW()),
('lesson-ru-001-09', 'course-ru-001', 'Направления', 'Спросить дорогу', 'Где туалет?', 'где', 9, 10, 'ru', NOW(), NOW()),
('lesson-ru-001-10', 'course-ru-001', 'Покупки', 'Фразы для покупок', 'Сколько это стоит?', 'сколько', 10, 10, 'ru', NOW(), NOW()),
('lesson-ru-001-11', 'course-ru-001', 'Чрезвычайные ситуации', 'Фразы на случай чрезвычайных ситуаций', 'Мне нужна помощь.', 'помощь', 11, 10, 'ru', NOW(), NOW()),
('lesson-ru-001-12', 'course-ru-001', 'Прощания', 'Прощаться', 'До свидания. Пока.', 'До свидания', 12, 10, 'ru', NOW(), NOW());

INSERT INTO lesson_vocabulary (id, lesson_id, term, definition, icon_path, icon_color, display_order, target_language) VALUES
('vocab-ru-001-01', 'lesson-ru-001-01', 'Здравствуйте', 'Формальное приветствие - Hello (formal)', 'assets/icons/greeting.svg', '#4ECDC4', 1, 'ru'),
('vocab-ru-001-02', 'lesson-ru-001-01', 'Как дела', 'Спросить, как у кого-то дела - How are you', 'assets/icons/question.svg', '#4ECDC4', 2, 'ru'),
('vocab-ru-001-03', 'lesson-ru-001-01', 'До свидания', 'Формальное прощание - Goodbye (formal)', 'assets/icons/goodbye.svg', '#4ECDC4', 3, 'ru');

-- ============================================================================
-- HINDI (hi) - Hindi Basics Lessons
-- ============================================================================

INSERT INTO lessons (id, course_id, title, description, example_sentence, key_vocabulary_term, lesson_order, total_steps, target_language, created_at, updated_at) VALUES
('lesson-hi-001-01', 'course-hi-001', 'अभिवादन', 'हिंदी में लोगों का अभिवादन करना सीखें', 'नमस्ते! आप कैसे हैं?', 'नमस्ते', 1, 10, 'hi', NOW(), NOW()),
('lesson-hi-001-02', 'course-hi-001', 'परिचय', 'हिंदी में अपना परिचय दें', 'मेरा नाम राज है। आपसे मिलकर खुशी हुई।', 'मिलकर', 2, 10, 'hi', NOW(), NOW()),
('lesson-hi-001-03', 'course-hi-001', 'संख्या', 'हिंदी में संख्याएं सीखें', 'मुझे दो कॉफी चाहिए।', 'दो', 3, 10, 'hi', NOW(), NOW()),
('lesson-hi-001-04', 'course-hi-001', 'रंग', 'रंग सीखें', 'आसमान नीला है।', 'नीला', 4, 10, 'hi', NOW(), NOW()),
('lesson-hi-001-05', 'course-hi-001', 'दिन', 'सप्ताह के दिन', 'आज सोमवार है।', 'सोमवार', 5, 10, 'hi', NOW(), NOW()),
('lesson-hi-001-06', 'course-hi-001', 'परिवार', 'परिवार के सदस्य', 'मेरी माँ शिक्षिका हैं।', 'माँ', 6, 10, 'hi', NOW(), NOW()),
('lesson-hi-001-07', 'course-hi-001', 'खाना', 'बुनियादी खाद्य शब्द', 'मुझे रोटी पसंद है।', 'रोटी', 7, 10, 'hi', NOW(), NOW()),
('lesson-hi-001-08', 'course-hi-001', 'पेय', 'पेय पदार्थ मांगना', 'क्या मुझे पानी मिल सकता है?', 'पानी', 8, 10, 'hi', NOW(), NOW()),
('lesson-hi-001-09', 'course-hi-001', 'दिशाएं', 'दिशाएं पूछना', 'शौचालय कहाँ है?', 'कहाँ', 9, 10, 'hi', NOW(), NOW()),
('lesson-hi-001-10', 'course-hi-001', 'खरीदारी', 'खरीदारी के वाक्यांश', 'यह कितने का है?', 'कितने', 10, 10, 'hi', NOW(), NOW()),
('lesson-hi-001-11', 'course-hi-001', 'आपातकाल', 'आपातकालीन वाक्यांश', 'मुझे मदद चाहिए।', 'मदद', 11, 10, 'hi', NOW(), NOW()),
('lesson-hi-001-12', 'course-hi-001', 'विदाई', 'अलविदा कहना', 'फिर मिलेंगे। अलविदा।', 'अलविदा', 12, 10, 'hi', NOW(), NOW());

INSERT INTO lesson_vocabulary (id, lesson_id, term, definition, icon_path, icon_color, display_order, target_language) VALUES
('vocab-hi-001-01', 'lesson-hi-001-01', 'नमस्ते', 'औपचारिक अभिवादन - Hello/Greetings', 'assets/icons/greeting.svg', '#4ECDC4', 1, 'hi'),
('vocab-hi-001-02', 'lesson-hi-001-01', 'आप कैसे हैं', 'किसी से पूछना - How are you', 'assets/icons/question.svg', '#4ECDC4', 2, 'hi'),
('vocab-hi-001-03', 'lesson-hi-001-01', 'अलविदा', 'विदाई - Goodbye', 'assets/icons/goodbye.svg', '#4ECDC4', 3, 'hi');

-- ============================================================================
-- JAPANESE (ja) - Japanese Basics Lessons
-- ============================================================================

INSERT INTO lessons (id, course_id, title, description, example_sentence, key_vocabulary_term, lesson_order, total_steps, target_language, created_at, updated_at) VALUES
('lesson-ja-001-01', 'course-ja-001', '挨拶', '日本語で人々に挨拶する方法を学びます', 'こんにちは！お元気ですか？', 'こんにちは', 1, 10, 'ja', NOW(), NOW()),
('lesson-ja-001-02', 'course-ja-001', '自己紹介', '日本語で自己紹介する', '私の名前は田中です。お会いできて嬉しいです。', '嬉しい', 2, 10, 'ja', NOW(), NOW()),
('lesson-ja-001-03', 'course-ja-001', '数字', '日本語で数字を学ぶ', 'コーヒーを二つください。', '二つ', 3, 10, 'ja', NOW(), NOW()),
('lesson-ja-001-04', 'course-ja-001', '色', '色を学ぶ', '空は青いです。', '青い', 4, 10, 'ja', NOW(), NOW()),
('lesson-ja-001-05', 'course-ja-001', '曜日', '曜日', '今日は月曜日です。', '月曜日', 5, 10, 'ja', NOW(), NOW()),
('lesson-ja-001-06', 'course-ja-001', '家族', '家族のメンバー', '私の母は先生です。', '母', 6, 10, 'ja', NOW(), NOW()),
('lesson-ja-001-07', 'course-ja-001', '食べ物', '基本的な食品の単語', 'パンが好きです。', 'パン', 7, 10, 'ja', NOW(), NOW()),
('lesson-ja-001-08', 'course-ja-001', '飲み物', '飲み物を注文する', '水をいただけますか？', '水', 8, 10, 'ja', NOW(), NOW()),
('lesson-ja-001-09', 'course-ja-001', '道順', '道を尋ねる', 'トイレはどこですか？', 'どこ', 9, 10, 'ja', NOW(), NOW()),
('lesson-ja-001-10', 'course-ja-001', '買い物', '買い物のフレーズ', 'これはいくらですか？', 'いくら', 10, 10, 'ja', NOW(), NOW()),
('lesson-ja-001-11', 'course-ja-001', '緊急事態', '緊急時のフレーズ', '助けが必要です。', '助け', 11, 10, 'ja', NOW(), NOW()),
('lesson-ja-001-12', 'course-ja-001', '別れの挨拶', 'さようならを言う', 'またね。さようなら。', 'さようなら', 12, 10, 'ja', NOW(), NOW());

INSERT INTO lesson_vocabulary (id, lesson_id, term, definition, icon_path, icon_color, display_order, target_language) VALUES
('vocab-ja-001-01', 'lesson-ja-001-01', 'こんにちは', '正式な挨拶 - Hello/Good day', 'assets/icons/greeting.svg', '#4ECDC4', 1, 'ja'),
('vocab-ja-001-02', 'lesson-ja-001-01', 'お元気ですか', '誰かに尋ねる - How are you', 'assets/icons/question.svg', '#4ECDC4', 2, 'ja'),
('vocab-ja-001-03', 'lesson-ja-001-01', 'さようなら', '正式な別れ - Goodbye', 'assets/icons/goodbye.svg', '#4ECDC4', 3, 'ja');

-- ============================================================================
-- KOREAN (ko) - Korean Basics Lessons
-- ============================================================================

INSERT INTO lessons (id, course_id, title, description, example_sentence, key_vocabulary_term, lesson_order, total_steps, target_language, created_at, updated_at) VALUES
('lesson-ko-001-01', 'course-ko-001', '인사', '한국어로 인사하는 방법을 배웁니다', '안녕하세요! 어떻게 지내세요?', '안녕하세요', 1, 10, 'ko', NOW(), NOW()),
('lesson-ko-001-02', 'course-ko-001', '소개', '한국어로 자기소개하기', '제 이름은 김민수입니다. 만나서 반갑습니다.', '반갑습니다', 2, 10, 'ko', NOW(), NOW()),
('lesson-ko-001-03', 'course-ko-001', '숫자', '한국어로 숫자 배우기', '커피 두 잔 주세요.', '두', 3, 10, 'ko', NOW(), NOW()),
('lesson-ko-001-04', 'course-ko-001', '색깔', '색깔 배우기', '하늘은 파란색입니다.', '파란색', 4, 10, 'ko', NOW(), NOW()),
('lesson-ko-001-05', 'course-ko-001', '요일', '요일', '오늘은 월요일입니다.', '월요일', 5, 10, 'ko', NOW(), NOW()),
('lesson-ko-001-06', 'course-ko-001', '가족', '가족 구성원', '제 어머니는 선생님입니다.', '어머니', 6, 10, 'ko', NOW(), NOW()),
('lesson-ko-001-07', 'course-ko-001', '음식', '기본 음식 단어', '저는 빵을 좋아합니다.', '빵', 7, 10, 'ko', NOW(), NOW()),
('lesson-ko-001-08', 'course-ko-001', '음료', '음료 주문하기', '물 한 잔 주시겠어요?', '물', 8, 10, 'ko', NOW(), NOW()),
('lesson-ko-001-09', 'course-ko-001', '길 찾기', '길을 묻기', '화장실이 어디에 있나요?', '어디', 9, 10, 'ko', NOW(), NOW()),
('lesson-ko-001-10', 'course-ko-001', '쇼핑', '쇼핑 문구', '이것은 얼마예요?', '얼마', 10, 10, 'ko', NOW(), NOW()),
('lesson-ko-001-11', 'course-ko-001', '비상 상황', '비상시 문구', '도움이 필요합니다.', '도움', 11, 10, 'ko', NOW(), NOW()),
('lesson-ko-001-12', 'course-ko-001', '작별 인사', '작별 인사하기', '또 만나요. 안녕히 가세요.', '안녕히 가세요', 12, 10, 'ko', NOW(), NOW());

INSERT INTO lesson_vocabulary (id, lesson_id, term, definition, icon_path, icon_color, display_order, target_language) VALUES
('vocab-ko-001-01', 'lesson-ko-001-01', '안녕하세요', '정중한 인사 - Hello/Greetings', 'assets/icons/greeting.svg', '#4ECDC4', 1, 'ko'),
('vocab-ko-001-02', 'lesson-ko-001-01', '어떻게 지내세요', '누군가에게 묻기 - How are you', 'assets/icons/question.svg', '#4ECDC4', 2, 'ko'),
('vocab-ko-001-03', 'lesson-ko-001-01', '안녕히 가세요', '정중한 작별 - Goodbye', 'assets/icons/goodbye.svg', '#4ECDC4', 3, 'ko');

-- ============================================================================
-- Display completion message
-- ============================================================================
SELECT 'All language lessons and vocabulary data inserted successfully!' as 'Status';
