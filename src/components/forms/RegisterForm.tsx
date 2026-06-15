'use client';

import React from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, type RegisterInput } from '@/lib/validations';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const RegisterForm: React.FC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterInput) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      toast.success('Registration successful! Please verify your email.');
      router.push('/auth/login');
    } catch (error: any) {
      toast.error(error.message || 'Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        {...register('name')}
        type="text"
        label="Full Name"
        placeholder="John Doe"
        error={errors.name?.message}
      />
      <Input
        {...register('email')}
        type="email"
        label="Email"
        placeholder="you@example.com"
        error={errors.email?.message}
      />
      <Input
        {...register('password')}
        type="password"
        label="Password"
        placeholder="••••••••"
        error={errors.password?.message}
      />
      <Input
        {...register('confirmPassword')}
        type="password"
        label="Confirm Password"
        placeholder="••••••••"
        error={errors.confirmPassword?.message}
      />
      <Button type="submit" isLoading={isSubmitting} className="w-full">
        Create Account
      </Button>
    </form>
  );
};

export default RegisterForm;
