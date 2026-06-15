import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/models/User';
import { hashPassword, generateEmailToken } from '@/lib/utils';
import { registerSchema } from '@/lib/validations';
import { createSuccessResponse, createErrorResponse } from '@/lib/errors';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const validation = registerSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        createErrorResponse(400, 'Validation failed', validation.error.flatten().fieldErrors as any),
        { status: 400 }
      );
    }

    const { name, email, password } = validation.data;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        createErrorResponse(400, 'Email already registered'),
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);
    const emailToken = generateEmailToken();

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      emailVerificationToken: emailToken,
      emailVerificationExpiry: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    // TODO: Send verification email

    return NextResponse.json(
      createSuccessResponse(
        {
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
        },
        'Registration successful. Please verify your email.'
      ),
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      createErrorResponse(500, 'Internal server error'),
      { status: 500 }
    );
  }
}
