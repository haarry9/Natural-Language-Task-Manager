export type TaskPriority = 'P1' | 'P2' | 'P3' | 'P4';

export interface Task {
  id: string;
  taskName: string;
  assignee: string;
  dueDate: string; // Store as string, as AI output can be varied. Format for display.
  priority: TaskPriority;
  originalInput?: string; 
}
