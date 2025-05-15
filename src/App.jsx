import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Dashboard components
import AdminDashboard from './pages/Dashboard/AdminDashboard';
import GoldRoseDashboard from './pages/Dashboard/GoldRoseDashboard';
import PlatinumLilyDashboard from './pages/Dashboard/PlatinumLilyDashboard';
import DiamondOrchidDashboard from './pages/Dashboard/DiamondOrchidDashboard';
import GuestDashboard from './pages/Dashboard/GuestDashboard';
import SpeakerDashboard from './pages/Dashboard/SpeakerDashboard';

// Pages
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import ChangePassword from './pages/ChangePassword';

// Optional public pages (you can uncomment if needed)
// import Home from './pages/Home';
// import Signup from './pages/Signup';
// import Store from './pages/Store';
// import Unauthorized from './pages/Unauthorized';

// Route protection
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-[#0d0d0d] to-[#1a001a] text-white font-playfair">
        <Routes>
          {/* Public Routes */}
          {/* <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/store" element={<Store />} /> */}
          <Route path="/login" element={<Login />} />

          {/* Protected Dashboards */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/gold-rose"
            element={
              <ProtectedRoute>
                <GoldRoseDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/platinum-lily"
            element={
              <ProtectedRoute>
                <PlatinumLilyDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/diamond-orchid"
            element={
              <ProtectedRoute>
                <DiamondOrchidDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/guest"
            element={
              <ProtectedRoute>
                <GuestDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/speaker"
            element={
              <ProtectedRoute>
                <SpeakerDashboard />
              </ProtectedRoute>
            }
          />

          {/* Profile / Settings / Change Password */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/change-password"
            element={
              <ProtectedRoute>
                <ChangePassword />
              </ProtectedRoute>
            }
          />

          {/* 404 Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
