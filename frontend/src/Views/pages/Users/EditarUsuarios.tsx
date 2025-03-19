import NavBuscarUsuario from "../../shared/NavBars/NavBuscarUsuario";

const EditarUsuarios  = ()  => {
 return (
    <>
    <NavBuscarUsuario/>
    <div className="container mt-4 mb-4">
        <h2 className="mb-4">Editar Usuarios</h2>
        <table className="table table-striped">
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
        </table>
    </div>
</>
 )
}

export default EditarUsuarios;