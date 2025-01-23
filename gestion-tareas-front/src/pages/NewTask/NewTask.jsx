import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTask } from "../../utils/api/TaskController";
import "./NewTask.css";

const CreateTask = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [task, setTask] = useState({
    title: "",
    description: "",
    category: "",
    priority: "media",
    dueDate: "",
    user_id: user._id,
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "title" && value.length > 40) return;
    if (name === "description" && value.length > 75) return;

    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTask(task);
      navigate(`/tasks/user/${user._id}`);
    } catch (err) {
      console.error("Error al crear la tarea:", err);
      setError("No se pudo crear la tarea. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <div className="create-task-container">
      <h1>Crear Nueva Tarea</h1>
      <form onSubmit={handleSubmit} className="create-task-form">
        <label>
          Título:
          <input
            type="text"
            name="title"
            value={task.title}
            onChange={handleChange}
            maxLength="40"
            required
          />
          <span>{task.title.length}/40</span>
        </label>
        <label>
          Descripción:
          <textarea
            className="task-description"
            name="description"
            value={task.description}
            onChange={handleChange}
            maxLength="75"
          />
          <span>{task.description.length}/75</span>
        </label>
        <label>
          Categoria:
          <input
            type="text"
            name="category"
            value={task.category}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Prioridad:
          <select
            name="priority"
            value={task.priority}
            onChange={handleChange}
          >
            <option value="alta">Alta</option>
            <option value="media">Media</option>
            <option value="baja">Baja</option>
          </select>
        </label>
        <label>
          Fecha Límite:
          <input
            type="date"
            name="dueDate"
            value={task.dueDate}
            onChange={handleChange}
          />
        </label>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Crear Tarea</button>
      </form>
    </div>
  );
};

export default CreateTask;
