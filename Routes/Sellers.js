const express = require('express');
const router = express.Router();
const Sellers = require('../Models/SellerModel');

router.get('/', async (req, res) => {
    try {
        const sellers = await Sellers.find({});
        res.send(sellers);
    } catch (error) {
        res.send(error);
    }
})

router.patch('/', async (req, res) => {
    try {
        const seller = await Sellers.findByIdAndUpdate(req.body.id, {"$push": { "slots": req.body.slot } },{ new: true })
        res.send(seller);
    } catch (error) {
        res.send(error);
    }
})

router.patch('/removeSlot', async (req, res) => {
    try {
        const seller = await Sellers.findById(req.body.sellerId);
        const updatedSeller = await Sellers.findByIdAndUpdate(req.body.sellerId, {slots : seller.slots.filter(a => a._id.toString() !== req.body.slot._id)},{ new: true });
        res.send(updatedSeller);
    } catch (error) {
        res.send(error);
    }
})
module.exports = router;