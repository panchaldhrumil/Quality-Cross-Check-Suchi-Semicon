const PDFDocument = require('pdfkit');

function generatePdfReport(inspection) {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument({ margin: 50 });
        const chunks = [];

        doc.on('data', (chunk) => chunks.push(chunk));
        doc.on('end', () => resolve(Buffer.concat(chunks)));
        doc.on('error', reject);

        const { lotInfo, tubes, tapes, quantityInspected, result, failureReport } = inspection;

        doc.fontSize(22).fillColor('#c0392b').text('QA INSPECTION FAILURE REPORT', { align: 'center' });
        doc.moveDown(0.5);
        doc.fontSize(10).fillColor('#666').text(`Generated: ${new Date().toLocaleString()}`, { align: 'center' });
        doc.moveDown(1.5);

        doc.fontSize(14).fillColor('#2c3e50').text('Lot Information', { underline: true });
        doc.moveDown(0.5);
        doc.fontSize(11).fillColor('#333');
        if (lotInfo) {
            doc.text(`Assembly Lot Number: ${lotInfo.AssemblyLotNumber ?? 'N/A'}`);
            doc.text(`Wafer Lot Number: ${lotInfo.WaferLotNumber ?? 'N/A'}`);
            doc.text(`Quantity: ${lotInfo.Quantity ?? 'N/A'}`);
            doc.text(`Date Code: ${lotInfo.DateCode ? new Date(lotInfo.DateCode).toLocaleDateString() : 'N/A'}`);
            doc.text(`Marking: ${lotInfo.Marking ?? 'N/A'}`);
        }
        doc.moveDown(1);

        doc.fontSize(14).fillColor('#2c3e50').text('Tubes', { underline: true });
        doc.moveDown(0.5);
        doc.fontSize(11).fillColor('#333');
        if (tubes && tubes.length > 0) {
            tubes.forEach((tube, i) => {
                doc.text(`Tube ${i + 1}: Markings [${tube.marking1 || '-'}, ${tube.marking2 || '-'}, ${tube.marking3 || '-'}] | Qty: ${tube.quantity ?? 'N/A'}`);
            });
        } else {
            doc.text('No tubes recorded.');
        }
        doc.moveDown(1);

        doc.fontSize(14).fillColor('#2c3e50').text('Tapes / Reels', { underline: true });
        doc.moveDown(0.5);
        doc.fontSize(11).fillColor('#333');
        if (tapes && tapes.length > 0) {
            tapes.forEach((tape, i) => {
                doc.text(`Tape/Reel ${i + 1}: Markings [${tape.marking1 || '-'}, ${tape.marking2 || '-'}, ${tape.marking3 || '-'}] | MPN: ${tape.mpnLabel || 'N/A'} | Qty: ${tape.quantity ?? 'N/A'}`);
            });
        } else {
            doc.text('No tapes/reels recorded.');
        }
        doc.moveDown(1);

        doc.fontSize(14).fillColor('#2c3e50').text('Inspection Summary', { underline: true });
        doc.moveDown(0.5);
        doc.fontSize(11).fillColor('#333');
        doc.text(`Quantity Inspected: ${quantityInspected ?? 'N/A'}`);
        doc.text(`Result: ${(result || '').toUpperCase()}`);
        doc.moveDown(0.5);

        if (failureReport) {
            doc.fontSize(14).fillColor('#c0392b').text('Failure Report', { underline: true });
            doc.moveDown(0.5);
            doc.fontSize(11).fillColor('#333').text(failureReport, { width: 500 });
        }

        doc.end();
    });
}

module.exports = generatePdfReport;
