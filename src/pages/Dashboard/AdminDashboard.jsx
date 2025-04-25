import './AdminDashboard.css';
import adminAvatar from '../assets/admin-avatar.png'; // your luxury admin image
import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

const AdminDashboard = () => {
  const [debug, setDebug] = useState([]);

  useEffect(() => {
    const cards = document.querySelectorAll('.lux-widget');
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('slide-in');
      }, index * 300);
    });
  }, []);

  const handleApproval = (action, name) => {
    alert(`${action === 'approve' ? '✅ Approved' : '❌ Rejected'} member: ${name}`);
    setDebug((prev) => [...prev, `${action.toUpperCase()} → ${name}`]);
  };

  return (
    <div className="lux-panel">
      {/* Admin Header */}
      <div className="admin-header">
        <img src={adminAvatar} alt="Admin" className="admin-avatar-glow" />
        <div className="admin-info">
          <h2 className="panel-title">Welcome, Elite Admin</h2>
          <p>Manage your empire with elegance 🌸</p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="lux-grid">
        <div className="lux-widget">
          <h3>Members</h3>
          <p className="glow-number">312</p>
        </div>
        <div className="lux-widget">
          <h3>Pending Approvals</h3>
          <p className="glow-number">12</p>
        </div>
        <div className="lux-widget">
          <h3>Revenue</h3>
          <p className="glow-number">$89K</p>
        </div>
      </div>

      {/* Today's Overview Chart */}
      <div className="lux-chart">
        <h3 className="panel-title">Today’s Overview</h3>
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

      {/* New Member Requests */}
      <div className="lux-requests">
        <h3 className="panel-title">New Member Requests</h3>

        <div className="request-item">
          <p>Jane Doe <span>• Diamond Orchid</span></p>
          <div className="request-actions">
            <button className="approve-btn" onClick={() => handleApproval('approve', 'Jane Doe')}>Approve</button>
            <button className="reject-btn" onClick={() => handleApproval('reject', 'Jane Doe')}>Reject</button>
          </div>
        </div>

        <div className="request-item">
          <p>Sarah Lee <span>• Platinum Lily</span></p>
          <div className="request-actions">
            <button className="approve-btn" onClick={() => handleApproval('approve', 'Sarah Lee')}>Approve</button>
            <button className="reject-btn" onClick={() => handleApproval('reject', 'Sarah Lee')}>Reject</button>
          </div>
        </div>
      </div>

      {/* Debug Section (Optional) */}
      <div className="lux-debug">
        {debug.length > 0 && (
          <>
            <h4 className="panel-title">Admin Activity Log</h4>
            <ul>
              {debug.map((entry, idx) => (
                <li key={idx}>{entry}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
