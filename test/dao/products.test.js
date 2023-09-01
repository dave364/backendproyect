import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../src/app'; // Importa tu aplicación Express aquí

const expect = chai.expect;
chai.use(chaiHttp);

// Importa tu modelo de productos
const Product = require('../../src/dao/model/Product.js');

// Describe tus pruebas
describe('Products DAO', () => {
  // Antes de ejecutar las pruebas, puedes configurar una conexión a una base de datos de prueba
  before((done) => {
    mongoose.connect('mongodb+srv://castrodavid9872:ItNaMTm4F5cwWs0v@cluster364da.jqgneo9.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useCreateIndex: true });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', () => {
      console.log('Conectado a la base de datos de prueba');
      done();
    });
  });

  // Después de las pruebas, cierra la conexión a la base de datos
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(() => {
        console.log('Conexión cerrada');
        done();
      });
    });
  });

  // Prueba para agregar un nuevo producto
  it('Debería agregar un nuevo producto', (done) => {
    const newProduct = { name: 'Producto de prueba', price: 10 };
    chai
      .request(app)
      .post('/api/products')
      .send(newProduct)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        done();
      });
  });

  // Prueba para obtener una lista de productos
  it('Debería obtener una lista de productos', (done) => {
    chai
      .request(app)
      .get('/api/products')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });


});
