const { query } = require('./config/database');

const lessonData = [
    // --- COURSE 1: GENERAL ---
    {
        lesson_id: 'lesson-001-01', title: 'Greetings', focus_word: 'greet', main_sentence: 'It is polite to greet people when you enter a room.',
        vocabulary: [
            { term: 'greet', definition: 'To give a polite word of welcome, or to react to something.', meaning_1: 'To welcome / Say hello', example_sentence_1: 'She greeted him with a warm smile.', meaning_2: 'To react / Receive', example_sentence_2: 'His proposal was greeted with cheers from the crowd.' },
            { term: 'introduce', definition: 'To make someone known by name, or to bring something into use.', meaning_1: 'To present someone', example_sentence_1: 'Let me introduce you to my manager, Sarah.', meaning_2: 'To launch / Bring into use', example_sentence_2: 'The company plans to introduce a new phone next month.' }
        ]
    },
    {
        lesson_id: 'lesson-001-02', title: 'Making Small Talk', focus_word: 'chat', main_sentence: 'We had a quick chat about the weather before the meeting.',
        vocabulary: [
            { term: 'chat', definition: 'To talk in a friendly, informal way, or to exchange messages online.', meaning_1: 'To talk informally', example_sentence_1: 'I was chatting with my neighbor over a cup of coffee.', meaning_2: 'To message online', example_sentence_2: 'I will send you the link in the group chat.' },
            { term: 'weather', definition: 'The state of the atmosphere, or to safely get through a difficult situation.', meaning_1: 'Atmospheric conditions', example_sentence_1: 'The weather is surprisingly warm for December.', meaning_2: 'To survive a crisis', example_sentence_2: 'The business managed to weather the economic crisis.' }
        ]
    },
    {
        lesson_id: 'lesson-001-03', title: 'Making Plans', focus_word: 'arrange', main_sentence: 'I will arrange a meeting for next Tuesday.',
        vocabulary: [
            { term: 'arrange', definition: 'To put things in a neat order, or to plan an event.', meaning_1: 'To organize / Plan', example_sentence_1: 'Can you arrange a taxi for me to the airport?', meaning_2: 'To put in order', example_sentence_2: 'She arranged the flowers beautifully in the vase.' },
            { term: 'plan', definition: 'A detailed proposal for doing something, or a detailed diagram.', meaning_1: 'A proposal / Intention', example_sentence_1: 'We plan to travel to Japan next summer.', meaning_2: 'An architectural drawing', example_sentence_2: 'The architect showed us the floor plan of the new house.' }
        ]
    },
    {
        lesson_id: 'lesson-001-04', title: 'Asking for Help', focus_word: 'assist', main_sentence: 'Could you please assist me with these heavy bags?',
        vocabulary: [
            { term: 'assist', definition: 'To help someone, or an action that helps a teammate score in sports.', meaning_1: 'To help / Support', example_sentence_1: 'The staff will assist you with the check-in process.', meaning_2: 'A helpful pass (Sports)', example_sentence_2: 'He scored 20 points and had 5 assists in the game.' },
            { term: 'favor', definition: 'An act of kindness, or to prefer someone over others.', meaning_1: 'An act of kindness', example_sentence_1: 'Could you do me a favor and hold the door?', meaning_2: 'To prefer / Show bias', example_sentence_2: 'The teacher does not favor any student over another.' }
        ]
    },
    {
        lesson_id: 'lesson-001-05', title: 'Sharing Opinions', focus_word: 'reckon', main_sentence: 'I reckon this is the best restaurant in town.',
        vocabulary: [
            { term: 'reckon', definition: 'To believe or consider, or to calculate a number.', meaning_1: 'To think / Believe', example_sentence_1: 'I reckon it is going to rain this afternoon.', meaning_2: 'To calculate', example_sentence_2: 'You have to reckon the travel costs into your budget.' },
            { term: 'view', definition: 'An opinion about something, or things that can be seen from a place.', meaning_1: 'An opinion / Perspective', example_sentence_1: 'What is your view on the new company policy?', meaning_2: 'Scenery / Sight', example_sentence_2: 'Our hotel room has a beautiful view of the ocean.' }
        ]
    },
    {
        lesson_id: 'lesson-001-06', title: 'Being Polite', focus_word: 'wonder', main_sentence: 'I was wondering if you could help me with this.',
        vocabulary: [
            { term: 'wonder', definition: 'To desire to know something, or a feeling of amazement.', meaning_1: 'To be curious', example_sentence_1: 'I wonder what time the train will arrive.', meaning_2: 'A marvel / Miracle', example_sentence_2: 'The Great Wall of China is a wonder of the world.' },
            { term: 'matter', definition: 'To be important, or a subject under consideration.', meaning_1: 'To be important', example_sentence_1: 'It does not matter if we are a little late.', meaning_2: 'A subject / Issue', example_sentence_2: 'We need to discuss an important matter at work.' }
        ]
    },
    {
        lesson_id: 'lesson-001-07', title: 'Clear Skies', focus_word: 'clear', main_sentence: 'The sky is clear today, with no signs of rain.',
        vocabulary: [
            { term: 'clear', definition: 'Easy to perceive or understand, or free of clouds.', meaning_1: 'Easy to understand', example_sentence_1: 'The instructions on the box are very clear.', meaning_2: 'Unclouded / Open', example_sentence_2: 'It is a beautiful day with a clear blue sky.' },
            { term: 'drop', definition: 'To fall or decrease in amount, or a small round amount of liquid.', meaning_1: 'To fall / Decrease', example_sentence_1: 'The temperature will drop below zero tonight.', meaning_2: 'A small amount of liquid', example_sentence_2: 'I felt a drop of rain on my head.' }
        ]
    },
    {
        lesson_id: 'lesson-001-08', title: 'Passing Time', focus_word: 'pass', main_sentence: 'Time seems to pass quickly when you are busy.',
        vocabulary: [
            { term: 'pass', definition: 'To move past something, or to be successful in an exam.', meaning_1: 'To go by (Time/Place)', example_sentence_1: 'Three hours passed before he finally called.', meaning_2: 'To succeed (Exam)', example_sentence_2: 'She studied hard to pass her driving test.' },
            { term: 'present', definition: 'Occurring right now, or a gift given to someone.', meaning_1: 'Current / Now', example_sentence_1: 'At the present time, we have no available rooms.', meaning_2: 'A gift', example_sentence_2: 'I bought a nice present for my sister’s birthday.' }
        ]
    },
    {
        lesson_id: 'lesson-001-09', title: 'Estimating Numbers', focus_word: 'figure', main_sentence: 'Can you give me a rough figure of the total cost?',
        vocabulary: [
            { term: 'figure', definition: 'A number representing an amount, or a person\'s bodily shape.', meaning_1: 'A number / Statistic', example_sentence_1: 'The unemployment figure has increased this year.', meaning_2: 'Body shape / Form', example_sentence_2: 'She exercises regularly to keep her figure.' },
            { term: 'even', definition: 'A number divisible by two, or used to emphasize something surprising.', meaning_1: 'Divisible by two (Math)', example_sentence_1: 'Two, four, and six are even numbers.', meaning_2: 'Surprisingly / Despite', example_sentence_2: 'It is so cold that even the lake is frozen.' }
        ]
    },
    {
        lesson_id: 'lesson-001-10', title: 'Taking Leave', focus_word: 'leave', main_sentence: 'I must leave now, or I will miss my train.',
        vocabulary: [
            { term: 'leave', definition: 'To go away from a place, or to allow something to remain.', meaning_1: 'To depart / Go away', example_sentence_1: 'What time does your flight leave?', meaning_2: 'To leave behind / Forget', example_sentence_2: 'Please do not leave your bags unattended.' },
            { term: 'part', definition: 'To leave someone\'s company, or a piece of a whole.', meaning_1: 'To separate / Say goodbye', example_sentence_1: 'It was hard to part from my friends at the airport.', meaning_2: 'A piece of a whole', example_sentence_2: 'This engine is an important part of the car.' }
        ]
    },
    {
        lesson_id: 'lesson-001-11', title: 'Making a Call', focus_word: 'ring', main_sentence: 'Give me a ring when you arrive at the hotel.',
        vocabulary: [
            { term: 'ring', definition: 'To make a phone call, or a circular band worn as jewelry.', meaning_1: 'To call / Make a sound', example_sentence_1: 'I will ring you as soon as I get home.', meaning_2: 'A piece of jewelry', example_sentence_2: 'She wears a beautiful gold ring on her finger.' },
            { term: 'line', definition: 'A telephone connection, or a row of people waiting.', meaning_1: 'A telephone connection', example_sentence_1: 'The line is busy, I will try calling later.', meaning_2: 'A queue / Row', example_sentence_2: 'We had to wait in a long line for the tickets.' }
        ]
    },
    {
        lesson_id: 'lesson-001-12', title: 'Expressing Gratitude', focus_word: 'appreciate', main_sentence: 'I really appreciate all the help you have given me.',
        vocabulary: [
            { term: 'appreciate', definition: 'To be grateful for something, or to increase in value.', meaning_1: 'To be thankful', example_sentence_1: 'I appreciate your time and effort on this project.', meaning_2: 'To increase in value', example_sentence_2: 'Houses in this area always appreciate in value.' },
            { term: 'state', definition: 'To express something clearly, or the current condition of something.', meaning_1: 'To express / Declare', example_sentence_1: 'Please state your name and address clearly.', meaning_2: 'Condition / Situation', example_sentence_2: 'The building is in a terrible state of repair.' }
        ]
    },

    // --- COURSE 2: TERMINAL TALK ---
    {
        lesson_id: 'lesson-002-01', title: 'Checking In', focus_word: 'check in', main_sentence: 'I would like to check in for my flight to London.',
        vocabulary: [
            { term: 'check in', definition: 'To register your arrival at an airport or hotel, or to contact someone to see if they are okay.', meaning_1: 'To register arrival', example_sentence_1: 'We need to check in at least two hours before our flight departs.', meaning_2: 'To monitor / Consult', example_sentence_2: 'My manager likes to check in with me every morning to see my progress.' },
            { term: 'board', definition: 'To get on a ship, aircraft, or bus, or a flat piece of wood or other hard material.', meaning_1: 'To get on a vehicle', example_sentence_1: 'Passengers are waiting to board the plane at gate seven.', meaning_2: 'A flat surface / Committee', example_sentence_2: 'The teacher wrote the new vocabulary words on the white board.' }
        ]
    },
    {
        lesson_id: 'lesson-002-02', title: 'Security Check', focus_word: 'screen', main_sentence: 'All bags must go through the security screen.',
        vocabulary: [
            { term: 'screen', definition: 'To check people or luggage for security, or a digital display.', meaning_1: 'To check for security', example_sentence_1: 'They will screen your luggage before you board.', meaning_2: 'A digital display', example_sentence_2: 'Check the flight status on the departure screen.' },
            { term: 'pack', definition: 'To put things into a suitcase, or a group of similar things.', meaning_1: 'To fill a suitcase', example_sentence_1: 'I need to pack my suitcase for the holiday.', meaning_2: 'A group / Bundle', example_sentence_2: 'He bought a pack of gum from the duty-free shop.' }
        ]
    },
    {
        lesson_id: 'lesson-002-03', title: 'Boarding Pass', focus_word: 'issue', main_sentence: 'The agent will issue your boarding pass at the desk.',
        vocabulary: [
            { term: 'issue', definition: 'To officially give a document, or an important topic/problem.', meaning_1: 'To officially supply', example_sentence_1: 'The airline will issue a refund for the canceled flight.', meaning_2: 'A problem / Topic', example_sentence_2: 'We had a minor issue with our hotel reservation.' },
            { term: 'pass', definition: 'An official document granting access, or to move past something.', meaning_1: 'A ticket / Permit', example_sentence_1: 'Please have your boarding pass ready at the gate.', meaning_2: 'To move past', example_sentence_2: 'We watched the planes pass over the terminal.' }
        ]
    },
    {
        lesson_id: 'lesson-002-04', title: 'Baggage Claim', focus_word: 'claim', main_sentence: 'You can pick up your luggage at the baggage claim.',
        vocabulary: [
            { term: 'claim', definition: 'To request or collect your luggage, or to state that something is true.', meaning_1: 'To collect / Request', example_sentence_1: 'Follow the signs to the baggage claim area.', meaning_2: 'To state / Assert', example_sentence_2: 'He claims that he lost his passport in the taxi.' },
            { term: 'belt', definition: 'A moving band that transports luggage, or a strap worn around the waist.', meaning_1: 'A conveyor belt', example_sentence_1: 'Your suitcase should arrive on belt number 4.', meaning_2: 'A waist strap', example_sentence_2: 'You must remove your belt during the security check.' }
        ]
    },
    {
        lesson_id: 'lesson-002-05', title: 'Customs Declaration', focus_word: 'declare', main_sentence: 'Do you have anything to declare to customs?',
        vocabulary: [
            { term: 'declare', definition: 'To officially tell customs about goods, or to announce something publicly.', meaning_1: 'To state to customs', example_sentence_1: 'You must declare any food items you are bringing in.', meaning_2: 'To announce formally', example_sentence_2: 'The pilot declared an emergency due to bad weather.' },
            { term: 'custom', definition: 'The place at an airport where luggage is checked, or a traditional way of behaving.', meaning_1: 'Airport checkpoint', example_sentence_1: 'It took us an hour to get through customs.', meaning_2: 'A tradition / Habit', example_sentence_2: 'Tipping the waiter is a common custom here.' }
        ]
    },
    {
        lesson_id: 'lesson-002-06', title: 'Flight Status', focus_word: 'status', main_sentence: 'Please check the screens for your flight status.',
        vocabulary: [
            { term: 'status', definition: 'The current situation of something, or a person\'s social standing.', meaning_1: 'Current state', example_sentence_1: 'The flight status is delayed by two hours.', meaning_2: 'Social position / Rank', example_sentence_2: 'Doctors usually have a high social status.' },
            { term: 'depart', definition: 'To leave a place, especially to start a journey, or to deviate from a topic.', meaning_1: 'To leave / Set off', example_sentence_1: 'The train will depart from platform number 3.', meaning_2: 'To deviate / Stray', example_sentence_2: 'Let us not depart from the main topic of this meeting.' }
        ]
    },
    {
        lesson_id: 'lesson-002-07', title: 'Boarding Gate', focus_word: 'gate', main_sentence: 'Proceed to gate 14 for boarding immediately.',
        vocabulary: [
            { term: 'gate', definition: 'A boarding area at an airport, or an outdoor door.', meaning_1: 'Airport boarding area', example_sentence_1: 'Our flight to Tokyo leaves from gate 4.', meaning_2: 'Outdoor entrance / Door', example_sentence_2: 'Please make sure to close the front gate when you leave.' },
            { term: 'final', definition: 'The last in a series, or an end-of-term examination.', meaning_1: 'Last / Ultimate', example_sentence_1: 'This is the final boarding call for flight 102.', meaning_2: 'End-of-term exam', example_sentence_2: 'She is studying very hard for her university finals.' }
        ]
    },
    {
        lesson_id: 'lesson-002-08', title: 'Missing a Flight', focus_word: 'miss', main_sentence: 'I am worried that I will miss my connecting flight.',
        vocabulary: [
            { term: 'miss', definition: 'To fail to catch a vehicle, or to feel sad about someone\'s absence.', meaning_1: 'To fail to catch', example_sentence_1: 'Hurry up, or we will miss the bus to the city center.', meaning_2: 'To feel the absence of', example_sentence_2: 'I will really miss you when you move to Canada.' },
            { term: 'locate', definition: 'To discover the exact place of something, or to set up a business or residence.', meaning_1: 'To find / Discover', example_sentence_1: 'I cannot locate my passport in my bag.', meaning_2: 'To settle / Establish', example_sentence_2: 'The new hotel is located right next to the beach.' }
        ]
    },
    {
        lesson_id: 'lesson-002-09', title: 'Getting Directions', focus_word: 'direct', main_sentence: 'Could you direct me to the nearest restroom?',
        vocabulary: [
            { term: 'direct', definition: 'To give directions to someone, or a flight without any stops.', meaning_1: 'To guide / Show the way', example_sentence_1: 'Can you direct me to the central train station?', meaning_2: 'Non-stop / Straight', example_sentence_2: 'We booked a direct flight to Paris to save time.' },
            { term: 'facility', definition: 'A building or service provided for a particular purpose, or a natural ability.', meaning_1: 'Amenities / Building', example_sentence_1: 'The airport has excellent medical and dining facilities.', meaning_2: 'Ability / Talent', example_sentence_2: 'She has a great facility for learning foreign languages.' }
        ]
    },
    {
        lesson_id: 'lesson-002-10', title: 'Flight Delays', focus_word: 'due', main_sentence: 'We apologize for the delay due to bad weather conditions.',
        vocabulary: [
            { term: 'due', definition: 'Caused by a specific reason, or expected at a certain time.', meaning_1: 'Caused by (due to)', example_sentence_1: 'The flight was canceled due to heavy snow.', meaning_2: 'Expected / Deadline', example_sentence_2: 'The project assignment is due next Friday.' },
            { term: 'delay', definition: 'A period of time by which something is late, or to postpone something.', meaning_1: 'Lateness / Wait', example_sentence_1: 'There is a two-hour delay on our flight to Rome.', meaning_2: 'To postpone / Put off', example_sentence_2: 'They had to delay the meeting because the boss was late.' }
        ]
    },
    {
        lesson_id: 'lesson-002-11', title: 'Lounge Access', focus_word: 'access', main_sentence: 'Do I have access to the business class lounge with this ticket?',
        vocabulary: [
            { term: 'access', definition: 'The right or opportunity to use something, or to reach data or places.', meaning_1: 'Right of entry', example_sentence_1: 'You need a special security card to access this area.', meaning_2: 'To reach / Connect', example_sentence_2: 'Guests have free internet access in their hotel rooms.' },
            { term: 'lounge', definition: 'A public waiting room, or to lie or sit in a relaxed way.', meaning_1: 'Waiting room', example_sentence_1: 'We waited for three hours in the VIP departure lounge.', meaning_2: 'To relax / Lie down', example_sentence_2: 'He spent the whole Sunday afternoon lounging on the sofa.' }
        ]
    },
    {
        lesson_id: 'lesson-002-12', title: 'Connecting Flights', focus_word: 'connect', main_sentence: 'I have a two-hour layover to connect to my next flight.',
        vocabulary: [
            { term: 'connect', definition: 'To join two flights, or to link devices together.', meaning_1: 'To transit (Flights)', example_sentence_1: 'My flight connects in Dubai before heading to Asia.', meaning_2: 'To link / Join', example_sentence_2: 'You need an HDMI cable to connect the laptop to the TV.' },
            { term: 'transfer', definition: 'To move from one vehicle to another, or to move money or files.', meaning_1: 'To change vehicles', example_sentence_1: 'We need to transfer to a different terminal for the bus.', meaning_2: 'To move money or data', example_sentence_2: 'I will transfer the money to your bank account tomorrow.' }
        ]
    },

    // --- COURSE 3: FOOD & DRINK ---
    {
        lesson_id: 'lesson-003-01', title: 'Booking a Table', focus_word: 'book', main_sentence: 'I would like to book a table for two at 8 PM, please.',
        vocabulary: [
            { term: 'book', definition: 'To reserve a table or room, or a set of printed pages to read.', meaning_1: 'To reserve', example_sentence_1: 'Did you book a table for our anniversary dinner tonight?', meaning_2: 'Written work to read', example_sentence_2: 'I am reading a very interesting book about history.' },
            { term: 'party', definition: 'A group of people at a restaurant, or a social gathering.', meaning_1: 'A group of people', example_sentence_1: 'We have a reservation under the name Smith for a party of four.', meaning_2: 'A social celebration', example_sentence_2: 'Are you going to John’s birthday party this weekend?' }
        ]
    },
    {
        lesson_id: 'lesson-003-02', title: 'Meal Courses', focus_word: 'course', main_sentence: 'We will start with the soup as our first course.',
        vocabulary: [
            { term: 'course', definition: 'A part of a meal, or a series of educational lessons.', meaning_1: 'Part of a meal', example_sentence_1: 'The main course was a beautifully cooked piece of salmon.', meaning_2: 'Educational class', example_sentence_2: 'I am taking an intensive Spanish language course.' },
            { term: 'serve', definition: 'To provide food or drinks, or to hit the ball in sports.', meaning_1: 'To provide food', example_sentence_1: 'This restaurant stops serving breakfast at 10 AM.', meaning_2: 'To hit the ball (Sports)', example_sentence_2: 'It is your turn to serve the ball in this tennis match.' }
        ]
    },
    {
        lesson_id: 'lesson-003-03', title: 'Placing an Order', focus_word: 'order', main_sentence: 'Are you ready to order, or do you need a few more minutes?',
        vocabulary: [
            { term: 'order', definition: 'To request food from a waiter, or to arrange things in a specific sequence.', meaning_1: 'To request food', example_sentence_1: 'I would like to order the grilled chicken and a salad.', meaning_2: 'Sequence / Arrangement', example_sentence_2: 'Please put these files in alphabetical order.' },
            { term: 'rare', definition: 'Meat cooked for a very short time, or an event that does not happen often.', meaning_1: 'Lightly cooked (Meat)', example_sentence_1: 'I like my steak rare, with just a little salt.', meaning_2: 'Uncommon / Scarce', example_sentence_2: 'It is very rare to see snow in this part of the city.' }
        ]
    },
    {
        lesson_id: 'lesson-003-04', title: 'Food Allergies', focus_word: 'contain', main_sentence: 'Could you tell me if this dish contains any peanuts?',
        vocabulary: [
            { term: 'contain', definition: 'To have something inside, or to keep a problem under control.', meaning_1: 'To include / Hold', example_sentence_1: 'This energy drink contains a high amount of sugar.', meaning_2: 'To control / Limit', example_sentence_2: 'Firefighters managed to contain the fire before it spread.' },
            { term: 'allergic', definition: 'Having a medical reaction to a substance, or having a strong dislike.', meaning_1: 'Having a physical reaction', example_sentence_1: 'I am allergic to nuts and seafood, so I must be careful.', meaning_2: 'Having a strong dislike', example_sentence_2: 'My boss is completely allergic to bad excuses.' }
        ]
    },
    {
        lesson_id: 'lesson-003-05', title: 'Ordering Water', focus_word: 'tap', main_sentence: 'Can we just get a pitcher of tap water for the table, please?',
        vocabulary: [
            { term: 'tap', definition: 'A valve controlling liquid flow, or to hit something lightly.', meaning_1: 'A water valve / Faucet', example_sentence_1: 'Is it safe to drink the tap water in this city?', meaning_2: 'To knock lightly', example_sentence_2: 'Someone tapped me on the shoulder, but nobody was there.' },
            { term: 'spill', definition: 'To accidentally pour a liquid, or to reveal a secret.', meaning_1: 'To drop liquid', example_sentence_1: 'Be careful not to spill your hot coffee on the laptop.', meaning_2: 'To reveal a secret (Idiom)', example_sentence_2: 'Come on, spill the beans! Tell me the secret.' }
        ]
    },
    {
        lesson_id: 'lesson-003-06', title: 'Asking for Recommendations', focus_word: 'recommend', main_sentence: 'What dish would you recommend for someone who likes spicy food?',
        vocabulary: [
            { term: 'recommend', definition: 'To suggest that something is good, or to advise a course of action.', meaning_1: 'To suggest (Food/Place)', example_sentence_1: 'The waiter recommended the grilled salmon.', meaning_2: 'To advise / Counsel', example_sentence_2: 'I highly recommend that you see a doctor about this.' },
            { term: 'dish', definition: 'Food prepared in a particular way, or a shallow container for food.', meaning_1: 'A specific meal / Portion', example_sentence_1: 'This Italian dish is made with fresh tomatoes and basil.', meaning_2: 'A plate to wash', example_sentence_2: 'Please wash the dishes after you finish eating.' }
        ]
    },
    {
        lesson_id: 'lesson-003-07', title: 'Describing Food', focus_word: 'taste', main_sentence: 'Excuse me, but this soup tastes a little cold.',
        vocabulary: [
            { term: 'taste', definition: 'The flavor of food, or a person\'s preference in art or fashion.', meaning_1: 'Flavor / To sample food', example_sentence_1: 'This cake tastes like it has too much sugar in it.', meaning_2: 'Preference / Style', example_sentence_2: 'She has excellent taste in clothes and music.' },
            { term: 'tough', definition: 'Meat that is difficult to chew, or a difficult situation to overcome.', meaning_1: 'Hard to chew (Meat)', example_sentence_1: 'The steak was so tough that I could not chew it.', meaning_2: 'Difficult / Hard', example_sentence_2: 'It has been a tough year for our business.' }
        ]
    },
    {
        lesson_id: 'lesson-003-08', title: 'Asking for the Bill', focus_word: 'bill', main_sentence: 'Could we get the bill, please?',
        vocabulary: [
            { term: 'bill', definition: 'A printed statement of money owed, or a piece of paper money.', meaning_1: 'An invoice / Check', example_sentence_1: 'I will pay the electricity bill tomorrow morning.', meaning_2: 'A banknote', example_sentence_2: 'He left a ten-dollar bill on the table as a tip.' },
            { term: 'split', definition: 'To divide the cost of something, or to break into two pieces.', meaning_1: 'To divide the cost', example_sentence_1: 'Should we split the bill, or is it on you?', meaning_2: 'To tear or break apart', example_sentence_2: 'My pants split when I tried to bend over.' }
        ]
    },
    {
        lesson_id: 'lesson-003-09', title: 'Leaving a Tip', focus_word: 'tip', main_sentence: 'It is customary to leave a 15% tip for good service.',
        vocabulary: [
            { term: 'tip', definition: 'A small amount of money given for a service, or a piece of advice.', meaning_1: 'Gratuity for service', example_sentence_1: 'The service was excellent, so I left a generous tip.', meaning_2: 'Helpful advice', example_sentence_2: 'Can you give me some tips on how to pass the exam?' },
            { term: 'change', definition: 'Coins returned after paying, or to make something different.', meaning_1: 'Coins returned', example_sentence_1: 'Keep the change, you provided great service today.', meaning_2: 'To alter or modify', example_sentence_2: 'We need to change our marketing strategy.' }
        ]
    },
    {
        lesson_id: 'lesson-003-10', title: 'Takeaway Orders', focus_word: 'go', main_sentence: 'I will have a double cheeseburger combo to go, please.',
        vocabulary: [
            { term: 'go', definition: 'To take food out of a restaurant, or for a machine to function.', meaning_1: 'Takeaway food (to go)', example_sentence_1: 'Would you like your coffee here or to go?', meaning_2: 'To function (Machine)', example_sentence_2: 'I cannot get my car to go this morning.' },
            { term: 'regular', definition: 'A standard size of an order, or a frequent customer.', meaning_1: 'Standard size / Normal', example_sentence_1: 'I will just have a regular fries, not the large one.', meaning_2: 'A frequent customer', example_sentence_2: 'The bartender knows all the regular customers by name.' }
        ]
    },
    {
        lesson_id: 'lesson-003-11', title: 'Customizing Drinks', focus_word: 'light', main_sentence: 'I would like my coffee light, with just a little milk.',
        vocabulary: [
            { term: 'light', definition: 'Having less milk, sugar, or calories, or the brightness from the sun/lamps.', meaning_1: 'Weak / Less heavy', example_sentence_1: 'She prefers a light salad for lunch instead of a heavy meal.', meaning_2: 'Illumination', example_sentence_2: 'Could you turn on the light? It is getting dark.' },
            { term: 'shot', definition: 'A small measure of espresso or alcohol, or an attempt to do something.', meaning_1: 'Dose of espresso/liquor', example_sentence_1: 'Can I get an extra shot of espresso in my latte?', meaning_2: 'An attempt / Try', example_sentence_2: 'I have never played golf, but I will give it a shot.' }
        ]
    },
    {
        lesson_id: 'lesson-003-12', title: 'Buying a Round', focus_word: 'round', main_sentence: 'Let me buy the next round of drinks for everyone.',
        vocabulary: [
            { term: 'round', definition: 'A set of drinks for everyone in a group, or shaped like a circle.', meaning_1: 'A set of drinks', example_sentence_1: 'Are you ready for another round of beers?', meaning_2: 'Circular shape', example_sentence_2: 'We sat at a large round table in the restaurant.' },
            { term: 'draft', definition: 'Beer served from a barrel, or a preliminary version of a text.', meaning_1: 'From a barrel (Beer)', example_sentence_1: 'Do you have any local craft beers on draft?', meaning_2: 'A preliminary document', example_sentence_2: 'I finished the first draft of my essay yesterday.' }
        ]
    },

    // --- COURSE 4: ACCOMMODATION ---
    {
        lesson_id: 'lesson-004-01', title: 'Hotel Reservation', focus_word: 'reservation', main_sentence: 'Hello, I have a reservation under the name John Smith.',
        vocabulary: [
            { term: 'reservation', definition: 'An arrangement to secure a room or table, or a feeling of doubt.', meaning_1: 'A booking', example_sentence_1: 'I made a reservation online for three nights.', meaning_2: 'Doubt / Hesitation', example_sentence_2: 'I have some serious reservations about this new plan.' },
            { term: 'stay', definition: 'A period of living in a place, or to remain in the same position.', meaning_1: 'Period of lodging', example_sentence_1: 'We hope you enjoy your stay at our hotel.', meaning_2: 'To remain / Stop', example_sentence_2: 'I told my dog to stay in the garden.' }
        ]
    },
    {
        lesson_id: 'lesson-004-02', title: 'Room Upgrade', focus_word: 'suite', main_sentence: 'We would like to upgrade our standard room to a suite.',
        vocabulary: [
            { term: 'suite', definition: 'A set of connected hotel rooms, or a set of related software/furniture.', meaning_1: 'Connected hotel rooms', example_sentence_1: 'The presidential suite is on the top floor.', meaning_2: 'A set of software', example_sentence_2: 'I installed the new Microsoft Office suite on my computer.' },
            { term: 'view', definition: 'The things that can be seen from a window, or an opinion.', meaning_1: 'Scenery', example_sentence_1: 'I requested a room with a sea view.', meaning_2: 'An opinion / Perspective', example_sentence_2: 'From my point of view, this project is a failure.' }
        ]
    },
    {
        lesson_id: 'lesson-004-03', title: 'Hotel Facilities', focus_word: 'pool', main_sentence: 'Excuse me, what time does the indoor swimming pool close?',
        vocabulary: [
            { term: 'pool', definition: 'A small area of still water for swimming, or to combine resources.', meaning_1: 'Swimming area', example_sentence_1: 'The hotel has a heated outdoor pool.', meaning_2: 'To combine funds', example_sentence_2: 'We should pool our money to buy a better gift for him.' },
            { term: 'access', definition: 'The right to use hotel facilities, or to reach data or places.', meaning_1: 'Right of entry / Use', example_sentence_1: 'Your room key gives you 24-hour access to the gym.', meaning_2: 'To reach / Log in', example_sentence_2: 'I cannot access my bank account from my phone.' }
        ]
    },
    {
        lesson_id: 'lesson-004-04', title: 'Reporting a Problem', focus_word: 'work', main_sentence: 'The air conditioning in my room does not seem to work.',
        vocabulary: [
            { term: 'work', definition: 'For a device to function properly, or to do a job for money.', meaning_1: 'To function (Device)', example_sentence_1: 'The TV is not working, can you send someone to fix it?', meaning_2: 'To do a job', example_sentence_2: 'She works as a manager in a large software company.' },
            { term: 'run', definition: 'For water to flow from a tap, or to manage a business.', meaning_1: 'To flow (Water)', example_sentence_1: 'There is no hot water running in the shower.', meaning_2: 'To manage / Operate', example_sentence_2: 'My uncle runs a small Italian restaurant in the city.' }
        ]
    },
    {
        lesson_id: 'lesson-004-05', title: 'Room Requests', focus_word: 'room', main_sentence: 'Could you send some extra towels to my room, please?',
        vocabulary: [
            { term: 'room', definition: 'A part of a building enclosed by walls, or empty space.', meaning_1: 'A hotel bedroom', example_sentence_1: 'Can we get room service breakfast tomorrow morning?', meaning_2: 'Empty space / Capacity', example_sentence_2: 'Is there enough room in your car for my suitcase?' },
            { term: 'charge', definition: 'To add a fee to a hotel bill, or to store electrical energy in a battery.', meaning_1: 'To bill / A fee', example_sentence_1: 'Will there be an extra charge for late check-out?', meaning_2: 'To fill a battery', example_sentence_2: 'I need to charge my phone before we go out.' }
        ]
    },
    {
        lesson_id: 'lesson-004-06', title: 'Meal Plans', focus_word: 'board', main_sentence: 'Does the room price include half board or just breakfast?',
        vocabulary: [
            { term: 'board', definition: 'Meals provided along with accommodation, or a group managing a company.', meaning_1: 'Meals included (Half/Full board)', example_sentence_1: 'We booked a room with full board, so all meals are included.', meaning_2: 'Board of directors', example_sentence_2: 'The board of directors will make the final decision.' },
            { term: 'rate', definition: 'A fixed price paid for a hotel room, or a measure of speed/frequency.', meaning_1: 'A fixed price / Room rate', example_sentence_1: 'Do you have a special room rate for corporate guests?', meaning_2: 'A measure of frequency', example_sentence_2: 'The unemployment rate has decreased this year.' }
        ]
    },
    {
        lesson_id: 'lesson-004-07', title: 'Wake-up Call', focus_word: 'call', main_sentence: 'Could I get a wake-up call at 7 AM tomorrow?',
        vocabulary: [
            { term: 'call', definition: 'A request to be woken up by the hotel, or to contact someone by phone.', meaning_1: 'A wake-up service', example_sentence_1: 'I asked the reception for a wake-up call at 6:00 AM.', meaning_2: 'To shout or phone', example_sentence_2: 'I heard someone call my name in the crowd.' },
            { term: 'early', definition: 'Happening before the usual or expected time, or near the beginning.', meaning_1: 'Before the usual time', example_sentence_1: 'We requested an early check-in because our flight arrives at dawn.', meaning_2: 'Near the beginning', example_sentence_2: 'In his early twenties, he traveled all over Europe.' }
        ]
    },
    {
        lesson_id: 'lesson-004-08', title: 'Front Desk Services', focus_word: 'front', main_sentence: 'You can leave your room keys at the front desk when you go out.',
        vocabulary: [
            { term: 'front', definition: 'The main reception area of a hotel, or the side facing forward.', meaning_1: 'The reception (Front desk)', example_sentence_1: 'The front desk is open 24 hours a day to assist you.', meaning_2: 'The forward-facing side', example_sentence_2: 'Please park your car in the front of the building.' },
            { term: 'desk', definition: 'A counter where hotel guests register, or a table for working.', meaning_1: 'A registration counter', example_sentence_1: 'Just ask the concierge desk if you need tickets to the museum.', meaning_2: 'A table for working', example_sentence_2: 'My desk is always covered with papers and coffee cups.' }
        ]
    },
    {
        lesson_id: 'lesson-004-09', title: 'Room Safe', focus_word: 'safe', main_sentence: 'Please keep your passport and valuable items in the room safe.',
        vocabulary: [
            { term: 'safe', definition: 'A strong metal box for valuables, or protected from danger.', meaning_1: 'A secure metal box', example_sentence_1: 'The room safe is hidden inside the wardrobe.', meaning_2: 'Protected from danger', example_sentence_2: 'Is it safe to walk in this neighborhood at night?' },
            { term: 'keep', definition: 'To store something in a specific place, or to continue doing an action.', meaning_1: 'To store / Protect', example_sentence_1: 'I will keep your luggage in the storage room.', meaning_2: 'To continue doing', example_sentence_2: 'You must keep working hard to achieve your goals.' }
        ]
    },
    {
        lesson_id: 'lesson-004-10', title: 'Checking Out', focus_word: 'check', main_sentence: 'We need to check out before noon today.',
        vocabulary: [
            { term: 'check', definition: 'To formally leave a hotel, or to examine something for accuracy.', meaning_1: 'To leave a hotel (Check out)', example_sentence_1: 'What is the latest time we can check out?', meaning_2: 'To examine / Verify', example_sentence_2: 'Please check your answers before submitting the test.' },
            { term: 'late', definition: 'Happening after the expected time, or a polite term for a deceased person.', meaning_1: 'After the expected time', example_sentence_1: 'I requested a late check-out because my flight is in the evening.', meaning_2: 'Deceased (Polite term)', example_sentence_2: 'The late president was known for his great speeches.' }
        ]
    },
    {
        lesson_id: 'lesson-004-11', title: 'Security Deposit', focus_word: 'deposit', main_sentence: 'We require a small security deposit for the minibar.',
        vocabulary: [
            { term: 'deposit', definition: 'A sum payable as a security pledge, or to put money into a bank.', meaning_1: 'A security pledge', example_sentence_1: 'The hotel will refund your deposit when you leave.', meaning_2: 'To put money in a bank', example_sentence_2: 'I need to deposit this cash into my savings account.' },
            { term: 'hold', definition: 'A temporary block on credit card funds, or to grasp in one’s hands.', meaning_1: 'A temporary block of funds', example_sentence_1: 'We put a $50 hold on your card for incidentals.', meaning_2: 'To grasp / Carry', example_sentence_2: 'Can you hold this bag for a second, please?' }
        ]
    },
    {
        lesson_id: 'lesson-004-12', title: 'Settling the Bill', focus_word: 'settle', main_sentence: 'I would like to settle the bill with my credit card.',
        vocabulary: [
            { term: 'settle', definition: 'To pay a bill or debt, or to establish a new residence.', meaning_1: 'To pay a bill', example_sentence_1: 'Let us settle the bill before we go to the airport.', meaning_2: 'To establish a home', example_sentence_2: 'After traveling for years, they decided to settle in London.' },
            { term: 'balance', definition: 'An amount of money still owed, or an even distribution of weight.', meaning_1: 'Remaining money owed', example_sentence_1: 'Your remaining balance is fifty dollars.', meaning_2: 'An even distribution', example_sentence_2: 'The gymnast lost her balance and fell.' }
        ]
    },

    // --- COURSE 5: CULTURE ---
    {
        lesson_id: 'lesson-005-01', title: 'Local Customs', focus_word: 'custom', main_sentence: 'It is a local custom to take your shoes off indoors.',
        vocabulary: [
            { term: 'custom', definition: 'A traditional practice of a society, or the airport checkpoint.', meaning_1: 'A tradition / Practice', example_sentence_1: 'You should learn about the local customs before you travel.', meaning_2: 'Border checkpoint', example_sentence_2: 'We had to wait two hours at customs.' },
            { term: 'local', definition: 'Belonging to a particular area, or a person who lives in that area.', meaning_1: 'Belonging to the area', example_sentence_1: 'We enjoyed eating at a small local restaurant.', meaning_2: 'A resident of the area', example_sentence_2: 'The locals were very friendly and helpful to us.' }
        ]
    },
    {
        lesson_id: 'lesson-005-02', title: 'Showing Respect', focus_word: 'bow', main_sentence: 'In many Asian countries, people bow to show respect.',
        vocabulary: [
            { term: 'bow', definition: 'To bend the head or body as a sign of respect, or a tied ribbon.', meaning_1: 'To bend out of respect', example_sentence_1: 'It is polite to bow when you meet the company president.', meaning_2: 'A tied ribbon', example_sentence_2: 'The little girl wore a red bow in her hair.' },
            { term: 'show', definition: 'To make an emotion or quality visible, or a theatrical performance.', meaning_1: 'To demonstrate / Display', example_sentence_1: 'Bringing a small gift is a good way to show respect.', meaning_2: 'A performance / Program', example_sentence_2: 'Did you watch the new comedy show last night?' }
        ]
    },
    {
        lesson_id: 'lesson-005-03', title: 'Rude Gestures', focus_word: 'point', main_sentence: 'You should be careful, as pointing fingers is considered rude.',
        vocabulary: [
            { term: 'point', definition: 'To indicate a direction with a finger, or the main idea of a discussion.', meaning_1: 'To indicate with a finger', example_sentence_1: 'It is rude to point at people with your finger.', meaning_2: 'The main idea', example_sentence_2: 'I do not quite understand the point you are trying to make.' },
            { term: 'rude', definition: 'Offensively impolite or bad-mannered, or sudden and unpleasant.', meaning_1: 'Impolite / Bad-mannered', example_sentence_1: 'Talking loudly on your phone in a library is rude.', meaning_2: 'Sudden and unpleasant', example_sentence_2: 'He was in for a rude awakening when he saw the bill.' }
        ]
    },
    {
        lesson_id: 'lesson-005-04', title: 'Being a Guest', focus_word: 'host', main_sentence: 'Our host prepared a wonderful traditional dinner for us.',
        vocabulary: [
            { term: 'host', definition: 'A person who receives or entertains guests, or to organize an event.', meaning_1: 'Someone entertaining guests', example_sentence_1: 'It is polite to bring a small gift for your host.', meaning_2: 'To organize an event', example_sentence_2: 'The city will host the next Olympic games.' },
            { term: 'traditional', definition: 'Based on old customs and beliefs, or someone resistant to modern ideas.', meaning_1: 'Based on old customs', example_sentence_1: 'We listened to some traditional Irish music at the pub.', meaning_2: 'Resistant to new ideas', example_sentence_2: 'My grandfather is very traditional and dislikes modern technology.' }
        ]
    },
    {
        lesson_id: 'lesson-005-05', title: 'Dress Code', focus_word: 'dress', main_sentence: 'Make sure to dress appropriately when visiting temples.',
        vocabulary: [
            { term: 'dress', definition: 'To put on clothes suitable for an occasion, or a woman\'s garment.', meaning_1: 'To put on clothes', example_sentence_1: 'You should dress warmly because it is snowing outside.', meaning_2: 'A woman\'s garment', example_sentence_2: 'She bought a beautiful red dress for the wedding.' },
            { term: 'visit', definition: 'To go to see a person or place, or to access a website.', meaning_1: 'To go see a place/person', example_sentence_1: 'Millions of tourists visit the Eiffel Tower every year.', meaning_2: 'To access a webpage', example_sentence_2: 'For more information, please visit our website.' }
        ]
    },
    {
        lesson_id: 'lesson-005-06', title: 'Respecting the Elderly', focus_word: 'respect', main_sentence: 'It is important to show respect to the elderly in this culture.',
        vocabulary: [
            { term: 'respect', definition: 'A feeling of deep admiration, or a particular aspect/detail.', meaning_1: 'Admiration / Esteem', example_sentence_1: 'You should always treat your teachers with respect.', meaning_2: 'A particular aspect', example_sentence_2: 'In that respect, I completely agree with your opinion.' },
            { term: 'age', definition: 'The length of time a person has lived, or to grow old.', meaning_1: 'Number of years lived', example_sentence_1: 'At the age of five, he started learning how to play the piano.', meaning_2: 'To grow old / Mature', example_sentence_2: 'Cheese and wine usually age well over time.' }
        ]
    },
    {
        lesson_id: 'lesson-005-07', title: 'Accepting an Invitation', focus_word: 'invite', main_sentence: 'I would like to invite you to our traditional festival.',
        vocabulary: [
            { term: 'invite', definition: 'To request someone\'s presence, or to provoke a particular reaction.', meaning_1: 'To ask someone to come', example_sentence_1: 'We decided to invite all our neighbors to the barbecue.', meaning_2: 'To provoke / Cause', example_sentence_2: 'Leaving your car unlocked will just invite thieves.' },
            { term: 'festival', definition: 'A day or period of celebration, or an organized series of cultural events.', meaning_1: 'A cultural celebration', example_sentence_1: 'The spring festival is celebrated with music and dancing.', meaning_2: 'A series of events', example_sentence_2: 'The Cannes film festival attracts directors from all over the world.' }
        ]
    },
    {
        lesson_id: 'lesson-005-08', title: 'Giving Gifts', focus_word: 'gift', main_sentence: 'Bringing a small gift for the host is always a good idea.',
        vocabulary: [
            { term: 'gift', definition: 'Something given willingly to someone, or a natural talent.', meaning_1: 'A present', example_sentence_1: 'He bought a beautiful necklace as a birthday gift for his wife.', meaning_2: 'A natural talent', example_sentence_2: 'She has a real gift for learning foreign languages quickly.' },
            { term: 'wrap', definition: 'To cover something in paper, or to finish a meeting or project.', meaning_1: 'To cover in paper', example_sentence_1: 'Could you please wrap this box with red ribbon?', meaning_2: 'To finish / Conclude', example_sentence_2: 'Let us wrap up this meeting and go get some lunch.' }
        ]
    },
    {
        lesson_id: 'lesson-005-09', title: 'Polite Acceptance', focus_word: 'accept', main_sentence: 'You should accept the offer with both hands to be polite.',
        vocabulary: [
            { term: 'accept', definition: 'To receive something willingly, or to believe something is true.', meaning_1: 'To receive willingly', example_sentence_1: 'She was happy to accept the job offer from the company.', meaning_2: 'To believe as true', example_sentence_2: 'The police did not accept his version of the story.' },
            { term: 'offer', definition: 'To present something for someone to accept, or a specially reduced price.', meaning_1: 'To propose / Give', example_sentence_1: 'Can I offer you something to drink while you wait?', meaning_2: 'A discounted price', example_sentence_2: 'These shoes are on special offer for this week only.' }
        ]
    },
    {
        lesson_id: 'lesson-005-10', title: 'Taking off Shoes', focus_word: 'remove', main_sentence: 'Please remove your shoes before entering the house.',
        vocabulary: [
            { term: 'remove', definition: 'To take something off or away, or to dismiss someone from a job.', meaning_1: 'To take off / Take away', example_sentence_1: 'He had to remove his jacket because it was too hot.', meaning_2: 'To dismiss from a job', example_sentence_2: 'The board decided to remove the manager from his position.' },
            { term: 'step', definition: 'The movement of lifting the foot, or a stage in a process.', meaning_1: 'A movement of the foot', example_sentence_1: 'Be careful not to step on the broken glass.', meaning_2: 'A stage in a process', example_sentence_2: 'The first step to solving a problem is admitting it exists.' }
        ]
    },
    {
        lesson_id: 'lesson-005-11', title: 'Polite Behavior', focus_word: 'stand', main_sentence: 'People usually stand up when a guest enters the room.',
        vocabulary: [
            { term: 'stand', definition: 'To be in an upright position, or to tolerate something unpleasant.', meaning_1: 'To be upright on feet', example_sentence_1: 'We had to stand on the bus because there were no empty seats.', meaning_2: 'To tolerate / Endure', example_sentence_2: 'I cannot stand the noise coming from the construction site.' },
            { term: 'seat', definition: 'A thing made for sitting on, or the main center of an activity.', meaning_1: 'A place to sit', example_sentence_1: 'Please take a seat and the doctor will be with you shortly.', meaning_2: 'Center / Headquarters', example_sentence_2: 'Washington D.C. is the seat of the American government.' }
        ]
    },
    {
        lesson_id: 'lesson-005-12', title: 'Public Etiquette', focus_word: 'quiet', main_sentence: 'It is considered polite to keep quiet on public transportation.',
        vocabulary: [
            { term: 'quiet', definition: 'Making very little noise, or a period without much business or activity.', meaning_1: 'Making little noise', example_sentence_1: 'Please be quiet, the baby is sleeping in the next room.', meaning_2: 'Without much activity', example_sentence_2: 'It has been a very quiet week at the office.' },
            { term: 'public', definition: 'Open to all people, or ordinary people in general.', meaning_1: 'Open to everyone', example_sentence_1: 'You cannot smoke inside public buildings.', meaning_2: 'Ordinary people', example_sentence_2: 'The museum will be open to the general public next month.' }
        ]
    },

    // --- COURSE 6: SHOPPING ---
    {
        lesson_id: 'lesson-006-01', title: 'Asking the Price', focus_word: 'price', main_sentence: 'Could you tell me the price of this jacket?',
        vocabulary: [
            { term: 'price', definition: 'The amount of money expected for something, or an unwelcome consequence.', meaning_1: 'Amount of money', example_sentence_1: 'House prices have increased significantly this year.', meaning_2: 'A negative consequence', example_sentence_2: 'He worked too hard, and his health paid the price.' },
            { term: 'tag', definition: 'A label attached to someone or something, or to touch a player in a game.', meaning_1: 'A label for price/info', example_sentence_1: 'The price tag on this shirt says it costs fifty dollars.', meaning_2: 'To touch in a game', example_sentence_2: 'The kids were running around trying to tag each other.' }
        ]
    },
    {
        lesson_id: 'lesson-006-02', title: 'Trying Clothes On', focus_word: 'try', main_sentence: 'Can I try this on to see if it fits?',
        vocabulary: [
            { term: 'try', definition: 'To attempt to do something, or to examine someone in a court of law.', meaning_1: 'To attempt / Test', example_sentence_1: 'I will try to finish the report by tomorrow morning.', meaning_2: 'To judge in court', example_sentence_2: 'The suspect will be tried for robbery next month.' },
            { term: 'fit', definition: 'To be the right shape or size, or to be in good physical health.', meaning_1: 'To be the right size', example_sentence_1: 'These jeans do not fit me anymore; they are too tight.', meaning_2: 'In good physical health', example_sentence_2: 'He runs five miles every morning to keep fit.' }
        ]
    },
    {
        lesson_id: 'lesson-006-03', title: 'Asking for Sizes', focus_word: 'size', main_sentence: 'Do you have these shoes in a smaller size?',
        vocabulary: [
            { term: 'size', definition: 'How large or small something is, or to quickly evaluate a person.', meaning_1: 'How large something is', example_sentence_1: 'What size coffee would you like? Medium or large?', meaning_2: 'To evaluate a person', example_sentence_2: 'The two boxers sized each other up before the match began.' },
            { term: 'pair', definition: 'A set of two things used together, or to put two people/things together.', meaning_1: 'A set of two things', example_sentence_1: 'I need to buy a new pair of winter gloves.', meaning_2: 'To put into groups of two', example_sentence_2: 'The teacher asked the students to pair up for the project.' }
        ]
    },
    {
        lesson_id: 'lesson-006-04', title: 'Asking for a Discount', focus_word: 'discount', main_sentence: 'Is there any discount if I buy two of these?',
        vocabulary: [
            { term: 'discount', definition: 'A deduction from the usual cost, or to ignore an idea because it is unlikely.', meaning_1: 'A price reduction', example_sentence_1: 'Students get a ten percent discount on train tickets.', meaning_2: 'To ignore / Dismiss', example_sentence_2: 'You should not completely discount his theory yet.' },
            { term: 'sale', definition: 'The exchange of goods for money, or a period of reduced prices.', meaning_1: 'The act of selling', example_sentence_1: 'The sale of alcohol to minors is strictly prohibited.', meaning_2: 'A period of reduced prices', example_sentence_2: 'I bought this winter coat on sale for half the price.' }
        ]
    },
    {
        lesson_id: 'lesson-006-05', title: 'Payment Methods', focus_word: 'pay', main_sentence: 'I would like to pay by credit card, please.',
        vocabulary: [
            { term: 'pay', definition: 'To give money for goods or work, or to result in some advantage/profit.', meaning_1: 'To give money', example_sentence_1: 'You can pay for your groceries at the next register.', meaning_2: 'To be profitable / Useful', example_sentence_2: 'It always pays to be polite to the security staff.' },
            { term: 'cash', definition: 'Money in coins or notes, or to exchange a check for physical money.', meaning_1: 'Physical money', example_sentence_1: 'Do you have any cash? I only have my credit card.', meaning_2: 'To exchange a check', example_sentence_2: 'I need to go to the bank to cash my paycheck.' }
        ]
    },
    {
        lesson_id: 'lesson-006-06', title: 'Returning an Item', focus_word: 'return', main_sentence: 'I would like to return this shirt, it is too small.',
        vocabulary: [
            { term: 'return', definition: 'To give something back to a store, or to come back to a place.', meaning_1: 'To give back an item', example_sentence_1: 'You have thirty days to return the product for a full refund.', meaning_2: 'To come back', example_sentence_2: 'What time did you return home last night?' },
            { term: 'receipt', definition: 'A printed paper proving a purchase, or the action of receiving something.', meaning_1: 'Proof of purchase', example_sentence_1: 'You need the original receipt to exchange these shoes.', meaning_2: 'The act of receiving', example_sentence_2: 'Please acknowledge receipt of this email.' }
        ]
    },
    {
        lesson_id: 'lesson-006-07', title: 'Checking the Fit', focus_word: 'fit', main_sentence: 'These shoes fit perfectly, I will take them.',
        vocabulary: [
            { term: 'fit', definition: 'To be the right size, or to be in good physical health.', meaning_1: 'To be the correct size', example_sentence_1: 'I tried the dress on, but it did not fit my shoulders.', meaning_2: 'Healthy and strong', example_sentence_2: 'He goes to the gym every day to stay fit.' },
            { term: 'tight', definition: 'Fitting very closely to the body, or strict and difficult to manage.', meaning_1: 'Fitting closely', example_sentence_1: 'These jeans are too tight around my waist.', meaning_2: 'Strict / Difficult', example_sentence_2: 'We are working on a very tight schedule this week.' }
        ]
    },
    {
        lesson_id: 'lesson-006-08', title: 'Matching Clothes', focus_word: 'match', main_sentence: 'Does this blue tie match my dark suit?',
        vocabulary: [
            { term: 'match', definition: 'To look attractive together, or a competitive sporting event.', meaning_1: 'To look good together', example_sentence_1: 'The color of your shoes should match your belt.', meaning_2: 'A sports competition', example_sentence_2: 'Did you watch the football match on TV last night?' },
            { term: 'suit', definition: 'A set of clothes made of the same fabric, or to be convenient for someone.', meaning_1: 'A matching set of clothes', example_sentence_1: 'He wore a dark blue suit to the job interview.', meaning_2: 'To be convenient', example_sentence_2: 'Tuesday at 10 AM suits me perfectly for our meeting.' }
        ]
    },
    {
        lesson_id: 'lesson-006-09', title: 'Finding a Good Deal', focus_word: 'deal', main_sentence: 'This laptop is on sale, it is a really great deal.',
        vocabulary: [
            { term: 'deal', definition: 'An attractive price or agreement, or to manage a difficult situation.', meaning_1: 'A bargain / Agreement', example_sentence_1: 'I got a great deal on this used car.', meaning_2: 'To handle a problem', example_sentence_2: 'I have a lot of work to deal with right now.' },
            { term: 'fair', definition: 'Treating people equally, or a public event with entertainment and stalls.', meaning_1: 'Just and equal', example_sentence_1: 'It is not fair that he gets paid more for the same job.', meaning_2: 'A public event', example_sentence_2: 'We bought some local cheese at the village fair.' }
        ]
    },
    {
        lesson_id: 'lesson-006-10', title: 'Delivery Charges', focus_word: 'charge', main_sentence: 'How much do you charge for international delivery?',
        vocabulary: [
            { term: 'charge', definition: 'To ask an amount of money for a service, or to refill electrical power.', meaning_1: 'To ask for money', example_sentence_1: 'The hotel will charge you for using the minibar.', meaning_2: 'To refill a battery', example_sentence_2: 'I forgot to charge my phone, and now it is dead.' },
            { term: 'free', definition: 'Costing no money, or not under the control of someone else.', meaning_1: 'Costing nothing', example_sentence_1: 'Buy two coffees and get the third one completely free.', meaning_2: 'Having liberty', example_sentence_2: 'You are free to leave the meeting whenever you want.' }
        ]
    },
    {
        lesson_id: 'lesson-006-11', title: 'Stock and Inventory', focus_word: 'carry', main_sentence: 'Excuse me, do you carry this brand of cosmetics?',
        vocabulary: [
            { term: 'carry', definition: 'To keep goods for sale in a shop, or to hold and move something.', meaning_1: 'To stock or sell an item', example_sentence_1: 'Sorry, we do not carry that specific brand of shoes.', meaning_2: 'To hold and move', example_sentence_2: 'Can you help me carry these heavy boxes upstairs?' },
            { term: 'heavy', definition: 'Weighing a lot, or of great intensity or severity.', meaning_1: 'Weighing a lot', example_sentence_1: 'My suitcase is too heavy for me to lift.', meaning_2: 'Intense or severe', example_sentence_2: 'Traffic was very heavy on the highway this morning.' }
        ]
    },
    {
        lesson_id: 'lesson-006-12', title: 'At the Checkout', focus_word: 'counter', main_sentence: 'Please bring your items to the checkout counter.',
        vocabulary: [
            { term: 'counter', definition: 'A long flat surface in a shop/bank, or to speak against an opposing idea.', meaning_1: 'A surface in a shop', example_sentence_1: 'You can leave your shopping basket on the counter.', meaning_2: 'To reply or oppose', example_sentence_2: 'He countered my argument with some excellent points.' },
            { term: 'bag', definition: 'A container made of paper/plastic, or to successfully secure something.', meaning_1: 'A container', example_sentence_1: 'Would you like a plastic bag for your groceries?', meaning_2: 'To secure / Catch', example_sentence_2: 'She managed to bag a great job at the tech company.' }
        ]
    },

    // --- COURSE 7: DIRECTION & NAVIGATION ---
    {
        lesson_id: 'lesson-007-01', title: 'Asking for Locations', focus_word: 'where', main_sentence: 'Excuse me, where is the nearest subway station?',
        vocabulary: [
            { term: 'where', definition: 'In or to what place/position, or a situation/stage.', meaning_1: 'In what place', example_sentence_1: 'Do you know where the central post office is?', meaning_2: 'A situation / Stage', example_sentence_2: 'We have reached a point where we must make a decision.' },
            { term: 'station', definition: 'A place where trains/buses stop, or to put someone in a particular place.', meaning_1: 'A transport stop', example_sentence_1: 'I will meet you outside the main train station.', meaning_2: 'To assign to a place', example_sentence_2: 'The soldiers were stationed near the northern border.' }
        ]
    },
    {
        lesson_id: 'lesson-007-02', title: 'Turning Directions', focus_word: 'turn', main_sentence: 'Turn left at the next intersection to reach the museum.',
        vocabulary: [
            { term: 'turn', definition: 'To change direction, or an opportunity to do something in a sequence.', meaning_1: 'To change direction', example_sentence_1: 'Walk straight for two blocks, then turn right.', meaning_2: 'A chance in a sequence', example_sentence_2: 'Please wait patiently, it is almost your turn to speak.' },
            { term: 'right', definition: 'The direction opposite to left, or morally good and true.', meaning_1: 'Opposite of left', example_sentence_1: 'The pharmacy will be on your right side.', meaning_2: 'Correct / True', example_sentence_2: 'I think you made the right decision by staying home.' }
        ]
    },
    {
        lesson_id: 'lesson-007-03', title: 'City Blocks', focus_word: 'block', main_sentence: 'The hotel is just two blocks down this street.',
        vocabulary: [
            { term: 'block', definition: 'A section of a street between two crossings, or to obstruct something.', meaning_1: 'A section of a street', example_sentence_1: 'My apartment is three blocks away from the supermarket.', meaning_2: 'To obstruct / Stop', example_sentence_2: 'A large fallen tree blocked the entire road.' },
            { term: 'street', definition: 'A public road in a city or town, or the environment of the homeless.', meaning_1: 'A public road', example_sentence_1: 'Be careful when crossing the busy street.', meaning_2: 'Outside environment', example_sentence_2: 'The charity provides food for people living on the streets.' }
        ]
    },
    {
        lesson_id: 'lesson-007-04', title: 'Going Straight', focus_word: 'straight', main_sentence: 'Just go straight ahead until you see the big park.',
        vocabulary: [
            { term: 'straight', definition: 'Moving in one direction without curving, or being honest and direct.', meaning_1: 'Without curving', example_sentence_1: 'Keep walking straight until you reach the traffic lights.', meaning_2: 'Honest / Direct', example_sentence_2: 'I want you to give me a straight answer to my question.' },
            { term: 'ahead', definition: 'Further forward in space or time, or having an advantage.', meaning_1: 'Further forward', example_sentence_1: 'The road ahead is closed due to construction.', meaning_2: 'Having an advantage', example_sentence_2: 'Our team is currently ahead by two points.' }
        ]
    },
    {
        lesson_id: 'lesson-007-05', title: 'Crossing the Road', focus_word: 'cross', main_sentence: 'Be careful when you cross the road during rush hour.',
        vocabulary: [
            { term: 'cross', definition: 'To go to the other side of something, or being annoyed and angry.', meaning_1: 'To go across', example_sentence_1: 'We need a bridge to cross the river safely.', meaning_2: 'Annoyed / Angry', example_sentence_2: 'She gave me a cross look when I arrived late.' },
            { term: 'corner', definition: 'Where two streets or walls meet, or a difficult situation from which escape is hard.', meaning_1: 'Where two streets meet', example_sentence_1: 'The coffee shop is right around the corner.', meaning_2: 'A difficult situation', example_sentence_2: 'The new evidence backed the suspect into a corner.' }
        ]
    },
    {
        lesson_id: 'lesson-007-06', title: 'Walking Past', focus_word: 'past', main_sentence: 'Walk past the bank, and the post office is on your right.',
        vocabulary: [
            { term: 'past', definition: 'Moving beyond something in space, or the time before the present.', meaning_1: 'Moving beyond / By', example_sentence_1: 'He walked right past me without saying hello.', meaning_2: 'Time before the present', example_sentence_2: 'You must forget the past and focus on the future.' },
            { term: 'bank', definition: 'A financial institution, or the land alongside a river.', meaning_1: 'A place for money', example_sentence_1: 'I need to go to the bank to withdraw some cash.', meaning_2: 'The side of a river', example_sentence_2: 'We sat on the river bank and watched the boats go by.' }
        ]
    },
    {
        lesson_id: 'lesson-007-07', title: 'Getting Lost', focus_word: 'lost', main_sentence: 'Excuse me, I think I am lost. Can you help me?',
        vocabulary: [
            { term: 'lost', definition: 'Unable to find one\'s way, or defeated in a competition.', meaning_1: 'Unable to find the way', example_sentence_1: 'My phone died, and I am completely lost in this city.', meaning_2: 'Defeated (Past tense of lose)', example_sentence_2: 'Our team lost the final match by two points.' },
            { term: 'find', definition: 'To discover the location of something, or to realize/consider something.', meaning_1: 'To locate / Discover', example_sentence_1: 'I cannot find my hotel on this digital map.', meaning_2: 'To realize or consider', example_sentence_2: 'I find it very hard to wake up early in the winter.' }
        ]
    },
    {
        lesson_id: 'lesson-007-08', title: 'Asking about Distance', focus_word: 'far', main_sentence: 'Is the central train station very far from here?',
        vocabulary: [
            { term: 'far', definition: 'At a great distance, or by a great amount/degree.', meaning_1: 'A great distance', example_sentence_1: 'It is too far to walk; we should take a taxi.', meaning_2: 'By a great amount', example_sentence_2: 'This new laptop is far better than my old one.' },
            { term: 'close', definition: 'A short distance away, or to shut something.', meaning_1: 'Near in distance', example_sentence_1: 'The hospital is very close to my apartment.', meaning_2: 'To shut (A door/shop)', example_sentence_2: 'Please close the window, it is getting cold.' }
        ]
    },
    {
        lesson_id: 'lesson-007-09', title: 'Using a Map', focus_word: 'map', main_sentence: 'Could you please show me where we are on the map?',
        vocabulary: [
            { term: 'map', definition: 'A drawing of an area showing roads, or to plan something in detail.', meaning_1: 'A diagram of an area', example_sentence_1: 'I downloaded an offline map of the city on my phone.', meaning_2: 'To plan in detail', example_sentence_2: 'We need to map out our marketing strategy for next year.' },
            { term: 'show', definition: 'To allow something to be seen, or a theatrical performance.', meaning_1: 'To display or indicate', example_sentence_1: 'Can you show me the way to the nearest subway?', meaning_2: 'A theatrical performance', example_sentence_2: 'The evening show starts at exactly eight o\'clock.' }
        ]
    },
    {
        lesson_id: 'lesson-007-10', title: 'Following Signs', focus_word: 'sign', main_sentence: 'Just follow the signs pointing to the airport terminal.',
        vocabulary: [
            { term: 'sign', definition: 'A notice giving information or directions, or to write one\'s signature.', meaning_1: 'A notice / Indicator', example_sentence_1: 'If you follow the green signs, you will find the exit.', meaning_2: 'To write a signature', example_sentence_2: 'Please sign the document at the bottom of the page.' },
            { term: 'follow', definition: 'To move behind someone or something, or to understand an explanation.', meaning_1: 'To go after or behind', example_sentence_1: 'Just follow that blue car, they are going to the same place.', meaning_2: 'To understand', example_sentence_2: 'I am sorry, but I do not quite follow your argument.' }
        ]
    },
    {
        lesson_id: 'lesson-007-11', title: 'Finding the Way', focus_word: 'way', main_sentence: 'Could you tell me which way is the city center?',
        vocabulary: [
            { term: 'way', definition: 'A route or direction, or a method or style of doing something.', meaning_1: 'A route / Direction', example_sentence_1: 'I think we are going the wrong way down this street.', meaning_2: 'A method / Manner', example_sentence_2: 'There are many different ways to cook a potato.' },
            { term: 'side', definition: 'The left or right part of something, or a team in a debate or sport.', meaning_1: 'Left or right position', example_sentence_1: 'In the UK, people drive on the left side of the road.', meaning_2: 'A team / Faction', example_sentence_2: 'Whose side are you on in this argument?' }
        ]
    },
    {
        lesson_id: 'lesson-007-12', title: 'Travel Time', focus_word: 'reach', main_sentence: 'How long does it take to reach the museum by bus?',
        vocabulary: [
            { term: 'reach', definition: 'To arrive at a destination, or to stretch out an arm.', meaning_1: 'To arrive at', example_sentence_1: 'We should reach London before the sun goes down.', meaning_2: 'To stretch out an arm', example_sentence_2: 'She had to stand on a chair to reach the top shelf.' },
            { term: 'center', definition: 'The middle point of a place, or to focus on something.', meaning_1: 'The middle point', example_sentence_1: 'The historic castle is right in the center of the city.', meaning_2: 'To focus on', example_sentence_2: 'This documentary centers on the life of penguins.' }
        ]
    },

    // --- COURSE 8: SPORT ---
    {
        lesson_id: 'lesson-008-01', title: 'Playing a Game', focus_word: 'play', main_sentence: 'Do you want to play a game of tennis this weekend?',
        vocabulary: [
            { term: 'play', definition: 'To participate in a sport or game, or a dramatic work for the theater.', meaning_1: 'To engage in a sport', example_sentence_1: 'We play basketball at the local court every Sunday.', meaning_2: 'A theatrical performance', example_sentence_2: 'Romeo and Juliet is my favorite Shakespeare play.' },
            { term: 'game', definition: 'A competitive sports match, or wild animals hunted for food.', meaning_1: 'A sports match', example_sentence_1: 'Did you watch the football game on television last night?', meaning_2: 'Hunted wild animals', example_sentence_2: 'The restaurant serves exotic game like venison and wild boar.' }
        ]
    },
    {
        lesson_id: 'lesson-008-02', title: 'Using the Gym', focus_word: 'gym', main_sentence: 'Is there a gym in the hotel where I can work out?',
        vocabulary: [
            { term: 'gym', definition: 'A room equipped for physical exercise, or a physical education class.', meaning_1: 'A fitness center', example_sentence_1: 'I signed up for a membership at the new gym downtown.', meaning_2: 'Physical education class', example_sentence_2: 'The students were playing dodgeball in gym today.' },
            { term: 'train', definition: 'To practice a sport to keep fit, or a series of connected railway cars.', meaning_1: 'To practice a sport', example_sentence_1: 'He trains for three hours every day for the marathon.', meaning_2: 'A railway vehicle', example_sentence_2: 'We took the morning train from Paris to Amsterdam.' }
        ]
    },
    {
        lesson_id: 'lesson-008-03', title: 'Going for a Run', focus_word: 'run', main_sentence: 'I usually go for a run in the park before breakfast.',
        vocabulary: [
            { term: 'run', definition: 'To move fast on foot, or to manage or operate a business.', meaning_1: 'To move fast on foot', example_sentence_1: 'She can run faster than anyone else in her class.', meaning_2: 'To operate a business', example_sentence_2: 'He left his corporate job to run a small cafe.' },
            { term: 'track', definition: 'A prepared path for running or racing, or a musical recording.', meaning_1: 'A running path', example_sentence_1: 'The athletes are warming up on the running track.', meaning_2: 'A song or piece of music', example_sentence_2: 'The DJ played my favorite track at the club last night.' }
        ]
    },
    {
        lesson_id: 'lesson-008-04', title: 'Supporting a Team', focus_word: 'team', main_sentence: 'Which football team do you usually support?',
        vocabulary: [
            { term: 'team', definition: 'A group of players on the same side, or to join together to work.', meaning_1: 'A sports group', example_sentence_1: 'Our local basketball team won the championship this year.', meaning_2: 'To join together', example_sentence_2: 'The two companies will team up to develop the new software.' },
            { term: 'support', definition: 'To encourage a sports team, or to hold the weight of something.', meaning_1: 'To cheer for a team', example_sentence_1: 'My family has supported this football club for generations.', meaning_2: 'To hold weight', example_sentence_2: 'These four pillars support the entire roof of the building.' }
        ]
    },
    {
        lesson_id: 'lesson-008-05', title: 'Watching a Match', focus_word: 'match', main_sentence: 'Are you going to the stadium to watch the big match?',
        vocabulary: [
            { term: 'match', definition: 'A sporting competition, or a small wooden stick used to start a fire.', meaning_1: 'A sporting competition', example_sentence_1: 'The tennis match was canceled due to heavy rain.', meaning_2: 'A stick to start fire', example_sentence_2: 'Do you have a match or a lighter for these candles?' },
            { term: 'beat', definition: 'To defeat an opponent in a game, or a steady rhythm in music.', meaning_1: 'To defeat an opponent', example_sentence_1: 'I finally beat my brother in a game of chess.', meaning_2: 'A musical rhythm', example_sentence_2: 'This song has a really great beat for dancing.' }
        ]
    },
    {
        lesson_id: 'lesson-008-06', title: 'Working Out', focus_word: 'exercise', main_sentence: 'I try to exercise at least three times a week.',
        vocabulary: [
            { term: 'exercise', definition: 'Physical activity to stay healthy, or to use a legal right.', meaning_1: 'Physical workout', example_sentence_1: 'Swimming is a great form of cardiovascular exercise.', meaning_2: 'To use a right or power', example_sentence_2: 'You have the right to remain silent, and you should exercise it.' },
            { term: 'work', definition: 'To do a job for money, or to exercise (work out).', meaning_1: 'To do a job', example_sentence_1: 'He works as an engineer for a large car company.', meaning_2: 'To exercise (Work out)', example_sentence_2: 'I usually work out at the gym for an hour every morning.' }
        ]
    },
    {
        lesson_id: 'lesson-008-07', title: 'Game Score', focus_word: 'score', main_sentence: 'What was the final score of the basketball game?',
        vocabulary: [
            { term: 'score', definition: 'The number of points in a game, or to achieve a success.', meaning_1: 'Points in a game', example_sentence_1: 'The home team won with a final score of three to one.', meaning_2: 'To achieve or obtain', example_sentence_2: 'He managed to score a great job right after college.' },
            { term: 'point', definition: 'A unit of scoring in a game, or the sharp end of an object.', meaning_1: 'A unit of scoring', example_sentence_1: 'The team won the championship by a single point.', meaning_2: 'The sharp end', example_sentence_2: 'Be careful with the sharp point of that knife.' }
        ]
    },
    {
        lesson_id: 'lesson-008-08', title: 'Being a Fan', focus_word: 'fan', main_sentence: 'He is a huge fan of the local football club.',
        vocabulary: [
            { term: 'fan', definition: 'A person who strongly supports a team, or a cooling device.', meaning_1: 'A sports supporter', example_sentence_1: 'The stadium was filled with thousands of cheering fans.', meaning_2: 'A cooling device', example_sentence_2: 'Could you turn on the ceiling fan? It is too hot in here.' },
            { term: 'club', definition: 'An association dedicated to a sport, or a heavy stick.', meaning_1: 'A sports association', example_sentence_1: 'She joined the local tennis club to meet new people.', meaning_2: 'A heavy wooden stick', example_sentence_2: 'The caveman in the movie was carrying a large wooden club.' }
        ]
    },
    {
        lesson_id: 'lesson-008-09', title: 'On the Pitch', focus_word: 'pitch', main_sentence: 'The players are warming up on the football pitch.',
        vocabulary: [
            { term: 'pitch', definition: 'A field for playing sports like football, or to present an idea.', meaning_1: 'A sports playing field', example_sentence_1: 'The rugby pitch was very muddy after the heavy rain.', meaning_2: 'To present a business idea', example_sentence_2: 'The entrepreneur pitched her new app to the investors.' },
            { term: 'throw', definition: 'To propel something with force, or a light blanket.', meaning_1: 'To propel through the air', example_sentence_1: 'The quarterback can throw the ball over fifty yards.', meaning_2: 'A light blanket', example_sentence_2: 'She covered her legs with a warm fleece throw.' }
        ]
    },
    {
        lesson_id: 'lesson-008-10', title: 'Team Coach', focus_word: 'coach', main_sentence: 'The new coach has really improved the team\'s performance.',
        vocabulary: [
            { term: 'coach', definition: 'A person who trains athletes, or the economy section of a plane.', meaning_1: 'A sports trainer', example_sentence_1: 'The tennis coach taught me how to improve my serve.', meaning_2: 'Economy class seating', example_sentence_2: 'We bought coach tickets for our flight to New York.' },
            { term: 'train', definition: 'To practice skills for a sport, or to teach an animal/person.', meaning_1: 'To practice for a sport', example_sentence_1: 'She trains for four hours every single day.', meaning_2: 'To teach behavior', example_sentence_2: 'It takes a lot of patience to train a new puppy.' }
        ]
    },
    {
        lesson_id: 'lesson-008-11', title: 'A Tied Game', focus_word: 'draw', main_sentence: 'The match ended in a 1-1 draw after extra time.',
        vocabulary: [
            { term: 'draw', definition: 'A game ending with an equal score, or to make a picture.', meaning_1: 'A tied sports game', example_sentence_1: 'Neither team could score again, so the game was a draw.', meaning_2: 'To sketch a picture', example_sentence_2: 'The little boy loves to draw pictures of dinosaurs.' },
            { term: 'tie', definition: 'An equal score in a match, or a piece of formal neckwear.', meaning_1: 'An equal game score', example_sentence_1: 'The basketball game ended in a tie at 90 points each.', meaning_2: 'Formal neckwear', example_sentence_2: 'He wore a dark blue suit with a red silk tie.' }
        ]
    },
    {
        lesson_id: 'lesson-008-12', title: 'Staying Fit', focus_word: 'fit', main_sentence: 'You need to be very fit to run a full marathon.',
        vocabulary: [
            { term: 'fit', definition: 'In good physical health, or to be the right shape and size.', meaning_1: 'Healthy and athletic', example_sentence_1: 'He swims every day to stay fit and active.', meaning_2: 'To be the right size', example_sentence_2: 'Those running shoes do not fit me very well.' },
            { term: 'shape', definition: 'The physical condition of someone, or the external form of an object.', meaning_1: 'Physical condition', example_sentence_1: 'She exercises regularly to stay in great shape.', meaning_2: 'The external form', example_sentence_2: 'The dining table has a rectangular shape.' }
        ]
    },

    // --- COURSE 9: HEALTH ---
    {
        lesson_id: 'lesson-009-01', title: 'At the Doctor', focus_word: 'patient', main_sentence: 'The doctor is examining a patient in the next room.',
        vocabulary: [
            { term: 'patient', definition: 'A person receiving medical care, or able to wait calmly.', meaning_1: 'A medical client', example_sentence_1: 'The hospital admitted fifty new patients today.', meaning_2: 'Able to wait calmly', example_sentence_2: 'You must be patient; the results will take a few days.' },
            { term: 'care', definition: 'Medical attention given to a sick person, or feeling concern.', meaning_1: 'Medical attention', example_sentence_1: 'He requires constant medical care after the accident.', meaning_2: 'To feel concern', example_sentence_2: 'I really care about the environment and nature.' }
        ]
    },
    {
        lesson_id: 'lesson-009-02', title: 'Describing Pain', focus_word: 'pain', main_sentence: 'I have a sharp pain in my lower back.',
        vocabulary: [
            { term: 'pain', definition: 'Physical suffering caused by illness, or an annoying person.', meaning_1: 'Physical suffering', example_sentence_1: 'The doctor gave her some medicine to ease the pain.', meaning_2: 'An annoying person/thing', example_sentence_2: 'Doing these taxes is a real pain in the neck.' },
            { term: 'sharp', definition: 'A sudden and severe physical pain, or having a thin cutting edge.', meaning_1: 'Sudden and severe (Pain)', example_sentence_1: 'I felt a sharp pain in my knee when I started running.', meaning_2: 'Having a cutting edge', example_sentence_2: 'Be careful, that kitchen knife is extremely sharp.' }
        ]
    },
    {
        lesson_id: 'lesson-009-03', title: 'Feeling Sick', focus_word: 'sick', main_sentence: 'I feel sick and I have a terrible headache.',
        vocabulary: [
            { term: 'sick', definition: 'Affected by physical illness, or tired and annoyed by something.', meaning_1: 'Ill / Unwell', example_sentence_1: 'He cannot come to work today because he is sick.', meaning_2: 'Tired and annoyed', example_sentence_2: 'I am sick and tired of listening to your complaints.' },
            { term: 'head', definition: 'The upper part of the human body, or the person in charge.', meaning_1: 'Upper body part', example_sentence_1: 'She hit her head on the door and got a bruise.', meaning_2: 'The person in charge', example_sentence_2: 'He is the head of the marketing department.' }
        ]
    },
    {
        lesson_id: 'lesson-009-04', title: 'Catching a Cold', focus_word: 'cold', main_sentence: 'You should wear a jacket so you do not catch a cold.',
        vocabulary: [
            { term: 'cold', definition: 'A common viral infection causing a cough, or having a low temperature.', meaning_1: 'A viral infection', example_sentence_1: 'I have a bad cold, so I will stay in bed today.', meaning_2: 'Having a low temperature', example_sentence_2: 'The weather is very cold outside tonight.' },
            { term: 'catch', definition: 'To become infected with an illness, or to grab an object in the air.', meaning_1: 'To get an illness', example_sentence_1: 'Dress warmly, or you might catch a cold in the rain.', meaning_2: 'To grab a moving object', example_sentence_2: 'Try to catch the ball when I throw it to you.' }
        ]
    },
    {
        lesson_id: 'lesson-009-05', title: 'Medical Operations', focus_word: 'operate', main_sentence: 'The surgeon will operate on his knee tomorrow morning.',
        vocabulary: [
            { term: 'operate', definition: 'To perform surgery on a patient, or to control a machine.', meaning_1: 'To perform surgery', example_sentence_1: 'The doctors had to operate immediately to save his life.', meaning_2: 'To control a machine', example_sentence_2: 'You must read the manual to operate this heavy machinery.' },
            { term: 'run', definition: 'To have a fever or runny nose, or to move fast on foot.', meaning_1: 'To have a symptom', example_sentence_1: 'The little boy is running a high fever today.', meaning_2: 'To move fast', example_sentence_2: 'I try to run five kilometers every morning.' }
        ]
    },
    {
        lesson_id: 'lesson-009-06', title: 'Taking Medication', focus_word: 'pill', main_sentence: 'You should take one pill every morning after breakfast.',
        vocabulary: [
            { term: 'pill', definition: 'A small solid piece of medicine, or an annoying person.', meaning_1: 'A piece of medicine', example_sentence_1: 'The doctor prescribed a sleeping pill for my insomnia.', meaning_2: 'An annoying person', example_sentence_2: 'My little brother can be a real pill sometimes.' },
            { term: 'take', definition: 'To swallow medicine, or to carry something with you.', meaning_1: 'To swallow (Medicine)', example_sentence_1: 'Do not forget to take your vitamins with a glass of water.', meaning_2: 'To carry or bring', example_sentence_2: 'Remember to take your umbrella; it looks like rain.' }
        ]
    },
    {
        lesson_id: 'lesson-009-07', title: 'Medical Treatment', focus_word: 'treatment', main_sentence: 'The hospital provides excellent treatment for heart conditions.',
        vocabulary: [
            { term: 'treatment', definition: 'Medical care given to a patient, or the way you behave towards someone.', meaning_1: 'Medical care', example_sentence_1: 'This new cancer treatment has shown very promising results.', meaning_2: 'Behavior towards someone', example_sentence_2: 'The workers complained about unfair treatment from the boss.' },
            { term: 'condition', definition: 'A medical illness or disease, or the state something is in.', meaning_1: 'A medical illness', example_sentence_1: 'He has a rare heart condition that requires surgery.', meaning_2: 'The physical state', example_sentence_2: 'The used car I bought is still in excellent condition.' }
        ]
    },
    {
        lesson_id: 'lesson-009-08', title: 'Recovering', focus_word: 'recover', main_sentence: 'It took him a few weeks to fully recover from the surgery.',
        vocabulary: [
            { term: 'recover', definition: 'To become healthy again, or to find something that was lost.', meaning_1: 'To get better / Heal', example_sentence_1: 'She needs plenty of rest to recover from the flu.', meaning_2: 'To find stolen/lost items', example_sentence_2: 'The police managed to recover the stolen paintings.' },
            { term: 'operation', definition: 'A medical surgery, or the fact of a business working.', meaning_1: 'Medical surgery', example_sentence_1: 'The patient is preparing for a heart operation tomorrow.', meaning_2: 'Business functioning', example_sentence_2: 'The new factory will begin operation next month.' }
        ]
    },
    {
        lesson_id: 'lesson-009-09', title: 'Blood Test', focus_word: 'blood', main_sentence: 'The nurse needs to take a small blood sample for testing.',
        vocabulary: [
            { term: 'blood', definition: 'The red liquid in human bodies, or family origin/descent.', meaning_1: 'Red body liquid', example_sentence_1: 'He loses his balance when he sees a drop of blood.', meaning_2: 'Family origin', example_sentence_2: 'They are not related by blood, but they are like brothers.' },
            { term: 'draw', definition: 'To extract a liquid like blood, or to make a picture with a pen.', meaning_1: 'To extract (Blood)', example_sentence_1: 'The nurse will draw some blood to check your cholesterol.', meaning_2: 'To sketch a picture', example_sentence_2: 'Can you draw a map to show me the way?' }
        ]
    },
    {
        lesson_id: 'lesson-009-10', title: 'Physical Pain', focus_word: 'hurt', main_sentence: 'Does your arm hurt when you lift something heavy?',
        vocabulary: [
            { term: 'hurt', definition: 'To feel or cause physical pain, or to be emotionally upset.', meaning_1: 'To feel physical pain', example_sentence_1: 'My ankle hurts a lot when I try to walk on it.', meaning_2: 'To feel emotionally upset', example_sentence_2: 'She was deeply hurt by his angry comments.' },
            { term: 'lift', definition: 'To raise something upwards, or a machine that moves people up floors.', meaning_1: 'To raise upwards', example_sentence_1: 'You should bend your knees when you lift heavy boxes.', meaning_2: 'An elevator (UK)', example_sentence_2: 'We took the lift to the tenth floor of the hotel.' }
        ]
    },
    {
        lesson_id: 'lesson-009-11', title: 'Doctor\'s Appointment', focus_word: 'appointment', main_sentence: 'I have a doctor\'s appointment at three o\'clock this afternoon.',
        vocabulary: [
            { term: 'appointment', definition: 'A scheduled meeting with a professional, or assigning a job to someone.', meaning_1: 'A scheduled medical visit', example_sentence_1: 'I need to call the clinic to cancel my dental appointment.', meaning_2: 'Assigning a job', example_sentence_2: 'His appointment as the new CEO surprised everyone.' },
            { term: 'see', definition: 'To consult a doctor, or to perceive with the eyes.', meaning_1: 'To visit a doctor', example_sentence_1: 'You really should see a doctor about that terrible cough.', meaning_2: 'To perceive with eyes', example_sentence_2: 'I cannot see the road clearly because of the heavy fog.' }
        ]
    },
    {
        lesson_id: 'lesson-009-12', title: 'At the Pharmacy', focus_word: 'pharmacy', main_sentence: 'You can pick up your medicine at the pharmacy downstairs.',
        vocabulary: [
            { term: 'pharmacy', definition: 'A shop where medicines are prepared and sold, or the science of drugs.', meaning_1: 'A medicine shop', example_sentence_1: 'The pharmacy is open twenty-four hours a day for emergencies.', meaning_2: 'Science of medicinal drugs', example_sentence_2: 'She is studying pharmacy at the medical university.' },
            { term: 'pick up', definition: 'To collect something from a place, or to learn something casually.', meaning_1: 'To collect an item', example_sentence_1: 'Do not forget to pick up the prescription on your way home.', meaning_2: 'To learn casually', example_sentence_2: 'Children quickly pick up new languages when living abroad.' }
        ]
    },

    // --- COURSE 10: BUSINESS ---
    {
        lesson_id: 'lesson-010-01', title: 'Business Meetings', focus_word: 'meeting', main_sentence: 'We have a very important meeting with the new clients today.',
        vocabulary: [
            { term: 'meeting', definition: 'A formal gathering of people for business, or coming together by chance.', meaning_1: 'A business gathering', example_sentence_1: 'The marketing meeting has been postponed to tomorrow morning.', meaning_2: 'A chance encounter', example_sentence_2: 'Their first meeting happened in a small coffee shop in Paris.' },
            { term: 'client', definition: 'A person who pays for professional services, or a computer program.', meaning_1: 'A professional customer', example_sentence_1: 'The lawyer has an important dinner with his biggest client.', meaning_2: 'A computer program', example_sentence_2: 'You need to update your email client to the latest version.' }
        ]
    },
    {
        lesson_id: 'lesson-010-02', title: 'Closing a Deal', focus_word: 'deal', main_sentence: 'We finally closed the deal after months of intense negotiation.',
        vocabulary: [
            { term: 'deal', definition: 'A business agreement or contract, or to distribute playing cards.', meaning_1: 'A business agreement', example_sentence_1: 'The two tech companies signed a multi-million dollar deal.', meaning_2: 'To distribute cards', example_sentence_2: 'It is your turn to shuffle and deal the cards.' },
            { term: 'close', definition: 'To finalize a business agreement, or to shut something.', meaning_1: 'To finalize an agreement', example_sentence_1: 'The salesman managed to close three deals this week.', meaning_2: 'To shut (A door/window)', example_sentence_2: 'Please close the door gently when you leave the office.' }
        ]
    },
    {
        lesson_id: 'lesson-010-03', title: 'Managing a Team', focus_word: 'manage', main_sentence: 'It is not easy to manage a team of fifty people.',
        vocabulary: [
            { term: 'manage', definition: 'To be in charge of a business or team, or to succeed in doing something difficult.', meaning_1: 'To be in charge of', example_sentence_1: 'She was hired to manage the new branch in London.', meaning_2: 'To succeed in doing', example_sentence_2: 'I finally managed to fix the broken printer.' },
            { term: 'team', definition: 'A group of people working together, or a group playing a sport.', meaning_1: 'A group of workers', example_sentence_1: 'Our development team is working hard to meet the deadline.', meaning_2: 'A sports group', example_sentence_2: 'The local baseball team won the regional championship.' }
        ]
    },
    {
        lesson_id: 'lesson-010-04', title: 'The Company', focus_word: 'company', main_sentence: 'She works for a large international software company.',
        vocabulary: [
            { term: 'company', definition: 'A commercial business organization, or the presence of other people.', meaning_1: 'A business organization', example_sentence_1: 'He invested all his savings in a start-up company.', meaning_2: 'Presence of others', example_sentence_2: 'I enjoy my own company, so I do not mind traveling alone.' },
            { term: 'work', definition: 'To perform duties for a job, or for a machine to function properly.', meaning_1: 'To do a job', example_sentence_1: 'I usually work from home on Tuesdays and Thursdays.', meaning_2: 'To function (Machine)', example_sentence_2: 'The office elevator has not worked properly for two days.' }
        ]
    },
    {
        lesson_id: 'lesson-010-05', title: 'At the Office', focus_word: 'office', main_sentence: 'Our main office is located right in the city center.',
        vocabulary: [
            { term: 'office', definition: 'A room or building used for business, or an important public position.', meaning_1: 'A workplace / Building', example_sentence_1: 'Please leave the documents on my desk in the office.', meaning_2: 'An authoritative position', example_sentence_2: 'He is running for the office of city mayor next year.' },
            { term: 'branch', definition: 'A local division of a large business, or a part of a tree.', meaning_1: 'A local business office', example_sentence_1: 'The bank is opening a new branch in our neighborhood.', meaning_2: 'A part of a tree', example_sentence_2: 'The bird built its nest on the highest branch of the oak.' }
        ]
    },
    {
        lesson_id: 'lesson-010-06', title: 'Target Market', focus_word: 'market', main_sentence: 'We need to research the target market before launching the product.',
        vocabulary: [
            { term: 'market', definition: 'The demand for a product, or an open place selling food.', meaning_1: 'Business demand / Industry', example_sentence_1: 'The smartphone market is highly competitive right now.', meaning_2: 'A public grocery area', example_sentence_2: 'I bought some fresh vegetables from the farmers\' market.' },
            { term: 'launch', definition: 'To start a new business/product, or to send a rocket into space.', meaning_1: 'To release a product', example_sentence_1: 'The tech company will launch its new software next week.', meaning_2: 'To send into the air', example_sentence_2: 'NASA plans to launch a new satellite into orbit.' }
        ]
    },
    {
        lesson_id: 'lesson-010-07', title: 'Signing a Contract', focus_word: 'contract', main_sentence: 'Please read the contract carefully before signing it.',
        vocabulary: [
            { term: 'contract', definition: 'A written legal agreement, or to catch an illness / shrink.', meaning_1: 'A legal business agreement', example_sentence_1: 'We signed a two-year contract with the supplier.', meaning_2: 'To catch a disease', example_sentence_2: 'He contracted a rare virus while traveling abroad.' },
            { term: 'sign', definition: 'To write one\'s signature, or a symbol indicating something.', meaning_1: 'To write a signature', example_sentence_1: 'Please sign at the bottom of the last page.', meaning_2: 'An indicator / Notice', example_sentence_2: 'Dark clouds are a sign that it is going to rain.' }
        ]
    },
    {
        lesson_id: 'lesson-010-08', title: 'Company Staff', focus_word: 'staff', main_sentence: 'Our company has a dedicated staff of over two hundred people.',
        vocabulary: [
            { term: 'staff', definition: 'The group of employees in a business, or a long wooden stick.', meaning_1: 'A group of employees', example_sentence_1: 'The hotel staff is very friendly and helpful to guests.', meaning_2: 'A wooden walking stick', example_sentence_2: 'The old wizard leaned heavily on his wooden staff.' },
            { term: 'employ', definition: 'To give work to someone, or to make use of a method.', meaning_1: 'To hire for work', example_sentence_1: 'The factory employs over five hundred local workers.', meaning_2: 'To make use of', example_sentence_2: 'The author employs a lot of humor in his writing.' }
        ]
    },
    {
        lesson_id: 'lesson-010-09', title: 'Financial Reports', focus_word: 'report', main_sentence: 'I will send you the financial report by the end of the day.',
        vocabulary: [
            { term: 'report', definition: 'A document containing information, or a loud noise like a gunshot.', meaning_1: 'An informational document', example_sentence_1: 'The sales report shows a decrease in profits this month.', meaning_2: 'A loud sudden noise', example_sentence_2: 'We heard the sharp report of a rifle in the distance.' },
            { term: 'account', definition: 'A record of money at a bank/business, or a spoken description of an event.', meaning_1: 'A financial record / Client', example_sentence_1: 'We just lost our biggest advertising account.', meaning_2: 'A description / Story', example_sentence_2: 'The witness gave a detailed account of the accident.' }
        ]
    },
    {
        lesson_id: 'lesson-010-10', title: 'Leading a Project', focus_word: 'lead', main_sentence: 'She was chosen to lead the new marketing campaign.',
        vocabulary: [
            { term: 'lead', definition: 'To be in charge or guide others, or a heavy grey metal.', meaning_1: 'To guide / Manage', example_sentence_1: 'A good manager must know how to lead by example.', meaning_2: 'A heavy metal', example_sentence_2: 'The pipes in this old house are made of lead.' },
            { term: 'head', definition: 'The person in charge of a department, or the top part of the body.', meaning_1: 'The boss / Director', example_sentence_1: 'She is the head of the human resources department.', meaning_2: 'Top body part', example_sentence_2: 'He wore a thick winter hat on his head.' }
        ]
    },
    {
        lesson_id: 'lesson-010-11', title: 'Hiring New Staff', focus_word: 'hire', main_sentence: 'We are planning to hire three new software engineers.',
        vocabulary: [
            { term: 'hire', definition: 'To employ someone for wages, or to rent something temporarily.', meaning_1: 'To employ someone', example_sentence_1: 'The restaurant needs to hire more waiters for the summer.', meaning_2: 'To rent (UK English)', example_sentence_2: 'We decided to hire a car to drive around the island.' },
            { term: 'position', definition: 'A job title in a company, or the physical placement of something.', meaning_1: 'A job role', example_sentence_1: 'He applied for a management position at the bank.', meaning_2: 'Physical placement', example_sentence_2: 'Make sure the television is in the correct position.' }
        ]
    },
    {
        lesson_id: 'lesson-010-12', title: 'Being Dismissed', focus_word: 'fire', main_sentence: 'The manager had to fire him for being late every day.',
        vocabulary: [
            { term: 'fire', definition: 'To dismiss someone from a job, or flames destroying something.', meaning_1: 'To dismiss from a job', example_sentence_1: 'If you keep missing deadlines, they will fire you.', meaning_2: 'Flames / Combustion', example_sentence_2: 'The fire destroyed three houses in the neighborhood.' },
            { term: 'break', definition: 'A pause from working, or to separate into pieces.', meaning_1: 'A pause / Rest', example_sentence_1: 'Let us take a ten-minute coffee break before we continue.', meaning_2: 'To shatter / Damage', example_sentence_2: 'Be careful not to break the fragile glass.' }
        ]
    },

    // --- COURSE 11: EMERGENCY ---
    {
        lesson_id: 'lesson-011-01', title: 'Asking for Help', focus_word: 'help', main_sentence: 'Help! I need an ambulance right now.',
        vocabulary: [
            { term: 'help', definition: 'To assist someone in danger, or to be unable to prevent oneself from doing something.', meaning_1: 'To assist / Save', example_sentence_1: 'Please call for help, my friend is seriously injured.', meaning_2: 'Cannot avoid doing', example_sentence_2: 'The joke was so funny that I could not help laughing.' },
            { term: 'call', definition: 'To make a telephone connection, or to shout loudly.', meaning_1: 'To telephone someone', example_sentence_1: 'Quickly, call the emergency number and ask for an ambulance.', meaning_2: 'To shout or cry out', example_sentence_2: 'I heard someone call for help from the dark alley.' }
        ]
    },
    {
        lesson_id: 'lesson-011-02', title: 'Calling the Police', focus_word: 'police', main_sentence: 'Someone stole my bag, please call the police immediately.',
        vocabulary: [
            { term: 'police', definition: 'The official organization that enforces laws, or to regulate/monitor an activity.', meaning_1: 'Law enforcement officers', example_sentence_1: 'The police arrived at the crime scene within five minutes.', meaning_2: 'To monitor / Regulate', example_sentence_2: 'It is very difficult to police the content on the internet.' },
            { term: 'steal', definition: 'To take something without permission, or a surprisingly good bargain.', meaning_1: 'To take illegally', example_sentence_1: 'A thief managed to steal my wallet on the crowded train.', meaning_2: 'A great bargain', example_sentence_2: 'I bought this designer jacket for twenty dollars; it was a steal!' }
        ]
    },
    {
        lesson_id: 'lesson-011-03', title: 'Medical Emergency', focus_word: 'emergency', main_sentence: 'Please remain calm, this is a medical emergency.',
        vocabulary: [
            { term: 'emergency', definition: 'A serious and unexpected situation, or the hospital department for urgent care.', meaning_1: 'An urgent crisis', example_sentence_1: 'In case of a fire emergency, use the stairs instead of the elevator.', meaning_2: 'Hospital ER', example_sentence_2: 'We rushed him straight to the emergency room at the hospital.' },
            { term: 'exit', definition: 'A way out of a building, or the act of leaving a situation.', meaning_1: 'A door to leave', example_sentence_1: 'The emergency exit is located at the back of the airplane.', meaning_2: 'The act of leaving', example_sentence_2: 'The CEO made a quick exit after the disastrous meeting.' }
        ]
    },
    {
        lesson_id: 'lesson-011-04', title: 'Being in Danger', focus_word: 'danger', main_sentence: 'Keep away from the edge of the cliff, you are in danger.',
        vocabulary: [
            { term: 'danger', definition: 'The possibility of suffering harm, or a person/thing that causes harm.', meaning_1: 'Risk of harm', example_sentence_1: 'The red sign warns drivers of the danger of falling rocks.', meaning_2: 'A cause of harm', example_sentence_2: 'That wild dog is a real danger to the neighborhood children.' },
            { term: 'safe', definition: 'Protected from or not exposed to danger, or a strongbox for valuables.', meaning_1: 'Secure / Protected', example_sentence_1: 'Make sure you stay in a safe place during the storm.', meaning_2: 'A strong metal box', example_sentence_2: 'He keeps all his important documents locked in a safe.' }
        ]
    },
    {
        lesson_id: 'lesson-011-05', title: 'Reporting an Accident', focus_word: 'accident', main_sentence: 'There has been a terrible car accident on the highway.',
        vocabulary: [
            { term: 'accident', definition: 'An unfortunate incident like a crash, or something happening without intention.', meaning_1: 'A crash / Disaster', example_sentence_1: 'He broke his leg in a serious motorcycle accident.', meaning_2: 'Without intention', example_sentence_2: 'I deleted the important file completely by accident.' },
            { term: 'hit', definition: 'To strike someone or something with force, or a highly successful song/movie.', meaning_1: 'To strike with force', example_sentence_1: 'The speeding car almost hit the pedestrian on the crosswalk.', meaning_2: 'A massive success', example_sentence_2: 'Her new song became an instant hit on the radio.' }
        ]
    },
    {
        lesson_id: 'lesson-011-06', title: 'Fire Alarm', focus_word: 'alarm', main_sentence: 'Please pull the fire alarm and leave the building.',
        vocabulary: [
            { term: 'alarm', definition: 'A warning sound of danger, or a sudden feeling of fear.', meaning_1: 'A warning sound/device', example_sentence_1: 'The smoke triggered the fire alarm in the kitchen.', meaning_2: 'Sudden fear or panic', example_sentence_2: 'The news of the approaching storm caused great alarm.' },
            { term: 'sound', definition: 'Vibrations that travel through the air, or to be in good condition.', meaning_1: 'A noise you can hear', example_sentence_1: 'I heard a strange sound coming from the car engine.', meaning_2: 'In good condition / Logical', example_sentence_2: 'Buying that house was a very sound investment.' }
        ]
    },
    {
        lesson_id: 'lesson-011-07', title: 'Breathing Difficulties', focus_word: 'breathe', main_sentence: 'He is choking and cannot breathe properly.',
        vocabulary: [
            { term: 'breathe', definition: 'To take air into the lungs, or to feel a sense of relief.', meaning_1: 'To take in air', example_sentence_1: 'It is so smoky in here that I can hardly breathe.', meaning_2: 'To feel relief', example_sentence_2: 'We can finally breathe easily now that the test is over.' },
            { term: 'choke', definition: 'To be unable to breathe due to a blockage, or to fail under pressure.', meaning_1: 'To be unable to breathe', example_sentence_1: 'Be careful with that small toy, the baby might choke on it.', meaning_2: 'To fail under pressure (Sports)', example_sentence_2: 'The team choked in the final minutes of the championship game.' }
        ]
    },
    {
        lesson_id: 'lesson-011-08', title: 'Stopping the Bleeding', focus_word: 'bleed', main_sentence: 'Press firmly on the wound to stop it from bleeding.',
        vocabulary: [
            { term: 'bleed', definition: 'To lose blood from the body, or to drain money from a business.', meaning_1: 'To lose blood', example_sentence_1: 'My nose started to bleed after the football hit my face.', meaning_2: 'To lose money or resources', example_sentence_2: 'The company has been bleeding money for the last three years.' },
            { term: 'press', definition: 'To apply physical force, or the journalists and news media.', meaning_1: 'To push / Apply force', example_sentence_1: 'Press the red button to stop the machine immediately.', meaning_2: 'Journalists / News media', example_sentence_2: 'The mayor refused to answer any questions from the press.' }
        ]
    },
    {
        lesson_id: 'lesson-011-09', title: 'Reporting a Theft', focus_word: 'rob', main_sentence: 'I was robbed while walking back to my hotel last night.',
        vocabulary: [
            { term: 'rob', definition: 'To steal from someone by force, or to unfairly deprive someone of something.', meaning_1: 'To steal by force', example_sentence_1: 'Two men tried to rob the local bank yesterday.', meaning_2: 'To unfairly deprive', example_sentence_2: 'The referee\'s bad decision robbed them of a victory.' },
            { term: 'wallet', definition: 'A small folding case for paper money, or a digital container for cryptocurrency.', meaning_1: 'A case for physical money', example_sentence_1: 'I think I left my leather wallet on the restaurant table.', meaning_2: 'Digital crypto storage', example_sentence_2: 'Make sure your crypto wallet is protected with a strong password.' }
        ]
    },
    {
        lesson_id: 'lesson-011-10', title: 'Animal Attack', focus_word: 'attack', main_sentence: 'He was attacked by a wild animal in the forest.',
        vocabulary: [
            { term: 'attack', definition: 'A violent physical action against someone, or to strongly criticize.', meaning_1: 'A violent physical action', example_sentence_1: 'The dog will not attack unless it feels threatened.', meaning_2: 'To strongly criticize', example_sentence_2: 'The politician attacked his opponent\'s new tax policies.' },
            { term: 'wild', definition: 'Living in a natural, untamed state, or crazy and out of control.', meaning_1: 'Untamed (Animals/Plants)', example_sentence_1: 'We saw lots of wild horses during our trip to the mountains.', meaning_2: 'Crazy / Out of control', example_sentence_2: 'The crowd went wild when the band started playing their hit song.' }
        ]
    },
    {
        lesson_id: 'lesson-011-11', title: 'Fainting', focus_word: 'faint', main_sentence: 'She felt dizzy and fainted from the extreme heat.',
        vocabulary: [
            { term: 'faint', definition: 'To lose consciousness temporarily, or barely perceptible/slight.', meaning_1: 'To lose consciousness', example_sentence_1: 'He fainted when he saw the needle at the hospital.', meaning_2: 'Barely noticeable / Slight', example_sentence_2: 'There is a faint smell of gas coming from the kitchen.' },
            { term: 'heat', definition: 'A high temperature, or pressure and intense criticism.', meaning_1: 'High temperature', example_sentence_1: 'The summer heat in this city can be unbearable.', meaning_2: 'Pressure / Criticism', example_sentence_2: 'The manager is feeling the heat after losing three games in a row.' }
        ]
    },
    {
        lesson_id: 'lesson-011-12', title: 'Emergency Rescue', focus_word: 'rescue', main_sentence: 'The firefighters arrived quickly to rescue the trapped family.',
        vocabulary: [
            { term: 'rescue', definition: 'To save someone from a dangerous situation, or a mission to save someone.', meaning_1: 'To save from danger', example_sentence_1: 'The lifeguard had to rescue a swimmer who went too far out.', meaning_2: 'A saving mission', example_sentence_2: 'The mountain rescue team worked all night to find the hikers.' },
            { term: 'trap', definition: 'A device to catch animals, or a bad situation that is hard to escape.', meaning_1: 'An animal catcher', example_sentence_1: 'They set a mouse trap in the basement with some cheese.', meaning_2: 'A trick or difficult situation', example_sentence_2: 'The incredibly low price was just a trap to get my credit card details.' }
        ]
    }
];

