export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  github: string;
  demo?: string;
  what_it_does?: string;
  why_i_built_it?: string;
  what_i_learned?: string;
  
  caseStudy?: {
    overview?: string;
    architecture?: string;
    direction?: string;
    state?: string;
    learning?: string;
  };
}

export const projects: Project[] = [
  {
    id: "edutrack",
    title: "EduTrack",
    subtitle: "Student Achievement Management Platform",
    description: "Full-stack platform to track, verify, and score student academic and extracurricular achievements.",
    tech: ["React", "Spring Boot", "Python/FastAPI", "MongoDB"],
    github: "https://github.com/vijay12vasu/EduTrack",
    what_it_does: "A platform designed to track, verify, and manage student academic and extracurricular achievements through a unified portal.",
    why_i_built_it: "To build a complete full-stack application that bridges the gap between frontend interfaces and backend data processing.",
    what_i_learned: "I learned how to integrate React with a Spring Boot backend, handle data with MongoDB, and structure a multi-service application.",
    caseStudy: {
      overview: "EduTrack is a full-stack platform built to systematically record, verify, and score student achievements. It moves beyond simple CRUD operations by providing structured validation.",
      architecture: "Frontend (React) → Backend API (Spring Boot / FastAPI) → Database (MongoDB).",
      direction: "The engineering goal was to build a cohesive microservices-style architecture that can handle multiple user roles (students, verifiers) and securely process data.",
      state: "The repository includes frontend and backend source code with local setup instructions. No live demo is linked here.",
      learning: "This project served as my primary vehicle for learning full-stack integration, secure API design, and managing complex database relationships."
    }
  },
];
