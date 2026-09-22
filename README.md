# WTW Task Manager — Frontend

App web de la prueba técnica: **WtWTaskManager**, panel interno para gestionar tareas y colaboradores.

Stack: **Angular 21** (standalone) y **Tailwind CSS v4**. Consume la API .NET del repo `wtw-task-manager-apis`.

---

## URLs publicadas

| Entorno | URL |
|---------|-----|
| **Frontend (Vercel)** | https://pt-semisenior-wtw-web.vercel.app |
| **API (producción)** | https://wtw-task-manager-apis.runasp.net |

En producción la app llama a:

```text
https://wtw-task-manager-apis.runasp.net/api
```

Configurado en `src/environments/environment.ts`.

---

## Pasos para ejecutar el proyecto

### Requisitos

1. [Node.js](https://nodejs.org/) LTS (v20 o superior) y npm
2. La API corriendo en `http://localhost:5065` (ver README de `wtw-task-manager-apis`) — solo para desarrollo local

### Arranque (desarrollo)

```powershell
cd wtw-prueba-tecnica-web\wtw-task-manager-ui
npm install
npm start
```

Abre **http://localhost:4200**.

En desarrollo (`ng serve`) Angular reemplaza el environment por `environment.development.ts` y usa:

```text
http://localhost:5065/api
```

El backend permite CORS desde ese origen (`http://localhost:4200`).

### Environments

| Archivo | Cuándo se usa | `apiUrl` |
|---------|---------------|----------|
| `environment.development.ts` | `ng serve` / build `development` | `http://localhost:5065/api` |
| `environment.ts` | `npm run build` (producción, default) | `https://wtw-task-manager-apis.runasp.net/api` |

### Build de producción

```powershell
npm run build
```

Salida típica: `dist/wtw-task-manager-ui/browser`.

---

## Deploy en Vercel

1. **Publica primero la API** con CORS que incluya `https://pt-semisenior-wtw-web.vercel.app`.
2. En Vercel, crea/conecta el proyecto con:
   - **Root Directory:** `wtw-task-manager-ui` (o la carpeta donde está este `package.json`)
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist/wtw-task-manager-ui/browser`
3. El archivo `vercel.json` de esta carpeta hace rewrite SPA (`/*` → `/index.html`) para que rutas como `/tasks` funcionen al recargar.
4. Redeploy el front después de cualquier cambio en `environment.ts`.

Orden: **API → Frontend**.

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

## Apuntes previos al desarrollo
<img width="1000" height="1300" alt="wtw" src="https://github.com/user-attachments/assets/80364ce4-24ad-44f0-976d-85a766e33430" />
