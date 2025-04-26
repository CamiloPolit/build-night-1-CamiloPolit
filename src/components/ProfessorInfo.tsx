import React from 'react';
import { Professor } from '../types';
import { BookOpen, Building2, User } from 'lucide-react';

interface ProfessorInfoProps {
  professor: Professor;
  courseName: string;
}

const ProfessorInfo: React.FC<ProfessorInfoProps> = ({ professor, courseName }) => {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Subtle header with professor info */}
        <div className="px-5 py-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-indigo-50 p-2 rounded-full">
                <span className="text-indigo-600 text-2xl">🎓</span>
              </div>
              <div className="ml-3">
                <h2 className="text-lg font-semibold text-gray-800">{professor.name}</h2>
              </div>
            </div>

            <div className="flex space-x-2">
              <span className="inline-flex items-center px-3 py-1 text-xs font-medium bg-blue-50 text-blue-700 rounded-full">
                <BookOpen className="w-3 h-3 mr-1" />
                {courseName}
              </span>
              <span className="inline-flex items-center px-3 py-1 text-xs font-medium bg-indigo-50 text-indigo-700 rounded-full">
                <Building2 className="w-3 h-3 mr-1" />
                {professor.department}
              </span>
            </div>
          </div>
        </div>

        {/* Main content with greater emphasis */}
        <div className="p-5">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Información del Profesor</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <div className="flex items-center mb-2">
                <Building2 className="w-4 h-4 text-indigo-600 mr-2" />
                <h4 className="text-sm font-medium text-gray-700">Departamento</h4>
              </div>
              <p className="font-medium text-gray-800">{professor.department}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <div className="flex items-center mb-2">
                <BookOpen className="w-4 h-4 text-indigo-600 mr-2" />
                <h4 className="text-sm font-medium text-gray-700">Curso Actual</h4>
              </div>
              <p className="font-medium text-gray-800">{courseName}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessorInfo;