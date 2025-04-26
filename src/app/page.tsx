'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import DepartmentSelector from '@/components/DepartmentSelector';
import DepartmentCourses from '@/components/DepartmentCourses';
import Footer from '@/components/Footer';

export default function Home() {
  const router = useRouter();
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const scrollOffsetRef = useRef<HTMLDivElement>(null);

  const handleDepartmentSelect = (departmentId: string) => {
    setSelectedDepartment(departmentId);
    // Scroll to courses section with a smooth animation and offset
    setTimeout(() => {
      const scrollOffset = scrollOffsetRef.current;
      if (scrollOffset) {
        const yOffset = -60; // 60px de espacio por encima de los cursos
        const y = scrollOffset.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 100);
  };

  const handleCourseSelect = (courseId: string) => {
    router.push(`/course/${courseId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-3">
            Evalúa tus profesores
          </h1>
          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
            Selecciona un departamento y un curso para ver las evaluaciones de los profesores o agregar nuevas reseñas.
          </p>

          <DepartmentSelector onSelect={handleDepartmentSelect} />

          {selectedDepartment && (
            <>
              {/* Elemento invisible que sirve como punto de referencia para el scroll */}
              <div ref={scrollOffsetRef} className="h-16" id="scroll-anchor" />
              <div className="animate-fadeIn pb-10">
                <DepartmentCourses
                  departmentId={selectedDepartment}
                  onSelectCourse={handleCourseSelect}
                />
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
} 