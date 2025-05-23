import React, { useState, useEffect } from "react";

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/demo/image/upload";
const UPLOAD_PRESET = "demo";

const ProfileSettings = ({ user }) => {
  const [form, setForm] = useState({
    profilePhoto: user.profilePhoto || "",
    bannerPhoto: user.bannerPhoto || "",
    bio: user.bio || "",
    specialization: user.specialization || "",
    location: user.location || "",
  });

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpload = async (e, field) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const res = await fetch(CLOUDINARY_URL, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setForm((prev) => ({ ...prev, [field]: data.secure_url }));
    } catch (err) {
      console.error("Upload failed", err);
    }
  };

  const saveProfile = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem("token");
      await fetch("/api/user/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      setMessage("✅ Profile updated!");
    } catch (err) {
      setMessage("❌ Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white/10 border border-gold p-6 rounded-xl text-white shadow-md max-w-2xl mx-auto mt-12">
      <h2 className="text-xl font-bold mb-4 text-gold">🖼 Shenzhen Nongke Orchid Profile</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Profile Photo</label>
          <input type="file" accept="image/*" onChange={(e) => handleUpload(e, "profilePhoto")} />
          {form.profilePhoto && <img src={form.profilePhoto} alt="Profile" className="mt-2 w-24 rounded-full" />}
        </div>

        <div>
          <label className="block text-sm mb-1">Banner Image</label>
          <input type="file" accept="image/*" onChange={(e) => handleUpload(e, "bannerPhoto")} />
          {form.bannerPhoto && <img src={form.bannerPhoto} alt="Banner" className="mt-2 w-full rounded-xl max-h-48 object-cover" />}
        </div>

        <div>
          <label className="block text-sm mb-1">Bio</label>
          <textarea name="bio" value={form.bio} onChange={handleChange} className="w-full bg-black/20 border border-white/20 p-2 rounded" rows={3} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">Specialization</label>
            <input type="text" name="specialization" value={form.specialization} onChange={handleChange} className="w-full bg-black/20 border border-white/20 p-2 rounded" />
          </div>
          <div>
            <label className="block text-sm mb-1">Location</label>
            <input type="text" name="location" value={form.location} onChange={handleChange} className="w-full bg-black/20 border border-white/20 p-2 rounded" />
          </div>
        </div>

        <button onClick={saveProfile} className="mt-4 bg-gold text-black font-semibold px-4 py-2 rounded hover:bg-yellow-500 transition">
          {saving ? "Saving..." : "Save Profile"}
        </button>

        {message && <p className="text-sm mt-3">{message}</p>}
      </div>
    </div>
  );
};

export default ProfileSettings;
