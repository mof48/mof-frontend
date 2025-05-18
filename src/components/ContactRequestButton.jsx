import React, { useState } from 'react';

const ContactRequestButton = ({ recipientId }) => {
  const [status, setStatus] = useState('idle');

  const handleRequest = async () => {
    setStatus('loading');
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('https://api.mofwomen.com/api/contact-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ recipientId }),
      });
      const data = await res.json();
      setStatus(data.success ? 'sent' : 'error');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <button
      onClick={handleRequest}
      disabled={status === 'loading' || status === 'sent'}
      className={`px-4 py-2 rounded-full font-semibold text-sm ${
        status === 'sent'
          ? 'bg-green-600 text-white cursor-default'
          : 'bg-gold text-black hover:bg-yellow-400'
      }`}
    >
      {status === 'sent' ? 'Request Sent' : status === 'loading' ? 'Sending...' : 'Add Contact'}
    </button>
  );
};

export default ContactRequestButton;
