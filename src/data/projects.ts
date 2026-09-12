export type ProjectStatus = 'ACTIVE' | 'COMPLETED' | 'EXPERIMENTAL' | 'LEARNING';
export type ProjectCategory = 'ALL' | 'SOFTWARE' | 'FULL-STACK' | 'AI' | 'JAVA' | 'EXPERIMENTS' | 'WEB';

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  github: string;
  demo?: string;
  status: ProjectStatus;
  categories: ProjectCategory[];
  features?: string[];
  dominant?: boolean;
  
  what_it_does?: string;
  why_i_built_it?: string;
  what_i_learned?: string;
  
  type: 'FLAGSHIP' | 'FEATURED' | 'LEARNING';
  isPrivate?: boolean;
  
  caseStudy?: {
    overview?: string;
    architecture?: string;
    direction?: string;
    state?: string;
    learning?: string;
    privacy?: string;
  };
}

export const projects: Project[] = [
  {
    id: "echo",
    title: "Echo",
    subtitle: "Personal AI Desktop Assistant",
    description: "An evolving personal AI desktop assistant focused on local, private, and fast interaction. Engineered to integrate with desktop environments while prioritizing privacy.",
    tech: ["Python", "Local LLMs", "Desktop Automation"],
    github: "", // Private project
    status: "ACTIVE",
    categories: ["AI", "SOFTWARE", "EXPERIMENTS"],
    features: ["LOCAL INFERENCE", "DESKTOP INTERACTION", "TASK HANDLING", "CONTEXTUAL AWARENESS"],
    dominant: true,
    type: 'FLAGSHIP',
    isPrivate: true,
    what_it_does: "Provides a locally-hosted AI assistant capable of automating desktop tasks, answering queries, and managing local context without relying on cloud APIs.",
    why_i_built_it: "I wanted to understand how large language models function locally and how they can be integrated directly into a desktop environment without sending private data to external servers.",
    what_i_learned: "I am gaining practical experience in working with local LLM inference, managing desktop automation through Python, and handling system context.",
    caseStudy: {
      overview: "Echo is my primary engineering focus—a personal, locally-hosted AI desktop assistant. I build things to understand them, and Echo is where I'm currently pushing that idea furthest.",
      architecture: "Interface (Desktop UI) → Intelligence (Model Inference) → Memory/Context (Task Continuity) → Execution (System Interaction) → Local Services.",
      direction: "I am exploring how to tightly integrate language models with local operating systems, allowing AI to interact with files, applications, and system state securely.",
      state: "Interface and Local Services are implemented. The Core Inference logic and System Execution are actively developing. Context handling is currently experimental.",
      learning: "Building Echo is teaching me about asynchronous Python, local LLM orchestration, desktop automation frameworks, and how to build reliable context-aware software.",
      privacy: "Echo is a private personal project. The portfolio intentionally does not expose its private implementation, prompts, or source code."
    }
  },
  {
    id: "edutrack",
    title: "EduTrack",
    subtitle: "Full-Stack Achievement Platform",
    description: "Full-stack platform to track, verify, and score student academic and extracurricular achievements.",
    tech: ["React", "Spring Boot", "Python/FastAPI", "MongoDB"],
    github: "https://github.com/vijay12vasu/EduTrack",
    status: "COMPLETED",
    categories: ["FULL-STACK", "SOFTWARE"],
    dominant: false,
    type: 'FEATURED',
    what_it_does: "A platform designed to track, verify, and manage student academic and extracurricular achievements through a unified portal.",
    why_i_built_it: "To build a complete full-stack application that bridges the gap between frontend interfaces and backend data processing.",
    what_i_learned: "I learned how to integrate React with a Spring Boot backend, handle data with MongoDB, and deploy a multi-service architecture.",
    caseStudy: {
      overview: "EduTrack is a full-stack platform built to systematically record, verify, and score student achievements. It moves beyond simple CRUD operations by providing structured validation.",
      architecture: "Frontend (React) → Backend API (Spring Boot / FastAPI) → Database (MongoDB).",
      direction: "The engineering goal was to build a cohesive microservices-style architecture that can handle multiple user roles (students, verifiers) and securely process data.",
      state: "The core platform and achievement tracking mechanics are complete and functional.",
      learning: "This project served as my primary vehicle for learning full-stack integration, secure API design, and managing complex database relationships."
    }
  },
  {
    id: "bank-management",
    title: "Bank Account Management",
    subtitle: "Core Java Application",
    description: "A foundational Java application demonstrating core object-oriented principles, data structures, and standard software engineering practices.",
    tech: ["Java", "OOP", "Data Structures"],
    github: "https://github.com/vijay12vasu/BankAccountManagementSystem",
    status: "LEARNING",
    categories: ["JAVA", "SOFTWARE"],
    dominant: false,
    type: 'LEARNING',
    what_it_does: "A foundational Java application that manages basic bank account operations like creation, deposit, and withdrawal.",
    why_i_built_it: "To apply core Object-Oriented Programming principles and data structures in a practical scenario.",
    what_i_learned: "It strengthened my understanding of Java fundamentals, object state management, and basic software design patterns."
  },
  {
    id: "waste-management",
    title: "Waste Management System",
    subtitle: "Java Application",
    description: "A specialized management system built in Java focusing on business logic implementation and structured data handling.",
    tech: ["Java", "System Design"],
    github: "https://github.com/vijay12vasu/WasteManagementSystem",
    status: "LEARNING",
    categories: ["JAVA", "SOFTWARE"],
    dominant: false,
    type: 'LEARNING',
    what_it_does: "A specialized management system built in Java focusing on business logic implementation and structured data handling.",
    why_i_built_it: "To practice writing structured Java applications and handling complex business rules.",
    what_i_learned: "I improved my ability to structure Java code, implement interfaces, and manage application data flow."
  },
  {
    id: "bus-management",
    title: "Bus Management",
    subtitle: "Java Application",
    description: "A management system for tracking and handling bus operations.",
    tech: ["Java"],
    github: "https://github.com/vijay12vasu/Bus-management",
    status: "LEARNING",
    categories: ["JAVA"],
    dominant: false,
    type: 'LEARNING',
    what_it_does: "A management system for tracking and handling bus operations.",
    why_i_built_it: "To develop a data-driven Java application with user interaction and operational tracking.",
    what_i_learned: "I gained experience in modeling real-world entities and managing their relationships through code."
  },
  {
    id: "payroll-hibernate",
    title: "Payroll Hibernate",
    subtitle: "Backend Implementation",
    description: "A backend implementation exploring ORM mapping and database interactions using Hibernate.",
    tech: ["Java", "Hibernate", "SQL"],
    github: "https://github.com/vijay12vasu/PayrollHibernate",
    status: "LEARNING",
    categories: ["JAVA", "SOFTWARE"],
    dominant: false,
    type: 'LEARNING',
    what_it_does: "A backend implementation exploring Object-Relational Mapping (ORM) and database interactions.",
    why_i_built_it: "To understand how Hibernate maps Java objects to relational database tables.",
    what_i_learned: "I learned the basics of ORM, database connectivity, and executing database operations via Java."
  },
  {
    id: "weather-forecast",
    title: "Weather Forecast",
    subtitle: "Web Application",
    description: "A web application fetching and displaying weather forecasting data.",
    tech: ["HTML", "CSS", "JavaScript", "APIs"],
    github: "https://github.com/vijay12vasu/WeatherForecast",
    status: "COMPLETED",
    categories: ["EXPERIMENTS", "WEB"],
    dominant: false,
    type: 'LEARNING',
    what_it_does: "A web application fetching and displaying weather forecasting data using external APIs.",
    why_i_built_it: "To learn how to make asynchronous API calls and dynamically update the DOM.",
    what_i_learned: "I learned the fundamentals of JavaScript fetch, handling JSON responses, and updating HTML/CSS dynamically."
  }
];
