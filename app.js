const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const Animal = require('./models/Animal');
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
        let animals = []
        rows.forEach(function(row){
            let animal = new Animal()
            animal.id = row.id
            animal.name = row.name
            animals.push(animal)
        })
        res.status(200).json({ 
            data: animals,
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
        if (rows.length <1){
             res.status(404).json({ 
                message: "animal não encontrado",
                status: 'fail'
            });
            return
        }
        let animal = new Animal()
        animal.id = rows[0].id
        animal.name = rows[0].name
        res.status(200).json({ 
            data: animal,
            status: 'success'
        });
    })
});

// Cadastrar
app.post("/animals", (req, res) => {
    let body = req.body
    let animal = new Animal()
    animal.name = body.name
    connection.query('insert into animals(name) values(?)',[animal.name], function(err) {
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
    let animal = new Animal()
    animal.name = body.name
    let params = req.params
    animal.id = params.id
    connection.query('select * from animals where id = ?',[animal.id], function(err, rows, fields) {
        if (err) throw err
        if (rows.length <1){
             res.status(404).json({ 
                message: "animal não encontrado",
                status: 'fail'
            });
            return
        }
        connection.query('update animals set name = ? where id = ?',[animal.name, animal.id], function(err) {
            if (err) throw err
            res.status(200).json({ 
                message: 'atualizado com sucesso',
                status: 'success'
            });
        })
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