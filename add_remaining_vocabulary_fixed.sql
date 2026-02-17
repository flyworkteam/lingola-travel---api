-- Add vocabulary to courses with 2.0-2.2 words per lesson
-- Target: 3 words per lesson for all courses

-- Italian Dining/Hotels/Shopping (currently 2.0, need 1 more per lesson = 36 words total)
INSERT IGNORE INTO lesson_vocabulary (lesson_id, term, definition, target_language, source_language) 
SELECT l.id, 
  CASE 
    WHEN l.display_order = 1 THEN 'tavolo'
    WHEN l.display_order = 2 THEN 'cameriere'
    WHEN l.display_order = 3 THEN 'conto'
    WHEN l.display_order = 4 THEN 'delizioso'
    WHEN l.display_order = 5 THEN 'prenotazione'
    WHEN l.display_order = 6 THEN 'menu'
    WHEN l.display_order = 7 THEN 'bevanda'
    WHEN l.display_order = 8 THEN 'antipasto'
    WHEN l.display_order = 9 THEN 'dolce'
    WHEN l.display_order = 10 THEN 'pagare'
    WHEN l.display_order = 11 THEN 'mancia'
    ELSE 'ristorante'
  END,
  CASE 
    WHEN l.display_order = 1 THEN 'table'
    WHEN l.display_order = 2 THEN 'waiter'
    WHEN l.display_order = 3 THEN 'bill'
    WHEN l.display_order = 4 THEN 'delicious'
    WHEN l.display_order = 5 THEN 'reservation'
    WHEN l.display_order = 6 THEN 'menu'
    WHEN l.display_order = 7 THEN 'drink'
    WHEN l.display_order = 8 THEN 'appetizer'
    WHEN l.display_order = 9 THEN 'dessert'
    WHEN l.display_order = 10 THEN 'to pay'
    WHEN l.display_order = 11 THEN 'tip'
    ELSE 'restaurant'
  END,
  'it',
  'en'
FROM lessons l
JOIN courses c ON l.course_id = c.id
WHERE c.title IN ('Italian Dining', 'Italian Hotels', 'Italian Shopping');

-- Place an order, test test (currently 2.0, need 24 more words)
INSERT IGNORE INTO lesson_vocabulary (lesson_id, term, definition, target_language, source_language) 
SELECT l.id, 
  CASE 
    WHEN l.display_order = 1 THEN 'order'
    WHEN l.display_order = 2 THEN 'delivery'
    WHEN l.display_order = 3 THEN 'receipt'
    WHEN l.display_order = 4 THEN 'payment'
    WHEN l.display_order = 5 THEN 'address'
    WHEN l.display_order = 6 THEN 'phone'
    WHEN l.display_order = 7 THEN 'confirm'
    WHEN l.display_order = 8 THEN 'cancel'
    WHEN l.display_order = 9 THEN 'refund'
    WHEN l.display_order = 10 THEN 'customer'
    WHEN l.display_order = 11 THEN 'service'
    ELSE 'product'
  END,
  CASE 
    WHEN l.display_order = 1 THEN 'sipariş'
    WHEN l.display_order = 2 THEN 'teslimat'
    WHEN l.display_order = 3 THEN 'fiş'
    WHEN l.display_order = 4 THEN 'ödeme'
    WHEN l.display_order = 5 THEN 'adres'
    WHEN l.display_order = 6 THEN 'telefon'
    WHEN l.display_order = 7 THEN 'onayla'
    WHEN l.display_order = 8 THEN 'iptal'
    WHEN l.display_order = 9 THEN 'iade'
    WHEN l.display_order = 10 THEN 'müşteri'
    WHEN l.display_order = 11 THEN 'servis'
    ELSE 'ürün'
  END,
  'en',
  'tr'
FROM lessons l
JOIN courses c ON l.course_id = c.id
WHERE c.title IN ('Place an order', 'test test');

