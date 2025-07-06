import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

//import "../../../Views/Styles/NavBar/ManagerProfile/ListaVehiculos.css";
//import "../../../Views/Styles/NavBar/ManagerProfile/Conductores.css";
//import "../../../Views/Styles/NavBar/ManagerProfile/Rutas.css";

interface VehiculoRuta {
  placa: string;
  marca: string;
  tipo: string;
  estado: string;
  ultimoMantenimiento: string;
  conductor: string | null;
}

interface Ruta {
  id: number;
  nombre: string;
  horaInicio: string;
  horaFin: string;
  estado: string;
  novedades: string;
  vehiculo: {
    placa: string;
    marca: string;
  };
  ciudades: string[];
}

const Rutas = () => {
  const [rutas, setRutas] = useState<Ruta[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedRuta, setSelectedRuta] = useState<number | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editRuta, setEditRuta] = useState<Ruta | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [detailRuta, setDetailRuta] = useState<Ruta | null>(null);
  // const navigate = useNavigate();

  // Simulación de vehículos para el buscador
  const vehiculosDisponibles: VehiculoRuta[] = [
    {
      placa: "ABC123",
      marca: "Toyota",
      tipo: "Camión",
      estado: "Disponible",
      ultimoMantenimiento: "2024-06-01",
      conductor: "Juan Pérez"
    },
    {
      placa: "XYZ789",
      marca: "Mercedes-Benz",
      tipo: "Furgón",
      estado: "En ruta",
      ultimoMantenimiento: "2024-05-15",
      conductor: "Ana Gómez"
    },
    {
      placa: "DEF456",
      marca: "Ford",
      tipo: "Pickup",
      estado: "Mantenimiento",
      ultimoMantenimiento: "2024-06-20",
      conductor: null
    }
  ];

  // Estados para crear ruta
  const [vehiculoSearch, setVehiculoSearch] = useState<string>("");
  const [vehiculoSeleccionado, setVehiculoSeleccionado] = useState<VehiculoRuta | null>(null);
  const [fechaAsignacionInicio, setFechaAsignacionInicio] = useState<string>("");
  const [fechaAsignacionFin, setFechaAsignacionFin] = useState<string>("");

  // Estados para editar ruta (independientes)
  // const [vehiculoEditSearch, setVehiculoEditSearch] = useState<string>("");
  // const [vehiculoEditSeleccionado, setVehiculoEditSeleccionado] = useState<VehiculoRuta | null>(null);
  // const [fechaEditAsignacionInicio, setFechaEditAsignacionInicio] = useState<string>("");
  // const [fechaEditAsignacionFin, setFechaEditAsignacionFin] = useState<string>("");

  useEffect(() => {
    const fetchRutas = async () => {
      setTimeout(() => {
        const data: Ruta[] = [
          {
            id: 1,
            nombre: "Ruta Norte",
            horaInicio: "07:00",
            horaFin: "12:00",
            estado: "En curso",
            novedades: "Sin novedades",
            vehiculo: { placa: "ABC123", marca: "Toyota" },
            ciudades: ["Bogotá", "Chía", "Zipaquirá"]
          },
          {
            id: 2,
            nombre: "Ruta Sur",
            horaInicio: "08:30",
            horaFin: "14:00",
            estado: "Pendiente",
            novedades: "Retraso por tráfico",
            vehiculo: { placa: "XYZ789", marca: "Mercedes-Benz" },
            ciudades: ["Soacha", "Fusagasugá"]
          },
          {
            id: 3,
            nombre: "Ruta Oriente",
            horaInicio: "06:45",
            horaFin: "11:30",
            estado: "Finalizada",
            novedades: "Entrega exitosa",
            vehiculo: { placa: "DEF456", marca: "Ford" },
            ciudades: ["La Calera", "Guasca"]
          }
        ];
        setRutas(data);
      }, 500);
    };
    fetchRutas();
  }, []);

  const filteredRutas = rutas.filter(ruta =>
    Object.values(ruta).some(value =>
      typeof value === "string"
        ? value.toLowerCase().includes(searchTerm.toLowerCase())
        : typeof value === "object" && !Array.isArray(value)
        ? Object.values(value).some(v =>
            v?.toString().toLowerCase().includes(searchTerm.toLowerCase())
          )
        : Array.isArray(value)
        ? value.join(", ").toLowerCase().includes(searchTerm.toLowerCase())
        : false
    )
  );

  // const handleEdit = (id: number) => {
  //   navigate(`/manager/editarRuta/${id}`);
  // };

  const handleDeleteClick = (id: number) => {
    setSelectedRuta(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (selectedRuta) {
      setRutas(rutas.filter(ruta => ruta.id !== selectedRuta));
      setShowDeleteModal(false);
    }
  };

  const getStatusBadge = (estado: string) => {
    switch (estado) {
      case "En curso": return "primary";
      case "Pendiente": return "warning";
      case "Finalizada": return "success";
      case "Cancelada": return "danger";
      default: return "secondary";
    }
  };

  return (
    <div className="container-fluid p-0 m-0">
      {/* Header azul */}
      <div className="header-azul mb-3">
        <div className="d-flex align-items-center p-3">
          <i className="bi bi-geo-alt me-2" style={{ fontSize: 24 }} />
          <h2 className="mb-0 text-white">Gestión de Rutas</h2>
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
                  placeholder="Buscar rutas..."
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
                  Crear ruta
                </button>
              </div>
            </div>
          </div>

          <div className="custom-table-wrapper">
            <table className="table custom-table">
              <thead>
                <tr>
                  {/* <th>#</th> */}
                  <th>Nombre de la Ruta</th>
                  <th>Hora de Inicio</th>
                  <th>Hora de Finalización</th>
                  <th>Estado</th>
                  <th>Novedades</th>
                  <th>Ciudades asociadas</th>
                  <th>Vehículo asignado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredRutas.length > 0 ? (
                  filteredRutas.map((ruta) => (
                    <tr key={ruta.id}>
                      {/* <td>{ruta.id}</td> */}
                      <td>{ruta.nombre}</td>
                      <td>{ruta.horaInicio}</td>
                      <td>{ruta.horaFin}</td>
                      <td>
                        <span className={`badge bg-${getStatusBadge(ruta.estado)} badge-estado-uniforme`}>
                          {ruta.estado}
                        </span>
                      </td>
                      <td>{ruta.novedades}</td>
                      <td>
                        <span className="badge bg-secondary">
                          {ruta.ciudades.slice(0, 2).join(", ")}
                          {ruta.ciudades.length > 2 ? "..." : ""}
                        </span>
                      </td>
                      <td>
                        <span className="badge bg-info text-dark">
                          {ruta.vehiculo.placa} - {ruta.vehiculo.marca}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex gap-2 justify-content-center">
                          <OverlayTrigger placement="top" overlay={<Tooltip>Editar</Tooltip>}>
                            <button
                              className="btn btn-sm btn-primary"
                              onClick={() => {
                                setEditRuta(ruta);
                                setShowEditModal(true);
                              }}
                            >
                              <i className="bi bi-pencil"></i>
                            </button>
                          </OverlayTrigger>
                          <OverlayTrigger placement="top" overlay={<Tooltip>Eliminar</Tooltip>}>
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => handleDeleteClick(ruta.id)}
                            >
                              <i className="bi bi-trash"></i>
                            </button>
                          </OverlayTrigger>
                          <OverlayTrigger placement="top" overlay={<Tooltip>Ver Detalle</Tooltip>}>
                            <button
                              className="btn btn-sm btn-info"
                              onClick={() => {
                                setDetailRuta(ruta);
                                setShowDetailModal(true);
                              }}
                            >
                              <i className="bi bi-eye"></i>
                            </button>
                          </OverlayTrigger>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="text-center py-4">
                      <div className="text-muted">No se encontraron rutas</div>
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
              ¿Estás seguro que deseas eliminar esta ruta? Esta acción no se puede deshacer.
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

      {/* Modal para crear ruta */}
      {showCreateModal && (
        <div className="crear-conductor-modal-bg">
          <div className="crear-conductor-modal">
            <h5 className="modal-title mb-2">Crear Ruta</h5>
            <form>
              <div className="row">
                {/* Columna izquierda */}
                <div className="col-md-6 border-end">
                  <h6 className="mb-2 text-primary">Creación de la Ruta</h6>
                  <div className="mb-1">
                    <label className="form-label">Nombre de la Ruta</label>
                    <input className="form-control form-control-sm" placeholder="Nombre de la ruta" />
                  </div>
                  <div className="mb-1">
                    <label className="form-label">Hora de Inicio de la Ruta</label>
                    <input className="form-control form-control-sm" type="time" />
                  </div>
                  <div className="mb-1">
                    <label className="form-label">Hora de Finalización de la Ruta</label>
                    <input className="form-control form-control-sm" type="time" />
                  </div>
                  <div className="mb-1">
                    <label className="form-label">Descripción</label>
                    <textarea className="form-control form-control-sm" placeholder="Descripción de la ruta" rows={1} />
                  </div>
                  <div className="mb-1">
                    <label className="form-label">Estado de la Ruta</label>
                    <select className="form-select form-select-sm">
                      <option>Pendiente</option>
                      <option>En curso</option>
                      <option>Finalizada</option>
                      <option>Cancelada</option>
                    </select>
                  </div>
                  <div className="mb-1">
                    <label className="form-label">Novedades</label>
                    <input className="form-control form-control-sm" placeholder="Novedades" />
                  </div>
                </div>
                {/* Columna derecha */}
                <div className="col-md-6 ps-md-4">
                  <h6 className="mb-2 text-success">Asignación de Vehículo para la Ruta</h6>
                  <div className="mb-1">
                    <label className="form-label">Buscar Vehículo</label>
                    <input
                      className="form-control form-control-sm"
                      placeholder="Buscar por placa, marca, tipo..."
                      value={vehiculoSearch}
                      onChange={e => setVehiculoSearch(e.target.value)}
                    />
                    <div className="list-group mt-1">
                      {vehiculoSearch &&
                        vehiculosDisponibles
                          .filter(
                            v =>
                              v.placa.toLowerCase().includes(vehiculoSearch.toLowerCase()) ||
                              v.marca.toLowerCase().includes(vehiculoSearch.toLowerCase()) ||
                              v.tipo.toLowerCase().includes(vehiculoSearch.toLowerCase())
                          )
                          .map(v => (
                            <button
                              type="button"
                              key={v.placa}
                              className={`list-group-item list-group-item-action${vehiculoSeleccionado?.placa === v.placa ? " active" : ""}`}
                              onClick={() => setVehiculoSeleccionado(v)}
                            >
                              {v.placa} - {v.marca} ({v.tipo})
                            </button>
                          ))}
                    </div>
                  </div>
                  {vehiculoSeleccionado && (
                    <div className="alert alert-info mt-2 py-2 px-2">
                      <div><b>Placa:</b> {vehiculoSeleccionado.placa}</div>
                      <div><b>Marca:</b> {vehiculoSeleccionado.marca}</div>
                      <div><b>Tipo:</b> {vehiculoSeleccionado.tipo}</div>
                      <div><b>Estado:</b> {vehiculoSeleccionado.estado}</div>
                      <div><b>Último Mantenimiento:</b> {vehiculoSeleccionado.ultimoMantenimiento}</div>
                      <div><b>Conductor asignado:</b> {vehiculoSeleccionado.conductor || "Sin asignar"}</div>
                    </div>
                  )}
                  <div className="mb-1">
                    <label className="form-label">Fecha de Asignación de Inicio</label>
                    <input
                      className="form-control form-control-sm"
                      type="date"
                      value={fechaAsignacionInicio}
                      onChange={e => setFechaAsignacionInicio(e.target.value)}
                    />
                  </div>
                  <div className="mb-1">
                    <label className="form-label">Fecha de Asignación de Finalización (opcional)</label>
                    <input
                      className="form-control form-control-sm"
                      type="date"
                      value={fechaAsignacionFin}
                      onChange={e => setFechaAsignacionFin(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer mt-2">
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

      {/* Modal para editar ruta */}
      {showEditModal && editRuta && (
        <div className="crear-conductor-modal-bg">
          <div className="crear-conductor-modal">
            <h5 className="modal-title mb-2">Editar Ruta</h5>
            <form>
              <div className="row">
                {/* Columna izquierda */}
                <div className="col-md-6 border-end">
                  <h6 className="mb-2 text-primary">Creación de la Ruta</h6>
                  <div className="mb-1">
                    <label className="form-label">Nombre de la Ruta</label>
                    <input
                      className="form-control form-control-sm"
                      defaultValue={editRuta.nombre}
                    />
                  </div>
                  <div className="mb-1">
                    <label className="form-label">Hora de Inicio de la Ruta</label>
                    <input
                      className="form-control form-control-sm"
                      type="time"
                      defaultValue={editRuta.horaInicio}
                    />
                  </div>
                  <div className="mb-1">
                    <label className="form-label">Hora de Finalización de la Ruta</label>
                    <input
                      className="form-control form-control-sm"
                      type="time"
                      defaultValue={editRuta.horaFin}
                    />
                  </div>
                  <div className="mb-1">
                    <label className="form-label">Descripción</label>
                    <textarea
                      className="form-control form-control-sm"
                      placeholder="Descripción de la ruta"
                      rows={1}
                    />
                  </div>
                  <div className="mb-1">
                    <label className="form-label">Estado de la Ruta</label>
                    <select
                      className="form-select form-select-sm"
                      defaultValue={editRuta.estado}
                    >
                      <option>Pendiente</option>
                      <option>En curso</option>
                      <option>Finalizada</option>
                      <option>Cancelada</option>
                    </select>
                  </div>
                  <div className="mb-1">
                    <label className="form-label">Novedades</label>
                    <input
                      className="form-control form-control-sm"
                      defaultValue={editRuta.novedades}
                    />
                  </div>
                </div>
                {/* Columna derecha */}
                <div className="col-md-6 ps-md-4">
                  {/* NUEVO: Selector de ciudades tipo dropdown con 3 columnas */}
                  <h6 className="mb-2 text-success">Asignación de Vehículo para la Ruta</h6>
                  <div className="mb-2">
                    <label className="form-label">Ciudades</label>
                    <div className="dropdown">
                      <button
                        className="form-select form-select-sm text-start"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        style={{ height: "38px" }}
                      >
                        {editRuta.ciudades && editRuta.ciudades.length > 0
                          ? editRuta.ciudades.join(", ")
                          : "Seleccione ciudades"}
                      </button>
                      <div
                        className="dropdown-menu ciudades-dropdown p-2"
                        style={{
                          maxHeight: 200,
                          overflowY: "auto"
                        }}
                      >
                        <div style={{ display: "flex", gap: 8 }}>
                          <div style={{ flex: 1 }}>
                            <div className="form-check">
                              <input className="form-check-input" type="checkbox" value="Bogotá"
                                id="ciudad-bogota"
                                checked={editRuta.ciudades.includes("Bogotá")}
                                onChange={e => {
                                  const ciudades = e.target.checked
                                    ? [...editRuta.ciudades, "Bogotá"]
                                    : editRuta.ciudades.filter(c => c !== "Bogotá");
                                  setEditRuta({ ...editRuta, ciudades });
                                }}
                              />
                              <label className="form-check-label" htmlFor="ciudad-bogota">Bogotá</label>
                            </div>
                            <div className="form-check">
                              <input className="form-check-input" type="checkbox" value="Bucaramanga"
                                id="ciudad-bucaramanga"
                                checked={editRuta.ciudades.includes("Bucaramanga")}
                                onChange={e => {
                                  const ciudades = e.target.checked
                                    ? [...editRuta.ciudades, "Bucaramanga"]
                                    : editRuta.ciudades.filter(c => c !== "Bucaramanga");
                                  setEditRuta({ ...editRuta, ciudades });
                                }}
                              />
                              <label className="form-check-label" htmlFor="ciudad-bucaramanga">Bucaramanga</label>
                            </div>
                            <div className="form-check">
                              <input className="form-check-input" type="checkbox" value="Medellín"
                                id="ciudad-medellin"
                                checked={editRuta.ciudades.includes("Medellín")}
                                onChange={e => {
                                  const ciudades = e.target.checked
                                    ? [...editRuta.ciudades, "Medellín"]
                                    : editRuta.ciudades.filter(c => c !== "Medellín");
                                  setEditRuta({ ...editRuta, ciudades });
                                }}
                              />
                              <label className="form-check-label" htmlFor="ciudad-medellin">Medellín</label>
                            </div>
                            <div className="form-check">
                              <input className="form-check-input" type="checkbox" value="Cali"
                                id="ciudad-cali"
                                checked={editRuta.ciudades.includes("Cali")}
                                onChange={e => {
                                  const ciudades = e.target.checked
                                    ? [...editRuta.ciudades, "Cali"]
                                    : editRuta.ciudades.filter(c => c !== "Cali");
                                  setEditRuta({ ...editRuta, ciudades });
                                }}
                              />
                              <label className="form-check-label" htmlFor="ciudad-cali">Cali</label>
                            </div>
                            <div className="form-check">
                              <input className="form-check-input" type="checkbox" value="Barranquilla"
                                id="ciudad-barranquilla"
                                checked={editRuta.ciudades.includes("Barranquilla")}
                                onChange={e => {
                                  const ciudades = e.target.checked
                                    ? [...editRuta.ciudades, "Barranquilla"]
                                    : editRuta.ciudades.filter(c => c !== "Barranquilla");
                                  setEditRuta({ ...editRuta, ciudades });
                                }}
                              />
                              <label className="form-check-label" htmlFor="ciudad-barranquilla">Barranquilla</label>
                            </div>
                          </div>
                          <div style={{ flex: 1 }}>
                            <div className="form-check">
                              <input className="form-check-input" type="checkbox" value="Cartagena"
                                id="ciudad-cartagena"
                                checked={editRuta.ciudades.includes("Cartagena")}
                                onChange={e => {
                                  const ciudades = e.target.checked
                                    ? [...editRuta.ciudades, "Cartagena"]
                                    : editRuta.ciudades.filter(c => c !== "Cartagena");
                                  setEditRuta({ ...editRuta, ciudades });
                                }}
                              />
                              <label className="form-check-label" htmlFor="ciudad-cartagena">Cartagena</label>
                            </div>
                            <div className="form-check">
                              <input className="form-check-input" type="checkbox" value="Santa Marta"
                                id="ciudad-santamarta"
                                checked={editRuta.ciudades.includes("Santa Marta")}
                                onChange={e => {
                                  const ciudades = e.target.checked
                                    ? [...editRuta.ciudades, "Santa Marta"]
                                    : editRuta.ciudades.filter(c => c !== "Santa Marta");
                                  setEditRuta({ ...editRuta, ciudades });
                                }}
                              />
                              <label className="form-check-label" htmlFor="ciudad-santamarta">Santa Marta</label>
                            </div>
                            <div className="form-check">
                              <input className="form-check-input" type="checkbox" value="Cúcuta"
                                id="ciudad-cucuta"
                                checked={editRuta.ciudades.includes("Cúcuta")}
                                onChange={e => {
                                  const ciudades = e.target.checked
                                    ? [...editRuta.ciudades, "Cúcuta"]
                                    : editRuta.ciudades.filter(c => c !== "Cúcuta");
                                  setEditRuta({ ...editRuta, ciudades });
                                }}
                              />
                              <label className="form-check-label" htmlFor="ciudad-cucuta">Cúcuta</label>
                            </div>
                            <div className="form-check">
                              <input className="form-check-input" type="checkbox" value="Ibagué"
                                id="ciudad-ibague"
                                checked={editRuta.ciudades.includes("Ibagué")}
                                onChange={e => {
                                  const ciudades = e.target.checked
                                    ? [...editRuta.ciudades, "Ibagué"]
                                    : editRuta.ciudades.filter(c => c !== "Ibagué");
                                  setEditRuta({ ...editRuta, ciudades });
                                }}
                              />
                              <label className="form-check-label" htmlFor="ciudad-ibague">Ibagué</label>
                            </div>
                            <div className="form-check">
                              <input className="form-check-input" type="checkbox" value="Pereira"
                                id="ciudad-pereira"
                                checked={editRuta.ciudades.includes("Pereira")}
                                onChange={e => {
                                  const ciudades = e.target.checked
                                    ? [...editRuta.ciudades, "Pereira"]
                                    : editRuta.ciudades.filter(c => c !== "Pereira");
                                  setEditRuta({ ...editRuta, ciudades });
                                }}
                              />
                              <label className="form-check-label" htmlFor="ciudad-pereira">Pereira</label>
                            </div>
                          </div>
                          <div style={{ flex: 1 }}>
                            <div className="form-check">
                              <input className="form-check-input" type="checkbox" value="Manizales"
                                id="ciudad-manizales"
                                checked={editRuta.ciudades.includes("Manizales")}
                                onChange={e => {
                                  const ciudades = e.target.checked
                                    ? [...editRuta.ciudades, "Manizales"]
                                    : editRuta.ciudades.filter(c => c !== "Manizales");
                                  setEditRuta({ ...editRuta, ciudades });
                                }}
                              />
                              <label className="form-check-label" htmlFor="ciudad-manizales">Manizales</label>
                            </div>
                            <div className="form-check">
                              <input className="form-check-input" type="checkbox" value="Neiva"
                                id="ciudad-neiva"
                                checked={editRuta.ciudades.includes("Neiva")}
                                onChange={e => {
                                  const ciudades = e.target.checked
                                    ? [...editRuta.ciudades, "Neiva"]
                                    : editRuta.ciudades.filter(c => c !== "Neiva");
                                  setEditRuta({ ...editRuta, ciudades });
                                }}
                              />
                              <label className="form-check-label" htmlFor="ciudad-neiva">Neiva</label>
                            </div>
                            <div className="form-check">
                              <input className="form-check-input" type="checkbox" value="Pasto"
                                id="ciudad-pasto"
                                checked={editRuta.ciudades.includes("Pasto")}
                                onChange={e => {
                                  const ciudades = e.target.checked
                                    ? [...editRuta.ciudades, "Pasto"]
                                    : editRuta.ciudades.filter(c => c !== "Pasto");
                                  setEditRuta({ ...editRuta, ciudades });
                                }}
                              />
                              <label className="form-check-label" htmlFor="ciudad-pasto">Pasto</label>
                            </div>
                            <div className="form-check">
                              <input className="form-check-input" type="checkbox" value="Nariño"
                                id="ciudad-narino"
                                checked={editRuta.ciudades.includes("Nariño")}
                                onChange={e => {
                                  const ciudades = e.target.checked
                                    ? [...editRuta.ciudades, "Nariño"]
                                    : editRuta.ciudades.filter(c => c !== "Nariño");
                                  setEditRuta({ ...editRuta, ciudades });
                                }}
                              />
                              <label className="form-check-label" htmlFor="ciudad-narino">Nariño</label>
                            </div>
                            <div className="form-check">
                              <input className="form-check-input" type="checkbox" value="Putumayo"
                                id="ciudad-putumayo"
                                checked={editRuta.ciudades.includes("Putumayo")}
                                onChange={e => {
                                  const ciudades = e.target.checked
                                    ? [...editRuta.ciudades, "Putumayo"]
                                    : editRuta.ciudades.filter(c => c !== "Putumayo");
                                  setEditRuta({ ...editRuta, ciudades });
                                }}
                              />
                              <label className="form-check-label" htmlFor="ciudad-putumayo">Putumayo</label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <small className="text-muted">Seleccione una o varias ciudades</small>
                  </div>
                  <div className="mb-1">
                    <label className="form-label">Buscar Vehículo</label>
                    <input
                      className="form-control form-control-sm"
                      placeholder="Buscar por placa, marca, tipo..."
                      value={vehiculoSearch}
                      onChange={e => setVehiculoSearch(e.target.value)}
                    />
                    <div className="list-group mt-1">
                      {vehiculoSearch &&
                        vehiculosDisponibles
                          .filter(
                            v =>
                              v.placa.toLowerCase().includes(vehiculoSearch.toLowerCase()) ||
                              v.marca.toLowerCase().includes(vehiculoSearch.toLowerCase()) ||
                              v.tipo.toLowerCase().includes(vehiculoSearch.toLowerCase())
                          )
                          .map(v => (
                            <button
                              type="button"
                              key={v.placa}
                              className={`list-group-item list-group-item-action${vehiculoSeleccionado?.placa === v.placa ? " active" : ""}`}
                              onClick={() => setVehiculoSeleccionado(v)}
                            >
                              {v.placa} - {v.marca} ({v.tipo})
                            </button>
                          ))}
                    </div>
                  </div>
                  {vehiculoSeleccionado && (
                    <div className="alert alert-info mt-2 py-2 px-2">
                      <div><b>Placa:</b> {vehiculoSeleccionado.placa}</div>
                      <div><b>Marca:</b> {vehiculoSeleccionado.marca}</div>
                      <div><b>Tipo:</b> {vehiculoSeleccionado.tipo}</div>
                      <div><b>Estado:</b> {vehiculoSeleccionado.estado}</div>
                      <div><b>Último Mantenimiento:</b> {vehiculoSeleccionado.ultimoMantenimiento}</div>
                      <div><b>Conductor asignado:</b> {vehiculoSeleccionado.conductor || "Sin asignar"}</div>
                    </div>
                  )}
                  <div className="mb-1">
                    <label className="form-label">Fecha de Asignación de Inicio</label>
                    <input
                      className="form-control form-control-sm"
                      type="date"
                      value={fechaAsignacionInicio}
                      onChange={e => setFechaAsignacionInicio(e.target.value)}
                    />
                  </div>
                  <div className="mb-1">
                    <label className="form-label">Fecha de Asignación de Finalización (opcional)</label>
                    <input
                      className="form-control form-control-sm"
                      type="date"
                      value={fechaAsignacionFin}
                      onChange={e => setFechaAsignacionFin(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer mt-2">
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

      {/* Modal Detalle de Ruta */}
      {showDetailModal && detailRuta && (
        <div className="crear-conductor-modal-bg">
          <div className="crear-conductor-modal" style={{ maxWidth: 500 }}>
            <h5 className="modal-title mb-3">
              <i className="bi bi-geo-alt me-2"></i>
              Detalle de la Ruta
            </h5>
            <div className="mb-2"><b>Nombre:</b> {detailRuta.nombre}</div>
            <div className="mb-2"><b>Hora de Inicio:</b> {detailRuta.horaInicio}</div>
            <div className="mb-2"><b>Hora de Finalización:</b> {detailRuta.horaFin}</div>
            <div className="mb-2"><b>Estado:</b> {detailRuta.estado}</div>
            <div className="mb-2"><b>Novedades:</b> {detailRuta.novedades}</div>
            <div className="mb-2"><b>Vehículo asignado:</b> {detailRuta.vehiculo.placa} - {detailRuta.vehiculo.marca}</div>
            <div className="mb-2"><b>Ciudades asociadas:</b> {detailRuta.ciudades.join(", ")}</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowDetailModal(false)}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Rutas;