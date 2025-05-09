import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavBuscarUsuario from "../../componets/NavBars/NavBuscarUsuario";

interface Usuario {
  id: number;
  documento: string;
  nombre: string;
  email: string;
  contacto: string;
  direccion: string;
  puesto: string;
  area: string;
  rol: string;
  fechaCreacion: string;
  activo: boolean;
}

const EditarUsuarios = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Simulación de carga de datos del usuario
  useEffect(() => {
    const fetchUsuario = async () => {
      // Simulación de API call
      setTimeout(() => {
        const mockUsuario: Usuario = {
          id: Number(id),
          documento: "12345678",
          nombre: "Juan Pérez",
          email: "juanperez@email.com",
          contacto: "3001234567",
          direccion: "Calle 123 #45-67",
          puesto: "Jefe de Bodega",
          area: "Almacén",
          rol: "Admin",
          fechaCreacion: "2023-03-19",
          activo: true
        };
        setUsuario(mockUsuario);
      }, 500);
    };

    fetchUsuario();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (usuario) {
      setUsuario({
        ...usuario,
        [name]: value
      });
    }
    
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
    if (!usuario) return false;
    
    const newErrors: Record<string, string> = {};
    
    if (!usuario.documento) newErrors.documento = "Documento es requerido";
    if (!usuario.nombre) newErrors.nombre = "Nombre es requerido";
    if (!usuario.email) {
      newErrors.email = "Email es requerido";
    } else if (!/^\S+@\S+\.\S+$/.test(usuario.email)) {
      newErrors.email = "Email no es válido";
    }
    if (!usuario.contacto) newErrors.contacto = "Contacto es requerido";
    if (!usuario.direccion) newErrors.direccion = "Dirección es requerida";
    if (!usuario.rol) newErrors.rol = "Rol es requerido";
    if (!usuario.area) newErrors.area = "Área es requerida";
    if (!usuario.puesto) newErrors.puesto = "Puesto es requerido";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!usuario || !validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulación de llamada a API
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log("Usuario actualizado:", usuario);
      alert("Usuario actualizado exitosamente!");
      navigate("/manager/verUsuarios");
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      alert("Hubo un error al actualizar el usuario");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!usuario) {
    return (
      <>
        <NavBuscarUsuario />
        <div className="container-fluid px-4 py-5">
          <div className="d-flex justify-content-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <NavBuscarUsuario />
      <div className="container-fluid px-4 py-5">
        <div className="card border-0 shadow">
          <div className="card-header bg-primary text-white p-4">
            <div className="d-flex justify-content-between align-items-center">
              <h2 className="mb-0">Editar Usuario</h2>
              <span className="badge bg-light text-dark">
                ID: {usuario.id} | Creado: {new Date(usuario.fechaCreacion).toLocaleDateString()}
              </span>
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
                    value={usuario.documento}
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
                    value={usuario.nombre}
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
                    value={usuario.email}
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
                    value={usuario.contacto}
                    onChange={handleChange}
                  />
                  {errors.contacto && <div className="invalid-feedback">{errors.contacto}</div>}
                </div>

                <div className="col-12">
                  <label htmlFor="direccion" className="form-label">
                    Dirección <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.direccion ? "is-invalid" : ""}`}
                    id="direccion"
                    name="direccion"
                    value={usuario.direccion}
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
                    value={usuario.rol}
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
                    value={usuario.area}
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
                    value={usuario.puesto}
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
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="activo"
                      name="activo"
                      checked={usuario.activo}
                      onChange={(e) => setUsuario({...usuario, activo: e.target.checked})}
                    />
                    <label className="form-check-label" htmlFor="activo">
                      Usuario Activo
                    </label>
                  </div>
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
                          Guardando...
                        </>
                      ) : (
                        "Guardar Cambios"
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

export default EditarUsuarios;