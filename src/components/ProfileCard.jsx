import React from 'react';

const ProfileCard = ({ user }) => {
  if (!user) return null;

  return (
    <div className="bg-white/10 p-4 rounded-lg shadow text-white space-y-1">
      <h2 className="text-xl font-bold">{user.name || 'Anonymous'}</h2>
      <p><strong>Chapter:</strong> {user.state || 'N/A'}</p>
      <p><strong>Member #:</strong> {user.membershipNumber || 'N/A'}</p>
      <p><strong>Profession:</strong> {user.profession || 'N/A'}</p>
      {user.profession?.toLowerCase().includes('counsel') && (
        <p className="italic text-pink-300">Counselling services available</p>
      )}
    </div>
  );
};

export default ProfileCard;
