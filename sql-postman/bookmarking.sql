-- --------------------------------------------------------
-- Sunucu:                       127.0.0.1
-- Sunucu sürümü:                5.7.24 - MySQL Community Server (GPL)
-- Sunucu İşletim Sistemi:       Win64
-- HeidiSQL Sürüm:               10.2.0.5599
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- bookmarking için veritabanı yapısı dökülüyor
CREATE DATABASE IF NOT EXISTS `bookmarking` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `bookmarking`;

-- tablo yapısı dökülüyor bookmarking.books
CREATE TABLE IF NOT EXISTS `books` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `bookId` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `link` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `books_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- bookmarking.books: ~0 rows (yaklaşık) tablosu için veriler indiriliyor
/*!40000 ALTER TABLE `books` DISABLE KEYS */;
INSERT INTO `books` (`id`, `userId`, `bookId`, `title`, `link`, `createdAt`, `updatedAt`) VALUES
	(1, 1, 'lLx2DwAAQBAJ', 'Ötekinin Gözünden Orhan Pamuk', 'https://play.google.com/store/books/details?id=lLx2DwAAQBAJ', '2022-05-01 09:43:40', '2022-05-01 09:43:40');
/*!40000 ALTER TABLE `books` ENABLE KEYS */;

-- tablo yapısı dökülüyor bookmarking.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `pass` varchar(255) NOT NULL,
  `token` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- bookmarking.users: ~1 rows (yaklaşık) tablosu için veriler indiriliyor
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `name`, `email`, `pass`, `token`, `createdAt`, `updatedAt`) VALUES
	(1, 'Fatma Kaya', 'kaya.fatma.kaya@hotmail.com', '6bbfab550f5436fb0a3a57a06df282c71e9137dc9090a6b3645078fe2c60f489', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mbyI6eyJpZCI6MSwiZW1haWwiOiJrYXlhLmZhdG1hLmtheWFAaG90bWFpbC5jb20iLCJuYW1lIjoiRmF0bWEgS2F5YSJ9LCJpYXQiOjE2NTEzOTc0NjYsImV4cCI6MTY1MjI2MTQ2Nn0.aDse6VV0cbmP7Vzi-VxNCvKoIO4nmgSl16mbxLiR7mc', '2022-05-01 09:29:38', '2022-05-01 09:31:06');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
