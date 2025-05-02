import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-6 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center">
          <div className="mb-3">
            <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">
              ramosBEAUCHEF
            </h3>
          </div>

          <div className="flex space-x-6 mb-4">
            <a href="/" className="text-gray-400 hover:text-white transition-colors">Inicio</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Profesores</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Cursos</a>
          </div>

          <div className="text-sm text-gray-500">
            © 2025 ProfeRate
          </div>
        </div>
      </div>
    </footer>
  );
} 