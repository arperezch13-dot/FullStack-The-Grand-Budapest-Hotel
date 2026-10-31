/* Base de datos "GHBudapestRoom", colección "Rooms" */

import 'dotenv/config';
import dns from 'node:dns';
// Algunas redes rechazan la consulta DNS de mongodb+srv: se usa el DNS de Google
dns.setServers(['8.8.8.8', '1.1.1.1']);
import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
//  1. Configuración y conexión 
const port = Number(process.env.PORT) || 3001;
const DB_NAME = 'GHBudapestRoom';
// Nombre de la colección de la base de datos
const collections = {
    rooms: 'Rooms',
};
let client = null;
let dbPromise = null;
/* Conecta con MongoDB una sola vez y reutiliza la conexión */
function connectDb() {
    if (!dbPromise) {
        const uri = process.env.MONGODB_URI;
        if (!uri)
            return Promise.reject(new Error('Falta la variable MONGODB_URI'));
        client = new MongoClient(uri);
        dbPromise = client
            .connect()
            .then(() => client.db(DB_NAME))
            .catch((error) => {
            dbPromise = null; // si falla, se vuelve a intentar en la siguiente petición
            throw error;
        });
    }
    return dbPromise;
}
const app = express();
// Convierte el cuerpo JSON de las peticiones (POST y PUT) en un objeto: req.body
app.use(express.json());
// Permiso para que la web (otro puerto, p. ej. 5173) pueda llamar a esta API con fetch.
// Es la versión "a mano" del paquete cors: no hace falta instalar nada.
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') {
        res.status(204).end();
        return;
    }
    next();
});
//  2. Middlewares 
// MIDDLEWARE PARA VALIDAR OBJECT ID
const validateId = (req, res, next) => {
    const { id } = req.params;
    if (!ObjectId.isValid(String(id))) {
        res.status(400).json({ success: false, error: 'ID inválido' });
        return;
    }
    next();
};
// MIDDLEWARE PARA CARGAR LA COLECCIÓN POR RECURSO
// Se asegura de que hay conexión y deja la colección en res.locals.collection
const useCollection = (nameCollection) => async (_req, res, next) => {
    try {
        const db = await connectDb();
        res.locals.collection = db.collection(nameCollection);
        next();
    }
    catch (error) {
        next(error);
    }
};
const isText = (value) => typeof value === 'string' && value.trim().length > 0;
// MIDDLEWARE PARA VALIDAR Y LIMPIAR LOS DATOS DE UNA HABITACIÓN (POST y PUT)
const validateRoom = (req, res, next) => {
    const data = (req.body ?? {});
    let error = '';
    if (!isText(data.slug) || !/^[a-z0-9-]+$/.test(data.slug))
        error = 'slug inválido (solo minúsculas, números y guiones)';
    else if (!isText(data.name))
        error = 'name es obligatorio';
    else if (!isText(data.category))
        error = 'category es obligatorio';
    else if (typeof data.price !== 'number' || !Number.isFinite(data.price) || data.price < 0)
        error = 'price debe ser un número positivo';
    else if (!isText(data.description))
        error = 'description es obligatorio';
    else if (!Array.isArray(data.amenities) || !data.amenities.every(isText))
        error = 'amenities debe ser una lista de textos';
    if (error) {
        res.status(400).json({ success: false, error });
        return;
    }
    // Solo se guardan los campos esperados 
    req.body = {
        slug: String(data.slug).trim(),
        name: String(data.name).trim(),
        category: String(data.category).trim(),
        price: data.price,
        description: String(data.description).trim(),
        amenities: data.amenities.map((item) => item.trim()),
    };
    next();
};
const createRouterCrud = (nameResource, nameCollection, validateBody) => {
    const router = express.Router();
    const checkBody = validateBody ? [validateBody] : [];
    router.use(useCollection(nameCollection));
    // Leer todos
    router.get('/', async (_req, res, next) => {
        try {
            const list = await res.locals.collection.find({}).sort({ price: -1 }).toArray();
            res.json({ success: true, recurso: nameResource, total: list.length, data: list });
        }
        catch (error) {
            next(error);
        }
    });
    // Crear
    router.post('/', ...checkBody, async (req, res, next) => {
        try {
            const result = await res.locals.collection.insertOne(req.body);
            res.status(201).json({ success: true, message: `${nameResource} creado`, insertedId: result.insertedId });
        }
        catch (error) {
            next(error);
        }
    });
    // Modificar
    router.put('/:id', validateId, ...checkBody, async (req, res, next) => {
        try {
            const result = await res.locals.collection.updateOne({ _id: new ObjectId(String(req.params.id)) }, { $set: req.body });
            if (result.matchedCount === 0) {
                res.status(404).json({ success: false, message: `${nameResource} no encontrado` });
                return;
            }
            res.json({ success: true, message: `${nameResource} actualizado`, modifiedCount: result.modifiedCount });
        }
        catch (error) {
            next(error);
        }
    });
    // Borrar
    router.delete('/:id', validateId, async (req, res, next) => {
        try {
            const result = await res.locals.collection.deleteOne({ _id: new ObjectId(String(req.params.id)) });
            if (result.deletedCount === 0) {
                res.status(404).json({ success: false, message: `${nameResource} no encontrado` });
                return;
            }
            res.json({ success: true, message: `${nameResource} eliminado`, deletedCount: result.deletedCount });
        }
        catch (error) {
            next(error);
        }
    });
    return router;
};
// 4. Rutas: se monta un CRUD por colección 
app.use('/api/rooms', createRouterCrud('Habitación', collections.rooms, validateRoom));
// Cualquier otra ruta /api/... que no exista
app.use('/api', (_req, res) => {
    res.status(404).json({ success: false, error: 'Ruta no encontrada' });
});
// 5. Middleware de errores globales 
app.use((err, _req, res, next) => {
    console.error('Error no controlado:', err.message);
    if (res.headersSent) {
        next(err);
        return;
    }
    res.status(err.statusCode || 500).json({ success: false, error: err.message || 'Error interno del Server' });
});
// 6. Arranque y cierre del servidor
// Levanta el servidor + inicializa la base de datos (solo en local)
const initServer = async () => {
    try {
        await connectDb();
        console.log(`Connected to MongoDB, database: ${DB_NAME}`);
        app.listen(port, () => {
            console.log(`API lista en http://localhost:${port}`);
            console.log(' Rutas disponibles:');
            console.log(' GET|POST|PUT|DELETE /api/rooms');
        });
    }
    catch (error) {
        console.error('Failed to connect to MongoDB', error);
        process.exit(1);
    }
};
// Cierra la conexión con MongoDB al parar el servidor 
const closeServer = async (signal) => {
    try {
        await client?.close();
        console.log(`MongoDB connection closed (${signal})`);
        process.exit(0);
    }
    catch (error) {
        console.error('Error closing MongoDB connection', error.message);
        process.exit(1);
    }
};
process.on('SIGINT', () => closeServer('SIGINT'));
process.on('SIGTERM', () => closeServer('SIGTERM'));
initServer();


export default app;
