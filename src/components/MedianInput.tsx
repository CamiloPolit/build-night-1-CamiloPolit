import React from 'react';

interface MedianInputProps {
  value: number;
  onChange: (value: number) => void;
}

const MedianInput: React.FC<MedianInputProps> = ({ value, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    onChange(newValue);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Nota mediana aproximada (1-7)
      </label>
      <div className="flex items-center">
        <input
          type="range"
          min="1"
          max="7"
          step="0.1"
          value={value}
          onChange={handleChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
        <span className="ml-3 w-12 text-center font-medium text-gray-700">
          {value.toFixed(1)}
        </span>
      </div>
      <div className="flex justify-between text-xs text-gray-500 px-1 mt-1">
        <span>1.0</span>
        <span>7.0</span>
      </div>
    </div>
  );
};

export default MedianInput;