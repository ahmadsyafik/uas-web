-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 27 Bulan Mei 2025 pada 08.45
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cinedark`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` text DEFAULT NULL,
  `image_url` varchar(255) DEFAULT '/placeholder.svg?height=300&width=500'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `categories`
--

INSERT INTO `categories` (`id`, `name`, `description`, `image_url`) VALUES
(1, 'Comedy', 'Laugh out loud with our collection of comedy films', '/placeholder.svg?height=300&width=500'),
(2, 'Horror', 'Spine-chilling horror movies that will keep you up at night', '/placeholder.svg?height=300&width=500'),
(3, 'Action', 'Adrenaline-pumping action films with explosive sequences', '/placeholder.svg?height=300&width=500'),
(4, 'Animation', 'Animated features for all ages with stunning visuals', '/placeholder.svg?height=300&width=500');

-- --------------------------------------------------------

--
-- Struktur dari tabel `movies`
--

CREATE TABLE `movies` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `genre` varchar(100) NOT NULL,
  `year` varchar(4) NOT NULL,
  `rating` varchar(4) NOT NULL,
  `duration` varchar(10) DEFAULT NULL,
  `director` varchar(100) DEFAULT NULL,
  `cast` text DEFAULT NULL,
  `plot` text DEFAULT NULL,
  `poster_url` varchar(255) DEFAULT '/placeholder.svg?height=450&width=300',
  `backdrop_url` varchar(255) DEFAULT '/placeholder.svg?height=600&width=1200',
  `video_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `movies`
--

INSERT INTO `movies` (`id`, `title`, `genre`, `year`, `rating`, `duration`, `director`, `cast`, `plot`, `poster_url`, `backdrop_url`, `video_url`, `created_at`) VALUES
(1, 'Boboiboy The Movie 2', 'Animation', '2019', '8.8', '1h 37m', 'Nizam Razak', 'Nur Fathiah Diaz, Yap Ee Jean, Dzubir Mohamed Zakaria , Muhammad Fareez Danie, Yong Yea', 'BoBoiBoy faces a new enemy named Retak’ka, a powerful alien who seeks to reclaim the elemental powers that once belonged to him. In this epic battle, BoBoiBoy must upgrade his abilities and master a new form, BoBoiBoy Elemental Fusion, to protect the galaxy from destruction. The adventure is filled with action, humor, and friendship.', '/images/posters/bthemovie2.jpg', '/images/backdrops/bthemovies2.jpg', 'https://www.youtube.com/embed/JXcMu0jmeQQ', '2025-05-21 16:44:43'),
(2, 'Minecraft: The Movie', 'Animation', '2025', '9.0', '1h 55m', 'Peter Sollett', 'Jason Momoa, Danielle Brooks, Sebastian Eugene Hansen', 'A live-action adaptation of the iconic sandbox game, following a young hero and a group of adventurers as they battle the Ender Dragon to save their blocky world.', '/images/posters/minecraft.jpg', '/images/backdrops/minecrafts1.jpg', 'https://www.youtube.com/embed/wJO_vIDZn-I', '2025-05-21 16:44:43'),
(3, 'Fast X', 'Action', '2023', '9.4', '2h 21m', 'Louis Leterrier', 'Vin Diesel, Jason Momoa, Michelle Rodriguez, Tyrese Gibson ', 'Dominic Toretto and his family face their most lethal opponent yet: Dante Reyes, the vengeful son of Hernan Reyes. Seeking retribution for his father\'s death, Dante has spent years plotting to tear Dom\'s family apart. As high-stakes action spans across the globe, Dom must race against time to protect those he loves — and survive the ultimate test.', '/images/posters/fastx.jpg', '/images/backdrops/fastxs.webp', 'https://www.youtube.com/embed/eoOaKN4qCKw', '2025-05-21 16:44:43'),
(4, 'Pengabdi Setan 2 : Communion', 'horror', '2022', '9.7', '1h 59m', 'Joko Anwar', 'Tara Basro, Endy Arfian, Nasar Anuz, Bront Palarae', 'Years after surviving terrifying events in their old house, Rini and her family move into a low-cost apartment complex seeking a safer life. However, they soon face an even more intense horror. A dark secret from their past resurfaces, along with the presence of a mysterious cult. When strange deaths occur in the building, Rini realizes the nightmare is far from over.', '/images/posters/ps.jpeg', '/images/backdrops/pss.webp', 'https://www.youtube.com/embed/8LIHcd7WfWI', '2025-05-21 16:44:43'),
(5, 'Jujutsu Kaisen 0 : The Movie', 'Animation', '2022', '9.2', '2h 45m', 'Sunghoo Park', 'Megumi Ogata, Kana Hanazawa, Yuichi Nakamura, Takahiro Sakurai', 'Yuta Okkotsu is a high school student haunted by the cursed spirit of his childhood friend, Rika. When her spirit turns into a powerful curse, Yuta is helpless to stop the violence it causes. He is taken in by Jujutsu High, where Satoru Gojo helps him learn to control the curse. As Yuta bonds with new friends and grows stronger, a dark threat emerges—Suguru Geto, a rogue sorcerer, plans to unleash a night of mass curses upon humanity.', '/images/posters/jujutsu.webp', '/images/backdrops/jujutsus.webp', 'https://www.youtube.com/embed/UPRqnFnnrr8', '2025-05-21 16:44:43'),
(6, 'Final Destination : Bloodlines', 'horror', '2025', '9.6', '1h 50m', 'Zach Lipovsky & Adam B. Stein', 'Kaitlyn Santa Juana, Teo Briones, Richard Harmon, Anna Lore', 'Stefani Reyes, a college student, begins experiencing terrifying visions of a deadly disaster connected to her grandmother\'s past in 1968. As people around her start dying in bizarre and gruesome ways, Stefani realizes that they were all meant to die decades ago—but somehow escaped. Now, Death is coming back to reclaim what it’s owed. With time running out, Stefani must uncover her family’s dark secret and find a way to break the deadly chain before it’s too late.', '/images/posters/fd.jpg', '/images/backdrops/fds.png', 'https://www.youtube.com/embed/UWMzKXsY9A4', '2025-05-21 16:44:43'),
(7, 'Mission: Impossible - The Final Reckoning', 'Action', '2025', '9.4', '2h 50m', 'Christopher McQuarrie', 'Tom Cruise, Hayley Atwell, Ving Rhames, Simon Pegg', 'Ethan Hunt and his team must stop a powerful artificial intelligence called \"The Entity\" from taking control of the world. As the AI threatens global destruction, Ethan faces dangerous enemies, tough choices, and his most personal mission yet. This could be his final mission — and the hardest one of all.', '/images/posters/mi.jpg', '/images/backdrops/mis.jpg', 'https://www.youtube.com/embed/NOhDyUmT9z0', '2025-05-21 16:44:43'),
(8, '1 Imam 2 Makmum', 'Comedy', '2025', '8.8', '1h 53m', ' Key Mangunsong', 'Fedi Nuril, Amanda Manopo, Revalina S. Temat', 'Anika marries Arman, a widower still haunted by memories of his late wife, Leila, who passed away four years prior. Despite Anika\'s efforts to build a loving marriage, Arman remains emotionally distant—sleeping separately, refusing to lead prayers, and hesitating to acknowledge Anika as his wife publicly. The situation worsens when Anika discovers that Arman\'s room is filled with Leila\'s belongings, indicating he hasn\'t moved on. This poignant drama explores whether a man can truly love two women: one present beside him and another living only in his memories.', '/images/posters/12.webp', '/images/backdrops/12s.jpg', 'https://www.youtube.com/embed/Pnj-Mv-PvV8', '2025-05-21 16:44:43'),
(9, 'Cocote Tonggo', 'Comedy', '2025', '9.6', '1h 57m', 'Bayu Skak', 'Ayushita, Dennis Adhiswara, Asri Welas, Bayu Skak, Sundari Soekotjo', 'Murni and Luki are a married couple who run a traditional herbal medicine shop that helps others with fertility. Ironically, after five years of marriage, they themselves still don’t have children. As neighbors begin to gossip and pressure builds, they decide to pretend that Murni is pregnant. To keep up the lie, they secretly adopt an abandoned baby and present it as their own. This decision leads to a series of hilarious and chaotic situations, revealing the emotional strain behind their smiles.', '/images/posters/ct.jpg', '/images/backdrops/ct1.jpg', 'https://www.youtube.com/embed/zzXOatXAhYA', '2025-05-21 16:44:43'),
(10, 'Yowes Ben Finale', 'Comedy', '2021', '9.0', '1h 35m', 'Fajar Nugros, Bayu Skak', ' Bayu Skak,  Joshua Suherman, Brandon Salim, Tutus Thomson', 'In Yowis Ben Finale, Bayu, the lead vocalist of the band Yowis Ben, faces personal and professional challenges. His romantic dilemma between his ex-girlfriend Susan and current partner Asih affects the band\'s dynamics. Complications arise when Nando plans to study music in America, causing uncertainty about the band\'s future. Meanwhile, Cak Jon distances himself after learning that the woman he loves is marrying someone else. Yayan\'s family commitments further strain the group\'s cohesion. These personal issues threaten the existence of Yowis Ben, leading to an emotional and comedic journey as they navigate their relationships and aspirations. ', '/images/posters/yb.jpg', '/images/backdrops/ybs.webp', 'https://www.youtube.com/embed/PbkyO3s4rq8', '2025-05-21 16:44:43'),
(11, 'Agak Laen', 'Comedy', '2024', '9.6', '1h 59m', 'Muhadkly Acho', 'Bene Dion, Oki Rengga, Indra Jegel, Boris Bokir', 'Four friends—Bene, Boris, Oki, and Jegel—run a haunted house attraction at a night market. Despite their efforts, the attraction fails to scare visitors. They decide to renovate it to make it scarier. However, during the reopening, a visitor with a heart condition dies from fright. Panicking, the friends secretly bury the body inside the haunted house. Soon, the attraction becomes popular due to rumors of real ghosts. As the police start investigating the missing person, the friends must deal with the consequences of their actions.', '/images/posters/agaklaen.jpg', '/images/backdrops/agaklaens.jpg', 'https://www.youtube.com/embed/0YLSPyGA4h0', '2025-05-21 16:44:43'),
(12, 'Sekawan Limo', 'Comedy', '2024', '9.4', '1h 52m', 'Bayu Skak', 'Bayu Skak, Nadya Arina, Keisya Levronka, Dono Pradana , Benidictus Siregar', 'Five friends — Bagas, Lenni, Dicky, Juna, and Andrew — set out to hike the mysterious and mystical Mount Madyopuro, a mountain surrounded by dark legends and local myths. Before the hike, they are warned by a local guardian to follow two important rules: the group must have an even number of members, and they must never look back while on the trail. Ignoring the warnings, the group continues their journey and soon encounters terrifying supernatural events. As fear and suspicion grow, they begin to realize that one of them may not be human…', '/images/posters/sekawanlimo.jpg', '/images/backdrops/sekawanlimos1.webp', 'https://www.youtube.com/embed/ERZncVUuKlk', '2025-05-21 16:44:43'),
(13, 'Kuroko no Basket : The Last Game', 'Animation', '2017', '8.9', '1h 30m', 'Shunsuke Tada', 'Kenshō Ono,  Yūki Ono, Hiroshi Kamiya', 'An American street basketball team named Jabberwock arrives in Japan and plays a friendly match against a Japanese team. After the Japanese team suffers a crushing defeat, Jabberwock\'s players mock Japanese basketball, inciting outrage. In response, Riko\'s father assembles a team called Vorpal Swords, comprising the Generation of Miracles, Tetsuya Kuroko, and Taiga Kagami, to challenge Jabberwock in a revenge match. This high-stakes game tests their skills, teamwork, and determination to defend their nation\'s pride.', '/images/posters/kuroko.jpg', '/images/backdrops/kurokos.jpg', 'https://www.youtube.com/embed/SDSW_UByOVY', '2025-05-21 16:44:43'),
(14, 'Evil Dead Rise', 'Horror', '2023', '9.2', '1h 37m', 'Lee Cronin', 'Lily Sullivan, Lily Sullivan, Morgan Davies', 'Beth, a road-weary guitar technician, visits her older sister Ellie, a single mother raising three children in a cramped Los Angeles apartment. Their reunion is cut short when an earthquake uncovers a hidden chamber in the building\'s basement, revealing the Necronomicon Ex-Mortis—the Book of the Dead. Ellie\'s son, Danny, discovers the book and unwittingly releases ancient demonic forces. ', '/images/posters/ed.jpg', '/images/backdrops/eds.jpeg', 'https://www.youtube.com/embed/smTK_AeAPHs', '2025-05-21 16:44:43'),
(15, 'Batman v Superman : Dawn of Justice', 'Action', '2016', '8.7', '3h 2m', 'Zack Snyder', 'Ben Affleck, Henry Cavill, Gal Gadot', 'Fearing the unchecked power of Superman after the devastating battle in Metropolis, Bruce Wayne—also known as Batman—decides to take matters into his own hands and confront the Man of Steel. Meanwhile, the world debates whether Superman is a hero or a threat. As tensions escalate, a new threat emerges in the form of Lex Luthor, who manipulates both heroes and unleashes a deadly creature known as Doomsday.', '/images/posters/bvs.webp', '/images/backdrops/bvss.jpg', 'https://www.youtube.com/embed/0WWzgGyAH6Y', '2025-05-21 16:44:43'),
(16, 'Spiderman : No Way Home', 'Action', '2021', '9.3', '2h 28m', ' Jon Watts', ' Jon Watts, Zendaya, Jacob Batalon', 'After his identity is revealed to the world, Peter Parker’s life is turned upside down. Desperate to make people forget he is Spider-Man, Peter seeks help from Doctor Strange. But when the spell goes wrong, it opens the multiverse and brings in dangerous villains from other universes who have fought other versions of Spider-Man.', '/images/posters/spide.jpg', '/images/backdrops/spides.png', 'https://www.youtube.com/embed/JfVOs4VSpmA', '2025-05-21 16:44:43');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `is_admin` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `is_admin`, `created_at`) VALUES
(1, 'Admin', 'admin@gmail.com', 'admin123', 1, '2025-05-21 16:44:43'),
(2, 'asep', 'user@gmail.com', 'user987', 0, '2025-05-21 16:53:34');

-- --------------------------------------------------------

--
-- Struktur dari tabel `watchlist`
--

CREATE TABLE `watchlist` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `movie_id` int(11) NOT NULL,
  `added_on` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `watchlist`
--

INSERT INTO `watchlist` (`id`, `user_id`, `movie_id`, `added_on`) VALUES
(6, 2, 1, '2025-05-25 15:49:02'),
(7, 2, 3, '2025-05-26 14:27:08'),
(8, 1, 1, '2025-05-26 17:51:51');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `movies`
--
ALTER TABLE `movies`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indeks untuk tabel `watchlist`
--
ALTER TABLE `watchlist`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_user_movie` (`user_id`,`movie_id`),
  ADD KEY `movie_id` (`movie_id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `movies`
--
ALTER TABLE `movies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `watchlist`
--
ALTER TABLE `watchlist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `watchlist`
--
ALTER TABLE `watchlist`
  ADD CONSTRAINT `watchlist_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `watchlist_ibfk_2` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
