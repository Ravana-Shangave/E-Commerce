'use client';

import React from 'react';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import Providers from '@/providers';
import '@/styles/globals.css';

export const metadata = {
  title: 'ShopSphere - E-Commerce Platform',
  description: 'Shop the best products online',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
