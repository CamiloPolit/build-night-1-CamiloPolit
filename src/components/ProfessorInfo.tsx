import React from 'react';
import { Professor } from '../types';
import { GraduationCap, BookOpen, Building2 } from 'lucide-react';

interface ProfessorInfoProps {
  professor: Professor;
  courseName: string;
}

const ProfessorInfo: React.FC<ProfessorInfoProps> = ({ professor, courseName }) => {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl shadow-sm border border-blue-100 overflow-hidden">
        <div className="p-6">
          <div className="flex flex-wrap md:flex-nowrap items-start justify-between gap-5">
            <div className="flex items-center">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-4 rounded-xl shadow-md">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <div className="ml-4">
                <h2 className="text-2xl font-bold text-gray-800">{professor.name}</h2>
                <p className="text-indigo-600 font-medium">{professor.title}</p>
              </div>
            </div>

            <div className="flex-shrink-0">
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-100">
                  <Building2 className="w-4 h-4 text-indigo-600 mr-2" />
                  <span className="text-sm font-medium text-gray-700">{professor.department}</span>
                </div>

                <div className="flex items-center px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-100">
                  <BookOpen className="w-4 h-4 text-blue-600 mr-2" />
                  <span className="text-sm font-medium text-gray-700">{courseName}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center mb-2">
                <GraduationCap className="w-4 h-4 text-blue-600 mr-2" />
                <h3 className="text-sm font-semibold text-gray-700">Departamento</h3>
              </div>
              <p className="font-medium text-gray-800">{professor.department}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessorInfo;