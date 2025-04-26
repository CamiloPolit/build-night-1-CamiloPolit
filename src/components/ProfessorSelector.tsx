import React from 'react';
import { professors } from '../data/mockData';

interface ProfessorSelectorProps {
  selectedId: string;
  onSelect: (id: string) => void;
}

const ProfessorSelector: React.FC<ProfessorSelectorProps> = ({ selectedId, onSelect }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <label htmlFor="professor-select" className="block text-sm font-medium text-gray-700 mb-2">
        Selecciona un profesor:
      </label>
      <select
        id="professor-select"
        value={selectedId}
        onChange={(e) => onSelect(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
      >
        {professors.map((professor) => (
          <option key={professor.id} value={professor.id}>
            {professor.name} - {professor.department}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProfessorSelector;