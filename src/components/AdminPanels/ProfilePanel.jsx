import React, { useState } from 'react';
import toast from 'react-hot-toast';

const ProfilePanel = ({ user }) => {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    state: user?.state || '',
    city: user?.city || '',
    profession: user?.profession || '',
    membershipNumber: user?.membershipNumber || '',
    isTherapist: user?.isTherapist || false,
    businessName: user?.businessName || '',
    roleInBusiness: user?.roleInBusiness || '',
    industry: user?.industry || '',
    linkedin: user?.linkedin || '',
    website: user?.website || '',
    awards: user?.awards || '',
    speakingTopics: user?.speakingTopics || '',
    openToMentor: user?.openToMentor || false,
  });

  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSave = () => {
    toast.loading('Saving...');
    fetch('https://api.mofwomen.com/api/users/me', {
      method: 'PUT',
      headers,
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((updatedUser) => {
        localStorage.setItem('user', JSON.stringify(updatedUser));
        toast.dismiss();
        toast.success('Profile updated!');
      })
      .catch(() => {
        toast.dismiss();
        toast.error('Failed to update');
      });
  };

  return (
    <div className="bg-white/5 border border-gold rounded-xl p-6">
      <h2 className="text-lg font-semibold text-gold mb-4">Your Profile</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input label="Name" name="name" value={formData.name} onChange={handleChange} />
        <Input label="Email" name="email" value={formData.email} disabled />
        <Input label="Membership #" name="membershipNumber" value={formData.membershipNumber} onChange={handleChange} />
        <Input label="Chapter (State)" name="state" value={formData.state} onChange={handleChange} />
        <Input label="City" name="city" value={formData.city} onChange={handleChange} />
        <Input label="Profession" name="profession" value={formData.profession} onChange={handleChange} />

        <Input label="Business Name" name="businessName" value={formData.businessName} onChange={handleChange} />
        <Input label="Role in Business" name="roleInBusiness" value={formData.roleInBusiness} onChange={handleChange} />
        <Input label="Industry" name="industry" value={formData.industry} onChange={handleChange} />
        <Input label="LinkedIn URL" name="linkedin" value={formData.linkedin} onChange={handleChange} />
        <Input label="Website" name="website" value={formData.website} onChange={handleChange} />
        <Input label="Awards / Achievements" name="awards" value={formData.awards} onChange={handleChange} />
        <Input label="Preferred Speaking Topics" name="speakingTopics" value={formData.speakingTopics} onChange={handleChange} />

        <Checkbox
          label="I am a counselor / therapist"
          name="isTherapist"
          checked={formData.isTherapist}
          onChange={handleChange}
        />

        <Checkbox
          label="Open to mentoring other members"
          name="openToMentor"
          checked={formData.openToMentor}
          onChange={handleChange}
        />
      </div>

      <button
        onClick={handleSave}
        className="mt-6 bg-gold hover:bg-yellow-400 text-black font-semibold px-6 py-2 rounded"
      >
        Save Changes
      </button>
    </div>
  );
};

const Input = ({ label, ...props }) => (
  <div className="flex flex-col">
    <label className="text-sm text-white mb-1">{label}</label>
    <input
      {...props}
      className="px-4 py-2 rounded bg-black border border-white/20 text-white"
    />
  </div>
);

const Checkbox = ({ label, name, checked, onChange }) => (
  <div className="flex items-center gap-2 mt-2 sm:col-span-2">
    <input
      type="checkbox"
      name={name}
      checked={checked}
      onChange={onChange}
      className="accent-pink-500"
    />
    <label htmlFor={name} className="text-sm text-white">
      {label}
    </label>
  </div>
);

export default ProfilePanel;
