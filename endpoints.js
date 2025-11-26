module.exports = function (app) {

    const mysql = require('mysql2');
    const Animal = require('./models/Animal');
    const AnimalRepository = require('./repositories/AnimalRepository');
    const connection = mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'usuario_app',
        password: 'senha_forte_123',
        database: 'db_animals'
    })

    connection.connect()

    const animalRepository = new AnimalRepository(connection);

    
    app.get("/animals", async (req, res) => {
        try {
            const animals = await animalRepository.findAll();
            res.status(200).json({
                data: animals,
                status: 'success'
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({
                message: 'erro ao listar animais',
                status: 'error'
            });
        }
    });

    app.get("/animals/:id", async (req, res) => {
        try {
            const { id } = req.params;
            const animal = await animalRepository.findByID(id);
            if (!animal) {
                res.status(404).json({
                    message: "animal não encontrado",
                    status: 'fail'
                });
                return;
            }
            res.status(200).json({
                data: animal,
                status: 'success'
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({
                message: 'erro ao buscar animal',
                status: 'error'
            });
        }
    });

    app.post("/animals", async (req, res) => {
        try {
            let body = req.body
            let animal = new Animal()
            animal.name = body.name
            await animalRepository.save(animal);
            res.status(201).json({
                message: 'cadastrado com sucesso',
                status: 'success'
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({
                message: 'erro ao cadastrar animal',
                status: 'error'
            });
        }
    });

    app.put("/animals/:id", async (req, res) => {
        try {
            let body = req.body
            let animal = new Animal()
            animal.name = body.name
            let params = req.params
            animal.id = params.id
            const affected = await animalRepository.update(id, animal);
            if (affected === 0) {
                res.status(404).json({
                    message: "animal não encontrado",
                    status: 'fail'
                });
                return;
            }
            res.status(200).json({
                message: 'atualizado com sucesso',
                status: 'success'
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({
                message: 'erro ao atualizar animal',
                status: 'error'
            });
        }
    });

    app.delete("/animals/:id", async (req, res) => {
        try {
            const { id } = req.params;
            await animalRepository.delete(id);
            res.status(200).json({
                message: "deletado com sucesso",
                status: 'success'
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({
                message: 'erro ao deletar animal',
                status: 'error'
            });
        }
    });
};