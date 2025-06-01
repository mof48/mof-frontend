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
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')) || { name: 'Elite Admin' });
  const [stats, setStats] = useState({});
  const [chartData, setChartData] = useState([]);
  const [recent, setRecent] = useState([]);
  const [range, setRange] = useState('7d');

  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    fetch('https://api.mofwomen.com/api/admin/stats', { headers })
      .then((res) => res.json())
      .then(setStats)
      .catch(console.error);

    fetch('https://api.mofwomen.com/api/admin/chart-data?range=7d', { headers })
      .then((res) => res.json())
      .then(setChartData)
      .catch(console.error);

    fetch('https://api.mofwomen.com/api/admin/recent-approvals', { headers })
      .then((res) => res.json())
      .then(setRecent)
      .catch(console.error);
  }, []);

  const pendingRequests = recent?.length || 0;

  return (
    <AdminLayout>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="pt-12 px-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gold">Admin Dashboard</h1>
          <div className="flex gap-2">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm rounded-md transition font-semibold ${activeTab === tab ? 'bg-gold text-black' : 'bg-white/10 text-white hover:bg-white/20'}`}
              >
                {tab}
                {tab === 'Requests' && pendingRequests > 0 && (
                  <span className="ml-2 bg-red-600 text-white text-xs rounded-full px-2 py-0.5">{pendingRequests}</span>
                )}
              </button>
            ))}
          </div>
        </div>

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
    </AdminLayout>
  );
};

export default AdminDashboard;
