// src/renderer/pages/Dashboard.tsx
import React from 'react';
import { format } from 'date-fns';
import useDashboardData from './hooks/useDashboardData';
import SummaryCards from './components/SummaryCards';
import SalesChart from './components/SalesChart';
import LowStockTable from './components/LowStockTable';
import ActivityTimeline from './components/ActivityTimeline';
import TopProductsTable from './components/TopProductsTable';
import CustomerStats from './components/CustomerStats';
import AnalyticsQuickLinks from './components/AnalyticsQuickLinks';

const DashboardPage: React.FC = () => {
  const {
    summary,
    salesChart,
    lowStockItems,
    recentActivities,
    topProducts,
    customerStats,
    loading,
    chartPeriod,
    onPeriodChange,
  } = useDashboardData();

  const today = format(new Date(), 'EEEE, MMMM d, yyyy');

  return (
    <div className="p-6 space-y-8 bg-[var(--background-color)] min-h-screen">
      {/* Header with greeting */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[var(--text-primary)] to-[var(--text-secondary)] bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-[var(--text-tertiary)] mt-1">{today}</p>
        </div>
        <div className="hidden md:block">
          <div className="px-4 py-2 rounded-full bg-[var(--accent-blue-light)] text-[var(--accent-blue)] text-sm font-medium">
            Live Updates
          </div>
        </div>
      </div>

      {/* Summary Cards (enhanced) */}
      <SummaryCards summary={summary} isLoading={loading.summary} />

      {/* Analytics Quick Links - new section */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-6 rounded-full bg-[var(--accent-blue)]" />
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">Quick Analytics</h2>
        </div>
        <AnalyticsQuickLinks />
      </div>

      {/* Chart + Low Stock */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SalesChart
            data={salesChart}
            period={chartPeriod}
            onPeriodChange={onPeriodChange}
            isLoading={loading.chart}
          />
        </div>
        <div>
          <LowStockTable items={lowStockItems} isLoading={loading.lowStock} />
        </div>
      </div>

      {/* Bottom row: Activities, Top Products, Customer Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ActivityTimeline activities={recentActivities} isLoading={loading.activities} />
        <TopProductsTable products={topProducts} isLoading={loading.topProducts} />
        <CustomerStats stats={customerStats} isLoading={loading.customerStats} />
      </div>
    </div>
  );
};

export default DashboardPage;