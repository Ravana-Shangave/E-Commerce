import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Product from '@/models/Product';
import Category from '@/models/Category';
import { createProductSchema } from '@/lib/validations';
import { createSuccessResponse, createErrorResponse } from '@/lib/errors';
import { auth } from '@/auth';

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json(
        createErrorResponse(403, 'Unauthorized. Admin access required.'),
        { status: 403 }
      );
    }

    await connectDB();

    const body = await request.json();
    const validation = createProductSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        createErrorResponse(400, 'Validation failed', validation.error.flatten().fieldErrors as any),
        { status: 400 }
      );
    }

    // Verify category exists
    const category = await Category.findById(validation.data.category);
    if (!category) {
      return NextResponse.json(
        createErrorResponse(400, 'Invalid category'),
        { status: 400 }
      );
    }

    const product = await Product.create(validation.data);

    return NextResponse.json(
      createSuccessResponse(
        { product },
        'Product created successfully'
      ),
      { status: 201 }
    );
  } catch (error) {
    console.error('Create product error:', error);
    return NextResponse.json(
      createErrorResponse(500, 'Internal server error'),
      { status: 500 }
    );
  }
}
