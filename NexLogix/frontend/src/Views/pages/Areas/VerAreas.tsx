import React, { useEffect, useState } from 'react';
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import './../../Styles/Areas/AreasStyle.css';
import './../../Styles/TablesStyle.css'
import './../../Styles/Profiles/ListaVehiculos.css'; // Asegúrate de tener los estilos de modales y tablas

// Mock de datos para ejemplo visual
interface Area {
  idArea: number;
  nombreArea: string;
  descripcionArea: string;
}

const mockAreas: Area[] = [
  { idArea: 1, nombreArea: "Logística", descripcionArea: "Área de logística y distribución" },
  { idArea: 2, nombreArea: "Recursos Humanos", descripcionArea: "Gestión de personal" },
  { idArea: 3, nombreArea: "Finanzas", descripcionArea: "Control financiero y contable" },
];

const VerAreas: React.FC = () => {
  // Estado de áreas y búsqueda
  const [areas, setAreas] = useState<Area[]>([]);
  const [searchId, setSearchId] = useState("");
  const [filteredAreas, setFilteredAreas] = useState<Area[]>([]);
  // Estados para modales
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editArea, setEditArea] = useState<Area | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedArea, setSelectedArea] = useState<Area | null>(null);

  // Cargar datos simulados
  useEffect(() => {
    setAreas(mockAreas);
    setFilteredAreas(mockAreas);
  }, []);

  // Buscar por ID
  const handleSearch = () => {
    if (searchId.trim() === "") {
      setFilteredAreas(areas);
    } else {
      setFilteredAreas(areas.filter(area => area.idArea.toString() === searchId.trim()));
    }
  };

  // Mostrar todos
  const resetSearch = () => {
    setSearchId("");
    setFilteredAreas(areas);
  };

  // Abrir modal de editar
  const handleEdit = (area: Area) => {
    setEditArea(area);
    setShowEditModal(true);
  };

  // Abrir modal de eliminar
  const handleDelete = (area: Area) => {
    setSelectedArea(area);
    setShowDeleteModal(true);
  };

  return (
    <div className='areas_container'>
      <div className="container mt-4">
        {/* Barra de búsqueda y botones */}
        <div className="header-azul mb-3">
          <div className="d-flex align-items-center p-3">
            <i className="bi bi-diagram-3-fill me-2" style={{ fontSize: 24 }} />
            <h2 className="mb-0 text-white">Gestión de Áreas</h2>
          </div>
        </div>
        {/* Barra de búsqueda con 3 botones */}
        {/* --- CAMBIO: Barra de búsqueda igual a VerListaVehiculos --- */}
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
                    placeholder="Buscar área por ID..."
                    value={searchId}
                    onChange={e => setSearchId(e.target.value)}
                    style={{ minWidth: 0 }}
                  />
                </div>
                <div className="d-flex gap-2 ms-2">
                  {/* --- CAMBIO: Botón Buscar por ID --- */}
                  <button
                    className="btn btn-primary"
                    style={{ minWidth: 140 }}
                    onClick={handleSearch}
                  >
                    Buscar por ID
                  </button>
                  {/* --- CAMBIO: Botón Mostrar todos --- */}
                  <button
                    className="btn btn-success"
                    style={{ minWidth: 140 }}
                    onClick={resetSearch}
                  >
                    Mostrar todos
                  </button>
                  {/* --- CAMBIO: Botón Crear área --- */}
                  <button
                    className="btn btn-warning"
                    style={{ minWidth: 140, width: "100%" }}
                    onClick={() => setShowCreateModal(true)}
                  >
                    Crear área
                  </button>
                </div>
              </div>
            </div>

            {/* --- CAMBIO: Tabla con columna de acciones --- */}
            <div className="custom-table-wrapper">
              <table className="table custom-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre del Área</th>
                    <th>Descripción</th>
                    <th>Acciones</th> {/* --- CAMBIO: Columna de acciones --- */}
                  </tr>
                </thead>
                <tbody>
                  {filteredAreas.length > 0 ? (
                    filteredAreas.map((area) => (
                      <tr key={area.idArea}>
                        <td>{area.idArea}</td>
                        <td>{area.nombreArea}</td>
                        <td>{area.descripcionArea}</td>
                        <td>
                          {/* --- CAMBIO: Botones de editar y eliminar con tooltip y modal --- */}
                          <div className="d-flex gap-2 justify-content-center">
                            <OverlayTrigger placement="top" overlay={<Tooltip>Editar</Tooltip>}>
                              <button
                                className="btn btn-sm btn-primary"
                                onClick={() => handleEdit(area)}
                              >
                                <i className="bi bi-pencil"></i>
                              </button>
                            </OverlayTrigger>
                            <OverlayTrigger placement="top" overlay={<Tooltip>Eliminar</Tooltip>}>
                              <button
                                className="btn btn-sm btn-danger"
                                onClick={() => handleDelete(area)}
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
                      <td colSpan={4} className="text-center py-4">
                        <div className="text-muted">No se encontraron áreas</div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* --- CAMBIO: Modal para crear área --- */}
        {showCreateModal && (
          <div className="crear-conductor-modal-bg">
            <div className="crear-conductor-modal">
              <h5 className="modal-title">Crear Área</h5>
              <form>
                <div className="crear-conductor-form">
                  <div className="mb-2">
                    <label className="form-label">Nombre del Área</label>
                    <input className="form-control" placeholder="Nombre del Área" />
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Descripción</label>
                    <input className="form-control" placeholder="Descripción" />
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

        {/* --- CAMBIO: Modal para editar área --- */}
        {showEditModal && editArea && (
          <div className="crear-conductor-modal-bg">
            <div className="crear-conductor-modal">
              <h5 className="modal-title">Editar Área</h5>
              <form>
                <div className="crear-conductor-form">
                  <div className="mb-2">
                    <label className="form-label">Nombre del Área</label>
                    <input className="form-control" defaultValue={editArea.nombreArea} />
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Descripción</label>
                    <input className="form-control" defaultValue={editArea.descripcionArea} />
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

        {/* --- CAMBIO: Modal para eliminar área --- */}
        {showDeleteModal && selectedArea && (
          <div className="crear-conductor-modal-bg">
            <div className="crear-conductor-modal" style={{ maxWidth: 380 }}>
              <h5 className="modal-title mb-3 text-danger">
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                Confirmar Eliminación
              </h5>
              <div className="mb-3">
                ¿Estás seguro que deseas eliminar esta área? Esta acción no se puede deshacer.
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

export default VerAreas;