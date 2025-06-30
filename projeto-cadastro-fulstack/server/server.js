const express = require('express');
const path = require('path');
const db = require('path');
const db = require('./database');
const app = express();
const PORT =3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '..public')));

app.get('/records', (req, res) => {
  db.all('SELECT * FROM usuarios', (err, rows) => {
    if (err) return res.status(500).json({ error: 'erro ao buscar usuários.'});
    res.status(200).json(rows);
  });
});

app.post('/records', (req, res) => {
  const { name, age, date, email } = req.body;
  if ( !name || !age || !date || !email) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.'});
  }

  if (parseInt(age) <18) {
    return res.status(400).json({ error: 'Idade mínima é 18 anos.'});
  }

  const query = 'INSERT INTO usuarios (name, age, date, email)  VALUES (?, ?, ?, ?)';
  db.run(query, [name, age, date, email], function (err) {
    if (err) return res.status(500).json({ error: 'Erro ao inserir usuário.'});
    res.status(201).json({ message: 'Usuário cadastrado!', id: this.lastID });
  })

  app.delete('/records/:id', (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM usuarios WHERE id = ?', [id], function (err) {
      if (err) return res.status(500).json({ error: 'Erro ao remover usuário.'});
      res.status(200).json({ message: 'Usuário removido com sucesso.', changes: this.changes});
    })
  })
  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  })
});
