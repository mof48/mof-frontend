import { Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
// Public Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Store from './pages/Store';
import Unauthorized from './pages/Unauthorized';
import NotFound from './pages/NotFound';
import Join from './pages/Join';
// Admin Subpages
import AdminOverview from './pages/Admin/Overview';
import AdminProfile from './pages/Admin/Profile';
import AdminFeed from './pages/Admin/Feed';
import AdminRequests from './pages/Admin/Requests';
import AdminMembersPage from './pages/Admin/Members'; // Renamed to avoid clash with existing AdminMembers

// User Pages
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import ChangePassword from './pages/ChangePassword';

// Dashboards
import AdminDashboard from './pages/Dashboard/AdminDashboard';
import GoldRoseDashboard from './pages/Dashboard/GoldRoseDashboard';
import PlatinumLilyDashboard from './pages/Dashboard/PlatinumLilyDashboard';
import DiamondOrchidDashboard from './pages/Dashboard/DiamondOrchidDashboard';
import GuestDashboard from './pages/Dashboard/GuestDashboard';
import SpeakerDashboard from './pages/Dashboard/SpeakerDashboard';
import AdminMembers from './pages/Dashboard/AdminMembers'; // ✅ Ensure this is imported

// Route Protection
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d0d0d] to-[#1a001a] text-white font-playfair">
      <Routes>
        {/* ✅ Public Access */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/store" element={<Store />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/join" element={<Join />} />

        {/* 🔒 Protected Dashboards */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/members"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminMembers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/gold-rose"
          element={
            <ProtectedRoute allowedRoles={['gold-rose']}>
              <GoldRoseDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/platinum-lily"
          element={
            <ProtectedRoute allowedRoles={['platinum-lily']}>
              <PlatinumLilyDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/diamond-orchid"
          element={
            <ProtectedRoute allowedRoles={['diamond-orchid']}>
              <DiamondOrchidDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/guest"
          element={
            <ProtectedRoute allowedRoles={['guest']}>
              <GuestDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/speaker"
          element={
            <ProtectedRoute allowedRoles={['speaker']}>
              <SpeakerDashboard />
            </ProtectedRoute>
          }
        />

        {/* 👤 User Pages */}
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
        <Route
  path="/admin"
  element={<Navigate to="/admin/overview" replace />}
/>
<Route
  path="/admin/overview"
  element={
    <ProtectedRoute allowedRoles={['admin']}>
      <AdminOverview />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin/profile"
  element={
    <ProtectedRoute allowedRoles={['admin']}>
      <AdminProfile />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin/feed"
  element={
    <ProtectedRoute allowedRoles={['admin']}>
      <AdminFeed />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin/requests"
  element={
    <ProtectedRoute allowedRoles={['admin']}>
      <AdminRequests />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin/members"
  element={
    <ProtectedRoute allowedRoles={['admin']}>
      <AdminMembersPage />
    </ProtectedRoute>
  }
/>

        {/* ❌ 404 Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
