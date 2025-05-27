import { type NextRequest, NextResponse } from "next/server"
import pool from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ success: false, message: "User ID is required" }, { status: 400 })
    }

    const [rows] = await pool.query(
      `SELECT w.id as watchlist_id, w.added_on, m.* 
       FROM watchlist w
       JOIN movies m ON w.movie_id = m.id
       WHERE w.user_id = ?
       ORDER BY w.added_on DESC`,
      [userId],
    )

    return NextResponse.json({ success: true, watchlist: rows })
  } catch (error) {
    console.error("Error fetching watchlist:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch watchlist" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId, movieId } = await request.json()

    if (!userId || !movieId) {
      return NextResponse.json({ success: false, message: "User ID and Movie ID are required" }, { status: 400 })
    }

    // Check if already in watchlist
    const [existing]: any = await pool.query("SELECT id FROM watchlist WHERE user_id = ? AND movie_id = ?", [
      userId,
      movieId,
    ])

    if (existing.length > 0) {
      return NextResponse.json({
        success: true,
        message: "Movie is already in watchlist",
        alreadyExists: true,
      })
    }

    // Add to watchlist
    const [result]: any = await pool.query("INSERT INTO watchlist (user_id, movie_id) VALUES (?, ?)", [userId, movieId])

    return NextResponse.json({
      success: true,
      message: "Added to watchlist",
      watchlistId: result.insertId,
    })
  } catch (error) {
    console.error("Error adding to watchlist:", error)
    return NextResponse.json({ success: false, message: "Failed to add to watchlist" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get("userId")
    const movieId = searchParams.get("movieId")

    if (!userId || !movieId) {
      return NextResponse.json({ success: false, message: "User ID and Movie ID are required" }, { status: 400 })
    }

    await pool.query("DELETE FROM watchlist WHERE user_id = ? AND movie_id = ?", [userId, movieId])

    return NextResponse.json({
      success: true,
      message: "Removed from watchlist",
    })
  } catch (error) {
    console.error("Error removing from watchlist:", error)
    return NextResponse.json({ success: false, message: "Failed to remove from watchlist" }, { status: 500 })
  }
}
