import { Link} from "react-router-dom";
import { Outlet } from "react-router-dom";
import FooterGeneralEmpleado from "../../../componets/Footers/FooterEmpleado";
import NavbarGeneral from "../../../componets/NavBars/NavbarGeneral";

const EmpleadoProfile = () => {
  
 return (
   <>
   <NavbarGeneral/>
   {/* Contenedor principal */}
   <div className="container-fluid">
     <div className="row">

       {/* Sidebar: barra lateral de navegación */}
       <nav id="sidebar" className="col-md-3 col-lg-2 d-md-block sidebar shadow-lg">
         <div className="position-sticky">
           <ul className="nav flex-column">

                   {/* Opción Inicio */}
                   <Link className="nav-link active" to="/empleado">Inicio EMPLEADO</Link>
                  
                   {/* Opción Envíos con submenú */}
                   <li className="nav-item position-relative ">
                       <Link className="nav-link" data-bs-toggle="collapse" to="#enviosSubmenu" role="button" aria-expanded="false" aria-controls="enviosSubmenu">Envíos</Link>
                       <div className="collapse" id="enviosSubmenu">
                             <ul className="nav flex-column ms-3">
                                 <Link className="nav-link" to="/empleado/verEnvios">Ver Envíos</Link>
                                 <Link className="nav-link" to="/empleado/crearEnvios">Crear Envío</Link>
                             </ul>
                       </div>
                   </li>

                   {/* Opción Rutas con submenú */}
                   <li className="nav-item">
                         <Link className="nav-link" data-bs-toggle="collapse" to="#RutasSubmenu"  role="button" aria-expanded="false"  aria-controls="RutasSubmenu" >Rutas</Link>
                         <div className="collapse" id="RutasSubmenu">
                               <ul className="nav flex-column ms-3">
                                 <Link className="nav-link" to="/empleado/verListaRutas">Ver lista de rutas</Link>
                               </ul>
                         </div>
                   </li>

                   {/* Opción Reportes */}
                   <li className="nav-item">
                       <Link className="nav-link" data-bs-toggle="collapse" to="#ReportesSubMenu" role="button" aria-expanded="false" aria-controls="ReportesSubMenu">Reportes</Link>
                           <div className="collapse" id="ReportesSubMenu"> 
                                 <ul className="nav flex-column ms-3">
                                   <Link className="nav-link" to="/empleado/verReportes">Ver reportes</Link>
                                 </ul>
                           </div>
                   </li>

           </ul>
         </div>
       </nav>

       {/* Área principal (Main) */}
         <main className="p-3">
           <Outlet />  {/* Aquí se renderiza el contenido según la ruta */}
         </main>
     </div>
   </div>

   {/* Pie de página */}
   <FooterGeneralEmpleado />
 </>
 );
};

export default EmpleadoProfile;