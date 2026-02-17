-- Add vocabulary to courses with 2.0-2.2 words per lesson
-- Target: 3 words per lesson for all courses

-- Italian Dining/Hotels/Shopping (currently 2.0, need 1 more per lesson = 12 words each)
INSERT IGNORE INTO lesson_vocabulary (lesson_id, term, definition, target_language) 
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
  CASE 
    WHEN l.display_order = 1 THEN 'Vorrei un tavolo per due.'
    WHEN l.display_order = 2 THEN 'Cameriere, per favore!'
    WHEN l.display_order = 3 THEN 'Il conto, per favore.'
    WHEN l.display_order = 4 THEN 'Il cibo è delizioso!'
    WHEN l.display_order = 5 THEN 'Ho una prenotazione.'
    WHEN l.display_order = 6 THEN 'Posso vedere il menu?'
    WHEN l.display_order = 7 THEN 'Una bevanda, per favore.'
    WHEN l.display_order = 8 THEN 'Che antipasti avete?'
    WHEN l.display_order = 9 THEN 'Vorrei un dolce.'
    WHEN l.display_order = 10 THEN 'Posso pagare con carta?'
    WHEN l.display_order = 11 THEN 'Ecco la mancia.'
    ELSE 'Dov\'è il ristorante?'
  END,
  CASE 
    WHEN l.display_order = 1 THEN 'I would like a table for two.'
    WHEN l.display_order = 2 THEN 'Waiter, please!'
    WHEN l.display_order = 3 THEN 'The bill, please.'
    WHEN l.display_order = 4 THEN 'The food is delicious!'
    WHEN l.display_order = 5 THEN 'I have a reservation.'
    WHEN l.display_order = 6 THEN 'Can I see the menu?'
    WHEN l.display_order = 7 THEN 'A drink, please.'
    WHEN l.display_order = 8 THEN 'What appetizers do you have?'
    WHEN l.display_order = 9 THEN 'I would like a dessert.'
    WHEN l.display_order = 10 THEN 'Can I pay with card?'
    WHEN l.display_order = 11 THEN 'Here is the tip.'
    ELSE 'Where is the restaurant?'
  END
FROM lessons l
JOIN courses c ON l.course_id = c.id
WHERE c.title IN ('Italian Dining', 'Italian Hotels', 'Italian Shopping');

-- Place an order, test test (currently 2.0)
INSERT IGNORE INTO lesson_vocabulary (lesson_id, word, translation, example_sentence, example_translation) 
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
  CASE 
    WHEN l.display_order = 1 THEN 'I would like to place an order.'
    WHEN l.display_order = 2 THEN 'When is the delivery?'
    WHEN l.display_order = 3 THEN 'Can I have a receipt?'
    WHEN l.display_order = 4 THEN 'Payment by card.'
    WHEN l.display_order = 5 THEN 'What is your address?'
    WHEN l.display_order = 6 THEN 'Your phone number, please.'
    WHEN l.display_order = 7 THEN 'Please confirm your order.'
    WHEN l.display_order = 8 THEN 'I need to cancel.'
    WHEN l.display_order = 9 THEN 'Can I get a refund?'
    WHEN l.display_order = 10 THEN 'Customer service.'
    WHEN l.display_order = 11 THEN 'Excellent service!'
    ELSE 'The product is good.'
  END,
  CASE 
    WHEN l.display_order = 1 THEN 'Sipariş vermek istiyorum.'
    WHEN l.display_order = 2 THEN 'Teslimat ne zaman?'
    WHEN l.display_order = 3 THEN 'Fiş alabilir miyim?'
    WHEN l.display_order = 4 THEN 'Kartla ödeme.'
    WHEN l.display_order = 5 THEN 'Adresiniz nedir?'
    WHEN l.display_order = 6 THEN 'Telefon numaranız lütfen.'
    WHEN l.display_order = 7 THEN 'Lütfen siparişinizi onaylayın.'
    WHEN l.display_order = 8 THEN 'İptal etmem gerek.'
    WHEN l.display_order = 9 THEN 'İade alabilir miyim?'
    WHEN l.display_order = 10 THEN 'Müşteri hizmetleri.'
    WHEN l.display_order = 11 THEN 'Mükemmel servis!'
    ELSE 'Ürün iyi.'
  END
FROM lessons l
JOIN courses c ON l.course_id = c.id
WHERE c.title IN ('Place an order', 'test test');

