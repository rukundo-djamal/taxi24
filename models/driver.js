const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PointSchema = require('./point');


const DriverSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    available:{
        type: Boolean,
        default: false
    },
    geometry: PointSchema
});


const Driver = mongoose.model('driver', DriverSchema);

module.exports = Driver;