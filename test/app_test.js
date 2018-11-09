const assert = require('assert');
const request = require('supertest');
const app = require('../app');

describe('app test', () => {
    it('GET to /api to get welcome message', done => {
        request(app)
        .get('/api')
        .end((err, res) => {
            assert(res.body.message === 'welcome to taxi24 api');
            done();
        })
    });
});