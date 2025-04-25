import './AdminDashboard.css';
import adminAvatar from '../assets/admin-avatar.png'; // Replace with your actual image path or use a placeholder

const AdminDashboard = () => {
  return (
    <div className="lux-panel">
      {/* Admin Header */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
        <img src={adminAvatar} alt="Admin" className="admin-avatar-glow" />
        <div style={{ marginLeft: '1.5rem' }}>
          <h2 className="panel-title">Welcome, Elite Admin</h2>
          <p style={{ color: '#ccc' }}>Manage members, approve requests, and oversee the empire 🌟</p>
        </div>
      </div>

      {/* Stats Section */}
      <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
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

      {/* Navigation Shortcuts */}
      <div className="lux-panel" style={{ marginTop: '2rem' }}>
        <h3 className="panel-title">Quick Actions</h3>
        <ul className="lux-nav">
          <li><a href="/admin/members">Manage Members</a></li>
          <li><a href="/admin/approvals">Approve New Members</a></li>
          <li><a href="/admin/revenue">View Financial Reports</a></li>
          <li><a href="/admin/settings">Platform Settings</a></li>
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
