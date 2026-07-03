import React, { useState } from 'react';
import Form1 from './Form1';
import './Form.css';

const Form = () => {
    const [showElement, setshowElement] = useState(false);
    const [verifiedLotInfo, setVerifiedLotInfo] = useState(null);

    const [lotTravellerData, setLotTravellerData] = useState({
        AssemblyLotNumber: '',
        WaferLotNumber: '',
        Quantity: '',
        DateCode: '',
        Marking: ''
    });

    const [boxLabelData, setBoxLabelData] = useState({
        AssemblyLotNumber: '',
        WaferLotNumber: '',
        Quantity: '',
        DateCode: '',
        Marking: ''
    });

    const handleLotTravellerChange = (e) => {
        const { name, value } = e.target;
        setLotTravellerData(prev => ({ ...prev, [name]: value }));
    };

    const handleBoxLabelChange = (e) => {
        const { name, value } = e.target;
        setBoxLabelData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const mismatches = [];
        for (let key in lotTravellerData) {
            if (String(lotTravellerData[key]).trim() !== String(boxLabelData[key]).trim()) {
                mismatches.push(key);
            }
        }

        if (mismatches.length > 0) {
            alert(`Mismatch found in: ${mismatches.join(', ')}`);
            return;
        }

        try {
            const res1 = await fetch('http://localhost:3000/api/lottraveller', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(lotTravellerData)
            });

            const res2 = await fetch('http://localhost:3000/api/boxlabel', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(boxLabelData)
            });

            if (res1.ok && res2.ok) {
                setVerifiedLotInfo({ ...lotTravellerData });
                setshowElement(true);
            } else {
                alert("Submission failed.");
            }
        } catch (err) {
            console.error("Error submitting data", err);
            alert("Error submitting data.");
        }
    };

    const fields = [
        { name: 'AssemblyLotNumber', label: 'Assembly Lot Number', type: 'number' },
        { name: 'WaferLotNumber', label: 'Wafer Lot Number', type: 'number' },
        { name: 'Quantity', label: 'Quantity', type: 'number' },
        { name: 'DateCode', label: 'Date Code', type: 'date' },
        { name: 'Marking', label: 'Marking', type: 'text' },
    ];

    const renderFields = (data, onChange) => (
        fields.map(field => (
            <div key={field.name} className="form-field">
                <label>{field.label}</label>
                <input
                    type={field.type}
                    name={field.name}
                    value={data[field.name]}
                    onChange={onChange}
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                />
            </div>
        ))
    );

    return (
        <div className="form-page">
            <div className="form-page-header">
                <h1>QA Verification Portal</h1>
                <p>Verify lot traveller and box label data before inspection</p>
            </div>

            <div className="verification-grid">
                <div className="verification-card">
                    <div className="card-header lot-traveller">
                        <span className="card-icon">📋</span>
                        Lot Traveller Verification
                    </div>
                    <form className="card-body">
                        {renderFields(lotTravellerData, handleLotTravellerChange)}
                    </form>
                </div>

                <div className="verification-card">
                    <div className="card-header box-label">
                        <span className="card-icon">📦</span>
                        Box Label Verification
                    </div>
                    <form className="card-body">
                        {renderFields(boxLabelData, handleBoxLabelChange)}
                    </form>
                </div>
            </div>

            <div className="submit-area">
                <button onClick={handleSubmit} className="btn-verify">
                    Verify & Continue
                </button>
            </div>

            {showElement && (
                <div className="inspection-section">
                    <Form1 lotInfo={verifiedLotInfo} />
                </div>
            )}
        </div>
    );
};

export default Form;
