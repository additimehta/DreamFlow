
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Cloud, Calendar, LineChart, Clock } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Header: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Timer', path: '/', icon: <Clock className="w-5 h-5 mr-2" /> },
    { name: 'Calendar', path: '/calendar', icon: <Calendar className="w-5 h-5 mr-2" /> },
    { name: 'Projects', path: '/projects', icon: <LineChart className="w-5 h-5 mr-2" /> }
  ];

  return (
    <header className="animate-fade-in py-4 z-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center">
            <div className="bg-dreamy-gradient dark:bg-gradient-to-r dark:from-primary dark:to-blue-700 w-10 h-10 rounded-xl flex items-center justify-center mr-3 shadow-dreamy animate-float border border-foreground/20 dark:border-transparent">
              <Cloud className="text-foreground dark:text-white w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold text-foreground dark:bg-gradient-to-r dark:from-primary dark:to-blue-700 dark:bg-clip-text dark:text-transparent font-inter">
              DreamFlow
            </h1>
          </div>
          
          <div className="flex items-center space-x-2">
            <nav className="flex space-x-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center px-4 py-2 rounded-full transition-all duration-300 font-inter",
                    location.pathname === item.path
                      ? "bg-white/30 dark:bg-white/10 backdrop-blur-sm text-foreground shadow-sm border border-white/20 dark:border-white/5"
                      : "text-foreground/80 hover:bg-white/20 dark:hover:bg-white/5 backdrop-blur-sm"
                  )}
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}
            </nav>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
