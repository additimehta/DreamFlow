import React, { useState, useEffect } from 'react';
import { Clock, CalendarClock, BarChart3, Plus, Star } from 'lucide-react';
import StatsCard from '@/components/StatsCard';
import ProjectCard from '@/components/ProjectCard';
import StreakDisplay from '@/components/StreakDisplay';
import { Project } from '@/types';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

// Encouraging phrases when a timer session ends
const ENCOURAGING_PHRASES = [
  "Dream complete! ✨",
  "You flowed like a dream! 🌈",
  "Another successful journey! 🚀",
  "Time well spent in dreamland! 💫",
  "Focus mode conquered! 🏆",
  "Productivity at its finest! 🌟",
  "You're on a roll today! 🔥",
  "Fantastic work session! 💯",
  "Dream big, achieve bigger! 🌌",
  "Flow state mastered! 🧠"
];

const COLORS = [
  "#FF6B6B", "#4ECDC4", "#FFD166", "#06D6A0", "#118AB2", 
  "#073B4C", "#8338EC", "#3A86FF", "#FB5607", "#FFBE0B"
];

const TimerPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('projects');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [completedProjects, setCompletedProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('completed-projects');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [activeProjectId, setActiveProjectId] = useState<string | null>(() => {
    const saved = localStorage.getItem('activeProjectId');
    return saved || null;
  });
  
  const [newProject, setNewProject] = useState({
    name: '',
    color: COLORS[0],
  });
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>('00:00:00');
  const [sessionStartTime, setSessionStartTime] = useState<number | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);
  const [streak, setStreak] = useState<number>(() => {
    const saved = localStorage.getItem('streak-count');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [lastActiveDay, setLastActiveDay] = useState<string>(() => {
    const saved = localStorage.getItem('last-active-day');
    return saved || '';
  });

  // Check and update streak on load
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    
    // If there's a last active day saved and it's not today
    if (lastActiveDay && lastActiveDay !== today) {
      const lastDate = new Date(lastActiveDay);
      const todayDate = new Date(today);
      
      // Calculate the difference in days
      const timeDiff = todayDate.getTime() - lastDate.getTime();
      const dayDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
      
      // If user was active yesterday, increment streak
      if (dayDiff === 1) {
        setStreak(prevStreak => prevStreak + 1);
      } 
      // If user missed more than one day, reset streak
      else if (dayDiff > 1) {
        setStreak(1); // Start a new streak
      }
    }
    
    // Update the last active day to today
    setLastActiveDay(today);
    localStorage.setItem('last-active-day', today);
  }, [lastActiveDay]);

  // Save streak count to localStorage
  useEffect(() => {
    localStorage.setItem('streak-count', streak.toString());
  }, [streak]);

  // Initialize the active project's session time
  useEffect(() => {
    if (activeProjectId) {
      const savedStartTime = localStorage.getItem(`sessionStart-${activeProjectId}`);
      if (savedStartTime) {
        setSessionStartTime(parseInt(savedStartTime, 10));
      } else {
        const now = Date.now();
        setSessionStartTime(now);
        localStorage.setItem(`sessionStart-${activeProjectId}`, now.toString());
      }
    }
  }, [activeProjectId]);

  // Save projects to localStorage
  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [projects]);

  // Save completed projects to localStorage
  useEffect(() => {
    localStorage.setItem('completed-projects', JSON.stringify(completedProjects));
  }, [completedProjects]);

  // Save active project ID to localStorage
  useEffect(() => {
    if (activeProjectId) {
      localStorage.setItem('activeProjectId', activeProjectId);
    } else {
      localStorage.removeItem('activeProjectId');
    }
  }, [activeProjectId]);

  // Update current session time
  useEffect(() => {
    if (activeProjectId && sessionStartTime) {
      const interval = setInterval(() => {
        const elapsed = Date.now() - sessionStartTime;
        const hours = Math.floor(elapsed / (1000 * 60 * 60)).toString().padStart(2, '0');
        const minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
        const seconds = Math.floor((elapsed % (1000 * 60)) / 1000).toString().padStart(2, '0');
        setCurrentTime(`${hours}:${minutes}:${seconds}`);
        
        // Update the active project's current session
        setProjects(prevProjects => prevProjects.map(project => 
          project.id === activeProjectId 
            ? { ...project, currentSession: `${hours}:${minutes}:${seconds}` }
            : project
        ));
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, [activeProjectId, sessionStartTime]);

  const toggleProjectTimer = (projectId: string) => {
    if (activeProjectId === projectId) {
      // Stop the timer
      setActiveProjectId(null);
      setSessionStartTime(null);
      localStorage.removeItem(`sessionStart-${projectId}`);
      
      // Get random encouraging phrase
      const phrase = ENCOURAGING_PHRASES[Math.floor(Math.random() * ENCOURAGING_PHRASES.length)];
      
      // Update project's time
      setProjects(projects.map(project => {
        if (project.id === projectId) {
          // Parse current times and add session time
          const todayParts = project.todayTime.split(':').map(Number);
          const sessionParts = project.currentSession.split(':').map(Number);
          
          let totalSeconds = 
            todayParts[0] * 3600 + todayParts[1] * 60 + todayParts[2] +
            sessionParts[0] * 3600 + sessionParts[1] * 60 + sessionParts[2];
          
          const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
          const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
          const seconds = Math.floor(totalSeconds % 60).toString().padStart(2, '0');
          
          // Also update total time
          const totalParts = project.totalTime.split(':').map(Number);
          let totalTotalSeconds = 
            totalParts[0] * 3600 + totalParts[1] * 60 + totalParts[2] +
            sessionParts[0] * 3600 + sessionParts[1] * 60 + sessionParts[2];
          
          const totalHours = Math.floor(totalTotalSeconds / 3600).toString().padStart(2, '0');
          const totalMinutes = Math.floor((totalTotalSeconds % 3600) / 60).toString().padStart(2, '0');
          const totalSeconds2 = Math.floor(totalTotalSeconds % 60).toString().padStart(2, '0');
          
          return {
            ...project,
            todayTime: `${hours}:${minutes}:${seconds}`,
            totalTime: `${totalHours}:${totalMinutes}:${totalSeconds2}`,
            currentSession: '00:00:00'
          };
        }
        return project;
      }));
      
      // Show encouraging toast message instead of generic one
      toast.success(phrase, {
        style: {
          background: "linear-gradient(to right, #FFDEE2, #D3E4FD)",
          color: "#333",
          border: "none"
        },
        duration: 4000
      });
    } else {
      // If another project is active, stop it first
      if (activeProjectId) {
        toggleProjectTimer(activeProjectId);
      }
      
      // Start the timer for the selected project
      setActiveProjectId(projectId);
      const now = Date.now();
      setSessionStartTime(now);
      localStorage.setItem(`sessionStart-${projectId}`, now.toString());
      
      // Custom toast for timer start
      toast.success("Flow started! Let the dreams begin ✨", {
        style: {
          background: "linear-gradient(to right, #D3E4FD, #E9D5FF)",
          color: "#333",
          border: "none"
        }
      });
    }
    
    // Update streak when a timer is started
    if (activeProjectId === null) {
      const today = new Date().toISOString().split('T')[0];
      
      // If this is the first timer started today and it's not already counted in the streak
      if (lastActiveDay !== today) {
        setLastActiveDay(today);
        localStorage.setItem('last-active-day', today);
        
        // Increment streak if this is a new day
        if (streak === 0) {
          setStreak(1);
        }
      }
    }
  };

  const handleCreateProject = () => {
    if (!newProject.name.trim()) {
      toast.error('Please enter a project name');
      return;
    }
    
    const newProjectObj: Project = {
      id: Date.now().toString(),
      name: newProject.name,
      color: newProject.color,
      todayTime: '00:00:00',
      totalTime: '00:00:00',
      currentSession: '00:00:00'
    };
    
    setProjects([...projects, newProjectObj]);
    setNewProject({ name: '', color: COLORS[0] });
    setIsDialogOpen(false);
    toast.success('Project created');
  };

  // Calculate total time tracked today
  const totalTimeToday = projects.reduce((total, project) => {
    const todayParts = project.todayTime.split(':').map(Number);
    const todaySeconds = todayParts[0] * 3600 + todayParts[1] * 60 + todayParts[2];
    
    // If the project is active, add the current session time
    if (activeProjectId === project.id) {
      const sessionParts = project.currentSession.split(':').map(Number);
      const sessionSeconds = sessionParts[0] * 3600 + sessionParts[1] * 60 + sessionParts[2];
      return total + todaySeconds + sessionSeconds;
    }
    
    return total + todaySeconds;
  }, 0);
  
  const hours = Math.floor(totalTimeToday / 3600).toString().padStart(2, '0');
  const minutes = Math.floor((totalTimeToday % 3600) / 60).toString().padStart(2, '0');
  const seconds = Math.floor(totalTimeToday % 60).toString().padStart(2, '0');
  const formattedTotalTime = `${hours}:${minutes}:${seconds}`;

  // Handle project completion
  const handleCompleteProject = (projectId: string) => {
    // Make sure the timer is stopped if it's the active project
    if (activeProjectId === projectId) {
      toggleProjectTimer(projectId);
    }
    
    const projectToComplete = projects.find(p => p.id === projectId);
    if (projectToComplete) {
      // Remove from active projects
      setProjects(projects.filter(p => p.id !== projectId));
      // Add to completed projects
      setCompletedProjects([...completedProjects, {...projectToComplete, completed: true}]);
      toast.success(`${projectToComplete.name} marked as completed`);
    }
  };

  // Handle project deletion
  const handleDeleteProject = (projectId: string) => {
    setProjectToDelete(projectId);
    setShowConfirmDialog(true);
  };

  // Confirm project deletion
  const confirmDeleteProject = () => {
    if (projectToDelete) {
      // If deleting the active project, stop the timer
      if (activeProjectId === projectToDelete) {
        setActiveProjectId(null);
        setSessionStartTime(null);
        localStorage.removeItem(`sessionStart-${projectToDelete}`);
      }
      
      const projectName = projects.find(p => p.id === projectToDelete)?.name;
      setProjects(projects.filter(p => p.id !== projectToDelete));
      // Also remove from completed projects if it exists there
      setCompletedProjects(completedProjects.filter(p => p.id !== projectToDelete));
      setShowConfirmDialog(false);
      setProjectToDelete(null);
      toast.success(`${projectName || 'Project'} deleted`);
    }
  };

  return (
    <div className="animate-fade-in space-y-8">
      <section className="relative">
        <div className="absolute -z-10 top-0 left-0 w-96 h-96 bg-gradient-to-br from-dreamyPurple/30 to-babyBlue/30 rounded-full blur-3xl opacity-60"></div>
        <h2 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Today's Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard 
            title="Time Tracked Today" 
            value={formattedTotalTime}
            icon={<Clock className="w-6 h-6 text-babyBlue" />}
          />
          <StatsCard 
            title="Active Projects" 
            value={projects.length.toString()}
            icon={<BarChart3 className="w-6 h-6 text-dreamyPurple" />}
          />
          <StatsCard 
            title="Current Date" 
            value={new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            icon={<CalendarClock className="w-6 h-6 text-babyPink" />}
          />
        </div>
      </section>

      {/* Streak Display Section */}
      <section>
        <StreakDisplay streak={streak} />
      </section>

      <section className="relative">
        <div className="absolute -z-10 bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-babyPink/30 to-dreamyYellow/30 rounded-full blur-3xl opacity-60"></div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold bg-gradient-to-r from-dreamyPurple to-primary bg-clip-text text-transparent">Your Projects</h2>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="dreamy-button">
                <Plus className="w-4 h-4 mr-2" /> Add Project
              </Button>
            </DialogTrigger>
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
                      {COLORS.map(color => (
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
          </Dialog>
        </div>

        {projects.length === 0 ? (
          <div className="dreamy-card flex flex-col items-center justify-center py-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-babyPink/20 to-babyBlue/20 dark:from-primary/10 dark:to-blue-700/10 z-0"></div>
            <div className="relative z-10 flex flex-col items-center">
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
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

      {/* Confirmation Dialog for Project Deletion */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="dreamy-card border-none rounded-2xl">
          <DialogHeader>
            <DialogTitle>Delete Project</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this project? This action cannot be undone and all tracking data will be lost.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <Button 
              variant="outline" 
              className="rounded-full" 
              onClick={() => setShowConfirmDialog(false)}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              className="rounded-full" 
              onClick={confirmDeleteProject}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TimerPage;
