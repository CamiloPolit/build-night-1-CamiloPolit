import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import CourseProfessorsList from './CourseProfessorsList';

interface Course {
  id: string;
  name: string;
  code: string;
  description: string;
}

interface DepartmentCoursesProps {
  departmentId: string;
  onSelectCourse: (courseId: string) => void;
}

const DepartmentCourses: React.FC<DepartmentCoursesProps> = ({
  departmentId,
  onSelectCourse
}) => {
  const router = useRouter();
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const professorsScrollRef = useRef<HTMLDivElement>(null);

  // Department colors and icons for visual consistency
  const departmentStyles: Record<string, { bgColor: string, icon: string }> = {
    "Ciencias de la Computación": { bgColor: "bg-blue-50", icon: "💻" },
    "Ingeniería Civil Matemática": { bgColor: "bg-green-50", icon: "📊" },
    "Ingeniería Civil Eléctrica": { bgColor: "bg-yellow-50", icon: "⚡" },
    "Astronomía": { bgColor: "bg-purple-50", icon: "🔭" }
  };

  // Mock courses data by department
  const coursesMap: Record<string, Course[]> = {
    "Ciencias de la Computación": [
      {
        id: "CC3001",
        name: "Algoritmos y Estructuras de Datos",
        code: "CC3001",
        description: "Diseño e implementación de algoritmos eficientes y estructuras de datos avanzadas"
      },
      {
        id: "CC4101",
        name: "Lenguajes de Programación",
        code: "CC4101",
        description: "Estudio de paradigmas y características de lenguajes de programación"
      },
      {
        id: "CC5205",
        name: "Minería de Datos",
        code: "CC5205",
        description: "Técnicas y algoritmos para extraer conocimiento a partir de grandes volúmenes de datos"
      }
    ],
    "Ingeniería Civil Matemática": [
      {
        id: "MA3403",
        name: "Ecuaciones Diferenciales",
        code: "MA3403",
        description: "Métodos analíticos y numéricos para resolver ecuaciones diferenciales"
      },
      {
        id: "MA4402",
        name: "Optimización",
        code: "MA4402",
        description: "Teoría y algoritmos de optimización matemática para problemas complejos"
      },
      {
        id: "MA5405",
        name: "Modelamiento Estocástico",
        code: "MA5405",
        description: "Análisis probabilístico y simulación de sistemas estocásticos"
      }
    ],
    "Ingeniería Civil Eléctrica": [
      {
        id: "EL3104",
        name: "Señales y Sistemas",
        code: "EL3104",
        description: "Análisis y procesamiento de señales en sistemas lineales"
      },
      {
        id: "EL4104",
        name: "Electrónica de Potencia",
        code: "EL4104",
        description: "Diseño de convertidores y sistemas de control para alta potencia"
      },
      {
        id: "EL5002",
        name: "Comunicaciones Digitales",
        code: "EL5002",
        description: "Modulación, codificación y transmisión de información digital"
      }
    ],
    "Astronomía": [
      {
        id: "AS3405",
        name: "Astrofísica Estelar",
        code: "AS3405",
        description: "Estructura, evolución y clasificación de estrellas"
      },
      {
        id: "AS4401",
        name: "Cosmología",
        code: "AS4401",
        description: "Origen, estructura y evolución del universo"
      },
      {
        id: "AS5505",
        name: "Radioastronomía",
        code: "AS5505",
        description: "Técnicas observacionales en el espectro de radio"
      }
    ]
  };

  const courses = coursesMap[departmentId] || [];
  const { bgColor, icon } = departmentStyles[departmentId] || { bgColor: "bg-gray-50", icon: "📚" };

  if (courses.length === 0) {
    return null;
  }

  const handleCourseSelect = (courseId: string) => {
    setSelectedCourse(courseId);

    // Scroll to professors section with a smooth animation after a short delay
    setTimeout(() => {
      if (professorsScrollRef.current) {
        const yOffset = -60; // 60px of space above the professors list
        const y = professorsScrollRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 100);
  };

  const handleProfessorSelect = (professorId: string) => {
    if (selectedCourse) {
      router.push(`/course/${selectedCourse}/professor/${professorId}`);
    }
  };

  return (
    <>
      <div className={`${bgColor} rounded-lg shadow-sm p-6 border border-gray-100`}>
        <div className="flex items-center mb-6">
          <span className="text-3xl mr-3">{icon}</span>
          <h2 className="text-2xl font-semibold text-gray-800">Cursos de {departmentId}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {courses.map((course) => {
            const isSelected = selectedCourse === course.id;
            const selectedClass = isSelected
              ? 'ring-2 ring-blue-500 border-blue-500 bg-blue-50 shadow-md'
              : '';

            return (
              <button
                key={course.id}
                onClick={() => handleCourseSelect(course.id)}
                className={`p-5 bg-white border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all text-left ${selectedClass}`}
                aria-label={`Seleccionar curso de ${course.name}`}
                aria-pressed={isSelected}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-gray-900 text-lg">{course.name}</h3>
                  <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                    {course.code}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {selectedCourse && (
        <>
          {/* Invisible element that serves as a reference for scrolling */}
          <div ref={professorsScrollRef} className="h-16" id="professors-scroll-anchor" />
          <div className="animate-fadeIn pb-10">
            <CourseProfessorsList
              courseId={selectedCourse}
              onSelectProfessor={handleProfessorSelect}
            />
          </div>
        </>
      )}
    </>
  );
};

export default DepartmentCourses; 