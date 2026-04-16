// Correct import paths for auth pages inside pages/auth/
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { AuthLayout } from '../../components/layout/AuthLayout';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card, CardContent } from '../../components/ui/Card';

export const Login: React.FC = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      await login(email, password);
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <Card className="border-border/50 shadow-lg">
        <CardContent className="pt-6">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
            <p className="text-sm text-muted-foreground mt-1">Enter your credentials to access your account</p>
          </div>
          <div className="bg-primary/10 border border-primary/20 rounded-md p-3 mb-6 text-sm text-primary select-text cursor-text">
            <strong>Demo Credentials:</strong><br />
            Email: <code>admin@nexus.com</code><br />
            Password: <code>password</code>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="email">Email</label>
              <Input id="email" type="email" placeholder="admin@nexus.com" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium" htmlFor="password">Password</label>
                <Link to="#" className="text-sm font-medium text-primary hover:underline">Forgot password?</Link>
              </div>
              <Input id="password" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>
        </CardContent>
      </Card>
      <div className="text-center text-sm mt-8">
        Don't have an account?{' '}
        <Link to="/register" className="font-medium text-primary hover:underline">Sign up</Link>
      </div>
    </AuthLayout>
  );
};
