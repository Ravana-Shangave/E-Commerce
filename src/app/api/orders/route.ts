import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Order from '@/models/Order';
import Cart from '@/models/Cart';
import { createSuccessResponse, createErrorResponse } from '@/lib/errors';
import { auth } from '@/auth';
import { checkoutSchema } from '@/lib/validations';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json(
        createErrorResponse(401, 'Unauthorized'),
        { status: 401 }
      );
    }

    await connectDB();

    const body = await request.json();
    const validation = checkoutSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        createErrorResponse(400, 'Validation failed', validation.error.flatten().fieldErrors as any),
        { status: 400 }
      );
    }

    const userId = (session.user as any).id;
    const cart = await Cart.findOne({ userId }).populate('items.productId').exec();

    if (!cart || cart.items.length === 0) {
      return NextResponse.json(
        createErrorResponse(400, 'Cart is empty'),
        { status: 400 }
      );
    }

    // Calculate total
    let total = 0;
    cart.items.forEach((item: any) => {
      total += item.price * item.quantity;
    });

    // Create order
    const order = await Order.create({
      userId,
      items: cart.items,
      totalPrice: total,
      subtotal: total,
      shippingAddress: validation.data.shippingAddress,
      paymentMethod: validation.data.paymentMethod,
      status: 'pending',
      paymentStatus: 'pending',
    });

    // Create payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(total * 100),
      currency: 'usd',
      metadata: {
        orderId: order._id.toString(),
        userId: userId,
      },
    });

    return NextResponse.json(
      createSuccessResponse(
        {
          order,
          clientSecret: paymentIntent.client_secret,
        },
        'Order created successfully'
      ),
      { status: 201 }
    );
  } catch (error) {
    console.error('Create order error:', error);
    return NextResponse.json(
      createErrorResponse(500, 'Internal server error'),
      { status: 500 }
    );
  }
}
