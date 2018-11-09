const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PointSchema = require('./point');

const RiderSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    geometry: PointSchema
});

const Rider = mongoose.model('rider', RiderSchema);
module.exports = Rider;