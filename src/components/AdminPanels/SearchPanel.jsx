import React, { useState } from 'react';
import toast from 'react-hot-toast';

const SearchPanel = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  const handleSearch = () => {
    if (!searchTerm.trim()) return;

    toast.loading('Searching...');
    fetch(`https://api.mofwomen.com/api/admin/search-users?q=${searchTerm}`, { headers })
      .then((res) => res.json())
      .then((data) => {
        setResults(data);
        toast.dismiss();
        toast.success(`${data.length} result(s) found`);
      })
      .catch(() => {
        toast.dismiss();
        toast.error('Search failed');
      });
  };

  const handleImpersonate = (userId) => {
    toast.loading('Switching...');
    fetch(`https://api.mofwomen.com/api/admin/impersonate/${userId}`, { headers })
      .then((res) => res.json())
      .then((data) => {
        if (data.token && data.user) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          toast.success('Impersonated — refreshing');
          setTimeout(() => (window.location.href = '/'), 1000);
        } else {
          toast.dismiss();
          toast.error('Failed to impersonate');
        }
      })
      .catch(() => {
        toast.dismiss();
        toast.error('Impersonation error');
      });
  };

  return (
    <div className="bg-white/10 border border-gold p-6 rounded-xl shadow-md">
      <h2 className="text-lg font-semibold text-gold mb-4">🔍 Search Members</h2>

      <div className="flex gap-3 mb-4">
        <input
          type="text"
          placeholder="Search by name, email or tier..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 rounded bg-white/10 border border-white/20 text-white w-full"
        />
        <button
          onClick={handleSearch}
          className="bg-gold hover:bg-yellow-400 text-black px-4 py-2 rounded font-semibold"
        >
          Search
        </button>
      </div>

      {results.length > 0 && (
        <ul className="space-y-3 text-sm">
          {results.map((user) => (
            <li
              key={user._id}
              className="flex justify-between border-b border-white/10 pb-2 items-center"
            >
              <div>
                <strong className="text-gold">{user.name}</strong> – {user.email} – {user.tier}
              </div>
              <button
                onClick={() => handleImpersonate(user._id)}
                className="text-xs bg-white text-black px-3 py-1 rounded hover:bg-gray-200"
              >
                Login as
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchPanel;
