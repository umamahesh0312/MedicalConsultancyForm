import React, { useRef, useState } from 'react';
import Header from '../components/Header';
import NavTabs from '../components/NavTabs';
import PatientInfoForm from '../components/PatientInfoForm';
import VisitDetailsForm from '../components/VisitDetailsForm';
import VitalsForm from '../components/VitalsForm';
import ClinicalNotesForm from '../components/ClinicalNotesForm';
import VisitWiseOrders from '../components/VisitWiseOrders';
import PreviewModal from '../components/PreviewModal';
import { useReactToPrint } from 'react-to-print';

const IndexPage = () => {
  const [activeTab, setActiveTab] = useState('Patient Information');
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  const [patientInfo, setPatientInfo] = useState({
    uhid: '', firstName: '', lastName: '', phone1: '', phone2: '',
    nationality: '', dob: '', age: '', gender: '',
    insuranceId: '', insuranceName: '', payer: ''
  });

  const [visitDetails, setVisitDetails] = useState({
    visitId: '', visitDate: '', visitTime: '', doctor: '', department: '', visitType: ''
  });

  const [vitals, setVitals] = useState({
    date: '', time: '', height: '', weight: '', temperature: '',
    spo2: '', bp: '', pulse: '', respiratoryRate: ''
  });

  const [clinicalNotes, setClinicalNotes] = useState({
    chiefComplaint: '',
    duration: '',
    history: '',
    primaryDxCode: '',
    primaryDxDesc: '',
    secondaryDxList: [],
    secondaryDxInput: '',
    procedureInput: { code: '', desc: '', type: '', qty: '' },
    procedures: [],
    medInput: { name: '', dose: '', freq: '' },
    medications: [],
    treatmentPlan: '',
    referredTo: '',
    referralReason: '',
    doctorName: '',
    acknowledged: false,
    remarks: ''
  });

  const [selectedVisit, setSelectedVisit] = useState<string | null>(null);
  const [additionalNotes, setAdditionalNotes] = useState('');

  const componentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'Medical Claim Form',
    removeAfterPrint: true,
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <Header onPreviewClick={() => setShowPreviewModal(true)} />
      <NavTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="p-6">
        {activeTab === 'Patient Information' && (
          <PatientInfoForm patientInfo={patientInfo} setPatientInfo={setPatientInfo} />
        )}

        {activeTab === 'Visit Details' && (
          <VisitDetailsForm visitDetails={visitDetails} setVisitDetails={setVisitDetails} />
        )}

        {activeTab === 'Vitals' && (
          <VitalsForm vitals={vitals} setVitals={setVitals} />
        )}

        {activeTab === 'Clinical Notes' && (
          <ClinicalNotesForm clinicalNotes={clinicalNotes} setClinicalNotes={setClinicalNotes} />
        )}

        {activeTab === 'Visit Wise Order & Orders' && (
          <VisitWiseOrders
            selectedVisit={selectedVisit}
            setSelectedVisit={setSelectedVisit}
            additionalNotes={additionalNotes}
            setAdditionalNotes={setAdditionalNotes}
          />
        )}
      </main>

      {showPreviewModal && (
        <div id="print-section">
          <PreviewModal
            ref={componentRef}
            onPrint={handlePrint}
            onClose={() => setShowPreviewModal(false)}
            patientInfo={patientInfo}
            visitDetails={visitDetails}
            vitals={vitals}
            clinicalNotes={clinicalNotes}
            selectedVisit={selectedVisit}
            additionalNotes={additionalNotes}
          />
        </div>
      )}
    </div>
  );
};

export default IndexPage;
