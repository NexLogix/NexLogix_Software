import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import "../../../Views/Styles/Profiles/ListaVehiculos.css";

interface Vehiculo {
  id: number;
  placa: string;
  marca: string;
  modelo: string;
  tipo: string;
  capacidad: string;
  estado: string;
  ultimoMantenimiento: string;
  conductorAsignado: string;
}

const VerListaVehiculos = () => {
  const [vehiculos, setVehiculos] = useState<Vehiculo[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<number | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editVehicle, setEditVehicle] = useState<Vehiculo | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVehiculos = async () => {
      setTimeout(() => {
        const data: Vehiculo[] = [
          {
            id: 1,
            placa: "ABC123",
            marca: "Toyota",
            modelo: "Hilux",
            tipo: "Camioneta",
            capacidad: "1 Tonelada",
            estado: "Disponible",
            ultimoMantenimiento: "2023-05-15",
            conductorAsignado: "Juan Pérez"
          },
          {
            id: 2,
            placa: "XYZ789",
            marca: "Mercedes-Benz",
            modelo: "Sprinter",
            tipo: "Furgón",
            capacidad: "3 Toneladas",
            estado: "En mantenimiento",
            ultimoMantenimiento: "2023-04-20",
            conductorAsignado: "Carlos Gómez"
          },
          {
            id: 3,
            placa: "DEF456",
            marca: "Ford",
            modelo: "F-150",
            tipo: "Camión",
            capacidad: "2.5 Toneladas",
            estado: "En ruta",
            ultimoMantenimiento: "2023-06-01",
            conductorAsignado: "María Rodríguez"
          }
        ];
        setVehiculos(data);
      }, 500);
    };
    fetchVehiculos();
  }, []);

  const filteredVehicles = vehiculos.filter(vehicle =>
    Object.values(vehicle).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleEdit = (id: number) => {
    navigate(`/manager/editarVehiculo/${id}`);
  };

  const handleDeleteClick = (id: number) => {
    setSelectedVehicle(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (selectedVehicle) {
      setVehiculos(vehiculos.filter(vehicle => vehicle.id !== selectedVehicle));
      setShowDeleteModal(false);
    }
  };

  const getStatusBadge = (estado: string) => {
    switch (estado) {
      case "Disponible": return "success";
      case "En ruta": return "primary";
      case "En mantenimiento": return "warning";
      case "Inactivo": return "danger";
      default: return "secondary";
    }
  };

  return (
    <div className="container-fluid p-0 m-0">
      {/* Header azul */}
      <div className="header-azul mb-3">
        <div className="d-flex align-items-center p-3">
          <i className="bi bi-truck me-2" style={{ fontSize: 24 }} />
          <h2 className="mb-0 text-white">Gestión de Vehículos</h2>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          {/* Barra de búsqueda y botones */}
          <div className="d-flex justify-content-between mb-4 align-items-center">
            <div className="d-flex align-items-center" style={{ flex: 1, minWidth: 0 }}>
              <div className="input-group w-100">
                <span className="input-group-text px-2">
                  <i className="bi bi-search" />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Buscar vehículos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ minWidth: 0 }}
                />
              </div>
              <div className="d-flex gap-2 ms-2">
                <button
                  className="btn btn-primary"
                  style={{ minWidth: 140 }}
                  onClick={() => {/* Lógica para buscar por ID */}}
                >
                  Buscar por ID
                </button>
                <button
                  className="btn btn-success"
                  style={{ minWidth: 140 }}
                  onClick={() => {/* Lógica para mostrar todos */}}
                >
                  Mostrar todos
                </button>
                <button
                  className="btn btn-warning"
                  style={{ minWidth: 140, width: "100%" }}
                  onClick={() => setShowCreateModal(true)}
                >
                  Crear vehículo
                </button>
              </div>
            </div>
          </div>

          <div className="custom-table-wrapper">
            <table className="table custom-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Placa</th>
                  <th>Marca</th>
                  <th>Modelo</th>
                  <th>Tipo</th>
                  <th>Categoría</th>
                  <th>Estado</th>
                  <th>Último Mantenimiento</th>
                  <th>Conductor</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredVehicles.length > 0 ? (
                  filteredVehicles.map((vehicle) => (
                    <tr key={vehicle.id}>
                      <td>{vehicle.id}</td>
                      <td>{vehicle.placa}</td>
                      <td>{vehicle.marca}</td>
                      <td>{vehicle.modelo}</td>
                      <td>{vehicle.tipo}</td>
                      <td>
                        {/* Puedes ajustar la categoría según tu modelo */}
                        <span className="badge bg-secondary badge-estado-uniforme">B1</span>
                      </td>
                      <td>
                        <span className={`badge bg-${getStatusBadge(vehicle.estado)} badge-estado-uniforme`}>
                          {vehicle.estado}
                        </span>
                      </td>
                      <td>{new Date(vehicle.ultimoMantenimiento).toLocaleDateString()}</td>
                      <td>{vehicle.conductorAsignado}</td>
                      <td>
                        <div className="d-flex gap-2 justify-content-center">
                          <OverlayTrigger placement="top" overlay={<Tooltip>Editar</Tooltip>}>
                            <button
                              className="btn btn-sm btn-primary"
                              onClick={() => {
                                setEditVehicle(vehicle);
                                setShowEditModal(true);
                              }}
                            >
                              <i className="bi bi-pencil"></i>
                            </button>
                          </OverlayTrigger>
                          <OverlayTrigger placement="top" overlay={<Tooltip>Eliminar</Tooltip>}>
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => handleDeleteClick(vehicle.id)}
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
                    <td colSpan={10} className="text-center py-4">
                      <div className="text-muted">No se encontraron vehículos</div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal de Confirmación */}
      {showDeleteModal && (
        <div className="crear-conductor-modal-bg">
          <div className="crear-conductor-modal" style={{ maxWidth: 380 }}>
            <h5 className="modal-title mb-3 text-danger">
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              Confirmar Eliminación
            </h5>
            <div className="mb-3">
              ¿Estás seguro que deseas eliminar este vehículo? Esta acción no se puede deshacer.
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
      )}

      {/* Modal para crear vehículo */}
      {showCreateModal && (
        <div className="crear-conductor-modal-bg">
          <div className="crear-conductor-modal">
            <h5 className="modal-title">Crear Vehículo</h5>
            <form>
              <div className="crear-conductor-form">
                <div className="mb-2">
                  <label className="form-label">Placa</label>
                  <input className="form-control" placeholder="Placa" />
                </div>
                <div className="mb-2">
                  <label className="form-label">Marca</label>
                  <input className="form-control" placeholder="Marca" />
                </div>
                <div className="mb-2">
                  <label className="form-label">Modelo</label>
                  <input className="form-control" placeholder="Modelo" />
                </div>
                <div className="mb-2">
                  <label className="form-label">Tipo</label>
                  <input className="form-control" placeholder="Tipo" />
                </div>
                <div className="mb-2">
                  <label className="form-label">Categoría</label>
                  <select className="form-select">
                    <option>A1</option>
                    <option>A2</option>
                    <option>B1</option>
                    <option>B2</option>
                    <option>B3</option>
                    <option>C1</option>
                    <option>C2</option>
                    <option>C3</option>
                  </select>
                </div>
                <div className="mb-2">
                  <label className="form-label">Estado</label>
                  <select className="form-select">
                    <option>Disponible</option>
                    <option>En ruta</option>
                    <option>En mantenimiento</option>
                    <option>Inactivo</option>
                  </select>
                </div>
                <div className="mb-2">
                  <label className="form-label">Último mantenimiento</label>
                  <input className="form-control" type="date" />
                </div>
                <div className="mb-2">
                  <label className="form-label">Conductor</label>
                  <input className="form-control" placeholder="Conductor asignado" />
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

      {/* Modal para editar vehículo */}
      {showEditModal && editVehicle && (
        <div className="crear-conductor-modal-bg">
          <div className="crear-conductor-modal">
            <h5 className="modal-title">Editar Vehículo</h5>
            <form>
              <div className="crear-conductor-form">
                <div className="mb-2">
                  <label className="form-label">Placa</label>
                  <input className="form-control" defaultValue={editVehicle.placa} />
                </div>
                <div className="mb-2">
                  <label className="form-label">Marca</label>
                  <input className="form-control" defaultValue={editVehicle.marca} />
                </div>
                <div className="mb-2">
                  <label className="form-label">Modelo</label>
                  <input className="form-control" defaultValue={editVehicle.modelo} />
                </div>
                <div className="mb-2">
                  <label className="form-label">Tipo</label>
                  <input className="form-control" defaultValue={editVehicle.tipo} />
                </div>
                <div className="mb-2">
                  <label className="form-label">Categoría</label>
                  <select className="form-select" defaultValue="B1">
                    <option>A1</option>
                    <option>A2</option>
                    <option>B1</option>
                    <option>B2</option>
                    <option>B3</option>
                    <option>C1</option>
                    <option>C2</option>
                    <option>C3</option>
                  </select>
                </div>
                <div className="mb-2">
                  <label className="form-label">Estado</label>
                  <select className="form-select" defaultValue={editVehicle.estado}>
                    <option>Disponible</option>
                    <option>En ruta</option>
                    <option>En mantenimiento</option>
                    <option>Inactivo</option>
                  </select>
                </div>
                <div className="mb-2">
                  <label className="form-label">Último mantenimiento</label>
                  <input className="form-control" type="date" defaultValue={editVehicle.ultimoMantenimiento} />
                </div>
                <div className="mb-2">
                  <label className="form-label">Conductor</label>
                  <input className="form-control" defaultValue={editVehicle.conductorAsignado} />
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
    </div>
  );
};

export default VerListaVehiculos;