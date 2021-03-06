const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TripSchema = new Schema({
    driver: {   
        type: Schema.Types.ObjectId,
        refs: 'driver',
    },
    rider:{
        type: Schema.Types.ObjectId,
        refs: 'rider',
    },
    complete: {
        type: Boolean,
        default: false
    }
});


const Trip = mongoose.model('trip', TripSchema);

module.exports = Trip;