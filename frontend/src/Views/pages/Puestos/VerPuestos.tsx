import React, { useEffect } from 'react';
import { usePuestosController } from '../../../Controllers/Puestos/PuestosController';

const VerPuestos: React.FC = () => {
  const { state, fetchPuestosData, handleSearchChange, handleSearch, resetSearch } = usePuestosController();

  useEffect(() => {
    fetchPuestosData();
  }, [fetchPuestosData]);

  return (
    <div className="container mt-4">
      <nav className="navbar navbar-light bg-light mb-4 p-3 shadow-sm">
        <div className="container-fluid">
          <form className="d-flex" onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Ingrese ID del Puesto"
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

      <h2 className="mb-3">Listado de Puestos</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre del Puesto</th>
            <th>Descripción</th>
            <th>Fecha de Asignación</th>
            <th>Área Asignada</th>
          </tr>
        </thead>
        <tbody>
          {state.puestos.map((puesto) => (
            <tr key={puesto.idPuestos}>
              <td>{puesto.idPuestos}</td>
              <td>{puesto.nombrePuesto}</td>
              <td>{puesto.descripcionPuesto}</td>
              <td>{puesto.fechaAsignacionPuesto}</td>
              <td>{puesto.areas.nombreArea}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VerPuestos;