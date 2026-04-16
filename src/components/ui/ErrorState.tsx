import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from './Button';

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ message, onRetry }) => (
  <div className="col-span-full rounded-xl border border-destructive/30 bg-destructive/5 p-10 text-center">
    <AlertTriangle className="mx-auto h-10 w-10 text-destructive/60 mb-3" />
    <h3 className="text-lg font-semibold text-destructive mb-1">Something went wrong</h3>
    <p className="text-sm text-muted-foreground mb-4">{message}</p>
    {onRetry && (
      <Button variant="outline" onClick={onRetry}>
        Try Again
      </Button>
    )}
  </div>
);
