import React from 'react'
import './GuestDashboard.css'

function GuestDashboard() {
  const user = JSON.parse(localStorage.getItem('user'))

  return (
    <div className="guest-dashboard">
      <header className="guest-header">
        <h1>🌼 Welcome, {user?.name || 'Guest'}!</h1>
        <p className="subtext">You're in the preview suite of the Elite Women Network.</p>
        <button onClick={() => {
          localStorage.clear()
          window.location.href = '/login'
        }}>
          Logout
        </button>
      </header>

      <section className="guest-content">
        <h2>✨ As a Guest, You Can:</h2>
        <ul>
          <li>💌 Read select newsletters and updates</li>
          <li>🎓 Preview course outlines and mentorship paths</li>
          <li>💬 Join public forums and Q&A sessions</li>
        </ul>

        <div className="upgrade-box">
          <h3>🌟 Ready to Access the Full Experience?</h3>
          <p>Upgrade to a member tier to unlock all dashboards, events, and premium mentorship.</p>
          <button onClick={() => window.location.href = '/signup'}>
            Upgrade My Account
          </button>
        </div>
      </section>

      <footer className="guest-footer">
        &copy; 2025 Elite Women Network. Empowerment Begins Here.
      </footer>
    </div>
  )
}

export default GuestDashboard
