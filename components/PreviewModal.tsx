import React, { forwardRef } from 'react';

interface PreviewModalProps {
  onClose: () => void;
  onPrint: () => void;
  patientInfo: any;
  visitDetails: any;
  vitals: any;
  clinicalNotes: any;
  selectedVisit: string | null;
  additionalNotes: string;
}

const PreviewModal = forwardRef<HTMLDivElement, PreviewModalProps>(
  (
    {
      onClose,
      patientInfo,
      visitDetails,
      vitals,
      clinicalNotes,
      selectedVisit,
      additionalNotes,
    },
    ref
  ) => {
    const currentTimestamp = new Date().toLocaleString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });

    const handlePrint = () => {
      window.print();
    };

    return (
      <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-start overflow-y-auto p-8 print:static print:p-0 print:overflow-visible print:bg-white print:z-auto">
        <div
          ref={ref}
          className="bg-white w-full max-w-5xl rounded shadow-lg p-6 relative print:w-full print:max-w-full print:rounded-none print:shadow-none print:p-6 print:static"
        >
          {/* Header - hidden in print */}
          <div className="flex justify-between items-center mb-4 border-b pb-2 print:hidden">
            <h2 className="text-2xl font-bold">Medical Claim Form Preview</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="bg-blue-600 text-white px-4 py-1 rounded text-sm"
              >
                Print
              </button>
              <button
                onClick={onClose}
                className="text-gray-500 text-xl font-bold hover:text-red-600"
              >
                &times;
              </button>
            </div>
          </div>

          {/* Form Body */}
          <div className="bg-white border rounded p-6 space-y-6 print:border-none print:rounded-none print:p-0">
            <div className="text-center border-b pb-4 print:border-none">
              <h3 className="text-xl font-bold">Medical Claim Form</h3>
              <p className="text-sm text-gray-600">
                Healthcare Medical Center<br />
                123 Medical Plaza, Healthcare City, HC 12345
              </p>
            </div>

            <Section title="Patient Information">
              <TwoColumn label="Name" value={`${patientInfo.firstName} ${patientInfo.lastName}`} />
              <TwoColumn label="Patient ID" value={patientInfo.uhid} />
              <TwoColumn label="DOB" value={`${patientInfo.dob} (Age: ${patientInfo.age})`} />
              <TwoColumn label="Visit ID" value={visitDetails.visitId || 'Auto'} />
              <TwoColumn label="Gender" value={patientInfo.gender} />
              <TwoColumn label="Contact" value={patientInfo.phone1 || '-'} />
              <TwoColumn label="Nationality" value={patientInfo.nationality} />
              <TwoColumn label="Insurance" value={patientInfo.insuranceName || '-'} />
            </Section>

            <Section title="Visit Wise Order">
              <TwoColumn label="Selected Visit ID" value={selectedVisit || '-'} />
              <TwoColumn label="Additional Notes" value={additionalNotes} />
            </Section>

            <Section title="Clinical Summary">
              <TwoColumn label="Chief Complaint" value={clinicalNotes.chiefComplaint} />
              <TwoColumn label="Duration" value={clinicalNotes.duration} />
              <TwoColumn label="History" value={clinicalNotes.history} />
            </Section>

            <Section title="Vital Signs">
              <TwoColumn label="Height" value={`${vitals.height} cm`} />
              <TwoColumn label="Weight" value={`${vitals.weight} kg`} />
              <TwoColumn label="Temperature" value={`${vitals.temperature} °C`} />
              <TwoColumn label="SPO2" value={`${vitals.spo2} %`} />
              <TwoColumn label="BP" value={vitals.bp} />
              <TwoColumn label="Pulse Rate" value={`${vitals.pulse} bpm`} />
              <TwoColumn label="Resp. Rate" value={`${vitals.respiratoryRate} /min`} />
              <TwoColumn label="Date & Time" value={`${vitals.date} ${vitals.time}`} />
            </Section>

            <Section title="Diagnosis">
              <TwoColumn
                label="Primary"
                value={`${clinicalNotes.primaryDxCode} - ${clinicalNotes.primaryDxDesc}`}
              />
              {clinicalNotes.secondaryDxList.map((dx: string, idx: number) => (
                <TwoColumn key={idx} label={`Secondary ${idx + 1}`} value={dx} />
              ))}
            </Section>

            <Section title="Medications">
              {clinicalNotes.medications.length > 0 ? (
                <ul className="list-disc pl-6 text-sm text-gray-800 col-span-2">
                  {clinicalNotes.medications.map((med: any, idx: number) => (
                    <li key={idx}>
                      {med.name} – {med.dose} – {med.freq}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500 col-span-2">No medications</p>
              )}
            </Section>

            <Section title="Treatment Plan">
              <div className="text-sm text-gray-800 col-span-2">
                {clinicalNotes.treatmentPlan || '-'}
              </div>
            </Section>

            <div className="grid grid-cols-2 gap-6 mt-6">
              <div className="text-sm border-t pt-2 font-semibold">Doctor Signature & Seal</div>
              <div className="text-sm border-t pt-2 font-semibold">Patient Signature</div>
            </div>

            <div className="mt-6 text-sm">
              <strong>Date & Time of Examination:</strong>
              <div className="text-xs text-gray-600">{currentTimestamp}</div>
            </div>

            <div className="mt-4 bg-yellow-100 border-l-4 border-yellow-400 p-3 text-sm print:break-inside-avoid">
              <strong>Disclaimer:</strong> I am Dr. {clinicalNotes?.doctorName || '_'}, treating
              doctor of the above patient and all the information provided in this claims form is
              based on my professional expertise and is true to the best of my knowledge.
            </div>

            <div className="mt-4 text-sm">
              <strong>Referral:</strong> {clinicalNotes?.referredTo || 'IF THEN – FOR SPECIALIST'}
            </div>

            <div className="mt-8 text-center text-xs text-gray-500 border-t pt-4">
              This is a computer-generated document. Valid with digital signature and seal. <br />
              Healthcare Medical Center – 123 Medical Plaza, Healthcare City, HC 12345
            </div>
          </div>
        </div>
      </div>
    );
  }
);

// ✅ Add displayName to fix forwardRef issue
PreviewModal.displayName = 'PreviewModal';

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="break-inside-avoid mb-6 print:mb-4">
    <h3 className="text-lg font-semibold border-b pb-1 mb-2">{title}</h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">{children}</div>
  </div>
);

const TwoColumn = ({ label, value }: { label: string; value: string | number | undefined }) => (
  <div className="text-sm">
    <strong>{label}:</strong> <span className="text-gray-700">{value ?? '-'}</span>
  </div>
);

export default PreviewModal;
