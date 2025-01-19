import api from './api';

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
}

// جلب جميع المشاريع
export const fetchProjects = async (): Promise<TProject[]> => {
  const response = await api.get('/projects');
  return response.data;
};

// إضافة مشروع جديد
export const addProject = async (project: TProject): Promise<TProject> => {
  const formData = new FormData();
  formData.append('projectTitle[ar]', project.projectTitle.ar);
  formData.append('projectTitle[en]', project.projectTitle.en);
  formData.append('projectSubtitle[ar]', project.projectSubtitle.ar);
  formData.append('projectSubtitle[en]', project.projectSubtitle.en);
  formData.append('projectURL', project.projectURL);
  formData.append('projectGithubURL', project.projectGithubURL);
  formData.append('category[ar]', project.category.ar);
  formData.append('category[en]', project.category.en);
  if (project.projectImage instanceof File) {
    formData.append('projectImage', project.projectImage);
  }

  const response = await api.post('/projects', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// تحديث مشروع موجود
export const updateProject = async (project: TProject): Promise<TProject> => {
  const formData = new FormData();
  formData.append('projectTitle[ar]', project.projectTitle.ar);
  formData.append('projectTitle[en]', project.projectTitle.en);
  formData.append('projectSubtitle[ar]', project.projectSubtitle.ar);
  formData.append('projectSubtitle[en]', project.projectSubtitle.en);
  formData.append('projectURL', project.projectURL);
  formData.append('projectGithubURL', project.projectGithubURL);
  formData.append('category[ar]', project.category.ar);
  formData.append('category[en]', project.category.en);
  if (project.projectImage instanceof File) {
    formData.append('projectImage', project.projectImage);
  }

  const response = await api.put(`/projects/${project._id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// حذف مشروع
export const deleteProject = async (projectId: string): Promise<void> => {
  await api.delete(`/projects/${projectId}`);
};