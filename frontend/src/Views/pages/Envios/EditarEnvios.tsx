import NavBuscarEnvio from "../../shared/NavBars/NavBuscarEnvio";
const EditarEnvios = () => {
  return (
    
    <div className="container-fluid mt-4">
      <NavBuscarEnvio/>
      <div className="row">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <h3 className="mb-0">Editar Envíos</h3>
            </div>
            <div className="card-body">
              <form id="form-editar-envios">
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="fechaEnvio" className="form-label">Fecha de Envío</label>
                    <input type="date" id="fechaEnvio" className="form-control" required />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="costoEnvio" className="form-label">Costo del Envío</label>
                    <input type="number" id="costoEnvio" className="form-control" placeholder="Costo en $" required />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="remitente" className="form-label">Remitente</label>
                    <input type="text" id="remitente" className="form-control" placeholder="Nombre del remitente" required />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="destinatario" className="form-label">Destinatario</label>
                    <input type="text" id="destinatario" className="form-control" placeholder="Nombre del destinatario" required />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-12">
                    <label htmlFor="direccionEnvio" className="form-label">Dirección de Envío</label>
                    <input type="text" id="direccionEnvio" className="form-control" placeholder="Dirección completa" required />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="estadoEnvio" className="form-label">Estado del Envío</label>
                    <select id="estadoEnvio" className="form-select" required>
                      <option value="En proceso">En proceso</option>
                      <option value="Enviado">Enviado</option>
                      <option value="Entregado">Entregado</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="observacionesEnvio" className="form-label">Observaciones</label>
                    <textarea id="observacionesEnvio" className="form-control"  placeholder="Detalles del envío"></textarea>
                  </div>
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary px-5">Editar Envío</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditarEnvios;