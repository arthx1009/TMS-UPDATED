export interface Course {
  title: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  rating: number;
  students: string;
  desc: string;
  image: string;
  tags: string[];
}

export const COURSES: Course[] = [
  {
    title: "React Full-Stack Engineering",
    category: "Software",
    difficulty: "Intermediate",
    duration: "12 weeks",
    rating: 4.8,
    students: "2.4k",
    desc: "Build production apps with React, Node.js and cloud deployment pipelines.",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1200&auto=format&fit=crop",
    tags: ["React", "Node.js", "MongoDB"],
  },
  {
    title: "AI Engineer Track",
    category: "Artificial Intelligence",
    difficulty: "Advanced",
    duration: "16 weeks",
    rating: 4.9,
    students: "3.1k",
    desc: "From ML fundamentals to deploying LLM-powered production systems.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop",
    tags: ["ML", "Deep Learning", "GenAI"],
  },
  {
    title: "Cloud & DevOps Mastery",
    category: "Cloud",
    difficulty: "Intermediate",
    duration: "10 weeks",
    rating: 4.7,
    students: "1.8k",
    desc: "AWS, Azure, Docker and Kubernetes for real-world infrastructure.",
    image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?q=80&w=1200&auto=format&fit=crop",
    tags: ["AWS", "Docker", "Kubernetes"],
  },
  {
    title: "Applied Data Science",
    category: "Data Science",
    difficulty: "Intermediate",
    duration: "14 weeks",
    rating: 4.8,
    students: "2.2k",
    desc: "Statistics, Python and modeling for real business problems.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
    tags: ["Python", "SQL", "Statistics"],
  },
  {
    title: "Cyber Security & Ethical Hacking",
    category: "Security",
    difficulty: "Advanced",
    duration: "12 weeks",
    rating: 4.9,
    students: "1.5k",
    desc: "Offensive and defensive security practices for enterprise systems.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop",
    tags: ["Pentesting", "Network Security"],
  },
  {
    title: "UI/UX with Figma",
    category: "Design",
    difficulty: "Beginner",
    duration: "8 weeks",
    rating: 4.6,
    students: "2.9k",
    desc: "Design systems, prototyping and product thinking with Figma.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1200&auto=format&fit=crop",
    tags: ["Figma", "Design Systems"],
  },
  {
    title: "Generative AI & Prompt Engineering",
    category: "Artificial Intelligence",
    difficulty: "Intermediate",
    duration: "8 weeks",
    rating: 4.8,
    students: "3.6k",
    desc: "Agentic AI, LLM development and production prompt design.",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200&auto=format&fit=crop",
    tags: ["LLM", "Agentic AI"],
  },
  {
    title: "Automotive AI Systems",
    category: "Automotive",
    difficulty: "Advanced",
    duration: "14 weeks",
    rating: 4.7,
    students: "980",
    desc: "Embedded AI for ADAS, sensor fusion and vehicle intelligence.",
    image: "https://images.unsplash.com/photo-1617704548623-340376564e68?q=80&w=1200&auto=format&fit=crop",
    tags: ["Embedded", "ADAS"],
  },
  {
    title: "Quantum Computing Foundations",
    category: "Quantum",
    difficulty: "Advanced",
    duration: "10 weeks",
    rating: 4.9,
    students: "620",
    desc: "Qubits, circuits and quantum algorithms with hands-on labs.",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1200&auto=format&fit=crop",
    tags: ["Qiskit", "Quantum Algorithms"],
  },
];
