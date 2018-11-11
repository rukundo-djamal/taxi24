const Trip = require('../models/trip');
const Invoice = require('../models/invoice');
module.exports = {

    ///used to create a trip
    create(req, res, next) {
        const tripProps = req.body;
        Trip.create(tripProps)
            .then(trip => res.send(trip))
            .catch(next);
    },
    ///finds a  trip by id complete it and a simple generate invoice
    complete(req, res, next) {
        const tripId = req.params.id;
        Trip.findOneAndUpdate({ _id: tripId }, { complete: true })
            .then(trip => {
                Invoice.find({ trip: trip._id })
                    .then(inv => {
                        if (inv.length === 0) {
                            Invoice.create({ trip: trip._id, cost: 5000 })
                                .then(invoice => {
                                    Invoice.findById({ _id: invoice._id })
                                        .then(inv => res.send(inv))
                                        .catch(next)
                                })
                                .catch(next);
                        }
                        else {
                            res.send({ message: 'sorry but the invoice exist created' });
                        }
                    })
            })
            .catch(next);
    },
    /// gives all active trips
    allActive(_, res, next) {
        Trip.find({ complete: false })
            .then(trips => res.send(trips))
            .catch(next);
    }
}