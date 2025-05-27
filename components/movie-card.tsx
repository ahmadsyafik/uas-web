"use client"

import Link from "next/link"
import { Play, Star, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MovieCardProps {
  id: number
  title: string
  posterUrl: string
  year: string
  rating: string
  genre: string
  isHighlighted?: boolean
  onAddToWatchlist?: () => void
}

export default function MovieCard({
  id,
  title,
  posterUrl,
  year,
  rating,
  genre,
  isHighlighted = false,
  onAddToWatchlist,
}: MovieCardProps) {
  if (isHighlighted) {
    return (
      <div className="relative w-full aspect-[21/9] rounded-xl overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent z-10"></div>
        <img src={posterUrl || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 md:p-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-1 bg-red-600 text-white text-xs rounded-md">{genre}</span>
              <div className="flex items-center text-yellow-500">
                <Star className="w-4 h-4 fill-yellow-500 mr-1" />
                <span className="text-sm">{rating}</span>
              </div>
              <span className="text-sm text-gray-400">{year}</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-bold mb-3">{title}</h2>
            <p className="text-gray-300 mb-6 max-w-xl hidden md:block">
              BoBoiBoy faces a new enemy named Retak’ka, a powerful alien who seeks to reclaim the elemental powers that once belonged to him. In this epic battle, BoBoiBoy must upgrade his abilities and master a new form, BoBoiBoy Elemental Fusion, to protect the galaxy from destruction.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href={`/movie/${id}`}>
                <Button className="bg-red-600 hover:bg-red-700">
                  <Play className="w-4 h-4 mr-2" />
                  Watch Now
                </Button>
              </Link>
              {onAddToWatchlist && (
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                  onClick={(e) => {
                    e.preventDefault()
                    onAddToWatchlist()
                  }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add to Watchlist
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="group relative rounded-lg overflow-hidden">
      <div className="aspect-[2/3] relative">
        <img
          src={posterUrl || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Link href={`/movie/${id}`}>
            <Button size="icon" className="rounded-full bg-red-600/90 hover:bg-red-600 w-12 h-12">
              <Play className="w-6 h-6 text-white" />
            </Button>
          </Link>
        </div>
        {onAddToWatchlist && (
          <button
            className="absolute bottom-2 right-2 bg-gray-900/80 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            onClick={onAddToWatchlist}
          >
            <Plus className="w-4 h-4 text-white" />
          </button>
        )}
      </div>
      <div className="p-3">
        <h3 className="font-semibold text-base line-clamp-1">{title}</h3>
        <div className="flex items-center justify-between mt-1 text-xs text-gray-400">
          <span>{year}</span>
          <div className="flex items-center text-yellow-500">
            <Star className="w-3 h-3 fill-yellow-500 mr-1" />
            <span>{rating}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
