import React from 'react';
import { GraduationCap } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-900 to-indigo-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8" />
            <h1 className="text-2xl font-bold">ProfeRate</h1>
          </div>
          <div className="hidden md:flex space-x-6">
            <a href="#" className="text-white hover:text-blue-200 transition-colors">Inicio</a>
            <a href="#" className="text-white hover:text-blue-200 transition-colors">Profesores</a>
            <a href="#" className="text-white hover:text-blue-200 transition-colors">Facultades</a>
            <a href="#" className="text-white hover:text-blue-200 transition-colors">Cursos</a>
          </div>
          <div className="flex space-x-2">
            <button className="bg-white text-blue-800 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors">
              Iniciar sesión
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;