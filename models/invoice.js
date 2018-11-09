const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const InvoiceSchema = new Schema({
    trip:{
        type: Schema.Types.ObjectId,
        refs: 'trip',
        required: true
    },
    cost: {
        type: Number,
        default: 0
    }
});


const Invoice = mongoose.model('invoice', InvoiceSchema);

module.exports = Invoice;