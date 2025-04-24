import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GoldRoseDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!user || user.role?.toLowerCase() !== 'member' || user.tier?.toLowerCase() !== 'gold-rose') {
      navigate('/login');
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-gold font-serif">
      {/* Navbar */}
      <nav className="bg-black border-b border-gold p-4 flex justify-between items-center">
        <h1 className="text-gold text-2xl font-bold">🌹 Gold-Rose Dashboard</h1>
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
        <h2 className="text-xl mb-2">Welcome, {user?.name || 'Gold Member'} 🌟</h2>
        <p className="text-gray-300 mb-6">Enjoy your Gold-Rose perks and resources.</p>

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

        {/* Placeholder for Growth Chart */}
        <section className="bg-white text-black rounded-lg p-6">
          <h3 className="text-lg font-bold mb-2">📊 Growth Journey (Placeholder)</h3>
          <p>Chart area coming soon...</p>
        </section>
      </main>

      <footer className="text-center text-sm text-gray-500 mt-12 py-6 border-t border-gold">
        &copy; 2025 MOF Women Network. Empowerment is Luxury.
      </footer>
    </div>
  );
};

export default GoldRoseDashboard;
