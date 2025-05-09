import React, { useEffect } from 'react';
import { useAreasController } from '../../../Controllers/Areas/AreasController';

const EliminarArea: React.FC = () => {
  const { state, handleSearchChange, handleSearch, fetchAreasData, deleteAreaById } = useAreasController();

  useEffect(() => {
    fetchAreasData();
  }, [fetchAreasData]);

  const handleDelete = (id: number) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta área?')) {
      deleteAreaById(id);
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
              placeholder="Ingrese ID del Área"
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

      <h2 className="mb-3 mt-5 text-danger">Eliminar Áreas</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre del Área</th>
            <th>Descripción del Área</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {state.areas.map((area) => (
            <tr key={area.idArea}>
              <td>{area.idArea}</td>
              <td>{area.nombreArea}</td>
              <td>{area.descripcionArea}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(area.idArea)}
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

export default EliminarArea;