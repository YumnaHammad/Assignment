import React from 'react';
import { PackageOpen } from 'lucide-react';
import { cn } from '../../utils/cn';

interface EmptyStateProps {
  message?: string;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ message = 'No results found.', className }) => (
  <div className={cn('col-span-full py-16 text-center border rounded-xl bg-card/50 border-dashed', className)}>
    <PackageOpen className="mx-auto h-10 w-10 text-muted-foreground/40 mb-3" />
    <h3 className="text-base font-medium text-foreground mb-1">Nothing here</h3>
    <p className="text-sm text-muted-foreground">{message}</p>
  </div>
);
