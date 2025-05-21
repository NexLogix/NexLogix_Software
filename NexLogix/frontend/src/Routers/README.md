Sistema de Enrutamiento - NexLogix SPA
Este documento describe el sistema de enrutamiento de la Single Page Application (SPA) NexLogix, construida con React (usando Vite) y un backend en Laravel. El sistema utiliza react-router-dom para manejar la navegación, con rutas públicas y protegidas basadas en roles (Manager y Empleado). El objetivo es proporcionar una navegación segura, modular y fácil de mantener para una aplicación de gestión logística.
Tabla de Contenidos

Arquitectura de Enrutamiento
Rutas y Componentes
Rutas Públicas
Rutas Protegidas: Empleado
Rutas Protegidas: Manager


Componentes Clave
main.tsx
App
AppRouter
PrivateRoute
ProtectedRouteEmpleados
ProtectedRouteManagers
UnauthorizedRoute
EmpleadoProfile
HomeManager
Login


Conceptos Técnicos
useNavigate
ReactNode
children
Outlet
useAuth
BrowserRouter


Dependencias
Estructura de Archivos

Arquitectura de Enrutamiento
El sistema de enrutamiento está diseñado para:

Rutas Públicas: Accesibles sin autenticación (por ejemplo, /login, /ubicacion).
Rutas Protegidas: Requieren autenticación y un rol específico (Manager o Empleado). Estas rutas están divididas en dos módulos:
/Empleado/*: Para empleados, con acceso a envíos, rutas y reportes.
/Manager/*: Para managers, con acceso a gestión de áreas, puestos, usuarios, vehículos, auditorías, etc.


Protección: Usa el componente PrivateRoute para verificar autenticación (token) y autorización (rol).
Diseño (Layouts): Usa componentes como EmpleadoProfile y ManagerProfile para proporcionar una interfaz consistente con barras laterales, navegación superior y pies de página, estilizados con Bootstrap y CSS personalizado.
Inicialización: La aplicación se inicializa en main.tsx, que renderiza App, el componente raíz que configura la autenticación y renderiza AppRouter.

La navegación se basa en react-router-dom, con BrowserRouter como contenedor principal y Routes/Route para definir las rutas.
Rutas y Componentes
Rutas Públicas

/login: Página de inicio de sesión (Login), accesible sin autenticación. Usa un formulario estilizado con Bootstrap y un CSS personalizado (generalStyleLogin.css) para un diseño moderno y empresarial.
/unauthorized: Página de error 403 (UnauthorizedRoute) para accesos denegados.
/ubicacion: Página informativa sobre la ubicación de la empresa (EstamosUbicadoEn).
/acerca_de: Página informativa sobre la empresa (AcercaDe).

Rutas Protegidas: Empleado

Ruta base: /Empleado/*
Componente: ProtectedRouteEmpleados
Subrutas:
/verEnvios: Lista de envíos asignados al empleado.
/crearEnvios: Formulario para crear nuevos envíos.
/verListaRutas: Lista de rutas asignadas.
/verReportes: Reportes generados por el empleado.


Layout: EmpleadoProfile proporciona una barra lateral con menús colapsables (usando data-bs-toggle="collapse" de Bootstrap) y un Outlet para renderizar subrutas.

Rutas Protegidas: Manager

Ruta base: /Manager/*
Componente: ProtectedRouteManagers
Subrutas:
/verAreas: Gestión de áreas logísticas.
/crearAreas: Creación de nuevas áreas.
/verPuestos: Gestión de puestos de trabajo.
/crearPuestos: Creación de nuevos puestos.
/verUsuarios: Gestión de usuarios.
/crearUsuarios: Creación de nuevos usuarios.
/verVehiculos: Gestión de vehículos.
/crearVehiculos: Creación de nuevos vehículos.
/verAuditorias: Auditorías logísticas.
/crearAuditorias: Creación de nuevas auditorías.


Layout: ManagerProfile proporciona una interfaz similar a EmpleadoProfile, con una barra lateral y Outlet.

Componentes Clave
main.tsx

Archivo: src/main.tsx
Propósito: Punto de entrada de la aplicación, inicializa el entorno React y renderiza el componente raíz App.
Funcionalidad:
Usa createRoot de react-dom/client para renderizar la aplicación en el DOM (#root).
Envuelve App en StrictMode para detectar problemas en desarrollo.
Importa estilos y scripts de Bootstrap (bootstrap.min.css, bootstrap.bundle.min.js) para diseño responsivo y componentes interactivos (por ejemplo, menús colapsables en EmpleadoProfile).
Importa Bootstrap Icons (bootstrap-icons.css) para íconos en componentes como Login (sobre y candado en inputs).
Importa Animate.css para animaciones (por ejemplo, fadeIn en Login y HomeManager).
Importa Google Fonts (Poppins) para una tipografía moderna y empresarial.


Ejemplo:import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'animate.css';
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);



App

Archivo: src/App.tsx
Propósito: Componente raíz que configura la autenticación y renderiza AppRouter.
Funcionalidad:
Usa el hook useEffect para llamar a setAuthHeader (de AuthService), configurando el encabezado Authorization con el token almacenado en localStorage para solicitudes HTTP.
Renderiza AppRouter, que define todas las rutas de la aplicación.
Actúa como un puente entre la inicialización de la aplicación y el sistema de enrutamiento.


Ejemplo:import { useEffect } from 'react';
import AppRouter from './Routers/AppRouter';
import { setAuthHeader } from './services/Auth/AuthService';
function App() {
  useEffect(() => {
    setAuthHeader(); // Establece encabezado por defecto si hay token
  }, []);
  return <AppRouter />;
}
export default App;



AppRouter

Archivo: src/Routers/AppRouter.tsx
Propósito: Define las rutas públicas y protegidas de la aplicación.
Funcionalidad:
Usa BrowserRouter para habilitar la navegación basada en la URL.
Define rutas públicas (/login, /unauthorized, etc.) usando Route.
Protege rutas para Manager y Empleado usando PrivateRoute con roles específicos (allowedRoles).
Usa Routes para agrupar todas las rutas y garantizar que solo una coincida con la URL.


Rutas:
Públicas: /login, /unauthorized, /ubicacion, /acerca_de.
Protegidas: /Manager/* (rol Manager), /Empleado/* (rol Empleado).


Ejemplo:import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../Views/componets/Login';
import PrivateRoute from '../Views/componets/PrivateRoute';
import ProtectedRouteManagers from '../ProtectedRouterManagers';
import ProtectedRouteEmpleados from '../ProtectedRouterEmpleados';
function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/Manager/*"
          element={
            <PrivateRoute allowedRoles={['Manager']}>
              <ProtectedRouteManagers />
            </PrivateRoute>
          }
        />
        <Route
          path="/Empleado/*"
          element={
            <PrivateRoute allowedRoles={['Empleado']}>
              <ProtectedRouteEmpleados />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
export default AppRouter;



PrivateRoute

Archivo: src/Views/componets/PrivateRoute.tsx
Propósito: Proteger rutas verificando autenticación y roles.
Funcionalidad:
Usa el hook useAuth para obtener token, role, y isAuthenticated.
Verifica localStorage como respaldo para token y userRole.
Redirige a /login si no está autenticado o a /unauthorized si el rol no está permitido.
Muestra un mensaje de carga (Cargando...) con estilos Bootstrap durante la verificación.


Props:
children: ReactNode: Contenido a renderizar si se permite el acceso.
allowedRoles: string[]: Lista de roles permitidos (por ejemplo, ['Manager']).


Ejemplo:import { FC, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../services/Auth/AuthService';
interface PrivateRouteProps {
  children: ReactNode;
  allowedRoles: string[];
}
const PrivateRoute: FC<PrivateRouteProps> = ({ children, allowedRoles }) => {
  const { token, role, isAuthenticated } = useAuth();
  if (!token || !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }
  return <>{children}</>;
};
export default PrivateRoute;



ProtectedRouteEmpleados

Archivo: src/ProtectedRouterEmpleados.tsx
Propósito: Definir subrutas para el rol Empleado.
Funcionalidad:
Usa EmpleadoProfile como componente de diseño (layout).
Define subrutas como /verEnvios, /crearEnvios, /verListaRutas, y /verReportes.
Todas las subrutas se renderizan dentro del Outlet de EmpleadoProfile.
Usa Routes y Route para mapear las subrutas.


Ejemplo:import { Routes, Route } from 'react-router-dom';
import EmpleadoProfile from './Views/pages/profiles/EmpleadoProfile/EmpleadoProfile';
import HomeEmpleado from './Views/pages/profiles/EmpleadoProfile/HomeEmpleado';
import VerEnvios from './Views/pages/Envios/VerEnvios';
function ProtectedRouteEmpleados() {
  return (
    <EmpleadoProfile>
      <Routes>
        <Route path="/" element={<HomeEmpleado />} />
        <Route path="verEnvios" element={<VerEnvios />} />
      </Routes>
    </EmpleadoProfile>
  );
}
export default ProtectedRouteEmpleados;



ProtectedRouteManagers

Archivo: src/ProtectedRouterManagers.tsx
Propósito: Definir subrutas para el rol Manager.
Funcionalidad:
Usa ManagerProfile como componente de diseño (layout).
Define subrutas para gestionar áreas, puestos, usuarios, vehículos, auditorías, etc.
Todas las subrutas se renderizan dentro del Outlet de ManagerProfile.


Ejemplo:import { Routes, Route } from 'react-router-dom';
import ManagerProfile from './Views/pages/profiles/ManagerProfile/ManagerProfile';
import HomeManager from './Views/pages/profiles/ManagerProfile/HomeManager';
import VerAreas from './Views/pages/Areas/VerAreas';
function ProtectedRouteManagers() {
  return (
    <ManagerProfile>
      <Routes>
        <Route path="/" element={<HomeManager />} />
        <Route path="verAreas" element={<VerAreas />} />
      </Routes>
    </ManagerProfile>
  );
}
export default ProtectedRouteManagers;



UnauthorizedRoute

Archivo: src/Views/componets/UnauthorizedRoute.tsx
Propósito: Mostrar una página de error 403 cuando el acceso es denegado.
Funcionalidad:
Muestra un mensaje de "No Autorizado" estilizado con Bootstrap (container, btn-primary).
Redirige automáticamente al inicio (/) después de 5 segundos usando useNavigate.
Incluye un botón para navegar manualmente al inicio.


Diseño: Usa clases Bootstrap para un diseño responsivo y un botón con hover animado (definido en CSS personalizado).
Ejemplo:import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
function UnauthorizedRoute() {
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => navigate('/'), 5000);
    return () => clearTimeout(timer);
  }, [navigate]);
  return (
    <div className="container text-center mt-5">
      <h1>No Autorizado</h1>
      <p>Serás redirigido en 5 segundos...</p>
      <button className="btn btn-primary" onClick={() => navigate('/')}>
        Volver al Inicio
      </button>
    </div>
  );
}
export default UnauthorizedRoute;



EmpleadoProfile

Archivo: src/Views/pages/profiles/EmpleadoProfile/EmpleadoProfile.tsx
Propósito: Proporcionar un diseño (layout) para las vistas del rol Empleado.
Funcionalidad:
Incluye NavbarGeneral (barra superior), una barra lateral (sidebar) con menús desplegables, Outlet para subrutas, y FooterGeneralEmpleado.
La barra lateral usa Link de react-router-dom para navegar a subrutas como verEnvios, verListaRutas, etc.
Usa Bootstrap para estilos (nav, collapse, shadow-lg) y menús colapsables (data-bs-toggle="collapse").
Estiliza la UI con CSS personalizado para un diseño moderno (por ejemplo, gradientes, sombras).


Diseño: La barra lateral es responsiva, con íconos de Bootstrap Icons (por ejemplo, bi-truck) y animaciones suaves.

HomeManager

Archivo: src/Views/pages/profiles/ManagerProfile/HomeManager.tsx
Propósito: Mostrar la página principal del perfil de Manager.
Funcionalidad:
Obtiene los datos del perfil usando UserProfileController (solicitudes HTTP vía axios).
Muestra información del usuario (ID, nombre, email, rol, puesto, etc.) en una tarjeta (card) de Bootstrap.
Maneja estados de carga (con un skeleton loader) y error, redirige a /login si hay un error 401.
Usa Animate.css para animaciones (por ejemplo, fadeIn) y Bootstrap para estilos (card, list-group).


Diseño: La tarjeta tiene un gradiente personalizado y sombra (shadow-lg) para un look empresarial.

Login

Archivo: src/Views/componets/Login.tsx
Propósito: Proporcionar una página de inicio de sesión para autenticar usuarios.
Funcionalidad:
Usa useAuthLoginController para manejar el estado del formulario (email, contrasena, error) y la lógica de autenticación.
Muestra un formulario con inputs para correo y contraseña, un botón de envío, y un toast para errores.
Redirige a rutas protegidas (/Manager/* o /Empleado/*) tras un login exitoso.


Diseño:
Usa Bootstrap (container, input-group, btn-primary, toast) para un diseño responsivo.
Incluye Bootstrap Icons (sobre y candado en inputs) para mejorar la usabilidad.
Aplica un CSS personalizado (generalStyleLogin.css) con un gradiente empresarial (#1B263B a #F4A261), fuente Poppins, y animaciones (fadeIn de Animate.css).
La caja del formulario tiene un fondo blanco opaco, sombra suave, y bordes redondeados para un look moderno.



Conceptos Técnicos
useNavigate

Descripción: Hook de react-router-dom para navegar programáticamente.
Uso: En UnauthorizedRoute y HomeManager para redirigir (por ejemplo, a /login o /).
Ejemplo:const navigate = useNavigate();
navigate('/login'); // Redirige al login



ReactNode

Descripción: Tipo de TypeScript para cualquier contenido renderizable en React (JSX, strings, componentes, etc.).
Uso: En PrivateRoute para la prop children.
Ejemplo:interface PrivateRouteProps {
  children: ReactNode;
}



children

Descripción: Prop especial en React que representa el contenido anidado.
Uso: En PrivateRoute, children es el componente protegido (por ejemplo, ProtectedRouteManagers).
Ejemplo:<PrivateRoute allowedRoles={['Manager']}>
  <ProtectedRouteManagers />
</PrivateRoute>



Outlet

Descripción: Componente de react-router-dom que renderiza subrutas anidadas.
Uso: En EmpleadoProfile y ManagerProfile para mostrar el contenido de subrutas.
Ejemplo:<Outlet /> // Renderiza HomeEmpleado, VerEnvios, etc.



useAuth

Descripción: Hook personalizado (en AuthService) que proporciona el estado de autenticación (token, role, isAuthenticated).
Uso: En PrivateRoute para verificar si el usuario está autenticado y tiene un rol permitido.
Ejemplo:const { token, role, isAuthenticated } = useAuth();



BrowserRouter

Descripción: Componente de react-router-dom que habilita la navegación basada en la URL del navegador.
Uso: En AppRouter como contenedor principal para todas las rutas.
Ejemplo:<BrowserRouter>
  <Routes>
    <Route path="/login" element={<Login />} />
  </Routes>
</BrowserRouter>



Dependencias

react-router-dom: Para enrutamiento y navegación.
bootstrap: Para estilos y componentes UI (tarjetas, formularios, menús colapsables).
bootstrap-icons: Para íconos en componentes como Login (sobre, candado) y EmpleadoProfile (íconos de navegación).
axios: Para solicitudes HTTP al backend Laravel.
animate.css: Para animaciones en Login, HomeManager, y otros componentes.
react: Para componentes y hooks.
Google Fonts (poppins): Para una tipografía moderna y empresarial en Login y otros componentes.

Estructura de Archivos
src/
├── main.tsx
├── App.tsx
├── Routers/
│   ├── AppRouter.tsx
├── Views/
│   ├── componets/
│   │   ├── Login.tsx
│   │   ├── UnauthorizedRoute.tsx
│   │   ├── PrivateRoute.tsx
│   │   ├── Footers/
│   │   │   ├── EstamosUbicadoEn.tsx
│   │   │   ├── AcercaDe.tsx
│   ├── pages/
│   │   ├── profiles/
│   │   │   ├── EmpleadoProfile/
│   │   │   │   ├── EmpleadoProfile.tsx
│   │   │   │   ├── HomeEmpleado.tsx
│   │   │   ├── ManagerProfile/
│   │   │   │   ├── ManagerProfile.tsx
│   │   │   │   ├── HomeManager.tsx
│   │   ├── Areas/
│   │   ├── Puestos/
│   │   ├── Ciudades/
│   │   ├── Envios/
│   │   ├── Users/
│   │   ├── Rutas/
│   │   ├── Vehiculos/
│   │   ├── Soporte/
│   │   ├── Reportes/
│   │   ├── Auditorias/
├── services/
│   ├── Auth/
│   │   ├── AuthService.tsx
├── Controllers/
│   ├── Users/
│   │   ├── UserController.tsx
├── models/
│   ├── Interfaces/
│   │   ├── UserProfile.tsx
├── ProtectedRouterEmpleados.tsx
├── ProtectedRouterManagers.tsx
├── assets/
│   ├── bootstrap-icons/
│   ├── styles/
│   │   ├── generalStyleLogin.css

