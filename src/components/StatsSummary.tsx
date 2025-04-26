import React, { useMemo } from 'react';
import { Review } from '../types';

interface StatsSummaryProps {
  reviews: Review[];
}

const StatsSummary: React.FC<StatsSummaryProps> = ({ reviews }) => {
  const stats = useMemo(() => {
    if (reviews.length === 0) {
      return {
        averageOverall: 0,
        averageClarity: 0,
        averageKnowledge: 0,
        averageHelpfulness: 0,
        averageDifficulty: 0,
        averageMedian: 0,
        totalReviews: 0
      };
    }

    const sum = reviews.reduce(
      (acc, review) => {
        return {
          overall: acc.overall + review.overall,
          clarity: acc.clarity + review.clarity,
          knowledge: acc.knowledge + review.knowledge,
          helpfulness: acc.helpfulness + review.helpfulness,
          difficulty: acc.difficulty + review.difficulty,
          median: acc.median + review.approximateMedian
        };
      },
      { overall: 0, clarity: 0, knowledge: 0, helpfulness: 0, difficulty: 0, median: 0 }
    );

    return {
      averageOverall: parseFloat((sum.overall / reviews.length).toFixed(1)),
      averageClarity: parseFloat((sum.clarity / reviews.length).toFixed(1)),
      averageKnowledge: parseFloat((sum.knowledge / reviews.length).toFixed(1)),
      averageHelpfulness: parseFloat((sum.helpfulness / reviews.length).toFixed(1)),
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

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-gray-600">Calificación general</p>
          <p className="text-3xl font-bold text-blue-700">{stats.averageOverall}</p>
        </div>

        <div className="text-center p-3 bg-green-50 rounded-lg">
          <p className="text-sm text-gray-600">Nota mediana</p>
          <p className="text-3xl font-bold text-green-700">{stats.averageMedian.toFixed(1)}</p>
        </div>

        <div className="text-center p-3 bg-purple-50 rounded-lg">
          <p className="text-sm text-gray-600">Total de reseñas</p>
          <p className="text-3xl font-bold text-purple-700">{stats.totalReviews}</p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="mb-2">
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-gray-700">Claridad</span>
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
            <span className="text-sm font-medium text-gray-700">Conocimiento</span>
            <span className="text-sm font-medium text-gray-700">{stats.averageKnowledge}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-green-600 h-2.5 rounded-full"
              style={{ width: `${(stats.averageKnowledge / 5) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="mb-2">
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-gray-700">Disponibilidad</span>
            <span className="text-sm font-medium text-gray-700">{stats.averageHelpfulness}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-purple-600 h-2.5 rounded-full"
              style={{ width: `${(stats.averageHelpfulness / 5) * 100}%` }}
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