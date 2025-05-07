import { useEffect } from 'react';
import Chart from 'react-apexcharts';
import { motion } from 'framer-motion';
import adminAvatar from '../../assets/admin-avatar.png';
import AdminSidebar from '../../components/AdminSidebar';
import Timeline from './Timeline';

const AdminDashboard = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-950 text-white">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 p-6 space-y-8 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center gap-4">
          <img src={adminAvatar} alt="Admin" className="w-16 h-16 rounded-full border-4 border-pink-500 shadow-lg" />
          <div>
            <h1 className="text-2xl font-bold">Welcome, Elite Admin 🌸</h1>
            <p className="text-sm text-gray-400">Manifest your empire with grace and power.</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: 'Total Members', value: '312' },
            { title: 'Pending Approvals', value: '12' },
            { title: 'Revenue', value: '$89K' },
          ].map((stat, i) => (
            <motion.div
              key={stat.title}
              className="bg-gray-800 p-6 rounded-2xl shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
            >
              <h3 className="text-lg font-medium">{stat.title}</h3>
              <p className="text-3xl font-bold mt-2">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Chart */}
        <motion.div
          className="bg-gray-800 p-6 rounded-2xl shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-lg font-semibold mb-4">Today's Overview</h3>
          <Chart
            options={{
              chart: { id: 'overview', foreColor: '#eee', toolbar: { show: false } },
              xaxis: { categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
              colors: ['#ec4899'],
              grid: { borderColor: '#444' },
            }}
            series={[{ name: 'Signups', data: [3, 5, 8, 6, 7, 4, 9] }]}
            type="line"
            height={250}
          />
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Timeline />
        </motion.div>

        {/* Requests */}
        <motion.div
          className="bg-gray-800 p-6 rounded-2xl shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <h3 className="text-lg font-semibold mb-4">New Member Requests</h3>
          {[
            { name: 'Jane Doe', tier: 'Diamond Orchid' },
            { name: 'Sarah Lee', tier: 'Platinum Lily' },
          ].map((req, i) => (
            <div key={i} className="flex justify-between items-center py-2 border-b border-gray-700">
              <p>
                {req.name} <span className="text-pink-400">• {req.tier}</span>
              </p>
              <div className="flex gap-2">
                <button className="bg-green-600 hover:bg-green-700 text-sm px-3 py-1 rounded">Approve</button>
                <button className="bg-red-600 hover:bg-red-700 text-sm px-3 py-1 rounded">Reject</button>
              </div>
            </div>
          ))}
        </motion.div>
      </main>
    </div>
  );
};

export default AdminDashboard;
