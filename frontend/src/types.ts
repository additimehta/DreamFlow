
export interface Project {
  id: string;
  name: string;
  color: string;
  todayTime: string; // Format: HH:MM:SS
  totalTime: string; // Format: HH:MM:SS
  currentSession: string; // Format: HH:MM:SS
  completed?: boolean; // Optional completed status
}
