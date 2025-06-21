import { useState, useEffect } from "react";
import { Card, Table, Badge, Button, Container, OverlayTrigger, Tooltip } from "react-bootstrap";
import { ExclamationTriangleFill, Search, EyeFill, PencilFill, TrashFill, PlusCircleFill } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import "../../../Views/Styles/Reportes/ReportesStyle.css";

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

const VerReportes = () => {
  const [reportes, setReportes] = useState<Reporte[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterEstado] = useState<string>("todos");

  // Datos de ejemplo para reportes
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

  const handleEdit = (id: number) => {
    console.log("Editar reporte:", id);
  };
  const handleDelete = (id: number) => {
    console.log("Eliminar reporte:", id);
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
                <Link to="/manager/crearReporte" style={{ minWidth: 140, textDecoration: "none" }}>
                  <Button
                    variant="warning"
                    style={{ minWidth: 140, width: "100%" }}
                  >
                    Crear reporte
                  </Button>
                </Link>
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
                              onClick={() => handleEdit(reporte.id)}
                            >
                              <PencilFill />
                            </Button>
                          </OverlayTrigger>
                          <OverlayTrigger placement="top" overlay={<Tooltip>Eliminar</Tooltip>}>
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => handleDelete(reporte.id)}
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
    </Container>
  );
};

export default VerReportes;