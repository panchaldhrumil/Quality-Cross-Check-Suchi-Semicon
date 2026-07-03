const mongoose = require('mongoose');

const TubeSchema = new mongoose.Schema({
    marking1: String,
    marking2: String,
    marking3: String,
    quantity: Number,
}, { _id: false });

const TapeSchema = new mongoose.Schema({
    marking1: String,
    marking2: String,
    marking3: String,
    mpnLabel: String,
    quantity: Number,
}, { _id: false });

const LotInfoSchema = new mongoose.Schema({
    AssemblyLotNumber: Number,
    WaferLotNumber: Number,
    Quantity: Number,
    DateCode: Date,
    Marking: String,
}, { _id: false });

const InspectionSchema = new mongoose.Schema({
    lotInfo: LotInfoSchema,
    tubes: [TubeSchema],
    tapes: [TapeSchema],
    quantityInspected: Number,
    result: { type: String, enum: ['pass', 'fail'], required: true },
    failureReport: String,
}, { timestamps: true });

module.exports = mongoose.model('Inspection', InspectionSchema);
