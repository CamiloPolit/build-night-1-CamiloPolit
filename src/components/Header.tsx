import React, { useState } from 'react';
import { GraduationCap, Menu, X, Search, ChevronDown } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2 rounded-lg shadow-sm">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent">
              ProfeRate
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <a href="#" className="px-4 py-2 text-gray-700 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-all font-medium text-sm">
              Inicio
            </a>
            <div className="relative group">
              <a href="#" className="px-4 py-2 text-gray-700 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-all font-medium text-sm flex items-center">
                Profesores
                <ChevronDown className="ml-1 h-4 w-4" />
              </a>
              <div className="absolute left-0 top-full bg-white shadow-lg rounded-lg p-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform -translate-y-2 group-hover:translate-y-0">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md">
                  Por facultad
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md">
                  Mejor evaluados
                </a>
              </div>
            </div>
            <a href="#" className="px-4 py-2 text-gray-700 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-all font-medium text-sm">
              Facultades
            </a>
            <a href="#" className="px-4 py-2 text-gray-700 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-all font-medium text-sm">
              Cursos
            </a>
          </div>

          {/* Search and Auth Buttons */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex relative">
              <input
                type="text"
                placeholder="Buscar profesor..."
                className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 w-52 text-sm"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>

            <div className="flex space-x-2">
              <button className="hidden md:block text-blue-600 hover:text-blue-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-50 transition-all">
                Iniciar sesión
              </button>
              <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-blue-700 hover:to-indigo-700 shadow-sm hover:shadow transition-all">
                Registrarse
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden flex items-center"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-gray-700" />
              ) : (
                <Menu className="h-6 w-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-3 border-t border-gray-100">
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Buscar profesor..."
                className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 w-full text-sm"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
            <div className="flex flex-col space-y-1">
              <a href="#" className="px-4 py-3 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 font-medium">
                Inicio
              </a>
              <a href="#" className="px-4 py-3 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 font-medium">
                Profesores
              </a>
              <a href="#" className="px-4 py-3 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 font-medium">
                Facultades
              </a>
              <a href="#" className="px-4 py-3 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 font-medium">
                Cursos
              </a>
              <a href="#" className="px-4 py-3 text-blue-600 rounded-lg font-medium">
                Iniciar sesión
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;