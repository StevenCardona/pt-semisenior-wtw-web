# WTW Task Manager — Frontend

App web de la prueba técnica: **WtWTaskManager**, panel interno para gestionar tareas y colaboradores.

Stack: **Angular 21** (standalone) y **Tailwind CSS v4**. Consume la API .NET del repo `wtw-task-manager-apis`.

---

## Pasos para ejecutar el proyecto

### Requisitos

1. [Node.js](https://nodejs.org/) LTS (v20 o superior) y npm
2. La API corriendo en `http://localhost:5065` (ver README de `wtw-task-manager-apis`)

### Arranque

```powershell
cd wtw-prueba-tecnica-web\wtw-task-manager-ui
npm install
npm start
```

Abre **http://localhost:4200**.

En desarrollo la app usa:

```text
http://localhost:5065/api
```

El backend ya permite CORS desde ese origen.

### Build de producción

```powershell
npm run build
```

Antes de desplegar, ajusta `apiUrl` en `src/environments/environment.ts`.

---

## Cómo está compuesto

```text
src/app/
  core/        Layout, interceptor de errores, toast
  shared/      Componentes y constants reutilizables
  features/
    users/     Listado y creación de usuarios
    tasks/     Listado, filtros, creación y cambio de estado
```

Cada feature trae su propia carpeta con `pages`, `components`, `models`, `services` y rutas lazy.

---

## Decisiones técnicas

- **Arquitectura por features.** Cada módulo de negocio (usuarios, tareas) concentra su UI, modelos y llamadas HTTP. Así es más fácil manipularlo y extenderlo con el tiempo.
- **Separación core / shared / features.** El esqueleto de la app no se mezcla con el dominio; lo compartido no se mete dentro de un solo feature.
- **Servicios por feature.** Cada dominio habla con la API desde su propio servicio (`UsersApiService`, `TasksApiService`), sin un store global.
- **Errores y feedback.** Un interceptor toma los mensajes de la API y el toast los muestra en pantalla.
- **Filtros de tareas en la URL.** `userId`, `status` y `orderBy` viven en query params para que al recargar se mantenga la vista.
- **Sin login en esta fase.** El actor demo es `CURRENT_USER` (sirve para `createdBy` / `updatedBy`).

---

## Qué puedes hacer hoy

- **Usuarios:** listar y crear
- **Tareas:** listar, filtrar por usuario/estado/orden, crear con asignado, avanzar estado (Iniciar / Completada)

---

## Qué quedó pendiente

- Usuarios: editar, eliminar, filtros, orden, paginación y buscador
- Tareas: eliminar y buscador por nombre o descripción
- Autenticación real (JWT o MFA): que solo quienes entren autenticados usen el panel
- Que un usuario con rol `user` vea solo lo que tiene asignado
- Estándares de auth más sólidos (hoy el “usuario actual” es una constante de demo)
