import React, { useState, useRef, useEffect } from "react";
import { cn } from "../../utils/cn";

interface DropdownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({ trigger, children, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={cn("relative inline-block text-left", className)} ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {trigger}
      </div>

      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-md bg-popover text-popover-foreground shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none animate-in fade-in zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=closed]:zoom-out-95">
          <div className="py-1" role="menu" aria-orientation="vertical">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export const DropdownItem: React.FC<React.HTMLAttributes<HTMLDivElement> & { disabled?: boolean }> = ({ 
  children, 
  className, 
  disabled,
  ...props 
}) => {
  return (
    <div
      className={cn(
        "cursor-pointer px-4 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      role="menuitem"
      {...props}
    >
      {children}
    </div>
  );
};

export const DropdownSeparator: React.FC = () => {
  return <div className="my-1 h-px bg-muted" />;
};
