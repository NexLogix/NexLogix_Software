import React, { useEffect } from 'react';
import { useAreasController } from '../../../Controllers/Areas/AreasController';

const VerAreas: React.FC = () => {
  const { state, fetchAreasData, handleSearchChange, handleSearch, resetSearch } = useAreasController();

  useEffect(() => {
    fetchAreasData();
  }, [fetchAreasData]);

  return (
    <div className="container mt-4">
      <nav className="navbar navbar-light bg-light mb-4 p-3 shadow-sm">
        <div className="container-fluid">
          <form className="d-flex" onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Ingrese ID del Área"
              aria-label="Buscar"
              value={state.searchId}
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

      {state.error && <div className="alert alert-danger">{state.error}</div>}
      {state.loading && <div className="alert alert-info">Cargando...</div>}

      <h2 className="mb-3">Listado de Áreas</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre del Área</th>
            <th>Descripción</th>
          </tr>
        </thead>
        <tbody>
          {state.areas.map((area) => (
            <tr key={area.idArea}>
              <td>{area.idArea}</td>
              <td>{area.nombreArea}</td>
              <td>{area.descripcionArea}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VerAreas;