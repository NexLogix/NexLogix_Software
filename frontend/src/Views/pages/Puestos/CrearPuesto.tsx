import React, { useEffect } from 'react';
import { useCreatePuestoController, usePuestosController } from '../../../Controllers/Puestos/PuestosController';

const CrearPuesto: React.FC = () => {
  const { state, handleInputChange, handleCreateSubmit } = useCreatePuestoController();
  const { state: puestosState, fetchAreasData } = usePuestosController();

  useEffect(() => {
    fetchAreasData();
  }, [fetchAreasData]);

  return (
    <div className="container mt-4">
      <nav className="navbar navbar-light bg-light mb-4 p-3 shadow-sm">
        <div className="container-fluid">
          <h5>Crear Nuevo Puesto</h5>
        </div>
      </nav>

      <div className="card shadow-sm">
        <div className="card-body">
          <h4 className="card-title mb-4">Información del Puesto</h4>

          {state.successMessage && <div className="alert alert-success">{state.successMessage}</div>}
          {state.errorMessage && <div className="alert alert-danger">{state.errorMessage}</div>}
          {state.loading && <div className="alert alert-info">Cargando...</div>}

          <form onSubmit={handleCreateSubmit}>
            <div className="mb-3">
              <label htmlFor="nombrePuesto" className="form-label">Nombre del Puesto</label>
              <input
                type="text"
                id="nombrePuesto"
                name="nombrePuesto"
                className="form-control"
                value={state.formData.nombrePuesto}
                onChange={handleInputChange}
                required
              />
              {state.errors.nombrePuesto && <div className="text-danger">{state.errors.nombrePuesto}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="descripcionPuesto" className="form-label">Descripción</label>
              <textarea
                id="descripcionPuesto"
                name="descripcionPuesto"
                className="form-control"
                value={state.formData.descripcionPuesto}
                onChange={handleInputChange}
              />
              {state.errors.descripcionPuesto && <div className="text-danger">{state.errors.descripcionPuesto}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="idArea" className="form-label">Asignar Área al Puesto</label>
              <select
                id="idArea"
                name="idArea"
                className="form-control"
                value={state.formData.idArea}
                onChange={handleInputChange}
                required
              >
                <option value="0" disabled>Seleccione un área</option>
                {puestosState.areas.map((area) => (
                  <option key={area.idArea} value={area.idArea}>
                    {area.nombreArea}
                  </option>
                ))}
              </select>
              {state.errors.idArea && <div className="text-danger">{state.errors.idArea}</div>}
            </div>
            <button type="submit" className="btn btn-primary" disabled={state.loading}>
              Crear Puesto
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CrearPuesto;