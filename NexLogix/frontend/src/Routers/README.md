Sistema de Enrutamiento - NexLogix SPA

Este documento describe el sistema de enrutamiento de la Single Page Application (SPA) NexLogix, construida con React (usando Vite) y un backend en Laravel. El sistema utiliza `react-router-dom` para manejar la navegación, con rutas públicas y protegidas basadas en roles (Manager y Empleado). El objetivo es proporcionar una navegación segura, modular y fácil de mantener para una aplicación de gestión logística.

---

**Tabla de Contenidos**

1. Arquitectura de Enrutamiento
2. Rutas y Componentes

   * Rutas Públicas
   * Rutas Protegidas: Empleado
   * Rutas Protegidas: Manager
3. Componentes Clave

   * main.tsx
   * App
   * AppRouter
   * PrivateRoute
   * ProtectedRouteEmpleados
   * ProtectedRouteManagers
   * UnauthorizedRoute
   * EmpleadoProfile
   * HomeManager
   * Login
4. Conceptos Técnicos

   * useNavigate
   * ReactNode
   * children
   * Outlet
   * useAuth
   * BrowserRouter
5. Dependencias
6. Estructura de Archivos

---

### Arquitectura de Enrutamiento

El sistema de enrutamiento está diseñado para:

* **Rutas Públicas:** Accesibles sin autenticación (por ejemplo, `/login`, `/ubicacion`).

* **Rutas Protegidas:** Requieren autenticación y un rol específico (Manager o Empleado). Estas rutas están divididas en dos módulos:

  * `/Empleado/*`: Para empleados, con acceso a envíos, rutas y reportes.
  * `/Manager/*`: Para managers, con acceso a gestión de áreas, puestos, usuarios, vehículos, auditorías, etc.

* **Protección:** Usa el componente `PrivateRoute` para verificar autenticación (token) y autorización (rol).

* **Diseño (Layouts):** Usa componentes como `EmpleadoProfile` y `ManagerProfile` para proporcionar una interfaz consistente con barras laterales, navegación superior y pies de página.

* **Inicialización:** La aplicación se inicializa en `main.tsx`, que renderiza `App`, el componente raíz que configura la autenticación y renderiza `AppRouter`.

---

### Rutas y Componentes

#### Rutas Públicas

* `/login`: Inicio de sesión.
* `/unauthorized`: Error 403.
* `/ubicacion`: Información de ubicación.
* `/acerca_de`: Información sobre la empresa.

#### Rutas Protegidas: Empleado

* **Ruta base:** `/Empleado/*`
* **Componente:** `ProtectedRouteEmpleados`
* **Subrutas:**

  * `/verEnvios`
  * `/crearEnvios`
  * `/verListaRutas`
  * `/verReportes`
* **Layout:** `EmpleadoProfile`

#### Rutas Protegidas: Manager

* **Ruta base:** `/Manager/*`
* **Componente:** `ProtectedRouteManagers`
* **Subrutas:**

  * `/verAreas`, `/crearAreas`
  * `/verPuestos`, `/crearPuestos`
  * `/verUsuarios`, `/crearUsuarios`
  * `/verVehiculos`, `/crearVehiculos`
  * `/verAuditorias`, `/crearAuditorias`
* **Layout:** `ManagerProfile`

---

### Componentes Clave

#### main.tsx

Punto de entrada. Renderiza `App`, importa estilos y scripts (Bootstrap, Animate.css, Google Fonts).

```tsx
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

#### App

Configura el header de autenticación y renderiza `AppRouter`.

```tsx
useEffect(() => {
  setAuthHeader();
}, []);
```

#### AppRouter

Define rutas usando `BrowserRouter` y `Routes`. Usa `PrivateRoute` para proteger rutas.

```tsx
<Route path="/Manager/*" element={<PrivateRoute allowedRoles={['Manager']}><ProtectedRouteManagers /></PrivateRoute>} />
```

#### PrivateRoute

Verifica token y rol. Redirige a `/login` o `/unauthorized`.

```tsx
if (!token || !isAuthenticated) return <Navigate to="/login" />;
if (!allowedRoles.includes(role)) return <Navigate to="/unauthorized" />;
```

#### ProtectedRouteEmpleados / ProtectedRouteManagers

Define subrutas para cada rol usando `Routes`, `Route` y `Outlet` dentro de `EmpleadoProfile` o `ManagerProfile`.

#### UnauthorizedRoute

Error 403. Redirige a `/` después de 5 segundos.

```tsx
useEffect(() => setTimeout(() => navigate('/'), 5000), []);
```

#### EmpleadoProfile / ManagerProfile

Layout con barra lateral, `NavbarGeneral`, `Outlet` y `FooterGeneral`. Navegación con `Link` de `react-router-dom` y Bootstrap para interactividad.

---

### Conceptos Técnicos

* **useNavigate:** Redirección programática.
* **ReactNode:** Tipo para `children`.
* **children:** Contenido anidado en componentes.
* **Outlet:** Renderiza subrutas dentro de un layout.
* **useAuth:** Hook para acceder a token, rol, autenticación.
* **BrowserRouter:** Contenedor principal de rutas.

---

### Dependencias

* react-router-dom
* bootstrap
* bootstrap-icons
* animate.css

---

### Estructura de Archivos (resumen)

```
src/
├── main.tsx
├── App.tsx
├── Routers/
│   └── AppRouter.tsx
├── Views/
│   ├── componets/
│   │   ├── Login.tsx
│   │   ├── PrivateRoute.tsx
│   │   └── UnauthorizedRoute.tsx
│   └── pages/
│       └── profiles/
│           ├── EmpleadoProfile/
│           └── ManagerProfile/
├── ProtectedRouteEmpleados.tsx
├── ProtectedRouteManagers.tsx
└── services/Auth/
    └── AuthService.ts
```

---

Este sistema proporciona una base escalable y segura para gestionar usuarios y contenido según roles, manteniendo una experiencia coherente y profesional en la aplicación NexLogix.
