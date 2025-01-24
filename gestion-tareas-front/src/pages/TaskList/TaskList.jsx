import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTasksByUserId, updateTask, deleteTask } from "../../utils/api/TaskController";
import { useNavigate } from "react-router-dom";
import "./TaskList.css";

const TaskList = () => {
  const { id: userId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasksByUserId(userId);
        setTasks(data);
        if (data.length > 0) {
          setActiveCategory(data[0].category);
        }
      } catch (err) {
        console.error("Error al cargar las tareas:", err);
        setError("Error al cargar las tareas");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [userId]);

  useEffect(() => {
    // Cambiar automáticamente de categoría si la activa se queda sin tareas
    if (activeCategory && groupedTasks[activeCategory]?.length === 0) {
      const remainingCategories = Object.keys(groupedTasks).filter(
        (category) => groupedTasks[category]?.length > 0
      );
      setActiveCategory(remainingCategories[0] || null); // Cambiar a la siguiente categoría disponible o ninguna
    }
  }, [tasks, activeCategory]);

  const handleCheckboxChange = async (taskId, completed) => {
    try {
      const updatedTask = await updateTask(taskId, { completed }); // Actualizar tarea en el servidor
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

  const handleDeleteTask = async () => {
    if (!taskToDelete) return;

    try {
      await deleteTask(taskToDelete._id);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskToDelete._id));
      setShowModal(false);
      setTaskToDelete(null);
    } catch (err) {
      console.error("Error al eliminar la tarea:", err);
      setError("Error al eliminar la tarea");
    }
  };

  const handleEditTask = (taskId) => {
    navigate(`/editTask/${taskId}`);
  };

  const confirmDeleteTask = (task) => {
    setTaskToDelete(task);
    setShowModal(true);
  };

  const sortTasks = (tasks) => {
    const priorityOrder = { alta: 1, media: 2, baja: 3 };
    return tasks.sort(
      (a, b) =>
        a.completed - b.completed || // Las tareas no completadas van primero
        priorityOrder[a.priority] - priorityOrder[b.priority] // Ordenar por prioridad
    );
  };

  const groupedTasks = tasks.reduce((acc, task) => {
    acc[task.category] = acc[task.category] || [];
    acc[task.category].push(task);
    return acc;
  }, {});

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  if (loading) return <p>Cargando tareas...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="task-list-container">
      {/* Categorías */}
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

      {/* Lista de tareas por categoría activa */}
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
                  onChange={(e) => handleCheckboxChange(task._id, e.target.checked)} // Actualiza la tarea al cambiar el estado
                />
                <div className="task-info">
                  <h3>{task.title}</h3>
                  <p
                    className="task-description"
                    dangerouslySetInnerHTML={{
                      __html: (task.description || "Sin descripción").replace(/\n/g, "<br>"),
                    }}
                  ></p>
                  <p>Prioridad: {capitalize(task.priority)}</p>
                  {task.dueDate && (
                    <p>Fecha límite: {new Date(task.dueDate).toLocaleDateString()}</p>
                  )}
                </div>
                <div className="task-actions">
                  {!task.completed && (
                    <button
                      className="edit-button"
                      onClick={() => handleEditTask(task._id)}
                    >
                      Editar
                    </button>
                  )}
                  <button
                    className="delete-button"
                    onClick={() => confirmDeleteTask(task)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="task-list-empty">No hay tareas en esta categoría.</p>
      )}

      {/* Modal de confirmación para eliminar */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>¿Estás seguro de eliminar esta tarea?</h3>
            <p>{taskToDelete?.title}</p>
            <div className="modal-actions">
              <button className="cancel-button" onClick={() => setShowModal(false)}>
                Cancelar
              </button>
              <button className="confirm-button" onClick={handleDeleteTask}>
                Aceptar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;
