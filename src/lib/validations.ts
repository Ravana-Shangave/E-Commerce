import { z } from 'zod';

// Auth Schemas
export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export const resetPasswordSchema = z.object({
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

// Product Schemas
export const createProductSchema = z.object({
  name: z.string().min(3).max(100),
  description: z.string().min(10),
  price: z.number().min(0),
  originalPrice: z.number().optional(),
  category: z.string(),
  brand: z.string().optional(),
  stock: z.number().min(0),
  images: z.array(z.string()),
  discount: z.number().min(0).max(100).optional(),
  isFeatured: z.boolean().optional(),
});

export const updateProductSchema = createProductSchema.partial();

// Category Schemas
export const createCategorySchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().optional(),
  image: z.string().optional(),
});

export const updateCategorySchema = createCategorySchema.partial();

// Address Schemas
export const addressSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(10),
  street: z.string().min(5),
  city: z.string().min(2),
  state: z.string().min(2),
  zipCode: z.string().min(5),
  country: z.string().min(2),
  isDefault: z.boolean().optional(),
});

// Review Schemas
export const createReviewSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().min(10).max(1000),
});

// Coupon Schemas
export const createCouponSchema = z.object({
  code: z.string().min(3).max(20).toUpperCase(),
  description: z.string().optional(),
  discount: z.number().min(0),
  discountType: z.enum(['percentage', 'fixed']),
  expiryDate: z.string().datetime(),
  minOrderValue: z.number().optional(),
  maxUsageCount: z.number().optional(),
});

// Cart Schemas
export const addToCartSchema = z.object({
  productId: z.string(),
  quantity: z.number().min(1),
  variant: z.record(z.string()).optional(),
});

export const updateCartItemSchema = z.object({
  quantity: z.number().min(1),
});

// Checkout Schemas
export const checkoutSchema = z.object({
  shippingAddress: addressSchema,
  couponCode: z.string().optional(),
  paymentMethod: z.enum(['stripe', 'paypal']),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type CreateProductInput = z.infer<typeof createProductSchema>;
export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type AddressInput = z.infer<typeof addressSchema>;
export type CreateReviewInput = z.infer<typeof createReviewSchema>;
export type AddToCartInput = z.infer<typeof addToCartSchema>;
export type CheckoutInput = z.infer<typeof checkoutSchema>;
