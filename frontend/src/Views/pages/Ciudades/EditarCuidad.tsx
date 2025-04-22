import React, { useEffect, useState } from 'react';
import { useCiudadesController, useCreateCiudadController } from '../../../Controllers/Ciudades/CiudadesController';

const EditarCiudad: React.FC = () => {
  const { state: ciudadesState, handleSearchChange, handleSearch, fetchCiudadesData } = useCiudadesController();
  const { state: createState, handleInputChange, handleUpdateSubmit } = useCreateCiudadController();
  const [editMode, setEditMode] = useState<number | null>(null);

  useEffect(() => {
    fetchCiudadesData();
  }, [fetchCiudadesData]);

  const handleEditClick = (ciudad: { idCiudad: number; nombreCiudad: string; costoPor_Ciudad: number }) => {
    setEditMode(ciudad.idCiudad);
    handleInputChange({
      target: { name: 'nombreCiudad', value: ciudad.nombreCiudad },
    } as React.ChangeEvent<HTMLInputElement>);
    handleInputChange({
      target: { name: 'costoPor_Ciudad', value: ciudad.costoPor_Ciudad.toString() },
    } as React.ChangeEvent<HTMLInputElement>);
    console.log('EditarCiudad: Modo edición activado para ID:', ciudad.idCiudad);
  };

  const handleSave = (id: number) => {
    handleUpdateSubmit(id);
    setEditMode(null);
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
              value={ciudadesState.searchId}
              onChange={handleSearchChange}
            />
            <button className="btn btn-outline-primary me-2" type="submit">
              Buscar
            </button>
          </form>
        </div>
      </nav>

      {ciudadesState.error && <div className="alert alert-danger">{ciudadesState.error}</div>}
      {ciudadesState.loading && <div className="alert alert-info">Cargando...</div>}
      {createState.successMessage && <div className="alert alert-success">{createState.successMessage}</div>}
      {createState.errorMessage && <div className="alert alert-danger">{createState.errorMessage}</div>}
      {createState.loading && <div className="alert alert-info">Actualizando...</div>}

      <h2 className="mb-3 mt-5">Editar Información de la Ciudad</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre de la Ciudad</th>
            <th>Costo por Ciudad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ciudadesState.ciudades.map((ciudad) => (
            <tr key={ciudad.idCiudad}>
              <td>{ciudad.idCiudad}</td>
              <td>
                {editMode === ciudad.idCiudad ? (
                  <>
                    <input
                      type="text"
                      className="form-control"
                      name="nombreCiudad"
                      value={createState.formData.nombreCiudad}
                      onChange={handleInputChange}
                    />
                    {createState.errors.nombreCiudad && <div className="text-danger">{createState.errors.nombreCiudad}</div>}
                  </>
                ) : (
                  ciudad.nombreCiudad
                )}
              </td>
              <td>
                {editMode === ciudad.idCiudad ? (
                  <>
                    <input
                      type="number"
                      className="form-control"
                      name="costoPor_Ciudad"
                      value={createState.formData.costoPor_Ciudad}
                      onChange={handleInputChange}
                    />
                    {createState.errors.costoPor_Ciudad && <div className="text-danger">{createState.errors.costoPor_Ciudad}</div>}
                  </>
                ) : (
                  ciudad.costoPor_Ciudad
                )}
              </td>
              <td>
                {editMode === ciudad.idCiudad ? (
                  <>
                    <button
                      className="btn btn-success me-2"
                      onClick={() => handleSave(ciudad.idCiudad)}
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
                    onClick={() => handleEditClick(ciudad)}
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

export default EditarCiudad;