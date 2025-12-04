// backend/index.js ACTUALIZADO
const express = require('express');
const cors = require('cors');
const http = require('http'); // Necesario para socket.io
const { Server } = require('socket.io'); // Importar socket.io
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const server = http.createServer(app); // Crear servidor HTTP
const io = new Server(server, {
    cors: {
        origin: "*", // Permitir conexiones desde cualquier frontend (dev)
        methods: ["GET", "POST", "PUT"]
    }
});

const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Guardar io en req para usarlo en las rutas
app.use((req, res, next) => {
    req.io = io;
    next();
});

// Rutas
app.use('/api/productos', require('./routes/productRoutes'));
app.use('/api/pedidos', require('./routes/orderRoutes')); // Actualizaremos este luego
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/cocina', require('./routes/kitchenRoutes')); // Nueva ruta

// WebSocket connection logic
io.on('connection', (socket) => {
    console.log('Cliente conectado a WebSocket:', socket.id);
    socket.on('disconnect', () => console.log('Cliente desconectado'));
    
    // Unirse a sala específica (opcional, ej: 'cocina')
    socket.join('kitchen_room');
});

// Usar server.listen en lugar de app.listen
server.listen(port, () => {
    console.log(`Server & WebSockets running on port ${port}`);
});