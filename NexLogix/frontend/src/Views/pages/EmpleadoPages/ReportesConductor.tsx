import { useState, useEffect } from "react";
import { fetchReportes, createReporte } from "../../../services/Reportes/ReportesService";
import { UserProfileController } from "../../../Controllers/Users/UserController";
import { IReporte } from "../../../models/Interfaces/IReportes";
import { Button, Form, Modal, Table } from "react-bootstrap";

const ReportesConductor = () => {
  const [reportes, setReportes] = useState<IReporte[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newReporte, setNewReporte] = useState({
    descripcion: "",
    tipoReporte: "Incidente",
  });

  // Cargar el ID del usuario conductor
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await UserProfileController();
        if (response.data.success) {
          setUserId(response.data.Data.ID);
        }
      } catch (err) {
        console.error("Error al obtener el perfil del usuario:", err);
        setError("No se pudo cargar la información del usuario");
      }
    };
    fetchUserProfile();
  }, []);

  // Cargar solo los reportes del conductor
  useEffect(() => {
    const loadReportes = async () => {
      if (!userId) return;
      
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetchReportes();
        if (response.success) {
          // Filtrar solo los reportes del conductor actual
          const reportesFiltrados = response.data.filter((reporte: IReporte) => 
            reporte.idusuarios === userId
          );
          setReportes(reportesFiltrados);
        } else {
          setError(response.message);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar los reportes');
      } finally {
        setIsLoading(false);
      }
    };

    loadReportes();
  }, [userId]);

  const handleCreateReporte = async () => {
    if (!userId) return;

    try {
      const response = await createReporte(newReporte);

      if (response.success) {
        setShowCreateModal(false);
        // Recargar los reportes
        const updatedResponse = await fetchReportes();
        if (updatedResponse.success) {
          const reportesFiltrados = updatedResponse.data.filter((reporte: IReporte) => 
            reporte.idusuarios === userId
          );
          setReportes(reportesFiltrados);
        }
        // Limpiar el formulario
        setNewReporte({
          descripcion: "",
          tipoReporte: "Incidente",
        });
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear el reporte');
    }
  };

  const filteredReportes = reportes.filter((reporte: IReporte) =>
    reporte.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reporte.tipoReporte.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reporte.users.nombreCompleto.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Mis Reportes</h2>
        <Button variant="primary" onClick={() => setShowCreateModal(true)}>
          Nuevo Reporte
        </Button>
      </div>

      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Buscar reportes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Form.Group>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tipo</th>
            <th>Descripción</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {filteredReportes.map((reporte: IReporte) => (
            <tr key={reporte.idReporte}>
              <td>{reporte.idReporte}</td>
              <td>{reporte.tipoReporte}</td>
              <td>{reporte.descripcion}</td>
              <td>{new Date(reporte.fechaCreacion).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal de Crear Reporte */}
      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Nuevo Reporte</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={newReporte.descripcion}
                onChange={(e) => setNewReporte({...newReporte, descripcion: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Tipo</Form.Label>
              <Form.Select
                value={newReporte.tipoReporte}
                onChange={(e) => setNewReporte({...newReporte, tipoReporte: e.target.value})}
              >
                <option value="Incidente">Incidente</option>
                <option value="Novedad">Novedad</option>
                <option value="Mantenimiento">Mantenimiento</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleCreateReporte}>
            Crear Reporte
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ReportesConductor;
