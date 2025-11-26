const Animal = require('../models/Animal');
class AnimalRepository {

    constructor(connection) {
        this.conn = connection
    }
    async findAll() {
        const [rows] = await this.conn.promise().query('select * from animals');
        const animals = [];
        rows.forEach(function(row){
            const animal = new Animal();
            animal.id = row.id;
            animal.name = row.name;
            animals.push(animal);
        });
        return animals;
    }

    async findByID(id) {
        const [rows] = await this.conn
            .promise()
            .query('select * from animals where id = ?', [id]);
        if (rows.length < 1) {
            return null;
        }
        const row = rows[0];
        const animal = new Animal();
        animal.id = row.id;
        animal.name = row.name;
        return animal;
    }

    async save(body) {
        const animal = new Animal();
        animal.name = body.name;
        const [result] = await this.conn
            .promise()
            .query('insert into animals(name) values(?)', [animal.name]);
        animal.id = result.insertId;
        return animal;
    }

    async update(body) {
        const [result] = await this.conn
            .promise()
            .query('update animals set name = ? where id = ?', [body.name, body.id]);
        return result.affectedRows;
    }

    async delete(id) {
        const [result] = await this.conn
            .promise()
            .query('delete from animals where id = ?', [id]);

        return result.affectedRows;
    }
}

module.exports = AnimalRepository;