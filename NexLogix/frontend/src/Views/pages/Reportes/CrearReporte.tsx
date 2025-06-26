import React, { useState } from "react";
import { Button, Form, Alert, Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ArrowLeft } from "react-bootstrap-icons";
import "../../Styles/NavBar/Reportes/CrearReporteStyle.css";
import "../../Styles/NavBar/Reportes/ReportesStyle.css";

const initialState = {
  tipo: "",
  descripcion: "",
  urgencia: "",
  ubicacion: "",
  vehiculo: "",
};

const CrearReporte: React.FC = () => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState<any>({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors: any = {};
    if (!formData.tipo) newErrors.tipo = "El tipo de reporte es obligatorio";
    if (!formData.descripcion) newErrors.descripcion = "La descripción es obligatoria";
    if (!formData.urgencia) newErrors.urgencia = "La urgencia es obligatoria";
    if (!formData.ubicacion) newErrors.ubicacion = "La ubicación es obligatoria";
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccessMessage("Reporte creado exitosamente.");
      setFormData(initialState);
    }, 1200);
  };

  return (
    <Container className="crear-reporte-container">
      <div className="mb-3">
        <Link to="/manager/verReportes" style={{ textDecoration: "none" }}>
          <Button variant="light" size="sm">
            <ArrowLeft className="me-1" />
            Volver
          </Button>
        </Link>
      </div>
      <Card className="crear-reporte-card shadow-sm">
        <Card.Body>
          <h4 className="mb-4 text-white">Crear Nuevo Reporte</h4>
          {successMessage && <Alert variant="success">{successMessage}</Alert>}
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          {loading && <Alert variant="info">Cargando...</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="tipo">
              <Form.Label>Tipo de Reporte</Form.Label>
              <Form.Control
                as="select"
                name="tipo"
                value={formData.tipo}
                onChange={handleInputChange}
                className="form-control"
              >
                <option value="">Seleccione tipo</option>
                <option value="Falla en vehículo">Falla en vehículo</option>
                <option value="Problema logístico">Problema logístico</option>
                <option value="Incidente de seguridad">Incidente de seguridad</option>
                <option value="Falla en equipo">Falla en equipo</option>
                <option value="Otro">Otro</option>
              </Form.Control>
              {errors.tipo && <div className="text-danger">{errors.tipo}</div>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="descripcion">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                name="descripcion"
                rows={3}
                placeholder="Describa el incidente o problema..."
                value={formData.descripcion}
                onChange={handleInputChange}
              />
              {errors.descripcion && <div className="text-danger">{errors.descripcion}</div>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="urgencia">
              <Form.Label>Urgencia</Form.Label>
              <Form.Control
                as="select"
                name="urgencia"
                value={formData.urgencia}
                onChange={handleInputChange}
                className="form-control"
              >
                <option value="">Seleccione urgencia</option>
                <option value="baja">Baja</option>
                <option value="media">Media</option>
                <option value="alta">Alta</option>
                <option value="critica">Crítica</option>
              </Form.Control>
              {errors.urgencia && <div className="text-danger">{errors.urgencia}</div>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="ubicacion">
              <Form.Label>Ubicación</Form.Label>
              <Form.Control
                type="text"
                name="ubicacion"
                placeholder="Ej: Bodega principal"
                value={formData.ubicacion}
                onChange={handleInputChange}
              />
              {errors.ubicacion && <div className="text-danger">{errors.ubicacion}</div>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="vehiculo">
              <Form.Label>Vehículo (opcional)</Form.Label>
              <Form.Control
                type="text"
                name="vehiculo"
                placeholder="Ej: ABC-123"
                value={formData.vehiculo}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Button type="submit" variant="success" disabled={loading}>
              Crear Reporte
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CrearReporte;