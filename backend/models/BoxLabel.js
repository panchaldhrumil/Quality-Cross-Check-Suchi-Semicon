const mongoose = require('mongoose');

const BoxLabelSchema = mongoose.Schema({
    AssemblyLotNumber: Number,
    WaferLotNumber: Number,
    Quantity: Number,
    DateCode: {
        type: Date,
        default: Date.now
    },
    Marking: String
})

module.exports = mongoose.model("BoxLabel", BoxLabelSchema)