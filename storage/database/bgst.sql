/*
Navicat MySQL Data Transfer

Source Server         : Local
Source Server Version : 50508
Source Host           : localhost:3306
Source Database       : bgst

Target Server Type    : MYSQL
Target Server Version : 50508
File Encoding         : 65001

Date: 2013-04-22 18:51:52
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `achievement`
-- ----------------------------
DROP TABLE IF EXISTS `achievement`;
CREATE TABLE `achievement` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(25) NOT NULL,
  `description` text NOT NULL,
  `image` varchar(25) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of achievement
-- ----------------------------

-- ----------------------------
-- Table structure for `achievement_awarded`
-- ----------------------------
DROP TABLE IF EXISTS `achievement_awarded`;
CREATE TABLE `achievement_awarded` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `achievement_id` int(10) unsigned NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of achievement_awarded
-- ----------------------------

-- ----------------------------
-- Table structure for `event`
-- ----------------------------
DROP TABLE IF EXISTS `event`;
CREATE TABLE `event` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `event_type_id` int(10) unsigned NOT NULL,
  `session_id` int(10) unsigned DEFAULT NULL,
  `processed_status` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of event
-- ----------------------------

-- ----------------------------
-- Table structure for `event_type`
-- ----------------------------
DROP TABLE IF EXISTS `event_type`;
CREATE TABLE `event_type` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(25) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of event_type
-- ----------------------------

-- ----------------------------
-- Table structure for `game`
-- ----------------------------
DROP TABLE IF EXISTS `game`;
CREATE TABLE `game` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `title` varchar(50) NOT NULL,
  `session_count` int(10) unsigned NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of game
-- ----------------------------
INSERT INTO `game` VALUES ('1', '1', 'Dominion', '1', '2013-04-18 00:00:00', '2013-04-18 00:00:00');
INSERT INTO `game` VALUES ('2', '1', 'Race for the Galaxy', '3', '2013-04-18 00:00:00', '2013-04-18 00:00:00');
INSERT INTO `game` VALUES ('3', '1', 'Eclipse', '6', '2013-04-18 00:00:00', '2013-04-18 00:00:00');

-- ----------------------------
-- Table structure for `player`
-- ----------------------------
DROP TABLE IF EXISTS `player`;
CREATE TABLE `player` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of player
-- ----------------------------
INSERT INTO `player` VALUES ('1', '1', 'Tim Test');
INSERT INTO `player` VALUES ('2', '1', 'Todd Test');

-- ----------------------------
-- Table structure for `player_outcome`
-- ----------------------------
DROP TABLE IF EXISTS `player_outcome`;
CREATE TABLE `player_outcome` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `player_id` int(10) unsigned NOT NULL,
  `session_id` int(10) unsigned NOT NULL,
  `score` int(10) DEFAULT NULL,
  `win_status` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of player_outcome
-- ----------------------------
INSERT INTO `player_outcome` VALUES ('1', '1', '1', '10', '0');
INSERT INTO `player_outcome` VALUES ('2', '2', '1', '15', '0');

-- ----------------------------
-- Table structure for `session`
-- ----------------------------
DROP TABLE IF EXISTS `session`;
CREATE TABLE `session` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `game_id` int(10) unsigned NOT NULL,
  `title` varchar(50) NOT NULL,
  `date` datetime NOT NULL,
  `summary` text,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of session
-- ----------------------------
INSERT INTO `session` VALUES ('1', '1', '1', 'Dominion Fest', '2013-04-18 06:00:00', 'This is a long summary. This is a long summary. This is a long summary. This is a long summary. This is a long summary. This is a long summary. This is a long summary. This is a long summary. This is a long summary. ', '2013-04-18 06:00:00', '2013-04-18 06:00:00');

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `password` varchar(60) NOT NULL,
  `first_name` varchar(25) NOT NULL,
  `last_name` varchar(25) NOT NULL,
  `state` varchar(2) DEFAULT NULL,
  `country` varchar(30) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'nicholascassidy@gmail.com', '$2a$08$UFdqY0haeU9jbnB4NkxNVuJotGSBzqzY6QuuQvtZUet15rTls8LRa', 'Nicholas', 'Cassidy', 'CO', 'USA', '2013-04-15 21:45:10', '2013-04-15 21:45:15');
INSERT INTO `user` VALUES ('2', 'metalfour@hotmail.com', 'test', 'Test', 'User', null, 'USA', '2013-04-22 15:34:06', '2013-04-22 15:34:06');
INSERT INTO `user` VALUES ('3', 'fart@fart.com', 'fart', 'Nick', 'Cass', null, 'USA', '2013-04-22 15:48:29', '2013-04-22 15:48:29');
INSERT INTO `user` VALUES ('4', 'test@test.com', 'pass', 'first', 'last', null, 'USA', '2013-04-22 15:56:06', '2013-04-22 15:56:06');
INSERT INTO `user` VALUES ('5', 'fart2@fart2.com', 'fart', 'Nick', 'Cass.', null, 'USA', '2013-04-22 16:02:23', '2013-04-22 16:02:23');
INSERT INTO `user` VALUES ('6', 'fart3@fart2.com', 'fart2', 'Nick', 'Cassi', null, 'USA', '2013-04-22 16:03:04', '2013-04-22 16:03:04');
INSERT INTO `user` VALUES ('7', 'nicholascassidy', 'fart', 'First', 'Last', null, 'USA', '2013-04-22 18:18:05', '2013-04-22 18:18:05');

-- ----------------------------
-- Table structure for `user_outcome`
-- ----------------------------
DROP TABLE IF EXISTS `user_outcome`;
CREATE TABLE `user_outcome` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `session_id` int(10) unsigned NOT NULL,
  `score` int(10) DEFAULT NULL,
  `win_status` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_outcome
-- ----------------------------
INSERT INTO `user_outcome` VALUES ('1', '1', '1', '20', '1');
