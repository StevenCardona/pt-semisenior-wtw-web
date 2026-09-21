# WTW Task Manager — Frontend (Angular)

Frontend de la prueba técnica: sistema interno de gestión de tareas asociado a colaboradores.

Repositorio: aplicación Angular standalone que consume la API REST del backend (.NET + SQL Server).

---

## Alcance actual

En esta fase del frontend **solo** está montado lo siguiente:

- Arquitectura `core` / `shared` / `features`
- Ambientes de desarrollo y producción
- Interceptor de errores HTTP básico + `ToastService` simple (sin UI de toast aún)
- Feature **Users**: modelos, `UsersApiService` y ruta lazy
- Tailwind CSS v4 configurado
- README orientado al revisor

**Sin UI de negocio** todavía: no hay formularios, tablas, store ni pantallas funcionales de usuarios/tareas.

---

## Cómo ejecutar el proyecto

### Requisitos

1. [Node.js](https://nodejs.org/) (LTS recomendado, v20+)
2. npm (viene con Node)
3. La API del backend corriendo en `http://localhost:5065` (ver README del repo de APIs)

### Pasos

```powershell
cd wtw-prueba-tecnica-web\wtw-task-manager-ui
npm install
npm start
```

La app queda en **http://localhost:4200**.

`npm start` usa la configuración de **development**, que apunta a:

```text
http://localhost:5065/api
```

CORS del backend ya permite origen `http://localhost:4200`.

### Build de producción

```powershell
npm run build
```

Usa `environment.ts` (producción). Ajusta `apiUrl` antes de desplegar.

---

## Arquitectura

```text
src/app/
  core/                 # Esqueleto de la app (una sola vez)
    layout/             # Shell con router-outlet
    interceptors/       # Errores HTTP → ToastService
    services/           # ToastService
  shared/               # Reutilizable, sin dominio de negocio
    models/             # ApiResponse<T>
    constants/          # roles, paths de API
  features/
    users/              # Dominio usuarios
      models/
      services/         # UsersApiService (HttpClient + baseUrl)
      pages/            # Smart page (placeholder, sin UI)
      users.routes.ts
```

### ¿Dónde va cada cosa?

| Ubicación | Criterio |
|-----------|----------|
| `core` | ¿Es esqueleto de la app? (layout, interceptor, toasts) |
| `shared` | ¿Lo usan 2+ features y no es de un dominio? |
| `features/X` | ¿Pertenece al dominio de negocio X? |

**No hay autenticación** en esta fase (ni login, ni guards, ni AuthStore).

### Flujo de datos (Users)

```text
UsersPage (smart, futuro) → UsersApiService (HttpClient) → API
                                      ↑
                       errorInterceptor → ToastService
```

---

## Decisiones técnicas

1. **Angular 21 standalone** con rutas lazy por feature (`loadChildren`).
2. **Separación core / shared / features** para mantener responsabilidades claras.
3. **`inject()`** en lugar de inyección por constructor.
4. **Servicio por feature** con `HttpClient` y `baseUrl` fija (`environment.apiUrl` + `API_PATHS`), sin cliente HTTP genérico ni store todavía.
5. **Interceptor + toast básicos** para mostrar el primer mensaje de error de la API.
6. **Ambientes** con `fileReplacements`: development → `localhost:5065`; production → placeholder documentado.
7. **Contratos alineados a la API**: camelCase (`mail`, `rol`, `createdBy`) y roles `admin` | `user`.
8. **Tailwind CSS v4** vía PostCSS (`@import 'tailwindcss'` + `@theme` mínimo).
9. **Sin auth** por ahora; el campo `createdBy` del DTO de creación queda para cuando exista UI.

---

## Funcionalidades pendientes

- UI de usuarios (listado y creación con formulario reactivo)
- Estado local / store del feature cuando haga falta
- Feature completo de **tareas** (crear, listar, filtrar por estado, cambiar estado)
- Selección de usuario al asignar tareas
- Componentes presentacionales compartidos (tabla, modal, campos de formulario)
- Visualización de toasts en pantalla
- Autenticación / autorización (si se requiere más adelante)
- Layout visual (header, sidebar, navegación)

---

## Endpoints que consume el feature Users

Base (dev): `http://localhost:5065/api`

| Método | Ruta | Uso |
|--------|------|-----|
| `GET` | `/users` | Listar usuarios |
| `POST` | `/users` | Crear usuario |

El cuerpo de creación esperado por la API incluye `name`, `mail`, `rol` y `createdBy`.
