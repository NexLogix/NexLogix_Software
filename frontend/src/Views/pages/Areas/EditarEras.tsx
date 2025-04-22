import React from 'react';

const EditarAreas = () => {
    return (
        <div className="container mt-4">
            <nav className="navbar navbar-light bg-light mb-4 p-3 shadow-sm">
                <div className="container-fluid">
                    <form className="d-flex" onSubmit={(e) => e.preventDefault()}>
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Ingrese ID del Área"
                            aria-label="Buscar"
                            value={''} // usar useState más adelante
                            onChange={() => {}} // función para capturar el cambio
                        />
                        <button className="btn btn-outline-primary me-2" type="submit">
                            Buscar
                        </button>
                    </form>
                </div>
            </nav>

            <h2 className="mb-3 mt-5">Editar Información de Área</h2>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre del Área</th>
                        <th>Descripción del Área</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Aquí irán las filas dinámicas con los datos del backend */}
                </tbody>
            </table>
        </div>
    );
};

export default EditarAreas;
