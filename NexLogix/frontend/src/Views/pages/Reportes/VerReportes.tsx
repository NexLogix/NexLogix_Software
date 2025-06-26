import { useState, useEffect } from "react";
import { Card, Table, Badge, Button, Container, OverlayTrigger, Tooltip } from "react-bootstrap";
import { ExclamationTriangleFill, Search, PencilFill, TrashFill, PlusCircleFill } from "react-bootstrap-icons";
import "../../Styles/NavBar/Reportes/CrearReporteStyle.css";
import "../../Styles/NavBar/Reportes/ReportesStyle.css";

interface Reporte {
  id: number;
  tipo: string;
  descripcion: string;
  urgencia: 'baja' | 'media' | 'alta' | 'critica';
  fecha: string;
  estado: 'pendiente' | 'en_revision' | 'resuelto' | 'rechazado';
  vehiculo?: string;
  ubicacion: string;
  reportadoPor: string;
}

const initialForm = {
  tipo: "",
  descripcion: "",
  urgencia: "",
  fecha: "",
  estado: "",
  vehiculo: "",
  ubicacion: "",
  reportadoPor: ""
};

const VerReportes = () => {
  const [reportes, setReportes] = useState<Reporte[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterEstado] = useState<string>("todos");

  // Modales
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editReporte, setEditReporte] = useState<Reporte | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedReporte, setSelectedReporte] = useState<Reporte | null>(null);

  useEffect(() => {
    const mockReportes: Reporte[] = [
      {
        id: 1,
        tipo: "Falla en vehículo",
        descripcion: "El vehículo presenta problemas en el sistema de frenos",
        urgencia: "alta",
        fecha: "2023-06-15",
        estado: "resuelto",
        vehiculo: "ABC-123",
        ubicacion: "Bodega principal",
        reportadoPor: "Juan Pérez"
      },
      {
        id: 2,
        tipo: "Problema logístico",
        descripcion: "Retraso en la ruta de entrega por cierre de vía",
        urgencia: "media",
        fecha: "2023-06-18",
        estado: "en_revision",
        vehiculo: "XYZ-789",
        ubicacion: "Ruta norte",
        reportadoPor: "María Rodríguez"
      },
      {
        id: 3,
        tipo: "Incidente de seguridad",
        descripcion: "Persona no autorizada en área de carga",
        urgencia: "critica",
        fecha: "2023-06-20",
        estado: "pendiente",
        ubicacion: "Patio de carga",
        reportadoPor: "Carlos Gómez"
      },
      {
        id: 4,
        tipo: "Falla en equipo",
        descripcion: "Montacargas no funciona correctamente",
        urgencia: "alta",
        fecha: "2023-06-21",
        estado: "en_revision",
        ubicacion: "Almacén 2",
        reportadoPor: "Ana López"
      },
      {
        id: 5,
        tipo: "Otro",
        descripcion: "Falta de material de oficina",
        urgencia: "baja",
        fecha: "2023-06-22",
        estado: "rechazado",
        ubicacion: "Oficinas administrativas",
        reportadoPor: "Pedro Martínez"
      }
    ];
    setReportes(mockReportes);
  }, []);

  const filteredReportes = reportes.filter(reporte => {
    const matchesSearch = Object.values(reporte).some(value =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchesFilter = filterEstado === "todos" || reporte.estado === filterEstado;
    return matchesSearch && matchesFilter;
  });

  const getUrgenciaBadge = (urgencia: string) => {
    switch (urgencia) {
      case 'baja': return 'success';
      case 'media': return 'primary';
      case 'alta': return 'warning';
      case 'critica': return 'danger';
      default: return 'secondary';
    }
  };

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case 'pendiente': return 'secondary';
      case 'en_revision': return 'info';
      case 'resuelto': return 'success';
      case 'rechazado': return 'danger';
      default: return 'light';
    }
  };

  // Handlers para los botones CRUD
  const handleEdit = (reporte: Reporte) => {
    setEditReporte(reporte);
    setShowEditModal(true);
  };
  const handleDelete = (reporte: Reporte) => {
    setSelectedReporte(reporte);
    setShowDeleteModal(true);
  };

  return (
    <Container fluid className="p-0 m-0">
      {/* Header azul separado */}
      <div className="header-azul mb-3">
        <div className="d-flex align-items-center p-3">
          <ExclamationTriangleFill size={24} className="me-2" />
          <h2 className="mb-0 text-white">Reportes Registrados</h2>
        </div>
      </div>

      {/* Card para el resto del contenido */}
      <Card>
        <Card.Body>
          <div className="d-flex justify-content-between mb-4 align-items-center">
            {/* Barra de búsqueda y botón Mostrar reportes */}
            <div className="d-flex align-items-center" style={{ flex: 1, minWidth: 0 }}>
              <div className="input-group w-100">
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
                <Button
                  variant="warning"
                  style={{ minWidth: 140, width: "100%" }}
                  onClick={() => setShowCreateModal(true)}
                >
                  Crear reporte
                </Button>
              </div>
            </div>
          </div>

          <div className="custom-table-wrapper">
            <Table striped hover className="custom-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tipo</th>
                  <th>Descripción</th>
                  <th>Urgencia</th>
                  <th>Fecha</th>
                  <th>Estado</th>
                  <th>Vehículo</th>
                  <th>Ubicación</th>
                  <th>Reportado por</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredReportes.length > 0 ? (
                  filteredReportes.map((reporte) => (
                    <tr key={reporte.id}>
                      <td>{reporte.id}</td>
                      <td>{reporte.tipo}</td>
                      <td title={reporte.descripcion}>
                        {reporte.descripcion}
                      </td>
                      <td>
                        <Badge bg={getUrgenciaBadge(reporte.urgencia)}>
                          {reporte.urgencia}
                        </Badge>
                      </td>
                      <td>{new Date(reporte.fecha).toLocaleDateString()}</td>
                      <td>
                        <Badge bg={getEstadoBadge(reporte.estado)}>
                          {reporte.estado.replace('_', ' ')}
                        </Badge>
                      </td>
                      <td>{reporte.vehiculo || 'N/A'}</td>
                      <td>{reporte.ubicacion}</td>
                      <td>{reporte.reportadoPor}</td>
                      <td>
                        <div className="d-flex gap-2 justify-content-center">
                          <OverlayTrigger placement="top" overlay={<Tooltip>Editar</Tooltip>}>
                            <Button
                              variant="primary"
                              size="sm"
                              onClick={() => handleEdit(reporte)}
                            >
                              <PencilFill />
                            </Button>
                          </OverlayTrigger>
                          <OverlayTrigger placement="top" overlay={<Tooltip>Eliminar</Tooltip>}>
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => handleDelete(reporte)}
                            >
                              <TrashFill />
                            </Button>
                          </OverlayTrigger>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={10} className="text-center py-4">
                      No se encontraron reportes que coincidan con los filtros
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>

      {/* Modal para crear reporte */}
      {showCreateModal && (
        <div className="crear-conductor-modal-bg">
          <div className="crear-conductor-modal">
            <h5 className="modal-title">Crear Reporte</h5>
            <form>
              <div className="crear-conductor-form">
                <div className="mb-2">
                  <label className="form-label">Tipo de reporte</label>
                  <input className="form-control" placeholder="Tipo" />
                </div>
                <div className="mb-2">
                  <label className="form-label">Descripción</label>
                  <textarea className="form-control" placeholder="Descripción" />
                </div>
                <div className="mb-2">
                  <label className="form-label">Urgencia</label>
                  <select className="form-select">
                    <option>Baja</option>
                    <option>Media</option>
                    <option>Alta</option>
                    <option>Crítica</option>
                  </select>
                </div>
                <div className="mb-2">
                  <label className="form-label">Fecha</label>
                  <input className="form-control" type="date" />
                </div>
                <div className="mb-2">
                  <label className="form-label">Estado</label>
                  <select className="form-select">
                    <option>Pendiente</option>
                    <option>En revisión</option>
                    <option>Resuelto</option>
                    <option>Rechazado</option>
                  </select>
                </div>
                <div className="mb-2">
                  <label className="form-label">Vehículo</label>
                  <input className="form-control" placeholder="Vehículo" />
                </div>
                <div className="mb-2">
                  <label className="form-label">Ubicación</label>
                  <input className="form-control" placeholder="Ubicación" />
                </div>
                <div className="mb-2">
                  <label className="form-label">Reportado por</label>
                  <input className="form-control" placeholder="Reportado por" />
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
                  <label className="form-label">Tipo de reporte</label>
                  <input className="form-control" defaultValue={editReporte.tipo} />
                </div>
                <div className="mb-2">
                  <label className="form-label">Descripción</label>
                  <textarea className="form-control" defaultValue={editReporte.descripcion} />
                </div>
                <div className="mb-2">
                  <label className="form-label">Urgencia</label>
                  <select className="form-select" defaultValue={editReporte.urgencia}>
                    <option value="baja">Baja</option>
                    <option value="media">Media</option>
                    <option value="alta">Alta</option>
                    <option value="critica">Crítica</option>
                  </select>
                </div>
                <div className="mb-2">
                  <label className="form-label">Fecha</label>
                  <input className="form-control" type="date" defaultValue={editReporte.fecha} />
                </div>
                <div className="mb-2">
                  <label className="form-label">Estado</label>
                  <select className="form-select" defaultValue={editReporte.estado}>
                    <option value="pendiente">Pendiente</option>
                    <option value="en_revision">En revisión</option>
                    <option value="resuelto">Resuelto</option>
                    <option value="rechazado">Rechazado</option>
                  </select>
                </div>
                <div className="mb-2">
                  <label className="form-label">Vehículo</label>
                  <input className="form-control" defaultValue={editReporte.vehiculo} />
                </div>
                <div className="mb-2">
                  <label className="form-label">Ubicación</label>
                  <input className="form-control" defaultValue={editReporte.ubicacion} />
                </div>
                <div className="mb-2">
                  <label className="form-label">Reportado por</label>
                  <input className="form-control" defaultValue={editReporte.reportadoPor} />
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

      {/* Modal de confirmación de eliminar */}
      {showDeleteModal && selectedReporte && (
        <div className="crear-conductor-modal-bg">
          <div className="crear-conductor-modal" style={{ maxWidth: 380 }}>
            <h5 className="modal-title mb-3 text-danger">
              <ExclamationTriangleFill className="me-2" />
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
    </Container>
  );
};

export default VerReportes;