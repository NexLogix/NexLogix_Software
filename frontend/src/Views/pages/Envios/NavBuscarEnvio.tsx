const NavBuscarEnvio = () => {
   return (
    <nav className="navbar navbar-light bg-light mb-4 p-3 shadow-sm">
    <div className="container-fluid">
      <form className="d-flex">
        <input className="form-control me-2" type="search" placeholder="Ingrese ID del Envío" aria-label="Buscar" />
        <button className="btn btn-outline-primary" type="submit">Buscar</button>
      </form>
      <div className="dropdown">
        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
          Buscar por Filtro
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <li><a className="dropdown-item" href="#">Fecha</a></li>
          <li><a className="dropdown-item" href="#">Remitente</a></li>
          <li><a className="dropdown-item" href="#">Destinatario</a></li>
          <li><a className="dropdown-item" href="#">Estado</a></li>
        </ul>
      </div>
    </div>
  </nav>
   )
}

export default (NavBuscarEnvio);