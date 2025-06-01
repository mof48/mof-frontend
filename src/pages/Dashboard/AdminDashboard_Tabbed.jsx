import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import AdminLayout from '@/components/AdminLayout';
import StatsPanel from '@/components/AdminPanels/StatsPanel';
import ChartPanel from '@/components/AdminPanels/ChartPanel';
import ProfilePanel from '@/components/AdminPanels/ProfilePanel';
import FeedPanel from '@/components/AdminPanels/FeedPanel';
import RequestsPanel from '@/components/AdminPanels/RequestsPanel';
import SearchPanel from '@/components/AdminPanels/SearchPanel';

const TABS = ['Overview', 'Profile', 'Feed', 'Requests', 'Members'];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem('user')) || { name: 'Elite Admin' }
  );
  const [stats, setStats] = useState({});
  const [chartData, setChartData] = useState([]);
  const [recent, setRecent] = useState([]);
  const [range, setRange] = useState('7d');
  const [pendingRequests, setPendingRequests] = useState(0);

  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    fetch('https://api.mofwomen.com/api/admin/stats', { headers })
      .then((res) => res.json())
      .then(setStats)
      .catch(console.error);

    fetch(`https://api.mofwomen.com/api/admin/chart-data?range=7d`, { headers })
      .then((res) => res.json())
      .then(setChartData)
      .catch(console.error);

    fetch('https://api.mofwomen.com/api/admin/recent-approvals', { headers })
      .then((res) => res.json())
      .then(setRecent)
      .catch(console.error);

    fetch('https://api.mofwomen.com/api/contact/requests', { headers })
      .then((res) => res.json())
      .then((data) => {
        const pending = data.filter((r) => r.status === 'pending');
        setPendingRequests(pending.length);
      })
      .catch(console.error);
  }, []);

  return (
    <AdminLayout>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="pt-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gold mb-4">Admin Dashboard</h1>

          {/* Mobile Dropdown */}
          <div className="block sm:hidden mb-4">
            <select
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value)}
              className="w-full bg-black border border-white/20 text-white px-3 py-2 rounded-md"
            >
              {TABS.map((tab) => (
                <option key={tab} value={tab}>
                  {tab} {tab === 'Requests' && pendingRequests > 0 ? `(${pendingRequests})` : ''}
                </option>
              ))}
            </select>
          </div>

          {/* Desktop Tabs */}
          <div className="hidden sm:flex gap-2">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm rounded-md transition font-semibold ${
                  activeTab === tab
                    ? 'bg-gold text-black'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {tab}
                {tab === 'Requests' && pendingRequests > 0 && (
                  <span className="ml-2 bg-red-600 text-white text-xs rounded-full px-2 py-0.5">
                    {pendingRequests}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Panel Content */}
        <div className="space-y-10">
          {activeTab === 'Overview' && (
            <>
              <StatsPanel stats={stats} />
              <ChartPanel data={chartData} range={range} onRangeChange={setRange} />
            </>
          )}
          {activeTab === 'Profile' && <ProfilePanel user={user} />}
          {activeTab === 'Feed' && <FeedPanel user={user} />}
          {activeTab === 'Requests' && <RequestsPanel />}
          {activeTab === 'Members' && <SearchPanel />}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
