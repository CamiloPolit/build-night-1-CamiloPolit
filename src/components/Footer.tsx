import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-3">ProfeRate</h3>
            <p className="text-gray-400 max-w-xs">
              Tu plataforma para evaluar y conocer las opiniones sobre los profesores de tu universidad.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-sm font-semibold uppercase mb-3">Enlaces</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/" className="hover:text-white transition-colors">Inicio</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Profesores</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Facultades</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase mb-3">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Términos</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacidad</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookies</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-sm text-gray-500 text-center">
          © 2025 ProfeRate. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
} 