
const CrearCiudad = () => {
    return (
        <div className="container-fluid mt-4">
            <div className="container">
                <h2 className="mb-3">Formulario de Ciudad</h2>
                <form className="">
                    <div className="mb-3">
                        <label htmlFor="nombreCiudad" className="form-label">Nombre de la Ciudad</label>
                        <input
                            type="text"
                            className="form-control"
                            id="nombreCiudad"
                            placeholder="Ej: Bogotá D.C."
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="costoCiudad" className="form-label">Costo por Ciudad</label>
                        <input
                            type="number"
                            className="form-control"
                            id="costoCiudad"
                            placeholder="Ej: 15000"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Crear Ciudad</button>
                </form>
            </div>
        </div>
    );
};

export default CrearCiudad;
