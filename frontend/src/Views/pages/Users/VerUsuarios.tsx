import NavBuscarUsuario from "../../shared/NavBars/NavBuscarUsuario";

const VerUsuarios  = ()  => {
    console.log("Renderizando View Users...");
    return (
        <>
        <NavBuscarUsuario />
            <div className="container mt-4 mb-4">
                <h2 className="mb-4">Lista de Usuarios</h2>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Documento</th>
                        <th>Nombre Completo</th>
                        <th>Email</th>
                        <th>Contacto</th>
                        <th>Dirección</th>
                        <th>Puesto</th>
                        <th>Área</th>
                        <th>Rol</th>
                        <th>Fecha Creación</th>
                        <th>Acciones</th>
                    </tr>
                    </thead>
                        <tbody>
                            {/* Aquí se mostrarán los usuarios */}
                            <tr>
                                <td>188282990</td>
                                <td>12345678</td>
                                <td>Juan Pérez</td>
                                <td>juanperez@email.com</td>
                                <td>3001234567</td>
                                <td>Calle 123 #45-67</td>
                                <td>Jefe de Bodega</td>
                                <td>Almacén</td>
                                <td>Admin</td>
                                <td>2025-03-19</td>
                                <td>
                                <button className="btn btn-warning btn-sm me-2">Editar</button>
                                <button className="btn btn-danger btn-sm">Eliminar</button>
                                </td>
                            </tr>
                        </tbody>
                </table>
            </div>
        </>
    )
}

export default VerUsuarios;