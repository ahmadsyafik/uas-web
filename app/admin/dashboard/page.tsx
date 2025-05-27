"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/components/ui/use-toast"
import { Film, LogOut, MoreHorizontal, Plus, Trash, Users } from "lucide-react"
import { useRouter } from "next/navigation"

interface Movie {
  id: number
  title: string
  genre: string
  year: string
  rating: string
  duration?: string
  director?: string
  cast?: string
  plot?: string
  poster_url: string
  backdrop_url?: string
  video_url?: string
}

interface User {
  id: number
  name: string
  email: string
  created_at: string
}

// Function to convert YouTube URL to embed format
const convertToEmbedUrl = (url: string): string => {
  if (!url) return ""

  // If already embed format, return as is
  if (url.includes("youtube.com/embed/")) {
    return url
  }

  // Extract video ID from various YouTube URL formats
  let videoId = ""

  if (url.includes("youtube.com/watch?v=")) {
    videoId = url.split("youtube.com/watch?v=")[1].split("&")[0]
  } else if (url.includes("youtu.be/")) {
    videoId = url.split("youtu.be/")[1].split("?")[0]
  } else if (url.includes("youtube.com/v/")) {
    videoId = url.split("youtube.com/v/")[1].split("?")[0]
  }

  // Return embed format if video ID found
  if (videoId) {
    return `https://www.youtube.com/embed/${videoId}`
  }

  // Return original URL if not a YouTube URL
  return url
}

