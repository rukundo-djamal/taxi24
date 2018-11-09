const DriverController = require('../controllers/driver_controller');
const RiderController = require('../controllers/rider_controller');
const TripController = require('../controllers/trip_controller');


module.exports = (app) => {
    ///Driver's routes

    ///used to welcom api users 
    app.get('/api', DriverController.welcome);
    ///get all drivers
    app.get('/api/alldrivers', DriverController.getAll);
    ///create a driver
    app.post('/api/drivers', DriverController.create);
    /// get all available drivers
    app.get('/api/drivers/available', DriverController.available);
    ///Get a list of all available drivers within 3km for a specific location
    app.get('/api/drivers', DriverController.near);
    ///get a driver by id
    app.get('/api/drivers/:id', DriverController.one);
    ///For a specific driver, get a list of the 3 closest drivers
    app.get('/api/dirvers/near/:id', DriverController.nearMe);


    ///Rider's routes

    ///create a rider
    app.post('/api/rider', RiderController.create);
    ///get all rider
    app.get('/api/riders', RiderController.getAll);
    ///get a rider by id
    app.get('/api/rider/:id', RiderController.one);


    ///Trip's routes

    ///used for trip initiation
    app.post('/api/trip', TripController.create);
    ///finds a  trip by id complete it and a simple generate invoice
    app.put('/api/trip/:id', TripController.complete);
    /// gives all active trips
    app.get('/api/trips', TripController.allActive);
}