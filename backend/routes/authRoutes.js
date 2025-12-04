// backend/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const pool = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// POST /api/auth/login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'User not found' });

        const user = result.rows[0];
        const validPassword = await bcrypt.compare(password, user.password_hash);
        
        if (!validPassword) return res.status(401).json({ error: 'Invalid password' });

        const token = jwt.sign(
            { id: user.id, role: user.role, name: user.name },
            process.env.JWT_SECRET || 'secret_key_dev',
            { expiresIn: '8h' }
        );

        res.json({ token, role: user.role, name: user.name });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST /api/auth/register (Solo para inicializar usuarios de prueba)
router.post('/register', async (req, res) => {
    const { name, email, password, role } = req.body;
    const hash = await bcrypt.hash(password, 10);
    try {
        await pool.query(
            'INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4)',
            [name, email, hash, role]
        );
        res.status(201).json({ message: 'User created' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;