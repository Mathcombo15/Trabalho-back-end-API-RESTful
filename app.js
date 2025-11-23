const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'usuario_app',
  password: 'senha_forte_123',
  database: 'db_animals'
})

connection.connect()

app.get("/animals", (req, res) => {
     connection.query('select * from animals', function(err, rows, fields) {
        if (err) throw err
        res.status(200).json({ 
            message: rows,
            status: 'success1'
        });
    })
});

app.get("/animals/:id", (req, res) => {
    res.status(200).json({ 
        message: 'Buscar um animal',
        status: 'success'
    });
});

app.post("/animals", (req, res) => {
    let name = 'onca pintada'
    connection.query('insert into animals(name) values(?)',[name], function(err) {
        if (err) throw err
        res.status(200).json({ 
            message: 'cadastrado com sucesso',
            status: 'success1'
        });
    })
    
});

app.put("/animals/:id", (req, res) => {
    res.status(200).json({ 
        message: 'Editar animal',
        status: 'success'
    });
});

app.delete("/animals/:id", (req, res) => {
    res.status(200).json({ 
        message: 'Deletar animal',
        status: 'success'
    });
});

app.listen(PORT, () => {
    console.log(`Servidor escutando na porta ${PORT}`);
});

module.exports = app;