'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { ArrowRight, Package, Truck, Award } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold mb-6">Welcome to ShopSphere</h1>
            <p className="text-xl mb-8 opacity-90">
              Discover millions of products at unbeatable prices. Shop with confidence on the most trusted e-commerce platform.
            </p>
            <div className="flex gap-4">
              <Link href="/products">
                <Button className="bg-white text-primary hover:bg-gray-100">
                  Shop Now <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Button variant="secondary" className="border-2 border-white text-white hover:bg-white/10">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-slate-50 dark:bg-slate-950">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose ShopSphere?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Package className="w-12 h-12 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Wide Selection</h3>
              <p className="text-muted-foreground">Browse millions of products from top brands and sellers worldwide.</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Truck className="w-12 h-12 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Shipping</h3>
              <p className="text-muted-foreground">Get your orders delivered quickly with our reliable shipping partners.</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Award className="w-12 h-12 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Best Price Guarantee</h3>
              <p className="text-muted-foreground">We ensure you get the best deals and discounts on all products.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-card border border-border rounded-lg p-4 hover:shadow-lg transition-shadow">
                <div className="bg-muted h-48 rounded mb-4"></div>
                <h3 className="font-semibold mb-2">Product {i}</h3>
                <p className="text-muted-foreground text-sm mb-4">Premium quality product</p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-primary">$99.99</span>
                  <Button size="sm">Add to Cart</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-slate-50 dark:bg-slate-950">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {['Electronics', 'Fashion', 'Home & Garden', 'Sports'].map((cat) => (
              <Link key={cat} href={`/products?category=${cat.toLowerCase()}`}>
                <div className="bg-white dark:bg-slate-800 border border-border rounded-lg p-8 text-center hover:shadow-lg cursor-pointer transition-shadow">
                  <div className="text-4xl mb-4">📦</div>
                  <h3 className="font-semibold text-lg">{cat}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Shopping?</h2>
          <p className="text-xl mb-8 opacity-90">Join thousands of happy customers and find everything you need.</p>
          <Link href="/products">
            <Button className="bg-white text-primary hover:bg-gray-100">
              Browse All Products
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default HomePage;
