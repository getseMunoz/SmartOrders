const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /api/productos (con filtros)
router.get('/', async (req, res) => {
  try {
    const { category_id } = req.query;
    let query = 'SELECT * FROM products WHERE active = true';
    let params = [];
    
    if (category_id) {
      query += ' AND category_id = $1';
      params.push(category_id);
    }
    
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/productos/:id/stock (Actualizar inventario) [cite: 38]
router.put('/:id/stock', async (req, res) => {
  try {
    const { id } = req.params;
    const { stock } = req.body;
    await pool.query('UPDATE products SET stock = $1 WHERE id = $2', [stock, id]);
    res.json({ message: 'Stock updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;