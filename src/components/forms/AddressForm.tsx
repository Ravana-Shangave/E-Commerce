'use client';

import React from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { addressSchema, type AddressInput } from '@/lib/validations';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

interface AddressFormProps {
  onSubmit: (data: AddressInput) => Promise<void>;
  isLoading?: boolean;
}

const AddressForm: React.FC<AddressFormProps> = ({ onSubmit, isLoading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddressInput>({
    resolver: zodResolver(addressSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        {...register('name')}
        label="Full Name"
        placeholder="John Doe"
        error={errors.name?.message}
      />
      <Input
        {...register('phone')}
        label="Phone"
        placeholder="+1 234 567 8900"
        error={errors.phone?.message}
      />
      <Input
        {...register('street')}
        label="Street Address"
        placeholder="123 Main Street"
        error={errors.street?.message}
      />
      <div className="grid grid-cols-2 gap-4">
        <Input
          {...register('city')}
          label="City"
          placeholder="New York"
          error={errors.city?.message}
        />
        <Input
          {...register('state')}
          label="State"
          placeholder="NY"
          error={errors.state?.message}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Input
          {...register('zipCode')}
          label="Zip Code"
          placeholder="10001"
          error={errors.zipCode?.message}
        />
        <Input
          {...register('country')}
          label="Country"
          placeholder="USA"
          error={errors.country?.message}
        />
      </div>
      <Button type="submit" isLoading={isSubmitting || isLoading} className="w-full">
        Save Address
      </Button>
    </form>
  );
};

export default AddressForm;
