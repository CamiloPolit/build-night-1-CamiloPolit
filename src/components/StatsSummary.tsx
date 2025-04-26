import React, { useMemo } from 'react';
import { Review } from '../types';

interface StatsSummaryProps {
  reviews: Review[];
}

const StatsSummary: React.FC<StatsSummaryProps> = ({ reviews }) => {
  const stats = useMemo(() => {
    if (reviews.length === 0) {
      return {
        averageClarity: 0,
        averageWorkload: 0,
        averageDifficulty: 0,
        averageMedian: 0,
        totalReviews: 0
      };
    }

    const sum = reviews.reduce(
      (acc, review) => {
        return {
          clarity: acc.clarity + review.clarity,
          workload: acc.workload + (review.workload || 0),
          difficulty: acc.difficulty + review.difficulty,
          median: acc.median + (review.medianGrade || review.approximateMedian || 0)
        };
      },
      { clarity: 0, workload: 0, difficulty: 0, median: 0 }
    );

    return {
      averageClarity: parseFloat((sum.clarity / reviews.length).toFixed(1)),
      averageWorkload: parseFloat((sum.workload / reviews.length).toFixed(1)),
      averageDifficulty: parseFloat((sum.difficulty / reviews.length).toFixed(1)),
      averageMedian: parseFloat((sum.median / reviews.length).toFixed(1)),
      totalReviews: reviews.length
    };
  }, [reviews]);

  if (reviews.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Resumen de evaluaciones</h2>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center p-3 bg-green-50 rounded-lg">
          <p className="text-sm text-gray-600">Nota mediana promedio</p>
          <p className="text-3xl font-bold text-green-700">{stats.averageMedian.toFixed(1)}</p>
        </div>

        <div className="text-center p-3 bg-purple-50 rounded-lg">
          <p className="text-sm text-gray-600">Total de reseñas</p>
          <p className="text-3xl font-bold text-purple-700">{stats.totalReviews}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="mb-2">
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-gray-700">Claridad al explicar</span>
            <span className="text-sm font-medium text-gray-700">{stats.averageClarity}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${(stats.averageClarity / 5) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="mb-2">
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-gray-700">Carga de trabajo</span>
            <span className="text-sm font-medium text-gray-700">{stats.averageWorkload}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-red-600 h-2.5 rounded-full"
              style={{ width: `${(stats.averageWorkload / 5) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="mb-2">
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-gray-700">Dificultad</span>
            <span className="text-sm font-medium text-gray-700">{stats.averageDifficulty}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-orange-600 h-2.5 rounded-full"
              style={{ width: `${(stats.averageDifficulty / 5) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsSummary;