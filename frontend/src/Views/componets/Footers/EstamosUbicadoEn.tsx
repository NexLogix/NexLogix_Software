const EstamosUbicadosEn = () => {
    return (
      <div className="container my-5">
        <h2 className="text-center mb-4">Estamos ubicados en:</h2>
        <p className="text-center">Ave Cra 30 #17-28, Bogotá</p>
        
        <div className="d-flex justify-content-center">
          <iframe
            title="Ubicación Bogotá"
            src="https://www.google.com/maps?q=Ave+Cra+30+%2317-28,+Bogotá&output=embed"
            width="100%"
            height="400"
            style={{ border: 0, maxWidth: "900px", borderRadius: "10px", boxShadow: "0 0 15px rgba(0,0,0,0.2)" }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </div>
    );
  };
  
  export default EstamosUbicadosEn;
  