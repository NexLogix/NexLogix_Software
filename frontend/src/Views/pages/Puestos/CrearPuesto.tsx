import React, { useState } from 'react';

const CrearPuesto = () => {
    const [nombrePuesto, setNombrePuesto] = useState('');
    const [descripcionPuesto, setDescripcionPuesto] = useState('');
    const [fechaAsignacion, setFechaAsignacion] = useState('');
    const [idArea, setIdArea] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Aquí iría la lógica para enviar los datos al backend
        console.log({
            nombrePuesto,
            descripcionPuesto,
            fechaAsignacion,
            idArea
        });
    };

    return (
        <div className="container mt-4">
            <nav className="navbar navbar-light bg-light mb-4 p-3 shadow-sm">
                <div className="container-fluid">
                    <h5>Crear Nuevo Puesto</h5>
                </div>
            </nav>

            <div className="card shadow-sm">
                <div className="card-body">
                    <h4 className="card-title mb-4">Información del Puesto</h4>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="nombrePuesto" className="form-label">Nombre del Puesto</label>
                            <input
                                type="text"
                                id="nombrePuesto"
                                className="form-control"
                                value={nombrePuesto}
                                onChange={(e) => setNombrePuesto(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="descripcionPuesto" className="form-label">Descripción</label>
                            <textarea
                                id="descripcionPuesto"
                                className="form-control"
                                value={descripcionPuesto}
                                onChange={(e) => setDescripcionPuesto(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="fechaAsignacion" className="form-label">Fecha de Asignación</label>
                            <input
                                type="datetime-local"
                                id="fechaAsignacion"
                                className="form-control"
                                value={fechaAsignacion}
                                onChange={(e) => setFechaAsignacion(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="idArea" className="form-label">Asignar Área al Puesto</label>
                            <input
                                type="number"
                                id="idArea"
                                className="form-control"
                                value={idArea}
                                onChange={(e) => setIdArea(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Crear Puesto</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CrearPuesto;
