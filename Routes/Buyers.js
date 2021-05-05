const express = require("express");
const router = express.Router();
const Buyers = require('../Models/BuyerModel');


router.get('/:id', async (req, res) => {
    try {
        const buyers = await Buyers.find({sellerId : req.params.id})
        res.send(buyers);
    } catch (error) {
        res.send(error)
    }
})

router.get('/', async (req, res) => {
    try {
        const buyers = await Buyers.find();
        res.send(buyers);
    } catch (error) {
        res.send(error)
    }
})

router.post('/', async (req, res) => {
    try {
        const buyer = new Buyers(req.body);
        const newBuyer = await buyer.save()
        res.send(newBuyer);
    } catch (error) {
        res.send(error);
    }
})

router.patch('/:id', async (req, res) => {
    try {
        const buyer = await Buyers.findByIdAndUpdate(req.params.id, {isSlotBooked: 'isBooked'}, { new: true});
        res.send(buyer); 
    } catch (error) {
        res.send(error)
    }
})

router.delete('/:id', async(req, res) => {
    try {
        const buyer = await Buyers.findByIdAndDelete(req.params.id);
        res.send(buyer);
    } catch (error) {
        res.send(error);
    }

})

module.exports = router;