import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Users, BarChart, Settings, LogOut, Menu } from 'lucide-react';

const AdminLayout = ({ children }) => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const navItems = [
    { path: '/admin', label: 'Dashboard', icon: <Home size={18} /> },
    { path: '/admin/members', label: 'Members', icon: <Users size={18} /> },
    { path: '/admin/stats', label: 'Stats', icon: <BarChart size={18} /> },
    { path: '/admin/settings', label: 'Settings', icon: <Settings size={18} /> },
  ];

  return (
    <div className="flex min-h-screen bg-black text-white font-sans">
      {/* Sidebar */}
      <aside className={`fixed lg:static z-50 lg:z-auto top-0 left-0 h-full w-64 bg-[#141414] border-r border-gray-800 p-6 transform transition-transform duration-200 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="mb-10 text-center">
          <img src="/images/mof-static.jpg" alt="Logo" className="w-20 mx-auto" />
          <h2 className="text-lg font-bold text-gold mt-2">Admin Panel</h2>
        </div>

        <nav className="space-y-4">
          {navItems.map(({ path, label, icon }) => (
            <Link
              key={path}
              to={path}
              className={`flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/10 transition ${
                location.pathname === path ? 'bg-white/10 text-gold' : 'text-white/70'
              }`}
            >
              {icon}
              <span>{label}</span>
            </Link>
          ))}
        </nav>

        <button className="mt-10 flex items-center gap-2 text-sm text-red-400 hover:text-red-300">
          <LogOut size={16} />
          Logout
        </button>
      </aside>

      {/* Content Area */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#1f1f1f]">
          <button className="lg:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <Menu size={24} />
          </button>
          <h1 className="text-xl font-semibold">MOF Admin Dashboard</h1>
          <div className="text-sm text-gray-400">Welcome, {JSON.parse(localStorage.getItem('user') || '{}').name || 'Admin'}</div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto bg-gradient-to-b from-[#0d0d0d] to-black">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
