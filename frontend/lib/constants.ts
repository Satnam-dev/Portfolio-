export const SITE = {
  name: "Satnam Kumar",
  github: "https://github.com/Satnam-dev",
  githubUsername: "Satnam-dev",
  linkedin:
    process.env.NEXT_PUBLIC_LINKEDIN_URL ||
    "https://www.linkedin.com/in/satnam-kumar-576190361/",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "satnamkumar.cse@gmail.com",
  resumeUrl: "/resume/Satnam%20Kumar.pdf.pdf",
  university: "Rayat Bahra University",
};

export const NAV_LINKS = [
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Certifications", href: "#certifications" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
] as const;

export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:6000/api/v1";

export const TYPING_ROLES = [
  "B.Tech Student at Rayat Bahra University",
  "Google Cybersecurity Learner — 2 Courses Completed",
  "Python Developer | Cloud & Cybersecurity Learner",
  "Software Developer",
];

export const FALLBACK_SKILLS = {
  programming: ["C", "C++", "Java (Basic)", "Python (Learning)"],
  web: ["HTML5", "JavaScript", "Node.js"],
  database: ["MongoDB"],
  tools: ["Git", "GitHub", "Visual Studio Code", "Postman"],
};

export const FALLBACK_SOFT_SKILLS = [
  "Team Collaboration",
  "Quick Learning Ability",
  "Effective Communication",
  "Problem Solving",
  "Analytical Thinking",
  "Adaptability",
  "Time Management",
];

export const FALLBACK_ABOUT =
  "I am passionate about learning software development and continuously improving my technical skills. I enjoy solving programming problems, building practical applications, and exploring modern technologies. My current focus areas include Full-Stack Development, Artificial Intelligence, Backend Development, and Software Engineering.";

export const FOCUS_AREAS = [
  "Cybersecurity",
  "Cloud Computing",
  "Python Development",
  "Software Engineering",
];
