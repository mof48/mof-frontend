import { useState } from 'react';

function Login() {
  const [membershipNumber, setMembershipNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('https://api.mofwomen.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ membershipNumber, password }),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok || !data.user) {
        setError(data.message || 'Login failed.');
        return;
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      const role = data.user.role?.toLowerCase();
      const tier = data.user.tier?.toLowerCase();
      let redirectPath = '/';

      if (role === 'admin') redirectPath = '/admin';
      else if (role === 'member') {
        if (tier === 'gold-rose') redirectPath = '/dashboard/gold-rose';
        else if (tier === 'platinum-lily') redirectPath = '/dashboard/platinum-lily';
        else if (tier === 'diamond-orchid') redirectPath = '/dashboard/diamond-orchid';
        else redirectPath = '/dashboard';
      } else if (role === 'speaker') redirectPath = '/speaker';
      else if (role === 'guest') redirectPath = '/guest';

      window.location.href = redirectPath;
    } catch (err) {
      setLoading(false);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black text-white">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-30 z-0"
      >
        <source src="/videos/high-end-background.mp4" type="video/mp4" />
      </video>

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center h-full px-4 md:px-16">
        {/* Left Side */}
        <div className="md:w-1/2 mb-8 md:mb-0 text-center md:text-left space-y-4">
          <img src="/images/elite-women-logo.png" alt="Elite Women Logo" className="mx-auto md:mx-0 w-48" />
          <h1 className="text-3xl font-bold text-gold">Welcome to Elite Women</h1>
          <p className="text-pink-300">Enter the sanctuary of brilliance and beauty.</p>
        </div>

        {/* Right Side */}
        <form onSubmit={handleSubmit} className="md:w-1/2 bg-white/10 backdrop-blur-lg p-8 rounded-xl space-y-6 shadow-lg">
          <h2 className="text-xl font-semibold text-gold">Member Login</h2>

          <div>
            <label className="block text-sm mb-1">Membership Number</label>
            <input
              type="text"
              value={membershipNumber}
              onChange={(e) => setMembershipNumber(e.target.value)}
              required
              className="w-full px-4 py-2 rounded bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-gold"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 rounded bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-gold"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gold hover:bg-yellow-400 text-black font-semibold py-2 px-4 rounded transition duration-200"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

          {error && <p className="text-red-400 text-sm">{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default Login;
