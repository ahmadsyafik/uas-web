import { NextResponse } from "next/server"
import pool from "@/lib/db"

export async function GET() {
  try {
    const [rows] = await pool.query("SELECT * FROM categories")

    return NextResponse.json({ success: true, categories: rows })
  } catch (error) {
    console.error("Error fetching categories:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch categories" }, { status: 500 })
  }
}
