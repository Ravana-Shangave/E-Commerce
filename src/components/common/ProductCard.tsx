'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const discountedPrice = product.discount
    ? product.price * (1 - product.discount / 100)
    : product.price;

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-64 bg-muted">
        {product.images[0] && (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover"
          />
        )}
        {product.discount && (
          <div className="absolute top-2 right-2 bg-destructive text-destructive-foreground px-2 py-1 rounded text-sm font-semibold">
            -{product.discount}%
          </div>
        )}
        <button className="absolute top-2 left-2 bg-white dark:bg-slate-800 rounded-full p-2 hover:bg-gray-100 dark:hover:bg-slate-700">
          <Heart className="w-5 h-5" />
        </button>
      </div>

      <div className="p-4">
        <Link href={`/products/${product._id}`}>
          <h3 className="font-semibold text-lg truncate hover:text-primary">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-2 my-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">({product.reviews?.length || 0})</span>
        </div>

        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-2">
            <span className="text-2xl font-bold text-primary">
              ${discountedPrice.toFixed(2)}
            </span>
            {product.discount && (
              <span className="text-lg text-muted-foreground line-through">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <Button className="flex-1 bg-primary text-primary-foreground">
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
          <Button variant="secondary" className="px-4">
            View
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
