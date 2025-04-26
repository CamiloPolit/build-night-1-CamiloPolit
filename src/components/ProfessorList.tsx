import React from 'react';
import { Professor } from '../types';

interface ProfessorListProps {
  professors: Professor[];
  onSelect: (professorId: string) => void;
}

const ProfessorList: React.FC<ProfessorListProps> = ({ professors, onSelect }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Profesores disponibles</h2>
      <div className="space-y-4">
        {professors.map((professor) => (
          <button
            key={professor.id}
            onClick={() => onSelect(professor.id)}
            className="w-full p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-left"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-gray-900">{professor.name}</h3>
                <p className="text-sm text-gray-500">{professor.title}</p>
              </div>
              <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                {professor.department}
              </span>
            </div>
            <p className="mt-2 text-sm text-gray-600">{professor.bio}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProfessorList;