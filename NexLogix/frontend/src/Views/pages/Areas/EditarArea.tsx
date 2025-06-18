import React, { useEffect, useState } from 'react';
import { useAreasController, useCreateAreaController } from '../../../Controllers/Areas/AreasController';
import './../../Styles/Areas/AreasStyle.css';


const EditarAreas: React.FC = () => {
  const { state: areasState, handleSearchChange, handleSearch, fetchAreasData } = useAreasController();
  const { state: createState, handleInputChange, handleUpdateSubmit } = useCreateAreaController();
  const [editMode, setEditMode] = useState<number | null>(null);

  useEffect(() => {
    fetchAreasData();
  }, [fetchAreasData]);

  const handleEditClick = (area: { idArea: number; nombreArea: string; descripcionArea: string }) => {
    setEditMode(area.idArea);
    handleInputChange({
      target: { name: 'nombreArea', value: area.nombreArea },
    } as React.ChangeEvent<HTMLInputElement>);
    handleInputChange({
      target: { name: 'descripcionArea', value: area.descripcionArea },
    } as React.ChangeEvent<HTMLTextAreaElement>);
    console.log('EditarAreas: Modo edición activado para ID:', area.idArea);
  };

  const handleSave = (id: number, isPartial: boolean) => {
    handleUpdateSubmit(id, isPartial);
    setEditMode(null);
  };

  return (
    <div className='areas_container'>
        <div className="container mt-4">
          <nav className=" nav_areas navbar  shadow-sm">
            <div className="container-fluid">
              <form className="d-flex" onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Ingrese ID del Área"
                  aria-label="Buscar"
                  value={areasState.searchId}
                  onChange={handleSearchChange}
                />
                <button className="btn btn-outline-primary me-2" type="submit">
                  Buscar
                </button>
              </form>
            </div>
          </nav>

          {areasState.error && <div className="alert alert-danger">{areasState.error}</div>}
          {areasState.loading && <div className="alert alert-info">Cargando...</div>}
          {createState.successMessage && <div className="alert alert-success">{createState.successMessage}</div>}
          {createState.errorMessage && <div className="alert alert-danger">{createState.errorMessage}</div>}
          {createState.loading && <div className="alert alert-info">Actualizando...</div>}

          <h2 className="text-white mt-5 mb-5">Editar Información de Área</h2>
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
              {areasState.areas.map((area) => (
                <tr key={area.idArea}>
                  <td>{area.idArea}</td>
                  <td>
                    {editMode === area.idArea ? (
                      <>
                        <input
                          type="text"
                          className="form-control"
                          name="nombreArea"
                          value={createState.formData.nombreArea}
                          onChange={handleInputChange}
                        />
                        {createState.errors.nombreArea && <div className="text-danger">{createState.errors.nombreArea}</div>}
                      </>
                    ) : (
                      area.nombreArea
                    )}
                  </td>
                  <td>
                    {editMode === area.idArea ? (
                      <>
                        <textarea
                          className="form-control"
                          name="descripcionArea"
                          rows={3}
                          value={createState.formData.descripcionArea}
                          onChange={handleInputChange}
                        />
                        {createState.errors.descripcionArea && <div className="text-danger">{createState.errors.descripcionArea}</div>}
                      </>
                    ) : (
                      area.descripcionArea
                    )}
                  </td>
                  <td>
                    {editMode === area.idArea ? (
                      <>
                        
                        <button
                          className="btn btn-success me-2"
                          onClick={() => handleSave(area.idArea, true)}
                          disabled={createState.loading}
                        >
                          Guardar
                        </button>
                        <button
                          className="btn btn-secondary"
                          onClick={() => setEditMode(null)}
                          disabled={createState.loading}
                        >
                          Cancelar
                        </button>
                      </>
                    ) : (
                      <button
                        className="btn btn-primary"
                        onClick={() => handleEditClick(area)}
                      >
                        Editar
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    </div>
    
  );
};

export default EditarAreas; 

//<button
                          //className="btn btn-success me-2"
                          //onClick={() => handleSave(area.idArea, false)}
                         // disabled={createState.loading}
                        //>
                        //  Guardar (Completo)
                        // </button>