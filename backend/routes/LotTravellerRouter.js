const express = require('express') ;
const router = express.Router() ;
const LotTraveller = require('../models/LotTraveller'); // Fix import


router.post('/lottraveller', async (req, res) => {
    try {
        const newEntry = new LotTraveller(req.body);
        await newEntry.save();
        res.status(201).json({ message: 'Lot Traveller saved' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router ;
