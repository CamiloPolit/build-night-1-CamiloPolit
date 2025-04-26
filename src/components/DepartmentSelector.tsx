import React, { useState } from 'react';

interface Department {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
}

interface DepartmentSelectorProps {
  onSelect: (departmentId: string) => void;
}

const DepartmentSelector: React.FC<DepartmentSelectorProps> = ({ onSelect }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Departamentos actualizados según especificaciones
  const departments: Department[] = [
    {
      id: "Ciencias de la Computación",
      name: "Ciencias de la Computación",
      icon: "💻",
      description: "Algoritmos, programación y teoría computacional",
      color: "bg-blue-50 border-blue-200 hover:border-blue-500 hover:bg-blue-100"
    },
    {
      id: "Ingeniería Civil Matemática",
      name: "Ingeniería Civil Matemática",
      icon: "📊",
      description: "Modelamiento matemático, optimización y análisis de datos",
      color: "bg-green-50 border-green-200 hover:border-green-500 hover:bg-green-100"
    },
    {
      id: "Ingeniería Civil Eléctrica",
      name: "Ingeniería Civil Eléctrica",
      icon: "⚡",
      description: "Sistemas eléctricos, electrónica y telecomunicaciones",
      color: "bg-yellow-50 border-yellow-200 hover:border-yellow-500 hover:bg-yellow-100"
    },
    {
      id: "Astronomía",
      name: "Astronomía",
      icon: "🔭",
      description: "Estudio de cuerpos celestes, astrofísica y cosmología",
      color: "bg-purple-50 border-purple-200 hover:border-purple-500 hover:bg-purple-100"
    }
  ];

  const handleSelect = (departmentId: string) => {
    setSelectedId(departmentId);
    onSelect(departmentId);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-5">Selecciona un departamento</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {departments.map((department) => {
          const isSelected = selectedId === department.id;
          const selectedClass = isSelected
            ? 'ring-2 ring-offset-2 ring-blue-500 transform scale-[1.02]'
            : '';

          return (
            <button
              key={department.id}
              onClick={() => handleSelect(department.id)}
              className={`p-5 border rounded-xl transition-all ${department.color} flex items-center text-left h-full ${selectedClass}`}
              aria-label={`Seleccionar departamento de ${department.name}`}
              aria-pressed={isSelected}
            >
              <span className="text-4xl mr-4">{department.icon}</span>
              <div>
                <h3 className="font-medium text-gray-900 text-lg">{department.name}</h3>
                <p className="text-sm text-gray-600">{department.description}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DepartmentSelector; 