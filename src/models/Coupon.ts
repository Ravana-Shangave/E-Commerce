import mongoose, { Schema, Document } from 'mongoose';

export interface ICoupon extends Document {
  code: string;
  description: string;
  discount: number;
  discountType: 'percentage' | 'fixed';
  expiryDate: Date;
  minOrderValue?: number;
  maxUsageCount?: number;
  usageCount: number;
  usedBy: mongoose.Types.ObjectId[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const couponSchema = new Schema<ICoupon>(
  {
    code: {
      type: String,
      required: [true, 'Please provide a coupon code'],
      unique: true,
      uppercase: true,
    },
    description: String,
    discount: {
      type: Number,
      required: true,
      min: 0,
    },
    discountType: {
      type: String,
      enum: ['percentage', 'fixed'],
      default: 'percentage',
    },
    expiryDate: {
      type: Date,
      required: true,
    },
    minOrderValue: {
      type: Number,
      default: 0,
    },
    maxUsageCount: Number,
    usageCount: {
      type: Number,
      default: 0,
    },
    usedBy: [{
      type: Schema.Types.ObjectId,
      ref: 'User',
    }],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

couponSchema.index({ code: 1 });
couponSchema.index({ isActive: 1 });

export default mongoose.models.Coupon || mongoose.model<ICoupon>('Coupon', couponSchema);
