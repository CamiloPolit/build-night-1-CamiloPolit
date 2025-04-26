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
    email: "miguel@usach.cl",
    studentName: "Miguel Sánchez",
    date: "2024-04-15",
    year: 2024,
    semester: 1,
    clarity: 4,
    knowledge: 5,
    helpfulness: 4,
    workload: 3,
    difficulty: 3,
    hasPartials: true,
    partialsDescription:
      "Tareas semanales, un proyecto final en grupo y 2 mini controles. Las tareas pesan un 30% de la nota final.",
    overall: 4,
    approximateMedian: 5.5,
    comment:
      "Excellent professor who explains complex concepts in an understandable way. Always willing to help after class.",
  },
  {
    id: "102",
    professorId: "1",
    courseId: "CS201",
    email: "laura@usach.cl",
    studentName: "Laura Jiménez",
    date: "2024-04-02",
    year: 2024,
    semester: 1,
    clarity: 5,
    knowledge: 5,
    helpfulness: 4,
    workload: 4,
    difficulty: 4,
    hasPartials: true,
    partialsDescription:
      "Proyecto semestral que se desarrolla por etapas. Cada etapa tiene una entrega y una presentación. Representa el 40% de la nota final.",
    overall: 5,
    approximateMedian: 5.8,
    comment: "Una mákina",
  },
  {
    id: "103",
    professorId: "2",
    courseId: "MATH101",
    email: "javier@usach.cl",
    studentName: "Javier Ruiz",
    date: "2024-03-20",
    year: 2024,
    semester: 1,
    clarity: 3,
    knowledge: 5,
    helpfulness: 3,
    workload: 5,
    difficulty: 5,
    hasPartials: true,
    partialsDescription:
      "Controles sorpresa cada semana que valen un 25% de la nota final. Son muy difíciles y no dan tiempo suficiente para completarlos.",
    overall: 3,
    approximateMedian: 4.2,
    comment:
      "Prof. Mendoza is extremely knowledgeable but sometimes goes too fast. The exams are quite difficult.",
  },
  {
    id: "104",
    professorId: "3",
    courseId: "PHYS101",
    email: "carolina@usach.cl",
    studentName: "Carolina Fuentes",
    date: "2024-03-10",
    year: 2024,
    semester: 1,
    clarity: 4,
    knowledge: 5,
    helpfulness: 4,
    workload: 3,
    difficulty: 4,
    hasPartials: false,
    overall: 4,
    approximateMedian: 5.3,
    comment:
      "Las clases son muy interesantes y la profesora se preocupa de que todos entiendan los conceptos fundamentales.",
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
