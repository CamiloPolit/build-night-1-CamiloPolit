import React from 'react';
import GoogleButton from './GoogleButton';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  // Handle clicks outside the modal to close it
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleGoogleSignIn = () => {
    // Esta función se llamará cuando el usuario haga clic en el botón de Google
    console.log('Google Sign In clicked');
    // Aquí implementarías la lógica de autenticación con Google
    // Por ejemplo, podrías redirigir a una URL específica o llamar a una API
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-[200] flex items-center justify-center p-4"
      onClick={handleBackdropClick}
      aria-modal="true"
      role="dialog"
      aria-labelledby="login-modal-title"
    >
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full animate-fadeIn transform transition-all">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2
              id="login-modal-title"
              className="text-xl font-bold text-gray-800"
            >
              Iniciar sesión
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
              aria-label="Cerrar"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="border-t border-gray-100 pt-4 pb-2">
            <p className="text-center text-gray-600 mb-6">
              Inicia sesión con tu cuenta de Google para acceder a todas las funcionalidades
            </p>

            <div className="flex justify-center px-4">
              <GoogleButton
                onClick={handleGoogleSignIn}
                className="max-w-xs"
              />
            </div>
          </div>

          <div className="mt-8 text-center text-sm text-gray-500">
            <p>La única información que se utilizará será tu correo electrónico, para verificar que pertenezcas a la universidad teniendo correo @ug.uchile.cl</p>
          </div>
        </div>

        <div className="bg-gray-50 px-6 py-4 rounded-b-xl">
          <div className="flex justify-center">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal; 