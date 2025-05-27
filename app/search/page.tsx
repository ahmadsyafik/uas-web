"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import Navbar from "@/components/navbar"
import MovieCard from "@/components/movie-card"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

interface Movie {
  id: number
  title: string
  poster_url: string
  year: string
  rating: string
  genre: string
}

export default function Search() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const { toast } = useToast()
  const router = useRouter()
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)

  // Get user from localStorage
  const [user] = useState(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user")
      return storedUser ? JSON.parse(storedUser) : null
    }
    return null
  })

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query.trim()) {
        setMovies([])
        setLoading(false)
        return
      }

      try {
        const response = await fetch(`/api/movies?query=${encodeURIComponent(query)}`)
        const data = await response.json()

        if (data.success) {
          setMovies(data.movies)
        } else {
          setMovies([])
        }
      } catch (error) {
        console.error("Search error:", error)
        setMovies([])
      } finally {
        setLoading(false)
      }
    }

    fetchSearchResults()
  }, [query])

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
            <div className="grid grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
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
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Search Results</h1>
          <p className="text-gray-400">
            {query
              ? movies.length > 0
                ? `Found ${movies.length} result${movies.length === 1 ? "" : "s"} for "${query}"`
                : `No results found for "${query}"`
              : "Enter a search term to find movies"}
          </p>
        </div>

        {movies.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {movies.map((movie) => (
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
        ) : query ? (
          <div className="text-center py-20">
            <h3 className="text-xl font-semibold mb-2">No movies found</h3>
            <p className="text-gray-400">
              We couldn&apos;t find any movies matching &quot;{query}&quot;. Try different keywords.
            </p>
          </div>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-xl font-semibold mb-2">Start searching</h3>
            <p className="text-gray-400">Use the search bar above to find your favorite movies.</p>
          </div>
        )}
      </main>
    </div>
  )
}
