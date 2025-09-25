import { useSidebar } from "../../context/SidebarContext";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  const { isOpen, toggleSidebar } = useSidebar();

  return (
    <div className={`sidebar ${isOpen ? "open" : "collapsed"}`}>
      <div className="sidebar-header">
        {isOpen && <h1 className="logo">IMS</h1>}
        <button className="toggle-btn" onClick={toggleSidebar}>
          ☰
        </button>
      </div>

      <nav className="sidebar-menu">
        <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "active" : "")}>
          🏠 {isOpen && "Menú"}
        </NavLink>
        <NavLink to="/marketplace" className={({ isActive }) => (isActive ? "active" : "")}>
          🛒 {isOpen && "NFT Marketplace"}
        </NavLink>
        <NavLink to="/data-tables" className={({ isActive }) => (isActive ? "active" : "")}>
          📊 {isOpen && "Data Tables"}
        </NavLink>
        <NavLink to="/profile" className={({ isActive }) => (isActive ? "active" : "")}>
          👤 {isOpen && "Profile"}
        </NavLink>
        <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
          🔑 {isOpen && "Sign In"}
        </NavLink>
      </nav>
    </div>
  );
}

export default Sidebar;
