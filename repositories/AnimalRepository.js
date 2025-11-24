const Animal = require('../models/Animal');
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'usuario_app',
  password: 'senha_forte_123',
  database: 'db_animals'
})

connection.connect()
class AnimalRepository {

    async findAll() {
        const [rows] = await connection.promise().query('select * from animals')
        let animals = []
        rows.forEach(function(row){
                let animal = new Animal()
                animal.id = row.id
                animal.name = row.name
                animals.push(animal)
            })
        return animals
    }

    findByID(id) {

    }
    save(body){

    }
    update(id,body){

    }
    delete(id){

    }
}

module.exports = AnimalRepository;