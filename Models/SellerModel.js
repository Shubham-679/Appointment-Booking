const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
    },
    slots : [{
        id : { type: mongoose.Types.ObjectId },
        date : { type: String },
        time : { type: String }
    }]
})

const Sellers = mongoose.model('Sellers', sellerSchema);
module.exports = Sellers