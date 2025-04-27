// Login.jsx (Final Corrected Luxury Layout)

import { useState } from 'react';
import '../pages/Login.css';

function Login() {
  const [membershipNumber, setMembershipNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [debug, setDebug] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setDebug((prev) => [...prev, '🔑 Submitting login...']);
    setLoading(true);

    try {
      const res = await fetch('https://api.mofwomen.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ membershipNumber, password }),
      });

      const data = await res.json();
      setDebug((prev) => [...prev, `📥 Response: ${JSON.stringify(data)}`]);
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
      setError('Something went wrong. Please try again.');
      setLoading(false);
      setDebug((prev) => [...prev, `❗ Error: ${err.message}`]);
    }
  };

  return (
    <div className="luxury-login">
      <video className="bg-video" autoPlay muted loop playsInline>
        <source src={process.env.PUBLIC_URL + "/videos/high-end-background.mp4"} type="video/mp4" />
      </video>

      <div className="content">
        <div className="left-panel">
          <img src={process.env.PUBLIC_URL + "/images/elite-women-logo.png"} alt="Elite Women Logo" className="elite-logo" />
          <h1 className="slogan">Welcome to Elite Women</h1>
        </div>

        <div className="right-panel">
          <form onSubmit={handleSubmit} className="login-form">
            <h2 className="form-title">Member Login</h2>
            <div className="input-group">
              <input
                type="text"
                placeholder=" "
                value={membershipNumber}
                onChange={(e) => setMembershipNumber(e.target.value)}
                required
              />
              <label>Membership #</label>
            </div>
            <div className="input-group">
              <input
                type="password"
                placeholder=" "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label>Password</label>
            </div>
            <button type="submit" className="login-button" disabled={loading}>
              {loading ? <div className="spinner"></div> : 'Login'}
            </button>

            {error && <p className="error">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;