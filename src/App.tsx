import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { DashboardLayout } from './components/layout/DashboardLayout';

// Pages
import { Dashboard } from './pages/Dashboard';
import { Profile } from './pages/Profile';
import { Settings } from './pages/Settings';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';

// UI
import { Toast } from './components/ui/Toast';

// Features
import { UsersList } from './components/features/users/UsersList';
import { PostsList } from './components/features/posts/PostsList';
import { TodosList } from './components/features/todos/TodosList';

// ─── Route Guard ────────────────────────────────────────────────────────────
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

// ─── Page Shell — adds a page heading above any feature component ───────────
const PageShell = ({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) => (
  <>
    <div className="mb-8">
      <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
      <p className="text-muted-foreground mt-2">{subtitle}</p>
    </div>
    {children}
  </>
);

// ─── App ────────────────────────────────────────────────────────────────────
function App() {
  return (
    <Router>
      <Routes>
        {/* Auth routes — public */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected dashboard shell */}
        <Route path="/*" element={
          <ProtectedRoute>
            <DashboardLayout>
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={
                  <PageShell title="System Analytics" subtitle="Welcome back! Here's a quick overview.">
                    <Dashboard />
                  </PageShell>
                } />
                <Route path="/users" element={
                  <PageShell title="Users Overview" subtitle="Manage and view your system users.">
                    <UsersList />
                  </PageShell>
                } />
                <Route path="/posts" element={
                  <PageShell title="Posts Analytics" subtitle="Review network publications and articles.">
                    <PostsList />
                  </PageShell>
                } />
                <Route path="/todos" element={
                  <PageShell title="Task Manager" subtitle="Manage your current tasks and assignments.">
                    <TodosList />
                  </PageShell>
                } />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="*" element={
                  <div className="text-center py-20 text-muted-foreground">
                    <h2 className="text-2xl font-semibold mb-2">404 — Not Found</h2>
                    <p>This page doesn't exist.</p>
                  </div>
                } />
              </Routes>
            </DashboardLayout>
          </ProtectedRoute>
        } />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toast />
    </Router>
  );
}

export default App;
