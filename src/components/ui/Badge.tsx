import React from 'react';
import { cn } from '../../utils/cn';

type BadgeVariant = 'success' | 'warning' | 'default' | 'destructive';

const variantStyles: Record<BadgeVariant, string> = {
  success: 'bg-primary/10 text-primary',
  warning: 'bg-amber-500/10 text-amber-600',
  default: 'bg-muted text-muted-foreground',
  destructive: 'bg-destructive/10 text-destructive',
};

interface BadgeProps {
  variant?: BadgeVariant;
  className?: string;
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({ variant = 'default', className, children }) => (
  <span className={cn(
    'text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full',
    variantStyles[variant],
    className
  )}>
    {children}
  </span>
);
