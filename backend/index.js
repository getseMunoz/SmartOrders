const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
//productRoutes
const productRoutes = require('./routes/productRoutes');
app.use('/api/productos', productRoutes);

//orderRoutes 
const orderRoutes = require('./routes/orderRoutes');
app.use('/api/pedidos', orderRoutes);

// Importar la conexión a la base de datos
const pool = require('./db'); 

const app = express();
const port = process.env.PORT || 3000;

// Middlewares (Configuraciones)
app.use(cors());
app.use(express.json()); // Para entender datos JSON
app.use(morgan('dev'));  // Para ver en la consola quién entra

// --- RUTA DE PRUEBA (LA QUE TE FALTABA) ---
app.get('/test', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ 
      mensaje: "¡Servidor y Base de Datos funcionando correctamente!", 
      hora_servidor: new Date().toISOString(),
      hora_base_datos: result.rows[0].now 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error conectando a la BD: " + error.message });
  }
});

// Arrancar el servidor
app.listen(port, () => {
  console.log(`✅ Servidor corriendo en el puerto ${port}`);
});