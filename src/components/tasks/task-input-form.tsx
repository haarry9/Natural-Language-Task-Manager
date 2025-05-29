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
import type { Task, TaskPriority } from '@/lib/types';
import { parseTaskAction, type ParsedTaskData } from '@/app/actions';
import { Wand2 } from 'lucide-react';

const FormSchema = z.object({
  naturalLanguageTask: z.string().min(5, {
    message: 'Task description must be at least 5 characters.',
  }),
});

interface TaskInputFormProps {
  onTaskAdd: (task: Task) => void;
}

export function TaskInputForm({ onTaskAdd }: TaskInputFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      naturalLanguageTask: '',
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsSubmitting(true);
    try {
      const result = await parseTaskAction(data.naturalLanguageTask);
      if (result.success && result.task) {
        const newTask: Task = {
          id: crypto.randomUUID(),
          ...result.task,
          originalInput: data.naturalLanguageTask,
        };
        onTaskAdd(newTask);
        toast({
          title: 'Task Parsed Successfully!',
          description: `Task "${newTask.taskName}" has been added.`,
        });
        form.reset();
      } else {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: result.error || 'Could not parse task details.',
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Submission Error',
        description: 'An unexpected error occurred.',
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
          name="naturalLanguageTask"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Enter your task in natural language</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="e.g., 'Review design mockups with Sarah by Friday 3pm P1'"
                  className="resize-none min-h-[100px] text-base"
                  {...field}
                  aria-label="Natural language task input"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full md:w-auto text-base py-3 px-6" disabled={isSubmitting} size="lg">
          <Wand2 className="mr-2 h-5 w-5" />
          {isSubmitting ? 'Parsing Task...' : 'Add Task with AI'}
        </Button>
      </form>
    </Form>
  );
}
