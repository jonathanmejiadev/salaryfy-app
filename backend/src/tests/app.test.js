import assert from 'assert';
import request from 'supertest';
import app from '../app';

/*
*Testing get all users endpoint
*/

describe('GET /users', () => {
    it('respond with json containing a list of all users', done => {
        request(app)
            .get('/users')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

describe('GET /products', () => {
    it('respond with json containing a list of all products', done => {
        request(app)
            .get('/products')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

describe('/GET /products/:id', () => {
    it('respond with json containing a single product', done => {
        request(app)
            .get('/products/U0001')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('respond with json "product not found" when the product does not exists', done => {
        request(app)
            .get('/products/nonexistingproduct')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404)
            .expect('"Product not found"')
            .end((err) => {
                if (err) return done(err);
                done();
            })
    });
});

describe('POST /products', () => {
    it('respond with code 201 created', done => {
        const data = {
            name: 'phone',
            stock: 4
        }
        request(app)
            .post('/products')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .expect({
                success: true,
                message: 'Product has been created'
            })
            .end(err => {
                if (err) return done(err)
                done();
            })
    });

    it('respond with code 400 bad request', done => {
        const data = {
            name: 'mouse'
        }
        request(app)
            .post('/products')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .expect({
                success: false,
                message: 'Bad Request'
            })
            .end(err => {
                if (err) return done(err);
                done();
            })

    })
});
