'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FilterOption {
  label: string;
  value: string;
}

interface ProductFiltersProps {
  onFilterChange: (filters: any) => void;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    category: '',
    brand: '',
    minPrice: '',
    maxPrice: '',
  });

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const categories: FilterOption[] = [
    { label: 'Electronics', value: 'electronics' },
    { label: 'Fashion', value: 'fashion' },
    { label: 'Home', value: 'home' },
    { label: 'Sports', value: 'sports' },
  ];

  const brands: FilterOption[] = [
    { label: 'Brand A', value: 'brand-a' },
    { label: 'Brand B', value: 'brand-b' },
    { label: 'Brand C', value: 'brand-c' },
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-6">
      <div>
        <h3 className="font-semibold mb-3 flex items-center justify-between cursor-pointer">
          Category
          <ChevronDown className="w-5 h-5" />
        </h3>
        <select
          value={filters.category}
          onChange={(e) => handleFilterChange('category', e.target.value)}
          className="w-full border border-input rounded-lg p-2 bg-background"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <h3 className="font-semibold mb-3 flex items-center justify-between cursor-pointer">
          Brand
          <ChevronDown className="w-5 h-5" />
        </h3>
        <select
          value={filters.brand}
          onChange={(e) => handleFilterChange('brand', e.target.value)}
          className="w-full border border-input rounded-lg p-2 bg-background"
        >
          <option value="">All Brands</option>
          {brands.map((brand) => (
            <option key={brand.value} value={brand.value}>
              {brand.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Price Range</h3>
        <div className="space-y-2">
          <input
            type="number"
            placeholder="Min Price"
            value={filters.minPrice}
            onChange={(e) => handleFilterChange('minPrice', e.target.value)}
            className="w-full border border-input rounded-lg p-2 bg-background"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={filters.maxPrice}
            onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
            className="w-full border border-input rounded-lg p-2 bg-background"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;
