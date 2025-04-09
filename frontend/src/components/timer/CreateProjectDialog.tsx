
import React from 'react';
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useTimer } from '@/contexts/TimerContext';

const CreateProjectDialog: React.FC = () => {
  const { 
    newProject, 
    setNewProject, 
    handleCreateProject,
    colors
  } = useTimer();

  return (
    <DialogContent className="dreamy-card border-none p-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-babyPink/20 to-babyBlue/20 dark:from-primary/10 dark:to-blue-700/10 z-0 rounded-xl"></div>
      <DialogHeader className="px-6 pt-6 relative z-10">
        <DialogTitle className="text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Create a New Project</DialogTitle>
      </DialogHeader>
      <div className="px-6 py-4 relative z-10">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Project Name</label>
            <Input 
              className="dreamy-input w-full" 
              value={newProject.name} 
              onChange={(e) => setNewProject({...newProject, name: e.target.value})}
              placeholder="Enter project name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Color</label>
            <div className="flex flex-wrap gap-2">
              {colors.map(color => (
                <button
                  key={color}
                  className={`w-8 h-8 rounded-full transition-all duration-200 ${
                    newProject.color === color ? 'ring-2 ring-offset-2 ring-babyPink' : ''
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setNewProject({...newProject, color})}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <DialogFooter className="px-6 pb-6 relative z-10">
        <Button 
          className="dreamy-button" 
          onClick={handleCreateProject}
        >
          Create Project
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default CreateProjectDialog;
