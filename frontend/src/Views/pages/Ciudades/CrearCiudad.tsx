import React from 'react';
import { useCreateCiudadController } from '../../../Controllers/Ciudades/CiudadesController';

const CrearCiudad: React.FC = () => {
  const { state, handleInputChange, handleCreateSubmit } = useCreateCiudadController();

  return (
    <div className="container-fluid mt-4">
      <div className="container">
        <h2 className="mb-3">Formulario de Ciudad</h2>

        {state.successMessage && <div className="alert alert-success">{state.successMessage}</div>}
        {state.errorMessage && <div className="alert alert-danger">{state.errorMessage}</div>}
        {state.loading && <div className="alert alert-info">Cargando...</div>}

        <form onSubmit={handleCreateSubmit}>
          <div className="mb-3">
            <label htmlFor="nombreCiudad" className="form-label">Nombre de la Ciudad</label>
            <input
              type="text"
              className="form-control"
              id="nombreCiudad"
              name="nombreCiudad"
              placeholder="Ej: Bogotá D.C."
              value={state.formData.nombreCiudad}
              onChange={handleInputChange}
            />
            {state.errors.nombreCiudad && <div className="text-danger">{state.errors.nombreCiudad}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="costoPor_Ciudad" className="form-label">Costo por Ciudad</label>
            <input
              type="number"
              className="form-control"
              id="costoPor_Ciudad"
              name="costoPor_Ciudad"
              placeholder="Ej: 15000"
              value={state.formData.costoPor_Ciudad}
              onChange={handleInputChange}
            />
            {state.errors.costoPor_Ciudad && <div className="text-danger">{state.errors.costoPor_Ciudad}</div>}
          </div>
          <button type="submit" className="btn btn-primary" disabled={state.loading}>
            Crear Ciudad
          </button>
        </form>
      </div>
    </div>
  );
};

export default CrearCiudad;