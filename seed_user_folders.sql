-- Insert default folders for current user
SET @user_id = '1c219af0-f0a3-4e0a-9ae8-3a447bf21ca1';

INSERT INTO library_folders (user_id, name, icon, color, item_count, created_at) VALUES
(@user_id, 'My Airport Essentials', 'assets/icons/airport.png', '#E3F2FD', 0, NOW()),
(@user_id, 'My Hotel Essentials', 'assets/icons/accommodation.png', '#FFE4CC', 0, NOW()),
(@user_id, 'Transport Essentials', 'assets/icons/transportation.png', '#FFF9C4', 0, NOW()),
(@user_id, 'My Food Essentials', 'assets/icons/food_drink.png', '#FFCDD2', 0, NOW()),
(@user_id, 'My Shopping Essentials', 'assets/icons/shopping.png', '#C8E6C9', 0, NOW()),
(@user_id, 'Culture Essentials', 'assets/icons/culture.png', '#B3E5FC', 0, NOW()),
(@user_id, 'Meeting Essentials', 'assets/icons/meeting.png', '#D7CCC8', 0, NOW()),
(@user_id, 'Sport Essentials', 'assets/icons/sport.png', '#F8BBD0', 0, NOW()),
(@user_id, 'Health Essentials', 'assets/icons/health.png', '#C5E1A5', 0, NOW()),
(@user_id, 'Business Essentials', 'assets/icons/business.png', '#BBDEFB', 0, NOW());

SELECT 'Folders created successfully!' as status;
SELECT COUNT(*) as total_folders FROM library_folders WHERE user_id = @user_id;
