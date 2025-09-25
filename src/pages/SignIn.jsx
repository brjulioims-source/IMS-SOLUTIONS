import React from "react";
import { useNavigate } from "react-router-dom";  // 👈 te faltaba esto
import "./SignIn.css";

function SignIn() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica de autenticación
    navigate("/dashboard"); // Redirige al dashboard después de iniciar sesión
  };

  return (
    <div className="signin-container">
      <div className="signin-box">
        <h2 className="signin-title">Sign In</h2>
        <form className="signin-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            required
            className="signin-input"
          />
          <input
            type="password"
            placeholder="Password"
            required
            className="signin-input"
          />
          <button type="submit" className="signin-button">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
