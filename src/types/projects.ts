export interface TProject {
  _id?: string;
  projectTitle: {
    ar: string;
    en: string;
  };
  projectSubtitle: {
    ar: string;
    en: string;
  };
  projectURL: string;
  projectGithubURL: string;
  projectImage: File | string;
  category: {
    ar: string;
    en: string;
  };
  createdAt?: string;
  updatedAt?: string;
}
