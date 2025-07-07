import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
// import "../../../Views/Styles/NavBar/ManagerProfile/ListaVehiculos.css";
// import "../../../Views/Styles/NavBar/ManagerProfile/Conductores.css";

import { VehiculosController } from '../../../Controllers/Vehiculos/VehiculosController';
import { IVehiculo, IAsignacionVehiculo } from '../../../models/Interfaces/IVehiculo';

const GestionVehiculos = () => {
  const [vehiculos, setVehiculos] = useState<IVehiculo[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<number | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editVehicle, setEditVehicle] = useState<IVehiculo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Estados para asignar conductor
  const [showAssignDriverModal, setShowAssignDriverModal] = useState(false);
  const [selectedVehicleForDriver, setSelectedVehicleForDriver] = useState<IVehiculo | null>(null);
  const [conductorSearch, setConductorSearch] = useState("");
  const [asignaciones, setAsignaciones] = useState<IAsignacionVehiculo[]>([]);
  const [selectedConductor, setSelectedConductor] = useState<IAsignacionVehiculo["conductor"] | null>(null);

  // const navigate = useNavigate();

  useEffect(() => {
    const fetchVehiculos = async () => {
      try {
        setLoading(true);
        setError(null);
        const vehiculosData = await VehiculosController.getAllVehiculos();
        const asignacionesData = await VehiculosController.getAsignacionesConductores();

        // Combinar vehículos con sus conductores asignados
        const vehiculosConConductor = vehiculosData.map(vehiculo => {
          const asignacion = asignacionesData.find(a => a.vehiculo.placa === vehiculo.placa);
          return {
            ...vehiculo,
            conductorAsignado: asignacion ? asignacion.conductor.usuario.nombreCompleto : undefined
          };
        });

        setVehiculos(vehiculosConConductor);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar los vehículos');
      } finally {
        setLoading(false);
      }
    };
    fetchVehiculos();
  }, []);

  const handleSearchById = async () => {
    if (!searchTerm) return;
    
    try {
      setLoading(true);
      setError(null);
      const vehiculo = await VehiculosController.getVehiculoById(searchTerm);
      if (vehiculo) {
        setVehiculos([vehiculo]);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "No se encontró el vehículo con el ID especificado";
      setError(message);
      console.error('Error al buscar vehículo:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleShowAll = async () => {
    try {
      setLoading(true);
      setError(null);
      const vehiculosData = await VehiculosController.getAllVehiculos();
      const asignacionesData = await VehiculosController.getAsignacionesConductores();
      
      const vehiculosConConductor = vehiculosData.map(vehiculo => {
        const asignacion = asignacionesData.find(a => a.vehiculo.placa === vehiculo.placa);
        return {
          ...vehiculo,
          conductorAsignado: asignacion ? asignacion.conductor.usuario.nombreCompleto : undefined
        };
      });

      setVehiculos(vehiculosConConductor);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error al cargar los vehículos";
      setError(message);
      console.error('Error al cargar vehículos:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredVehicles = vehiculos.filter(vehicle => {
    if (!searchTerm) return true;
    
    const searchLower = searchTerm.toLowerCase();
    return (
      vehicle.placa.toLowerCase().includes(searchLower) ||
      vehicle.marcaVehiculo.toLowerCase().includes(searchLower) ||
      vehicle.tipoVehiculo.toLowerCase().includes(searchLower) ||
      vehicle.capacidad.toLowerCase().includes(searchLower) ||
      vehicle.estadoVehiculo.toLowerCase().includes(searchLower)
    );
  });

  // const handleEdit = (id: number) => {
  //   navigate(`/manager/editarVehiculo/${id}`);
  // };

  const handleDeleteClick = (id: number) => {
    setSelectedVehicle(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (selectedVehicle) {
      setVehiculos(vehiculos.filter(vehicle => vehicle.idVehiculo !== selectedVehicle));
      setShowDeleteModal(false);
    }
  };

  const getStatusBadge = (estado: string) => {
    switch (estado.toLowerCase()) {
      case "disponible": return "success";
      case "en_ruta": return "primary";
      case "mantenimiento": return "warning";
      case "fuera_de_servicio": return "danger";
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

      {loading && (
        <div className="text-center my-3">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      )}

      {error && (
        <div className="alert alert-danger mx-3" role="alert">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          {error}
        </div>
      )}

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
                  onClick={handleSearchById}
                  disabled={!searchTerm || loading}
                >
                  Buscar por ID
                </button>
                <button
                  className="btn btn-success"
                  style={{ minWidth: 140 }}
                  onClick={handleShowAll}
                  disabled={loading}
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
                  {/* <th>#</th> */}
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
                    <tr key={vehicle.idVehiculo}>
                      <td>{vehicle.placa}</td>
                      <td>{vehicle.marcaVehiculo}</td>
                      <td>{vehicle.tipoVehiculo}</td>
                      <td>{vehicle.capacidad}</td>
                      <td>
                        <span className="badge bg-secondary badge-estado-uniforme">{vehicle.tipoVehiculo}</span>
                      </td>
                      <td>
                        <span className={`badge bg-${getStatusBadge(vehicle.estadoVehiculo)} badge-estado-uniforme`}>
                          {vehicle.estadoVehiculo}
                        </span>
                      </td>
                      <td>{new Date(vehicle.ultimoMantenimiento).toLocaleDateString()}</td>
                      <td>{asignaciones.find(a => a.vehiculo.placa === vehicle.placa)?.conductor.usuario.nombreCompleto || 'Sin asignar'}</td>
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
                              onClick={() => handleDeleteClick(vehicle.idVehiculo)}
                            >
                              <i className="bi bi-trash"></i>
                            </button>
                          </OverlayTrigger>
                          <OverlayTrigger placement="top" overlay={<Tooltip>Asignar conductor</Tooltip>}>
                            <button
                              className="btn btn-sm btn-info"
                              onClick={() => {
                                setSelectedVehicleForDriver(vehicle);
                                setShowAssignDriverModal(true);
                                setConductorSearch("");
                                setSelectedConductor(null);
                              }}
                            >
                              <i className="bi bi-person-plus"></i>
                            </button>
                          </OverlayTrigger>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={9} className="text-center py-4">
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
                  <input className="form-control" defaultValue={editVehicle.marcaVehiculo} />
                </div>
                <div className="mb-2">
                  <label className="form-label">Tipo de Vehículo</label>
                  <select className="form-select" defaultValue={editVehicle.tipoVehiculo}>
                    <option value="A1">A1</option>
                    <option value="A2">A2</option>
                    <option value="B1">B1</option>
                    <option value="B2">B2</option>
                    <option value="B3">B3</option>
                    <option value="C1">C1</option>
                    <option value="C2">C2</option>
                    <option value="C3">C3</option>
                  </select>
                </div>
                <div className="mb-2">
                  <label className="form-label">Capacidad</label>
                  <input className="form-control" defaultValue={editVehicle.capacidad} />
                </div>
                <div className="mb-2">
                  <label className="form-label">Estado</label>
                  <select className="form-select" defaultValue={editVehicle.estadoVehiculo}>
                    <option value="disponible">Disponible</option>
                    <option value="asignado">Asignado</option>
                    <option value="en_ruta">En ruta</option>
                    <option value="mantenimiento">En mantenimiento</option>
                    <option value="fuera_de_servicio">Fuera de servicio</option>
                  </select>
                </div>
                <div className="mb-2">
                  <label className="form-label">Último mantenimiento</label>
                  <input className="form-control" type="date" defaultValue={editVehicle.ultimoMantenimiento} />
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
                  onClick={async () => {
                    if (!editVehicle) return;
                    
                    try {
                      setLoading(true);
                      setError(null);
                      
                      const formElements = document.querySelector('.crear-conductor-form')?.getElementsByTagName('input');
                      const selectElements = document.querySelector('.crear-conductor-form')?.getElementsByTagName('select');
                      
                      if (!formElements || !selectElements) return;
                      
                      const updatedVehiculo: Partial<IVehiculo> = {
                        placa: formElements[0].value,
                        marcaVehiculo: formElements[1].value,
                        tipoVehiculo: selectElements[0].value as IVehiculo['tipoVehiculo'],
                        capacidad: formElements[2].value,
                        estadoVehiculo: selectElements[1].value as IVehiculo['estadoVehiculo'],
                        ultimoMantenimiento: formElements[3].value,
                      };

                      await VehiculosController.updateVehiculo(
                        editVehicle.idVehiculo.toString(),
                        updatedVehiculo
                      );

                      // Actualizar la lista de vehículos
                      const vehiculosData = await VehiculosController.getAllVehiculos();
                      const asignacionesData = await VehiculosController.getAsignacionesConductores();
                      
                      const vehiculosConConductor = vehiculosData.map(vehiculo => {
                        const asignacion = asignacionesData.find(a => a.vehiculo.placa === vehiculo.placa);
                        return {
                          ...vehiculo,
                          conductorAsignado: asignacion ? asignacion.conductor.usuario.nombreCompleto : undefined
                        };
                      });

                      setVehiculos(vehiculosConConductor);
                      setShowEditModal(false);
                    } catch (err) {
                      setError('Error al actualizar el vehículo');
                      console.error('Error:', err);
                    } finally {
                      setLoading(false);
                    }
                  }}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Guardando...
                    </>
                  ) : 'Guardar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal para asignar conductor */}
      {showAssignDriverModal && selectedVehicleForDriver && (
        <div className="crear-conductor-modal-bg">
          <div className="crear-conductor-modal" style={{ maxWidth: 400 }}>
            <h5 className="modal-title mb-2">Asignar Conductor</h5>
            <div className="mb-2">
              <b>Vehículo:</b> {selectedVehicleForDriver.placa} - {selectedVehicleForDriver.marcaVehiculo}
            </div>
            <div className="mb-2">
              <label className="form-label">Buscar conductor</label>
              <input
                className="form-control"
                placeholder="Buscar por nombre..."
                value={conductorSearch}
                onChange={e => {
                  setConductorSearch(e.target.value);
                  setSelectedConductor(null);
                }}
              />
              <div className="list-group mt-1" style={{ maxHeight: 120, overflowY: "auto" }}>
                {conductorSearch &&
                  asignaciones
                    .filter(a =>
                      a.conductor.usuario.nombreCompleto.toLowerCase().includes(conductorSearch.toLowerCase())
                    )
                    .map(a => (
                      <button
                        type="button"
                        key={a.conductor.licencia}
                        className={`list-group-item list-group-item-action${selectedConductor?.licencia === a.conductor.licencia ? " active" : ""}`}
                        onClick={() => setSelectedConductor(a.conductor)}
                      >
                        {a.conductor.usuario.nombreCompleto}
                      </button>
                    ))}
              </div>
            </div>
            {selectedConductor && (
              <div className="alert alert-info py-2 px-2">
                <div><b>Nombre:</b> {selectedConductor.usuario.nombreCompleto}</div>
                <div><b>Documento:</b> {selectedConductor.usuario.documentoIdentidad}</div>
                <div><b>Licencia:</b> {selectedConductor.licencia} (Tipo: {selectedConductor.tipoLicencia})</div>
                <div><b>Estado:</b> {selectedConductor.estado}</div>
              </div>
            )}
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowAssignDriverModal(false)}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="btn btn-success"
                disabled={!selectedConductor || loading}
                onClick={() => {
                  const asignarConductor = async () => {
                    if (selectedConductor && selectedVehicleForDriver) {
                      try {
                        setLoading(true);
                        setError(null);
                        
                        await VehiculosController.createAsignacion({
                          idConductor: Number(selectedConductor.usuario.documentoIdentidad),
                          idVehiculo: selectedVehicleForDriver.idVehiculo
                        });

                        // Actualizar las asignaciones
                        const nuevasAsignaciones = await VehiculosController.getAsignacionesConductores();
                        setAsignaciones(nuevasAsignaciones);

                        // Actualizar el estado del vehículo
                        await VehiculosController.updateVehiculo(
                          selectedVehicleForDriver.idVehiculo.toString(),
                          { estadoVehiculo: 'asignado' }
                        );
                        
                        // Actualizar la lista de vehículos
                        setVehiculos(vehiculos.map(v =>
                          v.idVehiculo === selectedVehicleForDriver.idVehiculo
                            ? { ...v, estadoVehiculo: 'asignado' }
                            : v
                        ));

                        setShowAssignDriverModal(false);
                      } catch (err) {
                        const errorMessage = err instanceof Error ? err.message : 'Error al asignar conductor al vehículo';
                        setError(errorMessage);
                        console.error('Error:', err);
                      } finally {
                        setLoading(false);
                      }
                    }
                    setShowAssignDriverModal(false);
                  };
                  
                  asignarConductor();
                }}
              >
                Asignar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GestionVehiculos;