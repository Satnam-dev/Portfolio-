import type { Project, Certification, Experience, PortfolioInfo } from "@/types";

export const FALLBACK_PROJECTS: Project[] = [
  {
    _id: "1",
    title: "Student Grade Evaluation System",
    slug: "student-grade-evaluation-system",
    description:
      "Developed a Student Grade Evaluation System for managing academic records efficiently.",
    features: [
      "Add Student Record",
      "Update Student Record",
      "Delete Student Record",
      "Display Student Details",
      "Grade Classification",
      "Result Generation",
    ],
    technologies: ["C++"],
    imageUrl: "/images/projects/grade-system.svg",
    githubUrl: "https://github.com/Satnam-dev",
    liveDemoUrl: null,
    featured: true,
    order: 1,
  },
  {
    _id: "2",
    title: "Password Strength Checker",
    slug: "password-strength-checker",
    description:
      "Developed a GUI-based Password Strength Checker using Python Tkinter to evaluate password security.",
    features: [
      "User-Friendly GUI",
      "Password Strength Analysis",
      "Real-Time Validation",
    ],
    technologies: ["Python", "Tkinter"],
    imageUrl: "/images/projects/password-checker.svg",
    githubUrl: "https://github.com/Satnam-dev",
    liveDemoUrl: null,
    featured: true,
    order: 2,
  },
];

export const FALLBACK_CERTIFICATIONS: Certification[] = [
  {
    _id: "2",
    name: "Google Cybersecurity Professional Certificate",
    slug: "google-cybersecurity-professional",
    description:
      "Ongoing enrollment in the Google Cybersecurity Professional Certificate on Coursera. Completed 2 of 8 courses so far, covering security foundations, network defense, and hands-on cybersecurity practices.",
    imageUrl: "/certificates/google-cybersecurity.svg",
    certificateUrl: "/certificates/google-cybersecurity.svg",
    downloadUrl: "/certificates/google-cybersecurity.svg",
    issuer: "Google",
    issuedDate: "2026-07-08",
    course: "Cybersecurity Professional Certificate (2/8 completed)",
    startDate: "2026-07-08",
    partner: "Coursera",
    order: 1,
  },
  {
    _id: "1",
    name: "Samsung Innovation Campus Certificate of Completion",
    slug: "samsung-innovation-campus",
    description:
      "Certificate awarded for successfully completing the Coding & Programming course during the Samsung Innovation Campus program. This program is conducted in partnership with the Telecom Sector Skill Council to develop industry-ready technology skills.",
    imageUrl: "/certificates/samsung-innovation-campus.png",
    certificateUrl: "/certificates/samsung-innovation-campus.png",
    downloadUrl: "/certificates/samsung-innovation-campus.png",
    issuer: "Samsung Innovation Campus",
    issuedDate: "2026-02-11",
    course: "Coding & Programming",
    startDate: "2025-11-27",
    endDate: "2026-02-11",
    partner: "Telecom Sector Skill Council",
    order: 2,
  },
];

export const FALLBACK_EXPERIENCES: Experience[] = [
  {
    _id: "2",
    title: "Google Cybersecurity Professional Certificate",
    organization: "Google · Coursera",
    type: "training",
    currentLevel: "2 of 8 Courses Completed",
    status: "current",
    startDate: "2026-07-08",
    endDate: null,
    learning: [
      "Foundations of Cybersecurity",
      "Play It Safe: Manage Security Risks",
      "Network Security",
      "Linux & SQL for Cybersecurity",
      "Threat Detection & Incident Response",
    ],
    description:
      "Ongoing Google Cybersecurity Professional Certificate on Coursera. Started 2 days ago and has completed 2 courses so far, building practical skills for entry-level cybersecurity roles.",
    images: [],
    order: 1,
  },
  {
    _id: "1",
    title: "B.Tech in Computer Science Engineering",
    organization: "Rayat Bahra University",
    type: "training",
    status: "current",
    startDate: "2022-01-01",
    endDate: null,
    learning: [
      "Computer Science Fundamentals",
      "Python Programming",
      "Cloud Computing",
      "Cybersecurity",
      "Software Engineering",
    ],
    description:
      "Currently pursuing B.Tech in Computer Science Engineering at Rayat Bahra University, building strong foundations in programming, cloud technologies, and cybersecurity.",
    images: [],
    order: 2,
  },
];

export const FALLBACK_PORTFOLIO: PortfolioInfo = {
  _id: "1",
  name: "Satnam Kumar",
  title: "Python Developer | Cloud & Cybersecurity Learner",
  tagline: "Building practical applications with modern technologies",
  about:
    "I am passionate about learning software development and continuously improving my technical skills. I enjoy solving programming problems, building practical applications, and exploring modern technologies.",
  education: {
    degree: "B.Tech in Computer Science Engineering",
    institution: "Rayat Bahra University",
    status: "Currently in 4th Year",
  },
  roles: [
    "B.Tech Student at Rayat Bahra University",
    "Google Cybersecurity Learner — 2 Courses Completed",
    "Python Developer | Cloud & Cybersecurity Learner",
    "Software Developer",
  ],
  skills: {
    programming: ["C", "C++", "Java (Basic)", "Python (Learning)"],
    web: ["HTML5", "JavaScript", "Node.js"],
    database: ["MongoDB"],
    tools: ["Git", "GitHub", "Visual Studio Code", "Postman"],
  },
  softSkills: [
    "Team Collaboration",
    "Quick Learning Ability",
    "Effective Communication",
    "Problem Solving",
    "Analytical Thinking",
    "Adaptability",
    "Time Management",
  ],
  socialLinks: {
    github: "https://github.com/Satnam-dev",
    linkedin: "https://www.linkedin.com/in/satnam-kumar-576190361/",
    email: "satnamkumar.cse@gmail.com",
  },
  resumeUrl: "/resume/Satnam%20Kumar.pdf.pdf",
  stats: {
    projectsCount: 2,
    skillsCount: 12,
    certificationsCount: 2,
  },
};
