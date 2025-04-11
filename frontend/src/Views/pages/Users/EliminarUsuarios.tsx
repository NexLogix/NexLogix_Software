import NavBuscarUsuario from "../../componets/NavBars/NavBuscarUsuario";

const EliminarUsuarios = () => {
  return (
    <>
      <NavBuscarUsuario />

      <div className="container-fluid px-4 py-5">
        <div className="card border-0 shadow">
          <div className="card-header bg-danger text-white p-4">
            <div className="d-flex justify-content-between align-items-center">
              <h2 className="mb-0">Eliminar Usuarios</h2>
              <input
                type="text"
                className="form-control w-25"
                placeholder="Buscar usuario..."
              />
            </div>
          </div>

          <div className="card-body p-4">
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Documento</th>
                    <th scope="col">Email</th>
                    <th scope="col">Área/Puesto</th>
                    <th scope="col">Estado</th>
                    <th scope="col" className="text-end">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>
                      <div className="fw-semibold">Carlos Ramírez</div>
                      <div className="text-muted small">3001234567</div>
                    </td>
                    <td>11223344</td>
                    <td>carlos@email.com</td>
                    <td>
                      <span className="badge bg-info me-1">Logística</span>
                      <span className="badge bg-secondary">Conductor</span>
                    </td>
                    <td>
                      <span className="badge bg-success">Activo</span>
                    </td>
                    <td className="text-end">
                      <button className="btn btn-sm btn-outline-danger">
                        <i className="bi bi-trash3 me-1"></i> Eliminar
                      </button>
                    </td>
                  </tr>

                  <tr>
                    <td>2</td>
                    <td>
                      <div className="fw-semibold">Laura Gómez</div>
                      <div className="text-muted small">3109876543</div>
                    </td>
                    <td>99887766</td>
                    <td>laura@email.com</td>
                    <td>
                      <span className="badge bg-info me-1">Bodega</span>
                      <span className="badge bg-secondary">Auxiliar</span>
                    </td>
                    <td>
                      <span className="badge bg-success">Activo</span>
                    </td>
                    <td className="text-end">
                      <button className="btn btn-sm btn-outline-danger">
                        <i className="bi bi-trash3 me-1"></i> Eliminar
                      </button>
                    </td>
                  </tr>

                  <tr>
                    <td colSpan={7} className="text-center py-4">
                      <div className="text-muted">No se encontraron usuarios</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EliminarUsuarios;
