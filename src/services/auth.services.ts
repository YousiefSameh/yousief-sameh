import api from './api';
import Cookies from 'js-cookie';

const TOKEN_KEY = 'auth_token';

export const login = async (credentials: { username: string; password: string }) => {
  try {
    const response = await api.post('/auth/login', credentials);
    const token = response.data.token;
    setToken(token);
    return response.data;
  } catch (error) {
    if (error instanceof Error && 'response' in error && (error.response as { data?: { message?: string } }).data) {
      throw new Error(((error.response as { data?: { message?: string } }).data as { message?: string }).message || "Failed to login");
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const logout = () => {
  removeToken();
};

export const setToken = (token: string) => {
  Cookies.set(TOKEN_KEY, token, { expires: 1 });
};

export const getToken = (): string | undefined => {
  return Cookies.get(TOKEN_KEY);
};

export const removeToken = () => {
  Cookies.remove(TOKEN_KEY);
};