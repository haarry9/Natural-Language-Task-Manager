
'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import type { Task } from '@/lib/types';
import { parseTranscriptAction, type ParsedTaskData } from '@/app/actions';
import { Wand2 } from 'lucide-react';

const FormSchema = z.object({
  transcript: z.string().min(10, {
    message: 'Meeting transcript must be at least 10 characters.',
  }),
});

interface TranscriptInputFormProps {
  onTasksExtracted: (tasks: Task[]) => void;
}

export function TranscriptInputForm({ onTasksExtracted }: TranscriptInputFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      transcript: '',
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsSubmitting(true);
    try {
      const result = await parseTranscriptAction(data.transcript);
      if (result.success && result.tasks) {
        const newTasks: Task[] = result.tasks.map((parsedTask: ParsedTaskData) => ({
          id: crypto.randomUUID(),
          ...parsedTask,
          // originalInput is not directly applicable here as tasks are from a larger transcript
        }));
        
        onTasksExtracted(newTasks);

        toast({
          title: 'Transcript Processed!',
          description: `${newTasks.length} task(s) extracted and added.`,
        });
        form.reset();
      } else {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: result.error || 'Could not extract tasks from transcript.',
        });
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Submission Error',
        description: error.message || 'An unexpected error occurred while processing the transcript.',
      });
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="transcript"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Paste your meeting transcript</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="e.g., 'Aman you take the landing page by 10pm tomorrow. Rajeev you take care of client follow-up by Wednesday...'"
                  className="resize-y min-h-[150px] text-base"
                  {...field}
                  aria-label="Meeting transcript input"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full md:w-auto text-base py-3 px-6" disabled={isSubmitting} size="lg">
          <Wand2 className="mr-2 h-5 w-5" />
          {isSubmitting ? 'Extracting Tasks...' : 'Extract Tasks with AI'}
        </Button>
      </form>
    </Form>
  );
}
