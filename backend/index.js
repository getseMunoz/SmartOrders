// backend/index.js CORREGIDO
const express = require('express');
const cors = require('cors');
const http = require('http'); // Necesario para socket.io
const { Server } = require('socket.io'); // Importar socket.io
const morgan = require('morgan');
require('dotenv').config();

// 1. Configuración Inicial
const app = express();
const server = http.createServer(app); // Crear servidor HTTP
const io = new Server(server, {
    cors: {
        origin: "*", // Permitir conexiones desde cualquier frontend
        methods: ["GET", "POST", "PUT"]
    }
});

const port = process.env.PORT || 3000;

// 2. Middlewares (Configuraciones)
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Middleware para inyectar 'io' en cada petición (para notificar a cocina)
app.use((req, res, next) => {
    req.io = io;
    next();
});

// 3. Rutas de la API 
// Es importante importar las rutas AQUÍ, después de crear 'app'
app.use('/api/productos', require('./routes/productRoutes'));
app.use('/api/pedidos', require('./routes/orderRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/cocina', require('./routes/kitchenRoutes'));
app.use('/api/reportes', require('./routes/reportRoutes')); // <-- Tu nueva ruta de reportes 

// Ruta de prueba (La mantenemos para verificar que la BD sigue conectada)
app.get('/test', async (req, res) => {
  try {
    const result = await require('./db').query('SELECT NOW()');
    res.json({ 
      mensaje: "¡Backend funcionando correctamente!", 
      hora_db: result.rows[0].now 
    });
  } catch (error) {
    res.status(500).json({ error: "Error BD: " + error.message });
  }
});

// 4. Lógica de WebSockets (Tiempo Real) 
io.on('connection', (socket) => {
    console.log('Cliente conectado a WebSocket:', socket.id);
    
    // Unirse a la sala de cocina
    socket.join('kitchen_room');

    socket.on('disconnect', () => console.log('Cliente desconectado'));
});

// 5. Arrancar el servidor
server.listen(port, () => {
    console.log(`✅ Servidor y WebSockets corriendo en el puerto ${port}`);
});