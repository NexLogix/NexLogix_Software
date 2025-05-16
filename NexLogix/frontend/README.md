# 🚀 NEXLOGX

Tecnologías usadas: **React** & **Vite**, **TypeScript** y **Bootstrap**.

Este proyecto adopta una arquitectura inspirada en el patrón MVC, combinada con principios de Clean Architecture. El objetivo es lograr un frontend altamente modular, escalable y fácil de mantener.

---

## 🧱 Arquitectura de Capas

El frontend está estructurado en siete capas principales, cada una con una responsabilidad clara:

### 1. 📁 assets/
Contiene todos los recursos multimedia como imágenes, íconos, videos y otros archivos estáticos.

### 2. 📂 controllers/
Actúa como puente entre la vista (view) y las capas de lógica. Aquí se coordinan acciones del usuario con los usecases o servicios correspondientes.

### 3. 📦 usecases/
Responsable de la lógica de negocio y las validaciones. Filtra y determina qué información debe pasar entre controladores y servicios. Esta capa representa el “cerebro” de la aplicación.

### 4. 🌐 services/
Aquí se configuran las llamadas HTTP hacia el backend. Incluye las URL de las APIs y maneja la comunicación con el servidor. Los datos se devuelven a los usecases o controladores.

### 5. 🧩 models/
Contiene todos los modelos e interfaces TypeScript que definen la forma de los datos en la aplicación. Ideal para mantener tipado fuerte y consistente.

### 6. 🖼 views/
Es la capa de presentación. Aquí se construyen las interfaces de usuario utilizando HTML (JSX), Bootstrap, CSS y TypeScript.

- 📁 components/: Contiene los componentes reutilizables como botones, tarjetas, menús, etc.
- 📁 pages/: Agrupa las páginas principales de la app, cada una representando una vista completa.

### 7. 🧭 routers/
Configura toda la navegación de la aplicación utilizando React Router con TypeScript.

- AppRouter: Componente principal de enrutamiento que se importa en App.tsx. Separa la lógica de rutas de la estructura principal siguiendo el principio de responsabilidad única (S de SOLID).
- ProtectRouterEmpleados: Agrupa y protege las rutas exclusivas para los usuarios con rol de "empleado".
- ProtectRouterManager: Agrupa y protege las rutas exclusivas para usuarios con rol de "manager".

---

## ✅ Buenas Prácticas

- Separación de responsabilidades entre capas.
- Tipado fuerte con TypeScript.
- Uso de principios SOLID.
- Navegación protegida basada en roles de usuario.
- Código organizado y reutilizable.

---

> Esta estructura está pensada para ser escalable en proyectos empresariales, facilitando la implementación de nuevas funcionalidades y el mantenimiento continuo del sistema.

