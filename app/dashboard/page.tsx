"use client"

import { useEffect, useState } from "react"
import Navbar from "@/components/navbar"
import MovieCard from "@/components/movie-card"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/lib/auth"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

interface Movie {
  id: number
  title: string
  poster_url: string
  year: string
  rating: string
  genre: string
  backdrop_url: string
}

export default function Dashboard() {
  const { user } = useAuth()
  const { toast } = useToast()
  const router = useRouter()
  const [featuredMovie, setFeaturedMovie] = useState<Movie | null>(null)
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([])
  const [newReleases, setNewReleases] = useState<Movie[]>([])
  const [comedyMovies, setComedyMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // Fetch all movies
        const response = await fetch("/api/movies")
        const data = await response.json()

        if (data.success) {
          const movies = data.movies as Movie[]

          // Set featured movie (first movie)
          if (movies.length > 0) {
            setFeaturedMovie(movies[0])
          }

          // Set trending movies (next 4)
          setTrendingMovies(movies.slice(1, 5))

          // Set new releases (next 4)
          setNewReleases(movies.slice(5, 9))

          // Fetch comedy movies
          const comedyResponse = await fetch("/api/movies?genre=Comedy")
          const comedyData = await comedyResponse.json()

          if (comedyData.success) {
            setComedyMovies(comedyData.movies.slice(0, 4))
          }
        }
      } catch (error) {
        console.error("Error fetching movies:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [])

  const addToWatchlist = async (movieId: number) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to add movies to your watchlist.",
        variant: "destructive",
      })
      router.push("/login")
      return
    }

    try {
      const response = await fetch("/api/watchlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          movieId,
        }),
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: data.alreadyExists ? "Already in Watchlist" : "Added to Watchlist",
          description: data.alreadyExists
            ? "This movie is already in your watchlist."
            : "The movie has been added to your watchlist.",
        })
      } else {
        toast({
          title: "Error",
          description: "Failed to add movie to watchlist.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error adding to watchlist:", error)
      toast({
        title: "Error",
        description: "An error occurred. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-gray-900">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-800 rounded w-1/4 mx-auto mb-8"></div>
            <div className="h-64 bg-gray-800 rounded mb-8"></div>
            <div className="h-8 bg-gray-800 rounded w-1/4 mx-auto mb-4"></div>
            <div className="grid grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-48 bg-gray-800 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900">
      <Navbar />

      <main className="container mx-auto px-4 py-6">
        {/* Featured Movie */}
        <section className="mb-10">
          {featuredMovie && (
            <MovieCard
              id={featuredMovie.id}
              title={featuredMovie.title}
              posterUrl={featuredMovie.backdrop_url || featuredMovie.poster_url}
              year={featuredMovie.year}
              rating={featuredMovie.rating}
              genre={featuredMovie.genre}
              isHighlighted={true}
              onAddToWatchlist={() => addToWatchlist(featuredMovie.id)}
            />
          )}
        </section>

        {/* Trending Now */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Trending Now</h2>
            <Link href="/movies">
              <Button variant="ghost" className="text-gray-400 hover:text-white">
                See All <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {trendingMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                id={movie.id}
                title={movie.title}
                posterUrl={movie.poster_url}
                year={movie.year}
                rating={movie.rating}
                genre={movie.genre}
                onAddToWatchlist={() => addToWatchlist(movie.id)}
              />
            ))}
          </div>
        </section>

        {/* New Releases */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">New Releases</h2>
            <Link href="/movies">
              <Button variant="ghost" className="text-gray-400 hover:text-white">
                See All <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {newReleases.map((movie) => (
              <MovieCard
                key={movie.id}
                id={movie.id}
                title={movie.title}
                posterUrl={movie.poster_url}
                year={movie.year}
                rating={movie.rating}
                genre={movie.genre}
                onAddToWatchlist={() => addToWatchlist(movie.id)}
              />
            ))}
          </div>
        </section>

        {/* Popular Comedies */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Popular Comedies</h2>
            <Link href="/movies">
              <Button variant="ghost" className="text-gray-400 hover:text-white">
                See All <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {comedyMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                id={movie.id}
                title={movie.title}
                posterUrl={movie.poster_url}
                year={movie.year}
                rating={movie.rating}
                genre={movie.genre}
                onAddToWatchlist={() => addToWatchlist(movie.id)}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
