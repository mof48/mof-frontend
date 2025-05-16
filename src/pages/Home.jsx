import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <div className="relative min-h-screen bg-black text-white font-sans overflow-hidden">
      {/* 🎥 Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-20 z-0"
      >
        <source src="/videos/MOF-hero.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* 🌑 Overlay Layer */}
      <div className="relative z-10 min-h-screen bg-black/60 backdrop-blur-sm flex flex-col">
        {/* 🌸 Navbar */}
        <header className="flex justify-between items-center p-6 border-b border-gold shadow-md">
          <h1 className="text-xl font-bold text-gold tracking-wide">MOF Women</h1>
          <nav className="space-x-6 text-sm">
            <Link to="/" className="hover:text-gold transition">Home</Link>
            <Link to="/about" className="hover:text-gold transition">About</Link>
            <Link to="/join" className="hover:text-gold transition">Join</Link>
            <Link
              to="/admin"
              className="bg-gold text-black px-4 py-2 rounded-md font-medium hover:bg-yellow-400 transition"
            >
              Admin
            </Link>
          </nav>
        </header>

        {/* ✨ Hero Section */}
        <section className="flex flex-col justify-center items-center text-center px-6 py-24 flex-1">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl sm:text-6xl font-extrabold text-gold mb-4 drop-shadow-lg"
          >
            Manifest Your Empire 🌸
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-lg sm:text-xl text-pink-200 max-w-2xl mb-8"
          >
            Join an elite circle of women building legacy, luxury, and power — on their own terms.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <Link
              to="/join"
              className="bg-gold text-black font-bold px-8 py-3 rounded-full shadow-lg hover:bg-yellow-400 transition-transform transform hover:scale-105"
            >
              Join the Movement
            </Link>
          </motion.div>
        </section>

        {/* 🌺 Footer */}
        <footer className="text-center text-xs text-gray-400 py-4 border-t border-gold">
          © {new Date().getFullYear()} MOF Women. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default Home;
