const BASE_URL = "http://localhost:3002";

async function fetchAuth(endpoint, method = "POST", body = null) {
    const url = `${BASE_URL}${endpoint}`;
    const options = {
        method,
        headers: {
            "Content-Type": "application/json",
        },
        body: body ? JSON.stringify(body) : null,
        credentials: "include", // Incluir credenciales (cookies o encabezados)
    };

    console.log("URL:", url);
    console.log("Opciones de la solicitud:", options);

    const response = await fetch(url, options);

    if (!response.ok) {
        const errorResponse = await response.text(); // Leer el cuerpo de la respuesta para obtener más detalles
        console.error("Respuesta del servidor:", errorResponse);
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
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
 * Cierra sesión del usuario eliminando el token.
 */
export function logout() {
    console.log("ENTRA LOGOUT")
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
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
    //getAuthenticatedUser,
};
