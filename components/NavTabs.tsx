import React from 'react';

interface NavTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  'Patient Information',
  'Visit Details',
  'Vitals',
  'Clinical Notes',
  'Visit Wise Order & Orders'
];

const NavTabs: React.FC<NavTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="border-b bg-white px-6">
      <ul className="flex space-x-4">
        {tabs.map((tab) => (
          <li key={tab}>
            <button
              onClick={() => onTabChange(tab)}
              className={`inline-block px-4 py-2 text-sm font-medium border-b-2 transition-all duration-200 hover:text-[#005F56] ${
                activeTab === tab ? 'border-[#005F56] text-[#005F56]' : 'border-transparent text-gray-600'
              }`}
            >
              {tab}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavTabs;
