'use client';

import Header from '@/components/Header';
import CourseSelector from '@/components/CourseSelector';
import Footer from '@/components/Footer';

export default function Home() {
  const handleCourseSelect = (courseId: string) => {
    window.location.href = `/course/${courseId}`;
  };

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <CourseSelector onSelect={handleCourseSelect} />
      </main>
      <Footer />
    </>
  );
} 