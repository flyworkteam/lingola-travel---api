-- Migration: Add OneSignal device tracking columns to users table
-- Date: 2024-01-XX
-- Description: Add onesignal_player_id and device_platform columns for push notification management

-- Add OneSignal player ID column
ALTER TABLE users 
ADD COLUMN onesignal_player_id VARCHAR(255) NULL 
COMMENT 'OneSignal unique device identifier' 
AFTER device_id;

-- Add device platform column
ALTER TABLE users 
ADD COLUMN device_platform ENUM('ios', 'android', 'web') NULL 
COMMENT 'User device platform for push notifications' 
AFTER onesignal_player_id;

-- Add index for faster lookups
ALTER TABLE users 
ADD INDEX idx_onesignal_player (onesignal_player_id);

-- Show updated table structure
DESCRIBE users;
