import { useCrearEnvioController } from "../../../Controllers/Envios/EnviosController";

const CrearEnvios = () => {
  const { state, handleInputChange, handleSubmit } = useCrearEnvioController();
  const { ciudades, categorias, formData, errors, loading, successMessage, errorMessage } = state;

  return (
    <div className="container-fluid mt-4">
      <div className="row">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <h3 className="mb-0">Crear Envío</h3>
            </div>
            <div className="card-body scrollable-container">
              {successMessage && <div className="alert alert-success">{successMessage}</div>}
              {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
              <form onSubmit={handleSubmit}>
                {/* Remitente */}
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="nombreRemitente" className="form-label">
                      Remitente
                    </label>
                    <input
                      type="text"
                      id="nombreRemitente"
                      name="nombreRemitente"
                      className="form-control"
                      value={formData.nombreRemitente}
                      onChange={handleInputChange}
                      placeholder="Nombre del remitente"
                      required
                    />
                    {errors.nombreRemitente && <div className="text-danger">{errors.nombreRemitente}</div>}
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="num_ContactoRemitente" className="form-label">
                      Teléfono Remitente
                    </label>
                    <input
                      type="text"
                      id="num_ContactoRemitente"
                      name="num_ContactoRemitente"
                      className="form-control"
                      value={formData.num_ContactoRemitente}
                      onChange={handleInputChange}
                      placeholder="Ej: 3127894561"
                      required
                    />
                    {errors.num_ContactoRemitente && <div className="text-danger">{errors.num_ContactoRemitente}</div>}
                  </div>
                </div>

                {/* Destinatario */}
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="nombreDestinatario" className="form-label">
                      Destinatario
                    </label>
                    <input
                      type="text"
                      id="nombreDestinatario"
                      name="nombreDestinatario"
                      className="form-control"
                      value={formData.nombreDestinatario}
                      onChange={handleInputChange}
                      placeholder="Nombre del destinatario"
                      required
                    />
                    {errors.nombreDestinatario && <div className="text-danger">{errors.nombreDestinatario}</div>}
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="num_ContactoDestinatario" className="form-label">
                      Teléfono Destinatario
                    </label>
                    <input
                      type="text"
                      id="num_ContactoDestinatario"
                      name="num_ContactoDestinatario"
                      className="form-control"
                      value={formData.num_ContactoDestinatario}
                      onChange={handleInputChange}
                      placeholder="Ej: 3009876543"
                      required
                    />
                    {errors.num_ContactoDestinatario && (
                      <div className="text-danger">{errors.num_ContactoDestinatario}</div>
                    )}
                  </div>
                </div>

                {/* Método de Pago y Categoría */}
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="metodoPago" className="form-label">
                      Método de Pago
                    </label>
                    <select
                      id="metodoPago"
                      name="metodoPago"
                      className="form-select"
                      value={formData.metodoPago}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Seleccione método</option>
                      <option value="Efectivo">Efectivo</option>
                      <option value="Tarjeta Debito">Tarjeta Débito</option>
                      <option value="Tarjeta Credito">Tarjeta Crédito</option>
                      <option value="Plataformas Virtuales">Plataformas Virtuales</option>
                      <option value="Cupones">Cupones</option>
                    </select>
                    {errors.metodoPago && <div className="text-danger">{errors.metodoPago}</div>}
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="idCategoria" className="form-label">
                      Categoría de Envío
                    </label>
                    <select
                      id="idCategoria"
                      name="idCategoria"
                      className="form-select"
                      value={formData.idCategoria}
                      onChange={handleInputChange}
                      required
                    >
                      <option value={0}>Seleccione categoría</option>
                      {categorias.map((cat) => (
                        <option key={cat.idCategoria} value={cat.idCategoria}>
                          {cat.nombreCategoria} (${cat.precioCategoria})
                        </option>
                      ))}
                    </select>
                    {errors.idCategoria && <div className="text-danger">{errors.idCategoria}</div>}
                  </div>
                </div>

                {/* Recogida */}
                <h5 className="mb-3">Recogida</h5>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="recogida.fechaRecogidaSeleccionada" className="form-label">
                      Fecha Recogida
                    </label>
                    <input
                      type="date"
                      id="recogida.fechaRecogidaSeleccionada"
                      name="recogida.fechaRecogidaSeleccionada"
                      className="form-control"
                      value={formData.recogida.fechaRecogidaSeleccionada}
                      onChange={handleInputChange}
                      required
                    />
                    {errors['recogida.fechaRecogidaSeleccionada'] && (
                      <div className="text-danger">{errors['recogida.fechaRecogidaSeleccionada']}</div>
                    )}
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="recogida.idCiudad" className="form-label">
                      Ciudad Recogida
                    </label>
                    <select
                        id="recogida.idCiudad"
                        name="recogida.idCiudad"
                        className="form-select"
                        value={formData.recogida.idCiudad}
                        onChange={handleInputChange}
                        required
                      >
                        <option value={0}>Seleccione ciudad</option>
                        {ciudades.map((ciudad) => (
                          <option key={ciudad.idCiudad} value={ciudad.idCiudad}>
                            {ciudad.nombre} (${ciudad.precioCiudad})
                          </option>
                        ))}
                      </select>
                    {errors['recogida.idCiudad'] && <div className="text-danger">{errors['recogida.idCiudad']}</div>}
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-12">
                    <label htmlFor="recogida.direccionRecogida" className="form-label">
                      Dirección Recogida
                    </label>
                    <input
                      type="text"
                      id="recogida.direccionRecogida"
                      name="recogida.direccionRecogida"
                      className="form-control"
                      value={formData.recogida.direccionRecogida}
                      onChange={handleInputChange}
                      placeholder="Calle 123, Bogotá"
                      required
                    />
                    {errors['recogida.direccionRecogida'] && (
                      <div className="text-danger">{errors['recogida.direccionRecogida']}</div>
                    )}
                  </div>
                </div>

                {/* Entrega */}
                <h5 className="mb-3">Entrega</h5>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="entrega.fechaEntregaSeleccionada" className="form-label">
                      Fecha Entrega
                    </label>
                    <input
                      type="date"
                      id="entrega.fechaEntregaSeleccionada"
                      name="entrega.fechaEntregaSeleccionada"
                      className="form-control"
                      value={formData.entrega.fechaEntregaSeleccionada}
                      onChange={handleInputChange}
                      required
                    />
                    {errors['entrega.fechaEntregaSeleccionada'] && (
                      <div className="text-danger">{errors['entrega.fechaEntregaSeleccionada']}</div>
                    )}
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="entrega.idCiudad" className="form-label">
                      Ciudad Entrega
                    </label>
                    <select
                      id="entrega.idCiudad"
                      name="entrega.idCiudad"
                      className="form-select"
                      value={formData.entrega.idCiudad}
                      onChange={handleInputChange}
                      required
                    >
                      <option value={0}>Seleccione ciudad</option>
                      {ciudades.map((ciudad) => (
                        <option key={ciudad.idCiudad} value={ciudad.idCiudad}>
                          {ciudad.nombre} (${ciudad.precioCiudad})
                        </option>
                      ))}
                    </select>
                    {errors['entrega.idCiudad'] && <div className="text-danger">{errors['entrega.idCiudad']}</div>}
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-12">
                    <label htmlFor="entrega.direccionEntrega" className="form-label">
                      Dirección Entrega
                    </label>
                    <input
                      type="text"
                      id="entrega.direccionEntrega"
                      name="entrega.direccionEntrega"
                      className="form-control"
                      value={formData.entrega.direccionEntrega}
                      onChange={handleInputChange}
                      placeholder="Carrera 45 #56-78, Cúcuta"
                      required
                    />
                    {errors['entrega.direccionEntrega'] && (
                      <div className="text-danger">{errors['entrega.direccionEntrega']}</div>
                    )}
                  </div>
                </div>

                <div className="text-center">
                  <button type="submit" className="btn btn-primary px-5" disabled={loading}>
                    {loading ? 'Creando...' : 'Registrar Envío'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrearEnvios;