module.exports = function (app) {

    const mysql = require('mysql2');
    const jwt = require('jsonwebtoken');
    const bcrypt = require('bcrypt');
    const Animal = require('./models/Animal');
    const AnimalRepository = require('./repositories/AnimalRepository');
    const authMiddleware = require('./middlewares/auth');
    const connection = mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    })

    connection.connect()

    const animalRepository = new AnimalRepository(connection);

    app.post('/login', async (req, res) => {
        const { name, password } = req.body;
        connection.query('select * from users where name = ?',[name], function(err, rows, fields) {
            if (err) throw err
            if (rows.length <1){
                res.status(404).json({ 
                    message: "Credenciais inválidas1",
                    status: 'fail'
                });
                return
            }
            row = rows[0]
            try {
                const passwordOk = bcrypt.compare(password, row.password);
                if (!passwordOk) {
                    return res.status(401).json({
                        message: 'Credenciais inválidas2',
                        status: 'fail'
                    });
                }
                const payload = { id: row.id, name: row.name };

                const token = jwt.sign(
                    payload,
                    process.env.JWT_SECRET,
                    { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
                );

                return res.status(200).json({
                    token,
                    status: 'success'
                });
            } catch (err) {
                console.error(err);
                return res.status(500).json({
                    message: 'erro ao autenticar',
                    status: 'error'
                });
            }
        })

       
    });

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

    app.post("/animals", authMiddleware, async (req, res) => {
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

    app.put("/animals/:id", authMiddleware, async (req, res) => {
        try {
            let body = req.body
            let animal = new Animal()
            animal.name = body.name
            let params = req.params
            animal.id = params.id
            const affected = await animalRepository.update(animal);
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

    app.delete("/animals/:id", authMiddleware, async (req, res) => {
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