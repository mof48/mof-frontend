import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 text-white font-sans bg-black">
      {/* Left: Background video or image */}
      <div className="relative">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover hidden md:block"
        >
          <source src="/videos/MOF-hero.mp4" type="video/mp4" />
        </video>
        <div className="md:hidden w-full h-full bg-[url('/images/mof-static.jpg')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Right: Content */}
      <div className="flex flex-col justify-center items-start p-10 space-y-8 bg-black/90">
        <h1 className="text-4xl font-extrabold text-gold">MOF Women</h1>
        <p className="text-pink-200 text-lg max-w-lg">
          Manifestors of Freedom. Join an exclusive circle of elite women building
          legacy, wealth, and power with elegance and impact.
        </p>

        <div className="space-y-3 w-full">
          <Link
            to="/join"
            className="block bg-gold text-black font-semibold text-center px-6 py-3 rounded-full hover:bg-yellow-400 transition"
          >
            Join Now
          </Link>
          <Link
            to="/login"
            className="block border border-gold text-gold text-center px-6 py-2 rounded-full hover:bg-gold hover:text-black transition"
          >
            Member Login
          </Link>
        </div>

        <footer className="mt-auto text-sm text-gray-500 pt-10">
          © {new Date().getFullYear()} MOF Women. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default Home;
