
import React, { useState, useEffect } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Plus, Trash2 } from 'lucide-react';
import { addDays, format, startOfWeek, endOfWeek, addWeeks, subWeeks, isSameDay, startOfDay } from 'date-fns';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface Event {
  id: string;
  title: string;
  date: Date;
  project: string;
  time: string;
}

const CalendarPage: React.FC = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [events, setEvents] = useState<Event[]>(() => {
    const savedEvents = localStorage.getItem('calendar-events');
    if (savedEvents) {
      const parsedEvents = JSON.parse(savedEvents);
      return parsedEvents.map((event: any) => ({
        ...event,
        date: new Date(event.date)
      }));
    }
    
    // Generate mock events if no saved events
    return [
      { 
        id: '1',
        title: 'Website Design', 
        date: addDays(new Date(), 1), 
        project: 'Client Project',
        time: '2h 30m'
      },
      { 
        id: '2',
        title: 'API Integration', 
        date: addDays(new Date(), 3), 
        project: 'Personal Project',
        time: '1h 45m'
      },
      { 
        id: '3',
        title: 'Team Meeting', 
        date: new Date(), 
        project: 'Internal',
        time: '1h'
      },
      { 
        id: '4',
        title: 'Code Review', 
        date: addDays(new Date(), -1), 
        project: 'Client Project',
        time: '45m'
      },
      { 
        id: '5',
        title: 'Feature Planning', 
        date: addDays(new Date(), 5), 
        project: 'Client Project',
        time: '2h'
      },
    ];
  });
  
  const [currentWeekDays, setCurrentWeekDays] = useState<Date[]>([]);
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    project: '',
    time: ''
  });

  // Save events to localStorage
  useEffect(() => {
    localStorage.setItem('calendar-events', JSON.stringify(events));
  }, [events]);

  // Update week days when date changes
  useEffect(() => {
    updateWeekDays();
  }, [date]);
  
  // Check if a day has events
  const hasEvents = (day: Date) => {
    return events.some(event => 
      isSameDay(startOfDay(event.date), startOfDay(day))
    );
  };
  
  // Get events for a specific day
  const getEventsForDay = (day: Date) => {
    return events.filter(event => 
      isSameDay(startOfDay(event.date), startOfDay(day))
    );
  };
  
  // Calculate the week days
  const updateWeekDays = () => {
    const startDate = startOfWeek(date, { weekStartsOn: 1 }); // Week starts on Monday
    const endDate = endOfWeek(date, { weekStartsOn: 1 }); // Week ends on Sunday
    
    const days = [];
    let currentDay = startDate;
    
    while (currentDay <= endDate) {
      days.push(new Date(currentDay));
      currentDay = addDays(currentDay, 1);
    }
    
    setCurrentWeekDays(days);
  };
  
  // Navigate to previous week
  const previousWeek = () => {
    setDate(subWeeks(date, 1));
  };
  
  // Navigate to next week
  const nextWeek = () => {
    setDate(addWeeks(date, 1));
  };
  
  // Navigate to today
  const goToToday = () => {
    setDate(new Date());
  };

  // Add new event
  const handleAddEvent = () => {
    if (!newEvent.title.trim()) {
      toast.error('Please enter an event title');
      return;
    }

    const event: Event = {
      id: Date.now().toString(),
      title: newEvent.title,
      project: newEvent.project || 'Unassigned',
      time: newEvent.time || '1h',
      date: new Date(date)
    };

    setEvents([...events, event]);
    setNewEvent({ title: '', project: '', time: '' });
    setIsAddEventOpen(false);
    toast.success('Event added successfully');
  };

  // Remove event
  const handleRemoveEvent = (id: string) => {
    setEvents(events.filter(event => event.id !== id));
    toast.success('Event removed');
  };

  return (
    <div className="font-inter">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Your Calendar</h1>
        <p className="text-muted-foreground">Track your productivity and scheduled tasks</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card className="dreamy-card rounded-2xl">
            <CardContent className="p-0 rounded-2xl overflow-hidden">
              {/* Week Navigation */}
              <div className="flex items-center justify-between p-4 border-b border-babyBlue/20">
                <h2 className="text-xl font-semibold text-foreground">
                  {format(date, 'MMMM yyyy')}
                </h2>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={goToToday}
                    className="rounded-full text-sm border-babyBlue/30 hover:bg-babyBlue/20"
                  >
                    Today
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={previousWeek}
                    className="rounded-full border-babyBlue/30 hover:bg-babyBlue/20"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={nextWeek}
                    className="rounded-full border-babyBlue/30 hover:bg-babyBlue/20"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {/* Week View */}
              <div className="p-4">
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                    <div key={i} className="text-center text-sm text-muted-foreground font-medium">
                      {day}
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-7 gap-1">
                  {currentWeekDays.map((day, i) => (
                    <div 
                      key={i} 
                      className={cn(
                        "aspect-square relative p-1 rounded-lg transition-all duration-200",
                        isSameDay(day, new Date()) ? "bg-babyBlue/30" : "hover:bg-babyBlue/10"
                      )}
                      onClick={() => setDate(day)}
                    >
                      <div className="flex flex-col items-center justify-center h-full">
                        <span className={cn(
                          "text-sm font-medium",
                          isSameDay(day, new Date()) ? "text-foreground" : "text-foreground/70"
                        )}>
                          {format(day, 'd')}
                        </span>
                        {hasEvents(day) && (
                          <div className="w-1.5 h-1.5 bg-babyPink rounded-full mt-1" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Monthly Calendar */}
              <div className="p-4 border-t border-babyBlue/20">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(newDate) => newDate && setDate(newDate)}
                  className="rounded-2xl"
                  classNames={{
                    day_selected: cn(
                      "bg-babyBlue text-primary-foreground hover:bg-babyBlue hover:text-primary-foreground focus:bg-babyBlue focus:text-primary-foreground rounded-full"
                    ),
                    day_today: cn(
                      "bg-babyPink/20 text-foreground rounded-full"
                    ),
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="dreamy-card h-full rounded-2xl">
            <CardContent className="p-4 relative">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">
                  {format(date, 'MMMM d, yyyy')}
                </h2>
                <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm" className="dreamy-button rounded-full">
                      <Plus className="w-4 h-4 mr-1" /> Add Event
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="dreamy-card border-none p-0 overflow-hidden">
                    <DialogHeader className="px-6 pt-6">
                      <DialogTitle className="text-xl">Add New Event</DialogTitle>
                    </DialogHeader>
                    <div className="p-6 space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Event Title</Label>
                        <Input 
                          id="title"
                          className="dreamy-input w-full" 
                          value={newEvent.title}
                          onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                          placeholder="Enter event title"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="project">Project</Label>
                        <Input 
                          id="project"
                          className="dreamy-input w-full" 
                          value={newEvent.project}
                          onChange={(e) => setNewEvent({...newEvent, project: e.target.value})}
                          placeholder="Enter project name (optional)"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="time">Time</Label>
                        <Input 
                          id="time"
                          className="dreamy-input w-full" 
                          value={newEvent.time}
                          onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                          placeholder="e.g. 1h 30m (optional)"
                        />
                      </div>
                    </div>
                    <DialogFooter className="px-6 pb-6">
                      <Button onClick={handleAddEvent} className="dreamy-button rounded-full">
                        Add Event
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              
              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
                {getEventsForDay(date).length > 0 ? (
                  getEventsForDay(date).map((event, i) => (
                    <div 
                      key={i} 
                      className="p-3 rounded-2xl bg-white/70 border border-babyBlue/30 shadow-sm transition-all duration-200 hover:shadow-md relative group"
                    >
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-medium text-foreground pr-6">{event.title}</h3>
                        <span className="text-sm bg-babyPink/20 text-foreground px-2 py-0.5 rounded-full">
                          {event.time}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{event.project}</p>
                      <button 
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-destructive hover:text-destructive/80"
                        onClick={() => handleRemoveEvent(event.id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10 text-muted-foreground rounded-2xl">
                    <p>No tracked time for this day</p>
                    <p className="text-sm mt-1">Add an event for this day</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
