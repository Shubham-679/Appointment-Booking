const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
    },
    slots : {
        type : Array,
        required : true
    }
})

const Sellers = mongoose.model('Sellers', sellerSchema);
module.exports = Sellers