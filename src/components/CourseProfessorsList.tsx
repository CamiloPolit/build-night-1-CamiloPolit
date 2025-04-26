import React from 'react';
import { Professor } from '../types';
import { ChevronRight } from 'lucide-react';
import { getProfessorsByCourse, reviews } from '../data/mockData';

interface CourseProfessorsListProps {
  courseId: string;
  onSelectProfessor: (professorId: string) => void;
}

const CourseProfessorsList: React.FC<CourseProfessorsListProps> = ({
  courseId,
  onSelectProfessor
}) => {
  // Get professors for the selected course
  const professors = getProfessorsByCourse(courseId);

  // Function to count reviews for a professor in this specific course
  const getReviewsCount = (professorId: string): number => {
    return reviews.filter(review =>
      review.professorId === professorId && review.courseId === courseId
    ).length;
  };

  if (professors.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-100">
        <div className="text-center py-8">
          <span className="text-3xl mb-3 block">🔍</span>
          <h3 className="text-lg font-medium text-gray-700">No hay profesores asociados a este curso</h3>
          <p className="text-gray-500 text-sm mt-1">Selecciona otro curso o intenta más tarde</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-100 animate-fadeIn">
      <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
        <span className="text-2xl mr-2" role="img" aria-label="Graduation Cap">🎓</span>
        Profesores para este curso
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {professors.map((professor) => {
          const reviewCount = getReviewsCount(professor.id);
          const hasNoReviews = reviewCount === 0;

          return (
            <button
              key={professor.id}
              onClick={() => onSelectProfessor(professor.id)}
              className={`group w-full p-0 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${hasNoReviews ? 'border border-amber-200' : ''}`}
            >
              <div className="flex flex-col h-full">
                <div className={`${hasNoReviews ? 'bg-gradient-to-r from-amber-50 to-orange-50' : 'bg-gradient-to-r from-blue-50 to-indigo-50'} p-4 border-b ${hasNoReviews ? 'border-amber-100' : 'border-blue-100'}`}>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3" role="img" aria-label="Professor">👨‍🏫</span>
                      <div>
                        <h3 className="font-medium text-gray-900">{professor.name}</h3>
                      </div>
                    </div>
                    <span className="flex items-center text-blue-700 opacity-0 group-hover:opacity-100 transition-opacity">
                      Ver perfil
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </span>
                  </div>
                </div>

                <div className="bg-white p-3 flex items-center justify-between">
                  <div className="flex items-center">
                    {hasNoReviews ? (
                      <>
                        <span className="text-lg mr-2" role="img" aria-label="Warning">⚠️</span>
                        <span className="text-xs font-medium text-amber-700">Sin reseñas</span>
                      </>
                    ) : (
                      <>
                        <span className="text-lg mr-2" role="img" aria-label="Reviews">💬</span>
                        <span className="text-xs font-medium text-gray-700">{reviewCount} reseña{reviewCount !== 1 ? 's' : ''}</span>
                      </>
                    )}
                  </div>
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    {professor.department}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CourseProfessorsList; 