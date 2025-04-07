
import React, { useState, useEffect } from 'react';
import { BarChart, LineChart, PieChart, PlusCircle, Clock, Settings, CheckCircle, Trash2 } from 'lucide-react';
import { Project } from '@/types';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogDescription
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { 
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart as RechartsPieChart,
  Pie,
} from 'recharts';
import { toast } from 'sonner';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('projects');
    return saved ? JSON.parse(saved) : [];
  });
  const [completedProjects, setCompletedProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('completed-projects');
    return saved ? JSON.parse(saved) : [];
  });
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);

  // Save projects to localStorage
  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [projects]);

  // Save completed projects to localStorage
  useEffect(() => {
    localStorage.setItem('completed-projects', JSON.stringify(completedProjects));
  }, [completedProjects]);

  // Process data for charts
  const pieChartData = projects.map(project => ({
    name: project.name,
    value: timeToMinutes(project.totalTime),
    color: project.color
  }));

  const barChartData = projects.map(project => ({
    name: project.name,
    minutes: timeToMinutes(project.totalTime),
    color: project.color
  }));

  // Calculate top projects by time
  const sortedProjects = [...projects].sort((a, b) => 
    timeToMinutes(b.totalTime) - timeToMinutes(a.totalTime)
  );

  // Helper function to convert HH:MM:SS to minutes
  function timeToMinutes(timeString: string): number {
    const [hours, minutes, seconds] = timeString.split(':').map(Number);
    return hours * 60 + minutes + seconds / 60;
  }

  // Helper function to format minutes as HH:MM
  function formatMinutes(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = Math.floor(minutes % 60);
    return `${hours}h ${mins}m`;
  }

  // Total time across all projects
  const totalMinutes = projects.reduce((sum, project) => 
    sum + timeToMinutes(project.totalTime), 0
  );

  // Handle project completion
  const handleCompleteProject = (projectId: string) => {
    const projectToComplete = projects.find(p => p.id === projectId);
    if (projectToComplete) {
      // Remove from active projects
      setProjects(projects.filter(p => p.id !== projectId));
      // Add to completed projects
      setCompletedProjects([...completedProjects, projectToComplete]);
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
      <section>
        <h2 className="text-2xl font-semibold mb-6">Projects Overview</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Update cards to have rounded-2xl */}
          <Card className="dreamy-card rounded-2xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center">
                <Clock className="w-5 h-5 mr-2 text-babyPink" />
                Total Time
              </CardTitle>
              <CardDescription>Across all projects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {formatMinutes(totalMinutes)}
              </div>
            </CardContent>
          </Card>
          
          <Card className="dreamy-card rounded-2xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center">
                <BarChart className="w-5 h-5 mr-2 text-babyBlue" />
                Active Projects
              </CardTitle>
              <CardDescription>Total count</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {projects.length}
              </div>
            </CardContent>
          </Card>
          
          <Card className="dreamy-card rounded-2xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center">
                <LineChart className="w-5 h-5 mr-2 text-dreamyPurple" />
                Top Project
              </CardTitle>
              <CardDescription>Most time spent</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold truncate">
                {sortedProjects.length > 0 ? sortedProjects[0].name : 'No projects yet'}
              </div>
              <div className="text-sm text-muted-foreground">
                {sortedProjects.length > 0 ? formatMinutes(timeToMinutes(sortedProjects[0].totalTime)) : '0h 0m'}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-6">Time Distribution</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="dreamy-card rounded-2xl">
            <CardHeader>
              <CardTitle className="text-lg font-medium">Time Per Project</CardTitle>
              <CardDescription>Distribution of time across projects</CardDescription>
            </CardHeader>
            <CardContent>
              {projects.length > 0 ? (
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={pieChartData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {pieChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value: number) => [formatMinutes(value), 'Time Spent']}
                      />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                  No project data available
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card className="dreamy-card rounded-2xl">
            <CardHeader>
              <CardTitle className="text-lg font-medium">Project Comparison</CardTitle>
              <CardDescription>Time spent on each project</CardDescription>
            </CardHeader>
            <CardContent>
              {projects.length > 0 ? (
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart
                      data={barChartData}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <XAxis type="number" hide />
                      <YAxis 
                        type="category" 
                        dataKey="name" 
                        width={100}
                        tick={{ fontSize: 12 }}
                      />
                      <Tooltip 
                        formatter={(value: number) => [formatMinutes(value), 'Time Spent']}
                      />
                      <Bar dataKey="minutes" radius={[0, 4, 4, 0]}>
                        {barChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                  No project data available
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Active Projects</h2>
        </div>
        
        {projects.length === 0 ? (
          <Card className="dreamy-card flex flex-col items-center justify-center py-12 rounded-2xl">
            <div className="text-6xl mb-4">📊</div>
            <h3 className="text-xl font-medium mb-2">No projects yet</h3>
            <p className="text-muted-foreground mb-6">
              Add projects from the Timer page to see analytics
            </p>
            <Button className="dreamy-button rounded-full" onClick={() => window.location.href = '/'}>
              <PlusCircle className="w-4 h-4 mr-2" /> Go to Timer Page
            </Button>
          </Card>
        ) : (
          <div className="space-y-4">
            {sortedProjects.map(project => (
              <Card 
                key={project.id} 
                className="dreamy-card overflow-hidden rounded-2xl"
              >
                <div className="flex items-center p-4 md:p-6">
                  <div 
                    className="w-4 h-12 rounded-full mr-4" 
                    style={{ backgroundColor: project.color }}
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-lg">{project.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Today: {project.todayTime} · Total: {project.totalTime}
                    </p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="ml-2 text-muted-foreground hover:bg-babyBlue/20 rounded-full">
                        <Settings className="w-5 h-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="rounded-xl">
                      <DropdownMenuItem 
                        className="text-emerald-600 cursor-pointer"
                        onClick={() => handleCompleteProject(project.id)}
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Mark as Completed
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="text-destructive cursor-pointer"
                        onClick={() => handleDeleteProject(project.id)}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete Project
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div 
                  className="h-1 w-full bg-muted" 
                  style={{ 
                    background: `linear-gradient(to right, ${project.color} ${
                      (timeToMinutes(project.totalTime) / Math.max(...projects.map(p => timeToMinutes(p.totalTime)))) * 100
                    }%, transparent 0)` 
                  }}
                />
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Completed Projects Section - Show if there are any completed projects */}
      {completedProjects.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-4">Completed Projects</h2>
          <div className="space-y-3">
            {completedProjects.map(project => (
              <Card 
                key={project.id} 
                className="dreamy-card rounded-2xl bg-opacity-50"
              >
                <div className="flex items-center p-4">
                  <div 
                    className="w-3 h-10 rounded-full mr-4 opacity-60" 
                    style={{ backgroundColor: project.color }}
                  />
                  <div className="flex-1">
                    <div className="flex items-center">
                      <h3 className="font-medium">{project.name}</h3>
                      <span className="ml-2 text-xs px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full">
                        Completed
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Total Time: {project.totalTime}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:bg-destructive/10 rounded-full"
                    onClick={() => handleDeleteProject(project.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </section>
      )}

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

export default ProjectsPage;
