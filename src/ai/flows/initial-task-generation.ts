// 'use server';
/**
 * @fileOverview A flow to generate initial tasks from a prompt or general description.
 *
 * - generateInitialTasks - A function that handles the generation of initial tasks.
 * - GenerateInitialTasksInput - The input type for the generateInitialTasks function.
 * - GenerateInitialTasksOutput - The return type for the generateInitialTasks function.
 */

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateInitialTasksInputSchema = z.object({
  prompt: z.string().describe('A prompt or general description of tasks to generate.'),
});
export type GenerateInitialTasksInput = z.infer<typeof GenerateInitialTasksInputSchema>;

const GenerateInitialTasksOutputSchema = z.array(
  z.object({
    taskName: z.string().describe('The name of the task.'),
    assignee: z.string().describe('The person assigned to the task.'),
    dueDate: z.string().describe('The due date and time for the task.'),
    priority: z.string().describe('The priority of the task (P1, P2, P3, or P4).'),
  })
);
export type GenerateInitialTasksOutput = z.infer<typeof GenerateInitialTasksOutputSchema>;

export async function generateInitialTasks(input: GenerateInitialTasksInput): Promise<GenerateInitialTasksOutput> {
  return generateInitialTasksFlow(input);
}

const generateInitialTasksPrompt = ai.definePrompt({
  name: 'generateInitialTasksPrompt',
  input: {schema: GenerateInitialTasksInputSchema},
  output: {schema: GenerateInitialTasksOutputSchema},
  prompt: `You are a task management assistant. Generate a list of tasks based on the following prompt. Extracted information should be complete and accurate.

  The current date is {{now}}.

  The output should be a JSON array of tasks with the following fields:
  - taskName: The name of the task.
  - assignee: The person assigned to the task.
  - dueDate: The due date and time for the task. Use ISO format.
  - priority: The priority of the task (P1, P2, P3, or P4).  Default to P3 unless specified as P1, P2, or P4.

  Here is the prompt: {{{prompt}}}`,
});

const generateInitialTasksFlow = ai.defineFlow(
  {
    name: 'generateInitialTasksFlow',
    inputSchema: GenerateInitialTasksInputSchema,
    outputSchema: GenerateInitialTasksOutputSchema,
  },
  async input => {
    const now = new Date().toISOString();
    const {output} = await generateInitialTasksPrompt({...input, now});
    return output!;
  }
);
