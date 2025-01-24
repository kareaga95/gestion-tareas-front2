const BASE_URL = import.meta.env.VITE_BASE_URL;

/**
 * Función auxiliar para realizar solicitudes al backend
 */
async function fetchTask(pathName, method = "GET", body = null) {
    try {
        const url = `${BASE_URL}${pathName}`;
        const options = {
            method,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
            body: body ? JSON.stringify(body) : null,
        };

        const response = await fetch(url, options);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `HTTP error! Status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error en fetchTask:", error);
        throw error;
    }
}

/**
 * Obtener todas las tareas con filtros opcionales
 */
export async function getAllTasks(filters = {}) {
    try {
        const queryParams = new URLSearchParams(filters).toString();
        return await fetchTask(`/tasks?${queryParams}`);
    } catch (error) {
        console.error("Error en getAllTasks:", error);
        throw error;
    }
}

/**
 * Obtener una tarea por su ID
 */
export async function getTaskById(taskId) {
    try {
        return await fetchTask(`/tasks/${taskId}`);
    } catch (error) {
        console.error(`Error en getTaskById (ID: ${taskId}):`, error);
        throw error;
    }
}

/**
 * Obtener tareas de un usuario específico
 */
export async function getTasksByUserId(userId) {
    try {
        return await fetchTask(`/tasks/user/${userId}`);
    } catch (error) {
        console.error(`Error en getTasksByUserId (User ID: ${userId}):`, error);
        throw error;
    }
}

/**
 * Obtener tareas por categoría
 */
export async function getTasksByCategory(category) {
    try {
        return await fetchTask(`/tasks/category/${category}`);
    } catch (error) {
        console.error(`Error en getTasksByCategory (Category: ${category}):`, error);
        throw error;
    }
}

/**
 * Crear una nueva tarea
 */
export async function createTask(taskData) {
    try {
        const user = JSON.parse(localStorage.getItem("user"));
        return await fetchTask(`/tasks`, "POST", taskData);
    } catch (error) {
        console.error("Error en createTask:", error);
        throw error;
    }
}

/**
 * Actualizar una tarea por su ID
 */
export async function updateTask(taskId, updatedData) {
    try {
        return await fetchTask(`/tasks/${taskId}`, "PUT", updatedData);
    } catch (error) {
        console.error(`Error en updateTask (ID: ${taskId}):`, error);
        throw error;
    }
}

/**
 * Eliminar una tarea por su ID
 */
export async function deleteTask(taskId) {
    try {
        return await fetchTask(`/tasks/${taskId}/delete`, "DELETE");
    } catch (error) {
        console.error(`Error en deleteTask (ID: ${taskId}):`, error);
        throw error;
    }
}

export default {
    getAllTasks,
    getTaskById,
    getTasksByUserId,
    getTasksByCategory,
    createTask,
    updateTask,
    deleteTask,
};
