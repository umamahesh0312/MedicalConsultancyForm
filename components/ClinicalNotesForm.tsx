import React, { useState, useRef, useEffect } from 'react';

interface ClinicalNotes {
  chiefComplaint: string;
  duration: string;
  history: string;
  primaryDxCode: string;
  primaryDxDesc: string;
  secondaryDxList: { code: string; desc: string }[];
  secondaryDxInput: string;
  procedures: { code: string; desc: string; qty: string }[];
  procedureInput: { code: string; desc: string; qty: string };
  medications: { name: string; dose: string; freq: string }[];
  medInput: { name: string; dose: string; freq: string };
  treatmentPlan: string;
  referredTo: string;
  referralReason: string;
  doctorName: string;
  acknowledged: boolean;
  remarks: string;
}

const icdData = [
  { code: 'L89.000', shortDesc: 'Pressure ulcer of unspecified elbow, unstageable' },
  { code: 'L89.001', shortDesc: 'Pressure ulcer of unspecified elbow, stage 1' },
  { code: 'L89.002', shortDesc: 'Pressure ulcer of unspecified elbow, stage 2' },
];

const procedureData = [
  { code: '0JH604Z', desc: 'Insertion of Pacemaker' },
  { code: '5A1221Z', desc: 'Cardiac Output Monitoring' },
  { code: '30233N1', desc: 'Blood Transfusion' },
];

interface ClinicalNotesFormProps {
  clinicalNotes: ClinicalNotes;
  setClinicalNotes: React.Dispatch<React.SetStateAction<ClinicalNotes>>;
}

