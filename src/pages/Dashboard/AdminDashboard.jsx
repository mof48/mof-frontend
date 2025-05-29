import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import DashboardHero from '@/components/DashboardHero';
import ContactRequestsTab from '../../components/ContactRequestsTab';
import ProfileSettings from '@/components/ProfileSettings';
import ShadowProfileEditor from '@/components/ShadowProfileEditor';
import PostComposer from '@/components/PostComposer';
import PostFeed from '@/components/PostFeed';
import SuggestedMembers from '@/components/SuggestedMembers'; // ✅ NEW IMPORT

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

const AdminDashboard = () => {
  const [user, setUser] = useState({ name: 'Elite Admin' });
  const [stats, setStats] = useState({});
  const [chartData, setChartData] = useState([]);
  const [recent, setRecent] = useState([]);
  const [range, setRange] = useState('7d');

  const fetchChartData = (rangeValue) => {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    fetch(`https://api.mofwomen.com/api/admin/chart-data?range=${rangeValue}`, { headers })
      .then((res) => res.json())
      .then(setChartData)
      .catch(console.error);
  };

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('user') || '{}');
    if (stored?.name) setUser(stored);

    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    fetch('https://api.mofwomen.com/api/admin/stats', { headers })
      .then((res) => res.json())
      .then(setStats)
      .catch(console.error);

    fetch('https://api.mofwomen.com/api/admin/recent-approvals', { headers })
      .then((res) => res.json())
      .then(setRecent)
      .catch(console.error);

    fetchChartData(range);
  }, []);

  useEffect(() => {
    fetchChartData(range);
  }, [range]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-[#1a001a] text-white font-playfair">
      <Navbar />

      <div className="pt-32 px-6 max-w-7xl mx-auto">
        <DashboardHero
          name={user.name?.split(' ')[0] || 'Admin'}
          tier="admin"
          message="Manifest your empire with grace and power."
        />

        {/* ✅ Profile + Shadow Edit */}
        <ProfileSettings user={user} />
        <ShadowProfileEditor user={user} />

        {/* ✅ Post Composer & Feed */}
        <PostComposer user={user} />
        <PostFeed />

        {/* ✅ Suggested Members */}
        <div className="mt-16 bg-white/10 border border-gold p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold text-gold mb-4">✨ Members You May Know</h2>
          <SuggestedMembers userId={user._id} />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-12">
          <StatCard title="Total Members" value={stats.totalMembers || 0} />
          <StatCard title="Pending Approvals" value={stats.pendingApprovals || 0} />
          <StatCard title="Revenue" value={`$${(stats.revenue || 0).toLocaleString()}`} />
          <StatCard title="New Signups" value={stats.newSignups || 0} />
        </div>

        {/* Chart */}
        <div className="bg-white/10 border border-gold rounded-xl p-6 shadow-lg mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gold">Signups & Revenue</h2>
            <select
              value={range}
              onChange={(e) => setRange(e.target.value)}
              className="bg-black border border-white/20 text-white px-3 py-1 rounded-md text-sm"
            >
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
            </select>
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

        {/* Recent Approvals */}
        <div className="bg-white/10 border border-gold rounded-xl p-6 shadow-lg">
          <h2 className="text-lg font-semibold text-gold mb-4">Recent Member Approvals</h2>
          {recent.length === 0 ? (
            <p className="text-rose-200 italic">No recent activity</p>
          ) : (
            <ul className="space-y-3 text-sm text-white">
              {recent.map((r, i) => (
                <li key={i} className="border-b border-white/10 pb-2">
                  <strong className="text-gold">{r.name}</strong> joined as{' '}
                  <span className="capitalize">{r.tier.replace('-', ' ')}</span> on {r.date}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Contact Requests */}
        <div className="mt-12">
          <ContactRequestsTab />
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value }) => (
  <div className="bg-white/10 border border-gold rounded-xl p-6 shadow-lg">
    <h2 className="text-sm text-rose-200 uppercase mb-2">{title}</h2>
    <p className="text-2xl font-bold text-white">{value}</p>
  </div>
);

export default AdminDashboard;
