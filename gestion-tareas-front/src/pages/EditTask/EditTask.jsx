import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTaskById, updateTask } from "../../utils/api/TaskController";
import "./EditTask.css";

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const data = await getTaskById(id);
        setTask(data);
      } catch (err) {
        console.error("Error al cargar la tarea:", err);
        setError("No se pudo cargar la tarea.");
      }
    };

    fetchTask();
  }, [id]);

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
      await updateTask(id, task);

      const userId = task.user_id;
      navigate(`/tasks/user/${userId}`);
    } catch (err) {
      console.error("Error al actualizar la tarea:", err);
      setError("No se pudo actualizar la tarea.");
    }
  };

  if (!task) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="edit-task-container">
      <h1>Editar Tarea</h1>
      <form onSubmit={handleSubmit} className="edit-task-form">
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
            name="description"
            value={task.description}
            onChange={handleChange}
            maxLength="75"
          />
        </label>
        <span>{task.description.length}/75</span>
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
            value={task.dueDate ? task.dueDate.split("T")[0] : ""}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default EditTask;
