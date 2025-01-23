const BASE_URL = import.meta.env.VITE_BASE_URL;

async function fetchAuth(pathName, method = "POST", body = null) {
    console.log("BASE_URL:", BASE_URL);
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
            throw new Error(`HTTP error! Status: ${response.status}`);
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
        console.log("ENTRA LOGIN ", credentials);
        const response = await fetchAuth("/auth/login", "POST", credentials);
        // Guardar token en localStorage
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
        console.log("ENTRA REGISTER", userData);
        const response = await fetchAuth("/auth/register", "POST", userData);
        console.log("Usuario registrado con éxito:", response);
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

/**
 * Obtiene la información del usuario autenticado.
 * 
 * @returns {Promise<Object>} - Información del usuario.
 */
// export async function getAuthenticatedUser() {
//     try {
//         const token = localStorage.getItem("authToken");
//         if (!token) {
//             throw new Error("No hay un token de autenticación disponible.");
//         }
//         const response = await fetchAuth("/auth/me", "GET");
//         return response;
//     } catch (error) {
//         console.error("Error al obtener información del usuario:", error);
//         throw error;
//     }
// }

export default {
    login,
    logout,
    register
    //getAuthenticatedUser,
};
