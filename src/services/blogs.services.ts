import { TBlog } from '@customTypes/blogs';
import api from './api';

export const fetchBlogs = async (): Promise<TBlog[]> => {
  try {
    const response = await api.get('/blogs');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch blogs:', error);
    throw error;
  }
};

export const addBlog = async (blog: TBlog): Promise<TBlog> => {
  try {
    const response = await api.post('/blogs', blog);
    return response.data;
  } catch (error) {
    console.error('Failed to add blog:', error);
    throw error;
  }
};

export const updateBlog = async (blog: TBlog): Promise<TBlog> => {
  try {
    const response = await api.put(`/blogs/${blog._id}`, blog);
    return response.data;
  } catch (error) {
    console.error('Failed to update blog:', error);
    throw error;
  }
};

export const deleteBlog = async (blogId: string): Promise<void> => {
  try {
    await api.delete(`/blogs/${blogId}`);
  } catch (error) {
    console.error('Failed to delete blog:', error);
    throw error;
  }
};