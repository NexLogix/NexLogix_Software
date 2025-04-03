import "../GeneralStyle/footerGeneral.css"
const FooterGeneral = () => {
  return (
     <>
        <footer className="footer mt-auto py-3 w-100 text-center">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-4">
                <a href="#">Estamos ubicados en:</a>
              </div>
              <div className="col-md-4">
                <a href="#">Acerca de:</a>
              </div>
              <div className="col-md-4">
                <a href="#">Contactanos:</a>
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
