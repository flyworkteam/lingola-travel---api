-- ============================================
-- FIX VOCABULARY: Reduce to 2 items per lesson
-- Date: 2026-02-21
-- Description: 
--   1. Delete 3rd vocabulary item from lessons that have 3 items
--   2. Set display_order (1,2) for remaining items
--   3. Assign keyvoc1.svg and keyvoc2.svg icons
-- ============================================

USE lingola_travel;

-- Step 1: Find and delete the 3rd vocabulary item from each lesson
-- We'll keep the first 2 items based on the original id order
DELETE lv FROM lesson_vocabulary lv
INNER JOIN (
    SELECT 
        lesson_id,
        id,
        ROW_NUMBER() OVER (PARTITION BY lesson_id ORDER BY id) as rn
    FROM lesson_vocabulary
) ranked ON lv.id = ranked.id
WHERE ranked.rn > 2;

-- Step 2: Update display_order and icon_path for remaining items
-- First vocabulary item: display_order=1, icon=keyvoc1.svg
UPDATE lesson_vocabulary lv
INNER JOIN (
    SELECT 
        id,
        ROW_NUMBER() OVER (PARTITION BY lesson_id ORDER BY id) as rn
    FROM lesson_vocabulary
) ranked ON lv.id = ranked.id
SET 
    lv.display_order = 1,
    lv.icon_path = 'assets/icons/keyvoc1.svg'
WHERE ranked.rn = 1;

-- Second vocabulary item: display_order=2, icon=keyvoc2.svg
UPDATE lesson_vocabulary lv
INNER JOIN (
    SELECT 
        id,
        ROW_NUMBER() OVER (PARTITION BY lesson_id ORDER BY id) as rn
    FROM lesson_vocabulary
) ranked ON lv.id = ranked.id
SET 
    lv.display_order = 2,
    lv.icon_path = 'assets/icons/keyvoc2.svg'
WHERE ranked.rn = 2;

-- Step 3: Verification query - Check results
SELECT 
    c.target_language,
    c.category,
    COUNT(DISTINCT l.id) as total_lessons,
    COUNT(lv.id) as total_vocabulary,
    AVG(vocab_per_lesson) as avg_vocab_per_lesson
FROM courses c
INNER JOIN lessons l ON c.id = l.course_id
LEFT JOIN lesson_vocabulary lv ON l.id = lv.lesson_id
LEFT JOIN (
    SELECT lesson_id, COUNT(*) as vocab_per_lesson
    FROM lesson_vocabulary
    GROUP BY lesson_id
) vocab_stats ON l.id = vocab_stats.lesson_id
GROUP BY c.target_language, c.category
ORDER BY c.target_language, c.category;

-- Final verification: Show sample of updated data
SELECT 
    l.id as lesson_id,
    l.lesson_order,
    c.target_language,
    c.category,
    lv.term,
    lv.definition,
    lv.icon_path,
    lv.display_order
FROM lesson_vocabulary lv
INNER JOIN lessons l ON lv.lesson_id = l.id
INNER JOIN courses c ON l.course_id = c.id
WHERE c.target_language = 'it' AND c.category = 'General' AND l.lesson_order = 1
ORDER BY lv.display_order;
