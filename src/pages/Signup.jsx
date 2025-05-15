import { useState } from 'react'
import './Signup.css'

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    membershipNumber: '',
    password: '',
    tier: 'gold-rose',
  })
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setMessage('⏳ Creating your account...')

    try {
      const res = await fetch('https://api.mofwomen.com/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.message || 'Signup failed.')
        setMessage('')
        return
      }

      // Auto-login
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))

      const role = data.user.role?.toLowerCase()
      const tier = data.user.tier?.toLowerCase()
      let redirect = '/'

      if (role === 'admin') redirect = '/admin'
      else if (role === 'member') {
        if (tier === 'gold-rose') redirect = '/dashboard/gold-rose'
        else if (tier === 'platinum-lily') redirect = '/dashboard/platinum-lily'
        else if (tier === 'diamond-orchid') redirect = '/dashboard/diamond-orchid'
        else redirect = '/dashboard'
      }

      window.location.href = redirect
    } catch (err) {
      setError('Something went wrong. Please try again.')
      setMessage('')
    }
  }

  return (
    <div className="signup-wrapper">
      <video autoPlay muted loop className="bg-video">
        <source src="/videos/luxury.mp4" type="video/mp4" />
      </video>
      <div className="overlay"></div>

      <div className="signup-container">
        <h2>Join MOF Women</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
          <input type="text" name="membershipNumber" placeholder="Membership #" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required />

          <select name="tier" value={formData.tier} onChange={handleChange}>
            <option value="gold-rose">🌹 Gold Rose</option>
            <option value="platinum-lily">🌸 Platinum Lily</option>
            <option value="diamond-orchid">💎 Diamond Orchid</option>
          </select>

          <button type="submit">Create Account</button>
        </form>
        {message && <p className="msg">{message}</p>}
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  )
}

export default Signup
