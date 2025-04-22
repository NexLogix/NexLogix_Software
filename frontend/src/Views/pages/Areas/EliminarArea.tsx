import React from 'react';

const EliminarArea = () => {
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
                            value={''} // puedes usar useState más adelante
                            onChange={() => {}} // manejar el cambio después
                        />
                        <button className="btn btn-outline-danger me-2" type="submit">
                            Buscar
                        </button>
                    </form>
                </div>
            </nav>

            <h2 className="mb-3 mt-5 text-danger">Eliminar Áreas</h2>
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
                    {/* Aquí se renderizarán dinámicamente las áreas a eliminar */}
                </tbody>
            </table>
        </div>
    );
};

export default EliminarArea;
