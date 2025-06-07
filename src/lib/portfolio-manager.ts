import {
  PortfolioData,
  Project,
  Skill,
  Certification,
  Education,
  Experience,
} from "@/types/portfolio";

class PortfolioManager {
  private static instance: PortfolioManager;
  private data: PortfolioData;
  private readonly STORAGE_KEY = "portfolioData";
  private readonly VERSION_KEY = "portfolioDataVersion";
  private readonly CURRENT_VERSION = "1.0.0";

  private constructor() {
    this.data = this.loadData();
  }

  public static getInstance(): PortfolioManager {
    if (!PortfolioManager.instance) {
      PortfolioManager.instance = new PortfolioManager();
    }
    return PortfolioManager.instance;
  }

  private getDefaultData(): PortfolioData {
    return {
      personalInfo: {
        name: 'Darshan Kumar',
        title: 'B.Tech 2nd Year Student',
        introduction: 'Passionate B.Tech 2nd year student at Quantum University with a focus on software development, web technologies, and emerging tech innovations. Always eager to learn and build amazing projects.',
        profileImage: '',
        resumePdf: '',
        email: 'darshan.kumar@example.com',
        phone: '+91 98765 43210',
        location: 'Quantum University, Roorkee'
      },
      socialLinks: {
        github: 'https://github.com/darshankumar',
        linkedin: 'https://linkedin.com/in/darshan-kumar',
        twitter: 'https://twitter.com/darshan_dev',
        instagram: 'https://instagram.com/darshan.codes',
        behance: ''
      },
      skills: [
        {
          id: '1',
          name: 'JavaScript',
          level: 85,
          category: 'programming',
          color: '#f7df1e'
        },
        {
          id: '2',
          name: 'React',
          level: 80,
          category: 'framework',
          color: '#61dafb'
        },
        {
          id: '3',
          name: 'TypeScript',
          level: 75,
          category: 'programming',
          color: '#3178c6'
        },
        {
          id: '4',
          name: 'Node.js',
          level: 78,
          category: 'framework',
          color: '#68a063'
        },
        {
          id: '5',
          name: 'Python',
          level: 82,
          category: 'programming',
          color: '#3776ab'
        },
        {
          id: '6',
          name: 'MongoDB',
          level: 70,
          category: 'database',
          color: '#47a248'
        },
        {
          id: '7',
          name: 'Git',
          level: 88,
          category: 'tool',
          color: '#f05032'
        },
        {
          id: '8',
          name: 'HTML/CSS',
          level: 90,
          category: 'programming',
          color: '#e34f26'
        }
      ],
      projects: [
        {
          id: '1',
          title: 'E-Commerce Website',
          description: 'A full-stack e-commerce platform with React frontend and Node.js backend, featuring user authentication, payment integration, and admin dashboard.',
          longDescription: 'Complete e-commerce solution with modern design, responsive layout, and seamless user experience.',
          technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe', 'JWT'],
          images: ['https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop'],
          liveUrl: 'https://ecommerce-demo.vercel.app',
          githubUrl: 'https://github.com/darshankumar/ecommerce-app',
          featured: true,
          category: 'Web Development',
          startDate: '2024-01-01',
          endDate: '2024-03-01',
          status: 'completed',
          createdAt: '2024-01-01T00:00:00.000Z'
        },
        {
          id: '2',
          title: 'Task Management App',
          description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
          longDescription: 'Modern task management solution for teams with real-time collaboration.',
          technologies: ['React', 'Firebase', 'Material-UI', 'Socket.io'],
          images: ['https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=400&fit=crop'],
          liveUrl: 'https://taskify-demo.netlify.app',
          githubUrl: 'https://github.com/darshankumar/taskify',
          featured: true,
          category: 'Web Development',
          startDate: '2024-02-01',
          endDate: '2024-04-01',
          status: 'completed',
          createdAt: '2024-02-01T00:00:00.000Z'
        },
        {
          id: '3',
          title: 'Weather Dashboard',
          description: 'A responsive weather dashboard showing current weather, forecasts, and interactive maps with beautiful animations.',
          longDescription: 'Beautiful weather application with modern UI and accurate weather data.',
          technologies: ['JavaScript', 'HTML5', 'CSS3', 'Weather API', 'Chart.js'],
          images: ['https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&h=400&fit=crop'],
          liveUrl: 'https://weather-hub.vercel.app',
          githubUrl: 'https://github.com/darshankumar/weather-dashboard',
          featured: false,
          category: 'Web Development',
          startDate: '2023-11-01',
          endDate: '2023-12-01',
          status: 'completed',
          createdAt: '2023-11-01T00:00:00.000Z'
        },
        {
          id: '4',
          title: 'Portfolio Website',
          description: 'This very portfolio website built with React, TypeScript, and Framer Motion, featuring a content management system.',
          longDescription: 'Personal portfolio with admin panel for content management.',
          technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
          images: ['https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=400&fit=crop'],
          liveUrl: '#',
          githubUrl: 'https://github.com/darshankumar/portfolio',
          featured: true,
          category: 'Web Development',
          startDate: '2024-03-01',
          endDate: '',
          status: 'completed',
          createdAt: '2024-03-01T00:00:00.000Z'
        },
        {
          id: '5',
          title: 'Chat Application',
          description: 'Real-time chat application with group messaging, file sharing, and emoji reactions built with Socket.io.',
          longDescription: 'Modern chat application with real-time messaging capabilities.',
          technologies: ['React', 'Socket.io', 'Node.js', 'MongoDB', 'Express'],
          images: ['https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=800&h=400&fit=crop'],
          liveUrl: '',
          githubUrl: 'https://github.com/darshankumar/chat-app',
          featured: false,
          category: 'Web Development',
          startDate: '2024-04-01',
          endDate: '',
          status: 'in-progress',
          createdAt: '2024-04-01T00:00:00.000Z'
        }
      ],
      certifications: [
        {
          id: '1',
          name: 'JavaScript Algorithms and Data Structures',
          issuer: 'freeCodeCamp',
          issueDate: '2024-01-15',
          expiryDate: '',
          verificationUrl: 'https://freecodecamp.org/certification/darshan/javascript-algorithms-and-data-structures',
          credentialId: 'fCC-abc123def456',
          image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=300&fit=crop',
          skills: ['JavaScript', 'Algorithms', 'Data Structures', 'ES6+']
        },
        {
          id: '2',
          name: 'React Developer Certification',
          issuer: 'Meta (Facebook)',
          issueDate: '2024-02-20',
          expiryDate: '2026-02-20',
          verificationUrl: 'https://coursera.org/verify/react-cert-456',
          credentialId: 'META-REACT-789',
          image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop',
          skills: ['React', 'JSX', 'Hooks', 'State Management', 'Component Design']
        },
        {
          id: '3',
          name: 'AWS Cloud Practitioner',
          issuer: 'Amazon Web Services',
          issueDate: '2024-03-10',
          expiryDate: '2027-03-10',
          verificationUrl: 'https://aws.amazon.com/verification/cloud-practitioner',
          credentialId: 'AWS-CP-2024-789',
          image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop',
          skills: ['Cloud Computing', 'AWS Services', 'Cloud Architecture', 'Security']
        },
        {
          id: '4',
          name: 'Google Web Developer Certificate',
          issuer: 'Google',
          issueDate: '2023-12-05',
          expiryDate: '',
          verificationUrl: 'https://coursera.org/verify/google-web-dev',
          credentialId: 'GOOGLE-WD-2023-456',
          image: 'https://images.unsplash.com/photo-1432821596592-e2c18b78144f?w=400&h=300&fit=crop',
          skills: ['HTML', 'CSS', 'JavaScript', 'Responsive Design', 'Web Performance']
        },
        {
          id: '5',
          name: 'MongoDB Associate Developer',
          issuer: 'MongoDB University',
          issueDate: '2024-01-30',
          expiryDate: '2026-01-30',
          verificationUrl: 'https://university.mongodb.com/verify/associate-dev',
          credentialId: 'MONGO-AD-2024-123',
          image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop',
          skills: ['MongoDB', 'NoSQL', 'Database Design', 'Aggregation', 'Indexing']
        }
      ],
      education: [
        {
          id: '1',
          institution: 'Quantum University',
          degree: 'Bachelor of Technology',
          field: 'Computer Science and Engineering',
          startDate: '2023-08-01',
          endDate: '2027-05-01',
          current: true,
          gpa: 8.5,
          achievements: ['Dean\'s List', 'Coding Club Member', 'Tech Fest Organizer']
        }
      ],
      experience: [],
      settings: {
        theme: 'dark',
        animations: true,
        emailNotifications: true,
        showEmail: true,
        showPhone: false
      }
    };
  }
  }

  private loadData(): PortfolioData {
    try {
      const savedData = localStorage.getItem(this.STORAGE_KEY);
      const savedVersion = localStorage.getItem(this.VERSION_KEY);

      if (savedData && savedVersion === this.CURRENT_VERSION) {
        return JSON.parse(savedData);
      } else {
        // Data migration or first time setup
        const defaultData = this.getDefaultData();
        this.saveData(defaultData);
        return defaultData;
      }
    } catch (error) {
      console.error("Error loading portfolio data:", error);
      return this.getDefaultData();
    }
  }

  private saveData(data?: PortfolioData): void {
    try {
      const dataToSave = data || this.data;
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(dataToSave));
      localStorage.setItem(this.VERSION_KEY, this.CURRENT_VERSION);

      // Trigger custom event for real-time updates
      window.dispatchEvent(
        new CustomEvent("portfolioDataUpdated", {
          detail: dataToSave,
        }),
      );
    } catch (error) {
      console.error("Error saving portfolio data:", error);
    }
  }

  // Getters
  public getData(): PortfolioData {
    return { ...this.data };
  }

  public getPersonalInfo() {
    return { ...this.data.personalInfo };
  }

  public getSkills() {
    return [...this.data.skills];
  }

  public getProjects() {
    return [...this.data.projects];
  }

  public getCertifications() {
    return [...this.data.certifications];
  }

  public getEducation() {
    return [...this.data.education];
  }

  public getExperience() {
    return [...this.data.experience];
  }

  public getSocialLinks() {
    return { ...this.data.socialLinks };
  }

  public getSettings() {
    return { ...this.data.settings };
  }

  // Setters
  public updatePersonalInfo(
    personalInfo: Partial<typeof this.data.personalInfo>,
  ): void {
    this.data.personalInfo = { ...this.data.personalInfo, ...personalInfo };
    this.saveData();
  }

  public updateSocialLinks(
    socialLinks: Partial<typeof this.data.socialLinks>,
  ): void {
    this.data.socialLinks = { ...this.data.socialLinks, ...socialLinks };
    this.saveData();
  }

  public updateSettings(settings: Partial<typeof this.data.settings>): void {
    this.data.settings = { ...this.data.settings, ...settings };
    this.saveData();
  }

  // Skills management
  public addSkill(skill: Omit<Skill, "id">): Skill {
    const newSkill: Skill = {
      ...skill,
      id: this.generateId(),
    };
    this.data.skills.push(newSkill);
    this.saveData();
    return newSkill;
  }

  public updateSkill(id: string, skill: Partial<Skill>): Skill | null {
    const index = this.data.skills.findIndex((s) => s.id === id);
    if (index !== -1) {
      this.data.skills[index] = { ...this.data.skills[index], ...skill };
      this.saveData();
      return this.data.skills[index];
    }
    return null;
  }

  public deleteSkill(id: string): boolean {
    const index = this.data.skills.findIndex((s) => s.id === id);
    if (index !== -1) {
      this.data.skills.splice(index, 1);
      this.saveData();
      return true;
    }
    return false;
  }

  // Projects management
  public addProject(project: Omit<Project, "id" | "createdAt">): Project {
    const newProject: Project = {
      ...project,
      id: this.generateId(),
      createdAt: new Date().toISOString(),
    };
    this.data.projects.push(newProject);
    this.saveData();
    return newProject;
  }

  public updateProject(id: string, project: Partial<Project>): Project | null {
    const index = this.data.projects.findIndex((p) => p.id === id);
    if (index !== -1) {
      this.data.projects[index] = { ...this.data.projects[index], ...project };
      this.saveData();
      return this.data.projects[index];
    }
    return null;
  }

  public deleteProject(id: string): boolean {
    const index = this.data.projects.findIndex((p) => p.id === id);
    if (index !== -1) {
      this.data.projects.splice(index, 1);
      this.saveData();
      return true;
    }
    return false;
  }

  // Certifications management
  public addCertification(
    certification: Omit<Certification, "id">,
  ): Certification {
    const newCertification: Certification = {
      ...certification,
      id: this.generateId(),
    };
    this.data.certifications.push(newCertification);
    this.saveData();
    return newCertification;
  }

  public updateCertification(
    id: string,
    certification: Partial<Certification>,
  ): Certification | null {
    const index = this.data.certifications.findIndex((c) => c.id === id);
    if (index !== -1) {
      this.data.certifications[index] = {
        ...this.data.certifications[index],
        ...certification,
      };
      this.saveData();
      return this.data.certifications[index];
    }
    return null;
  }

  public deleteCertification(id: string): boolean {
    const index = this.data.certifications.findIndex((c) => c.id === id);
    if (index !== -1) {
      this.data.certifications.splice(index, 1);
      this.saveData();
      return true;
    }
    return false;
  }

  // Education management
  public addEducation(education: Omit<Education, "id">): Education {
    const newEducation: Education = {
      ...education,
      id: this.generateId(),
    };
    this.data.education.push(newEducation);
    this.saveData();
    return newEducation;
  }

  public updateEducation(
    id: string,
    education: Partial<Education>,
  ): Education | null {
    const index = this.data.education.findIndex((e) => e.id === id);
    if (index !== -1) {
      this.data.education[index] = {
        ...this.data.education[index],
        ...education,
      };
      this.saveData();
      return this.data.education[index];
    }
    return null;
  }

  public deleteEducation(id: string): boolean {
    const index = this.data.education.findIndex((e) => e.id === id);
    if (index !== -1) {
      this.data.education.splice(index, 1);
      this.saveData();
      return true;
    }
    return false;
  }

  // Experience management
  public addExperience(experience: Omit<Experience, "id">): Experience {
    const newExperience: Experience = {
      ...experience,
      id: this.generateId(),
    };
    this.data.experience.push(newExperience);
    this.saveData();
    return newExperience;
  }

  public updateExperience(
    id: string,
    experience: Partial<Experience>,
  ): Experience | null {
    const index = this.data.experience.findIndex((e) => e.id === id);
    if (index !== -1) {
      this.data.experience[index] = {
        ...this.data.experience[index],
        ...experience,
      };
      this.saveData();
      return this.data.experience[index];
    }
    return null;
  }

  public deleteExperience(id: string): boolean {
    const index = this.data.experience.findIndex((e) => e.id === id);
    if (index !== -1) {
      this.data.experience.splice(index, 1);
      this.saveData();
      return true;
    }
    return false;
  }

  // Utility methods
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  public exportData(): string {
    return JSON.stringify(this.data, null, 2);
  }

  public importData(jsonData: string): boolean {
    try {
      const parsedData = JSON.parse(jsonData);
      // Basic validation
      if (parsedData && typeof parsedData === "object") {
        this.data = { ...this.getDefaultData(), ...parsedData };
        this.saveData();
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error importing data:", error);
      return false;
    }
  }

  public resetData(): void {
    this.data = this.getDefaultData();
    this.saveData();
  }

  // File handling helpers
  public static async fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  }

  public static validateImage(file: File): boolean {
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    const maxSize = 5 * 1024 * 1024; // 5MB

    return validTypes.includes(file.type) && file.size <= maxSize;
  }

  public static validatePDF(file: File): boolean {
    return file.type === "application/pdf" && file.size <= 10 * 1024 * 1024; // 10MB
  }
}

export default PortfolioManager;