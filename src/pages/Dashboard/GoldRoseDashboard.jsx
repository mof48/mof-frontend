import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import ContactRequestButton from '../components/ContactRequestButton';


const GoldRoseDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!user || user.role?.toLowerCase() !== 'member' || user.tier?.toLowerCase() !== 'gold-rose') {
      navigate('/login');
    }
  }, []);

  return (
    <div className="relative min-h-screen text-white font-sans bg-black">
      <Navbar />

      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/videos/luxury-loop.mp4" type="video/mp4" />
      </video>

      <div className="relative z-10 min-h-screen bg-black/60 backdrop-blur-sm pt-28 px-4">
        <div className="text-center mb-10">
          <img
            src="/images/Elite Women.png"
            alt="Elite Women Logo"
            className="w-32 h-32 mx-auto mb-6"
          />
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-wide text-gold drop-shadow-lg">
            Welcome, {user?.name || 'Gold Member'} 🌹
          </h1>
          <p className="mt-2 text-lg text-pink-200">
            Refinement and strength are your essence.
          </p>
        </div>

        <main className="max-w-6xl mx-auto px-4 pb-12">
          {/* Perks & Highlights */}
          <section className="grid md:grid-cols-2 gap-6 mb-10">
            <div className="bg-black border border-gold rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2">🌟 Your Gold Perks</h3>
              <ul className="list-disc list-inside text-gray-300">
                <li>Lifetime access to all VIP retreats</li>
                <li>Monthly private mentor calls</li>
                <li>Front-row at global summits</li>
              </ul>
            </div>

            <div className="bg-black border border-gold rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2">🎥 Welcome Video</h3>
              <iframe
                className="w-full rounded"
                height="215"
                src="https://www.youtube.com/embed/fakeFinanceVideo"
                title="Gold Member Welcome"
                allowFullScreen
              ></iframe>
            </div>
          </section>

          {/* Stats */}
          <section className="bg-black border border-gold rounded-lg p-6 mb-10">
            <h3 className="text-xl font-bold mb-2">📈 Progress Overview</h3>
            <p>Mentorship Sessions: <strong>12</strong></p>
            <p>Events Attended: <strong>6</strong></p>
          </section>

          {/* Placeholder Chart */}
          <section className="bg-white text-black rounded-lg p-6">
            <h3 className="text-lg font-bold mb-2">📊 Growth Journey (Placeholder)</h3>
            <p>Chart area coming soon...</p>
          </section>
        </main>

        <footer className="text-center text-sm text-gray-500 mt-12 py-6 border-t border-gold">
          &copy; 2025 MOF Women Network. Empowerment is Luxury.
        </footer>
      </div>
    </div>
  );
};

export default GoldRoseDashboard;
