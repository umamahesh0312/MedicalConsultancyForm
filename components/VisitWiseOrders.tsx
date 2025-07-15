import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlask, faPaste, faBook } from '@fortawesome/free-solid-svg-icons';
import { faFile } from '@fortawesome/free-regular-svg-icons';

interface Visit {
  id: string;
  date: string;
}

interface VisitWiseOrdersProps {
  selectedVisit: string | null;
  setSelectedVisit: (id: string) => void;
  additionalNotes: string;
  setAdditionalNotes: (value: string) => void;
}

const VisitWiseOrders: React.FC<VisitWiseOrdersProps> = ({
  selectedVisit,
  setSelectedVisit,
  additionalNotes,
  setAdditionalNotes,
}) => {
  const visits: Visit[] = [
    { id: 'VST-12345', date: '10/07/2025' },
    { id: 'VST-12346', date: '09/07/2025' },
    { id: 'VST-12347', date: '08/07/2025' },
    { id: 'VST-12348', date: '07/07/2025' },
    { id: 'VST-12349', date: '06/07/2025' },
  ];

  const labOrdersData = [
    {
      id: 'LAB-001',
      cpt: '80053',
      desc: 'Metabolic Panel',
      qty: '1',
      changedBy: 'EMP-001',
      status: 'Pending',
    },
    {
      id: 'LAB-002',
      cpt: '83036',
      desc: 'Hemoglobin A1C',
      qty: '1',
      changedBy: 'EMP-220',
      status: 'In Process',
    },
    {
      id: 'LAB-003',
      cpt: '81003',
      desc: 'Urinalysis',
      qty: '1',
      changedBy: 'EMP-001',
      status: 'Completed',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Recent Visits */}
      <h2 className="text-lg font-semibold">Recent Visits</h2>
      <div className="flex gap-4 overflow-x-auto">
        {visits.map((visit) => (
          <div
            key={visit.id}
            className={`min-w-[140px] p-4 rounded cursor-pointer border text-center transition-all ${
              selectedVisit === visit.id
                ? 'bg-blue-100 border-blue-500 text-blue-800'
                : 'bg-gray-100 border-gray-300 text-gray-700'
            }`}
            onClick={() => setSelectedVisit(visit.id)}
          >
            <div className="font-semibold text-sm">{visit.id}</div>
            <div className="text-xs">{visit.date}</div>
          </div>
        ))}
      </div>

      {/* Orders Summary */}
      <h2 className="text-lg font-semibold">Orders Summary</h2>
      <div className="bg-blue-50 p-4 rounded-md grid grid-cols-4 gap-4 text-[11px]">
        <div><strong>Patient ID:</strong> -</div>
        <div><strong>Visit ID:</strong> {selectedVisit || '-'}</div>
        <div><strong>Bill Date:</strong> -</div>
        <div><strong>Visit Order Number:</strong> -</div>
      </div>

      {/* Lab Orders */}
      <OrdersTable
        title={
          <>
            <FontAwesomeIcon icon={faFlask} className="mr-1 text-black-700" />
            Lab Orders
          </>
        }
        columns={['Lab Order #', 'CPT Code', 'Description', 'Qty', 'Status changed by', 'Status']}
        data={labOrdersData.map((order) => [
          order.id,
          order.cpt,
          order.desc,
          order.qty,
          order.changedBy,
          <Badge key={order.id} label={order.status} color={
            order.status === 'Pending' ? 'yellow' :
            order.status === 'In Process' ? 'blue' : 'green'
          } />
        ])}
      />

      {/* Radiology Orders */}
      <OrdersTable
        title={
          <>
            <FontAwesomeIcon icon={faPaste} className="mr-1 text-black-700" />
            Radiology Orders
          </>
        }
        columns={['Rad Order #', 'CPT Code', 'Description', 'Qty', 'Status changed by', 'Status']}
        data={[]}
        emptyMessage="No radiology orders"
      />

      {/* Other Procedures */}
      <OrdersTable
        title={
          <>
            <FontAwesomeIcon icon={faBook} className="mr-1 text-black-700" />
            Other Procedures
          </>
        }
        columns={['Procedure Order #', 'CPT Code', 'Description', 'Qty', 'Status changed by', 'Status']}
        data={[]}
        emptyMessage="No other procedures"
      />

      {/* ICD Codes */}
      <OrdersTable
        title={
          <>
            <FontAwesomeIcon icon={faFile} className="mr-1 text-black-700" />
            ICD Codes Summary
          </>
        }
        columns={['ICD Code', 'Description', 'Type']}
        data={[]}
        emptyMessage="No ICD codes"
      />

      {/* Medications */}
      <OrdersTable
        title={
          <>
            <FontAwesomeIcon icon={faFile} className="mr-1 text-black-700" />
            Medications
          </>
        }
        columns={['Medication', 'Dosage', 'Frequency']}
        data={[]}
        emptyMessage="No medications"
      />

      {/* Additional Notes */}
      <div className="mt-6">
        <label className="text-xs font-medium block mb-1">Additional Notes</label>
        <textarea
          className="w-full h-24 border border-gray-300 rounded px-3 py-2 text-[11px] focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          placeholder="Any special instructions or medical conditions..."
          value={additionalNotes}
          onChange={(e) => setAdditionalNotes(e.target.value)}
        />
      </div>
    </div>
  );
};

const Badge = ({ label, color }: { label: string; color: string }) => {
  const colorClasses: Record<string, string> = {
    yellow: 'bg-yellow-100 text-yellow-800',
    blue: 'bg-blue-100 text-blue-800',
    green: 'bg-green-100 text-green-800',
  };
  return (
    <span className={`text-[10px] px-2 py-1 rounded ${colorClasses[color]}`}>{label}</span>
  );
};

const OrdersTable = ({
  title,
  columns,
  data,
  emptyMessage,
}: {
  title: React.ReactNode;
  columns: string[];
  data: (string | JSX.Element)[][];
  emptyMessage?: string;
}) => {
  return (
    <>
      <h3 className="text-sm font-semibold mt-8">{title}</h3>
      <div className="overflow-x-auto">
        <table className="w-full mt-2 table-auto text-[11px] border">
          <thead className="bg-gray-100 border-b">
            <tr>
              {columns.map((col, i) => (
                <th key={i} className="p-2 text-left">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((row, rIdx) => (
                <tr key={rIdx} className="border-t">
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className="p-2">{cell}</td>
                  ))}
                </tr>
              ))
            ) : (
              <tr className="border-t">
                <td colSpan={columns.length} className="p-2 text-gray-400 italic">
                  {emptyMessage || 'No data'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default VisitWiseOrders;
