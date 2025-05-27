import { type NextRequest, NextResponse } from "next/server"
import pool from "@/lib/db"

export async function PUT(request: NextRequest) {
  try {
    const { userId, name, currentPassword, newPassword } = await request.json()

    if (!userId) {
      return NextResponse.json({ success: false, message: "User ID is required" }, { status: 400 })
    }

    // If updating password, verify current password first
    if (newPassword) {
      if (!currentPassword) {
        return NextResponse.json({ success: false, message: "Current password is required" }, { status: 400 })
      }

      // Check current password
      const [userCheck]: any = await pool.query("SELECT password FROM users WHERE id = ?", [userId])

      if (userCheck.length === 0) {
        return NextResponse.json({ success: false, message: "User not found" }, { status: 404 })
      }

      if (userCheck[0].password !== currentPassword) {
        return NextResponse.json({ success: false, message: "Current password is incorrect" }, { status: 400 })
      }

      // Update both name and password
      await pool.query("UPDATE users SET name = ?, password = ? WHERE id = ?", [name, newPassword, userId])
    } else {
      // Update only name
      await pool.query("UPDATE users SET name = ? WHERE id = ?", [name, userId])
    }

    // Get updated user data
    const [updatedUser]: any = await pool.query("SELECT id, name, email, is_admin FROM users WHERE id = ?", [userId])

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
      user: {
        id: updatedUser[0].id,
        name: updatedUser[0].name,
        email: updatedUser[0].email,
        isAdmin: updatedUser[0].is_admin === 1,
      },
    })
  } catch (error) {
    console.error("Profile update error:", error)
    return NextResponse.json({ success: false, message: "Failed to update profile" }, { status: 500 })
  }
}
