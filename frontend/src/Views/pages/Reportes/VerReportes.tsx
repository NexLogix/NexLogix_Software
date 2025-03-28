import { useState, useEffect } from "react";
import { Card, Table, Badge, Button, Container } from "react-bootstrap";
import { 
  ExclamationTriangleFill, 
  Search, 
  Filter,
  Download,
  EyeFill
} from "react-bootstrap-icons";

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
  const [filterEstado, setFilterEstado] = useState<string>("todos");

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
    switch(urgencia) {
      case 'baja': return 'success';
      case 'media': return 'primary';
      case 'alta': return 'warning';
      case 'critica': return 'danger';
      default: return 'secondary';
    }
  };

  const getEstadoBadge = (estado: string) => {
    switch(estado) {
      case 'pendiente': return 'secondary';
      case 'en_revision': return 'info';
      case 'resuelto': return 'success';
      case 'rechazado': return 'danger';
      default: return 'light';
    }
  };

  const handleViewDetails = (id: number) => {
    console.log("Ver detalles del reporte:", id);
    // Aquí iría la navegación a los detalles del reporte
  };

  return (
    <Container className="py-5">
      <Card className="shadow">
        <Card.Header className="bg-primary text-white">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <ExclamationTriangleFill size={24} className="me-2" />
              <h2 className="mb-0">Reportes Registrados</h2>
            </div>
            <div className="d-flex gap-2">
              <Button variant="light" size="sm">
                <Download className="me-1" /> Exportar
              </Button>
            </div>
          </div>
        </Card.Header>

        <Card.Body>
          <div className="d-flex justify-content-between mb-4">
            <div className="w-50">
              <div className="input-group">
                <span className="input-group-text">
                  <Search />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Buscar reportes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="d-flex align-items-center gap-2">
              <Filter size={18} />
              <select 
                className="form-select form-select-sm w-auto"
                value={filterEstado}
                onChange={(e) => setFilterEstado(e.target.value)}
              >
                <option value="todos">Todos los estados</option>
                <option value="pendiente">Pendientes</option>
                <option value="en_revision">En revisión</option>
                <option value="resuelto">Resueltos</option>
                <option value="rechazado">Rechazados</option>
              </select>
            </div>
          </div>

          <div className="table-responsive">
            <Table striped hover>
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
                      <td className="text-truncate" style={{maxWidth: '200px'}} title={reporte.descripcion}>
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
                        <Button 
                          variant="outline-primary" 
                          size="sm"
                          onClick={() => handleViewDetails(reporte.id)}
                        >
                          <EyeFill /> Ver
                        </Button>
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