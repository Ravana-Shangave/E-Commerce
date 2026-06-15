'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import CartItem from '@/components/common/CartItem';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';

const CartPage: React.FC = () => {
  const { data: session } = useSession();
  const [cart, setCart] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session) {
      fetchCart();
    }
  }, [session]);

  const fetchCart = async () => {
    try {
      const response = await fetch('/api/cart');
      const data = await response.json();
      setCart(data.data?.cart);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!session) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-lg text-muted-foreground mb-4">Please login to view your cart</p>
        <Link href="/auth/login">
          <Button>Sign In</Button>
        </Link>
      </div>
    );
  }

  if (loading) {
    return <div className="container mx-auto px-4 py-16 text-center">Loading cart...</div>;
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <ShoppingCart className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
        <p className="text-lg text-muted-foreground mb-4">Your cart is empty</p>
        <Link href="/products">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  const subtotal = cart.items.reduce((total: number, item: any) => total + item.price * item.quantity, 0);
  const tax = subtotal * 0.1;
  const shipping = 10;
  const total = subtotal + tax + shipping;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="md:col-span-2">
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="space-y-4">
              {cart.items.map((item: any) => (
                <CartItem
                  key={item._id}
                  item={item}
                  onQuantityChange={() => fetchCart()}
                  onRemove={() => fetchCart()}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-card border border-border rounded-lg p-6 h-fit">
          <h3 className="font-semibold text-lg mb-4">Order Summary</h3>
          <div className="space-y-3 mb-4 pb-4 border-b border-border">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
          </div>
          <div className="flex justify-between mb-6 text-lg font-bold">
            <span>Total</span>
            <span className="text-primary">${total.toFixed(2)}</span>
          </div>
          <Link href="/checkout" className="w-full block">
            <Button className="w-full">Proceed to Checkout</Button>
          </Link>
          <Link href="/products" className="block mt-3 text-center text-primary hover:underline">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
