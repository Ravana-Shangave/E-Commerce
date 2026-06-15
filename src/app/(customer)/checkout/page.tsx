'use client';

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import AddressForm from '@/components/forms/AddressForm';
import { AddressInput } from '@/lib/validations';
import toast from 'react-hot-toast';

const CheckoutPage: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [orderData, setOrderData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  if (!session) {
    router.push('/auth/login');
    return null;
  }

  const handleAddressSubmit = async (data: AddressInput) => {
    try {
      setLoading(true);
      // Save address logic here
      setOrderData({ ...orderData, shippingAddress: data });
      setStep(2);
      toast.success('Address saved successfully');
    } catch (error: any) {
      toast.error(error.message || 'Failed to save address');
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSubmit = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...orderData,
          paymentMethod: 'stripe',
        }),
      });

      if (!response.ok) throw new Error('Failed to create order');

      const data = await response.json();
      toast.success('Order placed successfully!');
      router.push(`/order-confirmation/${data.data.order._id}`);
    } catch (error: any) {
      toast.error(error.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      {/* Progress Steps */}
      <div className="flex justify-between mb-12">
        {[1, 2, 3].map((stepNum) => (
          <div
            key={stepNum}
            className={`flex-1 text-center pb-4 border-b-4 ${
              stepNum <= step ? 'border-primary' : 'border-border'
            }`}
          >
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 font-bold ${
                stepNum <= step
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {stepNum}
            </div>
            <p className="text-sm font-medium">
              {stepNum === 1 ? 'Shipping' : stepNum === 2 ? 'Payment' : 'Confirmation'}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="md:col-span-2">
          {step === 1 && (
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-6">Shipping Address</h2>
              <AddressForm onSubmit={handleAddressSubmit} isLoading={loading} />
            </div>
          )}

          {step === 2 && (
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-6">Payment Method</h2>
              <div className="space-y-4 mb-6">
                <label className="flex items-center border border-input rounded-lg p-4 cursor-pointer hover:bg-muted">
                  <input type="radio" name="payment" value="stripe" defaultChecked className="mr-4" />
                  <span className="font-medium">Credit/Debit Card</span>
                </label>
                <label className="flex items-center border border-input rounded-lg p-4 cursor-pointer hover:bg-muted">
                  <input type="radio" name="payment" value="paypal" className="mr-4" />
                  <span className="font-medium">PayPal</span>
                </label>
              </div>
              <div className="border border-input rounded-lg p-4 mb-6">
                <p className="text-sm text-muted-foreground mb-4">Stripe Payment Form would go here</p>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium mb-1">Card Number</label>
                    <input
                      type="text"
                      placeholder="4242 4242 4242 4242"
                      className="w-full border border-input rounded px-3 py-2 bg-background"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Expiry</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full border border-input rounded px-3 py-2 bg-background"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">CVC</label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full border border-input rounded px-3 py-2 bg-background"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <Button variant="secondary" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button onClick={handlePaymentSubmit} isLoading={loading} className="flex-1">
                  Place Order
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="bg-card border border-border rounded-lg p-6 h-fit">
          <h3 className="text-lg font-semibold mb-6">Order Summary</h3>
          <div className="space-y-3 pb-4 border-b border-border">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>$299.99</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tax</span>
              <span>$30.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span>$10.00</span>
            </div>
          </div>
          <div className="flex justify-between mt-6 text-lg font-bold">
            <span>Total</span>
            <span className="text-primary">$339.99</span>
          </div>
          <div className="mt-6 pt-6 border-t border-border">
            <h4 className="font-semibold mb-3">Shipping Address</h4>
            {orderData?.shippingAddress ? (
              <p className="text-sm text-muted-foreground">
                {orderData.shippingAddress.street}<br />
                {orderData.shippingAddress.city}, {orderData.shippingAddress.state}<br />
                {orderData.shippingAddress.country} {orderData.shippingAddress.zipCode}
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">Not selected</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
