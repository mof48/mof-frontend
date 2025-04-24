import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Unauthorized from './pages/Unauthorized';

// Dashboards (Role & Tier-Based)
import AdminDashboard from './pages/Dashboard/AdminDashboard';
import GoldRoseDashboard from './pages/Dashboard/GoldRoseDashboard';
import PlatinumLilyDashboard from './pages/Dashboard/PlatinumLilyDashboard';
import DiamondOrchidDashboard from './pages/Dashboard/DiamondOrchidDashboard';
import GuestDashboard from './pages/Dashboard/GuestDashboard';

import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Admin-only */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Member Dashboards (Tiered) */}
        <Route
          path="/dashboard/gold-rose"
          element={
            <ProtectedRoute allowedRoles={['member']}>
              <GoldRoseDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/platinum-lily"
          element={
            <ProtectedRoute allowedRoles={['member']}>
              <PlatinumLilyDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/diamond-orchid"
          element={
            <ProtectedRoute allowedRoles={['member']}>
              <DiamondOrchidDashboard />
            </ProtectedRoute>
          }
        />

        {/* Guest */}
        <Route
          path="/guest"
          element={
            <ProtectedRoute allowedRoles={['guest']}>
              <GuestDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
