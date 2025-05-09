import  { useState } from 'react';

const VerAuditorias = () => {
    const [auditorias] = useState([
        {
            id: 1,
            user_id: 101,
            action: "Create",
            resource_type: "Puesto",
            resource_id: 2,
            details: "Se creó un nuevo puesto de trabajo.",
            created_at: "2025-04-01 12:00:00",
            updated_at: "2025-04-01 12:00:00"
        },
        // Aquí puedes agregar más objetos de auditoría si lo necesitas
    ]);

    return (
        <div className="container mt-4">
            <nav className="navbar navbar-light bg-light mb-4 p-3 shadow-sm">
                <div className="container-fluid">
                    <h5>Ver Auditorías</h5>
                </div>
            </nav>

            <h2 className="mb-3">Historial de Auditorías</h2>

            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Usuario ID</th>
                        <th>Acción</th>
                        <th>Tipo de Recurso</th>
                        <th>ID del Recurso</th>
                        <th>Detalles</th>
                        <th>Fecha de Creación</th>
                        <th>Fecha de Actualización</th>
                    </tr>
                </thead>
                <tbody>
                    {auditorias.map((auditoria) => (
                        <tr key={auditoria.id}>
                            <td>{auditoria.id}</td>
                            <td>{auditoria.user_id}</td>
                            <td>{auditoria.action}</td>
                            <td>{auditoria.resource_type}</td>
                            <td>{auditoria.resource_id}</td>
                            <td>{auditoria.details}</td>
                            <td>{auditoria.created_at}</td>
                            <td>{auditoria.updated_at}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default VerAuditorias;
