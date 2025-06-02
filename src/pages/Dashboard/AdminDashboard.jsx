import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import AdminLayout from '@/components/AdminLayout';
import DashboardHero from '@/components/DashboardHero';
import ProfilePanel from '@/components/AdminPanels/ProfilePanel';
import FeedPanel from '@/components/AdminPanels/FeedPanel';
import RequestsPanel from '@/components/AdminPanels/RequestsPanel';
import SearchPanel from '@/components/AdminPanels/SearchPanel';
import ChartPanel from '@/components/AdminPanels/ChartPanel';
import StatsPanel from '@/components/AdminPanels/StatsPanel';

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
    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchChartData(range);
  }, [range]);

  return (
    <AdminLayout>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="pt-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <DashboardHero
          name={user?.name?.split(' ')[0] || 'Admin'}
          tier="admin"
          message="Manifest your empire with grace and power."
        />

        {/* Mobile Tab Selector */}
        <div className="block sm:hidden mb-4">
          <select
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value)}
            className="w-full bg-black border border-white/20 text-white px-3 py-2 rounded-md"
          >
            {TABS.map((tab) => (
              <option key={tab} value={tab}>
                {tab}
              </option>
            ))}
          </select>
        </div>

        {/* Desktop Tab Buttons */}
        <div className="hidden sm:flex gap-2 mb-6">
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
            </button>
          ))}
        </div>

        {/* Render Active Tab Panel */}
        <div className="space-y-10">
          {activeTab === 'Overview' && (
            <>
              <StatsPanel stats={stats} />
              <ChartPanel data={chartData} range={range} onRangeChange={setRange} />
            </>
          )}

          {activeTab === 'Profile' && <ProfilePanel user={user} />}

          {activeTab === 'Feed' && <FeedPanel user={user} />}

          {activeTab === 'Requests' && <RequestsPanel recent={recent} />}

          {activeTab === 'Members' && <SearchPanel />}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
