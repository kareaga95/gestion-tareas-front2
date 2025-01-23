import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authController from "../../utils/api/authController";
import "./Register.css";

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [showSuccessModal, setShowSuccessModal] = useState(false); // Estado para controlar el modal de éxito
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        const userData = {
            username,
            email,
            password,
            confirmPassword
        };

        try {
            const response = await authController.register(userData);
            console.log("RESPONSE", response);
            if (!response) {
                throw new Error(response.error || "Error al registrarse");
            }

            console.log("Usuario registrado con éxito:", response);
            setShowSuccessModal(true);

        } catch (error) {
            console.error("Error al registrarse:", error);
            setError(error.message);
        }
    };

    const handleCloseModal = () => {
        setShowSuccessModal(false);
        navigate("/login");
    };

    return (
        <div className="register-container">
            <h1>Registro</h1>
            <form onSubmit={handleRegister} className="register-form">
                <div className="form-group">
                    <label htmlFor="username">Nombre de Usuario</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Ingrese su nombre de usuario"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Correo Electrónico</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Ingrese su correo"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Ingrese su contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="Confirme su contraseña"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>

                {error && <p className="error-message">{error}</p>}
                <button type="submit" className="btn-register">
                    Registrarse
                </button>
            </form>
            <div className="login-link">
                <p>
                    ¿Ya tienes una cuenta? <a href="/login">Inicia Sesión</a>
                </p>
            </div>

            {/* Modal de éxito */}
            {showSuccessModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>¡Registrado con éxito!</h2>
                        <p>Ahora puedes iniciar sesión con tus credenciales.</p>
                        <button className="confirm-button" onClick={handleCloseModal}>
                            Ir a Login
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Register;
