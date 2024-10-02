// src/pages/MedicationPage.js
import React, { useState } from 'react';

const MedicationPage = () => {
  const [medications, setMedications] = useState([]);
  const [medicationName, setMedicationName] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const addMedication = (e) => {
    e.preventDefault();
    const newMedication = {
      name: medicationName,
      dosage,
      frequency,
      startDate,
      endDate,
    };
    setMedications([...medications, newMedication]);
    // Reset input fields
    setMedicationName('');
    setDosage('');
    setFrequency('');
    setStartDate('');
    setEndDate('');
  };

  const deleteMedication = (index) => {
    const newMedications = medications.filter((_, i) => i !== index);
    setMedications(newMedications);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Manage Your Medications</h2>
      <form onSubmit={addMedication} className="mb-4">
        <input
          type="text"
          placeholder="Medication Name"
          value={medicationName}
          onChange={(e) => setMedicationName(e.target.value)}
          required
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Dosage"
          value={dosage}
          onChange={(e) => setDosage(e.target.value)}
          required
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Frequency"
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
          required
          className="border p-2 mr-2"
        />
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
          className="border p-2 mr-2"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
          className="border p-2 mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2">Add Medication</button>
      </form>
      <ul>
        {medications.map((medication, index) => (
          <li key={index} className="border-b py-2">
            <strong>{medication.name}</strong> - {medication.dosage}, {medication.frequency} (From: {medication.startDate} To: {medication.endDate})
            <button onClick={() => deleteMedication(index)} className="text-red-500 ml-4">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MedicationPage;
