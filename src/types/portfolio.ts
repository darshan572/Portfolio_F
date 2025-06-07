export interface PersonalInfo {
  name: string;
  title: string;
  introduction: string;
  profileImage: string;
  resumePdf: string;
  email: string;
  phone: string;
  location?: string;
}

export interface SocialLinks {
  github: string;
  linkedin: string;
  twitter: string;
  instagram?: string;
  behance?: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number; // 1-100
  category: "programming" | "framework" | "tool" | "database" | "other";
  icon?: string;
  color?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  images: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  category: string;
  startDate: string;
  endDate?: string;
  status: "completed" | "in-progress" | "planned";
  createdAt: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  verificationUrl?: string;
  credentialId?: string;
  image?: string;
  skills: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
  gpa?: number;
  achievements?: string[];
  current: boolean;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface PortfolioData {
  personalInfo: PersonalInfo;
  socialLinks: SocialLinks;
  skills: Skill[];
  projects: Project[];
  certifications: Certification[];
  education: Education[];
  experience: Experience[];
  settings: {
    theme: "dark" | "light";
    animations: boolean;
    emailNotifications: boolean;
    showEmail: boolean;
    showPhone: boolean;
  };
}

export interface AuthState {
  isAuthenticated: boolean;
  lastLogin?: string;
  sessionTimeout: number;
}

export interface AdminUser {
  username: string;
  passwordHash: string;
  lastLogin?: string;
}
