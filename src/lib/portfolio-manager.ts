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
        name: "Your Name",
        title: "B.Tech CSE Student",
        introduction:
          "Passionate computer science student with a focus on software development and emerging technologies.",
        profileImage: "",
        resumePdf: "",
        email: "your.email@example.com",
        phone: "",
        location: "Your City, Country",
      },
      socialLinks: {
        github: "",
        linkedin: "",
        twitter: "",
        instagram: "",
        behance: "",
      },
      skills: [
        {
          id: "1",
          name: "JavaScript",
          level: 85,
          category: "programming",
          color: "#f7df1e",
        },
        {
          id: "2",
          name: "React",
          level: 80,
          category: "framework",
          color: "#61dafb",
        },
        {
          id: "3",
          name: "TypeScript",
          level: 75,
          category: "programming",
          color: "#3178c6",
        },
      ],
      projects: [],
      certifications: [],
      education: [
        {
          id: "1",
          institution: "Your University",
          degree: "Bachelor of Technology",
          field: "Computer Science and Engineering",
          startDate: "2023-08-01",
          endDate: "2027-05-01",
          current: true,
          gpa: 0,
          achievements: [],
        },
      ],
      experience: [],
      settings: {
        theme: "dark",
        animations: true,
        emailNotifications: true,
        showEmail: true,
        showPhone: false,
      },
    };
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
