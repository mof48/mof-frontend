import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  Users,
  BarChart,
  Settings,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { getUserRequests } from '@/api/contactApi'; // ✅ Make sure this is the correct path

const AdminLayout = ({ children }) => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    getUserRequests()
      .then((data) => {
        const pending = data.filter((r) => r.status === 'pending').length;
        setPendingCount(pending);
      })
      .catch(console.error);
  }, []);

  const navItems = [
    { path: '/admin', label: 'Dashboard', icon: <Home size={18} /> },
    {
      path: '/admin/members',
      label: (
        <div className="flex items-center gap-2">
          Members
          {pendingCount > 0 && (
            <span className="bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
              {pendingCount}
            </span>
          )}
        </div>
      ),
      icon: <Users size={18} />,
    },
    { path: '/admin/stats', label: 'Stats', icon: <BarChart size={18} /> },
    { path: '/admin/settings', label: 'Settings', icon: <Settings size={18} /> },
  ];

  return (
    <div className="flex min-h-screen bg-black text-white font-sans relative">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 z-40 bg-[#141414] border-r border-gray-800 p-6 transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:static lg:translate-x-0`}
      >
        <div className="mb-10 text-center">
          <img src="/images/mof-static.jpg" alt="Logo" className="w-20 mx-auto" />
          <h2 className="text-lg font-bold text-gold mt-2">Admin Panel</h2>
        </div>

        <nav className="space-y-4">
          {navItems.map(({ path, label, icon }) => (
            <Link
              key={path}
              to={path}
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition ${
                location.pathname === path
                  ? 'bg-white/10 text-gold'
                  : 'text-white/70 hover:bg-white/10'
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              {icon}
              <span>{label}</span>
            </Link>
          ))}
        </nav>

        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = '/login';
          }}
          className="mt-10 flex items-center gap-2 text-sm text-red-400 hover:text-red-300"
        >
          <LogOut size={16} />
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Topbar */}
        <header className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-white/10 bg-[#1f1f1f] sticky top-0 z-30">
          <button
            className="lg:hidden text-white"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <h1 className="text-lg font-semibold">MOF Admin</h1>
          <div className="text-sm text-gray-400">
            Welcome, {user?.name || 'Admin'}
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-gradient-to-b from-[#0d0d0d] to-black overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
