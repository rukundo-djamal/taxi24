const assert = require('assert');
const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');
const Driver = mongoose.model('driver');



describe('driver controller test', () => {
    beforeEach((done) => {
        Driver.create([
            { username: "kalisa", available: true, geometry: { type: 'Point', coordinates: [-80.253, 25.791] }, },
            { username: "djamal", available: false, geometry: { type: 'Point', coordinates: [-122.4759902, 47.6147628] } }
        ])
        .then((val) => done());
    });
    afterEach((done) => {
        const { drivers } = mongoose.connection.collections;
        drivers.drop()
            .then(() => drivers.ensureIndex({ 'geometry.coordinates': '2dsphere' }))
            .then(() => done())
            .catch(() => done());
    })
    it('POST /api/drivers to create a driver', done => {
        request(app)
            .post('/api/drivers')
            .send(({ username: 'dj' }))
            .end((_, res) => {
                assert(res.body.username === 'dj');
                done();
            });
    })

    it('GET /api/drivers to get all drivers', done => {
        request(app)
            .get('/api/alldrivers')
            .end((_, res) => {
                assert(res.body.length === 2);
                done();
            });
    })

    it('GET /api/drivers/available to get all available drivers', done => {
        request(app)
            .get('/api/drivers/available')
            .end((_, res) => {
                assert(res.body.length === 1);
                done();
            });
    })

    it('GET /api/drivers:id to get driver by id', done => {
        Driver.create({ username: 'kilom', })
            .then((one) => {
                request(app)
                    .get(`/api/drivers/${one._id}`)
                    .end((_, res) => {
                        assert(res.body._id == one._id);
                        done();
                    });
            });
    });

    it('GET to /api/drivers?lng=value&lat=value finds driver in a location', done => {
        request(app)
            .get('/api/drivers?lng=-80.253&lat=25.791')
            .end((_, res) => {
                assert(res.body[0].username === 'kalisa');
                done();
            });
    });

    it('GET to /api/drivers/:id/near to get a list of the 3 closest drivers', done => {
        Driver.create({ username: "kevin", geometry: { type: 'Point', coordinates: [30.062027, -1.978176] } })
        .then( driver => {
            request(app)
            .get(`/api/drivers/${driver._id}/near`)
            .end((_, res) => {
                assert(res.body[0].username === 'kalisa');
                done();
            });
        });

    });

});