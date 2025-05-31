import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Navbar from '@/components/Navbar';
import DashboardHero from '@/components/DashboardHero';
import ContactRequestsTab from '@/components/ContactRequestsTab';
import ProfileSettings from '@/components/ProfileSettings';
import ShadowProfileEditor from '@/components/ShadowProfileEditor';
import PostComposer from '@/components/PostComposer';
import PostFeed from '@/components/PostFeed';
import SuggestedMembers from '@/components/SuggestedMembers';

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
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')) || { name: 'Elite Admin' });
  const [stats, setStats] = useState({});
  const [chartData, setChartData] = useState([]);
  const [recent, setRecent] = useState([]);
  const [range, setRange] = useState('7d');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  const fetchChartData = (rangeValue) => {
    fetch(`https://api.mofwomen.com/api/admin/chart-data?range=${rangeValue}`, { headers })
      .then((res) => res.json())
      .then(setChartData)
      .catch(console.error);
  };

  const fetchDashboardData = () => {
    fetch('https://api.mofwomen.com/api/admin/stats', { headers })
      .then((res) => res.json())
      .then(setStats)
      .catch(console.error);

    fetch('https://api.mofwomen.com/api/admin/recent-approvals', { headers })
      .then((res) => res.json())
      .then(setRecent)
      .catch(console.error);

    fetchChartData(range);
  };

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('user') || '{}');
    if (stored?.name) setUser(stored);

    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchChartData(range);
  }, [range]);

  const handleSwitchToOrchid = () => {
    toast.loading('Switching to Orchid...');
    const updated = {
      ...user,
      shadowProfile: {
        name: 'Black Orchid',
        bio: 'Elite Persona',
      },
    };
    localStorage.setItem('user', JSON.stringify(updated));
    setUser(updated);
    toast.dismiss();
    toast.success('You are now viewing as Black Orchid 🌺');
  };

  const handleSearch = () => {
    toast.loading('Searching members...');
    fetch(`https://api.mofwomen.com/api/admin/search-users?q=${searchTerm}`, { headers })
      .then((res) => res.json())
      .then((data) => {
        setSearchResults(data);
        toast.dismiss();
        toast.success(`${data.length} results found.`);
      })
      .catch(() => {
        toast.dismiss();
        toast.error('Search failed. Try again.');
      });
  };

  const handleImpersonate = (userId) => {
    toast.loading('Logging in as user...');
    fetch(`https://api.mofwomen.com/api/admin/impersonate/${userId}`, { headers })
      .then((res) => res.json())
      .then((data) => {
        if (data.token && data.user) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          toast.success('Switched user — refreshing...');
          setTimeout(() => (window.location.href = '/'), 1000);
        } else {
          toast.dismiss();
          toast.error('Failed to impersonate.');
        }
      })
      .catch(() => {
        toast.dismiss();
        toast.error('Impersonation error.');
      });
  };

  const exportApprovalsCSV = () => {
    const rows = [['Name', 'Tier', 'Date']];
    recent.forEach((r) => {
      rows.push([r.name, r.tier, r.date]);
    });
    const csvContent = rows.map((r) => r.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'recent-approvals.csv';
    a.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-[#1a001a] text-white font-playfair">
      <Navbar />
      <Toaster position="top-right" reverseOrder={false} />

      <div className="pt-32 px-6 max-w-7xl mx-auto">
        <DashboardHero
          name={user?.name?.split(' ')[0] || 'Admin'}
          tier="admin"
          message="Manifest your empire with grace and power."
        />

        <div className="mb-6">
          <button
            onClick={handleSwitchToOrchid}
            className="bg-pink-800 hover:bg-pink-700 text-white font-semibold py-2 px-4 rounded"
          >
            Switch to Orchid Profile
          </button>
          {user.shadowProfile?.name && (
            <p className="mt-2 text-pink-300">Viewing as: {user.shadowProfile.name}</p>
          )}
        </div>

        <div className="mb-10">
          <h2 className="text-lg text-gold font-semibold mb-2">🔍 Search Members</h2>
          <div className="flex gap-3 items-center">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, email or tier..."
              className="px-4 py-2 rounded bg-white/10 border border-white/20 text-white w-full"
            />
            <button
              onClick={handleSearch}
              className="bg-gold hover:bg-yellow-400 text-black px-4 py-2 rounded font-semibold"
            >
              Search
            </button>
          </div>

          {searchResults.length > 0 && (
            <div className="mt-4 bg-white/5 p-4 rounded-lg">
              <ul className="space-y-2 text-sm">
                {searchResults.map((u) => (
                  <li key={u._id} className="flex justify-between border-b border-white/10 pb-2">
                    <div>
                      <strong className="text-gold">{u.name}</strong> – {u.email} – {u.tier}
                    </div>
                    <button
                      onClick={() => handleImpersonate(u._id)}
                      className="text-xs bg-white text-black px-3 py-1 rounded hover:bg-gray-200"
                    >
                      Login as
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <ProfileSettings user={user} />
        <ShadowProfileEditor user={user} />
        <PostComposer user={user} />
        <PostFeed />

        <div className="mt-16 bg-white/10 border border-gold p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold text-gold mb-4">✨ Members You May Know</h2>
          <SuggestedMembers userId={user._id} />
        </div>

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
                onClick={exportApprovalsCSV}
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
                    onClick={() => handleImpersonate(r.userId)}
                    className="bg-white text-black px-3 py-1 rounded text-xs font-semibold hover:bg-gray-200"
                  >
                    Login as
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

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
