// src/components/AdminPanels/StatsPanel.jsx
import React from 'react';

const StatCard = ({ title, value }) => (
  <div className="bg-white/10 border border-gold rounded-xl p-6 shadow-lg">
    <h2 className="text-sm text-rose-200 uppercase mb-2">{title}</h2>
    <p className="text-2xl font-bold text-white">{value}</p>
  </div>
);

const StatsPanel = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-8">
      <StatCard title="Total Members" value={stats?.totalMembers || 0} />
      <StatCard title="Pending Approvals" value={stats?.pendingApprovals || 0} />
      <StatCard title="Revenue" value={`$${(stats?.revenue || 0).toLocaleString()}`} />
      <StatCard title="New Signups" value={stats?.newSignups || 0} />
    </div>
  );
};

export default StatsPanel;
