-- Migration: 024_add_multilingual_support.sql
-- Description: Add multi-language support to content tables
-- Date: 2026-02-15
-- Purpose: Support all target languages (en, de, it, fr, ja, es, ru, tr, ko, hi, pt)

-- =====================================================================
-- 1. ADD LANGUAGE COLUMNS TO TRAVEL PHRASES
-- =====================================================================
ALTER TABLE travel_phrases 
  ADD source_language VARCHAR(10) DEFAULT 'tr' COMMENT 'Source language code (ISO 639-1)',
  ADD target_language VARCHAR(10) NOT NULL DEFAULT 'en' COMMENT 'Target learning language',
  ADD INDEX idx_languages (source_language, target_language),
  ADD INDEX idx_target_lang (target_language);

-- Update existing records to have explicit language markers
UPDATE travel_phrases SET 
  source_language = 'tr',
  target_language = 'en'
WHERE target_language = '' OR target_language IS NULL;

-- =====================================================================
-- 2. ADD LANGUAGE COLUMNS TO DICTIONARY WORDS
-- =====================================================================
ALTER TABLE dictionary_words 
  ADD source_language VARCHAR(10) DEFAULT 'tr' COMMENT 'Source language code',
  ADD target_language VARCHAR(10) NOT NULL DEFAULT 'en' COMMENT 'Target learning language',
  ADD INDEX idx_languages (source_language, target_language, category_id),
  ADD INDEX idx_target_lang (target_language);

-- Update existing records
UPDATE dictionary_words SET 
  source_language = 'tr',
  target_language = 'en'
WHERE target_language = '' OR target_language IS NULL;

-- =====================================================================
-- 3. ADD LANGUAGE COLUMN TO COURSES
-- =====================================================================
ALTER TABLE courses
  ADD target_language VARCHAR(10) NOT NULL DEFAULT 'en' COMMENT 'Target learning language',
  ADD INDEX idx_target_language (target_language);

-- Update existing courses
UPDATE courses SET target_language = 'en'
WHERE target_language = '' OR target_language IS NULL;

-- =====================================================================
-- 4. ADD LANGUAGE COLUMN TO LESSONS
-- =====================================================================
ALTER TABLE lessons
  ADD target_language VARCHAR(10) NOT NULL DEFAULT 'en' COMMENT 'Target learning language',
  ADD INDEX idx_target_language (target_language);

-- Update existing lessons
UPDATE lessons SET target_language = 'en'
WHERE target_language = '' OR target_language IS NULL;

-- =====================================================================
-- 5. UPDATE LESSON VOCABULARY
-- =====================================================================
ALTER TABLE lesson_vocabulary
  ADD source_language VARCHAR(10) DEFAULT 'tr',
  ADD target_language VARCHAR(10) NOT NULL DEFAULT 'en',
  ADD INDEX idx_target_lang (target_language);

UPDATE lesson_vocabulary SET 
  source_language = 'tr',
  target_language = 'en'
WHERE target_language = '' OR target_language IS NULL;

-- =====================================================================
-- SUPPORTED LANGUAGES:
-- =====================================================================
/*
  en = English (İngilizce)
  de = German (Almanca)
  it = Italian (İtalyanca)
  fr = French (Fransızca)
  ja = Japanese (Japonca)
  es = Spanish (İspanyolca)
  ru = Russian (Rusça)
  tr = Turkish (Türkçe)
  ko = Korean (Korece)
  hi = Hindi (Hintçe)
  pt = Portuguese (Portekizce)
*/

-- =====================================================================
-- NOTES:
-- =====================================================================
/*
  1. source_language: Defaults to 'tr' (Turkish) but can be changed
  2. target_language: The language user wants to learn
  3. Content should be seeded for each target language
  4. API endpoints will filter by user's target_language from user_onboarding
  5. For now, all content is Turkish → Target Language
     Future: Can support other source languages
*/
