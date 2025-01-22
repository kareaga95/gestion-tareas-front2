import React from "react";
import "./Navbar.css";

const Navbar = ({ onCreateTask, onLogout }) => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img
          src="/logo.png"
          alt="Tasker Logo"
          className="navbar-logo"
        />
        <h1 className="navbar-title">Tasker</h1>
      </div>
      <div className="navbar-right">
        <button className="btn-create-task" onClick={onCreateTask}>
          Crear Tarea
        </button>
        <a href="#" className="logout-link" onClick={onLogout}>
          Cerrar Sesión
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
