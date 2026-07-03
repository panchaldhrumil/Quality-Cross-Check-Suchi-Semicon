const express = require('express') ;
const router = express.Router() ;
 const path =  require('path') ;
const BoxLabel = require('../models/BoxLabel'); // Make sure model is imported


router.post('/boxlabel', async (req, res) => {
    try {
        const { AssemblyLotNumber, WaferLotNumber, Quantity, DateCode, Marking } = req.body;
        const newEntry = await BoxLabel.create({
            AssemblyLotNumber,
            WaferLotNumber,
            Quantity,
            DateCode,
            Marking
        });
        res.status(201).json({ message: 'Box Label saved', data: newEntry });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});


module.exports = router ;