-- Airport German, Airport Italian (currently 2.1, need 24 more words)
INSERT IGNORE INTO lesson_vocabulary (lesson_id, term, definition, target_language, source_language) 
SELECT l.id, 
  CASE 
    WHEN c.target_language = 'de' THEN
      CASE 
        WHEN l.display_order = 1 THEN 'Tor'
        WHEN l.display_order = 2 THEN 'Einsteigen'
        WHEN l.display_order = 3 THEN 'Reisepass'
        WHEN l.display_order = 4 THEN 'Gepäck'
        WHEN l.display_order = 5 THEN 'Sicherheit'
        WHEN l.display_order = 6 THEN 'Flug'
        WHEN l.display_order = 7 THEN 'Verspätung'
        WHEN l.display_order = 8 THEN 'Terminal'
        WHEN l.display_order = 9 THEN 'Zoll'
        WHEN l.display_order = 10 THEN 'Ankunft'
        WHEN l.display_order = 11 THEN 'Abflug'
        ELSE 'Ticket'
      END
    ELSE -- Italian
      CASE 
        WHEN l.display_order = 1 THEN 'cancello'
        WHEN l.display_order = 2 THEN 'imbarco'
        WHEN l.display_order = 3 THEN 'passaporto'
        WHEN l.display_order = 4 THEN 'bagaglio'
        WHEN l.display_order = 5 THEN 'sicurezza'
        WHEN l.display_order = 6 THEN 'volo'
        WHEN l.display_order = 7 THEN 'ritardo'
        WHEN l.display_order = 8 THEN 'terminale'
        WHEN l.display_order = 9 THEN 'dogana'
        WHEN l.display_order = 10 THEN 'arrivo'
        WHEN l.display_order = 11 THEN 'partenza'
        ELSE 'biglietto'
      END
  END,
  CASE 
    WHEN l.display_order = 1 THEN 'gate'
    WHEN l.display_order = 2 THEN 'boarding'
    WHEN l.display_order = 3 THEN 'passport'
    WHEN l.display_order = 4 THEN 'baggage'
    WHEN l.display_order = 5 THEN 'security'
    WHEN l.display_order = 6 THEN 'flight'
    WHEN l.display_order = 7 THEN 'delay'
    WHEN l.display_order = 8 THEN 'terminal'
    WHEN l.display_order = 9 THEN 'customs'
    WHEN l.display_order = 10 THEN 'arrival'
    WHEN l.display_order = 11 THEN 'departure'
    ELSE 'ticket'
  END,
  c.target_language,
  'en'
FROM lessons l
JOIN courses c ON l.course_id = c.id
WHERE c.title IN ('Airport German', 'Airport Italian');

-- French/Hindi/Japanese/Korean/Portuguese/Russian Basics (currently 2.1, need 72 more words)
INSERT IGNORE INTO lesson_vocabulary (lesson_id, term, definition, target_language, source_language) 
SELECT l.id, 
  CASE 
    WHEN c.target_language = 'fr' THEN
      CASE WHEN l.display_order = 1 THEN 'famille' WHEN l.display_order = 2 THEN 'ami' WHEN l.display_order = 3 THEN 'travail' WHEN l.display_order = 4 THEN 'école' WHEN l.display_order = 5 THEN 'maison' WHEN l.display_order = 6 THEN 'nourriture' WHEN l.display_order = 7 THEN 'eau' WHEN l.display_order = 8 THEN 'temps' WHEN l.display_order = 9 THEN 'jour' WHEN l.display_order = 10 THEN 'nuit' WHEN l.display_order = 11 THEN 'voyage' ELSE 'langue' END
    WHEN c.target_language = 'hi' THEN
      CASE WHEN l.display_order = 1 THEN 'परिवार' WHEN l.display_order = 2 THEN 'दोस्त' WHEN l.display_order = 3 THEN 'काम' WHEN l.display_order = 4 THEN 'स्कूल' WHEN l.display_order = 5 THEN 'घर' WHEN l.display_order = 6 THEN 'खाना' WHEN l.display_order = 7 THEN 'पानी' WHEN l.display_order = 8 THEN 'समय' WHEN l.display_order = 9 THEN 'दिन' WHEN l.display_order = 10 THEN 'रात' WHEN l.display_order = 11 THEN 'यात्रा' ELSE 'भाषा' END
    WHEN c.target_language = 'ja' THEN
      CASE WHEN l.display_order = 1 THEN '家族' WHEN l.display_order = 2 THEN '友達' WHEN l.display_order = 3 THEN '仕事' WHEN l.display_order = 4 THEN '学校' WHEN l.display_order = 5 THEN '家' WHEN l.display_order = 6 THEN '食べ物' WHEN l.display_order = 7 THEN '水' WHEN l.display_order = 8 THEN '時間' WHEN l.display_order = 9 THEN '日' WHEN l.display_order = 10 THEN '夜' WHEN l.display_order = 11 THEN '旅行' ELSE '言語' END
    WHEN c.target_language = 'ko' THEN
      CASE WHEN l.display_order = 1 THEN '가족' WHEN l.display_order = 2 THEN '친구' WHEN l.display_order = 3 THEN '일' WHEN l.display_order = 4 THEN '학교' WHEN l.display_order = 5 THEN '집' WHEN l.display_order = 6 THEN '음식' WHEN l.display_order = 7 THEN '물' WHEN l.display_order = 8 THEN '시간' WHEN l.display_order = 9 THEN '날' WHEN l.display_order = 10 THEN '밤' WHEN l.display_order = 11 THEN '여행' ELSE '언어' END
    WHEN c.target_language = 'pt' THEN
      CASE WHEN l.display_order = 1 THEN 'família' WHEN l.display_order = 2 THEN 'amigo' WHEN l.display_order = 3 THEN 'trabalho' WHEN l.display_order = 4 THEN 'escola' WHEN l.display_order = 5 THEN 'casa' WHEN l.display_order = 6 THEN 'comida' WHEN l.display_order = 7 THEN 'água' WHEN l.display_order = 8 THEN 'tempo' WHEN l.display_order = 9 THEN 'dia' WHEN l.display_order = 10 THEN 'noite' WHEN l.display_order = 11 THEN 'viagem' ELSE 'língua' END
    WHEN c.target_language = 'ru' THEN
      CASE WHEN l.display_order = 1 THEN 'семья' WHEN l.display_order = 2 THEN 'друг' WHEN l.display_order = 3 THEN 'работа' WHEN l.display_order = 4 THEN 'школа' WHEN l.display_order = 5 THEN 'дом' WHEN l.display_order = 6 THEN 'еда' WHEN l.display_order = 7 THEN 'вода' WHEN l.display_order = 8 THEN 'время' WHEN l.display_order = 9 THEN 'день' WHEN l.display_order = 10 THEN 'ночь' WHEN l.display_order = 11 THEN 'путешествие' ELSE 'язык' END
  END,
  CASE 
    WHEN l.display_order = 1 THEN 'family'
    WHEN l.display_order = 2 THEN 'friend'
    WHEN l.display_order = 3 THEN 'work'
    WHEN l.display_order = 4 THEN 'school'
    WHEN l.display_order = 5 THEN 'home'
    WHEN l.display_order = 6 THEN 'food'
    WHEN l.display_order = 7 THEN 'water'
    WHEN l.display_order = 8 THEN 'time'
    WHEN l.display_order = 9 THEN 'day'
    WHEN l.display_order = 10 THEN 'night'
    WHEN l.display_order = 11 THEN 'travel'
    ELSE 'language'
  END,
  c.target_language,
  'en'
