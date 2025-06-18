const express = require('express');
const cors = require('cors');
const knex = require('knex');
const app = express();
const port = 5000;

// koneksi ke database MySQL
const db = knex(require('./knexfile').development);

// middleware
app.use(cors());
app.use(express.json()); // penting untuk parsing req.body dari JSON

// GET semua user
app.get('/users', async (req, res) => {
  try {
    const users = await db('users').select();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET user berdasarkan ID
app.get('/users/:id', async (req, res) => {
  try {
    const user = await db('users').where('id', req.params.id).first();
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST tambah user baru
app.post('/users', async (req, res) => {
  const { name, email } = req.body;
  try {
    await db('users').insert({ name, email });
    res.sendStatus(201);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT edit/update user
app.put('/users/:id', async (req, res) => {
  const { name, email } = req.body;
  try {
    const updated = await db('users').where('id', req.params.id).update({ name, email });
    if (updated === 0) return res.status(404).json({ error: 'User not found' });
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE user
app.delete('/users/:id', async (req, res) => {
  try {
    const deleted = await db('users').where('id', req.params.id).del();
    if (deleted === 0) return res.status(404).json({ error: 'User not found' });
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// start server
app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
