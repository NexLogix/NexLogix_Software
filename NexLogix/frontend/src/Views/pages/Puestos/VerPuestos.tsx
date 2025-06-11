import React, { useEffect } from 'react';
import { usePuestosController } from '../../../Controllers/Puestos/PuestosController';

// Define un componente funcional VerPuestos, tipado con React.FC para indicar que no recibe props
const VerPuestos: React.FC = () => { 
    // Desestructura el estado y las funciones proporcionadas por usePuestosController
    const { state, fetchPuestosData, handleSearchChange, handleSearch, resetSearch } = usePuestosController(); 

    useEffect(() => { // Define un efecto secundario para ejecutar código cuando el componente se monta
      fetchPuestosData();  // Llama a fetchPuestosData para cargar los puestos iniciales desde la API
    }, [fetchPuestosData]); // Especifica fetchPuestosData como dependencia para reejecutar el efecto si la función cambia


  //
  /// Inicia el retorno del JSX que define la interfaz de usuario del componente
  //
  return ( 
    <>
      {/* Contenedor fluido para alinear y espaciar el contenido de la barra */}
      <div className="container mt-4">
            {/* Formulario de búsqueda, previene el envío por defecto y ejecuta handleSearch */}
            <nav className="navbar navbar-light bg-light mb-4 p-3 shadow-sm">
                  {/* Contenedor fluido para alinear y espaciar el contenido de la barra */}
                  <div className="container-fluid">

                        {/* FORMULARIO DE BUSQUEDA, previene el envío por defecto y ejecuta handleSearch */}
                        <form className="d-flex" onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
                          <input 
                              className="form-control me-2" type="search" placeholder="Ingrese ID del Puesto" aria-label="Buscar"
                              // Valor del input controlado por el estado searchId 
                              value={state.searchId}
                              // Maneja cambios en el input llamando a handleSearchChange 
                              onChange={handleSearchChange} 
                          />

                          {/* Botón de búsqueda BUSCAR con estilo Bootstrap */}
                          <button className="btn btn-outline-primary me-2" type="submit">
                            Buscar
                          </button>

                          {/* Botón de busquda MOSTRAR TODOS con estilo Bootstrap */}
                          <button
                            className="btn btn-outline-secondary" type="button" onClick={resetSearch}> Mostrar Todos
                          </button>
                        </form>
                  </div>
            </nav>

        {/* Muestra una alerta roja si hay un error en state.error */}
        {state.error && <div className="alert alert-danger">{state.error}</div>}
        {/* Muestra una alerta azul si state.loading es verdadero */}
        {state.loading && <div className="alert alert-info">Cargando...</div>}

        {/* Título de la sección con márgenes Bootstrap */}
        <h2 className="mb-3">Listado de Puestos</h2>
            {/* Tabla estilizada con Bootstrap para mostrar los puestos */}
            <table className="table table-bordered">
                  {/* Encabezado o titulos de la tabla */}
                  <thead>
                        {/* Fila de encabezados */}
                        <tr>
                             <th>ID</th> {/* Columna para el ID del puesto */}
                             <th>Nombre del Puesto</th> {/* Columna para el nombre del puesto */}
                             <th>Descripción</th> {/* Columna para la descripción del puesto */}
                             <th>Fecha de Asignación</th> {/* Columna para la fecha de asignación del puesto */}
                             <th>Área Asignada</th> {/* Columna para el nombre del área asociada */}
                        </tr>
                  </thead>

                  {/* Cuerpo de la tabla */}
                  <tbody>
                    {/* Itera sobre state.puestos para renderizar una fila por cada puesto */}
                    {state.puestos.map((puesto) => ( 
                        <tr key={puesto.idPuestos}> {/* Fila de la tabla con clave única basada en idPuestos */}
                            <td>{puesto.idPuestos}</td> {/* Celda con el ID del puesto */}
                            <td>{puesto.nombrePuesto}</td> {/* Celda con el nombre del puesto */}
                            <td>{puesto.descripcionPuesto}</td> {/* Celda con la descripción del puesto */}
                            <td>{puesto.fechaAsignacionPuesto}</td> {/* Celda con la fecha de asignación */}
                            <td>{puesto.areas.nombreArea}</td> {/* Celda con el nombre del área asociada */}
                        </tr>
                    ))}
                  </tbody>
            </table>
    </div>
    </>
  );
};

export default VerPuestos;