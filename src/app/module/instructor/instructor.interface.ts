export interface IInstructor {
  name: string;
  designation: string;
  image: string;
  bio: string;
  yearsExperience: number;
  studentsTaught: number;
  averageRating: number;
  coursesCreated: number;
  teachingPhilosophy: string;
  expertise: string[];
  certifications: {
    title: string;
    period: string;
  }[];
  socialLinks: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}
