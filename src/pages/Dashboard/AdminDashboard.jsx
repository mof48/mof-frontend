import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!user || user.role?.toLowerCase() !== 'admin') {
      navigate('/login');
    }
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-serif">
      {/* Navbar */}
      <nav className="bg-black border-b border-gold p-4 flex justify-between items-center">
        <h1 className="text-gold text-2xl font-bold">🖤 The Black Orchid Boardroom</h1>
        <div>
          <button
            onClick={() => {
              localStorage.clear();
              navigate('/login');
            }}
            className="text-white font-semibold hover:underline"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-5xl mx-auto py-8 px-4">
        <h2 className="text-gold text-xl mb-2">Welcome, {user?.name || 'Admin'}</h2>
        <p className="text-gray-300 mb-6">Manage your elite member approvals and site insights below.</p>

        {/* Quick Action Buttons */}
        <div className="flex gap-4 mb-8">
          <button className="bg-gold text-black font-bold px-4 py-2 rounded">📝 Approve Members</button>
          <button className="bg-gold text-black font-bold px-4 py-2 rounded">📁 View Logs</button>
          <button className="bg-gold text-black font-bold px-4 py-2 rounded">⚙️ Settings</button>
        </div>

        {/* Placeholder Chart */}
        <div className="bg-white rounded p-4">
          <h3 className="text-black font-semibold mb-2">📊 Member Status Overview</h3>
          <p className="text-gray-700">Chart goes here...</p>
        </div>
      </main>

      <footer className="text-center text-sm text-gray-500 mt-12 py-6 border-t border-gold">
        &copy; 2025 MOF Women Admin. Luxury is Leadership.
      </footer>
    </div>
  );
};

export default AdminDashboard;
