
import React from 'react';
import { Clock, BarChart3, CalendarClock } from 'lucide-react';
import StatsCard from '@/components/StatsCard';
import { useTimer } from '@/contexts/TimerContext';

const StatsSection: React.FC = () => {
  const { totalTimeToday, projects } = useTimer();

  return (
    <div className="grid grid-cols-3 gap-6">
      <StatsCard 
        title="Time Today" 
        value={totalTimeToday}
        icon={<Clock className="w-6 h-6 text-babyBlue" />}
      />
      <StatsCard 
        title="Projects" 
        value={projects.length.toString()}
        icon={<BarChart3 className="w-6 h-6 text-dreamyPurple" />}
      />
      <StatsCard 
        title="Date" 
        value={new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        icon={<CalendarClock className="w-6 h-6 text-babyPink" />}
      />
    </div>
  );
};

export default StatsSection;
