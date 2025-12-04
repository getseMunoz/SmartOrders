// backend/routes/kitchenRoutes.js
const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /api/cocina/orders (Solo pendientes o en preparación)
router.get('/orders', async (req, res) => {
    try {
        // Obtenemos órdenes con sus items
        const query = `
            SELECT o.id, o.table_number, o.status, o.created_at,
            json_agg(json_build_object('name', p.name, 'quantity', oi.quantity)) as items
            FROM orders o
            JOIN order_items oi ON o.id = oi.order_id
            JOIN products p ON oi.product_id = p.id
            WHERE o.status IN ('pending', 'preparing')
            GROUP BY o.id
            ORDER BY o.created_at ASC
        `;
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT /api/cocina/orders/:id/status
router.put('/orders/:id/status', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body; // 'preparing', 'ready'
    
    try {
        await pool.query('UPDATE orders SET status = $1 WHERE id = $2', [status, id]);
        
        // Notificar a todos por WebSocket que hubo un cambio
        // Esto refrescará automáticamente las pantallas de cocina y meseros
        req.io.emit('order_updated', { orderId: id, status });
        
        res.json({ message: 'Estado actualizado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;