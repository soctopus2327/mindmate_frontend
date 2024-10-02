import React, { useState } from 'react';

const HealthManagement = () => {
  const [medications, setMedications] = useState([]);
  const [medicationInput, setMedicationInput] = useState('');

  const addMedication = (e) => {
    e.preventDefault();
    setMedications([...medications, medicationInput]);
    setMedicationInput('');
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Health Management</h1>
      <form onSubmit={addMedication} className="flex mb-4">
        <input
          type="text"
          value={medicationInput}
          onChange={(e) => setMedicationInput(e.target.value)}
          placeholder="Add Medication"
          className="border p-2 flex-grow"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4">Add</button>
      </form>
      <h2 className="text-xl">Medications</h2>
      <ul>
        {medications.map((medication, index) => (
          <li key={index} className="border-b py-2">{medication}</li>
        ))}
      </ul>
    </div>
  );
};

export default HealthManagement;
