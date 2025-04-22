const VerCiudades = () => {
    return (
        <div className="container mt-4">
            <nav className="navbar navbar-light bg-light mb-4 p-3 shadow-sm">
                <div className="container-fluid">
                    <form className="d-flex" onSubmit={(e) => e.preventDefault()}>
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Ingrese el ID de la Ciudad"
                            aria-label="Buscar"
                            value={''} // Puedes usar un useState luego
                            onChange={() => {}} // Maneja el cambio después
                        />
                        <button className="btn btn-outline-primary me-2" type="submit">
                            Buscar
                        </button>
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={() => {}} // Acción de mostrar todos
                        >
                            Mostrar Todos
                        </button>
                    </form>
                </div>
            </nav>

            <h2 className="mb-3 mt-5 ">Información de la Ciudad</h2>
            <table className="table table-bordered ">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre de la Ciudad</th>
                        <th>Costo por Ciudad</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Aquí irán las filas de datos dinámicos */}
                </tbody>
            </table>
        </div>
    );
};

export default VerCiudades;
