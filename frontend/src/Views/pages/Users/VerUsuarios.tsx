import { useState, useEffect } from "react";
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
}

const VerUsuarios = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);

  useEffect(() => {
    const fetchUsuarios = async () => {
      const data: Usuario[] = [
        {
          id: 1,
          documento: "12345678",
          nombre: "Juan Pérez",
          email: "juanperez@email.com",
          contacto: "3001234567",
          direccion: "Calle 123 #45-67",
          puesto: "Jefe de Bodega",
          area: "Almacén",
          rol: "Admin",
          fechaCreacion: "2023-03-19",
        },
        {
          id: 2,
          documento: "87654321",
          nombre: "María López",
          email: "marialopez@email.com",
          contacto: "3109876543",
          direccion: "Carrera 50 #12-34",
          puesto: "Supervisor de Envíos",
          area: "Logística",
          rol: "Empleado",
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

  const handleEdit = (id: number) => {
    console.log(`Editando usuario con ID: ${id}`);
  };

  const handleDelete = (id: number) => {
    setSelectedUser(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (selectedUser) {
      setUsuarios(usuarios.filter(usuario => usuario.id !== selectedUser));
      setShowDeleteModal(false);
    }
  };

  return (
    <>
      <NavBuscarUsuario />
      <div className="container-fluid px-4 py-5">
        <div className="card border-0 shadow">
          <div className="card-header bg-primary text-white p-4">
            <div className="d-flex justify-content-between align-items-center">
              <h2 className="mb-0">Gestión de Usuarios</h2>
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
                    <th scope="col">Contacto</th>
                    <th scope="col">Área/Puesto</th>
                    <th scope="col">Rol</th>
                    <th scope="col">Fecha Registro</th>
                    <th scope="col" className="text-end">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((usuario) => (
                      <tr key={usuario.id}>
                        <td>{usuario.id}</td>
                        <td>
                          <div className="fw-semibold">{usuario.nombre}</div>
                          <div className="text-muted small">{usuario.email}</div>
                        </td>
                        <td>{usuario.documento}</td>
                        <td>
                          <div>{usuario.contacto}</div>
                          <div className="text-muted small">{usuario.direccion}</div>
                        </td>
                        <td>
                          <span className="badge bg-info me-1">{usuario.area}</span>
                          <span className="badge bg-secondary">{usuario.puesto}</span>
                        </td>
                        <td>
                          <span className={`badge ${usuario.rol === 'Admin' ? 'bg-success' : 'bg-warning'}`}>
                            {usuario.rol}
                          </span>
                        </td>
                        <td>{new Date(usuario.fechaCreacion).toLocaleDateString()}</td>
                        <td className="text-end">
                          <button 
                            className="btn btn-sm btn-outline-primary me-2"
                            onClick={() => handleEdit(usuario.id)}
                          >
                            <i className="bi bi-pencil"></i>
                          </button>
                          <button 
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(usuario.id)}
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className="text-center py-4">
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
      <div className={`modal fade ${showDeleteModal ? 'show d-block' : ''}`} tabIndex={-1}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Confirmar Eliminación</h5>
              <button 
                type="button" 
                className="btn-close" 
                onClick={() => setShowDeleteModal(false)}
              ></button>
            </div>
            <div className="modal-body">
              ¿Estás seguro que deseas eliminar este usuario? Esta acción no se puede deshacer.
            </div>
            <div className="modal-footer">
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={() => setShowDeleteModal(false)}
              >
                Cancelar
              </button>
              <button 
                type="button" 
                className="btn btn-danger" 
                onClick={confirmDelete}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerUsuarios;