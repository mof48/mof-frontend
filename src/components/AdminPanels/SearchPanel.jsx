import React, { useState } from 'react';

const SearchPanel = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  const handleSearch = () => {
    fetch(`https://api.mofwomen.com/api/admin/search-users?q=${searchTerm}`, { headers })
      .then((res) => res.json())
      .then(setSearchResults)
      .catch(console.error);
  };

  const handleImpersonate = (userId) => {
    fetch(`https://api.mofwomen.com/api/admin/impersonate/${userId}`, { headers })
      .then((res) => res.json())
      .then((data) => {
        if (data.token && data.user) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          window.location.href = '/';
        }
      });
  };

  return (
    <div className="mb-12">
      <h2 className="text-lg text-gold font-semibold mb-2">🔍 Search Members</h2>
      <div className="flex gap-3 items-center mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name, email or tier..."
          className="px-4 py-2 rounded bg-white/10 border border-white/20 text-white w-full"
        />
        <button
          onClick={handleSearch}
          className="bg-gold hover:bg-yellow-400 text-black px-4 py-2 rounded font-semibold"
        >
          Search
        </button>
      </div>
      {searchResults.length > 0 && (
        <div className="bg-white/5 p-4 rounded-lg">
          <ul className="space-y-2 text-sm">
            {searchResults.map((u) => (
              <li key={u._id} className="flex justify-between border-b border-white/10 pb-2">
                <div>
                  <strong className="text-gold">{u.name}</strong> – {u.email} – {u.tier}
                </div>
                <button
                  onClick={() => handleImpersonate(u._id)}
                  className="text-xs bg-white text-black px-3 py-1 rounded hover:bg-gray-200"
                >
                  Login as
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchPanel;
