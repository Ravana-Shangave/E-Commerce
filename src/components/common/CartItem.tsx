'use client';

import React from 'react';
import { Trash2 } from 'lucide-react';
import Image from 'next/image';
import Button from '@/components/ui/Button';

interface CartItemProps {
  item: any;
  onQuantityChange: (quantity: number) => void;
  onRemove: () => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onQuantityChange, onRemove }) => {
  return (
    <div className="flex gap-4 border-b border-border pb-4">
      {item.productId?.images?.[0] && (
        <div className="relative h-24 w-24">
          <Image
            src={item.productId.images[0]}
            alt={item.productId.name}
            fill
            className="object-cover rounded"
          />
        </div>
      )}

      <div className="flex-1">
        <h3 className="font-semibold">{item.productId?.name}</h3>
        <p className="text-sm text-muted-foreground mb-2">${item.price.toFixed(2)}</p>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onQuantityChange(Math.max(1, item.quantity - 1))}
            className="px-2 py-1 border border-input rounded"
          >
            -
          </button>
          <span className="px-4">{item.quantity}</span>
          <button
            onClick={() => onQuantityChange(item.quantity + 1)}
            className="px-2 py-1 border border-input rounded"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex flex-col items-end justify-between">
        <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
        <button
          onClick={onRemove}
          className="text-destructive hover:text-destructive/80"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
