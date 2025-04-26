import { NavLink } from 'react-router-dom';
import './AdminSidebar.css';

const AdminSidebar = () => {
  return (
    <aside className="lux-sidebar">
      <div className="lux-sidebar-header">
        <h2>MOF Admin</h2>
      </div>
      <nav className="lux-nav">
        <NavLink 
          to="/admin" 
          className={({ isActive }) => isActive ? "lux-nav-link active" : "lux-nav-link"}
        >
          🏠 Dashboard
        </NavLink>
        <NavLink 
          to="/admin/members" 
          className={({ isActive }) => isActive ? "lux-nav-link active" : "lux-nav-link"}
        >
          👩‍💼 Members
        </NavLink>
        <NavLink 
          to="/admin/approvals" 
          className={({ isActive }) => isActive ? "lux-nav-link active" : "lux-nav-link"}
        >
          ✅ Approvals
        </NavLink>
        <NavLink 
          to="/admin/revenue" 
          className={({ isActive }) => isActive ? "lux-nav-link active" : "lux-nav-link"}
        >
          💎 Revenue
        </NavLink>
        <NavLink 
          to="/admin/settings" 
          className={({ isActive }) => isActive ? "lux-nav-link active" : "lux-nav-link"}
        >
          ⚙️ Settings
        </NavLink>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
