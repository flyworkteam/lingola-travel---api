-- Update icon paths to match Flutter assets
UPDATE dictionary_categories SET icon_path = 'assets/images/general.png' WHERE name = 'Airport';
UPDATE dictionary_categories SET icon_path = 'assets/images/accomo.png' WHERE name = 'Accommodation'; 
UPDATE dictionary_categories SET icon_path = 'assets/images/trip.png' WHERE name = 'Transportation';
UPDATE dictionary_categories SET icon_path = 'assets/images/food.png' WHERE name = 'Food & Drink';
UPDATE dictionary_categories SET icon_path = 'assets/images/shope.png' WHERE name = 'Shopping';
UPDATE dictionary_categories SET icon_path = 'assets/images/culture.png' WHERE name = 'Culture';
UPDATE dictionary_categories SET icon_path = 'assets/images/direction.png' WHERE name = 'Meeting';
UPDATE dictionary_categories SET icon_path = 'assets/images/sport.png' WHERE name = 'Sport';
UPDATE dictionary_categories SET icon_path = 'assets/images/health.png' WHERE name = 'Health'; 
UPDATE dictionary_categories SET icon_path = 'assets/images/bussines.png' WHERE name = 'Business';

-- Check results
SELECT name, icon_path FROM dictionary_categories ORDER BY display_order;