'use client';

import React, { useState, useEffect } from 'react';
import ProductCard from '@/components/common/ProductCard';
import ProductFilters from '@/components/common/ProductFilters';
import { Product } from '@/types';

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<any>({});

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams(filters).toString();
      const response = await fetch(`/api/products?${queryParams}`);
      const data = await response.json();
      setProducts(data.data?.products || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Products</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar Filters */}
        <div>
          <ProductFilters onFilterChange={setFilters} />
        </div>

        {/* Products Grid */}
        <div className="md:col-span-3">
          {loading ? (
            <div className="flex items-center justify-center h-96">
              <p className="text-lg text-muted-foreground">Loading products...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="flex items-center justify-center h-96">
              <p className="text-lg text-muted-foreground">No products found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
