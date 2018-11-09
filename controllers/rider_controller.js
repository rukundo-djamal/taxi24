const Rider = require('../models/rider');

module.exports = {
    ///create a rider
    create(req, res, next){
        const riderProps = req.body;
        Rider.create(riderProps)
        .then(rider => res.send(rider))
        .catch(next);
    },
    ///get all rider
    getAll(req, res, next){
        Rider.find({})
        .then(riders => res.send(riders))
        .catch(next);
    },
    ///get a rider by id
    one(req, res, next){
        const { id } = req.params;
        Rider.findById({_id: id})
        .then(rider => res.send(rider))
        .catch(next);
    }
}