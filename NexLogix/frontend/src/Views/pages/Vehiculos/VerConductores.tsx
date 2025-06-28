import { useState, useEffect } from "react";
import { Card, Table, Button, OverlayTrigger, Tooltip, Container } from "react-bootstrap";
import { Search, PencilFill, TrashFill, PeopleFill,  } from "react-bootstrap-icons";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import "../../../Views/Styles/NavBar/Logistica/VerConductoresStyle.css";
import "../../../Views/Styles/NavBar/Logistica/ListaVehiculos.css";

interface Conductor {
  id: number;
  nombre: string;
  documento: string;
  licencia: string;
  tipoLicencia: 'B1' | 'B2' | 'C1' | 'C2' | 'C3';
  vigenciaLicencia: string;
  estado: 'Disponible' | 'En ruta' | 'Vacaciones' | 'Inactivo' | 'En capacitación';
  vehiculoAsignado: string;
  telefono: string;
  email: string;
}

const VerConductores = () => {
  const [conductores, setConductores] = useState<Conductor[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedDriver, setEditedDriver] = useState<Partial<Conductor>>({});
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editDriver, setEditDriver] = useState<Conductor | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<Conductor | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const mockConductores: Conductor[] = [
      {
        id: 1,
        nombre: "Juan Pérez",
        documento: "12345678",
        licencia: "LC123456",
        tipoLicencia: "C3",
        vigenciaLicencia: "2025-12-31",
        estado: "En ruta",
        vehiculoAsignado: "ABC-123 (Volvo FH16)",
        telefono: "3001234567",
        email: "juan.perez@nexlogix.com"
      },
      {
        id: 2,
        nombre: "María Rodríguez",
        documento: "87654321",
        licencia: "LC654321",
        tipoLicencia: "C2",
        vigenciaLicencia: "2024-06-30",
        estado: "Disponible",
        vehiculoAsignado: "XYZ-789 (Mercedes Sprinter)",
        telefono: "3109876543",
        email: "maria.rod@nexlogix.com"
      },
      {
        id: 3,
        nombre: "Carlos Gómez",
        documento: "13579246",
        licencia: "LC246813",
        tipoLicencia: "C1",
        vigenciaLicencia: "2023-11-15",
        estado: "Inactivo",
        vehiculoAsignado: "N/A",
        telefono: "3152468109",
        email: "c.gomez@nexlogix.com"
      },
      {
        id: 4,
        nombre: "Ana López",
        documento: "86420973",
        licencia: "LC987654",
        tipoLicencia: "B2",
        vigenciaLicencia: "2026-03-20",
        estado: "Vacaciones",
        vehiculoAsignado: "DEF-456 (Ford F-150)",
        telefono: "3201357924",
        email: "a.lopez@nexlogix.com"
      },
      {
        id: 5,
        nombre: "Pedro Martínez",
        documento: "24681357",
        licencia: "LC135792",
        tipoLicencia: "C3",
        vigenciaLicencia: "2024-09-10",
        estado: "En capacitación",
        vehiculoAsignado: "N/A",
        telefono: "3186420973",
        email: "p.martinez@nexlogix.com"
      },
      {
        id: 6,
        nombre: "Luisa Fernández",
        documento: "80246791",
        licencia: "LC802467",
        tipoLicencia: "B1",
        vigenciaLicencia: "2025-07-22",
        estado: "Disponible",
        vehiculoAsignado: "GHI-789 (Toyota Hilux)",
        telefono: "3178024679",
        email: "l.fernandez@nexlogix.com"
      },
      {
        id: 7,
        nombre: "Jorge Silva",
        documento: "35792468",
        licencia: "LC357924",
        tipoLicencia: "C2",
        vigenciaLicencia: "2023-10-05",
        estado: "En ruta",
        vehiculoAsignado: "JKL-012 (Scania R450)",
        telefono: "3143579246",
        email: "j.silva@nexlogix.com"
      },
      {
        id: 8,
        nombre: "Diana Castro",
        documento: "68013579",
        licencia: "LC680135",
        tipoLicencia: "C1",
        vigenciaLicencia: "2024-04-18",
        estado: "Disponible",
        vehiculoAsignado: "MNO-345 (Iveco Daily)",
        telefono: "3136801357",
        email: "d.castro@nexlogix.com"
      }
    ];
    setConductores(mockConductores);
  }, []);

  const filteredDrivers = conductores.filter(driver =>
    Object.values(driver).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleEdit = (id: number) => {
    const driver = conductores.find((d) => d.id === id);
    if (driver) {
      setEditingId(id);
      setEditedDriver({ ...driver });
    }
  };

  const handleEditChange = (field: keyof Conductor, value: string) => {
    setEditedDriver((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleEditSave = () => {
    if (editingId && editedDriver) {
      setConductores((prev) =>
        prev.map((driver) =>
          driver.id === editingId ? { ...driver, ...editedDriver } : driver
        )
      );
      setEditingId(null);
      setEditedDriver({});
    }
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditedDriver({});
  };

  const handleView = (id: number) => {
    navigate(`/manager/verConductor/${id}`);
  };

  const handleDelete = (id: number) => {
    alert(`Eliminar conductor con id: ${id}`);
  };

  const handleStatusChange = (driver: Conductor) => {
    setSelectedDriver(driver);
    setNewStatus(driver.estado);
    setShowStatusModal(true);
  };

  const confirmStatusChange = () => {
    if (selectedDriver && newStatus) {
      setConductores(conductores.map(driver =>
        driver.id === selectedDriver.id ? { ...driver, estado: newStatus as Conductor['estado'] } : driver
      ));
      setShowStatusModal(false);
    }
  };

  const getStatusBadge = (estado: string) => {
    switch (estado) {
      case "Disponible": return "success";
      case "En ruta": return "primary";
      case "Vacaciones": return "info";
      case "Inactivo": return "danger";
      case "En capacitación": return "warning";
      default: return "secondary";
    }
  };

  const getLicenseBadge = (vigencia: string) => {
    const hoy = new Date();
    const fechaVigencia = new Date(vigencia);
    return fechaVigencia > hoy ? "success" : "danger";
  };

  return (
    <Container fluid className="p-0 m-0">
      {/* Header azul */}
      <div className="header-azul mb-3">
        <div className="d-flex align-items-center p-3">
          <PeopleFill size={24} className="me-2" />
          <h2 className="mb-0 text-white">Gestión de Conductores</h2>
        </div>
      </div>

      <Card>
        <Card.Body>
          <div className="d-flex justify-content-between mb-4 align-items-center">
            {/* Barra de búsqueda y botón Mostrar reportes */}
            <div className="d-flex align-items-center" style={{ flex: 1, minWidth: 0 }}>
              <div className="input-group w-100" /* elimina style={{ maxWidth: 500 }} */>
                <span className="input-group-text px-2">
                  <Search />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Buscar reportes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ minWidth: 0 }}
                />
              </div>
              <div className="d-flex gap-2 ms-2">
                <Button
                  variant="primary"
                  style={{ minWidth: 140 }}
                  onClick={() => {/* Lógica para buscar por ID */}}
                >
                  Buscar por ID
                </Button>
                <Button
                  variant="success"
                  style={{ minWidth: 140 }}
                  onClick={() => {/* Lógica para mostrar todos */}}
                >
                  Mostrar todos
                </Button>
                {/* <Link to="/manager/crearConductor" style={{ minWidth: 140, textDecoration: "none" }}> */}
                  <Button
                    variant="warning"
                    style={{ minWidth: 140, width: "100%" }}
                    onClick={() => setShowCreateModal(true)}
                  >
                    Crear conductor
                  </Button>
                {/* </Link> */}
              </div>
            </div>
          </div>

          <div className="custom-table-wrapper">
            <Table striped hover className="custom-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Documento</th>
                  <th>Licencia</th>
                  <th>Tipo Licencia</th>
                  <th>Vigencia Licencia</th>
                  <th>Estado</th>
                  <th>Vehículo Asignado</th>
                  <th>Contacto</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredDrivers.length > 0 ? (
                  filteredDrivers.map((driver) => (
                    <tr key={driver.id}>
                      <td>{driver.id}</td>
                      {editingId === driver.id ? (
                        <>
                          <td className="edit-sm">
                            <input
                              type="text"
                              className="form-control edit-sm"
                              value={editedDriver.nombre || ""}
                              onChange={(e) => handleEditChange("nombre", e.target.value)}
                              placeholder="Nombre"
                            />
                          </td>
                          <td className="edit-sm">
                            <input
                              type="email"
                              className="form-control edit-sm"
                              value={editedDriver.email || ""}
                              onChange={(e) => handleEditChange("email", e.target.value)}
                              placeholder="Email"
                            />
                          </td>
                          <td className="edit-sm">
                            <input
                              type="text"
                              className="form-control edit-sm"
                              value={editedDriver.documento || ""}
                              onChange={(e) => handleEditChange("documento", e.target.value)}
                              placeholder="Documento"
                            />
                          </td>
                          <td className="edit-sm">
                            <input
                              type="text"
                              className="form-control edit-sm"
                              value={editedDriver.licencia || ""}
                              onChange={(e) => handleEditChange("licencia", e.target.value)}
                              placeholder="Licencia"
                            />
                          </td>
                          <td className="edit-sm">
                            <select
                              className="form-select edit-sm"
                              value={editedDriver.tipoLicencia || ""}
                              onChange={(e) => handleEditChange("tipoLicencia", e.target.value)}
                            >
                              <option value="B1">B1</option>
                              <option value="B2">B2</option>
                              <option value="C1">C1</option>
                              <option value="C2">C2</option>
                              <option value="C3">C3</option>
                            </select>
                          </td>
                          <td className="edit-sm">
                            <input
                              type="date"
                              className="form-control edit-sm"
                              value={editedDriver.vigenciaLicencia || ""}
                              onChange={(e) => handleEditChange("vigenciaLicencia", e.target.value)}
                            />
                          </td>
                          <td className="edit-sm">
                            <select
                              className="form-select edit-sm"
                              value={editedDriver.estado || ""}
                              onChange={(e) => handleEditChange("estado", e.target.value)}
                            >
                              <option value="Disponible">Disponible</option>
                              <option value="En ruta">En ruta</option>
                              <option value="Vacaciones">Vacaciones</option>
                              <option value="En capacitación">En capacitación</option>
                              <option value="Inactivo">Inactivo</option>
                            </select>
                          </td>
                          <td className="edit-sm">
                            <input
                              type="text"
                              className="form-control edit-sm"
                              value={editedDriver.vehiculoAsignado || ""}
                              onChange={(e) => handleEditChange("vehiculoAsignado", e.target.value)}
                              placeholder="Vehículo"
                            />
                          </td>
                          <td className="edit-sm">
                            <input
                              type="text"
                              className="form-control edit-sm"
                              value={editedDriver.telefono || ""}
                              onChange={(e) => handleEditChange("telefono", e.target.value)}
                              placeholder="Contacto"
                            />
                          </td>
                          <td className="edit-sm">
                            <div className="d-flex gap-2 justify-content-center">
                              <OverlayTrigger placement="top" overlay={<Tooltip>Guardar</Tooltip>}>
                                <Button
                                  variant="link"
                                  size="sm"
                                  className="p-0"
                                  style={{ color: "#22bb33" }}
                                  onClick={handleEditSave}
                                >
                                  <FiCheckCircle size={22} />
                                </Button>
                              </OverlayTrigger>
                              <OverlayTrigger placement="top" overlay={<Tooltip>Cancelar</Tooltip>}>
                                <Button
                                  variant="link"
                                  size="sm"
                                  className="p-0"
                                  style={{ color: "#e74c3c" }}
                                  onClick={handleEditCancel}
                                >
                                  <FiXCircle size={22} />
                                </Button>
                              </OverlayTrigger>
                            </div>
                          </td>
                        </>
                      ) : (
                        <>
                          <td>{driver.nombre}</td>
                          <td>{driver.email}</td>
                          <td>{driver.documento}</td>
                          <td>{driver.licencia}</td>
                          <td>
                            <span className="badge bg-secondary">{driver.tipoLicencia}</span>
                          </td>
                          <td>
                            <span className={`badge bg-${getLicenseBadge(driver.vigenciaLicencia)}`}>
                              {new Date(driver.vigenciaLicencia).toLocaleDateString()}
                            </span>
                          </td>
                          <td>
                            <span className={`badge bg-${getStatusBadge(driver.estado)} badge-estado-uniforme`}>
                              {driver.estado}
                            </span>
                          </td>
                          <td>{driver.vehiculoAsignado}</td>
                          <td>{driver.telefono}</td>
                          <td>
                            <div className="d-flex gap-2 justify-content-center">
                              <OverlayTrigger placement="top" overlay={<Tooltip>Editar</Tooltip>}>
                                <Button
                                  variant="primary"
                                  size="sm"
                                  onClick={() => {
                                    setEditDriver(driver);
                                    setShowEditModal(true);
                                  }}
                                >
                                  <PencilFill />
                                </Button>
                              </OverlayTrigger>
                              <OverlayTrigger placement="top" overlay={<Tooltip>Eliminar</Tooltip>}>
                                <Button
                                  variant="danger"
                                  size="sm"
                                  onClick={() => {
                                    setSelectedDriver(driver);
                                    setShowDeleteModal(true);
                                  }}
                                >
                                  <TrashFill />
                                </Button>
                              </OverlayTrigger>
                            </div>
                          </td>
                        </>
                      )}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={11} className="text-center py-4">
                      <div className="text-muted">No se encontraron conductores</div>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>

      {/* Modal para cambiar estado */}
      <div className={`modal fade ${showStatusModal ? 'show d-block' : ''}`} tabIndex={-1}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Cambiar estado del conductor</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowStatusModal(false)}
              ></button>
            </div>
            <div className="modal-body">
              <p>Conductor: <strong>{selectedDriver?.nombre}</strong></p>
              <div className="mb-3">
                <label htmlFor="estado" className="form-label">Nuevo estado:</label>
                <select
                  className="form-select"
                  id="estado"
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                >
                  <option value="Disponible">Disponible</option>
                  <option value="En ruta">En ruta</option>
                  <option value="Vacaciones">Vacaciones</option>
                  <option value="En capacitación">En capacitación</option>
                  <option value="Inactivo">Inactivo</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowStatusModal(false)}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={confirmStatusChange}
              >
                Confirmar Cambio
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal para crear conductor */}
      {showCreateModal && (
        <div className="crear-conductor-modal-bg">
          <div className="crear-conductor-modal">
            <h5 className="modal-title">Crear Conductor</h5>
            <form>
              <div className="crear-conductor-form">
                <div className="mb-2">
                  <label className="form-label">Nombre completo</label>
                  <input className="form-control" placeholder="Nombre" />
                </div>
                <div className="mb-2">
                  <label className="form-label">Email</label>
                  <input className="form-control" placeholder="Email" type="email" />
                </div>
                <div className="mb-2">
                  <label className="form-label">Documento</label>
                  <input className="form-control" placeholder="Documento" />
                </div>
                <div className="mb-2">
                  <label className="form-label">Numero de licencia</label>
                  <input className="form-control" placeholder="Licencia" />
                </div>
                <div className="mb-2">
                  <label className="form-label">Tipo de licencia</label>
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
                  <label className="form-label">Fecha de vencimiento de licencia</label>
                  <input className="form-control" type="date" />
                </div>
                <div className="mb-2">
                  <label className="form-label">Estado</label>
                  <select className="form-select">
                    <option>Disponible</option>
                    <option>En ruta</option>
                    <option>Vacaciones</option>
                    <option>En capacitación</option>
                    <option>Inactivo</option>
                  </select>
                </div>
                <div className="mb-2">
                  <label className="form-label">Vehículo Asignado</label>
                  <input className="form-control" placeholder="Vehículo" />
                </div>
                <div className="mb-2">
                  <label className="form-label">Contacto</label>
                  <input className="form-control" placeholder="Teléfono" />
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

      {/* Modal para editar conductor */}
      {showEditModal && editDriver && (
        <div className="crear-conductor-modal-bg">
          <div className="crear-conductor-modal">
            <h5 className="modal-title">Editar Conductor</h5>
            <form>
              <div className="crear-conductor-form">
                <div className="mb-2">
                  <label className="form-label">Nombre completo</label>
                  <input className="form-control" defaultValue={editDriver.nombre} />
                </div>
                <div className="mb-2">
                  <label className="form-label">Email</label>
                  <input className="form-control" defaultValue={editDriver.email} type="email" />
                </div>
                <div className="mb-2">
                  <label className="form-label">Documento</label>
                  <input className="form-control" defaultValue={editDriver.documento} />
                </div>
                <div className="mb-2">
                  <label className="form-label">Numero de licencia</label>
                  <input className="form-control" defaultValue={editDriver.licencia} />
                </div>
                <div className="mb-2">
                  <label className="form-label">Tipo de licencia</label>
                  <select className="form-select" defaultValue={editDriver.tipoLicencia}>
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
                  <label className="form-label">Fecha de vencimiento de licencia</label>
                  <input className="form-control" type="date" defaultValue={editDriver.vigenciaLicencia} />
                </div>
                <div className="mb-2">
                  <label className="form-label">Estado</label>
                  <select className="form-select" defaultValue={editDriver.estado}>
                    <option>Disponible</option>
                    <option>En ruta</option>
                    <option>Vacaciones</option>
                    <option>En capacitación</option>
                    <option>Inactivo</option>
                  </select>
                </div>
                <div className="mb-2">
                  <label className="form-label">Vehículo Asignado</label>
                  <input className="form-control" defaultValue={editDriver.vehiculoAsignado} />
                </div>
                <div className="mb-2">
                  <label className="form-label">Contacto</label>
                  <input className="form-control" defaultValue={editDriver.telefono} />
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
    </Container>
  );
};

export default VerConductores;