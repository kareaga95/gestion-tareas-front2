import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    setUser(savedUser ? JSON.parse(savedUser) : null);
  }, [location]);

  const handleCreateTask = () => {
    if (user) {
      navigate("/createTask");
    } else {
      alert("Por favor, inicia sesión para crear una tarea");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  const handleTitleClick = (e) => {
    if (user) {
      navigate(`/tasks/user/${user._id}`);
    } else {
      e.preventDefault();
      alert("Por favor, inicia sesión para acceder a Task Organizer");
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src="/images/logo.png" alt="Tasker Logo" className="navbar-logo" />
        <h1 className="navbar-title">
          <a
            href="#"
            className="navbar-title-link"
            onClick={handleTitleClick}
          >
            Task Organizer
          </a>
        </h1>
      </div>
      <div className="navbar-right">
        {user ? (
          <>
            <button className="btn-create-task" onClick={handleCreateTask}>
              Crear Tarea
            </button>
            <a
              href="#"
              className="navbar-link"
              onClick={(e) => {
                e.preventDefault();
                navigate(`/tasks/user/${user._id}`);
              }}
            >
              Mis Tareas
            </a>
            <a
              href="#"
              className="logout-link"
              onClick={(e) => {
                e.preventDefault();
                handleLogout();
              }}
            >
              Cerrar Sesión
            </a>
          </>
        ) : (
          <a
            href="#"
            className="login-link"
            onClick={(e) => {
              e.preventDefault();
              navigate("/login");
            }}
          >
            Iniciar Sesión
          </a>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
