import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import TaskList from "./pages/TaskList/TaskList";
import Login from "./pages/Login/Login";

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  console.log("User ID:", user?.id);

  return (
    <Router>
      <div>
        <h1>Gestión de Tareas</h1>
        <Routes>
          {/* Redirigir automáticamente a /Login si no está autenticado */}
          <Route path="/" element={user ? <TaskList /> : <Navigate to="/Login" />} />
          {/* Ruta de login */}
          <Route path="/Login" element={<Login onLogin={handleLogin} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
