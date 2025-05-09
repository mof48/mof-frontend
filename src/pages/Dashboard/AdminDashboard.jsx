import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Chart from 'react-apexcharts';
import AdminSidebar from '../../components/AdminSidebar';
import adminAvatar from '../../assets/admin-avatar.png';
import Timeline from './Timeline';
import {
  fetchDashboardStats,
  fetchWeeklySignups,
  fetchPendingMembers,
  approveMember,
  rejectMember,
} from '../../api/dashboardAPI';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [signups, setSignups] = useState([]);
  const [pendingMembers, setPendingMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [statsData, signupData, memberData] = await Promise.all([
          fetchDashboardStats(),
          fetchWeeklySignups(),
          fetchPendingMembers(),
        ]);
        setStats(statsData);
        setSignups(signupData);
        setPendingMembers(memberData);
      } catch (err) {
        console.error('Dashboard data fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleApprove = async (id) => {
    await approveMember(id);
    setPendingMembers((prev) => prev.filter((m) => m.id !== id));
  };

  const handleReject = async (id) => {
    await rejectMember(id);
    setPendingMembers((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#0d0d0d] to-[#1a001a] text-white font-sans">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 p-6 space-y-8 overflow-y-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <img
            src={adminAvatar}
            alt="Admin"
            className="w-20 h-20 rounded-full border-2 border-gold shadow-lg"
          />
          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-bold text-gold">Welcome, Elite Admin 🌸</h1>
            <p className="text-pink-300">You are manifesting success and serenity.</p>
          </div>
        </div>

        {/* Stats Cards */}
        {loading ? (
          <p className="text-center text-gray-400">Loading dashboard...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <StatCard label="Total Members" value={stats.totalMembers} />
            <StatCard label="Pending Approvals" value={stats.pendingApprovals} />
            <StatCard label="Revenue" value={`$${stats.revenue}`} />
          </div>
        )}

        {/* Chart */}
        {!loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white/5 backdrop-blur border border-gold rounded-xl p-6 shadow-md"
          >
            <h3 className="text-lg font-semibold text-gold mb-4">Weekly Signups Overview</h3>
            <Chart
              options={{
                chart: { toolbar: { show: false }, foreColor: '#eee' },
                xaxis: { categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
                grid: { borderColor: '#444' },
                colors: ['#ff69b4'],
              }}
              series={[{ name: 'Signups', data: signups }]}
              type="line"
              height={250}
            />
          </motion.div>
        )}

        {/* Timeline */}
        <Timeline />

        {/* Member Requests */}
        {!loading && pendingMembers.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="bg-white/5 backdrop-blur border border-gold p-6 rounded-xl shadow-md"
          >
            <h3 className="text-lg font-semibold text-gold mb-4">New Member Requests</h3>
            {pendingMembers.map((member) => (
              <div
                key={member.id}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-black/30 p-4 rounded-lg mb-3 gap-2"
              >
                <p>
                  {member.name} <span className="text-pink-400">• {member.tier}</span>
                </p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={() => handleApprove(member.id)}
                    className="bg-green-600 hover:bg-green-700 text-sm px-4 py-1 rounded"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(member.id)}
                    className="bg-red-600 hover:bg-red-700 text-sm px-4 py-1 rounded"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </main>
    </div>
  );
};

const StatCard = ({ label, value }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="bg-white/5 backdrop-blur border border-gold rounded-xl p-5 text-center shadow-md"
  >
    <h3 className="text-sm text-gray-300">{label}</h3>
    <p className="text-2xl font-bold text-pink-200 mt-2">{value}</p>
  </motion.div>
);

export default AdminDashboard;
