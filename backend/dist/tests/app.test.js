"use strict";

var _assert = _interopRequireDefault(require("assert"));

var _supertest = _interopRequireDefault(require("supertest"));

var _app = _interopRequireDefault(require("../app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
*Testing get all users endpoint
*/
//describe agrupa tests
describe('GET /users', () => {
  it('respond with json containing a list of all users', done => {
    (0, _supertest.default)(_app.default).get('/users').set('Accept', 'application/json').expect('Content-Type', /json/).expect(200, done);
  });
});
describe('GET /products', () => {
  it('respond with json containing a list of all products', done => {
    (0, _supertest.default)(_app.default).get('/products').set('Accept', 'application/json').expect('Content-Type', /json/).expect(200, done);
  });
});
describe('/GET /products/:id', () => {
  it('respond with json containing a single product', done => {
    (0, _supertest.default)(_app.default).get('/products/U0001').set('Accept', 'application/json').expect('Content-Type', /json/).expect(200, done);
  });
  it('respond with json "product not found" when the product does not exists', done => {
    (0, _supertest.default)(_app.default).get('/products/nonexistingproduct').set('Accept', 'application/json').expect('Content-Type', /json/).expect(404).expect('"Product not found"').end(err => {
      if (err) return done(err);
      done();
    });
  });
});
describe('POST /products', () => {
  it('respond with code 201 created', done => {
    var data = {
      name: 'phone',
      stock: 4
    };
    (0, _supertest.default)(_app.default).post('/products').send(data).set('Accept', 'application/json').expect('Content-Type', /json/).expect(201).expect({
      success: true,
      message: 'Product has been created'
    }).end(err => {
      if (err) return done(err);
      done();
    });
  });
  it('respond with code 400 bad request', done => {
    var data = {
      name: 'mouse'
    };
    (0, _supertest.default)(_app.default).post('/products').send(data).set('Accept', 'application/json').expect('Content-Type', /json/).expect(400).expect({
      success: false,
      message: 'Bad Request'
    }).end(err => {
      if (err) return done(err);
      done();
    });
  });
});
/*
describe('Express app', () => {

    it('Handles GET request /api/greeting', app => {
        request(app)
            .get('/api/greeting')
            .end((err, response) => {
                assert(response.body.greeting === 'Hi Robots');
                done();
            })
    })
})
*/