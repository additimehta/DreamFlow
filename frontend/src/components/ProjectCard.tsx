
import React from 'react';
import { Clock, Play, Pause, Settings, CheckCircle, Trash2 } from 'lucide-react';
import { Project } from '@/types';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

interface ProjectCardProps {
  project: Project;
  isActive: boolean;
  onToggle: () => void;
  onComplete?: () => void;
  onDelete?: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  project, 
  isActive, 
  onToggle,
  onComplete,
  onDelete
}) => {
  return (
    <div className="dreamy-card relative overflow-hidden group">
      {/* Color indicator */}
      <div 
        className="absolute top-0 left-0 w-2 h-full rounded-l-2xl" 
        style={{ backgroundColor: project.color }}
      />
      
      <div className="ml-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold text-lg">{project.name}</h3>
          <div className="flex items-center gap-2">
            <button 
              onClick={onToggle}
              className={`p-2 rounded-full transition-all duration-300 ${
                isActive 
                  ? 'bg-babyPink dark:bg-primary text-white' 
                  : 'bg-babyBlue/20 dark:bg-blue-900/20 hover:bg-babyBlue/40 dark:hover:bg-blue-900/40'
              }`}
            >
              {isActive ? <Pause size={18} /> : <Play size={18} />}
            </button>
            
            {(onComplete || onDelete) && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:bg-babyBlue/20 dark:hover:bg-blue-900/20 rounded-full h-9 w-9 p-0">
                    <Settings size={18} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="rounded-xl">
                  {onComplete && (
                    <DropdownMenuItem 
                      className="text-emerald-600 cursor-pointer"
                      onClick={onComplete}
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Mark as Completed
                    </DropdownMenuItem>
                  )}
                  {onDelete && (
                    <DropdownMenuItem 
                      className="text-destructive cursor-pointer"
                      onClick={onDelete}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Project
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
        
        <div className="flex items-center text-muted-foreground mb-2">
          <Clock size={16} className="mr-2" />
          <span>Today: {project.todayTime}</span>
        </div>
        
        <div className="text-sm text-muted-foreground/90">
          <p>Total: {project.totalTime}</p>
        </div>
        
        {isActive && (
          <div className="mt-4 pt-4 border-t border-babyBlue/20 dark:border-blue-900/20">
            <div className="flex justify-between items-center">
              <span className="text-sm text-babyPink dark:text-primary font-medium">Currently tracking</span>
              <span className="font-mono font-medium">{project.currentSession}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
