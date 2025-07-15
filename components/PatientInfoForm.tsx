import React from 'react';

interface Props {
  patientInfo: {
    uhid: string;
    firstName: string;
    lastName: string;
    phone1: string;
    phone2: string;
    nationality: string;
    dob: string;
    age: string;
    gender: string;
    insuranceId: string;
    insuranceName: string;
    payer: string;
  };
  setPatientInfo: React.Dispatch<React.SetStateAction<any>>;
}

const PatientInfoForm: React.FC<Props> = ({ patientInfo, setPatientInfo }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setPatientInfo({ ...patientInfo, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow mt-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Patient Information</h2>
        <div className="space-x-2">
          <button className="bg-blue-100 text-blue-700 px-3 py-1 rounded">+ New Visit</button>
          <button className="border px-3 py-1 rounded">Edit</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <input name="uhid" type="text" placeholder="UHIDYYYYXXX" className="input" value={patientInfo.uhid} onChange={handleChange} />
        <input name="firstName" type="text" placeholder="First Name" className="input" value={patientInfo.firstName} onChange={handleChange} />
        <input name="lastName" type="text" placeholder="Last Name" className="input" value={patientInfo.lastName} onChange={handleChange} />
        <input name="phone1" type="text" placeholder="Phone Number" className="input" value={patientInfo.phone1} onChange={handleChange} />
        <input name="phone2" type="text" placeholder="Alternate Number" className="input" value={patientInfo.phone2} onChange={handleChange} />
        <input name="nationality" type="text" placeholder="Nationality" className="input" value={patientInfo.nationality} onChange={handleChange} />
        <input name="dob" type="date" className="input" value={patientInfo.dob} onChange={handleChange} />
        <input name="age" type="text" value={patientInfo.age}  className="input bg-gray-100" onChange={handleChange} placeholder="Age"/>
        <select name="gender" className="input" value={patientInfo.gender} onChange={handleChange}>
          <option>Select Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
        <input name="insuranceId" type="text" placeholder="Insurance ID" className="input" value={patientInfo.insuranceId} onChange={handleChange} />
        <input name="insuranceName" type="text" placeholder="e.g., Blue Cross Blue Shield" className="input" value={patientInfo.insuranceName} onChange={handleChange} />
        <input name="payer" type="text" placeholder="e.g., National Ins Company" className="input" value={patientInfo.payer} onChange={handleChange} />
      </div>
    </div>
  );
};

export default PatientInfoForm;
