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

// Listar
app.get("/animals", (req, res) => {
    connection.query('select * from animals', function(err, rows, fields) {
        if (err) throw err
        res.status(200).json({ 
            data: rows,
            status: 'success'
        });
    })
});

// Buscar pelo ID
app.get("/animals/:id", (req, res) => {
    let params = req.params
    let id = params.id
    connection.query('select * from animals where id = ?',[id], function(err, rows, fields) {
        if (err) throw err
        res.status(200).json({ 
            data: rows[0],
            status: 'success'
        });
    })
});

// Cadastrar
app.post("/animals", (req, res) => {
    let body = req.body
    let name = body.name
    connection.query('insert into animals(name) values(?)',[name], function(err) {
        if (err) throw err
        res.status(201).json({ 
            message: 'cadastrado com sucesso',
            status: 'success'
        });
    })
    
});

// Editar
app.put("/animals/:id", (req, res) => {
    let body = req.body
    let name = body.name
    let params = req.params
    let id = params.id
    connection.query('update animals set name = ? where id = ?',[name, id], function(err) {
        if (err) throw err
        res.status(201).json({ 
            message: 'atualizado com sucesso',
            status: 'success'
        });
    })
});

// Deletar
app.delete("/animals/:id", (req, res) => {
    let params = req.params
    let id = params.id
    connection.query('delete from animals where id = ?',[id], function(err) {
        if (err) throw err
        res.status(200).json({ 
            message: "deletado com sucesso",
            status: 'success'
        });
    })
});

app.listen(PORT, () => {
    console.log(`Servidor escutando na porta ${PORT}`);
});

module.exports = app;