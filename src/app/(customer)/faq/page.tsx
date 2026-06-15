'use client';

import React from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { HelpCircle } from 'lucide-react';

const FAQPage: React.FC = () => {
  const faqs = [
    {
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy for all products in original condition. Items must be returned with proof of purchase.',
    },
    {
      question: 'How long does shipping take?',
      answer: 'Standard shipping typically takes 5-7 business days. Express shipping options are available for 2-3 day delivery.',
    },
    {
      question: 'Do you offer international shipping?',
      answer: 'Yes, we ship to over 100 countries worldwide. International shipping rates and times vary by location.',
    },
    {
      question: 'Can I cancel my order?',
      answer: 'Orders can be cancelled within 24 hours of placement. Contact our support team for assistance.',
    },
    {
      question: 'Is my payment information secure?',
      answer: 'Yes, we use industry-standard SSL encryption to protect your payment information. Your data is secure.',
    },
    {
      question: 'How do I track my order?',
      answer: 'Once shipped, you will receive a tracking number via email. You can track your order status on your account page.',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-4 text-center">Frequently Asked Questions</h1>
      <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
        Find answers to common questions about our products, shipping, returns, and more.
      </p>

      <div className="max-w-3xl mx-auto space-y-6">
        {faqs.map((faq, index) => (
          <details key={index} className="bg-card border border-border rounded-lg p-6 group cursor-pointer">
            <summary className="flex items-center justify-between font-semibold hover:text-primary">
              <span>{faq.question}</span>
              <span className="text-primary group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="text-muted-foreground mt-4">{faq.answer}</p>
          </details>
        ))}
      </div>

      <div className="mt-16 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-8 text-center">
        <HelpCircle className="w-12 h-12 mx-auto text-blue-600 dark:text-blue-400 mb-4" />
        <h2 className="text-2xl font-semibold mb-4">Didn't find your answer?</h2>
        <p className="text-muted-foreground mb-6">Our support team is here to help. Feel free to reach out to us.</p>
        <Link href="/contact">
          <Button>Contact Support</Button>
        </Link>
      </div>
    </div>
  );
};

export default FAQPage;
