import React from 'react';
import { LayoutDashboard, Users, Settings, FileText, CheckSquare, BarChart } from 'lucide-react';
import { NavLink, Link } from 'react-router-dom';
import { cn } from '../../utils/cn';

interface SidebarProps {
  className?: string;
  onNavClick?: () => void;
}

const navItems = [
  { group: 'OVERVIEW', links: [
    { to: '/dashboard', icon: BarChart, label: 'Analytics' },
    { to: '/users', icon: Users, label: 'Users' },
    { to: '/posts', icon: FileText, label: 'Posts' },
    { to: '/todos', icon: CheckSquare, label: 'Todos' },
  ]},
  { group: 'SYSTEM', links: [
    { to: '/settings', icon: Settings, label: 'Settings' },
  ]},
];

export const Sidebar: React.FC<SidebarProps> = ({ className, onNavClick }) => {
  return (
    <aside className={cn("flex flex-col w-64 border-r bg-card min-h-screen", className)}>
      <div className="flex h-16 items-center gap-2 border-b border-border/50 px-6 shrink-0">
        <Link to="/" className="flex items-center gap-2 group">
          <LayoutDashboard className="h-6 w-6 text-primary transition-transform group-hover:scale-110" />
          <span className="font-bold text-xl text-primary">Nexus</span>
        </Link>
      </div>
      <div className="flex-1 px-4 py-4 overflow-y-auto">
        <div className="space-y-6">
          {navItems.map(({ group, links }) => (
            <div key={group}>
              <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">
                {group}
              </p>
              <nav className="space-y-1">
                {links.map(({ to, icon: Icon, label }) => (
                  <NavLink
                    key={to}
                    to={to}
                    onClick={onNavClick}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                        isActive
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      )
                    }
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    {label}
                  </NavLink>
                ))}
              </nav>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};
