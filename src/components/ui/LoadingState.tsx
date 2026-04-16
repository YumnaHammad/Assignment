import React from 'react';
import { Loader } from './Loader';

interface LoadingStateProps {
  message?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ message = 'Loading...' }) => (
  <div className="col-span-full flex flex-col items-center justify-center min-h-[400px]">
    <Loader size={48} />
    <p className="mt-4 text-muted-foreground animate-pulse">{message}</p>
  </div>
);
