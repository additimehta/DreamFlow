import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import StatsCard from '@/components/StatsCard';
import { Clock, Calendar, LineChart } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center space-y-8">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-babyPink to-babyBlue dark:from-primary dark:to-blue-700 bg-clip-text text-transparent">
          Welcome to DreamFlow
        </h1>
        <p className="text-xl text-foreground/80 mb-8">
          Manage your time, track your projects, and organize your schedule with our dreamy interface.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/timer">
            <Button size="lg" className="dreamy-button">
              <Clock className="w-5 h-5 mr-2" />
              Start Timer
            </Button>
          </Link>
          <Link to="/projects">
            <Button size="lg" variant="outline" className="border-2 border-babyBlue/30 dark:border-primary/30">
              <LineChart className="w-5 h-5 mr-2" />
              View Projects
            </Button>
          </Link>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 w-full max-w-4xl">
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
    </div>
  );
};

export default Index;
