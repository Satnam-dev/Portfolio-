import mongoose from "mongoose";
import { connectDB } from "../config/db";
import { Project } from "../models/Project";
import { Certification } from "../models/Certification";
import { Experience } from "../models/Experience";
import { PortfolioInfo } from "../models/PortfolioInfo";

const seedProjects = [
  {
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
      "Conditional Statements for Accurate Grade Evaluation",
    ],
    technologies: ["C++"],
    imageUrl: "/images/projects/grade-system.svg",
    githubUrl: "https://github.com/Satnam-dev",
    liveDemoUrl: null,
    featured: true,
    order: 1,
  },
  {
    title: "Password Strength Checker",
    slug: "password-strength-checker",
    description:
      "Developed a GUI-based Password Strength Checker using Python Tkinter to evaluate password security.",
    features: [
      "User-Friendly GUI",
      "Password Strength Analysis",
      "Weak Password Detection",
      "Medium Password Detection",
      "Strong Password Detection",
      "Real-Time Validation",
      "Checks Length, Uppercase, Lowercase, Numbers, Special Characters",
    ],
    technologies: ["Python", "Tkinter"],
    imageUrl: "/images/projects/password-checker.svg",
    githubUrl: "https://github.com/Satnam-dev",
    liveDemoUrl: null,
    featured: true,
    order: 2,
  },
];

const seedCertifications = [
  {
    name: "Samsung Innovation Campus Competition Certificate",
    slug: "samsung-innovation-campus",
    description:
      "Certificate awarded for participation and achievement in the Samsung Innovation Campus Competition, demonstrating innovation and technical excellence.",
    imageUrl: "/certificates/samsung-certificate.svg",
    certificateUrl: "/certificates/samsung-innovation-campus.pdf",
    downloadUrl: "/certificates/samsung-innovation-campus.pdf",
    issuer: "Samsung",
    issuedDate: new Date("2024-06-01"),
    order: 1,
  },
];

const seedExperiences = [
  {
    title: "Python with AI Training",
    organization: "Professional Training Program",
    type: "training" as const,
    currentLevel: "Level 1",
    status: "current" as const,
    startDate: new Date("2025-01-01"),
    endDate: null,
    learning: [
      "Python Programming",
      "Artificial Intelligence Fundamentals",
      "Machine Learning Basics",
      "Backend Development",
      "Problem Solving",
    ],
    description:
      "Currently undergoing structured Python with AI training, building foundational skills in programming, AI concepts, and backend development.",
    order: 1,
  },
];

const seedPortfolio = {
  name: "Satnam Kumar",
  title: "Aspiring Full-Stack Developer",
  tagline: "Building practical applications with modern technologies",
  about:
    "I am passionate about learning software development and continuously improving my technical skills. I enjoy solving programming problems, building practical applications, and exploring modern technologies. My current focus areas include Full-Stack Development, Artificial Intelligence, Backend Development, and Software Engineering.",
  education: {
    degree: "B.Tech in Computer Science Engineering",
    institution: "",
    status: "Currently in 4th Year",
  },
  roles: [
    "B.Tech Computer Science Engineering Student",
    "Aspiring Full-Stack Developer",
    "Python with AI Trainee",
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
    linkedin: null,
    email: null,
  },
  resumeUrl: "/resume/Satnam-Kumar-Resume.pdf",
  stats: {
    projectsCount: 2,
    skillsCount: 12,
    certificationsCount: 1,
  },
};

export const seedDatabase = async (): Promise<void> => {
  await connectDB();

  await Promise.all([
    Project.deleteMany({}),
    Certification.deleteMany({}),
    Experience.deleteMany({}),
    PortfolioInfo.deleteMany({}),
  ]);

  await Project.insertMany(seedProjects);
  await Certification.insertMany(seedCertifications);
  await Experience.insertMany(seedExperiences);
  await PortfolioInfo.create(seedPortfolio);

  console.log("Database seeded successfully!");
  console.log(`  - ${seedProjects.length} projects`);
  console.log(`  - ${seedCertifications.length} certifications`);
  console.log(`  - ${seedExperiences.length} experiences`);
  console.log(`  - 1 portfolio profile`);
};

if (require.main === module) {
  seedDatabase()
    .then(() => mongoose.disconnect())
    .catch((err) => {
      console.error("Seed failed:", err);
      process.exit(1);
    });
}
