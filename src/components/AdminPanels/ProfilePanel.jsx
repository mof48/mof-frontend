// src/components/AdminPanels/ProfilePanel.jsx
import React from 'react';

const ProfilePanel = ({ user }) => {
  const orchidName = user?.shadowProfile?.name || user?.name || 'Elite Member';
  const orchidBio = user?.shadowProfile?.bio || 'Share your brilliance with the world.';

  return (
    <div className="bg-gradient-to-br from-black via-[#1a001a] to-black rounded-xl shadow-lg border border-gold overflow-hidden">
      {/* Banner */}
      <div className="relative bg-black h-48 flex items-center justify-center">
        <img
          src={user.bannerImage || '/images/mof-static.jpg'}
          alt="Banner"
          className="absolute inset-0 object-cover w-full h-full opacity-30"
        />
        <div className="z-10 text-center">
          <button className="bg-gold text-black font-semibold px-4 py-2 rounded mr-2">
            Upload Banner
          </button>
          <button className="bg-white text-black font-semibold px-4 py-2 rounded">
            Edit Profile
          </button>
        </div>
      </div>

      {/* Profile Avatar */}
      <div className="relative flex justify-center -mt-16 z-20">
        <div className="w-32 h-32 rounded-full border-4 border-gold bg-white overflow-hidden shadow-lg">
          <img
            src={user.avatar || '/images/default-avatar.png'}
            alt="Profile"
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      {/* Info Section */}
      <div className="text-center py-6 px-4">
        <h2 className="text-2xl font-bold text-gold">{orchidName}</h2>
        <p className="text-sm italic text-pink-200 mt-1">{orchidBio}</p>

        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-white">
          <div>
            <p className="text-2xl font-bold text-gold">{user.connections || 245}</p>
            <p className="text-white/70">Connections</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gold">{user.events || 12}</p>
            <p className="text-white/70">Events</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gold">{user.endorsements || 42}</p>
            <p className="text-white/70">Endorsements</p>
          </div>
          <div>
            <button className="mt-1 bg-gold text-black text-sm px-3 py-1 rounded">
              Follow
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePanel;
