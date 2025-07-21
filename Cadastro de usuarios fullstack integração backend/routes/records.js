const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM usuarios');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao buscar usuários' });
  }
});

router.post('/', async (req, res) => {
  const { name, age, email, date } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO usuarios (name, age, email, date) VALUES (?, ?, ?, ?)',
      [name, age, email, date]
    );
    res.json({ message: 'Usuário cadastrado com sucesso!', id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao cadastrar no banco de dados.' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM usuarios WHERE id = ?', [id]);
    res.json({ message: 'Usuário excluído com sucesso!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao excluir usuário.' });
  }
});

module.exports = router;