const ClinicalNotesForm: React.FC<ClinicalNotesFormProps> = ({ clinicalNotes, setClinicalNotes }) => {
  const [icdSearch, setIcdSearch] = useState('');
  const [showIcdDropdown, setShowIcdDropdown] = useState(false);
  const [showProcedureOptions, setShowProcedureOptions] = useState(false);
  const [/*selectedProcedures*/, setSelectedProcedures] = useState<{ code: string; desc: string; qty: string }[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowIcdDropdown(false);
        setShowProcedureOptions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setClinicalNotes({ ...clinicalNotes, [e.target.name]: e.target.value });
  };

  const handleSelectIcd = (item: { code: string; shortDesc: string }) => {
    setClinicalNotes((prev) => ({
      ...prev,
      secondaryDxList: [...prev.secondaryDxList, { code: item.code, desc: item.shortDesc }]
    }));
    setShowIcdDropdown(false);
    setIcdSearch('');
  };

  const handleSelectProcedure = (proc: { code: string; desc: string }) => {
    setSelectedProcedures((prev) => [...prev, { code: proc.code, desc: proc.desc, qty: '1' }]);
    setClinicalNotes((prev) => ({
      ...prev,
      procedures: [...prev.procedures, { code: proc.code, desc: proc.desc, qty: '1' }]
    }));
    setShowProcedureOptions(false);
  };

  return (
    <div className="p-4 bg-white text-xs border border-gray-300 w-full relative">
      <div className="flex justify-between border-b pb-1">
        <p><span className="text-[#005F56] font-bold">Doctor:</span> Dr. {clinicalNotes.doctorName || 'John Smith'}</p>
        <p><span className="text-[#005F56] font-semibold">Speciality:</span> Internal Medicine/Specialist</p>
        <p><span className="text-[#005F56]">Date:</span> {new Date().toLocaleDateString()}</p>
      </div>

      <div className="bg-cyan-100 mt-1 px-2 py-1 flex flex-wrap gap-4">
        <span className="font-semibold">Vitals:</span>
        <span>Temp: N/A°C</span>
        <span>BP: N/A mmHg</span>
        <span>HR: N/A bpm</span>
        <span>Weight: N/A kg</span>
        <span>Height: N/A cm</span>
      </div>

      <div className="grid grid-cols-3 mt-2 gap-2">
        <div className="col-span-2 space-y-2">
          <div className="border border-yellow-300">
            <div className="bg-yellow-100 font-semibold px-2 py-1 border-b border-yellow-300">
              Subjective Notes/Chief Complaint
            </div>
            <textarea
              name="chiefComplaint"
              className="w-full h-[80px] p-2 border-none resize-none"
              placeholder="Enter chief complaint..."
              value={clinicalNotes.chiefComplaint}
              onChange={handleChange}
            />
          </div>

          <div className="border border-yellow-300">
            <div className="bg-yellow-100 font-semibold px-2 py-1 border-b border-yellow-300">
              Physical Examination
            </div>
            <textarea
              name="history"
              className="w-full h-[60px] p-2 border-none resize-none"
              placeholder="Enter Physical examination..."
              value={clinicalNotes.history}
              onChange={handleChange}
            />
          </div>

          <div className="border border-yellow-300">
            <div className="bg-yellow-100 font-semibold px-2 py-1 border-b border-yellow-300">
              Assessment/Diagnosis
            </div>
            <textarea
              name="duration"
              className="w-full h-[80px] p-2 border-none resize-none"
              placeholder="Enter Assessment/Diagnosis..."
              value={clinicalNotes.duration}
              onChange={handleChange}
            />
            <div className="bg-yellow-100 font-semibold px-2 py-1 border-t border-b border-yellow-300">
              Treatment Plan
            </div>
            <textarea
              name="treatmentPlan"
              className="w-full h-[80px] p-2 border-none resize-none"
              placeholder="Enter Treatment Plan..."
              value={clinicalNotes.treatmentPlan}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 h-full">
          {/* ICD Codes Section */}
          <div className="border border-yellow-300 flex-1 flex flex-col">
            <div className="bg-yellow-100 font-semibold px-2 py-1 border-b border-yellow-300 flex justify-between items-center">
              ICD Codes
              <button
                onClick={() => setShowIcdDropdown((prev) => !prev)}
                className="text-sm bg-pink-100 px-2 py-0.5 rounded-full"
              >
                ICD Desc 🔍
              </button>
            </div>
            {showIcdDropdown && (
              <div ref={dropdownRef} className="absolute z-50 left-4 right-4 top-36 bg-white border border-gray-300 rounded-md shadow-lg">
                <div className="p-2 border-b">
                  <input
                    type="text"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none"
                    placeholder="Search ICD description..."
                    value={icdSearch}
                    onChange={(e) => setIcdSearch(e.target.value)}
                  />
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {icdData.filter(item => item.shortDesc.toLowerCase().includes(icdSearch.toLowerCase())).map((item) => (
                    <div
                      key={item.code}
                      onClick={() => handleSelectIcd(item)}
                      className="p-3 cursor-pointer hover:bg-gray-100 border-b"
                    >
                      <div className="text-sm font-bold text-gray-800">{item.code}</div>
                      <div className="text-sm text-gray-700">{item.shortDesc}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <table className="w-full text-xs">
              <thead>
                <tr>
                  <th className="px-2 text-left">ICD Code</th>
                  <th className="px-2 text-left">ICD Description</th>
                </tr>
              </thead>
              <tbody>
                {clinicalNotes.secondaryDxList.map((item, i) => (
                  <tr key={i}>
                    <td className="px-2">{item.code}</td>
                    <td>{item.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Procedures Section */}
          <div className="border border-yellow-300 flex-1 flex flex-col">
            <div className="bg-yellow-100 font-semibold px-2 py-1 border-b border-yellow-300 flex justify-between items-center">
              Procedures
              <button
                onClick={() => setShowProcedureOptions(!showProcedureOptions)}
                className="text-sm bg-pink-100 px-2 py-0.5 rounded-full"
              >
                Short Desc 🔍
              </button>
            </div>
            {showProcedureOptions && (
              <div ref={dropdownRef} className="absolute z-50 left-4 right-4 top-36 bg-white border border-gray-300 rounded-md shadow-lg">
                <ul className="max-h-64 overflow-y-auto">
                  {procedureData.map((proc, index) => (
                    <li
                      key={index}
                      onClick={() => handleSelectProcedure({ code: proc.code, desc: proc.desc })}
                      className="p-3 cursor-pointer hover:bg-gray-100 border-b"
                    >
                      <div className="text-sm font-bold text-gray-800">{proc.code}</div>
                      <div className="text-sm text-gray-700">{proc.desc}</div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <table className="w-full text-xs">
              <thead>
                <tr>
                  <th className="px-2 text-left">Procedure Code</th>
                  <th className="px-2 text-left">Description</th>
                  <th className="px-2 text-left">Quantity</th>
                </tr>
              </thead>
              <tbody>
                {clinicalNotes.procedures.map((proc, idx) => (
                  <tr key={idx}>
                    <td className="px-2">{proc.code}</td>
                    <td>{proc.desc}</td>
                    <td>{proc.qty}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

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
