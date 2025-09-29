//import { useTheme } from "../../context/ThemeContext";
import "./Navbar.css";

function Navbar() {
  //const { theme, toggleTheme } = useTheme();

  return (
    <header className="navbar">
      <input type="text" placeholder="Search..." className="search-input" />

      <div className="navbar-actions">
        <button className="icon-btn">🔔</button>
        <button className="icon-btn">⚙️</button>
        
        {/* Botón de modo oscuro/claro 
        <button className="icon-btn" onClick={toggleTheme}>
          {theme === "light" ? "🌙" : "☀️"}
        </button>*/}

        <div className="avatar">👤</div>
      </div>
    </header>
  );
}

export default Navbar;
