import React, { useEffect } from 'react';
import { usePuestosController } from '../../../Controllers/Puestos/PuestosController';

const EliminarPuesto: React.FC = () => {
  const { state, handleSearchChange, handleSearch, fetchPuestosData, deletePuestoById } = usePuestosController();

  useEffect(() => {
    fetchPuestosData();
  }, [fetchPuestosData]);

  const handleDelete = (id: number) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este puesto?')) {
      deletePuestoById(id);
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
              placeholder="Ingrese el ID del Puesto"
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

      <h2 className="mb-3 mt-5">Eliminar Puesto</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre del Puesto</th>
            <th>Descripción del Puesto</th>
            <th>Fecha de Asignación</th>
            <th>Área</th>
            <th>Acciones</th>
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
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(puesto.idPuestos)}
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

export default EliminarPuesto;