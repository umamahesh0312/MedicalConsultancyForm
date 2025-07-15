import React from 'react';

interface HeaderProps {
  onPreviewClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onPreviewClick }) => {
  return (
    <div className="bg-blue-600 text-white py-3 px-6 flex justify-between items-center">
      <div>
        <h1 className="text-xl font-bold">EHR System - Medical Claim Form</h1>
        <p className="text-sm">Healthcare Medical Center - 123 Medical Plaza, Healthcare City, HC 12345</p>
      </div>
      <div className="flex gap-2">
        <button className="bg-yellow-400 text-black px-3 py-1 rounded font-semibold">Logo</button>
        <button
          className="bg-green-500 px-3 py-1 rounded font-semibold"
          onClick={onPreviewClick}
        >
          Preview Form
        </button>
        <button className="bg-blue-700 px-3 py-1 rounded font-semibold">Save</button>
      </div>
    </div>
  );
};

export default Header;
