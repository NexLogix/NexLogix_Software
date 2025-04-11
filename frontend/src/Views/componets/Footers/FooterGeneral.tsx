import "../GeneralStyle/footerGeneral.css"
import { Link } from "react-router-dom";
const FooterGeneral = () => {
  return (
    <>
      <footer className="footer mt-auto py-3 w-100 text-center">
          <div className="container">
              <div className="row justify-content-center">
                <div className="col-md-4">
                  <Link to="/manager/ubicacion">Estamos ubicados en:</Link>
                </div>
                <div className="col-md-4">
                  <Link to="/manager/acerca_de">Acerca de:</Link>
                </div>
                <div className="col-md-4">
                  <Link to="/manager/contactanos">Soporte Tecnico:</Link>
                </div>
              </div>
              <div className="row">
                <div className="col text-center mt-3">
                  <p>Derechos reservados © 2025</p>
                </div>
              </div>
          </div>
      </footer>
    </>
  );
};


export default FooterGeneral;
