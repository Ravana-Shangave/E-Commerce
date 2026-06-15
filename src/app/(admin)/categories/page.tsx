'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import AdminTable from '@/components/admin/AdminTable';
import { Plus } from 'lucide-react';

const AdminCategoriesPage: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (session?.user?.role !== 'admin') {
      router.push('/');
      return;
    }
    fetchCategories();
  }, [session, router]);

  const fetchCategories = async () => {
    try {
      // Mock data
      setCategories([
        { _id: '1', name: 'Electronics', slug: 'electronics', description: 'Electronic items' },
        { _id: '2', name: 'Fashion', slug: 'fashion', description: 'Clothing and accessories' },
        { _id: '3', name: 'Home', slug: 'home', description: 'Home and garden items' },
      ]);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCategories = categories.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Slug', accessor: 'slug' },
    { header: 'Description', accessor: 'description' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Categories Management</h1>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Category
        </Button>
      </div>

      {showForm && (
        <div className="bg-card border border-border rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">Add New Category</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Category Name" placeholder="Enter category name" />
            <Input label="Slug" placeholder="category-slug" />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              className="w-full border border-input rounded-lg p-2 bg-background"
              rows={3}
              placeholder="Enter category description"
            />
          </div>
          <div className="flex gap-2 mt-4">
            <Button>Save Category</Button>
            <Button variant="secondary" onClick={() => setShowForm(false)}>Cancel</Button>
          </div>
        </div>
      )}

      <div className="bg-card border border-border rounded-lg p-6 mb-6">
        <Input
          placeholder="Search categories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="text-center py-8">Loading categories...</div>
      ) : (
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <AdminTable
            columns={columns}
            data={filteredCategories}
            onEdit={(category) => console.log('Edit:', category)}
            onDelete={(category) => console.log('Delete:', category)}
          />
        </div>
      )}
    </div>
  );
};

export default AdminCategoriesPage;
