import { NavLink } from 'react-router-dom';
import './AdminSidebar.css';

const AdminSidebar = () => {
  return (
    <aside className="lux-sidebar">
      <div className="lux-sidebar-header">
        <h2>MOF Admin</h2>
      </div>
      <nav className="lux-nav">
        <NavLink to="/admin" className="lux-nav-link" activeclassname="active">
          🏠 Dashboard
        </NavLink>
        <NavLink to="/admin/members" className="lux-nav-link" activeclassname="active">
          👩‍💼 Members
        </NavLink>
        <NavLink to="/admin/approvals" className="lux-nav-link" activeclassname="active">
          ✅ Approvals
        </NavLink>
        <NavLink to="/admin/revenue" className="lux-nav-link" activeclassname="active">
          💎 Revenue
        </NavLink>
        <NavLink to="/admin/settings" className="lux-nav-link" activeclassname="active">
          ⚙️ Settings
        </NavLink>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
