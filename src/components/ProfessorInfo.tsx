import React from 'react';
import { Professor } from '../types';
import { GraduationCap, BookOpen } from 'lucide-react';

interface ProfessorInfoProps {
  professor: Professor;
  courseName: string;
}

const ProfessorInfo: React.FC<ProfessorInfoProps> = ({ professor, courseName }) => {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-3 rounded-full">
                <GraduationCap className="w-6 h-6 text-blue-700" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">{professor.name}</h2>
                <p className="text-gray-500">{professor.title}</p>
              </div>
            </div>
            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1.5 rounded-full uppercase font-semibold tracking-wide">
              {professor.department}
            </span>
          </div>

          <div className="flex items-center space-x-3 mb-4 bg-gray-50 p-3 rounded-lg">
            <BookOpen className="w-5 h-5 text-gray-600" />
            <div>
              <p className="text-sm text-gray-600 font-medium">Curso actual</p>
              <p className="text-gray-800 font-medium">{courseName}</p>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-4">
            <p className="text-gray-600 leading-relaxed">{professor.bio}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessorInfo;