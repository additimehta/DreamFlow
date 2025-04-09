
import React from 'react';
import { 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useTimer } from '@/contexts/TimerContext';

const DeleteProjectDialog: React.FC = () => {
  const { 
    setShowConfirmDialog, 
    confirmDeleteProject 
  } = useTimer();

  return (
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
  );
};

export default DeleteProjectDialog;
