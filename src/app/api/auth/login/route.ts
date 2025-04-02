import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/users.models";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    await dbConnect();
    const { email, password } = await request.json();

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Create session cookie
    const cookieStore = await cookies();
    cookieStore.set("userId", user._id.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    // Return user data without password
    const userWithoutPassword = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };

    return NextResponse.json(
      { message: "Login successful", user: userWithoutPassword },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Failed to login" }, { status: 500 });
  }
}
