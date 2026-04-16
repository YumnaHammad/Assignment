import React, { useEffect, useState } from 'react';
import { useStore } from '../../store';
import { cn } from '../../utils/cn';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const Toast: React.FC = () => {
  const { notification, clearNotification } = useStore();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (notification.message) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [notification.message]);

  if (!notification.message) return null;

  const icons = {
    success: <CheckCircle2 className="h-5 w-5 text-green-500" />,
    error: <AlertCircle className="h-5 w-5 text-destructive" />,
    info: <Info className="h-5 w-5 text-blue-500" />,
  };

  const colors = {
    success: 'border-green-500/50 bg-green-50/90 dark:bg-green-950/20',
    error: 'border-destructive/50 bg-destructive/50 bg-destructive/10',
    info: 'border-blue-500/50 bg-blue-50/90 dark:bg-blue-950/20',
  };

  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 z-[100] transition-all duration-300 transform",
        isVisible ? "translate-y-0 opacity-100 scale-100" : "translate-y-4 opacity-0 scale-95 pointer-events-none"
      )}
    >
      <div className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg backdrop-blur-md min-w-[300px]",
        colors[notification.type || 'info']
      )}>
        <div className="shrink-0">
          {icons[notification.type || 'info']}
        </div>
        <div className="flex-1 text-sm font-medium">
          {notification.message}
        </div>
        <button 
          onClick={clearNotification}
          className="shrink-0 p-1 rounded-full hover:bg-black/5 p-1 transition-colors"
        >
          <X className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>
    </div>
  );
};
