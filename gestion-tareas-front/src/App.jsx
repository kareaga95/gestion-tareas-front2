import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import TaskList from "./pages/TaskList/TaskList";
import Login from "./pages/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import EditTask from "./pages/EditTask/EditTask";
import CreateTask from "./pages/NewTask/NewTask";
import Register from "./pages/Register/Register";

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false); // Estado cargado
  }, []);

  if (loading) {
    return null; // Evita mostrar el navbar hasta que termine de cargar
  }

  return (
    <Router>
      <Navbar user={user} onLogout={() => { setUser(null); localStorage.removeItem("user"); }} />
      <div>
        <Routes>
          <Route path="/" element={user ? <Navigate to="/tasks" /> : <Navigate to="/login" />} />
          <Route path="/tasks/user/:id" element={<TaskList />} />
          <Route path="/login" element={<Login onLogin={setUser} />} />
          <Route path="/editTask/:id" element={<EditTask />} />
          <Route path="/createTask/" element={<CreateTask />} />
          <Route path="/register/" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
