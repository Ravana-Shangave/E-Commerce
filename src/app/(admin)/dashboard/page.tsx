'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import StatCard from '@/components/admin/StatCard';
import AnalyticsChart from '@/components/admin/AnalyticsChart';
import { Users, ShoppingCart, Package, DollarSign } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.role !== 'admin') {
      router.push('/');
      return;
    }
    fetchStats();
  }, [session, router]);

  const fetchStats = async () => {
    try {
      // Mock data - replace with actual API call
      setStats({
        totalUsers: 1250,
        totalProducts: 850,
        totalOrders: 3420,
        revenue: 125400,
        revenueChange: '+12.5%',
        ordersChange: '+8.2%',
        usersChange: '+5.4%',
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-16 text-center">Loading dashboard...</div>;
  }

  const chartData = [
    { name: 'Jan', value: 8000 },
    { name: 'Feb', value: 12000 },
    { name: 'Mar', value: 15000 },
    { name: 'Apr', value: 13000 },
    { name: 'May', value: 18000 },
    { name: 'Jun', value: 20000 },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button>Generate Report</Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={<Users className="w-8 h-8" />}
          label="Total Users"
          value={stats?.totalUsers}
          change={stats?.usersChange}
        />
        <StatCard
          icon={<Package className="w-8 h-8" />}
          label="Total Products"
          value={stats?.totalProducts}
        />
        <StatCard
          icon={<ShoppingCart className="w-8 h-8" />}
          label="Total Orders"
          value={stats?.totalOrders}
          change={stats?.ordersChange}
        />
        <StatCard
          icon={<DollarSign className="w-8 h-8" />}
          label="Revenue"
          value={`$${stats?.revenue.toLocaleString()}`}
          change={stats?.revenueChange}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <AnalyticsChart data={chartData} title="Monthly Revenue" />
        <AnalyticsChart data={chartData} title="Monthly Orders" />
      </div>

      {/* Quick Actions */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Button className="w-full">Add Product</Button>
          <Button className="w-full">Manage Orders</Button>
          <Button className="w-full">Manage Users</Button>
          <Button className="w-full">View Reports</Button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
