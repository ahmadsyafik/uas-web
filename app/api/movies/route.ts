import { type NextRequest, NextResponse } from "next/server"
import pool from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const genre = searchParams.get("genre")
    const query = searchParams.get("query")

    let sql = "SELECT * FROM movies"
    const params: any[] = []

    if (genre) {
      sql += " WHERE genre = ?"
      params.push(genre)
    } else if (query) {
      sql += " WHERE title LIKE ? OR genre LIKE ?"
      params.push(`%${query}%`, `%${query}%`)
    }

    sql += " ORDER BY created_at DESC"

    const [rows] = await pool.query(sql, params)

    return NextResponse.json({ success: true, movies: rows })
  } catch (error) {
    console.error("Error fetching movies:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch movies" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const movieData = await request.json()

    const [result]: any = await pool.query(
      `INSERT INTO movies (
        title, genre, year, rating, duration, director, cast, plot, 
        poster_url, backdrop_url, video_url
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
      ],
    )

    return NextResponse.json({
      success: true,
      message: "Movie added successfully",
      movieId: result.insertId,
    })
  } catch (error) {
    console.error("Error adding movie:", error)
    return NextResponse.json({ success: false, message: "Failed to add movie" }, { status: 500 })
  }
}
