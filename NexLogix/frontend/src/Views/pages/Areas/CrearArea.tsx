import React from 'react';
import { useCreateAreaController } from '../../../Controllers/Areas/AreasController';
import './../../Styles/Areas/AreasStyle.css';

const CrearArea: React.FC = () => {
  const { state, handleInputChange, handleCreateSubmit } = useCreateAreaController();

  return (
    <div className='areas_container'>
          <div className="container-fluid mt-4">
            <nav className="navbar navbar-light bg-light mb-4 p-3 shadow-sm">
              <div className="container-fluid">
                <h4 className="mb-0">Crear Nueva Área</h4>
              </div>
            </nav>

            {state.successMessage && <div className="alert alert-success">{state.successMessage}</div>}
            {state.errorMessage && <div className="alert alert-danger">{state.errorMessage}</div>}
            {state.loading && <div className="alert alert-info">Cargando...</div>}

            <div className="card shadow-sm">
              <div className="card-body">
                <form onSubmit={handleCreateSubmit}>
                  <div className="mb-3">
                    <label htmlFor="nombreArea" className="form-label">
                      Nombre del Área
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="nombreArea"
                      name="nombreArea"
                      placeholder="Ej: Bodega"
                      value={state.formData.nombreArea}
                      onChange={handleInputChange}
                    />
                    {state.errors.nombreArea && <div className="text-danger">{state.errors.nombreArea}</div>}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="descripcionArea" className="form-label">
                      Descripción del Área
                    </label>
                    <textarea
                      className="form-control"
                      id="descripcionArea"
                      name="descripcionArea"
                      rows={3}
                      placeholder="Ej: Área encargada de almacenar productos."
                      value={state.formData.descripcionArea}
                      onChange={handleInputChange}
                    />
                    {state.errors.descripcionArea && <div className="text-danger">{state.errors.descripcionArea}</div>}
                  </div>

                  <button type="submit" className="btn btn-primary" disabled={state.loading}>
                    Crear Área
                  </button>
                </form>
              </div>
            </div>
          </div>
    </div>
  );
};

export default CrearArea;