import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBuscarUsuario from "../../componets/NavBars/NavBuscarUsuario";

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
  const [selectedDriver, setSelectedDriver] = useState<Conductor | null>(null);
  const [newStatus, setNewStatus] = useState("");
  const navigate = useNavigate();

  // Datos de ejemplo para 8 conductores
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
    navigate(`/manager/editarConductor/${id}`);
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
    switch(estado) {
      case "Disponible":
        return "bg-success";
      case "En ruta":
        return "bg-primary";
      case "Vacaciones":
        return "bg-info";
      case "Inactivo":
        return "bg-danger";
      case "En capacitación":
        return "bg-warning";
      default:
        return "bg-secondary";
    }
  };

  const getLicenseBadge = (vigencia: string) => {
    const hoy = new Date();
    const fechaVigencia = new Date(vigencia);
    return fechaVigencia > hoy ? "bg-success" : "bg-danger";
  };

  return (
    <>
      <NavBuscarUsuario />
      <div className="container-fluid px-4 py-5">
        <div className="card border-0 shadow">
          <div className="card-header bg-primary text-white p-4">
            <div className="d-flex justify-content-between align-items-center">
              <h2 className="mb-0">Gestión de Conductores</h2>
              <div className="d-flex gap-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Buscar conductor..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button 
                  className="btn btn-light"
                  onClick={() => navigate("/manager/crearConductor")}
                >
                  <i className="bi bi-plus-lg"></i> Nuevo
                </button>
              </div>
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
                    <th scope="col">Licencia</th>
                    <th scope="col">Tipo/Vigencia</th>
                    <th scope="col">Estado</th>
                    <th scope="col">Vehículo Asignado</th>
                    <th scope="col">Contacto</th>
                    <th scope="col" className="text-end">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDrivers.length > 0 ? (
                    filteredDrivers.map((driver) => (
                      <tr key={driver.id}>
                        <td>{driver.id}</td>
                        <td>
                          <div className="fw-semibold">{driver.nombre}</div>
                          <div className="text-muted small">{driver.email}</div>
                        </td>
                        <td>{driver.documento}</td>
                        <td>{driver.licencia}</td>
                        <td>
                          <div>
                            <span className="badge bg-secondary me-1">{driver.tipoLicencia}</span>
                            <span className={`badge ${getLicenseBadge(driver.vigenciaLicencia)}`}>
                              {new Date(driver.vigenciaLicencia).toLocaleDateString()}
                            </span>
                          </div>
                        </td>
                        <td>
                          <span 
                            className={`badge ${getStatusBadge(driver.estado)} pointer`}
                            onClick={() => handleStatusChange(driver)}
                          >
                            {driver.estado}
                          </span>
                        </td>
                        <td>{driver.vehiculoAsignado}</td>
                        <td>{driver.telefono}</td>
                        <td className="text-end">
                          <div className="d-flex gap-2 justify-content-end">
                            <button 
                              className="btn btn-sm btn-outline-primary"
                              onClick={() => handleEdit(driver.id)}
                            >
                              <i className="bi bi-pencil"></i> Editar
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={9} className="text-center py-4">
                        <div className="text-muted">No se encontraron conductores</div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

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
    </>
  );
};

export default VerConductores;