import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const DiamondOrchidDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!user || user.role?.toLowerCase() !== 'member' || user.tier?.toLowerCase() !== 'diamond-orchid') {
      navigate('/login');
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white font-serif">
      {/* Navbar */}
      <nav className="bg-black border-b border-gold p-4 flex justify-between items-center">
        <h1 className="text-gold text-2xl font-bold">💎 Diamond-Orchid Dashboard</h1>
        <button
          onClick={() => {
            localStorage.clear();
            navigate('/login');
          }}
          className="text-white hover:underline font-semibold"
        >
          Logout
        </button>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-xl mb-2">Welcome, {user?.name || 'Diamond-Orchid Queen'} 👑</h2>
        <p className="text-gray-300 mb-6">You’ve unlocked every luxury and leadership level available.</p>

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
  );
};

export default DiamondOrchidDashboard;
