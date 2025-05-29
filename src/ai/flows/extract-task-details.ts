// 'use server';

/**
 * @fileOverview AI flow for extracting task details from natural language input.
 *
 * - extractTaskDetails - A function that extracts task details from natural language input.
 * - ExtractTaskDetailsInput - The input type for the extractTaskDetails function.
 * - ExtractTaskDetailsOutput - The return type for the extractTaskDetails function.
 */

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExtractTaskDetailsInputSchema = z.object({
  naturalLanguageTask: z
    .string()
    .describe('The natural language task input from the user.'),
});
export type ExtractTaskDetailsInput = z.infer<typeof ExtractTaskDetailsInputSchema>;

const ExtractTaskDetailsOutputSchema = z.object({
  taskName: z.string().describe('The name of the task.'),
  assignee: z.string().describe('The person assigned to the task.'),
  dueDate: z.string().describe('The due date and time of the task.'),
  priority: z
    .enum(['P1', 'P2', 'P3', 'P4'])
    .describe('The priority of the task. Defaults to P3 if not specified.'),
});
export type ExtractTaskDetailsOutput = z.infer<typeof ExtractTaskDetailsOutputSchema>;

export async function extractTaskDetails(input: ExtractTaskDetailsInput): Promise<ExtractTaskDetailsOutput> {
  return extractTaskDetailsFlow(input);
}

const extractTaskDetailsPrompt = ai.definePrompt({
  name: 'extractTaskDetailsPrompt',
  input: {schema: ExtractTaskDetailsInputSchema},
  output: {schema: ExtractTaskDetailsOutputSchema},
  prompt: `Extract the task name, assignee, due date/time, and priority from the following natural language task. The priority defaults to P3 if not specified.

Natural Language Task: {{{naturalLanguageTask}}}

Task Name:
Assignee:
Due Date/Time:
Priority:`, // Ensure the prompt produces each of the requested fields
});

const extractTaskDetailsFlow = ai.defineFlow(
  {
    name: 'extractTaskDetailsFlow',
    inputSchema: ExtractTaskDetailsInputSchema,
    outputSchema: ExtractTaskDetailsOutputSchema,
  },
  async input => {
    const {output} = await extractTaskDetailsPrompt(input);
    return output!;
  }
);
