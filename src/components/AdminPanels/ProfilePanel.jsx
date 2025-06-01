import React from 'react';
import ProfileSettings from '@/components/ProfileSettings';
import ShadowProfileEditor from '@/components/ShadowProfileEditor';

const ProfilePanel = ({ user }) => {
  return (
    <div className="space-y-10">
      <div className="bg-white/10 border border-gold p-6 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold text-gold mb-4">👤 Profile Settings</h2>
        <ProfileSettings user={user} />
      </div>

      <div className="bg-white/10 border border-pink-300 p-6 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold text-pink-300 mb-4">🌺 Shadow Profile</h2>
        <ShadowProfileEditor user={user} />
      </div>
    </div>
  );
};

export default ProfilePanel;
