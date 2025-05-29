
'use client';

import * as React from 'react';
import { TranscriptInputForm } from '@/components/meetings/transcript-input-form';
import { TaskList } from '@/components/tasks/task-list';
import { EditTaskDialog } from '@/components/tasks/edit-task-dialog';
import type { Task } from '@/lib/types';
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

const LOCAL_STORAGE_KEY = 'clarityFlowMeetingTasks';

export default function MeetingTranscriptTasksPage() {
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const [editingTask, setEditingTask] = React.useState<Task | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);
  const [deletingTaskId, setDeletingTaskId] = React.useState<string | null>(null);
  const { toast } = useToast();

  React.useEffect(() => {
    const storedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedTasks) {
      try {
        const parsedTasks = JSON.parse(storedTasks);
        if (Array.isArray(parsedTasks)) {
          setTasks(parsedTasks);
        } else {
          setTasks([]); 
        }
      } catch (error) {
        console.error("Failed to parse meeting tasks from localStorage", error);
        setTasks([]);
      }
    }
  }, []);

  React.useEffect(() => {
     if (tasks.length > 0 || localStorage.getItem(LOCAL_STORAGE_KEY) !== null) {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
     }
  }, [tasks]);

  const handleTasksExtracted = (newTasks: Task[]) => {
    setTasks((prevTasks) => [...newTasks, ...prevTasks]);
    // Toast is handled within TranscriptInputForm for batch addition
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsEditDialogOpen(true);
  };

  const handleSaveTask = (updatedTask: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    toast({ title: "Task Updated", description: `"${updatedTask.taskName}" has been updated.` });
    setEditingTask(null);
    setIsEditDialogOpen(false);
  };
  
  const handleDeleteConfirmation = (taskId: string) => {
    setDeletingTaskId(taskId);
  };

  const handleDeleteTask = () => {
    if (deletingTaskId) {
      const taskToDelete = tasks.find(task => task.id === deletingTaskId);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== deletingTaskId));
      toast({ title: "Task Deleted", description: `"${taskToDelete?.taskName}" has been deleted.` });
      setDeletingTaskId(null);
    }
  };

  return (
    <> 
      <section className="mb-12 p-6 md:p-8 bg-card text-card-foreground rounded-xl shadow-xl">
        <h2 className="text-2xl font-semibold mb-4 text-foreground">AI Meeting Minutes Parser</h2>
        <p className="text-muted-foreground mb-6">
          Paste your meeting transcript below. Our AI will extract actionable tasks, assignees, due dates, and priorities.
        </p>
        <TranscriptInputForm onTasksExtracted={handleTasksExtracted} />
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-6 text-foreground">Extracted Tasks</h2>
        <TaskList tasks={tasks} onEdit={handleEditTask} onDelete={handleDeleteConfirmation} />
      </section>

      {editingTask && (
        <EditTaskDialog
          task={editingTask}
          isOpen={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          onSave={handleSaveTask}
        />
      )}

      <AlertDialog open={!!deletingTaskId} onOpenChange={() => setDeletingTaskId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the task.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeletingTaskId(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteTask}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