FROM lessons l
JOIN courses c ON l.course_id = c.id
WHERE c.title IN ('French Basics', 'Hindi Basics', 'Japanese Basics', 'Korean Basics', 'Portuguese Basics', 'Russian Basics');

-- Italian Basics (currently 2.2, need 12 more words)
INSERT IGNORE INTO lesson_vocabulary (lesson_id, term, definition, target_language, source_language) 
SELECT l.id, 
  CASE 
    WHEN l.display_order = 1 THEN 'mattina'
    WHEN l.display_order = 2 THEN 'pomeriggio'
    WHEN l.display_order = 3 THEN 'sera'
    WHEN l.display_order = 4 THEN 'oggi'
    WHEN l.display_order = 5 THEN 'domani'
    WHEN l.display_order = 6 THEN 'ieri'
    WHEN l.display_order = 7 THEN 'settimana'
    WHEN l.display_order = 8 THEN 'mese'
    WHEN l.display_order = 9 THEN 'anno'
    WHEN l.display_order = 10 THEN 'adesso'
    WHEN l.display_order = 11 THEN 'dopo'
    ELSE 'presto'
  END,
  CASE 
    WHEN l.display_order = 1 THEN 'morning'
    WHEN l.display_order = 2 THEN 'afternoon'
    WHEN l.display_order = 3 THEN 'evening'
    WHEN l.display_order = 4 THEN 'today'
    WHEN l.display_order = 5 THEN 'tomorrow'
    WHEN l.display_order = 6 THEN 'yesterday'
    WHEN l.display_order = 7 THEN 'week'
    WHEN l.display_order = 8 THEN 'month'
    WHEN l.display_order = 9 THEN 'year'
    WHEN l.display_order = 10 THEN 'now'
    WHEN l.display_order = 11 THEN 'later'
    ELSE 'soon'
  END,
  'it',
  'en'
FROM lessons l
JOIN courses c ON l.course_id = c.id
WHERE c.title = 'Italian Basics';

-- Terminal Talk (currently 2.2, need 12 more words)
INSERT IGNORE INTO lesson_vocabulary (lesson_id, term, definition, target_language, source_language) 
SELECT l.id, 
  CASE 
    WHEN l.display_order = 1 THEN 'arrival'
    WHEN l.display_order = 2 THEN 'departure'
    WHEN l.display_order = 3 THEN 'platform'
    WHEN l.display_order = 4 THEN 'train'
    WHEN l.display_order = 5 THEN 'bus'
    WHEN l.display_order = 6 THEN 'taxi'
    WHEN l.display_order = 7 THEN 'metro'
    WHEN l.display_order = 8 THEN 'station'
    WHEN l.display_order = 9 THEN 'ticket'
    WHEN l.display_order = 10 THEN 'schedule'
    WHEN l.display_order = 11 THEN 'delay'
    ELSE 'track'
  END,
  CASE 
    WHEN l.display_order = 1 THEN 'varış'
    WHEN l.display_order = 2 THEN 'kalkış'
    WHEN l.display_order = 3 THEN 'peron'
    WHEN l.display_order = 4 THEN 'tren'
    WHEN l.display_order = 5 THEN 'otobüs'
    WHEN l.display_order = 6 THEN 'taksi'
    WHEN l.display_order = 7 THEN 'metro'
    WHEN l.display_order = 8 THEN 'istasyon'
    WHEN l.display_order = 9 THEN 'bilet'
    WHEN l.display_order = 10 THEN 'tarife'
    WHEN l.display_order = 11 THEN 'gecikme'
    ELSE 'hat'
  END,
  'en',
  'tr'
FROM lessons l
JOIN courses c ON l.course_id = c.id
WHERE c.title = 'Terminal Talk';
