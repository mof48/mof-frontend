import React, { useState } from 'react';
import toast from 'react-hot-toast';

const MemberSearchPanel = ({ onImpersonate }) => {
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

  return (
    <div className="bg-white/5 border border-gold rounded-xl p-6 mb-8">
      <h2 className="text-lg font-semibold text-gold mb-4">🔍 Search Members</h2>

      <div className="flex gap-3 items-center mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name, email or tier"
          className="px-4 py-2 rounded bg-black border border-white/20 text-white w-full"
        />
        <button
          onClick={handleSearch}
          className="bg-gold hover:bg-yellow-400 text-black px-4 py-2 rounded font-semibold"
        >
          Search
        </button>
      </div>

      {results.length > 0 && (
        <ul className="space-y-3 text-sm text-white">
          {results.map((user) => (
            <li key={user._id} className="flex justify-between border-b border-white/10 pb-2">
              <div>
                <strong className="text-gold">{user.name}</strong> – {user.email} – {user.tier}
              </div>
              <button
                onClick={() => onImpersonate(user._id)}
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

export default MemberSearchPanel;
