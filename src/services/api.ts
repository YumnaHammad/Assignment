import axios from 'axios';
import type { User, Post, Todo, Album } from '../types';

const apiClient = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error Intercepted:", error?.message || error);
    return Promise.reject(error);
  }
);

export const api = {
  getUsers: async (): Promise<User[]> => {
    const response = await apiClient.get<User[]>('/users');
    return response.data;
  },
  getUser: async (id: number): Promise<User> => {
    const response = await apiClient.get<User>(`/users/${id}`);
    return response.data;
  },
  getPosts: async (): Promise<Post[]> => {
    const response = await apiClient.get<Post[]>('/posts');
    return response.data;
  },
  getTodos: async (): Promise<Todo[]> => {
    const response = await apiClient.get<Todo[]>('/todos');
    return response.data.slice(0, 50); // Limit to 50 for performance
  },
  getAlbums: async (): Promise<Album[]> => {
    const response = await apiClient.get<Album[]>('/albums');
    return response.data.slice(0, 10);
  }
};
