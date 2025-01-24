const BASE_URL = import.meta.env.VITE_BASE_URL;

async function fetchAuth(pathName, method = "POST", body = null) {
    try {
        const url = `${BASE_URL}${pathName}`;
        const options = {
            method,
            headers: {
                "Content-Type": "application/json",
            },
            body: body ? JSON.stringify(body) : null,
        };

        const response = await fetch(url, options);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || errorData.message || "Error desconocido");
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching auth:", error);
        throw error;
    }
}

/**
 * Inicia sesión con el email y contraseña del usuario.
 * 
 * @param {Object} credentials - Credenciales de usuario (email y contraseña).
 * @returns {Promise<Object>} - Token de autenticación y datos del usuario.
 */
export async function login(credentials) {
    try {
        const response = await fetchAuth("/auth/login", "POST", credentials);

        localStorage.setItem("authToken", response.token);

        return response;
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        throw error;
    }
}

/**
 * Registra un nuevo usuario.
 * 
 * @param {Object} userData - Información del usuario a registrar (username, email, password).
 * @returns {Promise<Object>} - Datos del usuario registrado.
 */

export async function register(userData) {
    try {
        const response = await fetchAuth("/auth/register", "POST", userData);

        return response;
    } catch (error) {
        console.error("Error al registrar usuario:", error);
        throw error;
    }
}

/**
 * Cierra sesión del usuario eliminando el token.
 */
export function logout() {
    console.log("ENTRA LOGOUT")
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    localStorage.removeItem("artist");
    console.log("Sesión cerrada");
}


export default {
    login,
    logout,
    register
};
