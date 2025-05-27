import { type NextRequest, NextResponse } from "next/server"
import pool from "@/lib/db"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    const [rows]: any = await pool.query("SELECT * FROM movies WHERE id = ?", [id])

    if (rows.length === 0) {
      return NextResponse.json({ success: false, message: "Movie not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, movie: rows[0] })
  } catch (error) {
    console.error("Error fetching movie:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch movie" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const movieData = await request.json()

    const [result] = await pool.query(
      `UPDATE movies SET 
        title = ?, genre = ?, year = ?, rating = ?, duration = ?,
        director = ?, cast = ?, plot = ?, poster_url = ?, 
        backdrop_url = ?, video_url = ?
      WHERE id = ?`,
      [
        movieData.title,
        movieData.genre,
        movieData.year,
        movieData.rating,
        movieData.duration || null,
        movieData.director || null,
        movieData.cast || null,
        movieData.plot || null,
        movieData.posterUrl || "/placeholder.svg?height=450&width=300",
        movieData.backdropUrl || "/placeholder.svg?height=600&width=1200",
        movieData.videoUrl || null,
        id,
      ],
    )

    return NextResponse.json({
      success: true,
      message: "Movie updated successfully",
    })
  } catch (error) {
    console.error("Error updating movie:", error)
    return NextResponse.json({ success: false, message: "Failed to update movie" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    await pool.query("DELETE FROM movies WHERE id = ?", [id])

    return NextResponse.json({
      success: true,
      message: "Movie deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting movie:", error)
    return NextResponse.json({ success: false, message: "Failed to delete movie" }, { status: 500 })
  }
}
