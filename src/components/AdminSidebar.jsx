import { NavLink } from 'react-router-dom';
import { Home, Users, CheckCircle, DollarSign, Settings, LogOut } from 'lucide-react';
import adminAvatar from '../assets/admin-avatar.png'; // Ensure this image exists

const AdminSidebar = () => {
  const navItems = [
    { label: 'Dashboard', icon: <Home size={18} />, to: '/admin' },
    { label: 'Members', icon: <Users size={18} />, to: '/admin/members' },
    { label: 'Approvals', icon: <CheckCircle size={18} />, to: '/admin/approvals' },
    { label: 'Revenue', icon: <DollarSign size={18} />, to: '/admin/revenue' },
    { label: 'Settings', icon: <Settings size={18} />, to: '/admin/settings' },
  ];

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <aside className="w-64 min-h-screen p-6 bg-black/40 border-r border-gold text-white backdrop-blur-xl shadow-xl flex flex-col justify-between">
      {/* Top Section */}
      <div>
        <div className="flex items-center gap-3 mb-8">
          <img
            src={adminAvatar}
            alt="Admin Avatar"
            className="w-10 h-10 rounded-full border border-gold shadow"
          />
          <h2 className="text-lg font-bold text-gold tracking-wide">Elite Admin</h2>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-3">
          {navItems.map((item, idx) => (
            <NavLink
              key={idx}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-md transition-all duration-200 ${
                  isActive
                    ? 'bg-gold text-black font-semibold'
                    : 'hover:bg-gold/20 text-white'
                }`
              }
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Logout Button */}
      <div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2 rounded-md text-red-400 hover:bg-red-600/30 transition"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
