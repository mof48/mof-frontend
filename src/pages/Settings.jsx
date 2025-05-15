import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

const Settings = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    setUser({
      name: storedUser.name || '',
      email: storedUser.email || '',
      phone: storedUser.phone || '',
    });
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // Save locally
    const updatedUser = { ...JSON.parse(localStorage.getItem('user') || '{}'), ...user };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    alert('Settings saved!');

    // 🔒 Optional: Send to backend API
    // await fetch('/api/user/update', { method: 'POST', body: JSON.stringify(updatedUser) })
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-[#1a001a] text-white font-playfair">
      <Navbar />

      <div className="pt-32 max-w-3xl mx-auto px-4">
        <div className="bg-black/50 border border-gold rounded-xl p-8 shadow-lg backdrop-blur-sm">
          <h1 className="text-3xl font-bold text-gold mb-6 text-center">Settings</h1>

          {/* Editable Fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-rose-200 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-gold"
              />
            </div>

            <div>
              <label className="block text-sm text-rose-200 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-gold"
              />
            </div>

            <div>
              <label className="block text-sm text-rose-200 mb-1">Phone</label>
              <input
                type="text"
                name="phone"
                value={user.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-gold"
              />
            </div>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={handleSave}
              className="bg-gold text-black font-semibold px-6 py-2 rounded-full hover:bg-yellow-400 transition"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
