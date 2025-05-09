import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashboard from './pages/Dashboard/AdminDashboard';
import GoldRoseDashboard from './pages/Dashboard/GoldRoseDashboard';
import DiamondOrchidDashboard from './pages/Dashboard/DiamondOrchidDashboard';
import PlatinumLilyDashboard from './pages/Dashboard/PlatinumLilyDashboard';
import GuestDashboard from './pages/Dashboard/GuestDashboard';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-[#0d0d0d] to-[#1a001a] text-white">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/dashboard/gold-rose" element={<GoldRoseDashboard />} />
          <Route path="/dashboard/platinum-lily" element={<PlatinumLilyDashboard />} />
          <Route path="/dashboard/diamond-orchid" element={<DiamondOrchidDashboard />} />
          <Route path="/guest" element={<GuestDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
