import { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { PencilFill, TrashFill } from "react-bootstrap-icons";
import { ConductoresController } from "../../../Controllers/ConductoresController";
import { IConductor } from "../../../models/Interfaces/IConductor";
import { IUsuario } from "../../../models/Interfaces/IGestionUsuarios";


const Conductores = () => {
  const [conductores, setConductores] = useState<IConductor[]>([]);
  const [empleados, setEmpleados] = useState<IUsuario[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editDriver, setEditDriver] = useState<IConductor | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<IConductor | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize new driver state with proper nested structure
  const emptyDriver: IConductor = {
    idConductor: 0,
    licencia: "",
    tipoLicencia: "",
    vigenciaLicencia: "",
    estado: "disponible",
    idUsuario: 0,
    usuario: {
      idUsuario: 0,
      documento: "",
      nombre: "",
      email: "",
      telefono: "",
      estado: { idEstado: 1, nombreEstado: "Activo", descripcionEstado: "Usuario activo" },
      idRole: 3, // Role ID for drivers
      idPuesto: 0,
      idEstado: 1
    }
  };

  const [newDriver, setNewDriver] = useState<IConductor>(emptyDriver);

  useEffect(() => {
    fetchConductores();
  }, []);

  // Cargar empleados cuando se abre el modal
  useEffect(() => {
    if (showCreateModal) {
      fetchEmpleados();
    }
  }, [showCreateModal]);

  const fetchConductores = async () => {
    setLoading(true);
    setError(null);
    try {
      const conductoresData = await ConductoresController.getAllConductores();
      console.log('Conductores recibidos:', conductoresData);
      
      if (Array.isArray(conductoresData) && conductoresData.length > 0) {
        // Verificar que cada conductor tiene la estructura correcta
        const validData = conductoresData.filter(conductor => 
          conductor && 
          conductor.usuario &&
          typeof conductor.usuario === 'object'
        );
        
        console.log('Conductores válidos:', validData);
        
        if (validData.length === 0) {
          setError('No se encontraron conductores con datos válidos');
        } else {
          setConductores(validData);
        }
      } else {
        setError('No hay conductores para mostrar');
      }
    } catch (err) {
      console.error('Error al cargar conductores:', err);
      setError(err instanceof Error ? err.message : 'Error al cargar conductores');
    } finally {
      setLoading(false);
    }
  };

  const fetchEmpleados = async () => {
    try {
      const response = await ConductoresController.getAllUsuarios();
      console.log('Respuesta empleados:', response);
      
      if (response.success && Array.isArray(response.data)) {
        const empleadosMapped: IUsuario[] = response.data.map(emp => ({
          idUsuario: emp.idusuarios,
          documento: emp.documentoIdentidad,
          nombre: emp.nombreCompleto,
          email: emp.email,
          telefono: emp.numContacto,
          estado: { 
            idEstado: emp.idestado,
            nombreEstado: "Activo",
            descripcionEstado: "Usuario activo"
          },
          idRole: emp.idRole,
          idPuesto: emp.idPuestos,
          idEstado: emp.idestado
        }));

        console.log('Empleados mapeados:', empleadosMapped);
        setEmpleados(empleadosMapped);
      } else {
        console.error('Error: La respuesta no contiene datos válidos');
        setEmpleados([]);
      }
    } catch (err) {
      console.error('Error al cargar empleados:', err);
      setEmpleados([]);
    }
  };

  // Función de filtrado
  const filteredConductores = conductores.filter(conductor => {
    if (!conductor || !conductor.usuario) return false;
    
    const searchLower = searchTerm.toLowerCase();
    return (
      conductor.usuario.documento?.toLowerCase().includes(searchLower) ||
      conductor.usuario.nombre?.toLowerCase().includes(searchLower) ||
      conductor.usuario.email?.toLowerCase().includes(searchLower) ||
      conductor.usuario.telefono?.toLowerCase().includes(searchLower) ||
      conductor.licencia?.toLowerCase().includes(searchLower) ||
      conductor.estado?.toLowerCase().includes(searchLower)
    );
  });

  const handleCreateDriver = async () => {
    setLoading(true);
    setError(null);
    try {
      // Validate required fields
      if (!newDriver.usuario?.idUsuario) {
        throw new Error('Debe seleccionar un empleado');
      }
      if (!newDriver.licencia) {
        throw new Error('Debe ingresar el número de licencia');
      }
      if (!newDriver.tipoLicencia) {
        throw new Error('Debe seleccionar el tipo de licencia');
      }
      if (!newDriver.vigenciaLicencia) {
        throw new Error('Debe ingresar la fecha de vigencia de la licencia');
      }

      // Prepare the data
      const conductorData = {
        licencia: newDriver.licencia,
        tipoLicencia: newDriver.tipoLicencia,
        vigenciaLicencia: newDriver.vigenciaLicencia,
        estado: 'disponible',
        idUsuario: newDriver.usuario.idUsuario
      };

      console.log('Datos del conductor a crear:', conductorData);

      await ConductoresController.createConductor(conductorData);
      await fetchConductores();
      setShowCreateModal(false);
      setNewDriver(emptyDriver);
    } catch (err) {
      console.error('Error en handleCreateDriver:', err);
      // Mostrar el mensaje de error en el modal
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Error al crear conductor');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateDriver = async () => {
    if (!editDriver) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Validar campos requeridos
      if (!editDriver.licencia) {
        throw new Error('El número de licencia es requerido');
      }
      if (!editDriver.tipoLicencia) {
        throw new Error('El tipo de licencia es requerido');
      }
      if (!editDriver.vigenciaLicencia) {
        throw new Error('La fecha de vigencia de la licencia es requerida');
      }

      // Preparar datos para actualizar
      const conductorData = {
        licencia: editDriver.licencia,
        tipoLicencia: editDriver.tipoLicencia,
        vigenciaLicencia: editDriver.vigenciaLicencia,
        estado: editDriver.estado || 'disponible',
        idUsuario: editDriver.usuario.idUsuario,
        usuario: {
          ...editDriver.usuario,
          // Asegurarse de que estos campos estén presentes
          documento: editDriver.usuario.documento,
          nombre: editDriver.usuario.nombre,
          email: editDriver.usuario.email,
          telefono: editDriver.usuario.telefono
        }
      };

      console.log('Datos a actualizar:', conductorData);
      
      await ConductoresController.updateConductor(editDriver.idConductor, conductorData);
      await fetchConductores(); // Recargar la lista
      setShowEditModal(false);
    } catch (err) {
      if (err instanceof Error) {
        console.error('Error al actualizar:', err.message);
        setError(err.message);
      } else {
        console.error('Error desconocido al actualizar:', err);
        setError('Error al actualizar conductor');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteDriver = async () => {
    if (!selectedDriver) {
      setError('No se ha seleccionado ningún conductor para eliminar');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      console.log(`Eliminando conductor: ${selectedDriver.idConductor}`);
      const result = await ConductoresController.deleteConductor(selectedDriver.idConductor);
      
      if (result) {
        console.log('Conductor eliminado exitosamente');
        await fetchConductores(); // Recargar la lista
        setShowDeleteModal(false);
      } else {
        throw new Error('No se pudo eliminar el conductor');
      }
    } catch (err) {
      console.error('Error en handleDeleteDriver:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Error al eliminar conductor');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDriverChange = (
    field: keyof Omit<IConductor, 'usuario'> | keyof IUsuario,
    value: string,
    isUserField: boolean = false
  ) => {
    if (showEditModal && editDriver) {
      setEditDriver(prev => {
        if (!prev) return prev;
        if (isUserField) {
          return {
            ...prev,
            usuario: {
              ...prev.usuario,
              [field]: value
            }
          };
        }
        return {
          ...prev,
          [field]: value
        };
      });
    } else {
      setNewDriver(prev => {
        if (isUserField) {
          return {
            ...prev,
            usuario: {
              ...prev.usuario,
              [field]: value
            }
          };
        }
        return {
          ...prev,
          [field]: value
        };
      });
    }
  };

  // Helper to get badge color for license validity
  const getLicenseBadge = (vigencia: string) => {
    const date = new Date(vigencia);
    const today = new Date();
    const diffMonths = (date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24 * 30);
    
    let badgeClass = 'bg-success';
    if (diffMonths < 0) {
      badgeClass = 'bg-danger';
    } else if (diffMonths < 3) {
      badgeClass = 'bg-warning';
    }
    
    return (
      <span className={`badge ${badgeClass}`}>
        {vigencia}
      </span>
    );
  };

  // Tipos de estado posibles
  type DriverStatus = 'disponible' | 'en ruta' | 'inactivo';
  
  // Helper to get badge color for driver status
  const getStatusBadge = (estado: string) => {
    const statusClasses: Record<DriverStatus | 'default', string> = {
      'disponible': 'bg-success',
      'en ruta': 'bg-primary',
      'inactivo': 'bg-secondary',
      'default': 'bg-warning'
    };
    
    const normalizedStatus = estado.toLowerCase() as DriverStatus;
    const statusClass = Object.keys(statusClasses).includes(normalizedStatus)
      ? statusClasses[normalizedStatus]
      : statusClasses.default;
    
    return (
      <span className={`badge ${statusClass}`}>
        {estado || 'Sin estado'}
      </span>
    );
  };

  // Renderizado de la tabla
  const renderTable = () => (
    <div className="table-responsive">
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Documento</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Licencia</th>
            <th>Tipo</th>
            <th>Vigencia</th>
            <th>Estado</th>
            <th>Vehículo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredConductores.map((conductor) => (
            <tr key={conductor.idConductor}>
              <td>{conductor.usuario?.documento || '-'}</td>
              <td>{conductor.usuario?.nombre || '-'}</td>
              <td>{conductor.usuario?.email || '-'}</td>
              <td>{conductor.usuario?.telefono || '-'}</td>
              <td>{conductor.licencia || '-'}</td>
              <td>{conductor.tipoLicencia || '-'}</td>
              <td>{conductor.vigenciaLicencia ? getLicenseBadge(conductor.vigenciaLicencia) : '-'}</td>
              <td>{getStatusBadge(conductor.estado || '')}</td>
              <td>{conductor.vehiculoAsignado || 'No asignado'}</td>
              <td>
                <button
                  className="btn btn-sm btn-primary me-2"
                  onClick={() => setEditDriver(conductor)}
                >
                  <PencilFill />
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => {
                    setSelectedDriver(conductor);
                    setShowDeleteModal(true);
                  }}
                >
                  <TrashFill />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="areas_container">
      <div className="container mt-4">
        {/* Header */}
        <div className="header-azul mb-3">
          <div className="d-flex align-items-center p-3">
            <i className="bi bi-truck me-2" style={{ fontSize: 24 }} />
            <h2 className="mb-0 text-white">Gestión de Conductores</h2>
          </div>
        </div>

        {/* Barra de búsqueda y botones */}
        <div className="card">
          <div className="card-body">
            <div className="d-flex justify-content-between mb-4 align-items-center">
              <div className="d-flex align-items-center" style={{ flex: 1, minWidth: 0 }}>
                <div className="input-group w-100">
                  <span className="input-group-text px-2">
                    <i className="bi bi-search" />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Buscar por documento, nombre o email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ minWidth: 0 }}
                  />
                </div>
                <div className="d-flex gap-2 ms-2">
                  <button 
                    className="btn btn-primary" 
                    style={{ minWidth: 140 }} 
                    onClick={() => fetchConductores()}
                    disabled={loading}
                  >
                    Mostrar todos
                  </button>
                  <button 
                    className="btn btn-warning" 
                    style={{ minWidth: 140 }} 
                    onClick={() => setShowCreateModal(true)}
                    disabled={loading}
                  >
                    Agregar Conductor
                  </button>
                </div>
              </div>
            </div>

          {error && <div className="alert alert-danger">{error}</div>}
          
          {loading ? (
            <div className="text-center">Cargando...</div>
          ) : (
            renderTable()
          )}
          </div>
        </div>
      </div>

      {/* Create Modal */}
      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Nuevo Conductor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Seleccionar Empleado</Form.Label>
              <Form.Select
                onChange={(e) => {
                  const selectedId = Number(e.target.value);
                  console.log('ID seleccionado:', selectedId);
                  const empleado = empleados.find(emp => emp.idUsuario === selectedId);
                  console.log('Empleado encontrado:', empleado);
                  if (empleado) {
                    setNewDriver(prev => ({
                      ...prev,
                      idUsuario: empleado.idUsuario,
                      usuario: empleado
                    }));
                  }
                }}
                value={newDriver.idUsuario || ''}
              >
                <option value="">Seleccione un empleado</option>
                {empleados.map(empleado => {
                  console.log('Renderizando opción para:', empleado);
                  return (
                    <option 
                      key={`empleado-${empleado.idUsuario}`} 
                      value={empleado.idUsuario}
                    >
                      {empleado.nombre} - {empleado.documento}
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Licencia</Form.Label>
              <Form.Control
                type="text"
                value={newDriver.licencia}
                onChange={(e) => handleDriverChange("licencia", e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Tipo de Licencia</Form.Label>
              <Form.Control
                type="text"
                value={newDriver.tipoLicencia}
                onChange={(e) => handleDriverChange("tipoLicencia", e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Vigencia de Licencia</Form.Label>
              <Form.Control
                type="date"
                value={newDriver.vigenciaLicencia}
                onChange={(e) => handleDriverChange("vigenciaLicencia", e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleCreateDriver}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Conductor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          {editDriver && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Documento</Form.Label>
                <Form.Control
                  type="text"
                  value={editDriver.usuario.documento}
                  onChange={(e) => handleDriverChange("documento", e.target.value, true)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  value={editDriver.usuario.nombre}
                  onChange={(e) => handleDriverChange("nombre", e.target.value, true)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={editDriver.usuario.email}
                  onChange={(e) => handleDriverChange("email", e.target.value, true)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Teléfono</Form.Label>
                <Form.Control
                  type="tel"
                  value={editDriver.usuario.telefono}
                  onChange={(e) => handleDriverChange("telefono", e.target.value, true)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Licencia</Form.Label>
                <Form.Control
                  type="text"
                  value={editDriver.licencia}
                  onChange={(e) => handleDriverChange("licencia", e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Tipo de Licencia</Form.Label>
                <Form.Control
                  type="text"
                  value={editDriver.tipoLicencia}
                  onChange={(e) => handleDriverChange("tipoLicencia", e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Vigencia de Licencia</Form.Label>
                <Form.Control
                  type="date"
                  value={editDriver.vigenciaLicencia}
                  onChange={(e) => handleDriverChange("vigenciaLicencia", e.target.value)}
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleUpdateDriver}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedDriver && (
            <p>
              ¿Está seguro que desea eliminar al conductor {selectedDriver.usuario.nombre}?
              Esta acción no se puede deshacer.
            </p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDeleteDriver}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Conductores;