import React from 'react';

const CrearArea = () => {
    return (
        <div className="container-fluid mt-4">
            <nav className="navbar navbar-light bg-light mb-4 p-3 shadow-sm">
                <div className="container-fluid">
                    <h4 className="mb-0">Crear Nueva Área</h4>
                </div>
            </nav>

            <div className="card shadow-sm">
                <div className="card-body">
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="mb-3">
                            <label htmlFor="nombreArea" className="form-label">
                                Nombre del Área
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="nombreArea"
                                placeholder="Ej: Bodega"
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="descripcionArea" className="form-label">
                                Descripción del Área
                            </label>
                            <textarea
                                className="form-control"
                                id="descripcionArea"
                                rows={3}
                                placeholder="Ej: Área encargada de almacenar productos."
                            ></textarea>
                        </div>

                        <button type="submit" className="btn btn-primary">
                            Crear Área
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CrearArea;
