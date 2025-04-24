import { useState } from 'react';
import './Login.css';


function Login() {
  const [membershipNumber, setMembershipNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [debug, setDebug] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setDebug((prev) => [...prev, '🔑 Submitting login...']);

    try {
      const res = await fetch('https://api.mofwomen.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ membershipNumber, password }),
      });

      const data = await res.json();
      setDebug((prev) => [...prev, `📥 Response: ${JSON.stringify(data)}`]);

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
      setError('Something went wrong. Try again.');
      setDebug((prev) => [...prev, `❗ Error: ${err.message}`]);
    }
  };

  return (
    <div className="login-wrapper">
      <video autoPlay muted loop className="bg-video">
        <source src="/videos/luxury.mp4" type="video/mp4" />
        Your browser does not support video.
      </video>
      <div className="overlay"></div>
      <div className="login-container">
        <h2>Elite Women Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Membership #"
            value={membershipNumber}
            onChange={(e) => setMembershipNumber(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        {error && <p className="error">{error}</p>}
        <pre className="debug-log">
          {debug.map((line, idx) => (
            <div key={idx}>{line}</div>
          ))}
        </pre>
      </div>
    </div>
  );
}

export default Login;
