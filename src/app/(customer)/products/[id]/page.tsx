'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import { Product, Review } from '@/types';
import { Star, ShoppingCart, Heart, Share2 } from 'lucide-react';

const ProductDetailPage: React.FC = () => {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchProduct();
  }, [params.id]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`/api/products/${params.id}`);
      const data = await response.json();
      setProduct(data.data?.product);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-16 text-center">Loading...</div>;
  }

  if (!product) {
    return <div className="container mx-auto px-4 py-16 text-center">Product not found</div>;
  }

  const discountedPrice = product.discount
    ? product.price * (1 - product.discount / 100)
    : product.price;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Images */}
        <div>
          <div className="bg-muted rounded-lg overflow-hidden mb-4 h-96">
            {product.images[selectedImage] && (
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                width={500}
                height={500}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div className="flex gap-2">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`w-20 h-20 rounded border-2 overflow-hidden ${
                  selectedImage === idx ? 'border-primary' : 'border-border'
                }`}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${idx}`}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Details */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-6">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(product.rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-muted-foreground">({product.reviews?.length || 0} reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-3xl font-bold text-primary">${discountedPrice.toFixed(2)}</span>
            {product.discount && (
              <>
                <span className="text-xl text-muted-foreground line-through">${product.price.toFixed(2)}</span>
                <span className="bg-destructive text-destructive-foreground px-3 py-1 rounded text-sm font-semibold">
                  -{product.discount}%
                </span>
              </>
            )}
          </div>

          <p className="text-muted-foreground mb-6">{product.description}</p>

          {/* Stock Status */}
          <div className="mb-6">
            <p className={`text-sm font-semibold ${
              product.stock > 0 ? 'text-green-600' : 'text-destructive'
            }`}>
              {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
            </p>
          </div>

          {/* Quantity & Actions */}
          <div className="flex gap-4 mb-6">
            <div className="flex items-center border border-input rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2 hover:bg-muted"
              >
                -
              </button>
              <span className="px-4 py-2 border-l border-r border-input">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-2 hover:bg-muted"
              >
                +
              </button>
            </div>
            <Button className="flex-1" disabled={product.stock === 0}>
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add to Cart
            </Button>
            <Button variant="secondary" className="px-6">
              <Heart className="w-5 h-5" />
            </Button>
            <Button variant="secondary" className="px-6">
              <Share2 className="w-5 h-5" />
            </Button>
          </div>

          {/* Additional Info */}
          <div className="border-t border-border pt-6 space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Brand: <span className="font-semibold text-foreground">{product.brand || 'N/A'}</span></p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Category: <span className="font-semibold text-foreground">{(product.category as any)?.name || 'N/A'}</span></p>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="max-w-2xl">
        <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
        {product.reviews && product.reviews.length > 0 ? (
          <div className="space-y-4">
            {product.reviews.map((review: Review) => (
              <div key={review._id} className="border border-border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="mb-2">{review.comment}</p>
                <p className="text-sm text-muted-foreground">Helpful ({review.helpful || 0})</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
