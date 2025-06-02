import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const RequestsPanel = () => {
  const [requests, setRequests] = useState([]);
  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    fetch('https://api.mofwomen.com/api/admin/contact-requests', { headers })
      .then((res) => res.json())
      .then(setRequests)
      .catch(() => toast.error('Failed to load contact requests.'));
  }, []);

  const handleImpersonate = (userId) => {
    toast.loading('Impersonating...');
    fetch(`https://api.mofwomen.com/api/admin/impersonate/${userId}`, { headers })
      .then((res) => res.json())
      .then((data) => {
        if (data.token && data.user) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          toast.success('Logged in as user');
          setTimeout(() => (window.location.href = '/'), 1000);
        } else {
          toast.error('Impersonation failed');
        }
      })
      .catch(() => toast.error('Error impersonating user'))
      .finally(() => toast.dismiss());
  };

  return (
    <div className="bg-white/5 border border-gold rounded-xl p-6 shadow-md">
      <h2 className="text-lg font-semibold text-gold mb-4">📥 Contact Requests</h2>

      {requests.length === 0 ? (
        <p className="text-rose-200 italic">No contact requests found.</p>
      ) : (
        <ul className="divide-y divide-white/10 text-sm text-white">
          {requests.map((req) => (
            <li key={req._id} className="py-3 flex justify-between items-start">
              <div>
                <p>
                  <strong className="text-gold">{req.name}</strong> – {req.email}
                </p>
                <p className="text-white/70 mt-1 italic">{req.message}</p>
                <p className="text-xs text-white/40 mt-1">{new Date(req.createdAt).toLocaleString()}</p>
              </div>
              <div className="flex gap-2 mt-1">
                <button
                  onClick={() => handleImpersonate(req.userId)}
                  className="bg-white text-black text-xs px-3 py-1 rounded hover:bg-gray-200"
                >
                  Login as
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RequestsPanel;
