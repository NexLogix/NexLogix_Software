import { useState } from "react";
import { Card, Form, Button, Alert, Container } from "react-bootstrap";
import { ExclamationTriangleFill, CheckCircleFill } from "react-bootstrap-icons";

const ReporteAnomalias = () => {
  const [formData, setFormData] = useState({
    tipoAnomalia: "",
    descripcion: "",
    urgencia: "media",
    vehiculo: "",
    ubicacion: "",
    evidencia: null as File | null
  });

  const [submitted, setSubmitted] = useState(false);
  const [validated, setValidated] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        evidencia: e.target.files[0]
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    
    if (form.checkValidity()) {
      // Simular envío del formulario
      console.log("Datos del reporte:", formData);
      setSubmitted(true);
    }

    setValidated(true);
  };

  const resetForm = () => {
    setFormData({
      tipoAnomalia: "",
      descripcion: "",
      urgencia: "media",
      vehiculo: "",
      ubicacion: "",
      evidencia: null
    });
    setSubmitted(false);
    setValidated(false);
  };

  return (
    <Container className="py-5">
      <Card className="shadow">
        <Card.Header className="bg-primary text-white">
          <div className="d-flex align-items-center">
            <ExclamationTriangleFill size={24} className="me-2" />
            <h2 className="mb-0">Reporte de Anomalías</h2>
          </div>
        </Card.Header>

        <Card.Body>
          {submitted ? (
            <Alert variant="success" className="text-center">
              <CheckCircleFill size={48} className="mb-3 text-success" />
              <h3>¡Reporte enviado con éxito!</h3>
              <p className="lead">
                Hemos recibido tu reporte de anomalía. El equipo técnico de NexLogix lo revisará pronto.
              </p>
              <Button variant="primary" onClick={resetForm}>
                Enviar otro reporte
              </Button>
            </Alert>
          ) : (
            <>
              <Alert variant="info">
                <p>
                  Utiliza este formulario para reportar cualquier anomalía, falla técnica o incidente relacionado con:
                </p>
                <ul>
                  <li>Vehículos de la flota</li>
                  <li>Equipos tecnológicos</li>
                  <li>Problemas logísticos</li>
                  <li>Incidentes de seguridad</li>
                </ul>
              </Alert>

              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Tipo de anomalía <span className="text-danger">*</span></Form.Label>
                  <Form.Select
                    name="tipoAnomalia"
                    value={formData.tipoAnomalia}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Seleccione el tipo de anomalía</option>
                    <option value="vehiculo">Falla en vehículo</option>
                    <option value="equipo">Falla en equipo</option>
                    <option value="logistica">Problema logístico</option>
                    <option value="seguridad">Incidente de seguridad</option>
                    <option value="otro">Otro</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    Por favor selecciona el tipo de anomalía.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Descripción detallada <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleChange}
                    required
                    placeholder="Describe con el mayor detalle posible la anomalía encontrada..."
                  />
                  <Form.Control.Feedback type="invalid">
                    Por favor proporciona una descripción detallada.
                  </Form.Control.Feedback>
                </Form.Group>

                <div className="row mb-3">
                  <Form.Group className="col-md-6">
                    <Form.Label>Nivel de urgencia</Form.Label>
                    <Form.Select
                      name="urgencia"
                      value={formData.urgencia}
                      onChange={handleChange}
                    >
                      <option value="baja">Baja</option>
                      <option value="media">Media</option>
                      <option value="alta">Alta</option>
                      <option value="critica">Crítica</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="col-md-6">
                    <Form.Label>Vehículo relacionado (si aplica)</Form.Label>
                    <Form.Control
                      type="text"
                      name="vehiculo"
                      value={formData.vehiculo}
                      onChange={handleChange}
                      placeholder="Placa o número de vehículo"
                    />
                  </Form.Group>
                </div>

                <Form.Group className="mb-3">
                  <Form.Label>Ubicación o ruta <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    name="ubicacion"
                    value={formData.ubicacion}
                    onChange={handleChange}
                    required
                    placeholder="¿Dónde ocurrió la anomalía?"
                  />
                  <Form.Control.Feedback type="invalid">
                    Por favor indica la ubicación.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Evidencia (opcional)</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*, .pdf, .doc, .docx"
                  />
                  <Form.Text className="text-muted">
                    Puedes adjuntar fotos, documentos o cualquier evidencia relevante.
                  </Form.Text>
                </Form.Group>

                <div className="d-grid">
                  <Button variant="primary" type="submit" size="lg">
                    <ExclamationTriangleFill className="me-2" />
                    Reportar Anomalía
                  </Button>
                </div>
              </Form>
            </>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ReporteAnomalias;