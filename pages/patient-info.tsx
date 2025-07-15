import React, { useState } from 'react';
import Header from '../components/Header';
import NavTabs from '../components/NavTabs';
import PatientInfoForm from '../components/PatientInfoForm';

const PatientInfoPage = () => {
  const [activeTab, setActiveTab] = useState('Patient Information');
  const [patientInfo, setPatientInfo] = useState({
    uhid: '',
    firstName: '',
    lastName: '',
    phone1: '',
    phone2: '',
    nationality: '',
    dob: '',
    age: '',
    gender: '',
    insuranceId: '',
    insuranceName: '',
    payer: '',
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <Header onPreviewClick={() => {}} />
      <NavTabs activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="p-6">
        <PatientInfoForm
          patientInfo={patientInfo}
          setPatientInfo={setPatientInfo}
        />
      </main>
    </div>
  );
};

export default PatientInfoPage;
