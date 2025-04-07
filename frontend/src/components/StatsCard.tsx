
import React from 'react';

interface StatsCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon }) => {
  return (
    <div className="dreamy-card flex items-center space-x-4 p-4">
      <div className="w-12 h-12 rounded-full flex items-center justify-center border border-foreground/20 dark:border-transparent bg-white/30 dark:bg-white/10">
        {React.cloneElement(icon as React.ReactElement, {
          className: 'w-6 h-6 text-foreground'
        })}
      </div>
      <div>
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-xl font-semibold text-foreground">{value}</p>
      </div>
    </div>
  );
};

export default StatsCard;
