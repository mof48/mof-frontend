import React from 'react';
import AdminLayout from '@/components/AdminLayout';
import DashboardHero from '@/components/DashboardHero';
import ChartPanel from '@/components/AdminPanels/ChartPanel';
import StatsPanel from '@/components/AdminPanels/StatsPanel';
import ApprovalList from '@/components/AdminPanels/ApprovalList';

const AdminOverview = () => {
  return (
    <AdminLayout>
      <div className="pt-12 px-6 max-w-7xl mx-auto">
        <DashboardHero
          name="Admin"
          tier="admin"
          message="Welcome back to the empire."
        />
        <StatsPanel />
        <ChartPanel />
        <ApprovalList />
      </div>
    </AdminLayout>
  );
};

export default AdminOverview;
