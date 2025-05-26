// Importa React, useEffect y useState para manejar efectos secundarios y estado local
import React, { useEffect, useState } from 'react';
// Importa los controladores personalizados para manejar la lógica de edición y obtención de datos
import { useAuditoriasController, useUpdateAuditoriaController } from '../../../Controllers/Auditorias/AuditoriasController';
import { IAuditoria } from '../../../models/Interfaces/IAuditorias';

// Define un componente funcional EditarAuditorias, tipado con React.FC para indicar que no recibe props
const EditarAuditorias: React.FC = () => {
  // Desestructura el estado y las funciones proporcionadas por useAuditoriasController
  const { state: auditoriasState, handleSearchChange, handleSearch, fetchAuditoriasData } = useAuditoriasController();
  // Desestructura el estado y las funciones proporcionadas por useUpdateAuditoriaController
  const { state: updateState, handleInputChange, handleUpdateSubmit } = useUpdateAuditoriaController();
  // Define un estado local para controlar el modo de edición (ID de la auditoría que se está editando)
  const [editMode, setEditMode] = useState<number | null>(null);

  // Define un efecto secundario para cargar los datos iniciales cuando el componente se monta
  useEffect(() => {
    fetchAuditoriasData(); // Llama a fetchAuditoriasData para cargar las auditorías desde la API
  }, [fetchAuditoriasData]); // Especifica fetchAuditoriasData como dependencia

  // Define la función handleEditClick para activar el modo de edición y prellenar el formulario
  const handleEditClick = (auditoria: IAuditoria) => {
    setEditMode(auditoria.id); // Activa el modo de edición para la auditoría seleccionada
    handleInputChange({
      target: { name: 'action', value: auditoria.action },
    } as React.ChangeEvent<HTMLInputElement>);
    handleInputChange({
      target: { name: 'resource_type', value: auditoria.resource_type },
    } as React.ChangeEvent<HTMLInputElement>);
    handleInputChange({
      target: { name: 'details', value: auditoria.details },
    } as React.ChangeEvent<HTMLTextAreaElement>);
    console.log('EditarAuditorias: Modo edición activado para ID:', auditoria.id);
  };

  // Define la función handleSave para guardar los cambios y refrescar la lista
  const handleSave = (id: number) => {
    handleUpdateSubmit(id).then(() => {
      if (updateState.successMessage) {
        fetchAuditoriasData(); // Refresca la lista de auditorías
        setEditMode(null); // Desactiva el modo de edición
        console.log('EditarAuditorias: Lista de auditorías refrescada después de guardar');
      }
    });
  };

  // Inicia el retorno del JSX que define la interfaz de usuario del componente
  return (
    <div className="container mt-4">
      {/* Barra de navegación estilizada con Bootstrap para el formulario de búsqueda */}
      <nav className="navbar navbar-light bg-light mb-4 p-3 shadow-sm">
        <div className="container-fluid">
          {/* Formulario de búsqueda, previene el envío por defecto y ejecuta handleSearch */}
          <form className="d-flex" onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Ingrese ID de la Auditoría"
              aria-label="Buscar"
              value={auditoriasState.searchId} // Valor controlado por el estado
              onChange={handleSearchChange} // Maneja cambios en el input
            />
            {/* Botón de búsqueda con estilo Bootstrap */}
            <button className="btn btn-outline-primary me-2" type="submit">
              Buscar
            </button>
          </form>
        </div>
      </nav>

      {/* Muestra una alerta roja si hay un error en auditoriasState.error */}
      {auditoriasState.error && <div className="alert alert-danger">{auditoriasState.error}</div>}
      {/* Muestra una alerta azul si auditoriasState.loading es verdadero */}
      {auditoriasState.loading && <div className="alert alert-info">Cargando...</div>}
      {/* Muestra una alerta verde si hay un mensaje de éxito en updateState.successMessage */}
      {updateState.successMessage && <div className="alert alert-success">{updateState.successMessage}</div>}
      {/* Muestra una alerta roja si hay un mensaje de error en updateState.errorMessage */}
      {updateState.errorMessage && <div className="alert alert-danger">{updateState.errorMessage}</div>}
      {/* Muestra una alerta azul si updateState.loading es verdadero */}
      {updateState.loading && <div className="alert alert-info">Actualizando...</div>}

      {/* Título de la sección con márgenes Bootstrap */}
      <h2 className="mb-3 mt-5">Editar Auditorías</h2>
      {/* Tabla estilizada con Bootstrap para mostrar las auditorías */}
      <table className="table table-bordered">
        {/* Encabezado de la tabla */}
        <thead>
          <tr>
            <th>ID</th> {/* Columna para el ID de la auditoría */}
            <th>Usuario ID</th> {/* Columna para el ID del usuario */}
            <th>Acción</th> {/* Columna para la acción realizada */}
            <th>Tipo de Recurso</th> {/* Columna para el tipo de recurso */}
            <th>Detalles</th> {/* Columna para los detalles de la acción */}
            <th>Fecha de Creación</th> {/* Columna para la fecha de creación */}
            <th>Fecha de Actualización</th> {/* Columna para la fecha de actualización */}
            <th>Acciones</th> {/* Columna para los botones de acción */}
          </tr>
        </thead>

        {/* Cuerpo de la tabla */}
        <tbody>
          {/* Itera sobre auditoriasState.auditorias para renderizar una fila por cada auditoría */}
          {auditoriasState.auditorias.map((auditoria) => (
            <tr key={auditoria.id}> {/* Fila con clave única basada en id */}
              <td>{auditoria.id}</td> {/* Celda con el ID de la auditoría */}
              <td>{auditoria.user_id}</td> {/* Celda con el ID del usuario */}
              <td>
                {editMode === auditoria.id ? ( // Si está en modo edición
                  <>
                    <input
                      type="text"
                      className="form-control"
                      name="action"
                      value={updateState.formData.action || ''} // Valor controlado
                      onChange={handleInputChange} // Maneja cambios
                    />
                    {updateState.errors.action && <div className="text-danger">{updateState.errors.action}</div>}
                  </>
                ) : (
                  auditoria.action // Muestra la acción si no está en modo edición
                )}
              </td>
              <td>
                {editMode === auditoria.id ? ( // Si está en modo edición
                  <>
                    <input
                      type="text"
                      className="form-control"
                      name="resource_type"
                      value={updateState.formData.resource_type || ''} // Valor controlado
                      onChange={handleInputChange} // Maneja cambios
                    />
                    {updateState.errors.resource_type && <div className="text-danger">{updateState.errors.resource_type}</div>}
                  </>
                ) : (
                  auditoria.resource_type // Muestra el tipo de recurso si no está en modo edición
                )}
              </td>
              <td>
                {editMode === auditoria.id ? ( // Si está en modo edición
                  <>
                    <textarea
                      className="form-control"
                      name="details"
                      value={updateState.formData.details || ''} // Valor controlado
                      onChange={handleInputChange} // Maneja cambios
                    />
                    {updateState.errors.details && <div className="text-danger">{updateState.errors.details}</div>}
                  </>
                ) : (
                  auditoria.details // Muestra los detalles
                )}
              </td>
              <td>{auditoria.created_at}</td> {/* Celda con la fecha de creación */}
              <td>{auditoria.updated_at}</td> {/* Celda con la fecha de actualización */}
              <td>
                {editMode === auditoria.id ? ( // Si está en modo edición
                  <>
                    <button
                      className="btn btn-success me-2"
                      onClick={() => handleSave(auditoria.id)}
                      disabled={updateState.loading}
                    >
                      Guardar
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => setEditMode(null)}
                      disabled={updateState.loading}
                    >
                      Cancelar
                    </button>
                  </>
                ) : (
                  <button
                    className="btn btn-primary"
                    onClick={() => handleEditClick(auditoria)}
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

export default EditarAuditorias;