import { useState } from 'react';

import './Login.css';

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
    setLoading(true); // ✨ Start loading
  
    try {
      const res = await fetch('https://api.mofwomen.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ membershipNumber, password }),
      });
  
      const data = await res.json();
      setDebug((prev) => [...prev, `📥 Response: ${JSON.stringify(data)}`]);
      setLoading(false); // ✨ Stop loading
  
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
      setLoading(false); // ✨ Stop loading
      setDebug((prev) => [...prev, `❗ Error: ${err.message}`]);
    }
  };
  
  return (
    <div className="login-wrapper">
      {/* Background Video */}
      <video className="bg-video" autoPlay muted loop playsInline>
        <source src="/videos/luxury-login-bg.mp4" type="video/mp4" />
        Your browser does not support video.
      </video>

      {/* Overlay */}
      <div className="overlay"></div>

      {/* Login Container */}
      <<div className="welcome-animation">Welcome Back, Beautiful.</div>
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
         <button type="submit" disabled={loading}>
  {loading ? <div className="spinner"></div> : "Login"}
</button>
 

        {error && <p className="error">{error}</p>}

        {debug.length > 0 && (
          <pre className="debug-log">
            {debug.map((line, idx) => (
              <div key={idx}>{line}</div>
            ))}
          </pre>
        )}
      </div>
    </div>
  );
}

export default Login;
