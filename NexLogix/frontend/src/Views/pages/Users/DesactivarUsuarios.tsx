import { useState, useEffect } from "react";
import NavBuscarUsuario from "../../componets/NavBars/NavBuscarUsuario";

interface Usuario {
  id: number;
  documento: string;
  nombre: string;
  email: string;
  contacto: string;
  puesto: string;
  area: string;
  rol: string;
  activo: boolean;
  fechaCreacion: string;
}

const DesactivarUsuario = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<Usuario | null>(null);
  const [motivoDesactivacion, setMotivoDesactivacion] = useState("");

  // Simulación de carga de datos
  useEffect(() => {
    const fetchUsuarios = async () => {
      const data: Usuario[] = [
        {
          id: 1,
          documento: "12345678",
          nombre: "Juan Pérez",
          email: "juanperez@email.com",
          contacto: "3001234567",
          puesto: "Jefe de Bodega",
          area: "Almacén",
          rol: "Admin",
          activo: true,
          fechaCreacion: "2023-03-19",
        },
        {
          id: 2,
          documento: "87654321",
          nombre: "María López",
          email: "marialopez@email.com",
          contacto: "3109876543",
          puesto: "Supervisor de Envíos",
          area: "Logística",
          rol: "Empleado",
          activo: true,
          fechaCreacion: "2023-03-20",
        },
      ];
      setUsuarios(data);
    };

    fetchUsuarios();
  }, []);

  const filteredUsers = usuarios.filter(user =>
    Object.values(user).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleDesactivarClick = (usuario: Usuario) => {
    setUsuarioSeleccionado(usuario);
    setShowModal(true);
  };

  const handleActivarClick = (id: number) => {
    setUsuarios(usuarios.map(user => 
      user.id === id ? { ...user, activo: true } : user
    ));
  };

  const confirmarDesactivacion = () => {
    if (usuarioSeleccionado) {
      setUsuarios(usuarios.map(user => 
        user.id === usuarioSeleccionado.id ? { ...user, activo: false } : user
      ));
      console.log(`Usuario ${usuarioSeleccionado.nombre} desactivado. Motivo: ${motivoDesactivacion}`);
      setShowModal(false);
      setMotivoDesactivacion("");
    }
  };

  return (
    <>
      <NavBuscarUsuario />
      <div className="container-fluid px-4 py-5">
        <div className="card border-0 shadow">
          <div className="card-header bg-primary text-white p-4">
            <div className="d-flex justify-content-between align-items-center">
              <h2 className="mb-0">Gestión de Estado de Usuarios</h2>
              <input
                type="text"
                className="form-control w-25"
                placeholder="Buscar usuario..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="card-body p-4">
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Documento</th>
                    <th scope="col">Email</th>
                    <th scope="col">Área/Puesto</th>
                    <th scope="col">Estado</th>
                    <th scope="col" className="text-end">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((usuario) => (
                      <tr key={usuario.id} className={!usuario.activo ? "table-secondary" : ""}>
                        <td>{usuario.id}</td>
                        <td>
                          <div className="fw-semibold">{usuario.nombre}</div>
                          <div className="text-muted small">{usuario.contacto}</div>
                        </td>
                        <td>{usuario.documento}</td>
                        <td>{usuario.email}</td>
                        <td>
                          <span className="badge bg-info me-1">{usuario.area}</span>
                          <span className="badge bg-secondary">{usuario.puesto}</span>
                        </td>
                        <td>
                          {usuario.activo ? (
                            <span className="badge bg-success">Activo</span>
                          ) : (
                            <span className="badge bg-danger">Inactivo</span>
                          )}
                        </td>
                        <td className="text-end">
                          {usuario.activo ? (
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDesactivarClick(usuario)}
                            >
                              <i className="bi bi-person-dash me-1"></i> Suspender
                            </button>
                          ) : (
                            <button
                              className="btn btn-sm btn-outline-success"
                              onClick={() => handleActivarClick(usuario.id)}
                            >
                              <i className="bi bi-person-check me-1"></i> Activar
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="text-center py-4">
                        <div className="text-muted">No se encontraron usuarios</div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Confirmación */}
      <div className={`modal fade ${showModal ? 'show d-block' : ''}`} tabIndex={-1}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Confirmar Desactivación</h5>
              <button 
                type="button" 
                className="btn-close" 
                onClick={() => setShowModal(false)}
              ></button>
            </div>
            <div className="modal-body">
              <p>
                ¿Estás seguro que deseas desactivar al usuario <strong>{usuarioSeleccionado?.nombre}</strong>?
              </p>
              <div className="mb-3">
                <label htmlFor="motivoDesactivacion" className="form-label">
                  Motivo de desactivación (opcional):
                </label>
                <textarea
                  className="form-control"
                  id="motivoDesactivacion"
                  rows={3}
                  value={motivoDesactivacion}
                  onChange={(e) => setMotivoDesactivacion(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={() => setShowModal(false)}
              >
                Cancelar
              </button>
              <button 
                type="button" 
                className="btn btn-danger" 
                onClick={confirmarDesactivacion}
              >
                Confirmar Desactivación
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DesactivarUsuario;