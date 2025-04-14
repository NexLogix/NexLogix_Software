import { useAuthLoginController } from "../../Controllers/Auth/AuthController";
import "../componets/GeneralStyle/generalStyleLogin.css";

const Login = () => {
  const {
    email,
    setEmail,
    contrasena,
    setContrasena,
    error,
    handleSubmit,
  } = useAuthLoginController();

  return (
    <div className="bg_login">
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="login_caja">
          <h1 className="mb-4">Login</h1>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                name="email"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                id="password"
                name="password"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Iniciar Sesión
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;