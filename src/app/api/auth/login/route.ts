import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/models/User';
import { loginSchema } from '@/lib/validations';
import { createSuccessResponse, createErrorResponse } from '@/lib/errors';
import { generateToken } from '@/lib/utils';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const validation = loginSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        createErrorResponse(400, 'Validation failed', validation.error.flatten().fieldErrors as any),
        { status: 400 }
      );
    }

    const { email, password } = validation.data;

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return NextResponse.json(
        createErrorResponse(401, 'Invalid email or password'),
        { status: 401 }
      );
    }

    // This would be handled by NextAuth in production
    const token = generateToken(user._id.toString());

    return NextResponse.json(
      createSuccessResponse(
        {
          token,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
        },
        'Login successful'
      )
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      createErrorResponse(500, 'Internal server error'),
      { status: 500 }
    );
  }
}
