import React from 'react';
import { courses } from '../data/mockData';

interface CourseSelectorProps {
  onSelect: (courseId: string) => void;
}

const CourseSelector: React.FC<CourseSelectorProps> = ({ onSelect }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Selecciona un curso</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {courses.map((course) => (
          <button
            key={course.id}
            onClick={() => onSelect(course.id)}
            className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-left"
          >
            <h3 className="font-medium text-gray-900">{course.name}</h3>
            <p className="text-sm text-gray-500">
              {course.code} • {course.department}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CourseSelector;