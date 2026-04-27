// src/renderer/components/dashboard/AnalyticsQuickLinks.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Calendar,
  BarChart3,
  Users,
  DollarSign,
  Package2,
  RefreshCw,
} from 'lucide-react';

interface LinkItem {
  title: string;
  description: string;
  path: string;
  icon: React.ElementType;
  color: string;
}

const links: LinkItem[] = [
  {
    title: 'Daily Sales',
    description: 'View sales by day and payment method',
    path: '/sales/daily',
    icon: Calendar,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Sales Reports',
    description: 'Detailed sales analytics and stats',
    path: '/sales/reports',
    icon: BarChart3,
    color: 'from-emerald-500 to-teal-500',
  },
  {
    title: 'Customer Insights',
    description: 'Loyalty, spending & segmentation',
    path: '/reports/customer',
    icon: Users,
    color: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Financial Reports',
    description: 'Revenue, profit & loss',
    path: '/reports/financial',
    icon: DollarSign,
    color: 'from-amber-500 to-orange-500',
  },
  {
    title: 'Inventory Reports',
    description: 'Stock levels & movements',
    path: '/reports/inventory',
    icon: Package2,
    color: 'from-indigo-500 to-blue-500',
  },
  {
    title: 'Returns & Refunds',
    description: 'Return trends and analysis',
    path: '/sales/returns',
    icon: RefreshCw,
    color: 'from-rose-500 to-red-500',
  },
];

const AnalyticsQuickLinks: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {links.map((link) => (
        <button
          key={link.path}
          onClick={() => navigate(link.path)}
          className="group relative bg-[var(--card-bg)] backdrop-blur-sm border border-[var(--border-color)] rounded-2xl p-5 text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:border-[var(--accent-blue)]/50 hover:-translate-y-1 overflow-hidden"
        >
          {/* Animated gradient background on hover */}
          <div className={`absolute inset-0 bg-gradient-to-br ${link.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
          <div className="relative z-10">
            <div className="w-12 h-12 rounded-xl bg-[var(--accent-blue-light)] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <link.icon className="w-6 h-6 text-[var(--accent-blue)] group-hover:text-[var(--primary-color)]" />
            </div>
            <h4 className="text-[var(--text-primary)] font-semibold text-base mb-1">
              {link.title}
            </h4>
            <p className="text-[var(--text-tertiary)] text-xs leading-relaxed">
              {link.description}
            </p>
          </div>
          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-xs font-medium text-[var(--accent-blue)]">↗</span>
          </div>
        </button>
      ))}
    </div>
  );
};

export default AnalyticsQuickLinks;