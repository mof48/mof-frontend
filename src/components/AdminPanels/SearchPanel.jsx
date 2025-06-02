import React, { useState } from 'react';
import toast from 'react-hot-toast';

const SearchPanel = ({ headers, onImpersonate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    toast.loading('Searching members...');
    fetch(`https://api.mofwomen.com/api/admin/search-users?q=${searchTerm}`, { headers })
      .then((res) => res.json())
      .then((data) => {
        setSearchResults(data);
        toast.dismiss();
        toast.success(`${data.length} results found.`);
      })
      .catch(() => {
        toast.dismiss();
        toast.error('Search failed. Try again.');
      });
  };

  return (
    <div className="mb-12">
      <h2 className="text-lg text-gold font-semibold mb-2">🔍 Search Members</h2>
      <div className="flex gap-3 items-center">
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
        <div className="mt-4 bg-white/5 p-4 rounded-lg">
          <ul className="space-y-2 text-sm">
            {searchResults.map((u) => (
              <li key={u._id} className="flex justify-between border-b border-white/10 pb-2">
                <div>
                  <strong className="text-gold">{u.name}</strong> – {u.email} – {u.tier}
                </div>
                <button
                  onClick={() => onImpersonate(u._id)}
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
