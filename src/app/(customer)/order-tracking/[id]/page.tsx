'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Package, Truck, CheckCircle, Clock } from 'lucide-react';

const OrderTrackingPage: React.FC = () => {
  const params = useParams();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock order tracking data
    setOrder({
      id: params.id,
      status: 'shipped',
      items: [
        { name: 'Product 1', quantity: 1, price: '$199.99' },
        { name: 'Product 2', quantity: 2, price: '$100.00' },
      ],
      timeline: [
        { stage: 'Order Placed', date: '2024-01-10', completed: true },
        { stage: 'Processing', date: '2024-01-11', completed: true },
        { stage: 'Shipped', date: '2024-01-12', completed: true },
        { stage: 'In Transit', date: 'Expected Jan 15', completed: false },
        { stage: 'Delivered', date: 'Expected Jan 16', completed: false },
      ],
      trackingNumber: 'TRK1234567890',
      carrier: 'FedEx',
    });
    setLoading(false);
  }, [params.id]);

  if (loading) {
    return <div className="container mx-auto px-4 py-16 text-center">Loading order tracking...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Track Your Order</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Tracking Timeline */}
        <div className="lg:col-span-2">
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-6">Delivery Timeline</h2>

            <div className="space-y-6">
              {order.timeline.map((event: any, index: number) => (
                <div key={index} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                        event.completed
                          ? 'bg-green-500 text-white'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {event.completed ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        <Clock className="w-6 h-6" />
                      )}
                    </div>
                    {index < order.timeline.length - 1 && (
                      <div className={`w-1 h-16 ${
                        order.timeline[index + 1].completed ? 'bg-green-500' : 'bg-muted'
                      }`} />
                    )}
                  </div>
                  <div className="pt-2">
                    <h3 className="font-semibold">{event.stage}</h3>
                    <p className="text-sm text-muted-foreground">{event.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Items */}
          <div className="bg-card border border-border rounded-lg p-6 mt-8">
            <h2 className="text-xl font-semibold mb-6">Items in Order</h2>
            <div className="space-y-4">
              {order.items.map((item: any, index: number) => (
                <div key={index} className="flex justify-between items-center pb-4 border-b border-border last:border-0">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                  </div>
                  <p className="font-semibold">{item.price}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Tracking Number */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="font-semibold mb-4">Tracking Information</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Carrier</p>
                <p className="font-medium">{order.carrier}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Tracking Number</p>
                <p className="font-mono text-sm bg-muted p-2 rounded">{order.trackingNumber}</p>
              </div>
            </div>
          </div>

          {/* Current Status */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
            <h3 className="font-semibold mb-2">Current Status</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Your package is {order.status} and on its way to you!
            </p>
            <div className="flex items-center justify-center">
              <Truck className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
          </div>

          {/* Contact Support */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="font-semibold mb-4">Need Help?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              If you have any questions about your order, feel free to contact our support team.
            </p>
            <button className="w-full py-2 border border-input rounded-lg hover:bg-muted transition-colors">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTrackingPage;
