'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { User, LogOut, MapPin, ShoppingBag, Heart } from 'lucide-react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

const ProfilePage: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('profile');
  const [user, setUser] = useState<any>(null);
  const [addresses, setAddresses] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) {
      router.push('/auth/login');
      return;
    }
    fetchUserData();
  }, [session, router]);

  const fetchUserData = async () => {
    try {
      // Mock data
      setUser({
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1 234 567 8900',
        joinDate: '2024-01-01',
      });
      setAddresses([
        {
          _id: '1',
          name: 'Home',
          street: '123 Main Street',
          city: 'New York',
          state: 'NY',
          zipCode: '10001',
          country: 'USA',
          isDefault: true,
        },
      ]);
      setOrders([
        {
          _id: '1',
          orderNumber: 'ORD-001',
          date: '2024-01-10',
          total: '$299.99',
          status: 'delivered',
        },
        {
          _id: '2',
          orderNumber: 'ORD-002',
          date: '2024-01-15',
          total: '$399.99',
          status: 'processing',
        },
      ]);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!session || loading) {
    return <div className="container mx-auto px-4 py-16 text-center">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Account</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="bg-card border border-border rounded-lg p-6 h-fit">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-3 text-2xl">
              {session.user?.name?.charAt(0).toUpperCase()}
            </div>
            <h3 className="font-semibold">{session.user?.name}</h3>
            <p className="text-sm text-muted-foreground">{session.user?.email}</p>
          </div>

          <nav className="space-y-2">
            {[
              { id: 'profile', label: 'Profile', icon: <User className="w-4 h-4" /> },
              { id: 'addresses', label: 'Addresses', icon: <MapPin className="w-4 h-4" /> },
              { id: 'orders', label: 'Orders', icon: <ShoppingBag className="w-4 h-4" /> },
              { id: 'wishlist', label: 'Wishlist', icon: <Heart className="w-4 h-4" /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </nav>

          <button
            onClick={() => signOut()}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-destructive hover:text-destructive-foreground transition-colors mt-6"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>

        {/* Main Content */}
        <div className="md:col-span-3">
          {/* Profile Tab */}
          {activeTab === 'profile' && user && (
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-6">Profile Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input label="Full Name" value={user.name} disabled />
                <Input label="Email" value={user.email} disabled />
                <Input label="Phone" value={user.phone} />
                <Input label="Member Since" value={user.joinDate} disabled />
              </div>
              <Button className="mt-6">Update Profile</Button>
            </div>
          )}

          {/* Addresses Tab */}
          {activeTab === 'addresses' && (
            <div className="space-y-6">
              {addresses.map((address) => (
                <div key={address._id} className="bg-card border border-border rounded-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-semibold text-lg">{address.name}</h3>
                    {address.isDefault && (
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-muted-foreground mb-4">
                    {address.street}<br />
                    {address.city}, {address.state} {address.zipCode}<br />
                    {address.country}
                  </p>
                  <div className="flex gap-2">
                    <Button variant="secondary" size="sm">
                      Edit
                    </Button>
                    <Button variant="destructive" size="sm">
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
              <Button className="w-full">Add New Address</Button>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order._id} className="bg-card border border-border rounded-lg p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">{order.orderNumber}</h3>
                      <p className="text-sm text-muted-foreground">{order.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-primary">{order.total}</p>
                      <span className={`text-sm font-medium ${
                        order.status === 'delivered'
                          ? 'text-green-600'
                          : order.status === 'processing'
                          ? 'text-blue-600'
                          : 'text-yellow-600'
                      }`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Link href={`/order-tracking/${order._id}`}>
                      <Button variant="secondary" size="sm">
                        Track Order
                      </Button>
                    </Link>
                    <Button variant="secondary" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Wishlist Tab */}
          {activeTab === 'wishlist' && (
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <Heart className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-4">Your wishlist is empty</p>
              <Link href="/products">
                <Button>Continue Shopping</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
