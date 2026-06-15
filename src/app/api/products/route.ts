import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Product from '@/models/Product';
import { createSuccessResponse, createErrorResponse } from '@/lib/errors';
import { getPaginationParams } from '@/lib/utils';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const category = searchParams.get('category');
    const brand = searchParams.get('brand');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const search = searchParams.get('search');
    const sort = searchParams.get('sort') || '-createdAt';

    const { skip } = getPaginationParams(page, limit);

    // Build filter
    const filter: any = {};

    if (category) filter.category = category;
    if (brand) filter.brand = brand;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseInt(minPrice);
      if (maxPrice) filter.price.$lte = parseInt(maxPrice);
    }

    // Get total count for pagination
    const total = await Product.countDocuments(filter);

    // Get products
    const products = await Product.find(filter)
      .populate('category')
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .exec();

    return NextResponse.json(
      createSuccessResponse(
        {
          products,
          pagination: {
            page,
            limit,
            total,
            pages: Math.ceil(total / limit),
          },
        },
        'Products fetched successfully'
      )
    );
  } catch (error) {
    console.error('Get products error:', error);
    return NextResponse.json(
      createErrorResponse(500, 'Internal server error'),
      { status: 500 }
    );
  }
}
