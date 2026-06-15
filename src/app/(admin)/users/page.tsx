'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import AdminTable from '@/components/admin/AdminTable';

const AdminUsersPage: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (session?.user?.role !== 'admin') {
      router.push('/');
      return;
    }
    fetchUsers();
  }, [session, router]);

  const fetchUsers = async () => {
    try {
      // Mock data
      setUsers([
        { _id: '1', name: 'John Doe', email: 'john@example.com', role: 'customer', joinDate: '2024-01-01' },
        { _id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'customer', joinDate: '2024-01-05' },
        { _id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'admin', joinDate: '2024-01-10' },
      ]);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    {
      header: 'Role',
      accessor: 'role',
      render: (val: string) => (
        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
          val === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
        }`}>
          {val}
        </span>
      ),
    },
    { header: 'Joined', accessor: 'joinDate' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Users Management</h1>

      <div className="bg-card border border-border rounded-lg p-6 mb-6">
        <Input
          placeholder="Search users by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="text-center py-8">Loading users...</div>
      ) : (
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <AdminTable
            columns={columns}
            data={filteredUsers}
            onEdit={(user) => console.log('Edit:', user)}
            onDelete={(user) => console.log('Delete:', user)}
          />
        </div>
      )}
    </div>
  );
};

export default AdminUsersPage;
