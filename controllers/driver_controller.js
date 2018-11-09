const Driver = require('../models/driver');


module.exports = {
    ///used to welcom api users 
    welcome(_, res) {
        res.send({ message: "welcome to taxi24 api" });
    },
    ///create a driver
    create(req, res, next) {
        const driverProps = req.body;
        Driver.create(driverProps)
            .then(driver => res.send(driver))
            .catch(next);
    },
    ///get all drivers
    getAll(_, res, next) {
        Driver.find({})
            .then(drivers => res.send(drivers))
            .catch(next);
    },
    /// get all available drivers
    available(_, res, next) {
        Driver.find({ available: true })
            .then(drivers => res.send(drivers))
            .catch(next);
    },
    ///get a driver by id
    one(req, res, next) {
        const driverId = req.params.id;
        Driver.findById({ _id: driverId })
            .then(driver => res.status(200).send(driver))
            .catch(next);
    },
    ///Get a list of all available drivers within 3km for a specific location
    near(req, res, next) {
        const { lng, lat } = req.query;

        Driver.aggregate([
            {
                "$geoNear": {
                    "near": {
                        "type": "Point",
                        "coordinates": [parseFloat(lng), parseFloat(lat)]
                    },
                    "maxDistance": 3000,
                    "spherical": true,
                    "distanceField": "distance",
                    query: { available: true, }
                }
            },
        ])
            .then(drivers => res.send(drivers))
            .catch(next);
    },
    ///For a specific driver, get a list of the 3 closest drivers
    nearMe(req, res, next) {
        const driverId = req.params.id;
        Driver.findById({ _id: driverId })
            .then(driver => {
                Driver.aggregate([
                    {
                        "$geoNear": {
                            "near": {
                                "type": "Point",
                                "coordinates": driver.geometry.coordinates
                            },
                            spherical: true,
                            distanceField: "distance",
                            limit: 4 // it is going skip first because it will return drivers inclunding the one sending the request
                        },
                    },
                    {
                        $skip: 1
                    },
                    {
                        "$sort": { "distance": 1 }
                    }

                ])
                    .then(drivers => res.send(drivers))
                    .catch(next);
            })
            .catch(next);
    }
}