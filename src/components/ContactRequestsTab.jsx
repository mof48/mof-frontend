import React, { useEffect, useState } from 'react';
import {
  getUserRequests,
  acceptContactRequest,
  declineContactRequest,
} from '../api/contactApi';

const ContactRequestsTab = () => {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const loadRequests = () => {
    getUserRequests()
      .then(setRequests)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const handleAccept = async (id) => {
    try {
      await acceptContactRequest(id);
      loadRequests();
    } catch (err) {
      alert('❌ ' + err.message);
    }
  };

  const handleDecline = async (id) => {
    try {
      await declineContactRequest(id);
      loadRequests();
    } catch (err) {
      alert('❌ ' + err.message);
    }
  };

  return (
    <div className="bg-black/80 p-6 rounded-xl border border-gold text-white">
      <h2 className="text-2xl font-bold mb-4 text-gold">📨 My Contact Requests</h2>
      {loading && <p className="text-gray-400">Loading...</p>}
      {error && <p className="text-red-400">{error}</p>}

      {requests.length === 0 ? (
        <p className="text-gray-500">No requests at this time.</p>
      ) : (
        <table className="w-full text-sm border border-gold mt-4">
          <thead>
            <tr className="bg-gold text-black text-left">
              <th className="px-4 py-2">From</th>
              <th className="px-4 py-2">Message</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req._id} className="border-t border-gold">
                <td className="px-4 py-2">{req.from?.name || '—'}</td>
                <td className="px-4 py-2">{req.message || '—'}</td>
                <td className="px-4 py-2 capitalize">{req.status}</td>
                <td className="px-4 py-2 space-x-2">
                  {req.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleAccept(req._id)}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleDecline(req._id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs"
                      >
                        Decline
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ContactRequestsTab;
