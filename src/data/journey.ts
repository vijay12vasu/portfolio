export interface JourneyStage {
  title: string;
  category: string;
  status: 'PAST' | 'CURRENT' | 'FUTURE';
  technologies: string[];
  description: string;
}

export const journey: JourneyStage[] = [
  {
    title: "Started",
    category: "2024",
    status: "PAST",
    technologies: ["C", "C++", "Java Foundations"],
    description: "Built the initial academic foundation in low-level programming and computational thinking at Karpagam College of Engineering (BE CSE 2024-2028)."
  },
  {
    title: "Explored",
    category: "EARLY 2025",
    status: "PAST",
    technologies: ["HTML", "CSS", "JavaScript"],
    description: "Transitioned from terminal applications to building interactive user interfaces and exploring the web ecosystem."
  },
  {
    title: "Built",
    category: "MID 2025",
    status: "PAST",
    technologies: ["React", "Spring Boot", "MongoDB"],
    description: "Constructed full-stack applications like EduTrack. Learned to integrate frontends with backend data processing and APIs."
  },
  {
    title: "Learned",
    category: "LATE 2025",
    status: "PAST",
    technologies: ["System Design", "SQL"],
    description: "Focused on structuring code better, managing databases, and understanding the architecture of scalable software systems."
  },
  {
    title: "Now",
    category: "SEPTEMBER 2026",
    status: "CURRENT",
    technologies: ["Python", "Local LLMs", "DSA", "Java"],
    description: "Currently in my 3rd year (5th semester). Exploring local AI inference and refining data structure fundamentals."
  }
];
