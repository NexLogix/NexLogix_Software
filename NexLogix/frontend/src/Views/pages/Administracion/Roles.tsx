import React, { useEffect, useState } from 'react';
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import './../../Styles/NavBar/Administracion/GeneralStyle.css';
import './../../Styles/Home/TablesStyle.css'
import './../../Styles/NavBar/Logistica/ListaVehiculos.css';
import '../../Styles/Home/TablesStyle.css'

// Nueva interfaz para Rol
interface Rol {
  idRol: number;
  nombreRol: string;
  descripcionRol: string;
  fechaAsignacionRol: string;
}

// Mock de datos para ejemplo visual
const mockRoles: Rol[] = [
  { idRol: 1, nombreRol: "Administrador", descripcionRol: "Acceso total al sistema", fechaAsignacionRol: "2024-01-10" },
  { idRol: 2, nombreRol: "Manager", descripcionRol: "Gestión de equipos y recursos", fechaAsignacionRol: "2024-02-20" },
  { idRol: 3, nombreRol: "Empleado", descripcionRol: "Acceso a funciones básicas", fechaAsignacionRol: "2024-03-15" },
  { idRol: 4, nombreRol: "Conductor", descripcionRol: "Gestión de rutas y entregas", fechaAsignacionRol: "2024-04-05" },
];

