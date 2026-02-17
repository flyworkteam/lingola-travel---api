-- Add more vocabulary for all lessons that have less than 3 vocabulary items
-- This script will add generic vocabulary based on lesson title and key term

-- Add 3 vocabulary items for each Spanish lesson
INSERT IGNORE INTO lesson_vocabulary (id, lesson_id, term, definition, icon_path, icon_color, display_order, target_language, source_language)
SELECT 
    CONCAT('vocab-', l.id, '-02') as id,
    l.id as lesson_id,
    CONCAT(l.key_vocabulary_term, ' 2') as term,
    CONCAT('Término relacionado con ', l.title, ' - Related term') as definition,
    'assets/icons/general.svg' as icon_path,
    '#4ECDC4' as icon_color,
    2 as display_order,
    l.target_language,
    'tr' as source_language
FROM lessons l
WHERE l.target_language IN ('es', 'en', 'it', 'fr', 'hi', 'ja', 'ko', 'pt', 'ru', 'de')
AND (SELECT COUNT(*) FROM lesson_vocabulary lv WHERE lv.lesson_id = l.id) < 2;

INSERT IGNORE INTO lesson_vocabulary (id, lesson_id, term, definition, icon_path, icon_color, display_order, target_language, source_language)
SELECT 
    CONCAT('vocab-', l.id, '-03') as id,
    l.id as lesson_id,
    CONCAT(l.key_vocabulary_term, ' 3') as term,
    CONCAT('Término relacionado con ', l.title, ' - Related term') as definition,
    'assets/icons/general.svg' as icon_path,
    '#4ECDC4' as icon_color,
    3 as display_order,
    l.target_language,
    'tr' as source_language
FROM lessons l
WHERE l.target_language IN ('es', 'en', 'it', 'fr', 'hi', 'ja', 'ko', 'pt', 'ru', 'de')
AND (SELECT COUNT(*) FROM lesson_vocabulary lv WHERE lv.lesson_id = l.id) < 3;
