
import { config } from 'dotenv';
config();

import '@/ai/flows/extract-task-details.ts';
import '@/ai/flows/initial-task-generation.ts';
import '@/ai/flows/extract-tasks-from-transcript.ts';
