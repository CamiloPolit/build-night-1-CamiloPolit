import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { RatingInputProps } from '../types';

const RatingInput: React.FC<RatingInputProps> = ({
  value,
  onChange,
  label,
  max = 5,
  allowHalf = true,
  ratingLabels
}) => {
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!allowHalf) {
      return;
    }

    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const halfPoint = rect.width / 2;

    const rating = parseInt(button.getAttribute('data-rating') || '0');
    setHoverValue(x < halfPoint ? rating - 0.5 : rating);
  };

  const handleMouseLeave = () => {
    setHoverValue(null);
  };

  const handleClick = (rating: number, e: React.MouseEvent<HTMLButtonElement>) => {
    if (allowHalf) {
      const button = e.currentTarget;
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const halfPoint = rect.width / 2;

      onChange(x < halfPoint ? rating - 0.5 : rating);
    } else {
      onChange(rating);
    }
  };

  const displayValue = hoverValue !== null ? hoverValue : value;

  const getRatingDescription = (rating: number): string => {
    // Use custom labels if provided, otherwise fall back to defaults
    const defaultLabels = {
      unrated: 'Sin calificar',
      lowest: 'Muy deficiente',
      low: 'Deficiente',
      medium: 'Regular',
      high: 'Bueno',
      highest: 'Excelente'
    };

    const labels = {
      unrated: ratingLabels?.unrated || defaultLabels.unrated,
      lowest: ratingLabels?.lowest || defaultLabels.lowest,
      low: ratingLabels?.low || defaultLabels.low,
      medium: ratingLabels?.medium || defaultLabels.medium,
      high: ratingLabels?.high || defaultLabels.high,
      highest: ratingLabels?.highest || defaultLabels.highest
    };

    if (rating === 0) return labels.unrated;
    if (rating <= 1) return labels.lowest;
    if (rating <= 2) return labels.low;
    if (rating <= 3) return labels.medium;
    if (rating <= 4) return labels.high;
    return labels.highest;
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="flex items-center">
        {Array.from({ length: max }).map((_, index) => {
          const rating = index + 1;
          const filled = rating <= displayValue;
          const halfFilled = allowHalf && (rating - 0.5) === displayValue;

          return (
            <button
              key={index}
              type="button"
              data-rating={rating}
              onClick={(e) => handleClick(rating, e)}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="focus:outline-none focus:ring-1 focus:ring-blue-200 focus:ring-opacity-40 rounded-sm transition-all hover:scale-110 p-1 relative"
              aria-label={`Rate ${rating} out of ${max}`}
            >
              <div className="relative">
                {filled ? (
                  <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                ) : halfFilled ? (
                  <div className="relative">
                    <Star className="w-6 h-6 text-yellow-400" />
                    <div className="absolute inset-0 overflow-hidden w-1/2">
                      <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                    </div>
                  </div>
                ) : (
                  <Star className="w-6 h-6 text-gray-300" />
                )}
              </div>
            </button>
          );
        })}
        <div className="ml-3">
          <span className="text-sm font-medium text-gray-600 mr-2">
            {displayValue > 0 ? displayValue.toFixed(1) : '-'}
          </span>
          <span className="text-sm text-gray-500">
            {getRatingDescription(displayValue)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RatingInput;