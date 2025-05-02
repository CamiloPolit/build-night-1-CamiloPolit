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
  medianGrade?: number;
  comment?: string;
  overall?: number;
  approximateMedian?: number;
  studentName?: string;
  course?: string;
  knowledge?: number;
  helpfulness?: number;
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
  medianGrade?: number;
  comment?: string;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  karma: number;
  reviewCount: number;
  reactionsReceived: number;
  memberSince: string;
  department?: string;
  bio?: string;
  achievements?: Achievement[];
  reactionDetails?: {
    LIKE: number;
    DISLIKE: number;
    MOAI: number;
    BRAIN: number;
    FUNNY: number;
  };
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedDate: string;
}
