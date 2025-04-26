'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Header from '@/components/Header';
import ProfessorInfo from '@/components/ProfessorInfo';
import ReviewForm from '@/components/ReviewForm';
import ReviewList from '@/components/ReviewList';
import StatsSummary from '@/components/StatsSummary';
import Footer from '@/components/Footer';
import {
  getSelectedProfessor,
  getProfessorReviews,
  getCourseById
} from '@/data/mockData';
import type { Review, ReviewFormData } from '@/types';

export default function ProfessorPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.courseId as string;
  const professorId = params.professorId as string;

  const [reviews, setReviews] = useState<Review[]>(() =>
    getProfessorReviews(professorId, courseId)
  );
  const [formSubmitted, setFormSubmitted] = useState(false);

  const course = getCourseById(courseId);
  const professor = getSelectedProfessor(professorId);

  if (!course || !professor) {
    return <div>Professor or course not found</div>;
  }

  const handleReviewSubmit = (data: ReviewFormData) => {
    const newReview: Review = {
      id: `review-${Date.now()}`,
      professorId,
      courseId,
      email: data.email,
      date: new Date().toISOString().split('T')[0],
      year: data.year,
      semester: data.semester,
      clarity: data.clarity,
      workload: data.workload,
      difficulty: data.difficulty,
      hasPartials: data.hasPartials,
      partialsDescription: data.partialsDescription,
      comment: data.comment
    };

    setReviews(prevReviews => [newReview, ...prevReviews]);
    setFormSubmitted(true);

    setTimeout(() => {
      document.getElementById('reviews-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <button
            onClick={() => router.push(`/course/${courseId}`)}
            className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
          >
            ← Volver a profesores
          </button>
        </div>

        <div className="mb-8">
          <ProfessorInfo
            professor={professor}
            courseName={course.name}
          />
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <StatsSummary reviews={reviews} />

              <div id="reviews-section">
                <ReviewList reviews={reviews} />
              </div>
            </div>

            <div className="lg:col-span-1">
              {formSubmitted ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                  <h2 className="text-xl font-semibold text-green-800 mb-2">¡Gracias por tu evaluación!</h2>
                  <p className="text-green-700 mb-4">Tu reseña ha sido registrada exitosamente.</p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                  >
                    Escribir otra evaluación
                  </button>
                </div>
              ) : (
                <ReviewForm
                  professor={professor}
                  onSubmit={handleReviewSubmit}
                />
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
} 