
import React from 'react';
import { Plus } from 'lucide-react';
import ProjectCard from '@/components/ProjectCard';
import { Button } from '@/components/ui/button';
import { useTimer } from '@/contexts/TimerContext';

const ProjectsList: React.FC = () => {
  const { 
    projects, 
    activeProjectId, 
    toggleProjectTimer,
    handleCompleteProject,
    handleDeleteProject,
    setIsDialogOpen
  } = useTimer();

  return (
    <section className="relative px-4 max-w-[1400px] mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold bg-gradient-to-r from-dreamyPurple to-primary bg-clip-text text-transparent">Your Projects</h2>
        <Button className="dreamy-button" onClick={() => setIsDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" /> Add Project
        </Button>
      </div>

      {projects.length === 0 ? (
        <div className="dreamy-card flex flex-col items-center justify-center py-12 relative overflow-hidden">
          <div className="text-6xl mb-4 animate-float">✨</div>
          <h3 className="text-xl font-medium mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">No projects yet</h3>
          <p className="text-muted-foreground mb-6">Create your first project to start tracking time</p>
          <Button 
            className="dreamy-button"
            onClick={() => setIsDialogOpen(true)}
          >
            <Plus className="w-4 h-4 mr-2" /> Add Your First Project
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {projects.map(project => (
            <ProjectCard 
              key={project.id} 
              project={project}
              isActive={activeProjectId === project.id}
              onToggle={() => toggleProjectTimer(project.id)}
              onComplete={() => handleCompleteProject(project.id)}
              onDelete={() => handleDeleteProject(project.id)}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default ProjectsList;
