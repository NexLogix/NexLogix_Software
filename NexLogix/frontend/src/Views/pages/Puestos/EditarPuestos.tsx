import React, { useEffect, useState } from 'react';
import { usePuestosController, useCreatePuestoController } from '../../../Controllers/Puestos/PuestosController';

const EditarPuestos: React.FC = () => {
  const { state: puestosState, handleSearchChange, handleSearch, fetchPuestosData, fetchAreasData } = usePuestosController();
  const { state: createState, handleInputChange, handleUpdateSubmit } = useCreatePuestoController();
  const [editMode, setEditMode] = useState<number | null>(null);

  useEffect(() => {
    fetchPuestosData();
    fetchAreasData();
  }, [fetchPuestosData, fetchAreasData]);

  const handleEditClick = (puesto: { idPuestos: number; nombrePuesto: string; descripcionPuesto: string; idArea: number }) => {
    setEditMode(puesto.idPuestos);
    handleInputChange({
      target: { name: 'nombrePuesto', value: puesto.nombrePuesto },
    } as React.ChangeEvent<HTMLInputElement>);
    handleInputChange({
      target: { name: 'descripcionPuesto', value: puesto.descripcionPuesto },
    } as React.ChangeEvent<HTMLTextAreaElement>);
    handleInputChange({
      target: { name: 'idArea', value: puesto.idArea.toString() },
    } as React.ChangeEvent<HTMLSelectElement>);
    console.log('EditarPuestos: Modo edición activado para ID:', puesto.idPuestos);
  };

  const handleSave = (id: number, isPartial: boolean) => {
    handleUpdateSubmit(id, isPartial).then(() => {
      if (createState.successMessage) {
        fetchPuestosData();
        setEditMode(null);
        console.log('EditarPuestos: Lista de puestos refrescada después de guardar');
      }
    });
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
              value={puestosState.searchId}
              onChange={handleSearchChange}
            />
            <button className="btn btn-outline-primary me-2" type="submit">
              Buscar
            </button>
          </form>
        </div>
      </nav>

      {puestosState.error && <div className="alert alert-danger">{puestosState.error}</div>}
      {puestosState.loading && <div className="alert alert-info">Cargando...</div>}
      {createState.successMessage && <div className="alert alert-success">{createState.successMessage}</div>}
      {createState.errorMessage && <div className="alert alert-danger">{createState.errorMessage}</div>}
      {createState.loading && <div className="alert alert-info">Actualizando...</div>}

      <h2 className="mb-3 mt-5">Editar Información del Puesto</h2>
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
          {puestosState.puestos.map((puesto) => (
            <tr key={puesto.idPuestos}>
              <td>{puesto.idPuestos}</td>
              <td>
                {editMode === puesto.idPuestos ? (
                  <>
                    <input
                      type="text"
                      className="form-control"
                      name="nombrePuesto"
                      value={createState.formData.nombrePuesto}
                      onChange={handleInputChange}
                    />
                    {createState.errors.nombrePuesto && <div className="text-danger">{createState.errors.nombrePuesto}</div>}
                  </>
                ) : (
                  puesto.nombrePuesto
                )}
              </td>
              <td>
                {editMode === puesto.idPuestos ? (
                  <>
                    <textarea
                      className="form-control"
                      name="descripcionPuesto"
                      value={createState.formData.descripcionPuesto}
                      onChange={handleInputChange}
                    />
                    {createState.errors.descripcionPuesto && <div className="text-danger">{createState.errors.descripcionPuesto}</div>}
                  </>
                ) : (
                  puesto.descripcionPuesto
                )}
              </td>
              <td>{puesto.fechaAsignacionPuesto}</td>
              <td>
                {editMode === puesto.idPuestos ? (
                  <>
                    <select
                      name="idArea"
                      className="form-control"
                      value={createState.formData.idArea}
                      onChange={handleInputChange}
                    >
                      <option value="0" disabled>Seleccione un área</option>
                      {puestosState.areas.map((area) => (
                        <option key={area.idArea} value={area.idArea}>
                          {area.nombreArea}
                        </option>
                      ))}
                    </select>
                    {createState.errors.idArea && <div className="text-danger">{createState.errors.idArea}</div>}
                  </>
                ) : (
                  puesto.areas.nombreArea
                )}
              </td>
              <td>
                {editMode === puesto.idPuestos ? (
                  <>
                    <button
                      className="btn btn-success me-2"
                      onClick={() => handleSave(puesto.idPuestos, false)}
                      disabled={createState.loading}
                    >
                      Guardar (Completo)
                    </button>
                    <button
                      className="btn btn-warning me-2"
                      onClick={() => handleSave(puesto.idPuestos, true)}
                      disabled={createState.loading}
                    >
                      Guardar (Parcial)
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
                    onClick={() => handleEditClick(puesto)}
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
  );
};

export default EditarPuestos;