import { useStore } from '../store';

/**
 * useAuth — exposes only auth-related state & actions from the global store.
 * Pages/components should use this instead of importing useStore directly for auth.
 */
export const useAuth = () => {
  const { isAuthenticated, currentUser, login, logout } = useStore();
  return { isAuthenticated, currentUser, login, logout };
};
