import './AdminDashboard.css';
import adminAvatar from '../../assets/admin-avatar.png'; // Correct path
import { useEffect } from 'react';
import Chart from 'react-apexcharts';
import AdminSidebar from '../../components/AdminSidebar'; // ✅ Sidebar
import Timeline from './Timeline'; // ✅ Timeline

const AdminDashboard = () => {
  useEffect(() => {
    const cards = document.querySelectorAll('.lux-widget, .lux-chart, .lux-requests');
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('slide-in');
      }, index * 200);
    });
  }, []);

  return (
    <div className="lux-admin-layout"> {/* 🌟 KEY: wrap sidebar + content in a flex layout */}
      
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="lux-main-content">
        
        {/* Admin Header */}
        <div className="admin-header">
          <img src={adminAvatar} alt="Admin" className="admin-avatar-glow" />
          <div className="admin-info">
            <h1 className="lux-title">Welcome, Elite Admin 🌸</h1>
            <p className="lux-subtitle">Manifest your empire with grace and power.</p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="lux-grid">
          <div className="lux-widget">
            <h3 className="lux-widget-title">Total Members</h3>
            <p className="lux-number">312</p>
          </div>
          <div className="lux-widget">
            <h3 className="lux-widget-title">Pending Approvals</h3>
            <p className="lux-number">12</p>
          </div>
          <div className="lux-widget">
            <h3 className="lux-widget-title">Revenue</h3>
            <p className="lux-number">$89K</p>
          </div>
        </div>

        {/* Overview Chart */}
        <div className="lux-chart">
          <h3 className="lux-section-title">Today's Overview</h3>
          <Chart
            options={{
              chart: { id: 'overview-chart', foreColor: '#eee', toolbar: { show: false } },
              xaxis: { categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
              colors: ['#DA70D6'],
              grid: { borderColor: '#555' },
            }}
            series={[{ name: 'Signups', data: [3, 5, 8, 6, 7, 4, 9] }]}
            type="line"
            height={250}
          />
        </div>

        {/* Timeline Section */}
        <div className="lux-timeline-section">
          <Timeline />
        </div>

        {/* New Member Requests */}
        <div className="lux-requests">
          <h3 className="lux-section-title">New Member Requests</h3>
          <div className="request-item">
            <div className="request-info">
              <p>Jane Doe <span>• Diamond Orchid</span></p>
            </div>
            <div className="request-actions">
              <button className="approve-btn">Approve</button>
              <button className="reject-btn">Reject</button>
            </div>
          </div>
          <div className="request-item">
            <div className="request-info">
              <p>Sarah Lee <span>• Platinum Lily</span></p>
            </div>
            <div className="request-actions">
              <button className="approve-btn">Approve</button>
              <button className="reject-btn">Reject</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
