import React from 'react';

interface GoogleButtonProps {
  onClick?: () => void;
  className?: string;
  text?: string;
}

const GoogleButton: React.FC<GoogleButtonProps> = ({
  onClick,
  className = '',
  text = 'Iniciar sesión con Google'
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center w-full px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors ${className}`}
      type="button"
    >
      <div className="flex items-center justify-center">
        <img
          src="https://developers.google.com/identity/images/g-logo.png"
          alt="Google"
          className="w-5 h-5 mr-3"
        />
        <span className="text-sm font-medium">{text}</span>
      </div>
    </button>
  );
};

export default GoogleButton; 