import React, { useEffect, useState } from 'react';
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import './../../Styles/NavBar/Administracion/GeneralStyle.css';
import './../../Styles/Home/TablesStyle.css'
import './../../Styles/NavBar/Logistica/ListaVehiculos.css';
import '../../Styles/Home/TablesStyle.css'

// Nueva interfaz para Reporte
interface Reporte {
  idReporte: number;
  tipoReporte: string;
  descripcion: string;
  fechaCreacion: string;
  usuarios: string;
}

// Mock de datos para ejemplo visual
const mockReportes: Reporte[] = [
  { idReporte: 1, tipoReporte: "Incidente", descripcion: "Reporte de incidente en almacén", fechaCreacion: "2024-06-01", usuarios: "Juan Pérez" },
  { idReporte: 2, tipoReporte: "Entrega", descripcion: "Entrega fuera de horario", fechaCreacion: "2024-06-10", usuarios: "Ana López" },
  { idReporte: 3, tipoReporte: "Inventario", descripcion: "Descuadre de inventario", fechaCreacion: "2024-06-15", usuarios: "Carlos Ruiz" },
];

const Reportes: React.FC = () => {
  // Estado de reportes y búsqueda
  const [reportes, setReportes] = useState<Reporte[]>([]);
  const [searchId, setSearchId] = useState("");
  const [filteredReportes, setFilteredReportes] = useState<Reporte[]>([]);
  // Estados para modales
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editReporte, setEditReporte] = useState<Reporte | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedReporte, setSelectedReporte] = useState<Reporte | null>(null);

  // Cargar datos simulados
  useEffect(() => {
    setReportes(mockReportes);
    setFilteredReportes(mockReportes);
  }, []);

  // Buscar por ID
  const handleSearch = () => {
    if (searchId.trim() === "") {
      setFilteredReportes(reportes);
    } else {
      setFilteredReportes(reportes.filter(r => r.idReporte.toString() === searchId.trim()));
    }
  };

  // Mostrar todos
  const resetSearch = () => {
    setSearchId("");
    setFilteredReportes(reportes);
  };

  // Abrir modal de editar
  const handleEdit = (reporte: Reporte) => {
    setEditReporte(reporte);
    setShowEditModal(true);
  };

  // Abrir modal de eliminar
  const handleDelete = (reporte: Reporte) => {
    setSelectedReporte(reporte);
    setShowDeleteModal(true);
  };

  return (
    <div className='areas_container'>
      <div className="container mt-4">
        {/* Barra de búsqueda y botones */}
        <div className="header-azul mb-3">
          <div className="d-flex align-items-center p-3">
            <i className="bi bi-file-earmark-bar-graph-fill me-2" style={{ fontSize: 24 }} />
            <h2 className="mb-0 text-white">Gestión de Reportes</h2>
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
                    placeholder="Buscar reporte por ID..."
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
                    Crear reporte
                  </button>
                </div>
              </div>
            </div>

            {/* Tabla de reportes */}
            <div className="custom-table-wrapper">
              <table className="table custom-table">
                <thead>
                  <tr>
                    <th>ID Reporte</th>
                    <th>Tipo de Reporte</th>
                    <th>Descripción</th>
                    <th>Fecha de Creación</th>
                    <th>Usuarios</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReportes.length > 0 ? (
                    filteredReportes.map((reporte) => (
                      <tr key={reporte.idReporte}>
                        <td>{reporte.idReporte}</td>
                        <td>{reporte.tipoReporte}</td>
                        <td>{reporte.descripcion}</td>
                        <td>{reporte.fechaCreacion}</td>
                        <td>{reporte.usuarios}</td>
                        <td>
                          <div className="d-flex gap-2 justify-content-center">
                            <OverlayTrigger placement="top" overlay={<Tooltip>Editar</Tooltip>}>
                              <button
                                className="btn btn-sm btn-primary"
                                onClick={() => handleEdit(reporte)}
                              >
                                <i className="bi bi-pencil"></i>
                              </button>
                            </OverlayTrigger>
                            <OverlayTrigger placement="top" overlay={<Tooltip>Eliminar</Tooltip>}>
                              <button
                                className="btn btn-sm btn-danger"
                                onClick={() => handleDelete(reporte)}
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
                      <td colSpan={6} className="text-center py-4">
                        <div className="text-muted">No se encontraron reportes</div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Modal para crear reporte */}
        {showCreateModal && (
          <div className="crear-conductor-modal-bg">
            <div className="crear-conductor-modal">
              <h5 className="modal-title">Crear Reporte</h5>
              <form>
                <div className="crear-conductor-form">
                  <div className="mb-2">
                    <label className="form-label">Tipo de Reporte</label>
                    <input className="form-control" placeholder="Tipo de Reporte" />
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Descripción</label>
                    <input className="form-control" placeholder="Descripción" />
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Fecha de Creación</label>
                    <input className="form-control" type="date" />
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Usuarios</label>
                    <input className="form-control" placeholder="Usuarios" />
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

        {/* Modal para editar reporte */}
        {showEditModal && editReporte && (
          <div className="crear-conductor-modal-bg">
            <div className="crear-conductor-modal">
              <h5 className="modal-title">Editar Reporte</h5>
              <form>
                <div className="crear-conductor-form">
                  <div className="mb-2">
                    <label className="form-label">Tipo de Reporte</label>
                    <input className="form-control" defaultValue={editReporte.tipoReporte} />
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Descripción</label>
                    <input className="form-control" defaultValue={editReporte.descripcion} />
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Fecha de Creación</label>
                    <input className="form-control" type="date" defaultValue={editReporte.fechaCreacion} />
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Usuarios</label>
                    <input className="form-control" defaultValue={editReporte.usuarios} />
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

        {/* Modal para eliminar reporte */}
        {showDeleteModal && selectedReporte && (
          <div className="crear-conductor-modal-bg">
            <div className="crear-conductor-modal" style={{ maxWidth: 380 }}>
              <h5 className="modal-title mb-3 text-danger">
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                Confirmar Eliminación
              </h5>
              <div className="mb-3">
                ¿Estás seguro que deseas eliminar este reporte? Esta acción no se puede deshacer.
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

export default Reportes;