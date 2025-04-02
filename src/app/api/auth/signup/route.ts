import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/users.models";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    await dbConnect();
    const { firstName, lastName, email, password } = await request.json();

    // Validate required fields
    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    // Remove password from response
    const userWithoutPassword = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };

    return NextResponse.json(
      { message: "User created successfully", user: userWithoutPassword },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
