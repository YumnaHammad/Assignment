import { useStore } from '../store';

/**
 * useUsers — exposes users state + fetch trigger.
 */
export const useUsers = () => {
  const { users, loadingUsers, errorUsers, fetchUsers, searchQuery } = useStore();
  return { users, loading: loadingUsers, error: errorUsers, fetchUsers, searchQuery };
};

/**
 * usePosts — exposes posts state + fetch trigger.
 */
export const usePosts = () => {
  const { posts, loadingPosts, errorPosts, fetchPosts, searchQuery } = useStore();
  return { posts, loading: loadingPosts, error: errorPosts, fetchPosts, searchQuery };
};

/**
 * useTodos — exposes todos state + toggle + fetch trigger.
 */
export const useTodos = () => {
  const { todos, loadingDashboard, errorDashboard, fetchDashboardData, toggleTodo, searchQuery } = useStore();
  return { todos, loading: loadingDashboard, error: errorDashboard, fetchDashboardData, toggleTodo, searchQuery };
};

/**
 * useDashboard — exposes aggregated dashboard data.
 */
export const useDashboard = () => {
  const { todos, albums, users, posts, loadingDashboard, errorDashboard, fetchDashboardData } = useStore();
  return { todos, albums, users, posts, loading: loadingDashboard, error: errorDashboard, fetchDashboardData };
};
