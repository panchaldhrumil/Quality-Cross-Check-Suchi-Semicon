import React, { useState } from 'react';
import './Form1.css';

const emptyTube = () => ({
    id: Date.now() + Math.random(),
    marking1: '',
    marking2: '',
    marking3: '',
    quantity: '',
});

const emptyTape = () => ({
    id: Date.now() + Math.random(),
    marking1: '',
    marking2: '',
    marking3: '',
    mpnLabel: '',
    quantity: '',
});

const Form1 = ({ lotInfo }) => {
    const [tubes, setTubes] = useState([emptyTube()]);
    const [tapes, setTapes] = useState([emptyTape()]);
    const [quantityInspected, setQuantityInspected] = useState('');
    const [result, setResult] = useState('');
    const [failureReport, setFailureReport] = useState('');
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null);

    const updateTube = (id, field, value) => {
        setTubes(prev => prev.map(t => t.id === id ? { ...t, [field]: value } : t));
    };

    const updateTape = (id, field, value) => {
        setTapes(prev => prev.map(t => t.id === id ? { ...t, [field]: value } : t));
    };

    const handleReport = async () => {
        setStatus(null);

        if (!result) {
            setStatus({ type: 'error', message: 'Please select a result (PASS or FAIL).' });
            return;
        }

        if (result === 'fail' && !failureReport.trim()) {
            setStatus({ type: 'error', message: 'Failure report is required when result is FAIL.' });
            return;
        }

        const payload = {
            lotInfo,
            tubes: tubes.map(({ marking1, marking2, marking3, quantity }) => ({
                marking1, marking2, marking3, quantity: Number(quantity) || 0,
            })),
            tapes: tapes.map(({ marking1, marking2, marking3, mpnLabel, quantity }) => ({
                marking1, marking2, marking3, mpnLabel, quantity: Number(quantity) || 0,
            })),
            quantityInspected: Number(quantityInspected) || 0,
            result,
            failureReport: result === 'fail' ? failureReport : '',
        };

        setLoading(true);
        try {
            const res = await fetch(`${VITE_API_URL}/api/inspection`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (result === 'pass') {
                const data = await res.json();
                if (res.ok) {
                    setStatus({ type: 'success', message: 'Inspection data saved successfully!' });
                } else {
                    setStatus({ type: 'error', message: data.error || 'Failed to save inspection data.' });
                }
            } else {
                if (res.ok) {
                    const blob = await res.blob();
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `failure-report-${lotInfo?.AssemblyLotNumber || 'lot'}.pdf`;
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                    URL.revokeObjectURL(url);
                    setStatus({ type: 'success', message: 'Failure report PDF generated and downloaded. Data saved to database.' });
                } else {
                    const data = await res.json();
                    setStatus({ type: 'error', message: data.error || 'Failed to generate failure report.' });
                }
            }
        } catch (err) {
            setStatus({ type: 'error', message: 'Network error. Please check if the backend is running.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="inspection-wrapper">
            <div className="inspection-header">
                <h1>Physical Lot & 100% Inspection</h1>
                <p>Record tube/reel details and submit inspection report</p>
                {lotInfo?.AssemblyLotNumber && (
                    <div className="lot-badge">
                        Lot #{lotInfo.AssemblyLotNumber} &bull; Wafer #{lotInfo.WaferLotNumber}
                    </div>
                )}
            </div>

            {/* PHYSICAL LOT - TUBES */}
            <div className="section-card">
                <div className="section-title">Physical Lot — Tubes</div>
                <div className="section-body">
                    {tubes.map((tube, index) => (
                        <div key={tube.id} className="item-card">
                            <div className="item-card-header">
                                <span className="item-badge">Tube {index + 1}</span>
                                {index > 0 && (
                                    <button className="btn btn-remove" onClick={() => setTubes(prev => prev.filter(t => t.id !== tube.id))}>
                                        Remove
                                    </button>
                                )}
                            </div>
                            <div className="field-grid">
                                <div className="field-group" style={{ gridColumn: '1 / -1' }}>
                                    <label>Marking Based on 3 Units</label>
                                    <div className="marking-inputs">
                                        <input type="text" placeholder="Unit 1" value={tube.marking1} onChange={e => updateTube(tube.id, 'marking1', e.target.value)} />
                                        <input type="text" placeholder="Unit 2" value={tube.marking2} onChange={e => updateTube(tube.id, 'marking2', e.target.value)} />
                                        <input type="text" placeholder="Unit 3" value={tube.marking3} onChange={e => updateTube(tube.id, 'marking3', e.target.value)} />
                                    </div>
                                </div>
                                <div className="field-group">
                                    <label>Quantity</label>
                                    <input type="number" placeholder="0" value={tube.quantity} onChange={e => updateTube(tube.id, 'quantity', e.target.value)} />
                                </div>
                            </div>
                        </div>
                    ))}
                    <button className="btn btn-add" onClick={() => setTubes(prev => [...prev, emptyTube()])}>
                        + Add Tube
                    </button>
                </div>
            </div>

            {/* PHYSICAL LOT - TAPES */}
            <div className="section-card">
                <div className="section-title">Physical Lot — Tapes / Reels</div>
                <div className="section-body">
                    {tapes.map((tape, index) => (
                        <div key={tape.id} className="item-card">
                            <div className="item-card-header">
                                <span className="item-badge">Tape / Reel {index + 1}</span>
                                {index > 0 && (
                                    <button className="btn btn-remove" onClick={() => setTapes(prev => prev.filter(t => t.id !== tape.id))}>
                                        Remove
                                    </button>
                                )}
                            </div>
                            <div className="field-grid">
                                <div className="field-group" style={{ gridColumn: '1 / -1' }}>
                                    <label>Marking Based on 3 Units</label>
                                    <div className="marking-inputs">
                                        <input type="text" placeholder="Unit 1" value={tape.marking1} onChange={e => updateTape(tape.id, 'marking1', e.target.value)} />
                                        <input type="text" placeholder="Unit 2" value={tape.marking2} onChange={e => updateTape(tape.id, 'marking2', e.target.value)} />
                                        <input type="text" placeholder="Unit 3" value={tape.marking3} onChange={e => updateTape(tape.id, 'marking3', e.target.value)} />
                                    </div>
                                </div>
                                <div className="field-group">
                                    <label>MPN Label Device Info</label>
                                    <input type="text" placeholder="Device info" value={tape.mpnLabel} onChange={e => updateTape(tape.id, 'mpnLabel', e.target.value)} />
                                </div>
                                <div className="field-group">
                                    <label>Quantity</label>
                                    <input type="number" placeholder="0" value={tape.quantity} onChange={e => updateTape(tape.id, 'quantity', e.target.value)} />
                                </div>
                            </div>
                        </div>
                    ))}
                    <button className="btn btn-add" onClick={() => setTapes(prev => [...prev, emptyTape()])}>
                        + Add Tape / Reel
                    </button>
                </div>
            </div>

            {/* 100% INSPECTION */}
            <div className="section-card">
                <div className="section-title">100% Inspection</div>
                <div className="section-body">
                    <div className="inspection-row">
                        <div className="field-group">
                            <label>Quantity Inspected</label>
                            <input type="number" placeholder="Enter quantity" value={quantityInspected} onChange={e => setQuantityInspected(e.target.value)} />
                        </div>
                        <div className="field-group">
                            <label>Result</label>
                            <select
                                className={`result-select ${result === 'pass' ? 'pass-selected' : ''} ${result === 'fail' ? 'fail-selected' : ''}`}
                                value={result}
                                onChange={e => setResult(e.target.value)}
                            >
                                <option value="">Select result...</option>
                                <option value="pass">PASS</option>
                                <option value="fail">FAIL</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* FAILURE REPORT - only shown on FAIL */}
            {result === 'fail' && (
                <div className="section-card failure-section">
                    <div className="section-title">Failure Report</div>
                    <div className="section-body">
                        <div className="field-group">
                            <label>Describe the failure</label>
                            <textarea
                                rows={4}
                                placeholder="Enter detailed failure description..."
                                value={failureReport}
                                onChange={e => setFailureReport(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* REPORT BUTTON */}
            <div className="report-actions">
                {status && (
                    <div className={`status-message ${status.type === 'success' ? 'status-success' : 'status-error'}`}>
                        {status.message}
                    </div>
                )}
                <button className="btn btn-report" onClick={handleReport} disabled={loading}>
                    {loading ? 'Processing...' : 'Generate Report'}
                </button>
            </div>
        </div>
    );
};

export default Form1;
