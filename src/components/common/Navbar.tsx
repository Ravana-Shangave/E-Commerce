'use client';

import React from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { Menu, X, ShoppingCart, User, LogOut } from 'lucide-react';
import { useState } from 'react';

const Navbar: React.FC = () => {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-primary">
            ShopSphere
          </Link>

          <div className="hidden md:flex space-x-8">
            <Link href="/products" className="text-foreground hover:text-primary">
              Products
            </Link>
            <Link href="/categories" className="text-foreground hover:text-primary">
              Categories
            </Link>
            {session?.user?.role === 'admin' && (
              <Link href="/admin" className="text-foreground hover:text-primary">
                Admin
              </Link>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/cart" className="text-foreground hover:text-primary">
              <ShoppingCart className="w-6 h-6" />
            </Link>

            {session?.user ? (
              <div className="flex items-center space-x-4">
                <Link href="/profile" className="text-foreground hover:text-primary">
                  <User className="w-6 h-6" />
                </Link>
                <button
                  onClick={() => signOut()}
                  className="text-foreground hover:text-primary"
                >
                  <LogOut className="w-6 h-6" />
                </button>
              </div>
            ) : (
              <>
                <Link href="/auth/login" className="text-primary font-medium">
                  Sign In
                </Link>
                <Link href="/auth/register" className="bg-primary text-primary-foreground px-4 py-2 rounded-lg">
                  Sign Up
                </Link>
              </>
            )}

            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link href="/products" className="block text-foreground hover:text-primary">
              Products
            </Link>
            <Link href="/categories" className="block text-foreground hover:text-primary">
              Categories
            </Link>
            {session?.user?.role === 'admin' && (
              <Link href="/admin" className="block text-foreground hover:text-primary">
                Admin
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
