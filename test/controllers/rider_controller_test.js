const assert = require('assert');
const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');
const Rider = mongoose.model('rider');


describe('rider test', () => {

    beforeEach((done) => {
        Rider.create([
            { username: "rukundo", geometry: { type: 'Point', coordinates: [30.052929, -1.977350] }, },
            { username: "kalisa", geometry: { type: 'Point', coordinates: [30.068550, -1.971314] }, },
        ]).then((val) => done());
    });

    afterEach((done) => {
        const { riders } = mongoose.connection.collections;
        riders.drop()
            .then(() => riders.ensureIndex({ 'geometry.coordinates': '2dsphere' }))
            .then(() => done())
            .catch(() => done());
    })

    it('POST to /api/rider to create a rider', done => {
        request(app)
            .post('/api/rider')
            .send({ username: "kevin", geometry: { type: 'Point', coordinates: [30.062027, -1.978176] } })
            .end((_, res) => {
                assert(res.body.username === 'kevin');
                done();
            })
    })

    it('GET to /api/riders to get all riders', done => {
        request(app)
            .get('/api/riders')
            .end((_, res) => {
                assert(res.body.length === 2);
                done();
            })
    })

    it('GET to /api/rider/:id to get a specific rider', done => {
        Rider.create({ username: "kevin", geometry: { type: 'Point', coordinates: [30.062027, -1.978176] } })
        .then( rider => {
            request(app)
            .get(`/api/rider/${rider._id}`)
            .end((_, res) => {
                assert(res.body.username === 'kevin');
                done();
            })
        })

    });
});