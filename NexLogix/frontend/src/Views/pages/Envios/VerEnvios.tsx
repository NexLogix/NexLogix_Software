import { useEffect } from 'react';
import { useEnviosController } from '../../../Controllers/Envios/EnviosController';
import { Envio } from '../../../models/Interfaces/IEnvios';
import 'bootstrap/dist/css/bootstrap.min.css';

const VerEnvios = () => {
  const { state, fetchEnviosData, handleSearchChange, handleSearch, resetSearch } = useEnviosController();
  const { envios, error, loading, searchId } = state;

  useEffect(() => {
    fetchEnviosData();
  }, [fetchEnviosData]);

  const formatCurrency = (value: string): string => {
    const num = parseFloat(value);
    return !isNaN(num) ? `$${num.toLocaleString('es-CO')}` : 'No disponible';
  };

  const formatPhone = (value: string): string => {
    return value && value.trim() !== '' ? value : 'No disponible';
  };

  return (
    <div className='envios-container'>
        <div className="container-fluid mt-4">
          <nav className="navbar navbar-light bg-light mb-4 p-3 shadow-sm">
            <div className="container-fluid">
              <form className="d-flex" onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Ingrese ID del Envío"
                  aria-label="Buscar"
                  value={searchId}
                  onChange={handleSearchChange}
                />
                <button className="btn btn-outline-primary me-2" type="submit">
                  Buscar
                </button>
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={resetSearch}
                >
                  Mostrar Todos
                </button>
              </form>
            </div>
          </nav>
      
          <div className="row">
            <div className="col-12"> 
                <div className="card-body">
                  {error && (
                    <div className="alert alert-danger text-center fw-bold">
                      {error}
                    </div>
                  )}
      
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
                            <th>Usuario que creo el Envio</th>
                            <th>Id Usuario</th>
                            <th>Email Usuario</th>
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
                              <td>{new Date(envio.recogidas.fechaRecogidaSeleccionada).toLocaleDateString()}</td>
                              <td>{envio.entregas.direccionEntrega}</td>
                              <td>{envio.entregas.ciudad.nombre}</td>
                              <td>{formatCurrency(envio.entregas.ciudad.precioCiudad)}</td>
                              <td>{new Date(envio.entregas.fechaEntregaSeleccionada).toLocaleDateString()}</td>
                              <td>{envio.categoria_envio.nombreCategoria}</td>
                              <td>{envio.categoria_envio.descripcion}</td>
                              <td>{formatCurrency(envio.categoria_envio.precioCategoria)}</td>
                              <td>{formatCurrency(envio.costosTotal_Envio)}</td>
                              <td>{envio.user?.nombreUsuario || 'No disponible'}</td>
                              <td>{envio.user?.idUser || "No disponible"}</td>
                              <td>{envio.user?.email || 'No disponible'}</td>
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
};  

export default VerEnvios;