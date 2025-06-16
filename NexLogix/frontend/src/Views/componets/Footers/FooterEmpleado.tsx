import "../../Styles/Footers/footerGeneral.css"
import { Link } from "react-router-dom";
const FooterGeneralEmpleado = () => {
  return (
    <>
      <footer className="footer mt-auto py-3 w-100 text-center">
          <div className="container">
              <div className="row justify-content-center">
                <div className="col-md-4">
                  <Link to="/Empleado/ubicacion">Estamos ubicados en:</Link>
                </div>
                <div className="col-md-4">
                  <Link to="/Empleado/acerca_de">Acerca de:</Link>
                </div>
              </div>
              <div className="row">
                <div className="col text-center mt-5">
                  <p>Derechos reservados © 2025</p>
                </div>
              </div>
          </div>
      </footer>
    </>
  );
};


export default FooterGeneralEmpleado;
