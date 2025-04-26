export interface Professor {
  id: string;
  name: string;
  department: string;
  title: string;
  courses: string[];
  bio: string;
}

export interface Course {
  id: string;
  name: string;
  code: string;
  department: string;
}

export interface Review {
  id: string;
  professorId: string;
  courseId: string;
  email: string;
  date: string;
  year: number;
  semester: 1 | 2;
  clarity: number;
  workload: number;
  difficulty: number;
  hasPartials: boolean;
  partialsDescription?: string;
  comment?: string;
}

export interface RatingInputProps {
  value: number;
  onChange: (value: number) => void;
  label: string;
  max?: number;
  allowHalf?: boolean;
  ratingLabels?: {
    unrated?: string;
    lowest?: string;
    low?: string;
    medium?: string;
    high?: string;
    highest?: string;
  };
}

export interface ReviewFormData {
  email: string;
  year: number;
  semester: 1 | 2;
  clarity: number;
  workload: number;
  difficulty: number;
  hasPartials: boolean;
  partialsDescription?: string;
  comment?: string;
}
