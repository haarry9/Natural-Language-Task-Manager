'use client';

import * as React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Task, TaskPriority } from '@/lib/types';
import { Pencil, Trash2, Info } from 'lucide-react';
import { format, parseISO } from 'date-fns';

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

const PriorityBadge: React.FC<{ priority: TaskPriority }> = ({ priority }) => {
  switch (priority) {
    case 'P1':
      return <Badge variant="destructive">P1 - Critical</Badge>;
    case 'P2':
      return <Badge variant="default">P2 - High</Badge>; // Uses primary color
    case 'P3':
      return <Badge variant="secondary">P3 - Medium</Badge>; // Uses secondary color
    case 'P4':
      return <Badge variant="outline">P4 - Low</Badge>;
    default:
      return <Badge variant="secondary">{priority}</Badge>;
  }
};

const formatDateString = (dateStr: string): string => {
  try {
    // Attempt to parse as ISO date first (likely from editing)
    const parsedDate = parseISO(dateStr);
    if (!isNaN(parsedDate.getTime())) {
      return format(parsedDate, "PPpp"); // e.g., Jun 20, 2023, 11:00:00 PM
    }
  } catch (e) {
    // Ignore if not ISO
  }
  // If not ISO or parse failed, return original string (from AI parsing)
  // This is a placeholder; more robust parsing for varied AI date strings might be needed.
  // For now, we rely on AI providing a human-readable string or user editing to ISO.
  return dateStr;
};


export function TaskList({ tasks, onEdit, onDelete }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="mt-8 text-center text-muted-foreground flex flex-col items-center gap-2">
        <Info className="w-10 h-10" />
        <p className="text-lg">No tasks yet.</p>
        <p>Try adding a new task using the form above!</p>
      </div>
    );
  }

  return (
    <div className="mt-8 overflow-x-auto rounded-lg border shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[30%] min-w-[200px]">Task Name</TableHead>
            <TableHead className="min-w-[150px]">Assigned To</TableHead>
            <TableHead className="min-w-[200px]">Due Date/Time</TableHead>
            <TableHead className="min-w-[120px]">Priority</TableHead>
            <TableHead className="text-right min-w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell className="font-medium">{task.taskName}</TableCell>
              <TableCell>{task.assignee}</TableCell>
              <TableCell>{formatDateString(task.dueDate)}</TableCell>
              <TableCell>
                <PriorityBadge priority={task.priority} />
              </TableCell>
              <TableCell className="text-right space-x-2">
                <Button variant="outline" size="icon" onClick={() => onEdit(task)} aria-label={`Edit task ${task.taskName}`}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="destructive" size="icon" onClick={() => onDelete(task.id)} aria-label={`Delete task ${task.taskName}`}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
