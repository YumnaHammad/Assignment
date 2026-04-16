import { create } from 'zustand';
import { api } from '../services/api';
import type { User, Post, Todo, Album } from '../types';

interface AppState {
  isAuthenticated: boolean;
  currentUser: User | null;

  searchQuery: string;
  setSearchQuery: (query: string) => void;

  users: User[];
  posts: Post[];
  todos: Todo[];
  albums: Album[];
  
  loadingUsers: boolean;
  loadingPosts: boolean;
  loadingDashboard: boolean;
  
  errorUsers: string | null;
  errorPosts: string | null;
  errorDashboard: string | null;

  registeredUsers: any[];

  login: (email: string, password?: string) => Promise<void>;
  register: (email: string, password?: string) => Promise<void>;
  logout: () => void;

  fetchUsers: () => Promise<void>;
  fetchPosts: () => Promise<void>;
  fetchDashboardData: () => Promise<void>;
  
  toggleTodo: (id: number) => void;
}

export const useStore = create<AppState>((set, get) => ({
  isAuthenticated: false,
  currentUser: null,

  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),

  users: [],
  posts: [],
  todos: [],
  albums: [],
  
  loadingUsers: false,
  loadingPosts: false,
  loadingDashboard: false,
  
  errorUsers: null,
  errorPosts: null,
  errorDashboard: null,

  registeredUsers: [{ email: 'admin@nexus.com', password: 'password', name: 'Admin User' }],

  login: async (email, password) => {
    // Simulated auth delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Strict enforcement: Only demo credentials allowed
    if (email === 'admin@nexus.com' && password === 'password') {
      const demoUser = get().registeredUsers.find(u => u.email === 'admin@nexus.com');
      set({ isAuthenticated: true, currentUser: demoUser });
    } else {
      throw new Error("Strict Mode: Only the Demo Credentials are allowed to log in.");
    }
  },

  register: async (_email, _password) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    throw new Error("Registration is disabled in this locked demo environment.");
  },

  logout: () => {
    set({ isAuthenticated: false, currentUser: null });
  },

  fetchUsers: async () => {
    set({ loadingUsers: true, errorUsers: null });
    try {
      const data = await api.getUsers();
      set({ users: data });
    } catch (err: any) {
      set({ errorUsers: err.message || 'Failed to fetch users' });
    } finally {
      set({ loadingUsers: false });
    }
  },

  fetchPosts: async () => {
    set({ loadingPosts: true, errorPosts: null });
    try {
      const data = await api.getPosts();
      set({ posts: data });
    } catch (err: any) {
      set({ errorPosts: err.message || 'Failed to fetch posts' });
    } finally {
      set({ loadingPosts: false });
    }
  },

  fetchDashboardData: async () => {
    set({ loadingDashboard: true, errorDashboard: null });
    try {
      const [todosData, albumsData] = await Promise.all([
        api.getTodos(),
        api.getAlbums()
      ]);
      set({ todos: todosData, albums: albumsData });
    } catch (err: any) {
      set({ errorDashboard: err.message || 'Failed to fetch dashboard data' });
    } finally {
      set({ loadingDashboard: false });
    }
  },

  toggleTodo: (id: number) => {
    set((state) => ({
      todos: state.todos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    }));
  }
}));
