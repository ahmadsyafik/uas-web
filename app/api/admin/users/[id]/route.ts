import { type NextRequest, NextResponse } from "next/server"
import pool from "@/lib/db"

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    // Check if user exists and is not admin
    const [userCheck]: any = await pool.query("SELECT id, is_admin FROM users WHERE id = ?", [id])

    if (userCheck.length === 0) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 })
    }

    if (userCheck[0].is_admin) {
      return NextResponse.json({ success: false, message: "Cannot delete admin user" }, { status: 403 })
    }

    // Delete user (this will also delete their watchlist due to foreign key constraints)
    await pool.query("DELETE FROM users WHERE id = ?", [id])

    return NextResponse.json({ success: true, message: "User deleted successfully" })
  } catch (error) {
    console.error("Error deleting user:", error)
    return NextResponse.json({ success: false, message: "Failed to delete user" }, { status: 500 })
  }
}
