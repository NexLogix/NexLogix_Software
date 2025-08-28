import { useState, useEffect } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { RutasController } from "../../../Controllers/Rutas/RutasController";
import { IRuta } from "../../../models/Interfaces/IRutas";
import { UserProfileController } from "../../../Controllers/Users/UserController";

const RutasConductor = () => {
  const [rutas, setRutas] = useState<IRuta[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);

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

  // Cargar solo las rutas asignadas al conductor
  useEffect(() => {
    const loadRutas = async () => {
      if (!userId) return;
      
      try {
        setIsLoading(true);
        setError(null);
        const response = await RutasController.getAllRutas();
        if (response.success) {
          // Filtrar solo las rutas donde el conductor está asignado
          const rutasFiltradas = response.data.filter(ruta => 
            ruta.asignacion__vehiculos__por__rutas.some(asig => 
              asig.conductor && asig.conductor.idConductor === userId
            )
          );
          setRutas(rutasFiltradas);
        } else {
          setError(response.message);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar las rutas');
      } finally {
        setIsLoading(false);
      }
    };

    loadRutas();
  }, [userId]);

  const filteredRutas = rutas.filter(ruta => {
    if (!searchTerm) return true;
    
    return (
      ruta.nombreRuta.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ruta.estadoRuta.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ruta.novedades?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ruta.asignacion__vehiculos__por__rutas.some(asig => 
        asig.vehiculo_asignado.placa.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      ruta.asignacion__rutas__por__ciudades.some(asig =>
        asig.ciudad.nombreCiudad.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  });

  const getStatusBadge = (estado: IRuta['estadoRuta']) => {
    switch (estado) {
      case "EN_RUTA": return "primary";
      case "EN_RECOGIDA": return "info";
      case "EN_ENTREGA": return "warning";
      case "EN_DEVOLUCIONES": return "danger";
      case "EN_BODEGA":
      default:
        return "secondary";
    }
  };

  return (
    <div className="container-fluid">
      {/* Header */}
      <div className="header-azul mb-3">
        <div className="d-flex align-items-center p-3">
          <i className="bi bi-geo-alt me-2" style={{ fontSize: 24 }} />
          <h2 className="mb-0 text-white">Mis Rutas Asignadas</h2>
        </div>
      </div>

      {/* Alerta cuando no hay rutas asignadas */}
      {!isLoading && rutas.length === 0 && (
        <div className="alert alert-info d-flex align-items-center mb-3" role="alert">
          <i className="bi bi-info-circle-fill me-2"></i>
          <div>
            No tienes rutas asignadas en este momento. Por favor, contacta a tu supervisor si crees que esto es un error.
          </div>
        </div>
      )}

      <div className="card">
        <div className="card-body">
          {/* Barra de búsqueda */}
          <div className="d-flex justify-content-between mb-3">
            <div className="d-flex gap-2" style={{ flex: 1 }}>
              <input
                type="text"
                className="form-control"
                placeholder="Buscar en mis rutas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="btn btn-primary" onClick={() => setSearchTerm("")}>
                Limpiar búsqueda
              </button>
            </div>
          </div>

          {/* Mensajes de error */}
          {error && (
            <div className="alert alert-danger">
              {error}
              <button
                type="button"
                className="btn-close float-end"
                onClick={() => setError(null)}
              />
            </div>
          )}

          {/* Tabla */}
          {isLoading ? (
            <div className="text-center py-3">
              <div className="spinner-border text-primary" />
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre Ruta</th>
                    <th>Horario</th>
                    <th>Estado</th>
                    <th>Vehículo</th>
                    <th>Ciudad Origen</th>
                    <th>Ciudad Destino</th>
                    <th>Detalles</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRutas.map((ruta) => (
                    <tr key={ruta.idRuta}>
                      <td>{ruta.idRuta}</td>
                      <td>{ruta.nombreRuta}</td>
                      <td>
                        {ruta.horaInicioRuta} - {ruta.horaFinalizacionRuta}
                      </td>
                      <td>
                        <span className={`badge bg-${getStatusBadge(ruta.estadoRuta)}`}>
                          {ruta.estadoRuta.replace('_', ' ')}
                        </span>
                      </td>
                      <td>
                        {ruta.asignacion__vehiculos__por__rutas.map(asig => (
                          <div key={asig.idAsignacionVehiculoRuta}>
                            {asig.vehiculo_asignado.placa}
                          </div>
                        ))}
                      </td>
                      <td>
                        {ruta.asignacion__rutas__por__ciudades[0]?.ciudad.nombreCiudad || '-'}
                      </td>
                      <td>
                        {ruta.asignacion__rutas__por__ciudades[1]?.ciudad.nombreCiudad || '-'}
                      </td>
                      <td>
                        <OverlayTrigger placement="top" overlay={<Tooltip>Ver Detalles</Tooltip>}>
                          <button
                            className="btn btn-sm btn-info"
                            onClick={() => {
                              // Aquí puedes implementar la vista de detalles
                              console.log("Ver detalles de ruta:", ruta);
                            }}
                          >
                            <i className="bi bi-eye"></i>
                          </button>
                        </OverlayTrigger>
                      </td>
                    </tr>
                  ))}
                  {filteredRutas.length === 0 && (
                    <tr>
                      <td colSpan={8} className="text-center py-3">
                        <div className="text-muted">No tienes rutas asignadas</div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RutasConductor;
