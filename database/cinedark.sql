-- Create the database
CREATE DATABASE IF NOT EXISTS cinedark;
USE cinedark;

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert admin user
INSERT INTO users (name, email, password, is_admin) 
VALUES ('Admin', 'admin@gmail.com', 'admin123', TRUE);

-- Movies table
CREATE TABLE IF NOT EXISTS movies (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  genre VARCHAR(100) NOT NULL,
  year VARCHAR(4) NOT NULL,
  rating VARCHAR(4) NOT NULL,
  duration VARCHAR(10),
  director VARCHAR(100),
  cast TEXT,
  plot TEXT,
  poster_url VARCHAR(255) DEFAULT '/placeholder.svg?height=450&width=300',
  backdrop_url VARCHAR(255) DEFAULT '/placeholder.svg?height=600&width=1200',
  video_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample movies
INSERT INTO movies (title, genre, year, rating, duration, director, cast, plot, video_url) VALUES
('Inception', 'Sci-Fi', '2010', '8.8', '2h 28m', 'Christopher Nolan', 'Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page, Tom Hardy', 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.', 'https://www.youtube.com/embed/YoHD9XEInc0'),
('The Dark Knight', 'Action', '2008', '9.0', '2h 32m', 'Christopher Nolan', 'Christian Bale, Heath Ledger, Aaron Eckhart', 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.', 'https://www.youtube.com/embed/EXeTwQWrcwY'),
('Pulp Fiction', 'Crime', '1994', '8.9', '2h 34m', 'Quentin Tarantino', 'John Travolta, Uma Thurman, Samuel L. Jackson', 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.', 'https://www.youtube.com/embed/s7EdQ4FqbhY'),
('The Shawshank Redemption', 'Drama', '1994', '9.3', '2h 22m', 'Frank Darabont', 'Tim Robbins, Morgan Freeman, Bob Gunton', 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.', 'https://www.youtube.com/embed/6hB3S9bIaco'),
('The Godfather', 'Crime', '1972', '9.2', '2h 55m', 'Francis Ford Coppola', 'Marlon Brando, Al Pacino, James Caan', 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.', 'https://www.youtube.com/embed/sY1S34973zA'),
('Dune', 'Sci-Fi', '2021', '8.0', '2h 35m', 'Denis Villeneuve', 'Timothée Chalamet, Rebecca Ferguson, Zendaya', 'Feature adaptation of Frank Herbert\'s science fiction novel, about the son of a noble family entrusted with the protection of the most valuable asset and most vital element in the galaxy.', 'https://www.youtube.com/embed/8g18jFHCLXk'),
('No Time to Die', 'Action', '2021', '7.3', '2h 43m', 'Cary Joji Fukunaga', 'Daniel Craig, Ana de Armas, Rami Malek', 'James Bond has left active service. His peace is short-lived when Felix Leiter, an old friend from the CIA, turns up asking for help.', 'https://www.youtube.com/embed/BIhNsAtPbPI'),
('The French Dispatch', 'Comedy', '2021', '7.1', '1h 48m', 'Wes Anderson', 'Benicio Del Toro, Adrien Brody, Tilda Swinton', 'A love letter to journalists set in an outpost of an American newspaper in a fictional twentieth century French city that brings to life a collection of stories.', 'https://www.youtube.com/embed/TcPk2p0Zaw4'),
('Last Night in Soho', 'Horror', '2021', '7.1', '1h 56m', 'Edgar Wright', 'Thomasin McKenzie, Anya Taylor-Joy, Matt Smith', 'An aspiring fashion designer is mysteriously able to enter the 1960s where she encounters a dazzling wannabe singer. But the glamour is not all it appears to be and the dreams of the past start to crack and splinter into something darker.', 'https://www.youtube.com/embed/AcVnFrxjPjI'),
('Superbad', 'Comedy', '2007', '7.6', '1h 53m', 'Greg Mottola', 'Michael Cera, Jonah Hill, Christopher Mintz-Plasse', 'Two co-dependent high school seniors are forced to deal with separation anxiety after their plan to stage a booze-soaked party goes awry.', 'https://www.youtube.com/embed/4eaZ_48ZYog'),
('The Hangover', 'Comedy', '2009', '7.7', '1h 40m', 'Todd Phillips', 'Zach Galifianakis, Bradley Cooper, Justin Bartha', 'Three buddies wake up from a bachelor party in Las Vegas, with no memory of the previous night and the bachelor missing.', 'https://www.youtube.com/embed/tcdUhdOlz9M'),
('Bridesmaids', 'Comedy', '2011', '6.8', '2h 5m', 'Paul Feig', 'Kristen Wiig, Maya Rudolph, Rose Byrne', 'Competition between the maid of honor and a bridesmaid, over who is the bride\'s best friend, threatens to upend the life of an out-of-work pastry chef.', 'https://www.youtube.com/embed/FNppLrmdyug'),
('Anchorman', 'Comedy', '2004', '7.2', '1h 34m', 'Adam McKay', 'Will Ferrell, Christina Applegate, Steve Carell', 'Ron Burgundy is San Diego\'s top-rated newsman in the male-dominated broadcasting of the 1970s, but that\'s all about to change.', 'https://www.youtube.com/embed/NJQ4qEWm9lU'),
('The Conjuring', 'Horror', '2013', '7.5', '1h 52m', 'James Wan', 'Patrick Wilson, Vera Farmiga, Ron Livingston', 'Paranormal investigators Ed and Lorraine Warren work to help a family terrorized by a dark presence in their farmhouse.', 'https://www.youtube.com/embed/k10ETZ41q5o'),
('Hereditary', 'Horror', '2018', '7.3', '2h 7m', 'Ari Aster', 'Toni Collette, Alex Wolff, Milly Shapiro', 'A grieving family is haunted by tragic and disturbing occurrences after the death of their secretive grandmother.', 'https://www.youtube.com/embed/V6wWKNij_1M'),
('John Wick', 'Action', '2014', '7.4', '1h 41m', 'Chad Stahelski', 'Keanu Reeves, Michael Nyqvist, Alfie Allen', 'An ex-hit-man comes out of retirement to track down the gangsters that killed his dog and took everything from him.', 'https://www.youtube.com/embed/2AUmvWm5ZDQ');

-- Watchlist table
CREATE TABLE IF NOT EXISTS watchlist (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  movie_id INT NOT NULL,
  added_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE,
  UNIQUE KEY unique_user_movie (user_id, movie_id)
);

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  description TEXT,
  image_url VARCHAR(255) DEFAULT '/placeholder.svg?height=300&width=500'
);

-- Insert categories
INSERT INTO categories (name, description) VALUES
('Comedy', 'Laugh out loud with our collection of comedy films'),
('Horror', 'Spine-chilling horror movies that will keep you up at night'),
('Action', 'Adrenaline-pumping action films with explosive sequences'),
('Animation', 'Animated features for all ages with stunning visuals');
