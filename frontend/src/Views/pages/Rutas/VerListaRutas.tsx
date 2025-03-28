import NavBuscarEnvio from "../../shared/NavBars/NavBuscarEnvio";

const VerListaRutas = () => {
  return (
    <div className="container-fluid mt-4">
      <NavBuscarEnvio />
      {/* Tabla de rutas GENERAL */}
      <div className="row">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <h3 className="mb-0">Ver Lista de Rutas</h3>
            </div>

            {/* Sección de TABLA DE LISTA DE RUTAS */}
            <div className="card-body">
              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>ID Ruta</th>
                    <th>Nombre de la Ruta</th>
                    <th>Distancia</th>
                    <th>Duración Estimada</th>
                    <th>Fecha de Creación</th>
                    <th>Última Modificación</th>
                    <th>Responsable</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>001</td>
                    <td>Ruta Norte</td>
                    <td>120 km</td>
                    <td>2h 30m</td>
                    <td>2024-03-01</td>
                    <td>2024-03-10</td>
                    <td>Juan Pérez</td>
                  </tr>
                  <tr>
                    <td>002</td>
                    <td>Ruta Sur</td>
                    <td>85 km</td>
                    <td>1h 45m</td>
                    <td>2024-02-15</td>
                    <td>2024-03-08</td>
                    <td>María López</td>
                  </tr>
                  <tr>
                    <td>003</td>
                    <td>Ruta Oeste</td>
                    <td>150 km</td>
                    <td>3h 15m</td>
                    <td>2024-01-20</td>
                    <td>2024-02-25</td>
                    <td>Carlos Gómez</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerListaRutas;
