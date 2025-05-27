"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Navbar from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Play, Trash2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/lib/auth"
import { useRouter } from "next/navigation"

interface WatchlistItem {
  watchlist_id: number
  id: number
  title: string
  poster_url: string
  year: string
  rating: string
  genre: string
  added_on: string
}

export default function Watchlist() {
  const { user } = useAuth()
  const { toast } = useToast()
  const router = useRouter()
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      router.push("/login")
      return
    }

    const fetchWatchlist = async () => {
      try {
        const response = await fetch(`/api/watchlist?userId=${user.id}`)
        const data = await response.json()

        if (data.success) {
          setWatchlist(data.watchlist)
        }
      } catch (error) {
        console.error("Error fetching watchlist:", error)
        toast({
          title: "Error",
          description: "Failed to load your watchlist.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchWatchlist()
  }, [user, router, toast])

  const removeFromWatchlist = async (movieId: number) => {
    try {
      const response = await fetch(`/api/watchlist?userId=${user?.id}&movieId=${movieId}`, {
        method: "DELETE",
      })

      const data = await response.json()

      if (data.success) {
        setWatchlist(watchlist.filter((item) => item.id !== movieId))
        toast({
          title: "Removed from Watchlist",
          description: "The movie has been removed from your watchlist.",
        })
      } else {
        toast({
          title: "Error",
          description: "Failed to remove movie from watchlist.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error removing from watchlist:", error)
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
            <div className="h-24 bg-gray-800 rounded mb-4"></div>
            <div className="h-24 bg-gray-800 rounded mb-4"></div>
            <div className="h-24 bg-gray-800 rounded mb-4"></div>
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
          <h1 className="text-2xl font-bold">My Watchlist</h1>
          <p className="text-gray-400">Movies you want to watch later</p>
        </div>

        {watchlist.length > 0 ? (
          <div className="space-y-4">
            {watchlist.map((movie) => (
              <div
                key={movie.watchlist_id}
                className="flex flex-col sm:flex-row gap-4 bg-gray-900 rounded-lg overflow-hidden border border-gray-800"
              >
                <div className="sm:w-40 h-auto">
                  <img
                    src={movie.poster_url || "/placeholder.svg"}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 p-4 flex flex-col">
                  <div>
                    <h3 className="text-lg font-semibold">{movie.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                      <span>{movie.year}</span>
                      <span>•</span>
                      <span>{movie.genre}</span>
                      <span>•</span>
                      <span>Rating: {movie.rating}</span>
                    </div>
                    <p className="text-sm text-gray-400 mt-2">
                      Added on {new Date(movie.added_on).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2 mt-auto pt-4">
                    <Link href={`/movie/${movie.id}`}>
                      <Button size="sm" className="bg-red-600 hover:bg-red-700">
                        <Play className="w-4 h-4 mr-2" />
                        Watch Now
                      </Button>
                    </Link>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-gray-700 text-gray-300 hover:bg-gray-800"
                      onClick={() => removeFromWatchlist(movie.id)}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-xl font-semibold mb-2">Your watchlist is empty</h3>
            <p className="text-gray-400 mb-6">
              Start adding movies to your watchlist to keep track of what you want to watch.
            </p>
            <Link href="/movies">
              <Button className="bg-red-600 hover:bg-red-700">Browse Movies</Button>
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}
