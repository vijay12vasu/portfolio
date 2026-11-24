export type SkillStatus = 'WORKING WITH' | 'LEARNING' | 'BUILDING WITH' | 'EXPLORING';

export interface SkillItem {
  name: string;
  status: SkillStatus;
}

export interface SkillCategory {
  domain: string;
  skills: SkillItem[];
}

export const skillCategories: SkillCategory[] = [
  {
    domain: "CORE",
    skills: [
      { name: "Java", status: "WORKING WITH" },
      { name: "C", status: "WORKING WITH" },
      { name: "C++", status: "WORKING WITH" },
      { name: "Python", status: "WORKING WITH" }
    ]
  },
  {
    domain: "WEB",
    skills: [
      { name: "HTML", status: "WORKING WITH" },
      { name: "CSS", status: "WORKING WITH" },
      { name: "JavaScript", status: "WORKING WITH" },
      { name: "React", status: "WORKING WITH" }
    ]
  },
  {
    domain: "DATA",
    skills: [
      { name: "SQL", status: "WORKING WITH" },
      { name: "DBMS", status: "WORKING WITH" },
      { name: "MongoDB", status: "WORKING WITH" }
    ]
  },
  {
    domain: "CURRENTLY LEARNING",
    skills: [
      { name: "DSA", status: "LEARNING" },
      { name: "Spring Boot", status: "LEARNING" },
      { name: "System Design", status: "LEARNING" }
    ]
  }
];

export const learningPath = [
  {
    stage: "FOUNDATIONS",
    focus: "Programming + CS"
  },
  {
    stage: "PROBLEM SOLVING",
    focus: "DSA"
  },
  {
    stage: "SOFTWARE",
    focus: "Java + Full Stack"
  },
  {
    stage: "INTERFACES",
    focus: "React + Web"
  },
  {
    stage: "INTELLIGENCE",
    focus: "AI / LLM systems"
  },
  {
    stage: "SYSTEM BUILDING",
    focus: "Applied AI"
  }
];
