const express = require('express');
const app = express();
const path = require('path');
const recordsRoutes = require('./routes/records');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/records', recordsRoutes);

app.listen(3000, () => console.log('Servidor rodando em http://localhost:3000'));
