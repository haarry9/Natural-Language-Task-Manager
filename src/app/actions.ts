
'use server';

import { extractTaskDetails, type ExtractTaskDetailsInput, type ExtractTaskDetailsOutput } from '@/ai/flows/extract-task-details';
import { extractTasksFromTranscript, type ExtractTasksFromTranscriptInput, type ExtractTasksFromTranscriptOutput } from '@/ai/flows/extract-tasks-from-transcript';
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

export interface ParseTranscriptResult {
  success: boolean;
  tasks?: ParsedTaskData[];
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
    console.error('Error parsing single task with AI:', e);
    return { success: false, error: e.message || 'Failed to parse task details using AI.' };
  }
}

export async function parseTranscriptAction(transcript: string): Promise<ParseTranscriptResult> {
  if (!transcript || transcript.trim() === '') {
    return { success: false, error: 'Meeting transcript cannot be empty.' };
  }

  const input: ExtractTasksFromTranscriptInput = {
    transcript,
  };

  try {
    const extractedTasksOutput: ExtractTasksFromTranscriptOutput = await extractTasksFromTranscript(input);
    
    const parsedTasks: ParsedTaskData[] = extractedTasksOutput.map(task => ({
      ...task,
      priority: ['P1', 'P2', 'P3', 'P4'].includes(task.priority) 
        ? task.priority as TaskPriority 
        : 'P3', // Ensure priority is valid, defaulting if AI misses it
    }));

    return { 
      success: true, 
      tasks: parsedTasks
    };
  } catch (e: any) {
    console.error('Error parsing transcript with AI:', e);
    // Check for specific Genkit error structure if available
    const errorMessage = e.details || e.message || 'Failed to extract tasks from transcript using AI.';
    return { success: false, error: errorMessage };
  }
}
