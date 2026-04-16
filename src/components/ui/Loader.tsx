import React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "../../utils/cn";

interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: number;
}

export const Loader: React.FC<LoaderProps> = ({ className, size = 24, ...props }) => (
  <div className={cn("flex items-center justify-center p-4", className)} {...props}>
    <Loader2 size={size} className="animate-spin text-primary" />
  </div>
);
