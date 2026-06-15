'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { CheckCircle, Package, Truck } from 'lucide-react';

const OrderConfirmationPage: React.FC = () => {
  const params = useParams();

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <CheckCircle className="w-24 h-24 text-green-500" />
        </div>

        <h1 className="text-4xl font-bold mb-4">Order Confirmed!</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Thank you for your purchase. Your order has been received and is being processed.
        </p>

        {/* Order Number */}
        <div className="bg-card border border-border rounded-lg p-6 mb-8">
          <p className="text-sm text-muted-foreground mb-2">Order Number</p>
          <p className="text-2xl font-bold text-primary">{params.id}</p>
        </div>

        {/* What's Next */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-6">
            <Package className="w-8 h-8 mx-auto mb-4 text-primary" />
            <h3 className="font-semibold mb-2">Order Confirmed</h3>
            <p className="text-sm text-muted-foreground">You'll receive an email confirmation shortly</p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-6">
            <Truck className="w-8 h-8 mx-auto mb-4 text-primary" />
            <h3 className="font-semibold mb-2">Shipped Soon</h3>
            <p className="text-sm text-muted-foreground">Your order will be shipped within 2-3 business days</p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-6">
            <CheckCircle className="w-8 h-8 mx-auto mb-4 text-primary" />
            <h3 className="font-semibold mb-2">Track Order</h3>
            <p className="text-sm text-muted-foreground">Track your package in real-time</p>
          </div>
        </div>

        {/* Order Details */}
        <div className="bg-card border border-border rounded-lg p-6 mb-8 text-left">
          <h3 className="text-lg font-semibold mb-4">Order Details</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Order Date</span>
              <span className="font-medium">{new Date().toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Estimated Delivery</span>
              <span className="font-medium">Jan 20, 2024</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Order Total</span>
              <span className="font-medium text-primary">$339.99</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={`/order-tracking/${params.id}`}>
            <Button>Track Order</Button>
          </Link>
          <Link href="/products">
            <Button variant="secondary">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
