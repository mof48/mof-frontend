// Login.jsx (React Page Component)

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
    <div className="background">
      <video className="bg-video" autoPlay muted loop playsInline>
        <source src="/videos/high-end-background.mp4" type="video/mp4" />
        Your browser does not support video.
      </video>

      <div className="overlay"></div>

      <div className="login-wrapper">
        <img src="/images/elite-women-logo.png" alt="Elite Women Logo" className="login-logo" />
        <div className="welcome-animation">Welcome Back, Beautiful.</div>
        <h2 className="login-title">Elite Women Login</h2>

        <form onSubmit={handleSubmit} className="login-card">
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

          {debug.length > 0 && (
            <pre className="debug-log">
              {debug.map((line, idx) => (
                <div key={idx}>{line}</div>
              ))}
            </pre>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;