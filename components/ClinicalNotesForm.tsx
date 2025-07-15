import React, { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';

interface ClinicalNotesFormProps {
  clinicalNotes: {
    chiefComplaint: string;
    duration: string;
    history: string;
    primaryDxCode: string;
    primaryDxDesc: string;
    secondaryDxList: string[];
    secondaryDxInput: string;
    procedures: { code: string; desc: string; type: string; qty: string }[];
    procedureInput: { code: string; desc: string; type: string; qty: string };
    medications: { name: string; dose: string; freq: string }[];
    medInput: { name: string; dose: string; freq: string };
    treatmentPlan: string;
    referredTo: string;
    referralReason: string;
    doctorName: string;
    acknowledged: boolean;
    remarks: string;
  };
  setClinicalNotes: React.Dispatch<React.SetStateAction<ClinicalNotesFormProps['clinicalNotes']>>;
}

const ClinicalNotesForm: React.FC<ClinicalNotesFormProps> = ({
  clinicalNotes,
  setClinicalNotes
}) => {
  const doctorSigRef = useRef<SignatureCanvas>(null);
  const patientSigRef = useRef<SignatureCanvas>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setClinicalNotes({ ...clinicalNotes, [e.target.name]: e.target.value });
  };

  const handleCheckbox = () => {
    setClinicalNotes(prev => ({ ...prev, acknowledged: !prev.acknowledged }));
  };

  const addSecondaryDx = () => {
    const code = clinicalNotes.secondaryDxInput.trim();
    if (code) {
      setClinicalNotes(prev => ({
        ...prev,
        secondaryDxList: [...prev.secondaryDxList, code],
        secondaryDxInput: ''
      }));
    }
  };

  const addProcedure = () => {
    const { code, desc, type, qty } = clinicalNotes.procedureInput;
    if (code && desc) {
      setClinicalNotes(prev => ({
        ...prev,
        procedures: [...prev.procedures, { code, desc, type, qty }],
        procedureInput: { code: '', desc: '', type: '', qty: '' }
      }));
    }
  };

  const addMedication = () => {
    const { name, dose, freq } = clinicalNotes.medInput;
    if (name && dose && freq) {
      setClinicalNotes(prev => ({
        ...prev,
        medications: [...prev.medications, { name, dose, freq }],
        medInput: { name: '', dose: '', freq: '' }
      }));
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow mt-4 space-y-6">
      <h2 className="text-xl font-semibold">Clinical Summary</h2>

      {/* Chief Complaint */}
      <div>
        <label className="text-sm font-medium">Chief Complaint</label>
        <textarea
          name="chiefComplaint"
          className="w-full border border-gray-300 rounded px-3 py-2 h-[80px] focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          value={clinicalNotes.chiefComplaint}
          onChange={handleChange}
        />
      </div>

      {/* Duration */}
      <div>
        <label className="text-sm font-medium">Duration of Illness/Symptoms</label>
        <input
          name="duration"
          className="w-full border border-gray-300 rounded px-3 h-[40px] focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          value={clinicalNotes.duration}
          onChange={handleChange}
        />
      </div>

      {/* History */}
      <div>
        <label className="text-sm font-medium">History of Present Illness</label>
        <textarea
          name="history"
          className="w-full border border-gray-300 rounded px-3 py-2 h-[80px] focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          value={clinicalNotes.history}
          onChange={handleChange}
        />
      </div>

      {/* Diagnosis */}
      <h3 className="text-lg font-bold text-black-700 mt-6">Diagnosis</h3>

      {/* Primary Diagnosis - One Row */}
      <div className="flex gap-4 mt-2">
        <div className="flex flex-col w-[200px]">
          <label className="text-sm font-semibold mb-1">Primary Diagnosis - Code</label>
          <input
            name="primaryDxCode"
            placeholder="Code"
            className="border border-gray-300 rounded px-2 h-[30px] w-full focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            value={clinicalNotes.primaryDxCode}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col flex-1">
          <label className="invisible mb-1 text-sm">Description</label>
          <input
            name="primaryDxDesc"
            placeholder="Description"
            className="border border-gray-300 rounded px-2 h-[30px] w-full focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            value={clinicalNotes.primaryDxDesc}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Secondary Diagnosis - One Row */}
      <div className="flex gap-4 mt-4 items-end">
        <div className="flex flex-col w-[200px]">
          <label className="text-sm font-medium mb-1">Secondary Diagnosis - Code</label>
          <input
            name="secondaryDxInput"
            className="border border-gray-300 rounded px-2 h-[30px] w-full focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            value={clinicalNotes.secondaryDxInput}
            onChange={handleChange}
          />
        </div>
        <div className="flex-1">
          <input
            className="border border-gray-300 rounded px-2 h-[30px] w-full focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Description"
          />
        </div>
        <button
          className="bg-blue-600 text-white rounded h-[30px] text-sm px-4"
          onClick={addSecondaryDx}
        >
          Add
        </button>
      </div>

      {/* Secondary Diagnosis List */}
      {clinicalNotes.secondaryDxList.map((dx, i) => (
        <div
          key={i}
          className="mt-2 bg-gray-100 px-3 py-1 rounded flex justify-between items-center"
        >
          <span>{dx}</span>
          <button
            className="text-red-600 text-sm"
            onClick={() =>
              setClinicalNotes(prev => ({
                ...prev,
                secondaryDxList: prev.secondaryDxList.filter((_, index) => index !== i)
              }))
            }
          >
            Remove
          </button>
        </div>
      ))}

      {/* Procedures */}
      <h3 className="text-lg font-semibold mt-6">Procedures</h3>
      <div className="grid grid-cols-5 gap-2 mb-1">
        {['code', 'desc', 'qty', 'type'].map((field, index) => (
          <div key={index} className="flex flex-col">
            <label className="text-sm font-medium mb-1">
              {field === 'code' && 'CPT Code'}
              {field === 'desc' && 'Description'}
              {field === 'qty' && 'Qty'}
              {field === 'type' && 'Type'}
            </label>
            <input
              className="border border-gray-300 rounded px-2 h-[30px] focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              placeholder={field === 'code' ? 'CPT Code' : field.charAt(0).toUpperCase() + field.slice(1)}
              value={clinicalNotes.procedureInput[field as keyof typeof clinicalNotes.procedureInput]}
              onChange={(e) =>
                setClinicalNotes(prev => ({
                  ...prev,
                  procedureInput: { ...prev.procedureInput, [field]: e.target.value }
                }))
              }
            />
          </div>
        ))}
        <div className="flex flex-col justify-end">
          <button
            className="bg-blue-600 text-white rounded text-sm h-[30px] w-full"
            onClick={addProcedure}
          >
            Add
          </button>
        </div>
      </div>

      {/* Medications */}
      <h3 className="text-lg font-semibold mt-6">Medications</h3>
      <div className="grid grid-cols-4 gap-2 mb-1">
        {['name', 'dose', 'freq'].map((field, index) => (
          <div key={index} className="flex flex-col">
            <label className="text-sm font-medium mb-1">
              {field === 'name' && 'Name'}
              {field === 'dose' && 'Dosage'}
              {field === 'freq' && 'Frequency'}
            </label>
            <input
              className="border border-gray-300 rounded px-2 h-[30px] focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={clinicalNotes.medInput[field as keyof typeof clinicalNotes.medInput]}
              onChange={(e) =>
                setClinicalNotes(prev => ({
                  ...prev,
                  medInput: { ...prev.medInput, [field]: e.target.value }
                }))
              }
            />
          </div>
        ))}
        <div className="flex flex-col justify-end">
          <button
            className="bg-blue-600 text-white rounded text-sm h-[30px] w-full"
            onClick={addMedication}
          >
            Add
          </button>
        </div>
      </div>

      {/* Treatment Plan */}
      <div>
        <label className="text-sm font-medium">Treatment Plan</label>
        <textarea
          name="treatmentPlan"
          className="w-full h-[90px] border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          value={clinicalNotes.treatmentPlan}
          onChange={handleChange}
        />
      </div>

      {/* Referral */}
      <h3 className="text-lg font-semibold">Referral (If applicable)</h3>
      <div className="grid grid-cols-2 gap-4">
        {['referredTo', 'referralReason'].map((field, index) => (
          <div key={index}>
            <label className="text-sm font-medium">
              {field === 'referredTo' ? 'Referred To' : 'Referral Reason'}
            </label>
            <input
              name={field}
              className="w-full border border-gray-300 rounded px-2 h-[30px] focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              value={clinicalNotes[field as keyof typeof clinicalNotes]}
              onChange={handleChange}
            />
          </div>
        ))}
      </div>

      {/* Signatures */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">Doctor Signature & Seal</label>
          <SignatureCanvas
            ref={doctorSigRef}
            penColor="black"
            canvasProps={{
              className: "w-full h-[80px] border border-dashed border-gray-400 rounded bg-white"
            }}
          />
        </div>
        <div>
          <label className="text-sm font-medium">Patient Signature</label>
          <SignatureCanvas
            ref={patientSigRef}
            penColor="black"
            canvasProps={{
              className: "w-full h-[80px] border border-dashed border-gray-400 rounded bg-white"
            }}
          />
        </div>
      </div>

      {/* Doctor Name + Acknowledgment */}
      <div className="mt-4">
        <input
          name="doctorName"
          type="text"
          className="border border-gray-300 rounded px-2 h-[30px] w-1/2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Doctor Name"
          value={clinicalNotes.doctorName}
          onChange={handleChange}
        />
        <div className="mt-2">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={clinicalNotes.acknowledged}
              onChange={handleCheckbox}
              className="accent-blue-600"
            />
            I am Dr. {clinicalNotes.doctorName || ''}, treating doctor of the above patient and all the information provided in claims form are best of my experience and are true to the best of my knowledge.
          </label>
        </div>
      </div>

      {/* Timestamp & Save */}
      <div className="mt-6">
        <label className="text-sm font-medium mr-2">System generated Timestamp:</label>
        <span className="text-sm text-gray-600">
          {new Date().toLocaleString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
          })}
        </span>

        <p className="flex items-center gap-2 text-sm">This is a computer-generated program. Valid with digital signature and deal.</p>

        <button className="bg-blue-600 text-white px-4 py-2 mt-4 rounded">
          Claim Form (Save)
        </button>
      </div>
    </div>
  );
};

export default ClinicalNotesForm;
