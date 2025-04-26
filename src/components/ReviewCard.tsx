import React from 'react';
import { Star, CheckCircle2, CalendarDays, Clock } from 'lucide-react';
import { Review } from '../types';

interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
              }`}
          />
        ))}
      </div>
    );
  };

  // Calculate an overall rating if not provided
  const overallRating = review.overall ??
    Math.round((review.clarity + (review.workload || 0) + review.difficulty) / 3);

  // Use medianGrade if available, fall back to approximateMedian for backward compatibility
  const medianGrade = review.medianGrade ?? review.approximateMedian ?? 0;

  return (
    <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-100 transition-all hover:shadow-md">
      <div className="flex justify-between items-start mb-4">
        <div className="bg-gray-50 rounded-lg px-3 py-2 flex items-start">
          <CalendarDays className="h-5 w-5 text-gray-500 mt-0.5 mr-2.5" />
          <div>
            <p className="text-xs font-medium text-gray-700">
              Cursado en {review.year}, Semestre {review.semester}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              <span className="inline-flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                Reseña: {formatDate(review.date)}
              </span>
            </p>
          </div>
        </div>
        {medianGrade > 0 && (
          <div className="bg-blue-100 text-blue-800 text-sm font-semibold rounded-lg px-3 py-2">
            <p className="text-xs text-blue-600">Mediana nota final</p>
            <p className="text-xl font-bold text-center">{medianGrade.toFixed(1)}</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <p className="text-xs text-gray-500">Claridad al explicar</p>
          {renderStars(review.clarity)}
        </div>
        <div>
          <p className="text-xs text-gray-500">Carga de trabajo</p>
          {renderStars(review.workload || 0)}
        </div>
        <div>
          <p className="text-xs text-gray-500">Dificultad</p>
          {renderStars(review.difficulty)}
        </div>
        {review.hasPartials && (
          <div className="flex items-center">
            <div className="flex items-center text-green-600">
              <CheckCircle2 className="h-4 w-4 mr-1.5" />
              <span className="text-xs font-medium">Evaluaciones adicionales</span>
            </div>
          </div>
        )}
      </div>

      {review.partialsDescription && (
        <div className="mb-3 px-3 py-2 bg-green-50 border border-green-100 rounded-lg">
          <div className="flex items-center mb-1">
            <span className="block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            <p className="text-xs font-medium text-green-800">Evaluaciones adicionales:</p>
          </div>
          <p className="text-xs text-green-700 pl-4">{review.partialsDescription}</p>
        </div>
      )}

      {review.comment && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <p className="text-gray-700 text-sm">{review.comment}</p>
        </div>
      )}
    </div>
  );
};

export default ReviewCard;