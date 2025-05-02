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

// Mock user profiles data
export const userProfiles = [
  {
    id: "user1",
    email: "miguel@usach.cl",
    name: "Miguel Sánchez",
    karma: 78,
    reviewCount: 12,
    reactionsReceived: 86,
    memberSince: "2022-09-15",
    department: "Ciencias de la Computación",
    bio: "Estudiante de último año de Ingeniería Civil en Computación. Me apasiona el desarrollo de software y la inteligencia artificial.",
    achievements: [
      {
        id: "a1",
        name: "Crítico Destacado",
        description: "Publicó más de 10 reseñas con alta calidad",
        icon: "⭐",
        earnedDate: "2023-11-10",
      },
      {
        id: "a2",
        name: "Influencer Académico",
        description: "Sus reseñas han recibido más de 50 reacciones",
        icon: "🏆",
        earnedDate: "2023-12-05",
      },
    ],
    reactionDetails: {
      LIKE: 35,
      DISLIKE: 4,
      MOAI: 12,
      BRAIN: 20,
      FUNNY: 15,
    },
  },
  {
    id: "user2",
    email: "laura@usach.cl",
    name: "Laura Jiménez",
    karma: 65,
    reviewCount: 8,
    reactionsReceived: 71,
    memberSince: "2022-08-20",
    department: "Ingeniería Industrial",
    bio: "Estudiante de Ingeniería Industrial con interés en la optimización de procesos y la gestión de proyectos.",
    achievements: [
      {
        id: "a3",
        name: "Reseñador Constante",
        description: "Ha mantenido actividad regular durante 6 meses",
        icon: "📊",
        earnedDate: "2023-10-15",
      },
    ],
    reactionDetails: {
      LIKE: 30,
      DISLIKE: 5,
      MOAI: 15,
      BRAIN: 12,
      FUNNY: 9,
    },
  },
  {
    id: "user3",
    email: "javier@usach.cl",
    name: "Javier Ruiz",
    karma: 42,
    reviewCount: 5,
    reactionsReceived: 38,
    memberSince: "2023-02-10",
    department: "Ingeniería Civil Matemática",
    bio: "Estudiante de Ingeniería Matemática con interés en la modelación matemática y estadística.",
    achievements: [],
    reactionDetails: {
      LIKE: 15,
      DISLIKE: 3,
      MOAI: 5,
      BRAIN: 10,
      FUNNY: 5,
    },
  },
  {
    id: "user4",
    email: "carolina@usach.cl",
    name: "Carolina Fuentes",
    karma: 53,
    reviewCount: 7,
    reactionsReceived: 62,
    memberSince: "2023-03-05",
    department: "Ingeniería Civil Eléctrica",
    bio: "Estudiante de Ingeniería Eléctrica con enfoque en sistemas de control y automatización.",
    achievements: [
      {
        id: "a4",
        name: "Colaborador Valioso",
        description: "Sus reseñas tienen un promedio de valoración alto",
        icon: "💎",
        earnedDate: "2023-11-22",
      },
    ],
    reactionDetails: {
      LIKE: 28,
      DISLIKE: 4,
      MOAI: 7,
      BRAIN: 15,
      FUNNY: 8,
    },
  },
  {
    id: "user5",
    email: "pedro@usach.cl",
    name: "Pedro Gonzalez",
    karma: 85,
    reviewCount: 15,
    reactionsReceived: 92,
    memberSince: "2022-03-18",
    department: "Astronomía",
    bio: "Estudiante de Astronomía con pasión por la astrofísica y la divulgación científica.",
    achievements: [
      {
        id: "a5",
        name: "Super Estrella",
        description: "Sus reseñas han sido destacadas más de 5 veces",
        icon: "🌟",
        earnedDate: "2023-09-15",
      },
      {
        id: "a6",
        name: "Gran Colaborador",
        description: "Ha publicado más de 10 reseñas detalladas",
        icon: "👑",
        earnedDate: "2023-08-10",
      },
    ],
    reactionDetails: {
      LIKE: 40,
      DISLIKE: 6,
      MOAI: 14,
      BRAIN: 22,
      FUNNY: 10,
    },
  },
];

export const getUserById = (id: string) => {
  return userProfiles.find((user) => user.id === id) || userProfiles[0];
};
