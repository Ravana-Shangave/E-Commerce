import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Product from '@/models/Product';
import { createSuccessResponse, createErrorResponse } from '@/lib/errors';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();

    const product = await Product.findById(params.id)
      .populate('category')
      .populate({
        path: 'reviews',
        options: { limit: 10, sort: { createdAt: -1 } },
      })
      .exec();

    if (!product) {
      return NextResponse.json(
        createErrorResponse(404, 'Product not found'),
        { status: 404 }
      );
    }

    return NextResponse.json(
      createSuccessResponse(
        { product },
        'Product fetched successfully'
      )
    );
  } catch (error) {
    console.error('Get product error:', error);
    return NextResponse.json(
      createErrorResponse(500, 'Internal server error'),
      { status: 500 }
    );
  }
}
