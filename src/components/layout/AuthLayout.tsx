import React from 'react';
import { LayoutDashboard } from 'lucide-react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      <div className="hidden lg:flex flex-col justify-center items-center bg-primary text-primary-foreground p-12">
        <LayoutDashboard className="h-24 w-24 mb-8" />
        <h1 className="text-4xl font-bold mb-4">Welcome to Nexus</h1>
        <p className="text-lg text-primary-foreground/80 text-center max-w-md">
          Your complete, scalable dashboard architecture. Manage users, track posts, and handle complex data with ease.
        </p>
      </div>
      <div className="flex items-center justify-center p-8 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {children}
        </div>
      </div>
    </div>
  );
};
