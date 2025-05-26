// Importa React y useEffect para manejar efectos secundarios
import React, { useEffect } from 'react';
// Importa el controlador personalizado para manejar la lógica de eliminación y obtención de datos
import { useAuditoriasController } from '../../../Controllers/Auditorias/AuditoriasController';

// Define un componente funcional EliminarAuditorias, tipado con React.FC para indicar que no recibe props
const EliminarAuditorias: React.FC = () => {
  // Desestructura el estado y las funciones proporcionadas por useAuditoriasController
  const { state, handleSearchChange, handleSearch, fetchAuditoriasData, deleteAuditoriaById } = useAuditoriasController();

  // Define un efecto secundario para cargar los datos iniciales cuando el componente se monta
  useEffect(() => {
    fetchAuditoriasData(); // Llama a fetchAuditoriasData para cargar las auditorías desde la API
  }, [fetchAuditoriasData]); // Especifica fetchAuditoriasData como dependencia

  // Define la función handleDelete para manejar la eliminación de una auditoría
  const handleDelete = (id: number) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta auditoría?')) {
      deleteAuditoriaById(id); // Llama a la función para eliminar la auditoría
    }
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
              value={state.searchId} // Valor controlado por el estado
              onChange={handleSearchChange} // Maneja cambios en el input
            />
            {/* Botón de búsqueda con estilo Bootstrap */}
            <button className="btn btn-outline-danger me-2" type="submit">
              Buscar
            </button>
          </form>
        </div>
      </nav>

      {/* Muestra una alerta roja si hay un error en state.error */}
      {state.error && <div className="alert alert-danger">{state.error}</div>}
      {/* Muestra una alerta azul si state.loading es verdadero */}
      {state.loading && <div className="alert alert-info">Cargando...</div>}

      {/* Título de la sección con márgenes Bootstrap */}
      <h2 className="mb-3 mt-5">Eliminar Auditorías</h2>
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
          {/* Itera sobre state.auditorias para renderizar una fila por cada auditoría */}
          {state.auditorias.map((auditoria) => (
            <tr key={auditoria.id}> {/* Fila con clave única basada en id */}
              <td>{auditoria.id}</td> {/* Celda con el ID de la auditoría */}
              <td>{auditoria.user_id}</td> {/* Celda con el ID del usuario */}
              <td>{auditoria.action}</td> {/* Celda con la acción */}
              <td>{auditoria.resource_type}</td> {/* Celda con el tipo de recurso */}
              <td>{auditoria.details}</td> {/* Celda con los detalles */}
              <td>{auditoria.created_at}</td> {/* Celda con la fecha de creación */}
              <td>{auditoria.updated_at}</td> {/* Celda con la fecha de actualización */}
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(auditoria.id)}
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

export default EliminarAuditorias;