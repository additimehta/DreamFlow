
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import StatsCard from '@/components/StatsCard';
import WeatherWidget from '@/components/WeatherWidget';
import { Clock, Calendar, LineChart, Sun, Moon, Smile } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const { currentUser } = useAuth();
  const [greeting, setGreeting] = useState('');
  const [timeEmoji, setTimeEmoji] = useState<React.ReactNode>(null);

  useEffect(() => {
    const getTimeBasedGreeting = () => {
      const hour = new Date().getHours();
      let greetingText = '';
      let icon = null;

      if (hour >= 5 && hour < 12) {
        greetingText = 'Good Morning';
        icon = <Sun className="w-7 h-7 text-amber-400 animate-pulse" />;
      } else if (hour >= 12 && hour < 18) {
        greetingText = 'Good Afternoon';
        icon = <Sun className="w-7 h-7 text-amber-500" />;
      } else if (hour >= 18 && hour < 22) {
        greetingText = 'Good Evening';
        icon = <Moon className="w-7 h-7 text-indigo-400" />;
      } else {
        greetingText = 'Good Night';
        icon = <Moon className="w-7 h-7 text-indigo-600" />;
      }

      setGreeting(greetingText);
      setTimeEmoji(icon);
    };

    getTimeBasedGreeting();
    // Update greeting every minute
    const intervalId = setInterval(getTimeBasedGreeting, 60000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center space-y-8 relative">
      {/* Decorative floating elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-babyPink/30 dark:bg-primary/20 rounded-full blur-3xl animate-float" style={{animationDelay: '0s'}}></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-babyBlue/30 dark:bg-secondary/20 rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}}></div>
      <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-dreamyPurple/30 dark:bg-accent/20 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
      
      <div className="text-center max-w-2xl relative z-10">
        <div className="flex items-center justify-center gap-3 mb-2">
          <h2 className="text-2xl font-semibold">
            {greeting}{currentUser ? `, ${currentUser.name}` : ''}!
          </h2>
          {timeEmoji}
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-babyPink to-babyBlue dark:from-primary dark:to-blue-700 bg-clip-text text-transparent animate-float" style={{animationDuration: '6s'}}>
          Welcome to DreamFlow
        </h1>
        <p className="text-xl text-foreground/80 mb-8">
          Manage your time, track your projects, and organize your schedule with our dreamy interface.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/timer">
            <Button size="lg" className="dreamy-button relative group overflow-hidden">
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-babyPink/40 to-babyBlue/40 group-hover:opacity-80 transition-opacity opacity-0"></span>
              <Clock className="w-5 h-5 mr-2 relative z-10" />
              <span className="relative z-10">Start Timer</span>
            </Button>
          </Link>
          <Link to="/projects">
            <Button size="lg" variant="outline" className="border-2 border-babyBlue/30 dark:border-primary/30 relative group overflow-hidden">
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-babyBlue/10 to-dreamyPurple/10 group-hover:opacity-80 transition-opacity opacity-0"></span>
              <LineChart className="w-5 h-5 mr-2 relative z-10" />
              <span className="relative z-10">View Projects</span>
            </Button>
          </Link>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 w-full max-w-4xl">
        <StatsCard 
          title="Focus Time" 
          value="12.5 hrs" 
          icon={<Clock className="w-6 h-6 text-primary" />} 
        />
        <StatsCard 
          title="Events" 
          value="8 upcoming" 
          icon={<Calendar className="w-6 h-6 text-primary" />} 
        />
        <StatsCard 
          title="Projects" 
          value="4 active" 
          icon={<LineChart className="w-6 h-6 text-primary" />} 
        />
      </div>
      
      <div className="w-full max-w-4xl mt-4">
        <WeatherWidget />
      </div>
    </div>
  );
};

export default Index;
