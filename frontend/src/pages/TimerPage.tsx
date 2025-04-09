
import React from 'react';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { TimerProvider } from '@/contexts/TimerContext';
import CircularTimer from '@/components/timer/CircularTimer';
import StatsSection from '@/components/timer/StatsSection';
import StreakWidget from '@/components/timer/StreakWidget';
import ProjectsList from '@/components/timer/ProjectsList';
import CreateProjectDialog from '@/components/timer/CreateProjectDialog';
import DeleteProjectDialog from '@/components/timer/DeleteProjectDialog';
import WeatherWidget from '@/components/WeatherWidget';
import { useTimer } from '@/contexts/TimerContext';

const TimerPageContent: React.FC = () => {
  const { isDialogOpen, showConfirmDialog } = useTimer();

  return (
    <div className="animate-fade-in space-y-6 max-w-full">
      {/* Hero Section with Circular Timer */}
      <section className="relative flex flex-col justify-center py-8 mb-10">
        <div className="absolute -z-10 inset-0 bg-gradient-to-br from-dreamyPurple/20 via-babyBlue/10 to-babyPink/20 rounded-3xl"></div>
        
        <div className="w-full max-w-[1400px] mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Main Timer & Stats */}
            <div className="md:col-span-2 flex flex-col space-y-8">
              {/* Active Project Display */}
              <CircularTimer />
              
              {/* Stats Cards in a row */}
              <StatsSection />
            </div>
            
            {/* Side Panel */}
            <div className="flex flex-col space-y-8">
              {/* Streak Display */}
              <StreakWidget />
              
              {/* Weather Widget */}
              <WeatherWidget />
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <Dialog open={isDialogOpen}>
        <DialogTrigger className="hidden">Open Dialog</DialogTrigger>
        <CreateProjectDialog />
      </Dialog>

      {/* Confirmation Dialog for Project Deletion */}
      <Dialog open={showConfirmDialog}>
        <DeleteProjectDialog />
      </Dialog>

      {/* Projects List */}
      <ProjectsList />
    </div>
  );
};

const TimerPage: React.FC = () => {
  return (
    <TimerProvider>
      <TimerPageContent />
    </TimerProvider>
  );
};

export default TimerPage;
