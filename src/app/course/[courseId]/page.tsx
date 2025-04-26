'use client';

import { useParams, useRouter } from 'next/navigation';
import Header from '@/components/Header';
import ProfessorList from '@/components/ProfessorList';
import Footer from '@/components/Footer';
import { getProfessorsByCourse, getCourseById } from '@/data/mockData';

export default function CoursePage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.courseId as string;

  const course = getCourseById(courseId);
  const professors = getProfessorsByCourse(courseId);

  if (!course) {
    return <div>Course not found</div>;
  }

  const handleProfessorSelect = (professorId: string) => {
    router.push(`/course/${courseId}/professor/${professorId}`);
  };

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <button
            onClick={() => router.push('/')}
            className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
          >
            ← Volver a cursos
          </button>
        </div>
        <ProfessorList
          professors={professors}
          onSelect={handleProfessorSelect}
        />
      </main>
      <Footer />
    </>
  );
} 