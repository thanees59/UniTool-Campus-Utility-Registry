import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate("/");
  };

  return (
    <header className="navbar">
      <Link className="brand" to="/" onClick={() => setOpen(false)}>
        <span className="brand-mark">U</span>
        <span>UniTool</span>
      </Link>
      <button className="icon-button nav-toggle" type="button" onClick={() => setOpen((value) => !value)} aria-label="Toggle navigation">
        <span></span>
        <span></span>
        <span></span>
      </button>
      <nav className={`nav-links ${open ? "is-open" : ""}`}>
        <NavLink to="/" onClick={() => setOpen(false)}>Home</NavLink>
        <NavLink to="/equipment" onClick={() => setOpen(false)}>Equipment</NavLink>
        {user?.role === "admin" ? (
          <NavLink to="/admin" onClick={() => setOpen(false)}>Admin</NavLink>
        ) : (
          isAuthenticated && <NavLink to="/dashboard" onClick={() => setOpen(false)}>Dashboard</NavLink>
        )}
        {isAuthenticated ? (
          <button className="button button-ghost" type="button" onClick={handleLogout}>Logout</button>
        ) : (
          <div className="nav-actions">
            <Link className="button button-ghost" to="/login" onClick={() => setOpen(false)}>Login</Link>
            <Link className="button button-primary" to="/register" onClick={() => setOpen(false)}>Register</Link>
          </div>
        )}
      </nav>
    </header>
  );
}
