
import React from 'react';
import { Award } from 'lucide-react';
import { useTimer } from '@/contexts/TimerContext';

const StreakWidget: React.FC = () => {
  const { streak } = useTimer();

  return (
    <div className="dreamy-card p-6 flex flex-col items-center">
      <div className="flex items-center justify-center mb-4">
        <Award className="w-6 h-6 text-amber-500 mr-2" />
        <h3 className="text-xl font-medium">Current Streak</h3>
      </div>
      <div className="flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-dreamyYellow/30 to-babyPink/30 backdrop-blur-sm p-1 shadow-md mb-4">
        <div className="w-full h-full rounded-full bg-white/80 dark:bg-background/80 flex items-center justify-center">
          <p className="text-4xl font-bold">{streak}</p>
        </div>
      </div>
      <p className="text-sm text-muted-foreground">
        {streak === 0 ? "Start today!" : streak === 1 ? "First day!" : `${streak} days!`}
      </p>
    </div>
  );
};

export default StreakWidget;