-- Airport German, Airport Italian (currently 2.1)
INSERT IGNORE INTO lesson_vocabulary (lesson_id, word, translation, example_sentence, example_translation) 
SELECT l.id, 
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
    WHEN l.display_order = 1 THEN 'Where is gate 5?'
    WHEN l.display_order = 2 THEN 'Boarding starts at 3pm.'
    WHEN l.display_order = 3 THEN 'Here is my passport.'
    WHEN l.display_order = 4 THEN 'Where is baggage claim?'
    WHEN l.display_order = 5 THEN 'Security checkpoint ahead.'
    WHEN l.display_order = 6 THEN 'My flight number is 123.'
    WHEN l.display_order = 7 THEN 'There is a delay.'
    WHEN l.display_order = 8 THEN 'Which terminal?'
    WHEN l.display_order = 9 THEN 'Go through customs.'
    WHEN l.display_order = 10 THEN 'Arrival time is 5pm.'
    WHEN l.display_order = 11 THEN 'Departure at 10am.'
    ELSE 'I need a ticket.'
  END,
  CASE 
    WHEN c.target_language = 'de' THEN
      CASE 
        WHEN l.display_order = 1 THEN 'Wo ist Tor 5?'
        WHEN l.display_order = 2 THEN 'Das Einsteigen beginnt um 15 Uhr.'
        WHEN l.display_order = 3 THEN 'Hier ist mein Reisepass.'
        WHEN l.display_order = 4 THEN 'Wo ist die Gepäckausgabe?'
        WHEN l.display_order = 5 THEN 'Sicherheitskontrolle voraus.'
        WHEN l.display_order = 6 THEN 'Meine Flugnummer ist 123.'
        WHEN l.display_order = 7 THEN 'Es gibt eine Verspätung.'
        WHEN l.display_order = 8 THEN 'Welches Terminal?'
        WHEN l.display_order = 9 THEN 'Durch den Zoll gehen.'
        WHEN l.display_order = 10 THEN 'Ankunftszeit ist 17 Uhr.'
        WHEN l.display_order = 11 THEN 'Abflug um 10 Uhr.'
        ELSE 'Ich brauche ein Ticket.'
      END
    ELSE -- Italian
      CASE 
        WHEN l.display_order = 1 THEN 'Dov\'è il cancello 5?'
        WHEN l.display_order = 2 THEN 'L\'imbarco inizia alle 15.'
        WHEN l.display_order = 3 THEN 'Ecco il mio passaporto.'
        WHEN l.display_order = 4 THEN 'Dov\'è il ritiro bagagli?'
        WHEN l.display_order = 5 THEN 'Controllo sicurezza avanti.'
        WHEN l.display_order = 6 THEN 'Il mio numero di volo è 123.'
        WHEN l.display_order = 7 THEN 'C\'è un ritardo.'
        WHEN l.display_order = 8 THEN 'Quale terminale?'
        WHEN l.display_order = 9 THEN 'Passare la dogana.'
        WHEN l.display_order = 10 THEN 'L\'arrivo è alle 17.'
        WHEN l.display_order = 11 THEN 'Partenza alle 10.'
        ELSE 'Ho bisogno di un biglietto.'
      END
  END
FROM lessons l
JOIN courses c ON l.course_id = c.id
WHERE c.title IN ('Airport German', 'Airport Italian');

-- French/Hindi/Japanese/Korean/Portuguese/Russian Basics (currently 2.1)
INSERT IGNORE INTO lesson_vocabulary (lesson_id, word, translation, example_sentence, example_translation) 
SELECT l.id, 
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
  'This is my family.',
  CASE 
    WHEN c.target_language = 'fr' THEN 'C\'est ma famille.'
    WHEN c.target_language = 'hi' THEN 'यह मेरा परिवार है।'
    WHEN c.target_language = 'ja' THEN 'これは私の家族です。'
    WHEN c.target_language = 'ko' THEN '이것은 내 가족입니다.'
    WHEN c.target_language = 'pt' THEN 'Esta é minha família.'
    WHEN c.target_language = 'ru' THEN 'Это моя семья.'
  END
FROM lessons l
JOIN courses c ON l.course_id = c.id
WHERE c.title IN ('French Basics', 'Hindi Basics', 'Japanese Basics', 'Korean Basics', 'Portuguese Basics', 'Russian Basics');

-- Italian Basics, Terminal Talk (currently 2.2)
INSERT IGNORE INTO lesson_vocabulary (lesson_id, word, translation, example_sentence, example_translation) 
SELECT l.id, 
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
  CASE 
    WHEN c.target_language = 'it' THEN
      CASE WHEN l.display_order = 1 THEN 'mattina' WHEN l.display_order = 2 THEN 'pomeriggio' WHEN l.display_order = 3 THEN 'sera' WHEN l.display_order = 4 THEN 'oggi' WHEN l.display_order = 5 THEN 'domani' WHEN l.display_order = 6 THEN 'ieri' WHEN l.display_order = 7 THEN 'settimana' WHEN l.display_order = 8 THEN 'mese' WHEN l.display_order = 9 THEN 'anno' WHEN l.display_order = 10 THEN 'adesso' WHEN l.display_order = 11 THEN 'dopo' ELSE 'presto' END
    ELSE -- Terminal Talk EN
      CASE WHEN l.display_order = 1 THEN 'arrival' WHEN l.display_order = 2 THEN 'departure' WHEN l.display_order = 3 THEN 'platform' WHEN l.display_order = 4 THEN 'train' WHEN l.display_order = 5 THEN 'bus' WHEN l.display_order = 6 THEN 'taxi' WHEN l.display_order = 7 THEN 'metro' WHEN l.display_order = 8 THEN 'station' WHEN l.display_order = 9 THEN 'ticket' WHEN l.display_order = 10 THEN 'schedule' WHEN l.display_order = 11 THEN 'delay' ELSE 'track' END
  END,
  'Good morning!',
  CASE 
    WHEN c.target_language = 'it' THEN 'Buongiorno!'
    ELSE 'The train arrives at 10am.'
  END
FROM lessons l
JOIN courses c ON l.course_id = c.id
WHERE c.title IN ('Italian Basics', 'Terminal Talk');
