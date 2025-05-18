import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import ContactRequestButton from '../components/ContactRequestButton';

// Inside map loop or user profile
<ContactRequestButton recipientId={user._id} />

const PlatinumLilyDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!user || user.role?.toLowerCase() !== 'member' || user.tier?.toLowerCase() !== 'platinum-lily') {
      navigate('/login');
    }
  }, []);

  return (
    <div className="relative min-h-screen text-white font-sans bg-black">
      <Navbar />

      <video
        className="absolute w-full h-full object-cover z-0"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/videos/luxury-loop.mp4" type="video/mp4" />
      </video>

      <div className="relative z-10 min-h-screen bg-black/60 backdrop-blur-sm px-4 pt-28">
        <div className="text-center mb-10">
          <img
            src="/images/Elite Women.png"
            alt="Elite Women Logo"
            className="w-40 mx-auto mb-6 drop-shadow-lg"
          />
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-gold"
          >
            Welcome to the Platinum Lily Dashboard
          </motion.h1>
          <p className="text-pink-300 mt-4">Luxury, grace, and powerful tools await.</p>
        </div>

        <main className="max-w-6xl mx-auto px-4 pb-12">
          {/* Perks */}
          <section className="grid md:grid-cols-2 gap-6 mb-10">
            <div className="bg-black border border-gold rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2">🌟 Platinum Perks</h3>
              <ul className="list-disc list-inside text-gray-300">
                <li>1-on-1 Strategic Branding</li>
                <li>Boardroom Event Access</li>
                <li>Leadership Masterclass Vault</li>
              </ul>
            </div>

            <div className="bg-black border border-gold rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2">🎥 Welcome Video</h3>
              <iframe
                className="w-full rounded"
                height="215"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Platinum Welcome"
                allowFullScreen
              ></iframe>
            </div>
          </section>

          {/* Editable Vision */}
          <section className="bg-black border border-gold rounded-lg p-6 mb-10">
            <h3 className="text-xl font-bold mb-2">📝 Your Vision</h3>
            <input
              type="text"
              placeholder="My 2025 Vision..."
              className="w-full p-2 mb-3 text-black rounded"
            />
            <textarea
              rows="3"
              placeholder="Describe your brand, legacy, and ambition..."
              className="w-full p-2 text-black rounded"
            ></textarea>
            <button className="mt-4 px-4 py-2 bg-gold text-black rounded">Save</button>
          </section>

          {/* Placeholder Chart */}
          <section className="bg-white text-black rounded-lg p-6">
            <h3 className="text-lg font-bold mb-2">📊 Your Monthly Impact</h3>
            <p>Chart area coming soon...</p>
          </section>
        </main>

        <footer className="text-center text-sm text-gray-500 mt-12 py-6 border-t border-gold">
          &copy; 2025 MOF Women Network. Elegance. Intelligence. Impact.
        </footer>
      </div>
    </div>
  );
};

export default PlatinumLilyDashboard;
