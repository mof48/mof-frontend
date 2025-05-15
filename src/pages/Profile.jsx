import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

const Profile = () => {
  const [user, setUser] = useState({});
  const [imagePreview, setImagePreview] = useState('/images/profile-placeholder.png');
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('user') || '{}');
    setUser(stored);
    if (stored.photoUrl) setImagePreview(stored.photoUrl);
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // 🔒 Optional: Upload to backend here
    if (imageFile) {
      // Upload logic or preview saved locally
      console.log('Ready to upload:', imageFile);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-[#1a001a] text-white font-playfair">
      <Navbar />

      <div className="pt-32 max-w-4xl mx-auto px-4">
        <div className="bg-black/50 border border-gold rounded-xl p-8 shadow-lg backdrop-blur-sm text-center">
          {/* Profile Picture */}
          <div className="relative w-32 h-32 mx-auto mb-4">
            <img
              src={imagePreview}
              alt="Profile"
              className="w-32 h-32 object-cover rounded-full border-4 border-gold shadow-lg"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
              title="Change profile picture"
            />
          </div>

          <h1 className="text-3xl font-bold text-gold mb-1">{user.name || 'Elite Member'}</h1>
          <p className="text-rose-200 text-sm mb-6">{user.role?.toUpperCase()} • {user.tier?.replace('-', ' ')?.toUpperCase()}</p>

          <div className="text-left space-y-4 text-sm md:text-base">
            <p><span className="text-gold">Membership #:</span> {user.membershipNumber || 'N/A'}</p>
            <p><span className="text-gold">Email:</span> {user.email || 'not@provided.com'}</p>
            <p><span className="text-gold">Phone:</span> {user.phone || '(---) --- ----'}</p>
          </div>

          <button
            onClick={handleSave}
            className="mt-6 px-6 py-2 bg-gold text-black rounded-full font-semibold hover:bg-yellow-400 transition"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
