'use client';

import React from 'react';
import { Users, ShoppingCart, Package, DollarSign } from 'lucide-react';

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  change?: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, change }) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-2xl font-bold mt-2">{value}</p>
          {change && <p className="text-sm text-green-600 mt-1">{change}</p>}
        </div>
        <div className="text-primary opacity-20">{icon}</div>
      </div>
    </div>
  );
};

export default StatCard;
