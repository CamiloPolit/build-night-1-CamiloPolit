import React from 'react';
import { getSelectedProfessor, getCourseById, getProfessorReviews } from '../data/mockData';
import ReviewList from './ReviewList';
import StatsSummary from './StatsSummary';

interface ProfessorDetailProps {
  professorId: string;
  courseId: string;
  onBack: () => void;
}

const ProfessorDetail: React.FC<ProfessorDetailProps> = ({ professorId, courseId, onBack }) => {
  const professor = getSelectedProfessor(professorId);
  const course = getCourseById(courseId);
  const reviews = getProfessorReviews(professorId, courseId);

  if (!professor || !course) return null;

  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="mb-4 flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        aria-label="Volver a la lista de profesores"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onBack();
          }
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 mr-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Volver a la lista de profesores
      </button>

      <div className="bg-white rounded-xl shadow-md p-6 mb-6 border border-gray-100">
        <div className="flex items-start gap-4">
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-4 rounded-lg shadow-sm text-white text-2xl">
            {professor.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{professor.name}</h1>
            <p className="text-gray-600 mb-2">{professor.title}</p>
            <p className="text-gray-500 text-sm mb-4">{professor.bio}</p>
            <div className="flex items-center">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-2">
                {course.name}
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                Semestre 2025-1
              </span>
            </div>
          </div>
        </div>
      </div>

      <StatsSummary reviews={reviews} />

      <div id="reviews-section" className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <span className="text-2xl mr-2" role="img" aria-label="Reviews">💬</span>
          Reseñas de estudiantes
        </h2>
        <ReviewList reviews={reviews} />
      </div>
    </div>
  );
};

export default ProfessorDetail; 