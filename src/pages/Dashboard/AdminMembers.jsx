import React, { useEffect, useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import toast, { Toaster } from 'react-hot-toast';

const AdminMembers = () => {
  const [search, setSearch] = useState('');
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  const fetchMembers = () => {
    setLoading(true);
    fetch(`https://api.mofwomen.com/api/admin/search-users?q=${search}`, { headers })
      .then((res) => res.json())
      .then(setMembers)
      .catch(() => toast.error('Failed to fetch members'))
      .finally(() => setLoading(false));
  };

  const handleImpersonate = (userId) => {
    toast.loading('Impersonating...');
    fetch(`https://api.mofwomen.com/api/admin/impersonate/${userId}`, { headers })
      .then((res) => res.json())
      .then((data) => {
        if (data.token && data.user) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          toast.success('Switched user — refreshing...');
          setTimeout(() => (window.location.href = '/'), 1000);
        } else {
          toast.dismiss();
          toast.error('Impersonation failed.');
        }
      })
      .catch(() => {
        toast.dismiss();
        toast.error('Impersonation error.');
      });
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <AdminLayout>
      <Toaster position="top-right" />
      <div className="pt-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gold mb-6">Members</h1>

        <div className="mb-6 flex flex-col sm:flex-row gap-3 sm:items-center">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email..."
            className="w-full sm:w-1/2 px-4 py-2 rounded bg-white/10 border border-white/20 text-white"
          />
          <button
            onClick={fetchMembers}
            className="px-4 py-2 bg-gold text-black font-semibold rounded hover:bg-yellow-400"
          >
            Search
          </button>
        </div>

        {loading ? (
          <p className="text-gray-400">Loading members...</p>
        ) : (
          <div className="space-y-4">
            {members.map((m) => (
              <div
                key={m._id}
                className="bg-white/5 border border-white/10 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between"
              >
                <div className="text-sm text-white space-y-1 mb-2 sm:mb-0">
                  <p>
                    <span className="font-semibold text-gold">{m.name}</span> — {m.email}
                  </p>
                  <p className="text-gray-300">
                    Tier: <span className="capitalize">{m.tier}</span> | Joined:{' '}
                    {new Date(m.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleImpersonate(m._id)}
                    className="bg-white text-black text-sm font-medium px-3 py-1 rounded hover:bg-gray-200"
                  >
                    Impersonate
                  </button>
                  <button
                    onClick={() => toast('Edit not implemented')}
                    className="bg-pink-600 text-white text-sm font-medium px-3 py-1 rounded hover:bg-pink-500"
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminMembers;
