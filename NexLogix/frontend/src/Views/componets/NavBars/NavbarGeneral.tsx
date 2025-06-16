// src/components/NavbarGeneral.tsx
import { useLogoutController } from "../../../Controllers/Users/UserController";
import "./../../Styles/Navs/NavGeneral.css";

const NavbarGeneral = () => {
    // Llamada del controller logout
    const { handleLogout } = useLogoutController();

    // cada click es llama al controller logout para hacer la accion
    const onLogoutClick = async () => {
        const result = await handleLogout();
        if (!result.success) {
            alert(result.message);
        } else {
            alert('¡Hasta pronto!');
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark shadow-lg">
            <a className="navbar-brand p-3 mr-7" href="#">NexLogix</a>
            <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item dropdown">
                        <a
                            className="nav-link dropdown-toggle"
                            href="#"
                            id="navbarDropdown"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                        Configuraciones
                        </a>
                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                            <li><a className="dropdown-item" href="#">Configuración de informacion personal</a></li>
                            <li><a className="dropdown-item" href="#">Preferencias de idioma</a></li>
                            <li>
                                {/*NO TOCAR POR EL AMOR A CRISTO
                                    Aqui esta la llamada del controller Logout
                                */}
                                <button className="dropdown-item text-danger fw-bold" onClick={onLogoutClick}> SALIR </button>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default NavbarGeneral;