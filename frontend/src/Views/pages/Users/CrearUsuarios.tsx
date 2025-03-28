import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBuscarUsuario from "../../shared/NavBars/NavBuscarUsuario";

const CrearUsuario = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    documento: "",
    nombre: "",
    email: "",
    contacto: "",
    direccion: "",
    rol: "",
    area: "",
    puesto: "",
    contrasena: "",
    confirmarContrasena: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.documento) newErrors.documento = "Documento es requerido";
    if (!formData.nombre) newErrors.nombre = "Nombre es requerido";
    if (!formData.email) {
      newErrors.email = "Email es requerido";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Email no es válido";
    }
    if (!formData.contacto) newErrors.contacto = "Contacto es requerido";
    if (!formData.direccion) newErrors.direccion = "Dirección es requerida";
    if (!formData.rol) newErrors.rol = "Rol es requerido";
    if (!formData.area) newErrors.area = "Área es requerida";
    if (!formData.puesto) newErrors.puesto = "Puesto es requerido";
    if (!formData.contrasena) {
      newErrors.contrasena = "Contraseña es requerida";
    } else if (formData.contrasena.length < 8) {
      newErrors.contrasena = "La contraseña debe tener al menos 8 caracteres";
    }
    if (formData.contrasena !== formData.confirmarContrasena) {
      newErrors.confirmarContrasena = "Las contraseñas no coinciden";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulación de llamada a API
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log("Usuario creado:", formData);
      alert("Usuario creado exitosamente!");
      navigate("/manager/verUsuarios"); // Redirige a la lista de usuarios
    } catch (error) {
      console.error("Error al crear usuario:", error);
      alert("Hubo un error al crear el usuario");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <NavBuscarUsuario />
      <div className="container-fluid px-4 py-5">
        <div className="card border-0 shadow">
          <div className="card-header bg-primary text-white p-4">
            <div className="d-flex justify-content-between align-items-center">
              <h2 className="mb-0">Crear Nuevo Usuario</h2>
            </div>
          </div>

          <div className="card-body p-4">
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="documento" className="form-label">
                    Documento de Identidad <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.documento ? "is-invalid" : ""}`}
                    id="documento"
                    name="documento"
                    value={formData.documento}
                    onChange={handleChange}
                  />
                  {errors.documento && <div className="invalid-feedback">{errors.documento}</div>}
                </div>

                <div className="col-md-6">
                  <label htmlFor="nombre" className="form-label">
                    Nombre Completo <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.nombre ? "is-invalid" : ""}`}
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                  />
                  {errors.nombre && <div className="invalid-feedback">{errors.nombre}</div>}
                </div>

                <div className="col-md-6">
                  <label htmlFor="email" className="form-label">
                    Email <span className="text-danger">*</span>
                  </label>
                  <input
                    type="email"
                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>

                <div className="col-md-6">
                  <label htmlFor="contacto" className="form-label">
                    Número de Contacto <span className="text-danger">*</span>
                  </label>
                  <input
                    type="tel"
                    className={`form-control ${errors.contacto ? "is-invalid" : ""}`}
                    id="contacto"
                    name="contacto"
                    value={formData.contacto}
                    onChange={handleChange}
                  />
                  {errors.contacto && <div className="invalid-feedback">{errors.contacto}</div>}
                </div>

                <div className="col-12">
                  <label htmlFor="direccion" className="form-label">
                    Dirección de Residencia <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.direccion ? "is-invalid" : ""}`}
                    id="direccion"
                    name="direccion"
                    value={formData.direccion}
                    onChange={handleChange}
                  />
                  {errors.direccion && <div className="invalid-feedback">{errors.direccion}</div>}
                </div>

                <div className="col-md-4">
                  <label htmlFor="rol" className="form-label">
                    Rol <span className="text-danger">*</span>
                  </label>
                  <select
                    className={`form-select ${errors.rol ? "is-invalid" : ""}`}
                    id="rol"
                    name="rol"
                    value={formData.rol}
                    onChange={handleChange}
                  >
                    <option value="">Seleccione un rol</option>
                    <option value="Admin">Administrador</option>
                    <option value="Manager">Manager</option>
                    <option value="Empleado">Empleado</option>
                    <option value="Conductor">Conductor</option>
                  </select>
                  {errors.rol && <div className="invalid-feedback">{errors.rol}</div>}
                </div>

                <div className="col-md-4">
                  <label htmlFor="area" className="form-label">
                    Área <span className="text-danger">*</span>
                  </label>
                  <select
                    className={`form-select ${errors.area ? "is-invalid" : ""}`}
                    id="area"
                    name="area"
                    value={formData.area}
                    onChange={handleChange}
                  >
                    <option value="">Seleccione un área</option>
                    <option value="Logística">Logística</option>
                    <option value="Almacén">Almacén</option>
                    <option value="Transporte">Transporte</option>
                    <option value="Atención al Cliente">Atención al Cliente</option>
                    <option value="Administración">Administración</option>
                  </select>
                  {errors.area && <div className="invalid-feedback">{errors.area}</div>}
                </div>

                <div className="col-md-4">
                  <label htmlFor="puesto" className="form-label">
                    Puesto <span className="text-danger">*</span>
                  </label>
                  <select
                    className={`form-select ${errors.puesto ? "is-invalid" : ""}`}
                    id="puesto"
                    name="puesto"
                    value={formData.puesto}
                    onChange={handleChange}
                  >
                    <option value="">Seleccione un puesto</option>
                    <option value="Jefe de Bodega">Jefe de Bodega</option>
                    <option value="Auxiliar de Bodega">Auxiliar de Bodega</option>
                    <option value="Supervisor de Envíos">Supervisor de Envíos</option>
                    <option value="Conductor">Conductor</option>
                    <option value="Administrador">Administrador</option>
                  </select>
                  {errors.puesto && <div className="invalid-feedback">{errors.puesto}</div>}
                </div>

                <div className="col-md-6">
                  <label htmlFor="contrasena" className="form-label">
                    Contraseña <span className="text-danger">*</span>
                  </label>
                  <input
                    type="password"
                    className={`form-control ${errors.contrasena ? "is-invalid" : ""}`}
                    id="contrasena"
                    name="contrasena"
                    value={formData.contrasena}
                    onChange={handleChange}
                  />
                  {errors.contrasena && <div className="invalid-feedback">{errors.contrasena}</div>}
                  <small className="text-muted">Mínimo 8 caracteres</small>
                </div>

                <div className="col-md-6">
                  <label htmlFor="confirmarContrasena" className="form-label">
                    Confirmar Contraseña <span className="text-danger">*</span>
                  </label>
                  <input
                    type="password"
                    className={`form-control ${errors.confirmarContrasena ? "is-invalid" : ""}`}
                    id="confirmarContrasena"
                    name="confirmarContrasena"
                    value={formData.confirmarContrasena}
                    onChange={handleChange}
                  />
                  {errors.confirmarContrasena && (
                    <div className="invalid-feedback">{errors.confirmarContrasena}</div>
                  )}
                </div>

                <div className="col-12 mt-4">
                  <div className="d-flex justify-content-end gap-2">
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => navigate("/manager/verUsuarios")}
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Creando...
                        </>
                      ) : (
                        "Crear Usuario"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CrearUsuario;