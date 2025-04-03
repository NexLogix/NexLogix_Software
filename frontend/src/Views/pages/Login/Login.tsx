import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleLogin } from "../../../Controllers/loginController/AuthController";
import "./generalStyleLogin.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = () => {
    const role = handleLogin(email); // Usamos handleLogin

    if (role) {
      navigate(`/${role}`); // Redirige según el rol
    } else {
      alert("Credenciales incorrectas.");
    }
  };

  return (
    <div className="bg_login">
        <div className="container d-flex justify-content-center align-items-center vh-100">
          <div className="login_caja">
              <h1 className="mb-4">Login</h1>
              <input 
                  type="email" 
                  className="form-control mb-3" 
                  placeholder="Correo" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
              />
              <input 
                  type="password" 
                  className="form-control mb-3" 
                  placeholder="Contraseña" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
              />
              <button className="btn btn-primary w-100" onClick={onSubmit}>
                  Iniciar Sesión
              </button>
          </div>
        </div>
    </div>
  );
};

export default Login;
