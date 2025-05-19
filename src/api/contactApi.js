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
  