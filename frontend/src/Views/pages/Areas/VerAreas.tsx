const VerAreas = () => {
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
                            value={''} // Se puede usar useState luego
                            onChange={() => {}} // Manejador luego
                        />
                        <button className="btn btn-outline-primary me-2" type="submit">
                            Buscar
                        </button>
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={() => {}} // Acción mostrar todos
                        >
                            Mostrar Todos
                        </button>
                    </form>
                </div>
            </nav>

            <h2 className="mb-3">Listado de Áreas</h2>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre del Área</th>
                        <th>Descripción</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Aquí se insertarán las filas dinámicas */}
                </tbody>
            </table>
        </div>
    );
};

export default VerAreas;
