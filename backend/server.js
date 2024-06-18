const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tienda_streaming'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Conectado a la base de datos MySQL');
});

app.use(express.json());

app.get('/productos', (req, res) => {
    const sql = 'SELECT * FROM productos';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.post('/productos', (req, res) => {
    const producto = req.body;
    const sql = 'INSERT INTO productos SET ?';
    db.query(sql, producto, (err, result) => {
        if (err) throw err;
        res.json({ id: result.insertId });
    });
});

app.put('/productos/:id', (req, res) => {
    const id = req.params.id;
    const producto = req.body;
    const sql = 'UPDATE productos SET ? WHERE id = ?';
    db.query(sql, [producto, id], (err, result) => {
        if (err) throw err;
        res.json({ changedRows: result.changedRows });
    });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
