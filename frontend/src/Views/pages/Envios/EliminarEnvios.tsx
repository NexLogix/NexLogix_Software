import NavBuscarEnvio from "../../componets/NavBars/NavBuscarEnvio";
const EliminarEnvios = ()  => {
 return (
     <div className="container-fluid mt-4">
           <NavBuscarEnvio/>
           {/* Tabla de envíos */}
           <div className="row">
               <div className="col-12">
                 <div className="card shadow-sm">
                   <div className="card-header bg-primary text-white"><h3 className="mb-0">Seccion para eliminar Envíos</h3></div>
                      <div className="card-body">
                           <table className="table table-bordered table-striped">
                                <thead>
                                     <tr>
                                         <th>ID Cliente</th>
                                         <th>Nombre</th>
                                         <th>Tamaño</th>
                                         <th>Peso</th>
                                         <th>Fecha de Ingreso</th>
                                         <th>Fecha de Entrega</th>
                                         <th>Empleado</th>
                                     </tr>
                                </thead>
                                <tbody></tbody>
                           </table>
                      </div>
                 </div>
               </div>
           </div>
     </div>
 );
}

export default EliminarEnvios;