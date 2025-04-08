
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from 'react-router-dom';
import StatsCard from '@/components/StatsCard';
import WeatherWidget from '@/components/WeatherWidget';
import { Clock, Calendar, LineChart, ArrowRight, Sun, Moon } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const HomePage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [greeting, setGreeting] = useState('');
  const [timeEmoji, setTimeEmoji] = useState<React.ReactNode>(null);
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/timer');
    }
  }, [isAuthenticated, navigate]);

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
    <div className="min-h-[80vh] flex flex-col items-center justify-center space-y-8">
      <div className="text-center max-w-2xl">
        <div className="flex items-center justify-center gap-3 mb-2">
          <h2 className="text-2xl font-semibold">{greeting}!</h2>
          {timeEmoji}
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent dark:from-primary dark:to-blue-700">
          Welcome to DreamFlow
        </h1>
        <p className="text-xl text-foreground/80 mb-8">
          Manage your time, track your projects, and organize your schedule with our dreamy interface.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/login">
            <Button size="lg" className="dreamy-button">
              Get Started
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
          <Link to="/signup">
            <Button size="lg" variant="outline" className="border-2 border-primary/30">
              Create Account
            </Button>
          </Link>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 w-full max-w-4xl">
        <StatsCard 
          title="Track Focus Time" 
          value="Stay Productive" 
          icon={<Clock className="w-6 h-6 text-primary" />} 
        />
        <StatsCard 
          title="Manage Events" 
          value="Stay Organized" 
          icon={<Calendar className="w-6 h-6 text-primary" />} 
        />
        <StatsCard 
          title="Monitor Projects" 
          value="Stay On Track" 
          icon={<LineChart className="w-6 h-6 text-primary" />} 
        />
      </div>
      
      <div className="w-full max-w-4xl mt-4">
        <WeatherWidget />
      </div>
    </div>
  );
};

export default HomePage;
