'use server';

import { extractTaskDetails, type ExtractTaskDetailsInput, type ExtractTaskDetailsOutput } from '@/ai/flows/extract-task-details';
import type { TaskPriority } from '@/lib/types';

export interface ParsedTaskData {
  taskName: string;
  assignee: string;
  dueDate: string;
  priority: TaskPriority;
}
export interface ParseTaskResult {
  success: boolean;
  task?: ParsedTaskData;
  error?: string;
}

export async function parseTaskAction(naturalLanguageTask: string): Promise<ParseTaskResult> {
  if (!naturalLanguageTask || naturalLanguageTask.trim() === '') {
    return { success: false, error: 'Task description cannot be empty.' };
  }

  const input: ExtractTaskDetailsInput = {
    naturalLanguageTask,
  };

  try {
    const parsedDetails: ExtractTaskDetailsOutput = await extractTaskDetails(input);
    // Ensure priority is one of the allowed values, default if necessary (though AI should handle this)
    const priority = ['P1', 'P2', 'P3', 'P4'].includes(parsedDetails.priority) 
      ? parsedDetails.priority as TaskPriority 
      : 'P3';

    return { 
      success: true, 
      task: {
        ...parsedDetails,
        priority,
      }
    };
  } catch (e: any) {
    console.error('Error parsing task with AI:', e);
    return { success: false, error: e.message || 'Failed to parse task details using AI. Please try a different phrasing or check the AI service.' };
  }
}
