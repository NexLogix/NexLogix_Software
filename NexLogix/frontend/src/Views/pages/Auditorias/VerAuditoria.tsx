import React, { useEffect } from 'react';
import { useAuditoriasController } from '../../../Controllers/Auditorias/AuditoriasController';
import { IAuditoria } from '../../../models/Interfaces/IAuditorias';

const VerAuditorias: React.FC = () => {
  const { state, fetchAuditoriasData, handleSearchChange, handleSearch, resetSearch } = useAuditoriasController();

  useEffect(() => {
    fetchAuditoriasData();
  }, [fetchAuditoriasData]);

  const renderDetails = (details: IAuditoria['details']) => {
    if (typeof details === 'string') return details;
    if (Array.isArray(details)) return details.join(', ');
    return Object.entries(details)
      .map(([key, value]) => `${key}: ${value}`)
      .join(', ');
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
              value={state.searchId}
              onChange={handleSearchChange}
            />
            <button className="btn btn-outline-primary me-2" onClick={handleSearch}>
              Buscar
            </button>
            <button className="btn btn-outline-secondary" onClick={resetSearch}>
              Mostrar Todos
            </button>
          </div>
        </div>
      </nav>

      {state.error && <div className="alert alert-danger">{state.error}</div>}
      {state.loading && <div className="alert alert-info">Cargando...</div>}

      <h2 className="mb-3">Historial de Auditorías</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Usuario ID</th>
            <th>Acción</th>
            <th>Tipo de Recurso</th>
            <th>Detalles</th>
            <th>Fecha de Creación</th>
            <th>Fecha de Actualización</th>
          </tr>
        </thead>
        <tbody>
          {state.auditorias.map((auditoria) => (
            <tr key={auditoria.id}>
              <td>{auditoria.id}</td>
              <td>{auditoria.user_id}</td>
              <td>{auditoria.action}</td>
              <td>{auditoria.resource_type}</td>
              <td>{renderDetails(auditoria.details)}</td>
              <td>{auditoria.created_at}</td>
              <td>{auditoria.updated_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VerAuditorias;