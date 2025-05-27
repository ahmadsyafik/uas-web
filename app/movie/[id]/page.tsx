"use client"

import { useState, useEffect } from "react"
import Navbar from "@/components/navbar"
import MovieCard from "@/components/movie-card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { BookmarkPlus, Calendar, Clock, Film, Star, ThumbsUp } from "lucide-react"
import { useAuth } from "@/lib/auth"
import { useRouter } from "next/navigation"

interface Movie {
  id: number
  title: string
  poster_url: string
  backdrop_url: string
  year: string
  rating: string
  genre: string
  duration: string
  director: string
  cast: string
  plot: string
  video_url: string
}

export default function MovieDetail({ params }: { params: { id: string } }) {
  const { user } = useAuth()
  const { toast } = useToast()
  const router = useRouter()
  const [movie, setMovie] = useState<Movie | null>(null)
  const [similarMovies, setSimilarMovies] = useState<any[]>([])
  const [inWatchlist, setInWatchlist] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        // Fetch movie details
        const response = await fetch(`/api/movies/${params.id}`)
        const data = await response.json()

        if (data.success) {
          setMovie(data.movie)

          // Fetch similar movies (same genre)
          const similarResponse = await fetch(`/api/movies?genre=${data.movie.genre}`)
          const similarData = await similarResponse.json()

          if (similarData.success) {
            // Filter out the current movie and limit to 4
            const filtered = similarData.movies.filter((m: any) => m.id !== Number.parseInt(params.id)).slice(0, 4)
            setSimilarMovies(filtered)
          }

          // Check if movie is in user's watchlist
          if (user) {
            const watchlistResponse = await fetch(`/api/watchlist?userId=${user.id}`)
            const watchlistData = await watchlistResponse.json()

            if (watchlistData.success) {
              const isInWatchlist = watchlistData.watchlist.some((item: any) => item.id === Number.parseInt(params.id))
              setInWatchlist(isInWatchlist)
            }
          }
        } else {
          toast({
            title: "Error",
            description: "Movie not found.",
            variant: "destructive",
          })
          router.push("/dashboard")
        }
      } catch (error) {
        console.error("Error fetching movie:", error)
        toast({
          title: "Error",
          description: "Failed to load movie details.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchMovie()
  }, [params.id, user, toast, router])

  const toggleWatchlist = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to manage your watchlist.",
        variant: "destructive",
      })
      router.push("/login")
      return
    }

    try {
      if (inWatchlist) {
        // Remove from watchlist
        const response = await fetch(`/api/watchlist?userId=${user.id}&movieId=${params.id}`, {
          method: "DELETE",
        })

        const data = await response.json()

        if (data.success) {
          setInWatchlist(false)
          toast({
            title: "Removed from Watchlist",
            description: "The movie has been removed from your watchlist.",
          })
        }
      } else {
        // Add to watchlist
        const response = await fetch("/api/watchlist", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user.id,
            movieId: Number.parseInt(params.id),
          }),
        })

        const data = await response.json()

        if (data.success) {
          setInWatchlist(true)
          toast({
            title: "Added to Watchlist",
            description: "The movie has been added to your watchlist.",
          })
        }
      }
    } catch (error) {
      console.error("Error updating watchlist:", error)
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
            <div className="h-64 bg-gray-800 rounded mb-8"></div>
            <div className="h-8 bg-gray-800 rounded w-1/4 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-800 rounded w-2/3 mx-auto mb-8"></div>
            <div className="h-32 bg-gray-800 rounded mb-8"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-gray-900">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Movie not found</h1>
          <p className="text-gray-400 mb-8">The movie you're looking for doesn't exist or has been removed.</p>
          <Button className="bg-red-600 hover:bg-red-700" onClick={() => router.push("/dashboard")}>
            Back to Home
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900">
      <Navbar />

      {/* Movie Hero */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-10"></div>
        <img
          src={movie.backdrop_url || movie.poster_url || "/placeholder.svg"}
          alt={movie.title}
          className="w-full h-[50vh] object-cover"
        />

        <div className="container mx-auto px-4 relative z-20 -mt-40">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3 lg:w-1/4">
              <div className="rounded-lg overflow-hidden shadow-2xl">
                <img src={movie.poster_url || "/placeholder.svg"} alt={movie.title} className="w-full h-auto" />
              </div>
            </div>

            <div className="md:w-2/3 lg:w-3/4 pt-6 md:pt-0">
              <h1 className="text-3xl md:text-4xl font-bold">{movie.title}</h1>

              <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-300">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-1" />
                  <span>{movie.rating}/10</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>{movie.year}</span>
                </div>
                {movie.duration && (
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{movie.duration}</span>
                  </div>
                )}
                <div className="flex items-center">
                  <Film className="w-4 h-4 mr-1" />
                  <span>{movie.genre}</span>
                </div>
              </div>

              <p className="mt-6 text-gray-300">{movie.plot}</p>

              {movie.director && (
                <div className="mt-4">
                  <h3 className="font-semibold">Director:</h3>
                  <p className="text-gray-300">{movie.director}</p>
                </div>
              )}

              {movie.cast && (
                <div className="mt-4">
                  <h3 className="font-semibold">Cast:</h3>
                  <p className="text-gray-300">{movie.cast}</p>
                </div>
              )}

              <div className="flex flex-wrap gap-3 mt-8">
                <Button
                  variant="outline"
                  className={`border-white text-white hover:bg-white/10 ${inWatchlist ? "bg-white/10" : ""}`}
                  onClick={toggleWatchlist}
                >
                  <BookmarkPlus className="w-4 h-4 mr-2" />
                  {inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Player */}
      {movie.video_url && (
        <section className="container mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold mb-6">Watch Full Movie</h2>
          <div className="aspect-video rounded-lg overflow-hidden">
            <iframe
              src={movie.video_url}
              title={`${movie.title} Trailer`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        </section>
      )}

      {/* Similar Movies */}
      {similarMovies.length > 0 && (
        <section className="container mx-auto px-4 py-12 border-t border-gray-800">
          <h2 className="text-2xl font-bold mb-6">Recomended Movies</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {similarMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                id={movie.id}
                title={movie.title}
                posterUrl={movie.poster_url}
                year={movie.year}
                rating={movie.rating}
                genre={movie.genre}
                onAddToWatchlist={() => {
                  if (!user) {
                    toast({
                      title: "Authentication Required",
                      description: "Please log in to add movies to your watchlist.",
                      variant: "destructive",
                    })
                    router.push("/login")
                    return
                  }

                  fetch("/api/watchlist", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      userId: user.id,
                      movieId: movie.id,
                    }),
                  })
                    .then((response) => response.json())
                    .then((data) => {
                      if (data.success) {
                        toast({
                          title: data.alreadyExists ? "Already in Watchlist" : "Added to Watchlist",
                          description: data.alreadyExists
                            ? "This movie is already in your watchlist."
                            : "The movie has been added to your watchlist.",
                        })
                      }
                    })
                    .catch((error) => {
                      console.error("Error adding to watchlist:", error)
                      toast({
                        title: "Error",
                        description: "An error occurred. Please try again.",
                        variant: "destructive",
                      })
                    })
                }}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
