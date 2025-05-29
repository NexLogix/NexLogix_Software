// Importa React y useEffect para manejar efectos secundarios
import React, { useEffect } from 'react';
// Importa los controladores personalizados para manejar la lógica de creación y obtención de áreas
import { useCreatePuestoController, usePuestosController } from '../../../Controllers/Puestos/PuestosController';

// Define un componente funcional CrearPuesto, tipado con React.FC para indicar que no recibe props
const CrearPuesto: React.FC = () => {
  // Desestructura el estado y las funciones proporcionadas por useCreatePuestoController
  const { state, handleInputChange, handleCreateSubmit } = useCreatePuestoController();
  // Desestructura el estado y la función fetchAreasData proporcionadas por usePuestosController
  const { state: puestosState, fetchAreasData } = usePuestosController();

  // Define un efecto secundario para cargar las áreas cuando el componente se monta
  useEffect(() => {
    fetchAreasData(); // Llama a fetchAreasData para cargar las áreas desde la API
  }, [fetchAreasData]); // Especifica fetchAreasData como dependencia

  // Inicia el retorno del JSX que define la interfaz de usuario del componente
  return (
    <>
      {/* Contenedor principal con margen superior para espaciar */}
      <div className="container mt-4">
        {/* Barra de navegación estilizada con Bootstrap para el título */}
        <nav className="navbar navbar-light bg-light mb-4 p-3 shadow-sm">
          <div className="container-fluid">
            <h5>Crear Nuevo Puesto</h5> {/* Título de la sección */}
          </div>
        </nav>

        {/* Tarjeta estilizada con Bootstrap para el formulario */}
        <div className="card shadow-sm">
          <div className="card-body">
            {/* Título de la tarjeta con margen inferior */}
            <h4 className="card-title mb-4">Información del Puesto</h4>

            {/* Muestra una alerta verde si hay un mensaje de éxito en state.successMessage */}
            {state.successMessage && <div className="alert alert-success">{state.successMessage}</div>}
            {/* Muestra una alerta roja si hay un mensaje de error en state.errorMessage */}
            {state.errorMessage && <div className="alert alert-danger">{state.errorMessage}</div>}
            {/* Muestra una alerta azul si state.loading es verdadero */}
            {state.loading && <div className="alert alert-info">Cargando...</div>}

            {/* Formulario para crear un nuevo puesto */}
            <form onSubmit={handleCreateSubmit}>
              {/* Campo para el nombre del puesto */}
              <div className="mb-3">
                <label htmlFor="nombrePuesto" className="form-label">Nombre del Puesto</label>
                <input
                  type="text"
                  id="nombrePuesto"
                  name="nombrePuesto"
                  className="form-control"
                  value={state.formData.nombrePuesto} // Valor controlado por el estado
                  onChange={handleInputChange} // Maneja cambios en el input
                  required // Campo requerido
                />
                {/* Muestra un mensaje de error si existe un error en nombrePuesto */}
                {state.errors.nombrePuesto && <div className="text-danger">{state.errors.nombrePuesto}</div>}
              </div>

              {/* Campo para la descripción del puesto */}
              <div className="mb-3">
                <label htmlFor="descripcionPuesto" className="form-label">Descripción</label>
                <textarea
                  id="descripcionPuesto"
                  name="descripcionPuesto"
                  className="form-control"
                  value={state.formData.descripcionPuesto} // Valor controlado por el estado
                  onChange={handleInputChange} // Maneja cambios en el textarea
                />
                {/* Muestra un mensaje de error si existe un error en descripcionPuesto */}
                {state.errors.descripcionPuesto && <div className="text-danger">{state.errors.descripcionPuesto}</div>}
              </div>

              {/* Campo para seleccionar el área asignada */}
              <div className="mb-3">
                <label htmlFor="idArea" className="form-label">Asignar Área al Puesto</label>
                <select
                  id="idArea"
                  name="idArea"
                  className="form-control"
                  value={state.formData.idArea} // Valor controlado por el estado
                  onChange={handleInputChange} // Maneja cambios en el select
                  required // Campo requerido
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
                {state.errors.idArea && <div className="text-danger">{state.errors.idArea}</div>}
              </div>

              {/* Botón para enviar el formulario */}
              <button type="submit" className="btn btn-primary" disabled={state.loading}>
                Crear Puesto
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CrearPuesto;