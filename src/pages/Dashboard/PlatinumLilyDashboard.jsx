import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PlatinumLilyDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!user || user.role?.toLowerCase() !== 'member' || user.tier?.toLowerCase() !== 'platinum-lily') {
      navigate('/login');
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#111] text-white font-serif">
      <nav className="bg-black border-b border-gold p-4 flex justify-between items-center">
        <h1 className="text-gold text-2xl font-bold">🌸 Platinum-Lily Dashboard</h1>
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
        <h2 className="text-xl mb-2">Welcome, {user?.name || 'Platinum Member'} ✨</h2>
        <p className="text-gray-300 mb-6">You’ve unlocked elite-level leadership, legacy, and luxury.</p>

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
  );
};

export default PlatinumLilyDashboard;
