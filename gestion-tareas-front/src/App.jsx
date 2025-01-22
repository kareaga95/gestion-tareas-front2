import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import TaskList from "./pages/TaskList/TaskList";
import Login from "./pages/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import EditTask from "./pages/EditTask/EditTask";

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
      <Navbar user={user} onLogout={() => setUser(null)} />
      <div>
        <Routes>
          <Route
            path="/tasks/user/:id" element={user ? <TaskList /> : <Navigate to="/Login" />}
          />
          <Route path="/Login" element={<Login onLogin={handleLogin} />} />
          <Route path="/edit-task/:id" element={<EditTask />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
