import { Link } from 'react-router-dom'
import './Unauthorized.css'

function Unauthorized() {
  return (
    <div className="unauth-container">
      <h1>🚫 Access Denied</h1>
      <p>You don't have permission to view this page.</p>
      <Link to="/login" className="unauth-btn">Return to Login</Link>
    </div>
  )
}

export default Unauthorized
