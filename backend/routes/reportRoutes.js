const express = require('express');
const router = express.Router();
const pool = require('../db');
const { verifyToken, verifyRole } = require('../middleware/auth');

// GET /api/reportes/ventas
// Solo el admin puede ver esto
router.get('/ventas', verifyToken, verifyRole(['admin']), async (req, res) => {
    try {
        // Consulta: Suma de ventas agrupadas por fecha
        const ventasPorDia = await pool.query(`
            SELECT 
                TO_CHAR(created_at, 'YYYY-MM-DD') as fecha,
                COUNT(*) as total_pedidos,
                SUM(total) as total_ventas
            FROM orders
            WHERE status != 'cancelled'
            GROUP BY TO_CHAR(created_at, 'YYYY-MM-DD')
            ORDER BY fecha DESC
            LIMIT 7; -- Últimos 7 días
        `);

        // Consulta: Productos más vendidos (Top 5)
        const productosTop = await pool.query(`
            SELECT 
                p.name,
                SUM(oi.quantity) as cantidad_vendida
            FROM order_items oi
            JOIN products p ON oi.product_id = p.id
            GROUP BY p.name
            ORDER BY cantidad_vendida DESC
            LIMIT 5;
        `);

        res.json({
            ventas_diarias: ventasPorDia.rows,
            productos_top: productosTop.rows
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;