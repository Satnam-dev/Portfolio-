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
    name: "Google Cybersecurity Professional Certificate",
    slug: "google-cybersecurity-professional",
    description:
      "Ongoing enrollment in the Google Cybersecurity Professional Certificate on Coursera. Completed 2 of 8 courses so far, covering security foundations, network defense, and hands-on cybersecurity practices.",
    imageUrl: "/certificates/google-cybersecurity.svg",
    certificateUrl: "/certificates/google-cybersecurity.svg",
    downloadUrl: "/certificates/google-cybersecurity.svg",
    issuer: "Google",
    issuedDate: new Date("2026-07-08"),
    course: "Cybersecurity Professional Certificate (2/8 completed)",
    startDate: new Date("2026-07-08"),
    partner: "Coursera",
    order: 1,
  },
  {
    name: "Samsung Innovation Campus Certificate of Completion",
    slug: "samsung-innovation-campus",
    description:
      "Certificate awarded for successfully completing the Coding & Programming course during the Samsung Innovation Campus program. This program is conducted in partnership with the Telecom Sector Skill Council to develop industry-ready technology skills.",
    imageUrl: "/certificates/samsung-innovation-campus.png",
    certificateUrl: "/certificates/samsung-innovation-campus.png",
    downloadUrl: "/certificates/samsung-innovation-campus.png",
    issuer: "Samsung Innovation Campus",
    issuedDate: new Date("2026-02-11"),
    course: "Coding & Programming",
    startDate: new Date("2025-11-27"),
    endDate: new Date("2026-02-11"),
    partner: "Telecom Sector Skill Council",
    order: 2,
  },
];

const seedExperiences = [
  {
    title: "Google Cybersecurity Professional Certificate",
    organization: "Google · Coursera",
    type: "training" as const,
    currentLevel: "2 of 8 Courses Completed",
    status: "current" as const,
    startDate: new Date("2026-07-08"),
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
    title: "B.Tech in Computer Science Engineering",
    organization: "Rayat Bahra University",
    type: "training" as const,
    status: "current" as const,
    startDate: new Date("2022-01-01"),
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

const seedPortfolio = {
  name: "Satnam Kumar",
  title: "Python Developer | Cloud & Cybersecurity Learner",
  tagline: "Building practical applications with modern technologies",
  about:
    "I am passionate about learning software development and continuously improving my technical skills. I enjoy solving programming problems, building practical applications, and exploring modern technologies. My current focus areas include Full-Stack Development, Artificial Intelligence, Backend Development, and Software Engineering.",
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

const insertSeedData = async (): Promise<void> => {
  await Project.insertMany(seedProjects);
  await Certification.insertMany(seedCertifications);
  await Experience.insertMany(seedExperiences);
  await PortfolioInfo.create(seedPortfolio);
};

export const seedIfEmpty = async (): Promise<void> => {
  const projectCount = await Project.countDocuments();
  if (projectCount > 0) {
    return;
  }

  await insertSeedData();

  console.log("In-memory database seeded successfully!");
  console.log(`  - ${seedProjects.length} projects`);
  console.log(`  - ${seedCertifications.length} certifications`);
  console.log(`  - ${seedExperiences.length} experiences`);
  console.log(`  - 1 portfolio profile`);
};

export const seedDatabase = async (): Promise<void> => {
  await connectDB();

  await Promise.all([
    Project.deleteMany({}),
    Certification.deleteMany({}),
    Experience.deleteMany({}),
    PortfolioInfo.deleteMany({}),
  ]);

  await insertSeedData();

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
