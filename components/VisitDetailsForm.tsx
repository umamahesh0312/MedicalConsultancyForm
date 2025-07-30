import React from 'react';

interface VisitDetails {
  visitId: string;
  visitDate: string;
  visitTime: string;
  doctor: string;
  department: string;
  visitType: string;
}

interface VisitDetailsProps {
  visitDetails: VisitDetails;
  setVisitDetails: React.Dispatch<React.SetStateAction<VisitDetails>>;
}

const VisitDetailsForm: React.FC<VisitDetailsProps> = ({ visitDetails, setVisitDetails }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setVisitDetails({ ...visitDetails, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow mt-4">
      <h2 className="text-xl font-semibold mb-4">Visit Details</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <input
          type="text"
          name="visitId"
          placeholder="VST-DDYYYYXXXX"
          className="input"
          value={visitDetails.visitId}
          onChange={handleChange}
        />
        <input
          type="date"
          name="visitDate"
          className="input"
          value={visitDetails.visitDate}
          onChange={handleChange}
        />
        <input
          type="time"
          name="visitTime"
          className="input"
          value={visitDetails.visitTime}
          onChange={handleChange}
        />
        <select
          name="doctor"
          className="input"
          value={visitDetails.doctor}
          onChange={handleChange}
        >
          <option>Select Doctor</option>
          <option>Dr. Smith</option>
          <option>Dr. Jane</option>
        </select>
        <input
          type="text"
          name="department"
          placeholder="e.g., Auto fetch - from mapping with doctor"
          className="input"
          value={visitDetails.department}
          onChange={handleChange}
        />
        <input
          type="text"
          name="visitType"
          placeholder="e.g., Auto"
          className="input"
          value={visitDetails.visitType}
          onChange={handleChange}
        />
      </div>
      <button className="mt-4 bg-[#005F56] text-white px-4 py-2 rounded">Send for Vitals</button>
    </div>
  );
};

export default VisitDetailsForm;
