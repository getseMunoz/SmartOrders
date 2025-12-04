const express = require('express');
const router = express.Router();
const pool = require('../db');

// POST /api/pedidos [cite: 34]
router.post('/', async (req, res) => {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN'); // Inicia Transacción ACID

    const { user_id, table_number, items } = req.body;
    // items = [{ product_id: 1, quantity: 2 }, ...]

    // 1. Crear la orden cabecera
    const orderRes = await client.query(
      'INSERT INTO orders (user_id, table_number) VALUES ($1, $2) RETURNING id',
      [user_id, table_number]
    );
    const orderId = orderRes.rows[0].id;
    let total = 0;

    // 2. Procesar cada item
    for (const item of items) {
      // Verificar Stock [cite: 41]
      const prodRes = await client.query('SELECT price, stock FROM products WHERE id = $1', [item.product_id]);
      const product = prodRes.rows[0];

      if (product.stock < item.quantity) {
        throw new Error(`Stock insuficiente para producto ${item.product_id}`);
      }

      // Restar Stock
      await client.query('UPDATE products SET stock = stock - $1 WHERE id = $2', [item.quantity, item.product_id]);

      // Insertar item
      await client.query(
        'INSERT INTO order_items (order_id, product_id, quantity, unit_price) VALUES ($1, $2, $3, $4)',
        [orderId, item.product_id, item.quantity, product.price]
      );

      total += product.price * item.quantity;
    }

    // 3. Actualizar total orden
    await client.query('UPDATE orders SET total = $1 WHERE id = $2', [total, orderId]);

    await client.query('COMMIT'); // Confirmar Transacción
    res.status(201).json({ message: 'Order created', orderId, total });

  } catch (err) {
    await client.query('ROLLBACK'); // Revertir si hay error
    res.status(400).json({ error: err.message });
  } finally {
    client.release();
  }
});

module.exports = router;