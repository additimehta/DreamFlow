
import React from 'react';
import { Button } from '@/components/ui/button';
import { useTimer } from '@/contexts/TimerContext';

const CircularTimer: React.FC = () => {
  const { 
    activeProjectId, 
    currentTime, 
    projects, 
    toggleProjectTimer 
  } = useTimer();

  if (!activeProjectId) {
    return (
      <div className="dreamy-card flex flex-col items-center p-10">
        <div className="text-8xl mb-6 animate-pulse">⏱️</div>
        <h3 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          No active timer
        </h3>
        <p className="text-muted-foreground text-center mb-6 text-lg">
          Select a project below to start tracking time
        </p>
      </div>
    );
  }

  const activeProject = projects.find(p => p.id === activeProjectId);

  return (
    <div className="dreamy-card flex flex-col items-center p-10 transition-all duration-300 hover:scale-[1.02]">
      <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        {activeProject?.name || 'Current Project'}
      </h3>
      <div className="flex items-center justify-center w-64 h-64 rounded-full bg-gradient-to-br from-babyPink/40 to-babyBlue/40 backdrop-blur-sm p-1 shadow-xl mb-6">
        <div className="w-full h-full rounded-full bg-white/80 dark:bg-background/80 flex items-center justify-center">
          <p className="text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {currentTime}
          </p>
        </div>
      </div>
      <Button
        onClick={() => toggleProjectTimer(activeProjectId)}
        className="dreamy-button mt-4 px-10 py-4 text-xl"
      >
        Stop Timer
      </Button>
    </div>
  );
};

export default CircularTimer;
