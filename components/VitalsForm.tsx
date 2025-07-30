import React from 'react';

interface Vitals {
  date: string;
  time: string;
  height: string;
  weight: string;
  temperature: string;
  spo2: string;
  bp: string;
  pulse: string;
  respiratoryRate: string;
}

interface VitalsFormProps {
  vitals: Vitals;
  setVitals: React.Dispatch<React.SetStateAction<Vitals>>;
}

const VitalsForm: React.FC<VitalsFormProps> = ({ vitals, setVitals }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVitals({ ...vitals, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow mt-4">
      <h2 className="text-xl font-semibold mb-4">Vital Signs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <input name="date" type="date" className="input" value={vitals.date} onChange={handleChange} />
        <input name="time" type="time" className="input" value={vitals.time} onChange={handleChange} />
        <input name="height" type="number" placeholder="Height (cm)" className="input" value={vitals.height} onChange={handleChange} />
        <input name="weight" type="number" placeholder="Weight (kg)" className="input" value={vitals.weight} onChange={handleChange} />
        <input name="temperature" type="number" placeholder="Temperature (°C)" className="input" value={vitals.temperature} onChange={handleChange} />
        <input name="spo2" type="number" placeholder="SPO2 (%)" className="input" value={vitals.spo2} onChange={handleChange} />
        <input name="bp" type="text" placeholder="Blood Pressure (mmHg)" className="input" value={vitals.bp} onChange={handleChange} />
        <input name="pulse" type="number" placeholder="Pulse Rate (bpm)" className="input" value={vitals.pulse} onChange={handleChange} />
        <input name="respiratoryRate" type="number" placeholder="Respiratory Rate (/min)" className="input" value={vitals.respiratoryRate} onChange={handleChange} />
      </div>
      <button className="mt-4 bg-[#005F56] text-white px-4 py-2 rounded">Send to Doctors</button>
    </div>
  );
};

export default VitalsForm;
