const assert = require('assert');
const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');
const Trip = mongoose.model('trip');
const Rider = mongoose.model('rider');
const Driver = mongoose.model('driver');
describe('trip controller test', () => {
    beforeEach((done) => {
        Promise.all([
            Driver.create({ username: "kalisa", available: true, geometry: { type: 'Point', coordinates: [-80.253, 25.791] }, },),
            Rider.create({ username: "rukundo", geometry: { type: 'Point', coordinates: [30.052929, -1.977350] }, },)
        ])
        .then((prom) => {
            const driver = prom[0];
            const rider = prom[1];
            Trip.create({
                driver: driver._id,
                rider: rider._id
            }).then((trip) => done());
        })
        
    });


    it('POST to /api/trip to initiate a trip',done => {
        Promise.all([
            Driver.findOne({}),
            Rider.findOne({})
        ])
        .then((prom) => {
            const driver = prom[0];
            const rider = prom[1];

            request(app)
            .post('/api/trip')
            .send({
                driver: driver._id,
                rider: rider._id
            })
            .end((_, res) => {
                done();
            })
        })
       
    })

    it('PUT to /api/trip/:id to complete the trip', done => {
        Trip.findOne({})
        .then((trip) => {
            request(app)
            .put(`/api/trip/${trip._id}`)
            .end((_, res) => {
                assert(res.body.trip == trip._id);
                done();
            });
        });

    });

    it('GET /api/trips to get all active trips', done => {
        request(app)
        .get('/api/trips')
        .end((_, res) => {
            assert(res.body.length === 1);
            done();
        });
    })

    afterEach((done) => {
        const { trips, drivers, riders } = mongoose.connection.collections;
        Promise.all([
            trips.drop(),
            riders.drop(),
            drivers.drop()
        ])
        .then((val) => {
            riders.ensureIndex({ 'geometry.coordinates': '2dsphere' })
            drivers.ensureIndex({ 'geometry.coordinates': '2dsphere' })
            done();
        })
    })

});