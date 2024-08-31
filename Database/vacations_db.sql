-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 16, 2024 at 08:27 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vacations_db`
--
CREATE DATABASE IF NOT EXISTS `vacations_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `vacations_db`;

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `followId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `vacationId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `followers`
--

INSERT INTO `followers` (`followId`, `userId`, `vacationId`) VALUES
(183, 20, 43),
(184, 20, 40),
(185, 20, 41),
(186, 20, 46),
(188, 20, 45),
(189, 20, 47),
(190, 20, 49),
(191, 20, 42),
(210, 20, 49),
(221, 29, 40),
(257, 33, 94),
(258, 20, 44),
(259, 34, 48),
(260, 34, 45),
(261, 34, 94);

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `roleId` int(11) NOT NULL,
  `roleName` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`roleId`, `roleName`) VALUES
(1, 'admin'),
(2, 'user');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `firstName` varchar(30) NOT NULL,
  `lastName` varchar(30) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(300) NOT NULL,
  `roleId` int(11) NOT NULL DEFAULT 2
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `firstName`, `lastName`, `email`, `password`, `roleId`) VALUES
(18, 'yoni', 'golan', 'yoni@gmail.com', '951aca113a2e6ca93b8fb8f666f6665ef3879b74c0af66ee1a084d5103d0bec40fafdcdfefbe89becf3bb4f3566af715b97dec4320a161997e049be60887c22b', 1),
(19, 'itai', 'golan', 'itai@gmail.com', '951aca113a2e6ca93b8fb8f666f6665ef3879b74c0af66ee1a084d5103d0bec40fafdcdfefbe89becf3bb4f3566af715b97dec4320a161997e049be60887c22b', 1),
(20, 'shani', 'golan', 'shani@gmail.com', '951aca113a2e6ca93b8fb8f666f6665ef3879b74c0af66ee1a084d5103d0bec40fafdcdfefbe89becf3bb4f3566af715b97dec4320a161997e049be60887c22b', 2),
(21, 'shachar', 'golan', 'shachar@gmail.com', '951aca113a2e6ca93b8fb8f666f6665ef3879b74c0af66ee1a084d5103d0bec40fafdcdfefbe89becf3bb4f3566af715b97dec4320a161997e049be60887c22b', 2),
(22, 'itai', 'glikman', 'itaig1998@gmail.com', '951aca113a2e6ca93b8fb8f666f6665ef3879b74c0af66ee1a084d5103d0bec40fafdcdfefbe89becf3bb4f3566af715b97dec4320a161997e049be60887c22b', 2),
(23, 'gili', 'glikman', 'gili@gmail.com', '951aca113a2e6ca93b8fb8f666f6665ef3879b74c0af66ee1a084d5103d0bec40fafdcdfefbe89becf3bb4f3566af715b97dec4320a161997e049be60887c22b', 2),
(24, 'ran', 'sayda', 'ran@gmail.com', '951aca113a2e6ca93b8fb8f666f6665ef3879b74c0af66ee1a084d5103d0bec40fafdcdfefbe89becf3bb4f3566af715b97dec4320a161997e049be60887c22b', 2),
(25, 'gal', 'silverman', 'gal@gmail.com', '951aca113a2e6ca93b8fb8f666f6665ef3879b74c0af66ee1a084d5103d0bec40fafdcdfefbe89becf3bb4f3566af715b97dec4320a161997e049be60887c22b', 2),
(26, 'gali', 'glikman', 'gali@gmail.com', '951aca113a2e6ca93b8fb8f666f6665ef3879b74c0af66ee1a084d5103d0bec40fafdcdfefbe89becf3bb4f3566af715b97dec4320a161997e049be60887c22b', 2),
(27, 'orr', 'zadik', 'or@gmail.com', '951aca113a2e6ca93b8fb8f666f6665ef3879b74c0af66ee1a084d5103d0bec40fafdcdfefbe89becf3bb4f3566af715b97dec4320a161997e049be60887c22b', 2),
(28, 'or', 'zadik', 'ori@gmail.com', '951aca113a2e6ca93b8fb8f666f6665ef3879b74c0af66ee1a084d5103d0bec40fafdcdfefbe89becf3bb4f3566af715b97dec4320a161997e049be60887c22b', 2),
(29, 'navit', 'glikman', 'navit@gmail.com', '951aca113a2e6ca93b8fb8f666f6665ef3879b74c0af66ee1a084d5103d0bec40fafdcdfefbe89becf3bb4f3566af715b97dec4320a161997e049be60887c22b', 2),
(30, 'itai', 'glikman', '1111@gmail.com', 'e28dc4b8dfbaaad7fca77d79ed9eb369b29085e4e6bd53da8151ad1b5719386a3596a084c73ad9cd31cec5d78d553659a203ddd3ef56f00d2394551e82e24aa6', 2),
(31, 'julio', 'secar', 'julio@gmail.com', '951aca113a2e6ca93b8fb8f666f6665ef3879b74c0af66ee1a084d5103d0bec40fafdcdfefbe89becf3bb4f3566af715b97dec4320a161997e049be60887c22b', 2),
(32, 'adi', 'tzadik', 'adi@gmail.com', '951aca113a2e6ca93b8fb8f666f6665ef3879b74c0af66ee1a084d5103d0bec40fafdcdfefbe89becf3bb4f3566af715b97dec4320a161997e049be60887c22b', 2),
(33, 'jo', 'do', 'jo@gmail.com', '951aca113a2e6ca93b8fb8f666f6665ef3879b74c0af66ee1a084d5103d0bec40fafdcdfefbe89becf3bb4f3566af715b97dec4320a161997e049be60887c22b', 2),
(34, 'Assaf', 'Fink', 'assaf@gmail.com', '3ec9650fcc20017936748db7685da0937a92824aa5092c1db7a2990c87a00fbfca4f7b8e9fa2a72065e6084bbb490cc877a32f642b19bfd162e348d1410c0bff', 2);

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `vacationId` int(11) NOT NULL,
  `destination` varchar(50) NOT NULL,
  `description` varchar(2000) NOT NULL,
  `startDate` date NOT NULL,
  `finishDate` date NOT NULL,
  `price` int(11) NOT NULL DEFAULT 0,
  `imageName` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacationId`, `destination`, `description`, `startDate`, `finishDate`, `price`, `imageName`) VALUES
(40, 'Barcelona', 'Embarking on a captivating journey to Barcelona in mid-May means immersing yourself in the very essence of Catalan culture. As you step onto the bustling streets, the fragrant scent of tapas wafts from sidewalk cafes, inviting you to savor the local cuisine. The mesmerizing Sagrada Familia, with its intricate facades and soaring spires, stands as a testament to Gaudi\'s genius. Meander through the narrow alleys of the Gothic Quarter, where centuries of history come to life in the form of hidden courtyards and medieval architecture. A day trip to Montserrat on May 20th, promises a unique hiking adventure amidst towering rock formations and panoramic vistas of the surrounding countryside. In this week of discovery, Barcelona reveals itself as a vibrant city where art, history, and nature seamlessly intertwine. ', '2024-05-14', '2024-05-21', 1200, '5e572968-8bc3-412d-98c8-1b5e50d3f715.jpg'),
(41, 'Buenos Aires', 'A week in Buenos Aires, starting on September 8th, is an entrancing voyage through Argentina\'s dynamic capital, where history, culture, and nature converge. The city\'s lively neighborhoods beckon with their distinct personalities. Stroll along the iconic Caminito Street in La Boca, a kaleidoscope of colorful houses and tango dancers, and savor a traditional Argentine steak at a local parrilla. On September 13th, escape to the peaceful Tigre Delta, where a boat ride through meandering waterways takes you to lush islands, offering hiking trails and a glimpse into a tranquil riverine way of life. In this enchanting week, Buenos Aires unveils its passionate soul, and the pleasant spring weather makes exploring its parks and gardens, like the Palermo Rose Garden, an absolute delight.', '2024-09-07', '2024-09-14', 1000, 'df31875c-7c58-463e-80b1-f46154898dda.jpg'),
(42, ' Galápagos Islands', 'Prepare for a scuba diver\'s paradise in the Galápagos Islands from October 18th to October 27th. This ten-day expedition invites you to explore the mesmerizing underwater world of this UNESCO World Heritage site. Dive alongside graceful hammerhead sharks, playful sea lions, and vibrant marine life unique to these pristine waters. Between dives, venture ashore to hike through volcanic landscapes, where you can observe giant tortoises and blue-footed boobies up close. This October trip promises the perfect blend of underwater adventure and nature exploration in one of the world\'s most renowned diving destinations.', '2024-10-14', '2024-10-23', 6000, '8dc9e3d1-dfcd-415e-b084-4a4eaef9df10.jpg'),
(43, 'Andorra ', 'From February 12th to February 19th, Andorra\'s snow-covered slopes beckon ski enthusiasts to a thrilling one-week winter adventure. Nestled in the Pyrenees, this tiny principality offers an array of skiing and snowboarding opportunities for all skill levels. Glide down pristine trails while surrounded by breathtaking alpine scenery. Off the slopes, cozy mountain villages provide apres-ski relaxation and traditional cuisine. February brings the best snow conditions, creating a picturesque backdrop for a memorable ski vacation.', '2024-02-12', '2024-02-19', 2000, '159daa3f-1e0f-41ed-8c4c-57e65e66053a.jpg'),
(44, 'East Coast, USA', 'Starting on July 6th, embark on an epic three-week journey along the diverse East Coast of the USA. This adventure unfolds with hikes in the Appalachian Mountains, where lush forests and panoramic views await. Explore historic cities like Boston, where cobblestone streets lead to the Freedom Trail\'s rich history. Discover the pristine beaches of the Outer Banks, and savor fresh seafood in Charleston\'s charming atmosphere. July to August offers ideal weather for exploring this multifaceted region, making this summer trip an unforgettable exploration of nature and culture.', '2024-07-05', '2024-07-26', 4000, 'fe3bff36-2500-488d-810e-767778c8955a.jpg'),
(45, ' Black Forest Germany', 'From June 2nd to June 6th, the enchanting Black Forest awaits with a five-day escape into nature\'s embrace. Wander through lush forests on scenic hikes, discovering hidden waterfalls and charming villages along the way. June brings pleasant weather and vibrant green landscapes, making it the perfect time to explore this German gem. Savor traditional Black Forest cake and immerse yourself in the region\'s folklore as you uncover the secrets of this captivating destination.', '2024-06-01', '2024-06-05', 900, '78cdb100-485b-4971-a5a8-fef3ad534f33.jpg'),
(46, 'London', 'Experience the grandeur of London in one week, starting on August 9th, and explore historic landmarks like the Tower of London and Buckingham Palace. Nature enthusiasts can enjoy the city\'s numerous parks and gardens, including the Royal Botanic Gardens at Kew. August offers warm, sunny days and an opportunity to witness the vibrant city\'s lush green spaces at their best. Discover the fusion of culture and nature in one of the world\'s most iconic cities. ', '2024-08-09', '2024-08-16', 1800, '04859d47-b0c7-4ece-8a19-4c781eb95174.jpg'),
(47, 'Bolivia ', 'Embark on a four-week odyssey through Bolivia, starting on September 15th, to explore its diverse landscapes and rich culture. Hike through the surreal Uyuni Salt Flats, visit the Amazon Rainforest\'s heart, and explore the colonial cities of Sucre and Potosí. This journey in September and October promises pleasant weather, making it an ideal time to experience the wonders of Bolivia. From high-altitude adventures to immersive cultural encounters, this extended trip showcases the depth and diversity of this South American gem.', '2024-09-15', '2024-10-13', 3500, 'fbd1c67c-2acf-4d6d-bffa-1a5333fa28d1.jpg'),
(48, 'North India', 'Starting on November 1st, embark on a captivating three-week exploration of North India\'s cultural tapestry and natural beauty. Hike through the Himalayan foothills, marvel at the awe-inspiring Taj Mahal, and lose yourself in the bustling streets of Delhi. With November\'s cooler temperatures, this journey provides a comfortable experience for nature enthusiasts and history buffs alike. Discover ancient temples, vibrant markets, and diverse landscapes as you traverse this captivating region. ', '2023-11-01', '2023-11-21', 2000, 'cae2baac-19c5-4a45-8295-a989123a171f.JPG'),
(49, 'Rajasthan India', 'Explore the royal heritage of Rajasthan during this captivating two-week journey, starting on October 5th. Begin in the \"Pink City\" of Jaipur, home to the majestic Amber Fort and the City Palace. Continue to Jodhpur, the \"Blue City,\" dominated by the imposing Mehrangarh Fort. Discover Udaipur\'s serene lakes and the romantic Lake Palace. In Jaisalmer, the \"Golden City,\" explore the Jaisalmer Fort and experience desert life under the stars. Traverse Pushkar\'s sacred sites, delve into Bikaner\'s history, and return to Jaipur for a rich cultural immersion. October offers pleasant weather to uncover Rajasthan\'s regal charm.', '2024-10-05', '2024-10-19', 2000, '8c5e23d9-f3bf-4cc3-8320-0ac79b39dcbd.JPG'),
(94, 'Romania', 'Embark on a two-week journey through Romania\'s rich history, stunning landscapes, and vibrant culture. Wander through the medieval streets of Sibiu, hike the breathtaking Carpathian Mountains, and explore the legendary Bran Castle. With summer in full swing, enjoy the warm weather and lush greenery as you visit traditional villages, bustling markets, and pristine natural reserves. From the picturesque Transylvanian countryside to the lively capital of Bucharest, this trip offers a diverse and enchanting experience for every traveler.', '2024-07-25', '2024-08-07', 4000, '2a984248-298c-43d4-9063-b5611657382e.jpeg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD PRIMARY KEY (`followId`),
  ADD KEY `vacationId` (`vacationId`),
  ADD KEY `userId` (`userId`) USING BTREE;

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`roleId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`),
  ADD KEY `roleId` (`roleId`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacationId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `followers`
--
ALTER TABLE `followers`
  MODIFY `followId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=263;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `roleId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=96;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`vacationId`) REFERENCES `vacations` (`vacationId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `role` (`roleId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