async function insertBatchData() {
    try {
        console.log(`📦 ${lessonData.length} derslik veri paketi işleniyor...`);

        for (const data of lessonData) {
            const parts = data.lesson_id.split('-');
            const courseId = `course-${parts[1]}`;
            const lessonOrder = parseInt(parts[2], 10);

            // 👇 Artık yeni yazdığımız şık başlıkları kullanıyoruz 👇
            const title = data.title;

            // 1. Dersi EKLE (Eğer varsa GÜNCELLE)
            await query(`
                INSERT INTO lessons 
                (id, course_id, title, description, lesson_order, total_steps, focus_word, main_sentence)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                ON DUPLICATE KEY UPDATE 
                    focus_word = VALUES(focus_word), 
                    main_sentence = VALUES(main_sentence),
                    title = VALUES(title)
            `, [
                data.lesson_id,
                courseId,
                title,
                'Practice everyday English',
                lessonOrder,
                10,
                data.focus_word,
                data.main_sentence
            ]);

            // 2. Kelimeleri temizle ve ekle
            await query(`DELETE FROM lesson_vocabulary WHERE lesson_id = ?`, [data.lesson_id]);

            let displayOrder = 1;
            for (const voc of data.vocabulary) {
                const vocId = `voc-${data.lesson_id.replace('lesson-', '')}-${displayOrder}`;

                await query(`
                    INSERT INTO lesson_vocabulary 
                    (id, lesson_id, term, definition, meaning_1, example_sentence_1, meaning_2, example_sentence_2, display_order)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                `, [
                    vocId, data.lesson_id, voc.term, voc.definition,
                    voc.meaning_1, voc.example_sentence_1,
                    voc.meaning_2, voc.example_sentence_2,
                    displayOrder
                ]);
                displayOrder++;
            }
        }
        console.log('🎉 Parti başarıyla veritabanına işlendi ve şık başlıklar eklendi!');
    } catch (error) {
        console.error('❌ Bir hata oluştu:', error);
    } finally {
        process.exit(0);
    }
}

insertBatchData();