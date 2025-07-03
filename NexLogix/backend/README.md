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

## Listado de Gestiones Backend
- Se marca con X las gestiones que ya fueron revisadas y sus metodos http funcionan correctamente.
- Las que no tienen X estan siendo actualizadas o se estan probando su funcionalidad acorde al sistema.

- [] Gestión Asignacion Rutas Por Ciudades
- [] Gestión Asignacion Rutas Por Vehiculos
- [x] Gestión Asignacion Conductores por Vehiculos
- [x] Gestión Areas
- [x] Gestión Audit Logs
- [x] Gestión Categoría Envios
- [x] Gestión Ciudades
- [x] Gestión Entregas
- [x] Gestión Envios
- [x] Gestión Estado
- [x] Gestión Puestos
- [x] Gestión Recogidas
- [x] Gestión Reportes
- [x] Gestión Roles
- [x] Gestión Conductores
- [x] Gestión Rutas
- [x] Gestión Usuarios
- [x] Gestión Vehículos

---

# NOTA:
Para la logica de negocio se plantea esta idea:

- Cuando se registra un envío, se deja pendiente la fecha de recogida. Esta fecha será asignada por el sistema en el momento en que el conductor marque que ha llegado al punto de recogida. En ese instante:

El sistema actualizará el estado de la ruta a "En recogida".

El sistema actualizará el estado del envío a "En recogida".

Posteriormente, transcurridos aproximadamente 10 a 20 minutos, el sistema cambiará automáticamente el estado del envío y de la ruta a "En ruta".

Este mismo flujo se aplicará durante el proceso de entrega, así como cuando el conductor notifique que se dirige a realizar una devolución.

