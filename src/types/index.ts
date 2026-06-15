// User Types
export interface User {
  _id: string;
  name: string;
  email: string;
  password?: string;
  image?: string;
  role: 'customer' | 'admin';
  isEmailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile extends User {
  phone?: string;
  addresses: Address[];
  wishlist: string[];
}

// Product Types
export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  brand?: string;
  stock: number;
  rating: number;
  reviews: Review[];
  variants?: ProductVariant[];
  isFeatured: boolean;
  discount?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductVariant {
  type: string;
  values: string[];
}

export interface Review {
  _id: string;
  userId: string;
  productId: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

// Cart Types
export interface CartItem {
  _id: string;
  productId: string;
  quantity: number;
  variant?: Record<string, string>;
  price: number;
}

export interface Cart {
  _id: string;
  userId: string;
  items: CartItem[];
  createdAt: Date;
  updatedAt: Date;
}

// Order Types
export interface Order {
  _id: string;
  userId: string;
  items: CartItem[];
  totalPrice: number;
  shippingAddress: Address;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'completed' | 'failed';
  paymentMethod: 'stripe' | 'paypal';
  trackingNumber?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Address Types
export interface Address {
  _id?: string;
  userId?: string;
  name: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault?: boolean;
}

// Category Types
export interface Category {
  _id: string;
  name: string;
  description: string;
  image?: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

// Coupon Types
export interface Coupon {
  _id: string;
  code: string;
  description: string;
  discount: number;
  discountType: 'percentage' | 'fixed';
  expiryDate: Date;
  minOrderValue?: number;
  maxUsageCount?: number;
  usageCount: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Payment Types
export interface Payment {
  _id: string;
  orderId: string;
  userId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  paymentMethod: string;
  transactionId: string;
  createdAt: Date;
  updatedAt: Date;
}

// Wishlist Types
export interface Wishlist {
  _id: string;
  userId: string;
  products: string[];
  createdAt: Date;
  updatedAt: Date;
}
