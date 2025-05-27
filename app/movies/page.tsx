import Navbar from "@/components/navbar"
import MovieCard from "@/components/movie-card"

// Mock data for movies
const allMovies = [
  {
    id: 1,
    title: "Boboiboy The Movie 2",
    posterUrl: "/images/posters/bthemovie2.jpg",
    year: "2019",
    rating: "8.8  ",
    genre: "Animation ",
  },
  {
    id: 2,
    title: "Minecraft The Movie",
    posterUrl: "/images/posters/minecraft.jpg",
    year: "2025",
    rating: "9.0",
    genre: "Animation",
  },
  {
    id: 3,
    title: "Fast X",
    posterUrl: "/images/posters/fastx.jpg",
    year: "2023",
    rating: "9.4",
    genre: "Action",
  },
  {
    id: 4,
    title: "Pengabdi Setan 2 : Communion",
    posterUrl: "/images/posters/ps.jpeg",
    year: "2022",
    rating: "9.7",
    genre: "Horror",
  },
  {
    id: 5,
    title: "Jujutsu Kaisen 0 : The Movie",
    posterUrl: "/images/posters/jujutsu.webp",
    year: "2022",
    rating: "9.2",
    genre: "Animation",
  },
  {
    id: 6,
    title: "Final Destination : Bloodlines",
    posterUrl: "/images/posters/fd.jpg",
    year: "2025",
    rating: "9.6",
    genre: "Horror",
  },
  {
    id: 7,
    title: "Mission : Impossible - The Final Reckoning",
    posterUrl: "/images/posters/mi.jpg",
    year: "2025",
    rating: "9.4",
    genre: "Action",
  },
  {
    id: 8,
    title: "1 Imam 2 Makmum",
    posterUrl: "/images/posters/12.webp",
    year: "2025",
    rating: "8.8",
    genre: "Comedy",
  },
  {
    id: 9,
    title: "Cocote Tonggo",
    posterUrl: "/images/posters/ct.jpg",
    year: "2025",
    rating: "9.6",
    genre: "Comedy",
  },
  {
    id: 10,
    title: "Yowes Ben Finale",
    posterUrl: "/images/posters/yb.jpg",
    year: "2021",
    rating: "9.0",
    genre: "Comedy",
  },
  {
    id: 11,
    title: "Agak Laen",
    posterUrl: "/images/posters/agaklaen.jpg",
    year: "2024",
    rating: "9.6",
    genre: "Comedy",
  },
  {
    id: 12,
    title: "Sekawan Limo",
    posterUrl: "/images/posters/sekawanlimo.jpg",
    year: "2024",
    rating: "9.4",
    genre: "Comedy",
  },
  {
    id: 13,
    title: "Kuroko no Basket : The Last Game",
    posterUrl: "/images/posters/kuroko.jpg",
    year: "2017",
    rating: "8.9",
    genre: "Animation",
  },
  {
    id: 14,
    title: "Evil Dead Rise",
    posterUrl: "/images/posters/ed.jpg",
    year: "2023",
    rating: "9.2",
    genre: "Horror",
  },
  {
    id: 15,
    title: "Batman v Superman : Dawn of Justice",
    posterUrl: "/images/posters/bvs.webp",
    year: "2016",
    rating: "8.7",
    genre: "Action",
  },
  {
    id: 16,
    title: "Spiderman : No Way Home",
    posterUrl: "/images/posters/spide.jpg",
    year: "2021",
    rating: "9.3",
    genre: "Action",
  },
]

export default function Movies() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900">
      <Navbar />

      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">All Movies</h1>
          <p className="text-gray-400">Browse our collection of movies</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {allMovies.map((movie) => (
            <MovieCard key={movie.id} {...movie} />
          ))}
        </div>
      </main>
    </div>
  )
}
