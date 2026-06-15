'use client';

import React from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginInput } from '@/lib/validations';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const LoginForm: React.FC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      toast.success('Login successful!');
      router.push('/dashboard');
    } catch (error: any) {
      toast.error(error.message || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
      <Button type="submit" isLoading={isSubmitting} className="w-full">
        Sign In
      </Button>
    </form>
  );
};

export default LoginForm;
