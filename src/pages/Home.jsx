import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d0d0d] to-[#1a001a] text-white font-sans flex flex-col">
      {/* Navbar */}
      <header className="flex justify-between items-center p-6 border-b border-gold shadow-md">
        <h1 className="text-xl font-bold text-gold tracking-wide">MOF Women</h1>
        <nav className="space-x-6 text-sm">
          <Link to="/" className="hover:text-gold transition">Home</Link>
          <Link to="/about" className="hover:text-gold transition">About</Link>
          <Link to="/join" className="hover:text-gold transition">Join</Link>
          <Link to="/admin" className="bg-gold text-black px-4 py-2 rounded-md font-medium hover:bg-yellow-400 transition">Admin</Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col justify-center items-center text-center px-6 py-24 flex-1">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-gold mb-4">
          Manifest Your Empire 🌸
        </h2>
        <p className="text-lg text-pink-200 max-w-2xl mb-8">
          Join a community of elite women building legacies with elegance, power, and purpose.
        </p>
        <Link to="/join" className="bg-gold text-black font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-yellow-400 transition">
          Join the Movement
        </Link>
      </section>

      {/* Footer */}
      <footer className="text-center text-xs text-gray-400 py-4 border-t border-gold">
        © {new Date().getFullYear()} MOF Women. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
