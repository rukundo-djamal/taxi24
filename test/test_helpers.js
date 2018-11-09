const mongoose = require('mongoose');

before(done => {
    mongoose.connect('mongodb://localhost/taxi24test', { useNewUrlParser: true });

    mongoose.connection
        .once('open', () => done())
        .on('error', (err) => {
            console.log(err);
            done();
        });
})


