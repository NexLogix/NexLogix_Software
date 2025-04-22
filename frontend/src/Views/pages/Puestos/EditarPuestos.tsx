import React, { useState } from 'react';

const EditarPuestos = () => {
    const [idPuesto, setIdPuesto] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        // Aquí iría la lógica para buscar el puesto por ID
        console.log(`Buscando puesto con ID: ${idPuesto}`);
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
                        <button className="btn btn-outline-primary me-2" type="submit">
                            Buscar
                        </button>
                    </form>
                </div>
            </nav>

            <h2 className="mb-3 mt-5">Editar Información del Puesto</h2>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre del Puesto</th>
                        <th>Descripción del Puesto</th>
                        <th>Fecha de Asignación</th>
                        <th>Área</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Aquí irán las filas de datos dinámicos */}
                </tbody>
            </table>
        </div>
    );
};

export default EditarPuestos;
