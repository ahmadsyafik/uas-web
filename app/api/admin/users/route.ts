import { NextResponse } from "next/server"
import pool from "@/lib/db"

export async function GET() {
  try {
    const [rows] = await pool.query(
      "SELECT id, name, email, created_at FROM users WHERE is_admin = FALSE ORDER BY created_at DESC",
    )

    return NextResponse.json({ success: true, users: rows })
  } catch (error) {
    console.error("Error fetching users:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch users" }, { status: 500 })
  }
}
