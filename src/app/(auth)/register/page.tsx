'use client';

import React from 'react';
import RegisterForm from '@/components/forms/RegisterForm';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const RegisterPage: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push('/dashboard');
    }
  }, [session, router]);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto">
        <div className="bg-card border border-border rounded-lg p-8">
          <h1 className="text-2xl font-bold mb-2 text-center">Create Account</h1>
          <p className="text-center text-muted-foreground mb-6">Join ShopSphere today</p>

          <RegisterForm />

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-primary hover:underline font-semibold">
                Sign in
              </Link>
            </p>
          </div>

          <div className="mt-6 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-card text-muted-foreground">Or sign up with</span>
            </div>
          </div>

          <button className="w-full mt-6 py-2 border border-input rounded-lg hover:bg-muted transition-colors">
            <span className="flex items-center justify-center gap-2">
              <span>🔵</span>
              Google
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
