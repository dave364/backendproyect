import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../src/app'; // Importa tu aplicación Express aquí

const expect = chai.expect;
chai.use(chaiHttp);

// Describe tus pruebas
describe('Products Service', () => {
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

  // Prueba para agregar un nuevo producto (suponiendo que tengas una lógica de servicio)
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


});
