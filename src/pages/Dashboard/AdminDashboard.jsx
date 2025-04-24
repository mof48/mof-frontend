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
      <nav className="bg-black border-b border-[#FFD700] p-6 flex justify-between items-center shadow-lg">
        <h1 className="text-[#FFD700] text-3xl tracking-wide font-bold uppercase">
          🌺 Black Orchid Boardroom
        </h1>
        <button
          onClick={() => {
            localStorage.clear();
            navigate('/login');
          }}
          className="text-sm text-white tracking-wider hover:text-[#FFD700] transition"
        >
          Logout
        </button>
      </nav>

      {/* Content */}
      <main className="max-w-6xl mx-auto py-12 px-6">
        <h2 className="text-[#FFD700] text-2xl mb-4">Welcome, {user?.name || 'Admin'} 👑</h2>
        <p className="text-gray-300 mb-10 text-lg">
          You hold the key to the most exclusive digital empire. Manage with clarity, confidence, and grace.
        </p>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <button className="bg-[#FFD700] text-black py-4 rounded-xl text-lg font-semibold shadow-md hover:shadow-xl transition">
            📝 Approve Members
          </button>
          <button className="bg-[#FFD700] text-black py-4 rounded-xl text-lg font-semibold shadow-md hover:shadow-xl transition">
            📁 View Logs
          </button>
          <button className="bg-[#FFD700] text-black py-4 rounded-xl text-lg font-semibold shadow-md hover:shadow-xl transition">
            ⚙️ Settings
          </button>
        </div>

        {/* Chart / Stats Panel */}
        <div className="bg-gradient-to-br from-white/80 to-gray-100 backdrop-blur-md text-black rounded-2xl p-6 shadow-inner">
          <h3 className="text-xl font-bold mb-2">📊 Member Status Overview</h3>
          <p className="text-gray-700">Chart integration placeholder – coming soon.</p>
        </div>
      </main>

      <footer className="text-center text-sm text-gray-500 mt-16 py-6 border-t border-[#FFD700]">
        &copy; 2025 Manifestors of Freedom. Opulence is our Operating System.
      </footer>
    </div>
  );
};

export default AdminDashboard;
