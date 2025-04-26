import { Professor, Review, Course } from "../types";

export const courses: Course[] = [
  {
    id: "CC3001",
    name: "Algoritmos y Estructuras de Datos",
    code: "CC3001",
    department: "Ciencias de la Computación",
  },
  {
    id: "CC4101",
    name: "Lenguajes de Programación",
    code: "CC4101",
    department: "Ciencias de la Computación",
  },
  {
    id: "MA3403",
    name: "Ecuaciones Diferenciales",
    code: "MA3403",
    department: "Ingeniería Civil Matemática",
  },
  {
    id: "EL3104",
    name: "Señales y Sistemas",
    code: "EL3104",
    department: "Ingeniería Civil Eléctrica",
  },
  {
    id: "AS3405",
    name: "Astrofísica Estelar",
    code: "AS3405",
    department: "Astronomía",
  },
];

export const professors: Professor[] = [
  {
    id: "1",
    name: "Dr. María González",
    department: "Ciencias de la Computación",
    title: "Profesora Asociada",
    courses: ["CC3001", "CC4101"],
    bio: "La Dra. González lleva más de 10 años enseñando ciencias de la computación. Sus intereses de investigación incluyen la optimización de algoritmos y aplicaciones de aprendizaje automático.",
  },
  {
    id: "2",
    name: "Prof. Carlos Mendoza",
    department: "Ingeniería Civil Matemática",
    title: "Profesor Titular",
    courses: ["MA3403"],
    bio: "Con más de 20 años de experiencia docente, el Prof. Mendoza se especializa en matemáticas aplicadas y ha publicado numerosos artículos sobre modelamiento matemático.",
  },
  {
    id: "3",
    name: "Dra. Ana Silva",
    department: "Ingeniería Civil Eléctrica",
    title: "Profesora Asistente",
    courses: ["EL3104"],
    bio: "La Dra. Silva se unió a la facultad hace tres años después de completar su investigación postdoctoral. Se especializa en sistemas de control y procesamiento de señales.",
  },
  {
    id: "4",
    name: "Dr. Javier Morales",
    department: "Astronomía",
    title: "Profesor Asociado",
    courses: ["AS3405"],
    bio: "El Dr. Morales ha participado en varios proyectos internacionales de observación astronómica y dirige el laboratorio de astrofísica computacional de la universidad.",
  },
];

export const reviews: Review[] = [
  {
    id: "101",
    professorId: "1",
    courseId: "CC3001",
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
      "Excelente profesora que explica conceptos complejos de manera comprensible. Siempre dispuesta a ayudar después de clase.",
  },
  {
    id: "102",
    professorId: "1",
    courseId: "CC4101",
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
    comment:
      "Una máquina explicando. Las clases son muy dinámicas y se aprende mucho.",
  },
  {
    id: "103",
    professorId: "2",
    courseId: "MA3403",
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
      "El Prof. Mendoza tiene muchísimo conocimiento pero a veces va demasiado rápido. Los exámenes son bastante difíciles.",
  },
  {
    id: "104",
    professorId: "3",
    courseId: "EL3104",
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
  {
    id: "105",
    professorId: "4",
    courseId: "AS3405",
    email: "pedro@usach.cl",
    studentName: "Pedro Gonzalez",
    date: "2024-03-05",
    year: 2024,
    semester: 1,
    clarity: 5,
    knowledge: 5,
    helpfulness: 5,
    workload: 4,
    difficulty: 4,
    hasPartials: true,
    partialsDescription:
      "Dos informes de observación astronómica y un proyecto final. Las observaciones se realizan en el observatorio de la universidad.",
    overall: 5,
    approximateMedian: 6.2,
    comment:
      "El Dr. Morales es apasionado por la astronomía y transmite ese entusiasmo a sus estudiantes. Las sesiones de observación son lo mejor del curso.",
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
