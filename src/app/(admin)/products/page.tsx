'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import AdminTable from '@/components/admin/AdminTable';
import { Plus, Edit2, Trash2 } from 'lucide-react';

const AdminProductsPage: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (session?.user?.role !== 'admin') {
      router.push('/');
      return;
    }
    fetchProducts();
  }, [session, router]);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data.data?.products || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Price', accessor: 'price', render: (val: number) => `$${val.toFixed(2)}` },
    { header: 'Stock', accessor: 'stock' },
    { header: 'Rating', accessor: 'rating', render: (val: number) => `${val.toFixed(1)} ⭐` },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Products Management</h1>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      </div>

      {showForm && (
        <div className="bg-card border border-border rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">Add New Product</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Product Name" placeholder="Enter product name" />
            <Input label="Price" type="number" placeholder="0.00" />
            <Input label="Stock" type="number" placeholder="0" />
            <Input label="Brand" placeholder="Brand name" />
            <Input label="Category" placeholder="Select category" />
            <Input label="Discount %" type="number" placeholder="0" />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              className="w-full border border-input rounded-lg p-2 bg-background"
              rows={4}
              placeholder="Enter product description"
            />
          </div>
          <div className="flex gap-2 mt-4">
            <Button>Save Product</Button>
            <Button variant="secondary" onClick={() => setShowForm(false)}>Cancel</Button>
          </div>
        </div>
      )}

      <div className="bg-card border border-border rounded-lg p-6 mb-6">
        <Input
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="text-center py-8">Loading products...</div>
      ) : (
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <AdminTable
            columns={columns}
            data={filteredProducts}
            onEdit={(product) => console.log('Edit:', product)}
            onDelete={(product) => console.log('Delete:', product)}
          />
        </div>
      )}
    </div>
  );
};

export default AdminProductsPage;
