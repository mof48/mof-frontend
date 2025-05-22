// 📤 Send a new contact request
export const sendContactRequest = async (toUserId, message = '') => {
  const token = localStorage.getItem('token');

  const res = await fetch('/api/contacts/request', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ toUserId, message }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to send contact request.');
  return data;
};

// ✅ Accept a contact request
export const acceptContactRequest = async (requestId) => {
  const token = localStorage.getItem('token');

  const res = await fetch('/api/contacts/accept', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ requestId }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to accept request.');
  return data;
};

// ❌ Decline a contact request
export const declineContactRequest = async (requestId) => {
  const token = localStorage.getItem('token');

  const res = await fetch('/api/contacts/decline', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ requestId }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to decline request.');
  return data;
};

// 📥 Load all contact requests involving current user
export const getUserRequests = async () => {
  const token = localStorage.getItem('token');

  const res = await fetch('/api/contacts/my-requests', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error('Failed to load requests');
  return res.json();
};
