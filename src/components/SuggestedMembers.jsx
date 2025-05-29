import React, { useEffect, useState } from 'react';
import ContactRequestButton from './ContactRequestButton';

const SuggestedMembers = ({ userId }) => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('/api/users', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setMembers(data.filter(m => m._id !== userId)))
      .catch(console.error);
  }, [userId]);

  return (
    <div className="space-y-4">
      {members.length === 0 ? (
        <p className="text-sm text-rose-200">No members found.</p>
      ) : (
        members.map(member => (
          <div key={member._id} className="bg-black/30 p-4 rounded-lg border border-white/10 flex justify-between items-center">
            <div>
              <p className="font-bold text-gold">{member.name}</p>
              <p className="text-sm text-white/60">{member.specialization || 'No role specified'}</p>
            </div>
            <ContactRequestButton toUserId={member._id} />
          </div>
        ))
      )}
    </div>
  );
};

export default SuggestedMembers;
