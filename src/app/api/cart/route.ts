import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Cart from '@/models/Cart';
import Product from '@/models/Product';
import { createSuccessResponse, createErrorResponse } from '@/lib/errors';
import { auth } from '@/auth';

export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json(
        createErrorResponse(401, 'Unauthorized'),
        { status: 401 }
      );
    }

    await connectDB();

    const cart = await Cart.findOne({ userId: (session.user as any).id })
      .populate('items.productId')
      .exec();

    if (!cart) {
      return NextResponse.json(
        createSuccessResponse(
          { cart: { items: [] } },
          'Cart retrieved successfully'
        )
      );
    }

    return NextResponse.json(
      createSuccessResponse(
        { cart },
        'Cart retrieved successfully'
      )
    );
  } catch (error) {
    console.error('Get cart error:', error);
    return NextResponse.json(
      createErrorResponse(500, 'Internal server error'),
      { status: 500 }
    );
  }
}
