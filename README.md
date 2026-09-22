# WTW Task Manager — Frontend

App web de la prueba técnica: **WtWTaskManager**, un panel interno para gestionar tareas y colaboradores.

Stack: **Angular 21** (standalone), **Tailwind CSS v4** y **Lucide** para iconos. Habla con la API .NET del repo `wtw-task-manager-apis`.

---

## Antes de empezar

Necesitas:

1. [Node.js](https://nodejs.org/) LTS (v20 o superior) y npm
2. La **API del backend** corriendo en `http://localhost:5065`  
   (sigue el README de `wtw-task-manager-apis`)

---

## Cómo levantarlo

```powershell
cd wtw-prueba-tecnica-web\wtw-task-manager-ui
npm install
npm start
```

Abre **http://localhost:4200**.

En desarrollo la app apunta a:

```text
http://localhost:5065/api
```

El backend ya tiene CORS para `http://localhost:4200`.

### Build de producción

```powershell
npm run build
```

Usa `environment.ts`. Antes de desplegar, ajusta `apiUrl` a la URL real de la API.

---

## Cómo está compuesto el proyecto

La app vive en `src/app/` y se separa en tres zonas:

```text
src/app/
  core/                 # Cosas de una sola vez (esqueleto)
    layout/             # Sidebar, topbar, shell + router-outlet
    interceptors/       # Errores HTTP → toast
    services/           # ToastService
    components/         # Toast en pantalla
  shared/               # Piezas reutilizables (sin dominio)
    components/         # PageHeader, logo, sidebar-credit, badges…
    constants/          # APP_NAME, nav, roles, estados, API paths
    models/             # ApiResponse<T>
    table-skeleton/     # Loading / fila vacía
    utils/
  features/
    users/              # Módulo Usuarios
    tasks/              # Módulo Tareas
  app.routes.ts         # Rutas lazy: /tasks (inicio) y /users
```

Cada feature sigue el mismo patrón:

```text
features/<nombre>/
  pages/          # Pantalla “smart” (carga datos, abre modales)
  components/     # Tabla, formulario, modal…
  models/         # Tipos TypeScript alineados a la API
  services/       # XxxApiService (HttpClient)
  <nombre>.routes.ts
```

### ¿Dónde pongo código nuevo?

| Carpeta | Pregunta rápida |
|---------|-----------------|
| `core` | ¿Es parte del esqueleto de la app? |
| `shared` | ¿Lo usan (o podrían usar) varios features y no es de un solo dominio? |
| `features/X` | ¿Es lógica o UI de ese dominio (users / tasks)? |

No hay login ni guards: el usuario actual es un demo fijo (`CURRENT_USER`) que se usa en `createdBy` / `updatedBy`.

---

## Qué puedes hacer en la app

### Usuarios (`/users`)

- Ver el listado de colaboradores
- Crear un usuario nuevo (nombre + correo)

### Tareas (`/tasks` — ruta de inicio)

- Ver el listado con asignado, estado y fechas
- Filtrar por usuario, estado y orden; los filtros van en la **URL** (`userId`, `status`, `orderBy`) para que al recargar se mantengan
- Crear una tarea y asignarla con el selector de usuarios
- Avanzar el estado: **Iniciar** (`pending` → `inProgress`) o **Completada** (`inProgress` → `done`)

Estados que ve el usuario: Pendiente, En progreso, Completada (la API sigue usando `pending` / `inProgress` / `done`).

---

## Flujo de datos

```text
Page (signals)
  → XxxApiService (HttpClient)
      → API REST
  ↑
errorInterceptor → ToastService → toast en pantalla
```

Las páginas cargan datos, pasan listas a tablas presentacionales y abren modales para crear. Los errores de la API se muestran con el toast; los éxitos (crear / cambiar estado) también.

---

## Endpoints que consume

Base en desarrollo: `http://localhost:5065/api`

### Usuarios

| Método | Ruta | Uso |
|--------|------|-----|
| `GET` | `/users` | Listar |
| `POST` | `/users` | Crear (`name`, `mail`, `rol`, `createdBy`) |

### Tareas

| Método | Ruta | Uso |
|--------|------|-----|
| `GET` | `/tasks?orderBy=` | Listar todas |
| `GET` | `/tasks/user/{userId}?status=&orderBy=` | Listar por usuario (filtro de estado opcional) |
| `POST` | `/tasks` | Crear (`name`, `description?`, `userId`, `createdBy`) |
| `PUT` | `/tasks/{id}/status` | Cambiar estado (`status`, `updatedBy`) |

Las respuestas de tarea incluyen el asignado como objeto `assignedTo` (`id`, `name`, `mail`, `rol`), no solo un `userId`.

---

## Notas útiles

- **Sin autenticación** en esta fase: cualquiera que llegue a la API/UI puede operar; `CURRENT_USER` simula al actor.
- **Iconos**: `@lucide/angular` (reemplazan los SVG sueltos del layout y acciones).
- **Estilos**: Tailwind v4 con PostCSS (`@import 'tailwindcss'`).
- **Contratos**: camelCase alineado a la API (`mail`, `rol`, `createdBy`, `assignedTo`, etc.).
