import React, { useState } from 'react';

const Join = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    tier: '',
    inviteCode: '',
    speakerCode: '',
    idFile: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, idFile: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Form validation before backend send
    if (!form.tier || !form.idFile) {
      alert('Please select a tier and upload your ID.');
      return;
    }

    const formData = new FormData();
    for (const key in form) {
      formData.append(key, form[key]);
    }

    try {
      console.log('Sending form data to backend...');
      // TODO: Replace with real API endpoint
      // await fetch('/api/join', { method: 'POST', body: formData });

      alert('Form submitted! Now redirecting to payment...');
    } catch (error) {
      console.error(error);
      alert('There was a problem submitting your form.');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 py-12">
      <h1 className="text-3xl sm:text-4xl font-bold text-gold mb-6">Join the MOF Women Circle</h1>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-white/10 p-6 rounded-xl border border-gold space-y-4"
        encType="multipart/form-data"
      >
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded-md bg-black border border-white/20 text-white"
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded-md bg-black border border-white/20 text-white"
        />

        <select
          name="tier"
          value={form.tier}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded-md bg-black border border-white/20 text-white"
        >
          <option value="">Select Tier</option>
          <option value="diamond-orchid">💎 Diamond Orchid – $1500/year</option>
          <option value="gold-rose">🌹 Gold Rose – $1000/year</option>
          <option value="platinum-lily">🌸 Platinum Lily – $800/year</option>
        </select>

        <input
          type="text"
          name="inviteCode"
          placeholder="Invite Code (if any)"
          value={form.inviteCode}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-md bg-black border border-white/20 text-white"
        />

        <input
          type="text"
          name="speakerCode"
          placeholder="Speaker Code (optional)"
          value={form.speakerCode}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-md bg-black border border-white/20 text-white"
        />

        <div>
          <label className="block text-sm text-white mb-1">
            Upload a government-issued ID (jpg, png, or pdf)
          </label>
          <input
            type="file"
            accept=".jpg,.jpeg,.png,.pdf"
            onChange={handleFileChange}
            required
            className="w-full text-sm text-white"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gold text-black font-semibold px-6 py-2 mt-4 rounded-full hover:bg-yellow-400 transition"
        >
          Continue to Payment
        </button>
      </form>
    </div>
  );
};

export default Join;
