// Importa React, useEffect y useState para manejar efectos secundarios y estado local
import React, { useEffect, useState } from 'react';
// Importa los controladores personalizados para manejar la lógica de edición y obtención de datos
import { usePuestosController, useCreatePuestoController } from '../../../Controllers/Puestos/PuestosController';

// Define un componente funcional EditarPuestos, tipado con React.FC para indicar que no recibe props
const EditarPuestos: React.FC = () => {
  // Desestructura el estado y las funciones proporcionadas por usePuestosController
  const { state: puestosState, handleSearchChange, handleSearch, fetchPuestosData, fetchAreasData } = usePuestosController();
  // Desestructura el estado y las funciones proporcionadas por useCreatePuestoController
  const { state: createState, handleInputChange, handleUpdateSubmit } = useCreatePuestoController();
  // Define un estado local para controlar el modo de edición (ID del puesto que se está editando)
  const [editMode, setEditMode] = useState<number | null>(null);

  // Define un efecto secundario para cargar los datos iniciales cuando el componente se monta
  useEffect(() => {
    fetchPuestosData(); // Llama a fetchPuestosData para cargar los puestos desde la API
    fetchAreasData(); // Llama a fetchAreasData para cargar las áreas desde la API
  }, [fetchPuestosData, fetchAreasData]); // Especifica las funciones como dependencias

  // Define la función handleEditClick para activar el modo de edición y prellenar el formulario
  const handleEditClick = (puesto: { idPuestos: number; nombrePuesto: string; descripcionPuesto: string; idArea: number }) => {
    setEditMode(puesto.idPuestos); // Activa el modo de edición para el puesto seleccionado
    // Prellena el formulario con los datos del puesto
    handleInputChange({
      target: { name: 'nombrePuesto', value: puesto.nombrePuesto },
    } as React.ChangeEvent<HTMLInputElement>);
    handleInputChange({
      target: { name: 'descripcionPuesto', value: puesto.descripcionPuesto },
    } as React.ChangeEvent<HTMLTextAreaElement>);
    handleInputChange({
      target: { name: 'idArea', value: puesto.idArea.toString() },
    } as React.ChangeEvent<HTMLSelectElement>);
    // Log para depuración: indica que se activó el modo de edición
    console.log('EditarPuestos: Modo edición activado para ID:', puesto.idPuestos);
  };

  // Define la función handleSave para guardar los cambios (PUT o PATCH) y refrescar la lista
  const handleSave = (id: number, isPartial: boolean) => {
    handleUpdateSubmit(id, isPartial).then(() => {
      if (createState.successMessage) { // Si la edición fue exitosa
        fetchPuestosData(); // Refresca la lista de puestos
        setEditMode(null); // Desactiva el modo de edición
        // Log para depuración: indica que se refrescó la lista
        console.log('EditarPuestos: Lista de puestos refrescada después de guardar');
      }
    });
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
                className="form-control me-2" type="search" placeholder="Ingrese el ID del Puesto" aria-label="Buscar"
                value={puestosState.searchId} // Valor controlado por el estado
                onChange={handleSearchChange} // Maneja cambios en el input
              />
              {/* Botón de búsqueda con estilo Bootstrap */}
              <button className="btn btn-outline-primary me-2" type="submit">
                Buscar
              </button>
            </form>
          </div>
        </nav>

        {/* Muestra una alerta roja si hay un error en puestosState.error */}
        {puestosState.error && <div className="alert alert-danger">{puestosState.error}</div>}
        {/* Muestra una alerta azul si puestosState.loading es verdadero */}
        {puestosState.loading && <div className="alert alert-info">Cargando...</div>}
        {/* Muestra una alerta verde si hay un mensaje de éxito en createState.successMessage */}
        {createState.successMessage && <div className="alert alert-success">{createState.successMessage}</div>}
        {/* Muestra una alerta roja si hay un mensaje de error en createState.errorMessage */}
        {createState.errorMessage && <div className="alert alert-danger">{createState.errorMessage}</div>}
        {/* Muestra una alerta azul si createState.loading es verdadero */}
        {createState.loading && <div className="alert alert-info">Actualizando...</div>}

        {/* Título de la sección con márgenes Bootstrap */}
        <h2 className="mb-3 mt-5">Editar Información del Puesto</h2>
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
            {/* Itera sobre puestosState.puestos para renderizar una fila por cada puesto */}
            {puestosState.puestos.map((puesto) => (
              <tr key={puesto.idPuestos}> {/* Fila con clave única basada en idPuestos */}
                <td>{puesto.idPuestos}</td> {/* Celda con el ID del puesto */}
                <td>
                  {editMode === puesto.idPuestos ? ( // Si está en modo edición
                    <>
                      <input
                        type="text"
                        className="form-control"
                        name="nombrePuesto"
                        value={createState.formData.nombrePuesto} // Valor controlado
                        onChange={handleInputChange} // Maneja cambios
                      />
                      {/* Muestra un mensaje de error si existe un error en nombrePuesto */}
                      {createState.errors.nombrePuesto && <div className="text-danger">{createState.errors.nombrePuesto}</div>}
                    </>
                  ) : (
                    puesto.nombrePuesto // Muestra el nombre del puesto si no está en modo edición
                  )}
                </td>
                <td>
                  {editMode === puesto.idPuestos ? ( // Si está en modo edición
                    <>
                      <textarea
                        className="form-control" name="descripcionPuesto"
                        value={createState.formData.descripcionPuesto} // Valor controlado
                        onChange={handleInputChange} // Maneja cambios
                      />
                      {/* Muestra un mensaje de error si existe un error en descripcionPuesto */}
                      {createState.errors.descripcionPuesto && <div className="text-danger">{createState.errors.descripcionPuesto}</div>}
                    </>
                  ) : (
                    puesto.descripcionPuesto // Muestra la descripción si no está en modo edición
                  )}
                </td>
                <td>{puesto.fechaAsignacionPuesto}</td> {/* Celda con la fecha de asignación */}
                <td>
                  {editMode === puesto.idPuestos ? ( // Si está en modo edición
                    <>
                      <select
                        name="idArea" className="form-control"
                        value={createState.formData.idArea} // Valor controlado
                        onChange={handleInputChange} // Maneja cambios
                      >
                        <option value="0" disabled>Seleccione un área</option> {/* Opción por defecto */}
                        {/* Itera sobre las áreas para renderizar opciones */}
                        {puestosState.areas.map((area) => (
                          <option key={area.idArea} value={area.idArea}>
                            {area.nombreArea}
                          </option>
                        ))}
                      </select>
                      {/* Muestra un mensaje de error si existe un error en idArea */}
                      {createState.errors.idArea && <div className="text-danger">{createState.errors.idArea}</div>}
                    </>
                  ) : (
                    puesto.areas.nombreArea // Muestra el nombre del área si no está en modo edición
                  )}
                </td>
                <td>
                  {editMode === puesto.idPuestos ? ( // Si está en modo edición
                    <>
                      {/* Botón para guardar los cambios completos (PUT) */}
                      <button
                        className="btn btn-success me-2"
                        onClick={() => handleSave(puesto.idPuestos, false)}
                        disabled={createState.loading}
                      >
                        Guardar (Completo)
                      </button>
                      {/* Botón para guardar los cambios parciales (PATCH) */}
                      <button
                        className="btn btn-warning me-2"
                        onClick={() => handleSave(puesto.idPuestos, true)}
                        disabled={createState.loading}
                      >
                        Guardar (Parcial)
                      </button>
                      {/* Botón para cancelar la edición */}
                      <button
                        className="btn btn-secondary"
                        onClick={() => setEditMode(null)}
                        disabled={createState.loading}
                      >
                        Cancelar
                      </button>
                    </>
                  ) : (
                    // Botón para activar el modo de edición
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
    </>
  );
};

export default EditarPuestos;