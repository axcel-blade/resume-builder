export interface ResumeProfileData {
  fullName: string;
  objective?: string;
  yearsOfExperience?: number;
  skills: string[];
  education: Array<{
    degree: string;
    school: string;
    year: string | number;
  }>;
  experience: Array<{
    position: string;
    company: string;
    startDate: string;
    endDate?: string;
    responsibilities?: string[];
    achievements?: string[];
  }>;
}
