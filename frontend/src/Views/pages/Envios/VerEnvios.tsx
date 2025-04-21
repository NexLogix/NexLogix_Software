import { useEffect } from 'react';
import NavBuscarEnvio from '../../componets/NavBars/NavBuscarEnvio';
import { useEnviosController } from '../../../Controllers/Envios/EnviosController';
import { Envio } from '../../../models/Interfaces/IEnvios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../componets/EnviosStyle/VerEnvios.css';

const VerEnvios = () => {
      const { state, fetchEnviosData } = useEnviosController();
      const { envios, error, loading } = state;
    
      useEffect(() => {
        fetchEnviosData();
      }, [fetchEnviosData]);
    
      // Función para formatear moneda
      const formatCurrency = (value: string): string => {
        const num = parseFloat(value);
        return !isNaN(num) ? `$${num.toLocaleString('es-CO')}` : 'No disponible';
      };
    
      // Función para formatear teléfono
      const formatPhone = (value: string): string => {
        return value && value.trim() !== '' ? value : 'No disponible';
      };
    
      return (
            <div className="container-fluid mt-4">
              {/* Barra de búsqueda o navegación */}
              <NavBuscarEnvio />
          
              <div className="row">
                <div className="col-12">
                  <div className="card shadow-sm">
                    {/* Encabezado de la tarjeta */}
                    <div className="card-header bg-primary text-white">
                      <h3 className="mb-0">Ver Envíos</h3>
                    </div>
          
                    <div className="card-body">
                      {/* Mostrar error si existe */}
                      {error && (
                        <div className="alert alert-danger text-center fw-bold">
                          {error}
                        </div>
                      )}
          
                      {/* Mostrar spinner si está cargando */}
                      {loading ? (
                        <div className="d-flex justify-content-center">
                          <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Cargando...</span>
                          </div>
                        </div>
                      ) : envios.length === 0 ? (
                        <div className="alert alert-info text-center">
                          No hay envíos disponibles
                        </div>
                      ) : (
                        // Tabla con resultados
                        <div className="table-responsive">
                          <table className="table table-bordered table-striped table-sm">
                            <thead>
                              <tr>
                                <th>ID Envío</th>
                                <th>Remitente</th>
                                <th>Teléfono Remitente</th>
                                <th>Destinatario</th>
                                <th>Teléfono Destinatario</th>
                                <th>Método Pago</th>
                                <th>Fecha Envío</th>
                                <th>Dir. Recogida</th>
                                <th>Ciudad Recogida</th>
                                <th>Precio Ciudad Recogida</th>
                                <th>Fecha Recogida</th>
                                <th>Dir. Entrega</th>
                                <th>Ciudad Entrega</th>
                                <th>Precio Ciudad Entrega</th>
                                <th>Fecha Entrega</th>
                                <th>Categoría</th>
                                <th>Descripción</th>
                                <th>Precio Categoría</th>
                                <th>Costo Total</th>
                              </tr>
                            </thead>
          
                            <tbody>
                              {envios.map((envio: Envio) => (
                                <tr key={envio.idEnvio}>
                                  <td>{envio.idEnvio}</td>
                                  <td>{envio.nombreRemitente}</td>
                                  <td>{formatPhone(envio.num_ContactoRemitente)}</td>
                                  <td>{envio.nombreDestinatario}</td>
                                  <td>{formatPhone(envio.num_ContactoDestinatario)}</td>
                                  <td>{envio.metodoPago}</td>
                                  <td>{new Date(envio.fechaEnvio).toLocaleDateString()}</td>
                                  <td>{envio.recogidas.direccionRecogida}</td>
                                  <td>{envio.recogidas.ciudad.nombre}</td>
                                  <td>{formatCurrency(envio.recogidas.ciudad.precioCiudad)}</td>
                                  <td>{new Date(envio.recogidas.fechaRecogidaFinal).toLocaleDateString()}</td>
                                  <td>{envio.entregas.direccionEntrega}</td>
                                  <td>{envio.entregas.ciudad.nombre}</td>
                                  <td>{formatCurrency(envio.entregas.ciudad.precioCiudad)}</td>
                                  <td>
                                    {envio.entregas.fechaEntregaFinal
                                      ? new Date(envio.entregas.fechaEntregaFinal).toLocaleDateString()
                                      : 'No disponible'}
                                  </td>
                                  <td>{envio.categoria_envio.nombreCategoria}</td>
                                  <td>{envio.categoria_envio.descripcion}</td>
                                  <td>{formatCurrency(envio.categoria_envio.precioCategoria)}</td>
                                  <td>{formatCurrency(envio.costosTotal_Envio)}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
      }          
    
export default VerEnvios;