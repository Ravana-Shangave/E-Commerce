'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import AdminTable from '@/components/admin/AdminTable';

const AdminOrdersPage: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (session?.user?.role !== 'admin') {
      router.push('/');
      return;
    }
    fetchOrders();
  }, [session, router]);

  const fetchOrders = async () => {
    try {
      // Mock data
      setOrders([
        {
          _id: '1',
          orderNumber: 'ORD-001',
          customer: 'John Doe',
          total: 299.99,
          status: 'delivered',
          date: '2024-01-15',
        },
        {
          _id: '2',
          orderNumber: 'ORD-002',
          customer: 'Jane Smith',
          total: 599.99,
          status: 'processing',
          date: '2024-01-16',
        },
        {
          _id: '3',
          orderNumber: 'ORD-003',
          customer: 'Bob Johnson',
          total: 149.99,
          status: 'pending',
          date: '2024-01-17',
        },
      ]);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = orders.filter(o =>
    filter === 'all' ? true : o.status === filter
  );

  const columns = [
    { header: 'Order #', accessor: 'orderNumber' },
    { header: 'Customer', accessor: 'customer' },
    { header: 'Total', accessor: 'total', render: (val: number) => `$${val.toFixed(2)}` },
    {
      header: 'Status',
      accessor: 'status',
      render: (val: string) => (
        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
          val === 'delivered' ? 'bg-green-100 text-green-800' :
          val === 'processing' ? 'bg-blue-100 text-blue-800' :
          'bg-yellow-100 text-yellow-800'
        }`}>
          {val}
        </span>
      ),
    },
    { header: 'Date', accessor: 'date' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Orders Management</h1>

      <div className="flex gap-2 mb-6">
        {['all', 'pending', 'processing', 'delivered'].map((status) => (
          <Button
            key={status}
            variant={filter === status ? 'primary' : 'secondary'}
            onClick={() => setFilter(status)}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-8">Loading orders...</div>
      ) : (
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <AdminTable
            columns={columns}
            data={filteredOrders}
            onEdit={(order) => console.log('Edit:', order)}
          />
        </div>
      )}
    </div>
  );
};

export default AdminOrdersPage;
