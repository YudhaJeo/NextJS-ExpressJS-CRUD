const express = require('express');
const cors = require('cors');
const knex = require('knex');
const app = express();
const port = 5000;

const db = knex(require('./knexfile').development);

app.use(cors());
app.use(express.json());

// GET all users
app.get('/users', async (req, res) => {
  const users = await db('users').select();
  res.json(users);
});

// GET user by id
app.get('/users/:id', async (req, res) => {
  const user = await db('users').where('id', req.params.id).first();
  res.json(user);
});

// POST add user
app.post('/users', async (req, res) => {
  const { name, email } = req.body;
  await db('users').insert({ name, email });
  res.sendStatus(201);
});

// PUT update user
app.put('/users/:id', async (req, res) => {
  const { name, email } = req.body;
  await db('users').where('id', req.params.id).update({ name, email });
  res.sendStatus(200);
});

// DELETE user
app.delete('/users/:id', async (req, res) => {
  await db('users').where('id', req.params.id).del();
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
