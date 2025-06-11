import React, { useEffect, useState } from 'react';
import { useAuditoriasController, useEditAuditoriaController } from '../../../Controllers/Auditorias/AuditoriasController';
import { IAuditoria } from '../../../models/Interfaces/IAuditorias';

const EditarAuditorias: React.FC = () => {
  const { state: auditoriasState, fetchAuditoriasData, handleSearchChange, handleSearch } = useAuditoriasController();
  const { state: editState, handleInputChange, handleUpdateSubmit } = useEditAuditoriaController();
  const [editMode, setEditMode] = useState<number | null>(null);

  useEffect(() => {
    fetchAuditoriasData();
  }, [fetchAuditoriasData]);

  const handleEditClick = (auditoria: IAuditoria) => {
    setEditMode(auditoria.id);
    handleInputChange({ target: { name: 'action', value: auditoria.action } } as React.ChangeEvent<HTMLInputElement>);
    handleInputChange({ target: { name: 'resource_type', value: auditoria.resource_type } } as React.ChangeEvent<HTMLInputElement>);
  };

  const handleSave = (id: number) => {
    handleUpdateSubmit(id).then(() => {
      if (editState.successMessage) {
        fetchAuditoriasData();
        setEditMode(null);
      }
    });
  };

  return (
    <div className="container mt-4">
      <nav className="navbar navbar-light bg-light mb-4 p-3 shadow-sm">
        <div className="container-fluid">
          <div className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Ingrese ID de la Auditoría"
              value={auditoriasState.searchId}
              onChange={handleSearchChange}
            />
            <button className="btn btn-outline-primary" onClick={handleSearch}>
              Buscar
            </button>
          </div>
        </div>
      </nav>

      {auditoriasState.error && <div className="alert alert-danger">{auditoriasState.error}</div>}
      {auditoriasState.loading && <div className="alert alert-info">Cargando...</div>}
      {editState.successMessage && <div className="alert alert-success">{editState.successMessage}</div>}
      {editState.errorMessage && <div className="alert alert-danger">{editState.errorMessage}</div>}
      {editState.loading && <div className="alert alert-info">Actualizando...</div>}

      <h2 className="mb-3">Editar Auditorías</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Acción</th>
            <th>Tipo de Recurso</th>
            <th>Detalles</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {auditoriasState.auditorias.map((auditoria) => (
            <tr key={auditoria.id}>
              <td>{auditoria.id}</td>
              <td>
                {editMode === auditoria.id ? (
                  <input
                    type="text"
                    name="action"
                    className="form-control"
                    value={editState.formData.action || auditoria.action}
                    onChange={handleInputChange}
                  />
                ) : (
                  auditoria.action
                )}
              </td>
              <td>
                {editMode === auditoria.id ? (
                  <input
                    type="text"
                    name="resource_type"
                    className="form-control"
                    value={editState.formData.resource_type || auditoria.resource_type}
                    onChange={handleInputChange}
                  />
                ) : (
                  auditoria.resource_type
                )}
              </td>
              <td>{typeof auditoria.details === 'string' ? auditoria.details : JSON.stringify(auditoria.details)}</td>
              <td>
                {editMode === auditoria.id ? (
                  <>
                    <button className="btn btn-success me-2" onClick={() => handleSave(auditoria.id)}>Guardar</button>
                    <button className="btn btn-secondary" onClick={() => setEditMode(null)}>Cancelar</button>
                  </>
                ) : (
                  <button className="btn btn-primary" onClick={() => handleEditClick(auditoria)}>Editar</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EditarAuditorias;