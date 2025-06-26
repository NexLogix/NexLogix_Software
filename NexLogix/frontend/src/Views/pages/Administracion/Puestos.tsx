import React, { useEffect, useState } from 'react';
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import './../../Styles/NavBar/Administracion/GeneralStyle.css';
import './../../Styles/Home/TablesStyle.css'
import './../../Styles/NavBar/Logistica/ListaVehiculos.css';

// Nueva interfaz para Puesto
interface Puesto {
  idPuesto: number;
  nombrePuesto: string;
  fechaAsignacionPuesto: string;
  descripcionPuesto: string;
  area: string;
}

// Mock de datos para ejemplo visual
const mockPuestos: Puesto[] = [
  { idPuesto: 1, nombrePuesto: "Supervisor", fechaAsignacionPuesto: "2024-01-15", descripcionPuesto: "Supervisa operaciones", area: "Logística" },
  { idPuesto: 2, nombrePuesto: "Analista RH", fechaAsignacionPuesto: "2023-11-10", descripcionPuesto: "Gestión de personal", area: "Recursos Humanos" },
  { idPuesto: 3, nombrePuesto: "Contador", fechaAsignacionPuesto: "2022-08-01", descripcionPuesto: "Control contable", area: "Finanzas" },
];

const Puestos: React.FC = () => {
  // Estado de puestos y búsqueda
  const [puestos, setPuestos] = useState<Puesto[]>([]);
  const [searchId, setSearchId] = useState("");
  const [filteredPuestos, setFilteredPuestos] = useState<Puesto[]>([]);
  // Estados para modales
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editPuesto, setEditPuesto] = useState<Puesto | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPuesto, setSelectedPuesto] = useState<Puesto | null>(null);

  // Cargar datos simulados
  useEffect(() => {
    setPuestos(mockPuestos);
    setFilteredPuestos(mockPuestos);
  }, []);

  // Buscar por ID
  const handleSearch = () => {
    if (searchId.trim() === "") {
      setFilteredPuestos(puestos);
    } else {
      setFilteredPuestos(puestos.filter(p => p.idPuesto.toString() === searchId.trim()));
    }
  };

  // Mostrar todos
  const resetSearch = () => {
    setSearchId("");
    setFilteredPuestos(puestos);
  };

  // Abrir modal de editar
  const handleEdit = (puesto: Puesto) => {
    setEditPuesto(puesto);
    setShowEditModal(true);
  };

  // Abrir modal de eliminar
  const handleDelete = (puesto: Puesto) => {
    setSelectedPuesto(puesto);
    setShowDeleteModal(true);
  };

  return (
    <div className='areas_container'>
      <div className="container mt-4">
        {/* Barra de búsqueda y botones */}
        <div className="header-azul mb-3">
          <div className="d-flex align-items-center p-3">
            <i className="bi bi-person-badge-fill me-2" style={{ fontSize: 24 }} />
            <h2 className="mb-0 text-white">Gestión de Puestos</h2>
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
                    placeholder="Buscar puesto por ID..."
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
                    Crear puesto
                  </button>
                </div>
              </div>
            </div>

            {/* Tabla de puestos */}
            <div className="custom-table-wrapper">
              <table className="table custom-table">
                <thead>
                  <tr>
                    <th>ID Puesto</th>
                    <th>Nombre del Puesto</th>
                    <th>Fecha Asignación</th>
                    <th>Descripción</th>
                    <th>Área</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPuestos.length > 0 ? (
                    filteredPuestos.map((puesto) => (
                      <tr key={puesto.idPuesto}>
                        <td>{puesto.idPuesto}</td>
                        <td>{puesto.nombrePuesto}</td>
                        <td>{puesto.fechaAsignacionPuesto}</td>
                        <td>{puesto.descripcionPuesto}</td>
                        <td>{puesto.area}</td>
                        <td>
                          <div className="d-flex gap-2 justify-content-center">
                            <OverlayTrigger placement="top" overlay={<Tooltip>Editar</Tooltip>}>
                              <button
                                className="btn btn-sm btn-primary"
                                onClick={() => handleEdit(puesto)}
                              >
                                <i className="bi bi-pencil"></i>
                              </button>
                            </OverlayTrigger>
                            <OverlayTrigger placement="top" overlay={<Tooltip>Eliminar</Tooltip>}>
                              <button
                                className="btn btn-sm btn-danger"
                                onClick={() => handleDelete(puesto)}
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
                        <div className="text-muted">No se encontraron puestos</div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Modal para crear puesto */}
        {showCreateModal && (
          <div className="crear-conductor-modal-bg">
            <div className="crear-conductor-modal">
              <h5 className="modal-title">Crear Puesto</h5>
              <form>
                <div className="crear-conductor-form">
                  <div className="mb-2">
                    <label className="form-label">Nombre del Puesto</label>
                    <input className="form-control" placeholder="Nombre del Puesto" />
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Fecha Asignación</label>
                    <input className="form-control" type="date" />
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Descripción</label>
                    <input className="form-control" placeholder="Descripción" />
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Área</label>
                    <input className="form-control" placeholder="Área" />
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

        {/* Modal para editar puesto */}
        {showEditModal && editPuesto && (
          <div className="crear-conductor-modal-bg">
            <div className="crear-conductor-modal">
              <h5 className="modal-title">Editar Puesto</h5>
              <form>
                <div className="crear-conductor-form">
                  <div className="mb-2">
                    <label className="form-label">Nombre del Puesto</label>
                    <input className="form-control" defaultValue={editPuesto.nombrePuesto} />
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Fecha Asignación</label>
                    <input className="form-control" type="date" defaultValue={editPuesto.fechaAsignacionPuesto} />
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Descripción</label>
                    <input className="form-control" defaultValue={editPuesto.descripcionPuesto} />
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Área</label>
                    <input className="form-control" defaultValue={editPuesto.area} />
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

        {/* Modal para eliminar puesto */}
        {showDeleteModal && selectedPuesto && (
          <div className="crear-conductor-modal-bg">
            <div className="crear-conductor-modal" style={{ maxWidth: 380 }}>
              <h5 className="modal-title mb-3 text-danger">
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                Confirmar Eliminación
              </h5>
              <div className="mb-3">
                ¿Estás seguro que deseas eliminar este puesto? Esta acción no se puede deshacer.
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

export default Puestos;