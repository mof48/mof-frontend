import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const ChangePassword = () => {
  const [form, setForm] = useState({
    current: '',
    new: '',
    confirm: '',
  });
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleShow = () => setShow(!show);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (form.new !== form.confirm) {
      setMessage('New passwords do not match.');
      return;
    }

    // 🔒 Submit to backend if connected
    // const res = await fetch('/api/change-password', { method: 'POST', body: JSON.stringify(form) })

    setMessage('Password updated successfully!');
    setForm({ current: '', new: '', confirm: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-[#1a001a] text-white font-playfair">
      <Navbar />

      <div className="pt-32 max-w-xl mx-auto px-4">
        <div className="bg-black/50 border border-gold rounded-xl p-8 shadow-lg backdrop-blur-sm">
          <h1 className="text-3xl font-bold text-gold mb-6 text-center">Change Password</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            {['current', 'new', 'confirm'].map((field, i) => (
              <div key={i}>
                <label className="block text-sm text-rose-200 mb-1 capitalize">
                  {field === 'confirm' ? 'Confirm New Password' : field === 'current' ? 'Current Password' : 'New Password'}
                </label>
                <input
                  type={show ? 'text' : 'password'}
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-gold"
                />
              </div>
            ))}

            <div className="flex items-center justify-between mt-2">
              <label className="flex items-center space-x-2 text-sm">
                <input type="checkbox" checked={show} onChange={toggleShow} />
                <span>Show passwords</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full mt-4 bg-gold text-black font-semibold py-2 px-4 rounded-full hover:bg-yellow-400 transition"
            >
              Update Password
            </button>

            {message && (
              <p className={`mt-2 text-center text-sm ${message.includes('success') ? 'text-green-400' : 'text-red-400'}`}>
                {message}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
