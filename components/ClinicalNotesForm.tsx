import React from 'react';

interface ClinicalNotes {
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
}

interface ClinicalNotesFormProps {
  clinicalNotes: ClinicalNotes;
  setClinicalNotes: React.Dispatch<React.SetStateAction<ClinicalNotes>>;
}

const ClinicalNotesForm: React.FC<ClinicalNotesFormProps> = ({
  clinicalNotes,
  setClinicalNotes
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setClinicalNotes({ ...clinicalNotes, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-4 bg-white text-xs border border-gray-300 w-full">
      {/* Header */}
      <div className="flex justify-between border-b pb-1">
        <p><span className="text-blue-700 font-bold">Doctor:</span> Dr. {clinicalNotes.doctorName || 'John Smith'}</p>
        <p><span className="text-blue-700 font-semibold">Speciality:</span> Internal Medicine/Specialist</p>
        <p><span className="text-blue-700">Date:</span> {new Date().toLocaleDateString()}</p>
      </div>

      {/* Vitals */}
      <div className="bg-cyan-100 mt-1 px-2 py-1 flex flex-wrap gap-4">
        <span className="font-semibold">Vitals:</span>
        <span>Temp: N/A°C</span>
        <span>BP: N/A mmHg</span>
        <span>HR: N/A bpm</span>
        <span>Weight: N/A kg</span>
        <span>Height: N/A cm</span>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-3 mt-2 gap-2">
        {/* LEFT COLUMN */}
        <div className="col-span-2 space-y-2">
          {/* Chief Complaint */}
          <div className="border border-yellow-300">
            <div className="bg-yellow-100 font-semibold px-2 py-1 border-b border-yellow-300">Subjective Notes/Chief Complaint</div>
            <textarea
              name="chiefComplaint"
              className="w-full h-[80px] p-2 border-none resize-none"
              placeholder="Enter chief complaint..."
              value={clinicalNotes.chiefComplaint}
              onChange={handleChange}
            />
          </div>

          {/* Physical Examination */}
          <div className="border border-yellow-300">
            <div className="bg-yellow-100 font-semibold px-2 py-1 border-b border-yellow-300">Physical Examination</div>
            <textarea
              name="history"
              className="w-full h-[60px] p-2 border-none resize-none"
              placeholder="Enter Physical examination..."
              value={clinicalNotes.history}
              onChange={handleChange}
            />
          </div>

          {/* Assessment and Treatment Plan */}
          <div className="border border-yellow-300">
            <div className="bg-yellow-100 font-semibold px-2 py-1 border-b border-yellow-300">Assessment/Diagnosis</div>
            <textarea
              name="duration"
              className="w-full h-[80px] p-2 border-none resize-none"
              placeholder="Enter Assessment/Diagnosis..."
              value={clinicalNotes.duration}
              onChange={handleChange}
            />
            <div className="bg-yellow-100 font-semibold px-2 py-1 border-t border-b border-yellow-300">Treatment Plan</div>
            <textarea
              name="treatmentPlan"
              className="w-full h-[80px] p-2 border-none resize-none"
              placeholder="Enter Treatment Plan..."
              value={clinicalNotes.treatmentPlan}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex flex-col gap-2 h-full">
          <div className="flex flex-col h-full gap-2">
            {/* ICD Codes */}
            <div className="border border-yellow-300 flex-1 overflow-auto flex flex-col">
              <div className="bg-yellow-100 font-semibold px-2 py-1 border-b border-yellow-300 flex justify-between items-center">
                ICD Codes
                <button className="text-sm bg-pink-100 px-2 py-0.5 rounded-full">ICD Desc 🔍</button>
              </div>
              <table className="w-full text-xs">
                <tbody>
                  <tr><td className="font-semibold px-2">PDX:</td><td>{clinicalNotes.primaryDxCode}</td></tr>
                  {clinicalNotes.secondaryDxList.map((code, i) => (
                    <tr key={i}><td className="font-semibold px-2">SDX:</td><td>{code}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Procedures */}
            <div className="border border-yellow-300 flex-1 overflow-auto flex flex-col">
              <div className="bg-yellow-100 font-semibold px-2 py-1 border-b border-yellow-300 flex justify-between items-center">
                Procedures
                <button className="text-sm bg-pink-100 px-2 py-0.5 rounded-full">Short Desc 🔍</button>
              </div>
              <table className="w-full text-xs text-center border-collapse">
                <thead className="bg-yellow-50">
                  <tr>
                    <th className="border px-1">Code</th>
                    <th className="border px-1">Description</th>
                    <th className="border px-1">Qty</th>
                    <th className="border px-1">Type</th>
                  </tr>
                </thead>
                <tbody>
                  {clinicalNotes.procedures.map((proc, i) => (
                    <tr key={i}>
                      <td className="border px-1">{proc.code}</td>
                      <td className="border px-1">{proc.desc}</td>
                      <td className="border px-1">{proc.qty || '1'}</td>
                      <td className="border px-1">{proc.type}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Medications */}
      <div className="border mt-2">
        <div className="bg-pink-200 text-center font-bold py-1">Medicine Prescribed</div>
        <table className="w-full border text-xs">
          <thead className="bg-cyan-100">
            <tr>
              <th className="border px-1">TRADE NAME</th>
              <th className="border px-1">ROUTE OF ADMIN</th>
              <th className="border px-1">GRANULAR</th>
              <th className="border px-1">Number of days</th>
              <th className="border px-1">Frequency</th>
              <th className="border px-1">Remarks</th>
            </tr>
          </thead>
          <tbody>
            {clinicalNotes.medications.map((med, i) => (
              <tr key={i} className="text-center">
                <td className="border px-1">{med.name}</td>
                <td className="border px-1">-</td>
                <td className="border px-1">-</td>
                <td className="border px-1">1</td>
                <td className="border px-1">{med.freq}</td>
                <td className="border px-1">-</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClinicalNotesForm;
