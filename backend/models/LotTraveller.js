const mongoose = require('mongoose');

const LotTravellerSchema = mongoose.Schema({
    AssemblyLotNumber: Number,
    WaferLotNumber: Number,
    Quantity: Number,
    DateCode: {
        type: Date,
        default: Date.now
    },
    Marking: String
})

module.exports = mongoose.model("LotTraveller", LotTravellerSchema)


