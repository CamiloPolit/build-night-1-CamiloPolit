import { Professor, Review, Course } from "../types";

export const courses: Course[] = [
  {
    id: "CS101",
    name: "Programación Fundamental",
    code: "CS101",
    department: "Computer Science",
  },
  {
    id: "CS201",
    name: "Estructuras de Datos",
    code: "CS201",
    department: "Computer Science",
  },
  {
    id: "MATH101",
    name: "Cálculo I",
    code: "MATH101",
    department: "Mathematics",
  },
  {
    id: "PHYS101",
    name: "Física Mecánica",
    code: "PHYS101",
    department: "Physics",
  },
];

export const professors: Professor[] = [
  {
    id: "1",
    name: "Dr. María González",
    department: "Computer Science",
    title: "Associate Professor",
    courses: ["CS101", "CS201"],
    bio: "Dr. González has been teaching computer science for over 10 years. Her research interests include algorithm optimization and machine learning applications.",
  },
  {
    id: "2",
    name: "Prof. Carlos Mendoza",
    department: "Mathematics",
    title: "Full Professor",
    courses: ["MATH101"],
    bio: "With over 20 years of teaching experience, Prof. Mendoza specializes in applied mathematics and has published numerous papers on mathematical modeling.",
  },
  {
    id: "3",
    name: "Dr. Ana Silva",
    department: "Physics",
    title: "Assistant Professor",
    courses: ["PHYS101"],
    bio: "Dr. Silva joined the faculty three years ago after completing her postdoctoral research at CERN. She specializes in particle physics and quantum mechanics.",
  },
];

export const reviews: Review[] = [
  {
    id: "101",
    professorId: "1",
    courseId: "CS101",
    studentName: "Miguel Sánchez",
    date: "2024-04-15",
    clarity: 4,
    knowledge: 5,
    helpfulness: 4,
    difficulty: 3,
    overall: 4,
    approximateMedian: 5.5,
    comment:
      "Excellent professor who explains complex concepts in an understandable way. Always willing to help after class.",
  },
  {
    id: "102",
    professorId: "1",
    courseId: "CS201",
    studentName: "Laura Jiménez",
    date: "2024-04-02",
    clarity: 5,
    knowledge: 5,
    helpfulness: 4,
    difficulty: 4,
    overall: 5,
    approximateMedian: 5.8,
    comment:
      "One of the best professors I've had. Her explanations are crystal clear and she really knows her subject. The assignments are challenging but fair.",
  },
  {
    id: "103",
    professorId: "2",
    courseId: "MATH101",
    studentName: "Javier Ruiz",
    date: "2024-03-20",
    clarity: 3,
    knowledge: 5,
    helpfulness: 3,
    difficulty: 5,
    overall: 3,
    approximateMedian: 4.2,
    comment:
      "Prof. Mendoza is extremely knowledgeable but sometimes goes too fast. The exams are quite difficult.",
  },
];

export const getSelectedProfessor = (id: string) => {
  return professors.find((prof) => prof.id === id) || professors[0];
};

export const getProfessorReviews = (professorId: string, courseId: string) => {
  return reviews.filter(
    (review) =>
      review.professorId === professorId && review.courseId === courseId
  );
};

export const getProfessorsByCourse = (courseId: string) => {
  return professors.filter((professor) => professor.courses.includes(courseId));
};

export const getCourseById = (courseId: string) => {
  return courses.find((course) => course.id === courseId);
};
