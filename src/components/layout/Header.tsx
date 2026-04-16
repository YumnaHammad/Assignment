import React from 'react';
import { Bell, Search, Menu, LogOut, User, Settings as SettingsIcon } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { Input } from '../ui/Input';
import { Dropdown, DropdownItem, DropdownSeparator } from '../ui/Dropdown';
import { useAuth } from '../../hooks/useAuth';
import { useStore } from '../../store';

interface HeaderProps {
  onMenuClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { currentUser, logout } = useAuth();
  const { searchQuery, setSearchQuery } = useStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border/50 bg-background/80 backdrop-blur-md px-6 shadow-sm transition-all duration-200">
      <div className="flex flex-1 items-center gap-4">
        <button 
          onClick={onMenuClick} 
          className="lg:hidden p-2 -ml-2 rounded-md hover:bg-accent hover:text-accent-foreground text-muted-foreground transition-colors"
        >
          <Menu className="h-5 w-5" />
        </button>
        
        <form className="hidden sm:flex max-w-sm w-full relative group lg:w-[400px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input 
            type="search" 
            placeholder="Search documentation, users, tasks..." 
            className="w-full pl-9 pr-4 bg-muted/50 border-border/50 focus-visible:bg-background transition-all shadow-none hover:bg-muted/80 rounded-full" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
      </div>

      <div className="flex items-center gap-3 md:ml-auto">
        <Dropdown 
          trigger={
            <button className="relative p-2 rounded-full hover:bg-accent hover:text-accent-foreground text-muted-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 flex h-2 w-2 rounded-full bg-primary ring-2 ring-background"></span>
            </button>
          }
        >
          <div className="px-4 py-3 border-b">
            <span className="font-semibold text-sm">Notifications</span>
          </div>
          <DropdownItem>New user registered</DropdownItem>
          <DropdownItem>System update available</DropdownItem>
          <DropdownSeparator />
          <DropdownItem className="text-primary font-medium">View all notifications</DropdownItem>
        </Dropdown>

        <div className="h-8 w-px bg-border mx-1 hidden sm:block"></div>

        <Dropdown
          trigger={
            <button className="h-9 w-9 overflow-hidden rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold shadow-sm transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              {currentUser?.name.charAt(0) || 'U'}
            </button>
          }
        >
          <div className="px-4 py-3 border-b flex flex-col">
            <span className="text-sm font-semibold">{currentUser?.name || "User"}</span>
            <span className="text-xs text-muted-foreground">{currentUser?.email || "user@email.com"}</span>
          </div>
          <Link to="/profile">
            <DropdownItem className="flex items-center gap-2 mt-1">
              <User className="h-4 w-4" /> Profile
            </DropdownItem>
          </Link>
          <Link to="/settings">
            <DropdownItem className="flex items-center gap-2">
              <SettingsIcon className="h-4 w-4" /> Settings
            </DropdownItem>
          </Link>
          <DropdownSeparator />
          <DropdownItem className="flex items-center gap-2 text-destructive font-medium" onClick={handleLogout}>
            <LogOut className="h-4 w-4" /> Log out
          </DropdownItem>
        </Dropdown>
      </div>
    </header>
  );
};
