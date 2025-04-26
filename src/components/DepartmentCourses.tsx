import React from 'react';

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
  // Department colors and icons for visual consistency
  const departmentStyles: Record<string, { bgColor: string, icon: string }> = {
    "Computer Science": { bgColor: "bg-blue-50", icon: "💻" },
    "Mathematics": { bgColor: "bg-green-50", icon: "📊" },
    "Physics": { bgColor: "bg-purple-50", icon: "⚛️" },
    "Biology": { bgColor: "bg-emerald-50", icon: "🧬" }
  };

  // Mock courses data by department
  const coursesMap: Record<string, Course[]> = {
    "Computer Science": [
      {
        id: "CS101",
        name: "Programación Fundamental",
        code: "CS101",
        description: "Introducción a la programación y algoritmos básicos"
      },
      {
        id: "CS201",
        name: "Estructuras de Datos",
        code: "CS201",
        description: "Estudio avanzado de estructuras de datos y algoritmos"
      },
      {
        id: "CS301",
        name: "Inteligencia Artificial",
        code: "CS301",
        description: "Fundamentos de IA y aprendizaje automático"
      }
    ],
    "Mathematics": [
      {
        id: "MATH101",
        name: "Cálculo I",
        code: "MATH101",
        description: "Límites, derivadas e integrales de funciones de una variable"
      },
      {
        id: "MATH201",
        name: "Álgebra Lineal",
        code: "MATH201",
        description: "Estudio de vectores, matrices y sistemas lineales"
      }
    ],
    "Physics": [
      {
        id: "PHYS101",
        name: "Física Mecánica",
        code: "PHYS101",
        description: "Estudio del movimiento y las fuerzas"
      },
      {
        id: "PHYS201",
        name: "Electromagnetismo",
        code: "PHYS201",
        description: "Teoría electromagnética y aplicaciones"
      }
    ],
    "Biology": [
      {
        id: "BIO101",
        name: "Biología Celular",
        code: "BIO101",
        description: "Estudio de la estructura y función celular"
      },
      {
        id: "BIO201",
        name: "Genética",
        code: "BIO201",
        description: "Principios de la herencia y la genética molecular"
      }
    ]
  };

  const courses = coursesMap[departmentId] || [];
  const { bgColor, icon } = departmentStyles[departmentId] || { bgColor: "bg-gray-50", icon: "📚" };

  if (courses.length === 0) {
    return null;
  }

  return (
    <div className={`${bgColor} rounded-lg shadow-sm p-6 border border-gray-100`}>
      <div className="flex items-center mb-6">
        <span className="text-3xl mr-3">{icon}</span>
        <h2 className="text-2xl font-semibold text-gray-800">Cursos de {departmentId}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {courses.map((course) => (
          <button
            key={course.id}
            onClick={() => onSelectCourse(course.id)}
            className="p-5 bg-white border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all text-left"
            aria-label={`Seleccionar curso de ${course.name}`}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium text-gray-900 text-lg">{course.name}</h3>
              <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                {course.code}
              </span>
            </div>
            <p className="text-sm text-gray-600">{course.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DepartmentCourses; 