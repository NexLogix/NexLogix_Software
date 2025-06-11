// Importa React y useEffect para manejar efectos secundarios
import React, { useEffect } from 'react';
// Importa el controlador personalizado para manejar la lógica de eliminación y obtención de datos
import { usePuestosController } from '../../../Controllers/Puestos/PuestosController';

// Define un componente funcional EliminarPuesto, tipado con React.FC para indicar que no recibe props
const EliminarPuesto: React.FC = () => {
  // Desestructura el estado y las funciones proporcionadas por usePuestosController
  const { state, handleSearchChange, handleSearch, fetchPuestosData, deletePuestoById } = usePuestosController();

  // Define un efecto secundario para cargar los datos iniciales cuando el componente se monta
  useEffect(() => {
    fetchPuestosData(); // Llama a fetchPuestosData para cargar los puestos desde la API
  }, [fetchPuestosData]); // Especifica fetchPuestosData como dependencia

  // Define la función handleDelete para manejar la eliminación de un puesto
  const handleDelete = (id: number) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este puesto?')) { // Confirma la eliminación
      deletePuestoById(id); // Llama a la función para eliminar el puesto
    }
  };

  // Inicia el retorno del JSX que define la interfaz de usuario del componente
  return (
    <>
      {/* Contenedor principal con margen superior para espaciar */}
      <div className="container mt-4">
        {/* Barra de navegación estilizada con Bootstrap para el formulario de búsqueda */}
        <nav className="navbar navbar-light bg-light mb-4 p-3 shadow-sm">
          <div className="container-fluid">
            {/* Formulario de búsqueda, previene el envío por defecto y ejecuta handleSearch */}
            <form className="d-flex" onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Ingrese el ID del Puesto"
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
        <h2 className="mb-3 mt-5">Eliminar Puesto</h2>
        {/* Tabla estilizada con Bootstrap para mostrar los puestos */}
        <table className="table table-bordered">
          {/* Encabezado de la tabla */}
          <thead>
            <tr>
              <th>ID</th> {/* Columna para el ID del puesto */}
              <th>Nombre del Puesto</th> {/* Columna para el nombre del puesto */}
              <th>Descripción del Puesto</th> {/* Columna para la descripción del puesto */}
              <th>Fecha de Asignación</th> {/* Columna para la fecha de asignación del puesto */}
              <th>Área</th> {/* Columna para el nombre del área asociada */}
              <th>Acciones</th> {/* Columna para los botones de acción */}
            </tr>
          </thead>

          {/* Cuerpo de la tabla */}
          <tbody>
            {/* Itera sobre state.puestos para renderizar una fila por cada puesto */}
            {state.puestos.map((puesto) => (
              <tr key={puesto.idPuestos}> {/* Fila con clave única basada en idPuestos */}
                <td>{puesto.idPuestos}</td> {/* Celda con el ID del puesto */}
                <td>{puesto.nombrePuesto}</td> {/* Celda con el nombre del puesto */}
                <td>{puesto.descripcionPuesto}</td> {/* Celda con la descripción del puesto */}
                <td>{puesto.fechaAsignacionPuesto}</td> {/* Celda con la fecha de asignación */}
                <td>{puesto.areas.nombreArea}</td> {/* Celda con el nombre del área asociada */}
                <td>
                  {/* Botón para eliminar el puesto */}
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(puesto.idPuestos)}
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
    </>
  );
};

export default EliminarPuesto;