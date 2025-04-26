import React from 'react';
import { Star } from 'lucide-react';
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

  return (
    <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-100 transition-all hover:shadow-md">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-gray-800">{review.studentName}</h3>
          <p className="text-sm text-gray-500">{review.course} • {formatDate(review.date)}</p>
        </div>
        <div className="flex items-center">
          <span className="text-2xl font-bold text-blue-700 mr-2">{review.overall}</span>
          <div className="bg-blue-100 text-blue-800 text-xs font-semibold rounded-full px-2 py-1">
            Nota ~{review.approximateMedian.toFixed(1)}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <p className="text-xs text-gray-500">Claridad</p>
          {renderStars(review.clarity)}
        </div>
        <div>
          <p className="text-xs text-gray-500">Dominio</p>
          {renderStars(review.knowledge)}
        </div>
        <div>
          <p className="text-xs text-gray-500">Disponibilidad</p>
          {renderStars(review.helpfulness)}
        </div>
        <div>
          <p className="text-xs text-gray-500">Dificultad</p>
          {renderStars(review.difficulty)}
        </div>
      </div>

      {review.comment && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <p className="text-gray-700 text-sm">{review.comment}</p>
        </div>
      )}
    </div>
  );
};

export default ReviewCard;