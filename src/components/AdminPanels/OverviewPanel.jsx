import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

const OverviewPanel = ({ stats, chartData, range, setRange, recent, onExport, onImpersonate }) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-12">
        <StatCard title="Total Members" value={stats.totalMembers || 0} />
        <StatCard title="Pending Approvals" value={stats.pendingApprovals || 0} />
        <StatCard title="Revenue" value={`$${(stats.revenue || 0).toLocaleString()}`} />
        <StatCard title="New Signups" value={stats.newSignups || 0} />
      </div>

      <div className="bg-white/10 border border-gold rounded-xl p-6 shadow-lg mb-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gold">Signups & Revenue</h2>
          <div className="flex gap-4">
            <select
              value={range}
              onChange={(e) => setRange(e.target.value)}
              className="bg-black border border-white/20 text-white px-3 py-1 rounded-md text-sm"
            >
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
            </select>
            <button
              onClick={onExport}
              className="bg-gold hover:bg-yellow-400 text-black font-semibold py-1 px-3 rounded text-sm"
            >
              Export CSV
            </button>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid stroke="#444" strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="signups" stroke="#fbb6ce" name="Signups" />
            <Line type="monotone" dataKey="revenue" stroke="#FFD700" name="Revenue" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white/10 border border-gold rounded-xl p-6 shadow-lg">
        <h2 className="text-lg font-semibold text-gold mb-4">Recent Member Approvals</h2>
        {recent.length === 0 ? (
          <p className="text-rose-200 italic">No recent activity</p>
        ) : (
          <ul className="space-y-3 text-sm text-white">
            {recent.map((r, i) => (
              <li key={i} className="border-b border-white/10 pb-2 flex justify-between items-center">
                <div>
                  <strong className="text-gold">{r.name}</strong> joined as{' '}
                  <span className="capitalize">{r.tier.replace('-', ' ')}</span> on {r.date}
                </div>
                <button
                  onClick={() => onImpersonate(r.userId)}
                  className="bg-white text-black px-3 py-1 rounded text-xs font-semibold hover:bg-gray-200"
                >
                  Login as
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

const StatCard = ({ title, value }) => (
  <div className="bg-white/10 border border-gold rounded-xl p-6 shadow-lg">
    <h2 className="text-sm text-rose-200 uppercase mb-2">{title}</h2>
    <p className="text-2xl font-bold text-white">{value}</p>
  </div>
);

export default OverviewPanel;
