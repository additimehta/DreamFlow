
import React from 'react';
import { Star } from 'lucide-react';
import { cn } from "@/lib/utils";

interface StreakDisplayProps {
  streak: number;
  className?: string;
}

const StreakDisplay: React.FC<StreakDisplayProps> = ({ streak, className }) => {
  // Calculate the stars to display (max 7 shown, representing a week)
  const maxVisibleStars = 7;
  const starsToShow = Math.min(streak, maxVisibleStars);
  
  return (
    <div className={cn("dreamy-card p-4", className)}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold">Your Current Streak</h3>
        <div className="bg-babyPink/20 text-babyPink px-2 py-1 rounded-full text-sm font-medium">
          {streak} {streak === 1 ? 'day' : 'days'}
        </div>
      </div>
      
      <div className="flex space-x-1 mt-2">
        {Array.from({ length: starsToShow }).map((_, i) => (
          <div key={i} className="relative group">
            <Star 
              className="w-8 h-8 text-amber-400 fill-amber-400 filter drop-shadow-md animate-pulse" 
              style={{ 
                animationDuration: `${3 + i * 0.5}s`,
                animationDelay: `${i * 0.1}s`
              }} 
            />
            <div className="absolute inset-0 bg-amber-300 rounded-full blur-sm opacity-30 animate-pulse" 
              style={{ 
                animationDuration: `${2 + i * 0.3}s`,
                animationDelay: `${i * 0.2}s`
              }}
            />
          </div>
        ))}
        
        {streak > maxVisibleStars && (
          <div className="flex items-center justify-center ml-1">
            <span className="text-sm text-muted-foreground">+{streak - maxVisibleStars} more</span>
          </div>
        )}
      </div>
      
      <p className="text-sm text-muted-foreground mt-3">
        Keep up the great work! Complete tasks daily to build your streak.
      </p>
    </div>
  );
};

export default StreakDisplay;
