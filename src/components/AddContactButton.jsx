import { useState } from 'react';

const AddContactButton = ({ recipientId }) => {
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('');

  const handleSendRequest = async () => {
    const token = localStorage.getItem('token');
    await fetch(`https://api.mofwomen.com/api/contacts/request`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ recipientId, message }),
    });

    setShowModal(false);
    alert('Contact request sent!');
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="px-4 py-2 rounded-full bg-gold text-black font-semibold hover:bg-yellow-400"
      >
        Add Contact
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white text-black p-6 rounded-lg w-96 space-y-4">
            <h3 className="font-bold text-lg">Send Contact Request</h3>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Add a message (optional)"
              className="w-full p-2 border border-gray-300 rounded"
              rows={3}
            />
            <div className="flex justify-end space-x-2">
              <button onClick={() => setShowModal(false)} className="px-4 py-2">Cancel</button>
              <button onClick={handleSendRequest} className="px-4 py-2 bg-gold rounded">Send</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddContactButton;
