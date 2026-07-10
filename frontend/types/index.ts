export interface Project {
  _id: string;
  title: string;
  slug: string;
  description: string;
  features: string[];
  technologies: string[];
  imageUrl: string;
  githubUrl?: string;
  liveDemoUrl?: string | null;
  featured: boolean;
  order: number;
}

export interface Certification {
  _id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  certificateUrl: string;
  downloadUrl: string;
  issuer: string;
  issuedDate: string;
  course?: string;
  startDate?: string;
  endDate?: string;
  partner?: string;
  order: number;
}

export interface Experience {
  _id: string;
  title: string;
  organization?: string;
  type: "training" | "internship" | "work";
  currentLevel?: string;
  status: "current" | "completed";
  startDate: string;
  endDate?: string | null;
  learning: string[];
  description: string;
  images?: string[];
  order: number;
}

export interface PortfolioInfo {
  _id: string;
  name: string;
  title: string;
  tagline: string;
  about: string;
  education: {
    degree: string;
    institution: string;
    status: string;
  };
  roles: string[];
  skills: {
    programming: string[];
    web: string[];
    database: string[];
    tools: string[];
  };
  softSkills: string[];
  socialLinks: {
    github: string;
    linkedin?: string | null;
    email?: string | null;
  };
  resumeUrl: string;
  stats: {
    projectsCount: number;
    skillsCount: number;
    certificationsCount: number;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface GitHubUser {
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
}

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  fork: boolean;
}
