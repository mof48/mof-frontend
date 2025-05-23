import React, { useState } from 'react';

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/demo/image/upload';
const UPLOAD_PRESET = 'demo';

const ShadowProfileEditor = ({ user, onUpdated }) => {
  const [name, setName] = useState(user.shadowProfile?.name || '');
  const [bio, setBio] = useState(user.shadowProfile?.bio || '');
  const [profilePhoto, setProfilePhoto] = useState(user.shadowProfile?.profilePhoto || '');
  const [message, setMessage] = useState('');

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);

    try {
      const res = await fetch(CLOUDINARY_URL, { method: 'POST', body: formData });
      const data = await res.json();
      setProfilePhoto(data.secure_url);
    } catch (err) {
      console.error('Upload failed', err);
    }
  };

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    try {
      await fetch('/api/user/shadow-profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, bio, profilePhoto }),
      });
      setMessage('✅ Shadow profile updated.');
      if (onUpdated) onUpdated();
    } catch (err) {
      setMessage('❌ Update failed.');
    }
  };

  return (
    <div className="bg-white/10 border border-gold p-6 rounded-xl text-white shadow-md max-w-2xl mx-auto mt-12">
      <h2 className="text-xl font-bold mb-4 text-gold">🕵️ Edit Shadow Profile</h2>

      <label className="block text-sm mb-1">Display Name</label>
      <input value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 bg-black/20 border border-white/20 rounded mb-4" />

      <label className="block text-sm mb-1">Bio</label>
      <textarea value={bio} onChange={(e) => setBio(e.target.value)} className="w-full p-2 bg-black/20 border border-white/20 rounded mb-4" rows={3} />

      <label className="block text-sm mb-1">Profile Photo</label>
      <input type="file" accept="image/*" onChange={handleUpload} />
      {profilePhoto && <img src={profilePhoto} alt="Shadow Avatar" className="w-24 mt-3 rounded-full" />}

      <button onClick={handleSave} className="mt-4 bg-gold text-black font-semibold px-4 py-2 rounded hover:bg-yellow-500 transition">
        Save Shadow Profile
      </button>

      {message && <p className="mt-4 text-sm">{message}</p>}
    </div>
  );
};

export default ShadowProfileEditor;
