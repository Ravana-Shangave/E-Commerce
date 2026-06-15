'use client';

import React from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { Mail, MapPin, Phone, Clock } from 'lucide-react';

const ContactPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-center">Contact Us</h1>
        <p className="text-center text-muted-foreground mb-12">
          Have a question? We'd love to hear from you. Get in touch with us today.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-card border border-border rounded-lg p-6">
            <Mail className="w-8 h-8 text-primary mb-4" />
            <h3 className="font-semibold mb-2">Email</h3>
            <p className="text-muted-foreground">support@shopsphere.com</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <Phone className="w-8 h-8 text-primary mb-4" />
            <h3 className="font-semibold mb-2">Phone</h3>
            <p className="text-muted-foreground">+1 (800) 123-4567</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <MapPin className="w-8 h-8 text-primary mb-4" />
            <h3 className="font-semibold mb-2">Address</h3>
            <p className="text-muted-foreground">123 Commerce Street<br />New York, NY 10001</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <Clock className="w-8 h-8 text-primary mb-4" />
            <h3 className="font-semibold mb-2">Hours</h3>
            <p className="text-muted-foreground">Mon - Fri: 9am - 6pm<br />Sat - Sun: 10am - 4pm</p>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-6">Send us a Message</h2>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your Name"
                className="border border-input rounded-lg px-4 py-2 bg-background"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="border border-input rounded-lg px-4 py-2 bg-background"
              />
            </div>
            <input
              type="text"
              placeholder="Subject"
              className="w-full border border-input rounded-lg px-4 py-2 bg-background"
            />
            <textarea
              placeholder="Your Message"
              rows={6}
              className="w-full border border-input rounded-lg px-4 py-2 bg-background"
            />
            <Button className="w-full">Send Message</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
