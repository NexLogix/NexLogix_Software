# 📦 NexLogix - Backend Laravel (Arquitectura Modular)

# APP seccion 
Este backend sigue una arquitectura **MVC modular extendida**, aplicando principios de **Clean Architecture** y **SOLID**, diseñada para escalar en el futuro a una estructura de microservicios.

---

## 🧱 Capas principales

| Carpeta             | Rol principal                                                          |
| ------------------- | ---------------------------------------------------------------------- |
| `Controllers/`      | Manejan la solicitud HTTP y delegan acciones al caso de uso.           |
| `UseCases/`         | Contienen la lógica de negocio y validaciones.                         |
| `Services/`         | Acceden a la base de datos u orígenes externos.                        |
| `Models/`           | Definen los modelos y contratos (interfaces).                          |
| `Exceptions/`       | Manejo de errores categorizados (`bad_request`, `db_connection`, etc). |
| `Routes/api.php`    | Define los endpoints públicos y su controlador.                        |
| `Events/Listeners/` | Registro y reacción automática a acciones del sistema.                 |
| `Providers/`        | Registro central de inyecciones de dependencias.                       |
| `Middleware/`       | Filtros que controlan acceso y ejecución previa a una petición.        |

---

## 📂 Detalle por subcarpeta

### 🔸 `Services/`

**Ubicación:** `app/Services/`
**Responsabilidad:**

* Realiza operaciones sobre la base de datos (create, update, delete, find).
* No incluye lógica de negocio ni validaciones.
* Ejemplos: `UserService`, `EnvioService`.

### 🔸 `UseCases/`

**Ubicación:** `app/UseCases/`
**Responsabilidad:**

* Contiene la lógica de negocio y validaciones.
* Invoca a los `Services` necesarios.
* Lanza excepciones si hay errores o validaciones fallidas.
* Ejemplo: `CreateUserUseCase`, `EditEnvioUseCase`.

### 🔸 `Models/`

**Ubicación:** `app/Models/`
**Responsabilidad:**

* Define entidades con Eloquent ORM.
* Establece contratos (`interface`) para desacoplar capas.
* Usados por los `Services` para mantener el principio de inversión de dependencias.

### 🔸 `Controllers/`

**Ubicación:** `app/Http/Controllers/Entidad/`
**Responsabilidad:**

* Reciben la solicitud HTTP.
* Llaman al UseCase correspondiente.
* No incluyen lógica de negocio, solo coordinación y respuestas JSON.

### 🔸 `Exceptions/`

**Ubicación:** `app/Exceptions/`
**Responsabilidad:**

* Captura y categoriza errores por tipo.
* Subcapas como:

  * `bad_request/`
  * `http_request/`
  * `db_connection/`

### 🔸 `Events/` y `Listeners/`

**Ubicación:** `app/Events/` y `app/Listeners/`
**Responsabilidad:**

#### Eventos:

* Funcionan como **orquestadores** de procesos en segundo plano.
* Su función es **anunciar que ocurrió una acción relevante** en el sistema.
* Ejemplo: creación, modificación o eliminación de recursos.

#### Listeners:

* Se activan automáticamente cuando se dispara un evento.
* Se encargan de ejecutar una tarea secundaria (log, auditoría, notificación, etc.).

```php
// Ejemplo
Event: ResourceActionEvent
Listener: LogActionListener
```

> Esta lógica se desacopla del flujo principal, para mantener el principio de responsabilidad única y evitar sobrecargar los casos de uso.

### 🔸 `Providers/`

**Ubicación:** `app/Providers/`

* Se registran los **bindings** para inyecciones de dependencias.
* Permite definir qué implementación usar cuando se inyecta una `interface`.

```php
// Ejemplo: UserService implementa IUserService
$this->app->bind(IUserService::class, UserService::class);
```

### 🔸 `Middleware/`

**Ubicación:** `app/Http/Middleware/`

    * Filtros que controlan si una petición puede continuar o debe ser bloqueada.
    * Útil para proteger rutas y verificar roles, sesiones, permisos, etc.

    ```php
        Route::middleware('role:2,3')->get(...); // Donde 2 = Manager, 3 = Empleado
    ```
    

## 🗺️ Flujo general de una petición

```text

        Cliente (React / Postman)
            ↓
        api.php (Ruta HTTP)
            ↓
        Controller
            ↓
        UseCase (valida, orquesta)
            ↓
        Service (interactúa con la base de datos)
            ↓
        Model (Eloquent)
            ↑
        Respuesta JSON: status, message, data, error

```

---

## 🛠️ Principios aplicados

* ✔ SRP: Cada clase tiene una sola responsabilidad.
* ✔ Inversión de dependencias: UseCases dependen de interfaces, no implementaciones.
* ✔ Desacoplamiento: Separación clara entre infraestructura y negocio.
* ✔ Escalabilidad: Estructura lista para ser convertida en microservicios.

---

## 📚 Estado actual del desarrollo

* [x] Gestion de autenticacion, Login, usuarios, roles, auditoría base implementados.
* [x] Gestion de envios, rutas, ciudades, recogidas, entregas con sus respectivas auditorias completadas.
* [ ] Capa de Excepciones en proceso, es espera que todos los services y useCases los tengas para que se documenten todos los metodos HTTP
* [ ] Gestion de reportes (en desarrollo).
* [x] Vehículos y Asignación de Rutas (en desarrollo).
* [ ] Migración completa de dependencias a interfaces (en curso).
* [ ] Validaciones están siendo migradas 100% a los UseCases.

---

## Listado de Gestiones Backend
- Se marca con X las gestiones que ya fueron revisadas y sus metodos http funcionan correctamente.

- [] Gestión Asignacion Rutas Por Ciudades
- [x] Gestión Areas
- [] Gestión Asignacion Rutas Por Vehiculos
- [x] Gestión Audit Logs
- [x] Gestión Categoría Envios
- [x] Gestión Ciudades
- [] Gestión Entregas
- [x] Gestión Envios
- [] Gestión Estado
- [x] Gestión Puestos
- [x] Gestión Recogidas
- [] Gestión Reportes
- [] Gestión Roles
- [] Gestión Rutas
- [] Gestión Usuario Dispositivos Autorizados
- [x] Gestión Usuarios
- [] Gestión Vehículos


