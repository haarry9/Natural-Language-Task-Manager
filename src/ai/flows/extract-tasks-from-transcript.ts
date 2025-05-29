
'use server';
/**
 * @fileOverview AI flow for extracting multiple tasks from a meeting transcript.
 *
 * - extractTasksFromTranscript - A function that extracts task details from a meeting transcript.
 * - ExtractTasksFromTranscriptInput - The input type for the extractTasksFromTranscript function.
 * - ExtractTasksFromTranscriptOutput - The return type for the extractTasksFromTranscript function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Corresponds to the fields AI should extract for each task
const SingleTaskSchema = z.object({
  taskName: z.string().describe('A concise description of the task.'),
  assignee: z
    .string()
    .describe(
      'The name of the person responsible for the task. If not specified, use "Unassigned" or "Team".'
    ),
  dueDate: z
    .string()
    .describe(
      'The deadline for the task (e.g., "tomorrow 5 PM", "next Wednesday EOD"). If not specified, output "Not specified".'
    ),
  priority: z
    .enum(['P1', 'P2', 'P3', 'P4'])
    .describe(
      "The priority of the task ('P1', 'P2', 'P3', 'P4'). Defaults to P3 if not specified."
    ),
});

const ExtractTasksFromTranscriptInputSchema = z.object({
  transcript: z
    .string()
    .describe('The full text of the meeting transcript.'),
});
export type ExtractTasksFromTranscriptInput = z.infer<typeof ExtractTasksFromTranscriptInputSchema>;

const ExtractTasksFromTranscriptOutputSchema = z.array(SingleTaskSchema);
export type ExtractTasksFromTranscriptOutput = z.infer<typeof ExtractTasksFromTranscriptOutputSchema>;


export async function extractTasksFromTranscript(input: ExtractTasksFromTranscriptInput): Promise<ExtractTasksFromTranscriptOutput> {
  return extractTasksFromTranscriptFlow(input);
}

const extractTasksPrompt = ai.definePrompt({
  name: 'extractTasksFromTranscriptPrompt',
  input: {schema: ExtractTasksFromTranscriptInputSchema.extend({ now: z.string() })}, // Add 'now' for date context
  output: {schema: ExtractTasksFromTranscriptOutputSchema},
  prompt: `You are an expert meeting assistant. Your task is to meticulously read through the provided meeting transcript and extract all actionable tasks. For each task, identify the task description, the person assigned to it, and its due date/time.

The current date is {{now}}. Use this for context when interpreting relative due dates like "tomorrow" or "next Wednesday".

Each extracted task MUST include:
- taskName: A concise description of the task.
- assignee: The name of the person responsible for the task. If no specific person is mentioned but the task is clearly for someone (e.g. "We need to update the slides"), assign it to "Team" or "Unassigned".
- dueDate: The deadline for the task. Try to interpret dates and times as accurately as possible (e.g., "by 10pm tomorrow", "next Friday", "end of day"). If no specific due date is mentioned, output "Not specified".
- priority: The priority of the task. This should be one of 'P1', 'P2', 'P3', 'P4'. If the transcript mentions a priority (e.g., "high priority", "critical", "P1"), use that. Otherwise, **default to P3 for all extracted tasks.**

Please provide the output as a JSON array of task objects. Ensure the JSON is well-formed.

Transcript:
{{{transcript}}}
`,
});

const extractTasksFromTranscriptFlow = ai.defineFlow(
  {
    name: 'extractTasksFromTranscriptFlow',
    inputSchema: ExtractTasksFromTranscriptInputSchema,
    outputSchema: ExtractTasksFromTranscriptOutputSchema,
  },
  async (input) => {
    const now = new Date().toISOString();
    const {output} = await extractTasksPrompt({...input, now });
    return output || []; // Ensure an empty array is returned if output is null/undefined
  }
);
