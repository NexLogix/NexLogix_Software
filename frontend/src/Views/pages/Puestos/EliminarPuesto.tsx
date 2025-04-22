import React, { useState } from 'react';

const EliminarPuesto = () => {
    const [idPuesto, setIdPuesto] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        // Aquí iría la lógica para buscar el puesto por ID
        console.log(`Buscando puesto con ID: ${idPuesto}`);
    };

    const handleDelete = () => {
        // Lógica para eliminar el puesto
        console.log(`Puesto con ID ${idPuesto} eliminado.`);
    };

    return (
        <div className="container mt-4">
            <nav className="navbar navbar-light bg-light mb-4 p-3 shadow-sm">
                <div className="container-fluid">
                    <form className="d-flex" onSubmit={handleSearch}>
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Ingrese el ID del Puesto"
                            aria-label="Buscar"
                            value={idPuesto}
                            onChange={(e) => setIdPuesto(e.target.value)}
                        />
                        <button className="btn btn-outline-danger me-2" type="submit">
                            Buscar
                        </button>
                    </form>
                </div>
            </nav>

            <h2 className="mb-3 mt-5">Eliminar Puesto</h2>
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
                    {/* Aquí irían las filas de datos dinámicos */}
                    <tr>
                        <td>21</td>
                        <td>Ejemplo de Puesto</td>
                        <td>Descripción de Puesto</td>
                        <td>2025-04-09 19:17:03</td>
                        <td>Logística</td>
                        <td>
                            <button
                                className="btn btn-danger"
                                onClick={handleDelete}
                            >
                                Eliminar
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default EliminarPuesto;