export default function AdminDashboard() {
  const { toast } = useToast()
  const router = useRouter()
  const [movies, setMovies] = useState<Movie[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null)
  const [isAddMovieOpen, setIsAddMovieOpen] = useState(false)
  const [isEditMovieOpen, setIsEditMovieOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [newMovie, setNewMovie] = useState({
    title: "",
    genre: "",
    year: "",
    rating: "",
    duration: "",
    director: "",
    cast: "",
    plot: "",
    poster_url: "/placeholder.svg?height=450&width=300",
    backdrop_url: "/placeholder.svg?height=600&width=1200",
    video_url: "",
  })

  // Get user from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user")
      if (storedUser) {
        const userData = JSON.parse(storedUser)
        setUser(userData)

        // Check if user is admin
        if (!userData || !userData.isAdmin) {
          router.push("/dashboard")
          return
        }
      } else {
        router.push("/login")
        return
      }
    }
  }, [router])

  // Fetch movies and users
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch movies
        const moviesResponse = await fetch("/api/movies")
        const moviesData = await moviesResponse.json()
        if (moviesData.success) {
          setMovies(moviesData.movies)
        }

        // Fetch users
        const usersResponse = await fetch("/api/admin/users")
        const usersData = await usersResponse.json()
        if (usersData.success) {
          setUsers(usersData.users)
        }
      } catch (error) {
        console.error("Error fetching data:", error)
        toast({
          title: "Error",
          description: "Failed to load data.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    if (user?.isAdmin) {
      fetchData()
    }
  }, [user, toast])

  const handleAddMovie = async () => {
    try {
      const response = await fetch("/api/movies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newMovie.title,
          genre: newMovie.genre,
          year: newMovie.year,
          rating: newMovie.rating,
          duration: newMovie.duration || null,
          director: newMovie.director || null,
          cast: newMovie.cast || null,
          plot: newMovie.plot || null,
          posterUrl: newMovie.poster_url,
          backdropUrl: newMovie.backdrop_url,
          videoUrl: convertToEmbedUrl(newMovie.video_url) || null,
        }),
      })

      const data = await response.json()

      if (data.success) {
        // Refresh movies list
        const moviesResponse = await fetch("/api/movies")
        const moviesData = await moviesResponse.json()
        if (moviesData.success) {
          setMovies(moviesData.movies)
        }

        setNewMovie({
          title: "",
          genre: "",
          year: "",
          rating: "",
          duration: "",
          director: "",
          cast: "",
          plot: "",
          poster_url: "/placeholder.svg?height=450&width=300",
          backdrop_url: "/placeholder.svg?height=600&width=1200",
          video_url: "",
        })
        setIsAddMovieOpen(false)
        toast({
          title: "Movie Added",
          description: "The movie has been added successfully.",
        })
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to add movie.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error adding movie:", error)
      toast({
        title: "Error",
        description: "An error occurred while adding the movie.",
        variant: "destructive",
      })
    }
  }

  const handleEditMovie = async () => {
    if (!editingMovie) return

    try {
      const response = await fetch(`/api/movies/${editingMovie.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: editingMovie.title,
          genre: editingMovie.genre,
          year: editingMovie.year,
          rating: editingMovie.rating,
          duration: editingMovie.duration || null,
          director: editingMovie.director || null,
          cast: editingMovie.cast || null,
          plot: editingMovie.plot || null,
          posterUrl: editingMovie.poster_url,
          backdropUrl: editingMovie.backdrop_url,
          videoUrl: convertToEmbedUrl(editingMovie.video_url || "") || null,
        }),
      })

      const data = await response.json()

      if (data.success) {
        // Update movies list
        setMovies(movies.map((movie) => (movie.id === editingMovie.id ? editingMovie : movie)))
        setIsEditMovieOpen(false)
        setEditingMovie(null)
        toast({
          title: "Movie Updated",
          description: "The movie has been updated successfully.",
        })
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to update movie.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error updating movie:", error)
      toast({
        title: "Error",
        description: "An error occurred while updating the movie.",
        variant: "destructive",
      })
    }
  }

  const handleDeleteMovie = async (id: number) => {
    if (!confirm("Are you sure you want to delete this movie?")) return

    try {
      const response = await fetch(`/api/movies/${id}`, {
        method: "DELETE",
      })

      const data = await response.json()

      if (data.success) {
        setMovies(movies.filter((movie) => movie.id !== id))
        toast({
          title: "Movie Deleted",
          description: "The movie has been deleted successfully.",
        })
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to delete movie.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error deleting movie:", error)
      toast({
        title: "Error",
        description: "An error occurred while deleting the movie.",
        variant: "destructive",
      })
    }
  }

  const handleDeleteUser = async (id: number) => {
    if (!confirm("Are you sure you want to delete this user?")) return

    try {
      const response = await fetch(`/api/admin/users/${id}`, {
        method: "DELETE",
      })

      const data = await response.json()

      if (data.success) {
        setUsers(users.filter((user) => user.id !== id))
        toast({
          title: "User Deleted",
          description: "The user has been deleted successfully.",
        })
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to delete user.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error deleting user:", error)
      toast({
        title: "Error",
        description: "An error occurred while deleting the user.",
        variant: "destructive",
      })
    }
  }

  const openEditDialog = (movie: Movie) => {
    setEditingMovie({ ...movie })
    setIsEditMovieOpen(true)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-gray-900">
        <header className="bg-gray-950 border-b border-gray-800 sticky top-0 z-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <Link href="/admin/dashboard" className="text-xl font-bold text-white">
                Cine<span className="text-red-600">Dark</span> <span className="text-sm font-normal">Admin</span>
              </Link>
              <Link href="/" className="text-gray-400 hover:text-white flex items-center gap-2">
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </Link>
            </div>
          </div>
        </header>
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="animate-pulse">Loading...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900">
      <header className="bg-gray-950 border-b border-gray-800 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/admin/dashboard" className="text-xl font-bold text-white">
              Cine<span className="text-red-600">Dark</span> <span className="text-sm font-normal">Admin</span>
            </Link>

            <Link href="/" className="text-gray-400 hover:text-white flex items-center gap-2">
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-400">Manage movies and users</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-red-600/20">
                <Film className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <p className="text-gray-400">Total Movies</p>
                <h3 className="text-3xl font-bold">{movies.length}</h3>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-blue-600/20">
                <Users className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="text-gray-400">Registered Users</p>
                <h3 className="text-3xl font-bold">{users.length}</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Movies Management */}
        <div className="bg-gray-900 rounded-lg border border-gray-800 mb-8">
          <div className="p-6 border-b border-gray-800">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Movies Management</h2>
              <Dialog open={isAddMovieOpen} onOpenChange={setIsAddMovieOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-red-600 hover:bg-red-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Movie
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-gray-900 border-gray-800 max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Add New Movie</DialogTitle>
                    <DialogDescription>
                      Fill in the details to add a new movie. For poster images, use direct image URLs (e.g., from
                      imgur, cloudinary, or any image hosting service).
                    </DialogDescription>
                  </DialogHeader>

                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="title">Title *</Label>
                      <Input
                        id="title"
                        value={newMovie.title}
                        onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
                        className="bg-gray-800 border-gray-700"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="genre">Genre *</Label>
                        <Input
                          id="genre"
                          value={newMovie.genre}
                          onChange={(e) => setNewMovie({ ...newMovie, genre: e.target.value })}
                          className="bg-gray-800 border-gray-700"
                          placeholder="e.g., Action, Comedy, Horror"
                          required
                        />
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="year">Year *</Label>
                        <Input
                          id="year"
                          value={newMovie.year}
                          onChange={(e) => setNewMovie({ ...newMovie, year: e.target.value })}
                          className="bg-gray-800 border-gray-700"
                          placeholder="e.g., 2024"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="rating">Rating *</Label>
                        <Input
                          id="rating"
                          value={newMovie.rating}
                          onChange={(e) => setNewMovie({ ...newMovie, rating: e.target.value })}
                          className="bg-gray-800 border-gray-700"
                          placeholder="e.g., 8.5"
                          required
                        />
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="duration">Duration</Label>
                        <Input
                          id="duration"
                          value={newMovie.duration}
                          onChange={(e) => setNewMovie({ ...newMovie, duration: e.target.value })}
                          className="bg-gray-800 border-gray-700"
                          placeholder="e.g., 2h 30m"
                        />
                      </div>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="director">Director</Label>
                      <Input
                        id="director"
                        value={newMovie.director}
                        onChange={(e) => setNewMovie({ ...newMovie, director: e.target.value })}
                        className="bg-gray-800 border-gray-700"
                        placeholder="e.g., Christopher Nolan"
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="cast">Cast</Label>
                      <Input
                        id="cast"
                        value={newMovie.cast}
                        onChange={(e) => setNewMovie({ ...newMovie, cast: e.target.value })}
                        className="bg-gray-800 border-gray-700"
                        placeholder="e.g., Leonardo DiCaprio, Marion Cotillard"
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="plot">Plot</Label>
                      <Textarea
                        id="plot"
                        value={newMovie.plot}
                        onChange={(e) => setNewMovie({ ...newMovie, plot: e.target.value })}
                        className="bg-gray-800 border-gray-700"
                        placeholder="Brief description of the movie..."
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="poster_url">Poster URL</Label>
                      <Input
                        id="poster_url"
                        value={newMovie.poster_url}
                        onChange={(e) => setNewMovie({ ...newMovie, poster_url: e.target.value })}
                        className="bg-gray-800 border-gray-700"
                        placeholder="https://example.com/poster.jpg"
                      />
                      <p className="text-xs text-gray-400">
                        Upload your image to imgur.com, cloudinary.com, or any image hosting service and paste the
                        direct image URL here.
                      </p>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="backdrop_url">Backdrop URL (Optional)</Label>
                      <Input
                        id="backdrop_url"
                        value={newMovie.backdrop_url}
                        onChange={(e) => setNewMovie({ ...newMovie, backdrop_url: e.target.value })}
                        className="bg-gray-800 border-gray-700"
                        placeholder="https://example.com/backdrop.jpg"
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="video_url">Video URL (YouTube)</Label>
                      <Input
                        id="video_url"
                        value={newMovie.video_url}
                        onChange={(e) => setNewMovie({ ...newMovie, video_url: e.target.value })}
                        className="bg-gray-800 border-gray-700"
                        placeholder="https://www.youtube.com/watch?v=VIDEO_ID or https://youtu.be/VIDEO_ID"
                      />
                      <p className="text-xs text-gray-400">
                        Paste any YouTube URL format. It will be automatically converted to embed format.
                      </p>
                    </div>
                  </div>

                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddMovieOpen(false)}>
                      Cancel
                    </Button>
                    <Button className="bg-red-600 hover:bg-red-700" onClick={handleAddMovie}>
                      Add Movie
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left p-4">ID</th>
                  <th className="text-left p-4">Poster</th>
                  <th className="text-left p-4">Title</th>
                  <th className="text-left p-4">Genre</th>
                  <th className="text-left p-4">Year</th>
                  <th className="text-left p-4">Rating</th>
                  <th className="text-right p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {movies.map((movie) => (
                  <tr key={movie.id} className="border-b border-gray-800">
                    <td className="p-4">{movie.id}</td>
                    <td className="p-4">
                      <img
                        src={movie.poster_url || "/placeholder.svg"}
                        alt={movie.title}
                        className="w-12 h-16 object-cover rounded"
                      />
                    </td>
                    <td className="p-4 font-medium">{movie.title}</td>
                    <td className="p-4">{movie.genre}</td>
                    <td className="p-4">{movie.year}</td>
                    <td className="p-4">{movie.rating}</td>
                    <td className="p-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-gray-900 border-gray-800">
                          <DropdownMenuItem onClick={() => openEditDialog(movie)}>Edit</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-500" onClick={() => handleDeleteMovie(movie.id)}>
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Users Management */}
        <div className="bg-gray-900 rounded-lg border border-gray-800">
          <div className="p-6 border-b border-gray-800">
            <h2 className="text-xl font-semibold">Users Management</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left p-4">ID</th>
                  <th className="text-left p-4">Name</th>
                  <th className="text-left p-4">Email</th>
                  <th className="text-left p-4">Join Date</th>
                  <th className="text-right p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-gray-800">
                    <td className="p-4">{user.id}</td>
                    <td className="p-4 font-medium">{user.name}</td>
                    <td className="p-4">{user.email}</td>
                    <td className="p-4">{new Date(user.created_at).toLocaleDateString()}</td>
                    <td className="p-4 text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:bg-red-500/10"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        <Trash className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Edit Movie Dialog */}
      <Dialog open={isEditMovieOpen} onOpenChange={setIsEditMovieOpen}>
        <DialogContent className="bg-gray-900 border-gray-800 max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Movie</DialogTitle>
            <DialogDescription>Update the details of the selected movie.</DialogDescription>
          </DialogHeader>

          {editingMovie && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-title">Title *</Label>
                <Input
                  id="edit-title"
                  value={editingMovie.title}
                  onChange={(e) => setEditingMovie({ ...editingMovie, title: e.target.value })}
                  className="bg-gray-800 border-gray-700"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-genre">Genre *</Label>
                  <Input
                    id="edit-genre"
                    value={editingMovie.genre}
                    onChange={(e) => setEditingMovie({ ...editingMovie, genre: e.target.value })}
                    className="bg-gray-800 border-gray-700"
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="edit-year">Year *</Label>
                  <Input
                    id="edit-year"
                    value={editingMovie.year}
                    onChange={(e) => setEditingMovie({ ...editingMovie, year: e.target.value })}
                    className="bg-gray-800 border-gray-700"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-rating">Rating *</Label>
                  <Input
                    id="edit-rating"
                    value={editingMovie.rating}
                    onChange={(e) => setEditingMovie({ ...editingMovie, rating: e.target.value })}
                    className="bg-gray-800 border-gray-700"
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="edit-duration">Duration</Label>
                  <Input
                    id="edit-duration"
                    value={editingMovie.duration || ""}
                    onChange={(e) => setEditingMovie({ ...editingMovie, duration: e.target.value })}
                    className="bg-gray-800 border-gray-700"
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="edit-director">Director</Label>
                <Input
                  id="edit-director"
                  value={editingMovie.director || ""}
                  onChange={(e) => setEditingMovie({ ...editingMovie, director: e.target.value })}
                  className="bg-gray-800 border-gray-700"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="edit-cast">Cast</Label>
                <Input
                  id="edit-cast"
                  value={editingMovie.cast || ""}
                  onChange={(e) => setEditingMovie({ ...editingMovie, cast: e.target.value })}
                  className="bg-gray-800 border-gray-700"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="edit-plot">Plot</Label>
                <Textarea
                  id="edit-plot"
                  value={editingMovie.plot || ""}
                  onChange={(e) => setEditingMovie({ ...editingMovie, plot: e.target.value })}
                  className="bg-gray-800 border-gray-700"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="edit-poster_url">Poster URL</Label>
                <Input
                  id="edit-poster_url"
                  value={editingMovie.poster_url}
                  onChange={(e) => setEditingMovie({ ...editingMovie, poster_url: e.target.value })}
                  className="bg-gray-800 border-gray-700"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="edit-backdrop_url">Backdrop URL</Label>
                <Input
                  id="edit-backdrop_url"
                  value={editingMovie.backdrop_url || ""}
                  onChange={(e) => setEditingMovie({ ...editingMovie, backdrop_url: e.target.value })}
                  className="bg-gray-800 border-gray-700"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="edit-video_url">Video URL (YouTube)</Label>
                <Input
                  id="edit-video_url"
                  value={editingMovie.video_url || ""}
                  onChange={(e) => setEditingMovie({ ...editingMovie, video_url: e.target.value })}
                  className="bg-gray-800 border-gray-700"
                  placeholder="https://www.youtube.com/watch?v=VIDEO_ID or https://youtu.be/VIDEO_ID"
                />
                <p className="text-xs text-gray-400">
                  Paste any YouTube URL format. It will be automatically converted to embed format.
                </p>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditMovieOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700" onClick={handleEditMovie}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
