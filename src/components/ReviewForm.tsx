import React, { useState } from 'react';
import RatingInput from './RatingInput';
import { Professor, ReviewFormData } from '../types';

interface ReviewFormProps {
  professor: Professor;
  onSubmit: (data: ReviewFormData) => void;
}

const currentYear = new Date().getFullYear();
const yearOptions = Array.from({ length: 5 }, (_, i) => currentYear - i);

const ReviewForm: React.FC<ReviewFormProps> = ({ professor, onSubmit }) => {
  const [formData, setFormData] = useState<ReviewFormData>({
    email: '',
    year: currentYear,
    semester: 1,
    clarity: 0,
    workload: 0,
    difficulty: 0,
    hasPartials: false,
    partialsDescription: '',
    medianGrade: undefined,
    comment: ''
  });

  // Add a new state to track if the user has made a selection for partials
  const [hasPartialsSelected, setHasPartialsSelected] = useState<boolean | null>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));

    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Handle numeric input changes (for median grade)
  const handleNumericInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Convert input to number or undefined if empty
    const numValue = value === '' ? undefined : parseFloat(value);

    setFormData(prev => ({
      ...prev,
      [name]: numValue
    }));

    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Modify the handler for hasPartials
  const handlePartialsChange = (value: boolean) => {
    setFormData(prev => ({
      ...prev,
      hasPartials: value
    }));
    setHasPartialsSelected(value);

    if (errors.partialsDescription) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.partialsDescription;
        return newErrors;
      });
    }
  };

  const handleRatingChange = (name: string, value: number) => {
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Por favor, ingrese su correo institucional';
    } else if (!formData.email.endsWith('@usach.cl')) {
      newErrors.email = 'Debe usar un correo institucional (@usach.cl)';
    }

    if (formData.clarity === 0) {
      newErrors.clarity = 'Por favor, califique la claridad';
    }

    if (formData.workload === 0) {
      newErrors.workload = 'Por favor, califique la carga de trabajo';
    }

    if (formData.difficulty === 0) {
      newErrors.difficulty = 'Por favor, califique la dificultad';
    }

    // Validate median grade if provided
    if (formData.medianGrade !== undefined) {
      if (formData.medianGrade < 1 || formData.medianGrade > 7) {
        newErrors.medianGrade = 'La nota debe estar entre 1.0 y 7.0';
      }
    }

    // Validate that a selection has been made
    if (hasPartialsSelected === null) {
      newErrors.hasPartials = 'Por favor, indique si hubo otras instancias de evaluación';
    } else if (formData.hasPartials && !formData.partialsDescription?.trim()) {
      newErrors.partialsDescription = 'Por favor, describa las evaluaciones intermedias';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setSubmitting(true);

      setTimeout(() => {
        onSubmit(formData);
        setFormData({
          email: '',
          year: currentYear,
          semester: 1,
          clarity: 0,
          workload: 0,
          difficulty: 0,
          hasPartials: false,
          partialsDescription: '',
          medianGrade: undefined,
          comment: ''
        });
        setHasPartialsSelected(null);
        setSubmitting(false);
      }, 1000);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-8 transition-all hover:shadow-lg max-w-3xl mx-auto">
      <div className="flex items-center mb-6">
        <span className="text-3xl mr-3" role="img" aria-label="Rating">⭐</span>
        <h2 className="text-xl font-semibold text-gray-800">Evaluar a {professor.name}</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Correo institucional
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 bg-gray-50 border border-gray-100 border-opacity-30 rounded-lg shadow-sm focus:shadow-sm focus:outline-none focus:border-blue-500 focus:border-opacity-100 transition-all ${errors.email ? 'border-red-300 border-opacity-40' : ''}`}
            placeholder="andres.perez.p@ug.uchile.cl"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 mb-5">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Año
            </label>
            <select
              name="year"
              value={formData.year}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-100 border-opacity-30 rounded-lg shadow-sm focus:shadow-md focus:outline-none focus:border-blue-500 focus:border-opacity-100 transition-all appearance-none cursor-pointer hover:bg-gray-100"
            >
              {yearOptions.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 top-6 flex items-center px-3 text-gray-500">
              <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Semestre
            </label>
            <select
              name="semester"
              value={formData.semester}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-100 border-opacity-30 rounded-lg shadow-sm focus:shadow-md focus:outline-none focus:border-blue-500 focus:border-opacity-100 transition-all appearance-none cursor-pointer hover:bg-gray-100"
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 top-6 flex items-center px-3 text-gray-500">
              <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        <RatingInput
          label="Claridad al explicar"
          value={formData.clarity}
          onChange={(value) => handleRatingChange('clarity', value)}
          allowHalf={true}
          ratingLabels={{
            unrated: 'Sin calificar',
            lowest: 'Muy confuso',
            low: 'Confuso',
            medium: 'Aceptable',
            high: 'Claro',
            highest: 'Muy claro'
          }}
        />
        {errors.clarity && (
          <p className="mt-1 text-sm text-red-600">{errors.clarity}</p>
        )}

        <RatingInput
          label="Carga de trabajo semanal"
          value={formData.workload}
          onChange={(value) => handleRatingChange('workload', value)}
          allowHalf={true}
          ratingLabels={{
            unrated: 'Sin calificar',
            lowest: 'Muy ligera',
            low: 'Ligera',
            medium: 'Moderada',
            high: 'Pesada',
            highest: 'Muy pesada'
          }}
        />
        {errors.workload && (
          <p className="mt-1 text-sm text-red-600">{errors.workload}</p>
        )}

        <RatingInput
          label="Dificultad del curso"
          value={formData.difficulty}
          onChange={(value) => handleRatingChange('difficulty', value)}
          allowHalf={true}
          ratingLabels={{
            unrated: 'Sin calificar',
            lowest: 'Muy fácil',
            low: 'Fácil',
            medium: 'Moderada',
            high: 'Difícil',
            highest: 'Muy difícil'
          }}
        />
        {errors.difficulty && (
          <p className="mt-1 text-sm text-red-600">{errors.difficulty}</p>
        )}

        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mediana de la nota final (opcional)
          </label>
          <div className="flex items-center space-x-3">
            <div className="relative flex-grow">
              <input
                type="number"
                name="medianGrade"
                value={formData.medianGrade === undefined ? '' : formData.medianGrade}
                onChange={handleNumericInputChange}
                min="1"
                max="7"
                step="0.1"
                placeholder="Ej: 4.5"
                className={`w-full px-4 py-3 bg-gray-50 border border-gray-100 border-opacity-30 rounded-lg shadow-sm focus:shadow-sm focus:outline-none focus:border-blue-500 focus:border-opacity-100 transition-all ${errors.medianGrade ? 'border-red-300 border-opacity-40' : ''}`}
              />
            </div>
            <span className="text-gray-600 text-sm font-medium">/ 7.0</span>
          </div>
          <p className="mt-1 text-xs text-gray-500">Ingresa la mediana de la nota final del curso para tener una referencia</p>
          {errors.medianGrade && (
            <p className="mt-1 text-sm text-red-600">{errors.medianGrade}</p>
          )}
        </div>

        <div className="mb-5">
          <label className="block flex text-center text-sm font-medium text-gray-700 mb-2">
            ¿Hubo otras instancias de evaluación además de los controles durante el curso?
          </label>
          <div className="mt-2 flex gap-5">
            <div
              onClick={() => handlePartialsChange(true)}
              className={`flex-1 cursor-pointer rounded-lg py-4 px-5 text-center transition-all ${hasPartialsSelected === true ? 'bg-green-100 text-green-600 border border-green-200' : 'bg-gray-50 text-gray-500 border border-gray-100 border-opacity-30 hover:bg-green-50'}`}
            >
              Sí
            </div>
            <div
              onClick={() => handlePartialsChange(false)}
              className={`flex-1 cursor-pointer rounded-lg py-4 px-5 text-center transition-all ${hasPartialsSelected === false ? 'bg-red-100 text-red-600 border border-red-200' : 'bg-gray-50 text-gray-500 border border-gray-100 border-opacity-30 hover:bg-red-50'}`}
            >
              No
            </div>
          </div>

          {errors.hasPartials && (
            <p className="mt-1 text-sm text-red-600">{errors.hasPartials}</p>
          )}

          {formData.hasPartials && (
            <div className="mt-4">
              <textarea
                name="partialsDescription"
                value={formData.partialsDescription}
                onChange={handleInputChange}
                rows={4}
                className={`w-full px-4 py-3 bg-gray-50 border border-opacity-30 rounded-lg shadow-sm focus:shadow-sm focus:outline-none focus:border-blue-500 focus:border-opacity-100 transition-all ${errors.partialsDescription ? 'border-red-300 border-opacity-40' : 'border-gray-100'}`}
                placeholder="¿Qué tipo de evaluaciones intermedias hubo? (ej: tareas semanales, mini-controles, proyecto final, etc.)"
              ></textarea>
              {errors.partialsDescription && (
                <p className="mt-1 text-sm text-red-600">{errors.partialsDescription}</p>
              )}
            </div>
          )}
        </div>

        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Comentarios adicionales (opcional)
          </label>
          <textarea
            name="comment"
            value={formData.comment}
            onChange={handleInputChange}
            rows={5}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-100 border-opacity-30 rounded-lg shadow-sm focus:shadow-sm focus:outline-none focus:border-blue-500 focus:border-opacity-100 transition-all"
            placeholder="Comparte tu experiencia con este profesor (ej: ¿qué temas o controles fueron más difíciles? ¿qué te gustó? ¿fue muy necesario asistir a las clases?)"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-5 rounded-lg transition-colors focus:outline-none focus:ring-0 disabled:bg-blue-300"
        >
          {submitting ? 'Enviando...' : 'Enviar evaluación'}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;