const express = require('express');
const router = express.Router();
const Inspection = require('../models/Inspection');
const generatePdfReport = require('../utils/generatePdfReport');

router.post('/inspection', async (req, res) => {
    try {
        const { lotInfo, tubes, tapes, quantityInspected, result, failureReport } = req.body;

        if (!result || !['pass', 'fail'].includes(result)) {
            return res.status(400).json({ error: 'Result must be pass or fail' });
        }

        if (result === 'fail' && !failureReport?.trim()) {
            return res.status(400).json({ error: 'Failure report is required when result is FAIL' });
        }

        const inspection = new Inspection({
            lotInfo,
            tubes: tubes || [],
            tapes: tapes || [],
            quantityInspected,
            result,
            failureReport: result === 'fail' ? failureReport : '',
        });

        await inspection.save();

        if (result === 'pass') {
            return res.status(201).json({
                message: 'Inspection data saved successfully',
                inspectionId: inspection._id,
            });
        }

        const pdfBuffer = await generatePdfReport(inspection.toObject());
        const filename = `failure-report-${lotInfo?.AssemblyLotNumber || 'lot'}-${Date.now()}.pdf`;

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
        res.setHeader('X-Inspection-Id', inspection._id.toString());
        return res.send(pdfBuffer);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
