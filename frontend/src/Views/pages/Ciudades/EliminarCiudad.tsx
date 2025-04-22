import React, { useEffect } from 'react';
import { useCiudadesController } from '../../../Controllers/Ciudades/CiudadesController';

const EliminarCiudad: React.FC = () => {
  const { state, handleSearchChange, handleSearch, fetchCiudadesData, deleteCiudadById } = useCiudadesController();

  useEffect(() => {
    fetchCiudadesData();
  }, [fetchCiudadesData]);

  const handleDelete = (id: number) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta ciudad?')) {
      deleteCiudadById(id);
    }
  };

  return (
    <div className="container mt-4">
      <nav className="navbar navbar-light bg-light mb-4 p-3 shadow-sm">
        <div className="container-fluid">
          <form className="d-flex" onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Ingrese el ID de la Ciudad"
              aria-label="Buscar"
              value={state.searchId}
              onChange={handleSearchChange}
            />
            <button className="btn btn-outline-danger me-2" type="submit">
              Buscar
            </button>
          </form>
        </div>
      </nav>

      {state.error && <div className="alert alert-danger">{state.error}</div>}
      {state.loading && <div className="alert alert-info">Cargando...</div>}

      <h2 className="mb-3 mt-5 text-danger">Eliminar Ciudad</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre de la Ciudad</th>
            <th>Costo por Ciudad</th>
            <th><strong>Eliminar</strong></th>
          </tr>
        </thead>
        <tbody>
          {state.ciudades.map((ciudad) => (
            <tr key={ciudad.idCiudad}>
              <td>{ciudad.idCiudad}</td>
              <td>{ciudad.nombreCiudad}</td>
              <td>{ciudad.costoPor_Ciudad}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(ciudad.idCiudad)}
                  disabled={state.loading}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EliminarCiudad;