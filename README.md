# The Grand Budapest Hotel

Aplicación web full-stack inspirada en *The Grand Budapest Hotel*. La interfaz permite explorar las habitaciones, consultar servicios del hotel, realizar una pre-reserva, hacer check-in, consultar la carta del hotel y visitar la pastelería Mendl's.

El proyecto está compuesto por:

- **Frontend:** React 19, TypeScript, Vite y React Router.
- **Backend:** Express 5 ejecutado con `tsx`.
- **Base de datos:** MongoDB Atlas mediante el driver oficial `mongodb`.
- **Idiomas:** inglés y español, con persistencia de la selección en `localStorage`.
- **Contenido visual:** imágenes, vídeos, fuentes y otros recursos en `public/Media`.

## Requisitos

- Node.js compatible con las versiones actuales de Vite y TypeScript.
- npm.
- MongoDB Atlas (solo es necesario para cargar las habitaciones desde la API).

## Instalación

Desde la raíz del proyecto:

```bash
npm install --legacy-peer-deps
```

Para usar la API local, crea un archivo `.env` en la raíz:

```env
MONGODB_URI=mongodb+srv://<usuario>:<contraseña>@<cluster>/<opciones>
PORT=3001
```

`MONGODB_URI` es obligatoria para iniciar el servidor. `PORT` es opcional y utiliza `3001` por defecto. El archivo `.env` está excluido de Git mediante `.gitignore`; no publiques credenciales de MongoDB.

La API utiliza:

- Base de datos: `GHBudapestRoom`
- Colección: `Rooms`

## Ejecución en desarrollo

Abre dos terminales desde la raíz del proyecto.

### Frontend

```bash
npm run dev
```

Vite mostrará la URL local, normalmente `http://localhost:5173`.

### API

```bash
npm run api
```

La API estará disponible normalmente en `http://localhost:3001`.

El frontend tiene configurada la dirección de la API en [`src/config.ts`](./src/config.ts). Si cambias el puerto o alojas la API en otra dirección, actualiza `API_URL`.

Si MongoDB no está disponible, la interfaz conserva las habitaciones incluidas en [`src/data/rooms.ts`](./src/data/rooms.ts) como fallback. Cuando la API responde correctamente, las habitaciones recibidas se guardan en memoria durante la sesión y sustituyen a los datos locales.

## Scripts disponibles

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Inicia el servidor de desarrollo de Vite con HMR. |
| `npm run api` | Inicia Express con recarga automática mediante `tsx watch`. |
| `npm run build` | Comprueba TypeScript y genera la versión de producción en `dist/`. |
| `npm run preview` | Sirve localmente la compilación de producción. |
| `npm run lint` | Ejecuta ESLint sobre el proyecto. |

## Funcionalidades

- Página de inicio con hero, vídeo, galería, servicios y personal del hotel.
- Catálogo de suites y habitaciones con precios, categorías, descripciones y servicios.
- Formulario de reserva en `/book-now`, con selección de fechas, huéspedes y suite.
- Flujo de check-in en `/check-in`.
- Carta interactiva del hotel en `/letter`.
- Menú de pastelería Mendl's en `/mendls`.
- Navegación responsive con menú lateral.
- Cambio de idioma EN/ES persistido con la clave `gbh-lang`.
- Animaciones de aparición, scroll, contador y efecto de escritura.
- Fallback automático a datos locales si la API de habitaciones falla.

## Rutas del frontend

| Ruta | Página |
| --- | --- |
| `/` | Inicio |
| `/suites` | Suites y habitaciones |
| `/mendls` | Pastelería Mendl's |
| `/letter` | Carta del hotel |
| `/check-in` | Check-in |
| `/book-now` | Reserva |

Cualquier ruta no reconocida vuelve a la página de inicio.

## API

La API Express se encuentra en [`api/index.js`](./api/index.js) y expone un CRUD para habitaciones.

### `GET /api/rooms`

Devuelve todas las habitaciones ordenadas por precio descendente:

```json
{
  "success": true,
  "recurso": "Habitación",
  "total": 5,
  "data": []
}
```

### `POST /api/rooms`

Crea una habitación. El cuerpo debe contener:

```json
{
  "slug": "new-suite",
  "name": "New Suite",
  "category": "Grand Luxury",
  "price": 500,
  "description": "Descripción de la habitación.",
  "amenities": ["Private Balcony", "Writing Desk"]
}
```

Validaciones aplicadas:

- `slug`: texto en minúsculas con números y guiones (`a-z`, `0-9`, `-`).
- `name`, `category` y `description`: textos obligatorios.
- `price`: número finito igual o mayor que cero.
- `amenities`: lista de textos.
- Los campos adicionales se descartan antes de guardar.

### `PUT /api/rooms/:id`

Actualiza una habitación existente usando su `ObjectId` de MongoDB. Recibe el mismo formato validado que `POST`.

### `DELETE /api/rooms/:id`

Elimina una habitación por su `ObjectId`.

Las rutas `PUT` y `DELETE` devuelven `400` si el identificador no es válido y `404` si no existe la habitación. Las rutas inexistentes bajo `/api` devuelven `404`.

## Estructura principal

```text
.
├── api/
│   └── index.js             # Servidor Express y CRUD de habitaciones
├── public/
│   └── Media/               # Imágenes, vídeos y fuentes
├── src/
│   ├── components/          # Componentes agrupados por sección
│   ├── context/             # Estado global del idioma
│   ├── data/                # Datos locales y opciones de formularios
│   ├── hooks/               # Hooks de UI, formularios y datos
│   ├── languages/           # Traducciones EN/ES
│   ├── pages/               # Páginas asociadas a las rutas
│   ├── styles/              # Hojas de estilo por sección
│   ├── App.tsx              # Configuración de rutas
│   └── main.tsx             # Punto de entrada de React
├── index.html
├── package.json
└── vite.config.ts
```

## Producción

Genera la compilación:

```bash
npm run build
```

El resultado del frontend se genera en `dist/`. Para probarlo localmente:

```bash
npm run preview
```

En un despliegue, configura `MONGODB_URI` como variable de entorno del proveedor y asegúrate de que el frontend pueda acceder a la URL pública de la API. La API exporta `app` para facilitar su integración con plataformas como Vercel, aunque el comando local `npm run api` inicia un servidor Express tradicional.

## Calidad y validación

Antes de entregar cambios, ejecuta:

```bash
npm run lint
npm run build
```

No hay un script de pruebas automatizadas definido actualmente en `package.json`.

## Notas de desarrollo

- Mantén las credenciales y los archivos `.env` fuera del control de versiones.
- Si se modifica el modelo de una habitación, actualiza tanto la validación de [`api/index.js`](./api/index.js) como el tipo y el fallback de [`src/data/rooms.ts`](./src/data/rooms.ts).
- Si se añade una página, registra su ruta en [`src/App.tsx`](./src/App.tsx) y actualiza la navegación correspondiente.
- Los recursos estáticos se sirven desde `public`, por lo que sus rutas se resuelven desde `/Media/...`.
