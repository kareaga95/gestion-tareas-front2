import React, { useEffect, useState } from "react";
import { getAllTasks, updateTask } from "../../utils/api/TaskController";
import "./TaskList.css";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getAllTasks();
        setTasks(data);
        if (data.length > 0) {
          setActiveCategory(data[0].category); // Establece la primera categoría como activa
        }
      } catch (err) {
        console.error("Error al cargar las tareas:", err);
        setError(err.message || "Error al cargar las tareas");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleCheckboxChange = async (taskId, completed) => {
    try {
      const updatedTask = await updateTask(taskId, { completed });
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, completed: updatedTask.completed } : task
        )
      );
    } catch (err) {
      console.error("Error al actualizar la tarea:", err);
      setError("Error al actualizar la tarea");
    }
  };

  const sortTasks = (tasks) => {
    const priorityOrder = { alta: 1, media: 2, baja: 3 };
    return tasks.sort(
      (a, b) =>
        a.completed - b.completed || // Las tareas no completadas van primero
        priorityOrder[a.priority] - priorityOrder[b.priority] // Ordenar por prioridad
    );
  };

  if (loading) return <p>Cargando tareas...</p>;
  if (error) return <p>Error: {error}</p>;

  const groupedTasks = tasks.reduce((acc, task) => {
    acc[task.category] = acc[task.category] || [];
    acc[task.category].push(task);
    return acc;
  }, {});

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <div className="task-list-container">
      <h1>Gestión de Tareas</h1>
      <div className="category-tabs">
        {Object.keys(groupedTasks).map((category) => (
          <button
            key={category}
            className={`category-tab ${activeCategory === category ? "active" : ""}`}
            onClick={() => setActiveCategory(category)}
          >
            {capitalize(category)}
          </button>
        ))}
      </div>
      {activeCategory && groupedTasks[activeCategory]?.length > 0 ? (
        <ul className="task-list">
          {sortTasks(groupedTasks[activeCategory]).map((task) => (
            <li
              key={task._id}
              className={`task-item ${task.completed ? "completed" : ""}`}
            >
              <div className="task-details">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={(e) =>
                    handleCheckboxChange(task._id, e.target.checked)
                  }
                />
                <div>
                  <h3>{task.title}</h3>
                  <p>{task.description || "Sin descripción"}</p>
                  <p>Prioridad: {capitalize(task.priority)}</p>
                  {task.dueDate && (
                    <p>
                      Fecha límite:{" "}
                      {new Date(task.dueDate).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay tareas en esta categoría.</p>
      )}
    </div>
  );
};

export default TaskList;
