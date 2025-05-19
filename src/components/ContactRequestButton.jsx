import React, { useState } from 'react';
import { sendContactRequest } from '../api/contactApi';

const ContactRequestButton = ({ toUserId }) => {
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSendRequest = async () => {
    try {
      setStatus('sending');
      await sendContactRequest(toUserId, message);
      setStatus('sent');
    } catch (err) {
      setError(err.message);
      setStatus('error');
    }
  };

  return (
    <div className="space-y-2">
      {status === 'idle' && (
        <>
          <input
            type="text"
            placeholder="Optional message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full text-black px-3 py-2 rounded border"
          />
          <button
            onClick={handleSendRequest}
            className="bg-gold text-black font-medium px-4 py-2 rounded hover:bg-yellow-400 transition"
          >
            Add Contact
          </button>
        </>
      )}
      {status === 'sending' && <p className="text-sm text-gray-400">Sending request...</p>}
      {status === 'sent' && <p className="text-green-400 text-sm">Request sent!</p>}
      {status === 'error' && <p className="text-red-400 text-sm">{error}</p>}
    </div>
  );
};

export default ContactRequestButton;
