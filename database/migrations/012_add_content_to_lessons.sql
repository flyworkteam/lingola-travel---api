-- Add content fields to lessons table for example sentences and key vocabulary
ALTER TABLE lessons 
ADD COLUMN example_sentence TEXT AFTER description,
ADD COLUMN key_vocabulary_term VARCHAR(255) AFTER example_sentence;

-- Update existing lessons with example sentences
-- These will be language-specific content that shows in lesson detail view
