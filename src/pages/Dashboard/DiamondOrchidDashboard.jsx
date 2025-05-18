import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import ContactRequestButton from '../components/ContactRequestButton';

// Inside map loop or user profile
<ContactRequestButton recipientId={user._id} />

const DiamondOrchidDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!user || user.role?.toLowerCase() !== 'member' || user.tier?.toLowerCase() !== 'diamond-orchid') {
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
            className="w-40 mb-6 drop-shadow-lg mx-auto"
          />
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-gold text-center"
          >
            Welcome, {user?.name || 'Diamond-Orchid Queen'} 💎
          </motion.h1>
          <p className="text-pink-300 mt-4 text-center">
            Luxury, grace, and powerful tools await.
          </p>
        </div>

        <main className="max-w-6xl mx-auto px-4 pb-12">
          {/* Exclusive Perks */}
          <section className="grid md:grid-cols-2 gap-6 mb-10">
            <div className="bg-black border border-gold rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2">💎 Diamond Perks</h3>
              <ul className="list-disc list-inside text-gray-300">
                <li>VIP Retreat Access</li>
                <li>Private Investment Circles</li>
                <li>Direct Booking with Mentors</li>
                <li>Early Global Summit Access</li>
              </ul>
            </div>

            <div className="bg-black border border-gold rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2">🎥 Welcome Showcase</h3>
              <iframe
                className="w-full rounded"
                height="215"
                src="https://www.youtube.com/embed/luxuryDiamondVideo"
                title="Diamond Member Welcome"
                allowFullScreen
              ></iframe>
            </div>
          </section>

          {/* Legacy Timeline */}
          <section className="bg-black border border-gold rounded-lg p-6 mb-10">
            <h3 className="text-xl font-bold mb-2">📜 Your Legacy Timeline</h3>
            <div className="text-gray-300 space-y-2">
              <p>🌸 Jan 2025 — Launched Global Coaching Tour</p>
              <p>🏆 Feb 2025 — Secured $2M Grant for Entrepreneurs</p>
              <p>🍷 Mar 2025 — Hosted Private French Vineyard Retreat</p>
            </div>
          </section>

          {/* Growth Chart Placeholder */}
          <section className="bg-white text-black rounded-lg p-6">
            <h3 className="text-lg font-bold mb-2">📈 Your Influence Map</h3>
            <p>Chart coming soon...</p>
          </section>
        </main>

        <footer className="text-center text-sm text-gray-500 mt-12 py-6 border-t border-gold">
          &copy; 2025 MOF Women Network. Elevating Legacy Through Luxury.
        </footer>
      </div>
    </div>
  );
};

export default DiamondOrchidDashboard;