const Roles: React.FC = () => {
  // Estado de roles y búsqueda
  const [roles, setRoles] = useState<Rol[]>([]);
  const [searchId, setSearchId] = useState("");
  const [filteredRoles, setFilteredRoles] = useState<Rol[]>([]);
  // Estados para modales
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editRol, setEditRol] = useState<Rol | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedRol, setSelectedRol] = useState<Rol | null>(null);

  // Cargar datos simulados
  useEffect(() => {
    setRoles(mockRoles);
    setFilteredRoles(mockRoles);
  }, []);

  // Buscar por ID
  const handleSearch = () => {
    if (searchId.trim() === "") {
      setFilteredRoles(roles);
    } else {
      setFilteredRoles(roles.filter(r => r.idRol.toString() === searchId.trim()));
    }
  };

  // Mostrar todos
  const resetSearch = () => {
    setSearchId("");
    setFilteredRoles(roles);
  };

  // Abrir modal de editar
  const handleEdit = (rol: Rol) => {
    setEditRol(rol);
    setShowEditModal(true);
  };

  // Abrir modal de eliminar
  const handleDelete = (rol: Rol) => {
    setSelectedRol(rol);
    setShowDeleteModal(true);
  };

  return (
    <div className='areas_container'>
      <div className="container mt-4">
        {/* Barra de búsqueda y botones */}
        <div className="header-azul mb-3">
          <div className="d-flex align-items-center p-3">
            <i className="bi bi-person-badge-fill me-2" style={{ fontSize: 24 }} />
            <h2 className="mb-0 text-white">Gestión de Roles</h2>
          </div>
        </div>
        {/* Barra de búsqueda con 3 botones */}
        <div className="card">
          <div className="card-body">
            <div className="d-flex justify-content-between mb-4 align-items-center">
              <div className="d-flex align-items-center" style={{ flex: 1, minWidth: 0 }}>
                <div className="input-group w-100">
                  <span className="input-group-text px-2">
                    <i className="bi bi-search" />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Buscar rol por ID..."
                    value={searchId}
                    onChange={e => setSearchId(e.target.value)}
                    style={{ minWidth: 0 }}
                  />
                </div>
                <div className="d-flex gap-2 ms-2">
                  <button
                    className="btn btn-primary"
                    style={{ minWidth: 140 }}
                    onClick={handleSearch}
                  >
                    Buscar por ID
                  </button>
                  <button
                    className="btn btn-success"
                    style={{ minWidth: 140 }}
                    onClick={resetSearch}
                  >
                    Mostrar todos
                  </button>
                  <button
                    className="btn btn-warning"
                    style={{ minWidth: 140, width: "100%" }}
                    onClick={() => setShowCreateModal(true)}
                  >
                    Crear rol
                  </button>
                </div>
              </div>
            </div>

            {/* Tabla de roles */}
            <div className="custom-table-wrapper">
              <table className="table custom-table">
                <thead>
                  <tr>
                    <th>ID Rol</th>
                    <th>Nombre del Rol</th>
                    <th>Descripción</th>
                    <th>Fecha de Asignación</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRoles.length > 0 ? (
                    filteredRoles.map((rol) => (
                      <tr key={rol.idRol}>
                        <td>{rol.idRol}</td>
                        <td>{rol.nombreRol}</td>
                        <td>{rol.descripcionRol}</td>
                        <td>{rol.fechaAsignacionRol}</td>
                        <td>
                          <div className="d-flex gap-2 justify-content-center">
                            <OverlayTrigger placement="top" overlay={<Tooltip>Editar</Tooltip>}>
                              <button
                                className="btn btn-sm btn-primary"
                                onClick={() => handleEdit(rol)}
                              >
                                <i className="bi bi-pencil"></i>
                              </button>
                            </OverlayTrigger>
                            <OverlayTrigger placement="top" overlay={<Tooltip>Eliminar</Tooltip>}>
                              <button
                                className="btn btn-sm btn-danger"
                                onClick={() => handleDelete(rol)}
                              >
                                <i className="bi bi-trash"></i>
                              </button>
                            </OverlayTrigger>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="text-center py-4">
                        <div className="text-muted">No se encontraron roles</div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Modal para crear rol */}
        {showCreateModal && (
          <div className="crear-conductor-modal-bg">
            <div className="crear-conductor-modal">
              <h5 className="modal-title">Crear Rol</h5>
              <form>
                <div className="crear-conductor-form">
                  <div className="mb-2">
                    <label className="form-label">Nombre del Rol</label>
                    <select className="form-control">
                      <option value="">Selecciona un rol...</option>
                      <option value="Administrador">Administrador</option>
                      <option value="Manager">Manager</option>
                      <option value="Empleado">Empleado</option>
                      <option value="Conductor">Conductor</option>
                    </select>
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Descripción</label>
                    <input className="form-control" placeholder="Descripción" />
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Fecha de Asignación</label>
                    <input className="form-control" type="date" />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowCreateModal(false)}
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => setShowCreateModal(false)}
                  >
                    Guardar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal para editar rol */}
        {showEditModal && editRol && (
          <div className="crear-conductor-modal-bg">
            <div className="crear-conductor-modal">
              <h5 className="modal-title">Editar Rol</h5>
              <form>
                <div className="crear-conductor-form">
                  <div className="mb-2">
                    <label className="form-label">Nombre del Rol</label>
                    <select className="form-control" defaultValue={editRol.nombreRol}>
                      <option value="">Selecciona un rol...</option>
                      <option value="Administrador">Administrador</option>
                      <option value="Manager">Manager</option>
                      <option value="Empleado">Empleado</option>
                      <option value="Conductor">Conductor</option>
                    </select>
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Descripción</label>
                    <input className="form-control" defaultValue={editRol.descripcionRol} />
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Fecha de Asignación</label>
                    <input className="form-control" type="date" defaultValue={editRol.fechaAsignacionRol} />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowEditModal(false)}
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => setShowEditModal(false)}
                  >
                    Guardar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal para eliminar rol */}
        {showDeleteModal && selectedRol && (
          <div className="crear-conductor-modal-bg">
            <div className="crear-conductor-modal" style={{ maxWidth: 380 }}>
              <h5 className="modal-title mb-3 text-danger">
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                Confirmar Eliminación
              </h5>
              <div className="mb-3">
                ¿Estás seguro que deseas eliminar este rol? Esta acción no se puede deshacer.
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
                  onClick={() => setShowDeleteModal(false)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Roles;