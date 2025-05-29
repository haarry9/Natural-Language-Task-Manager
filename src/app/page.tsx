'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { MessageSquareText, Users } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          Welcome to <span className="text-primary">ClarityFlow</span>
        </h1>
        <p className="mt-3 text-lg text-muted-foreground sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
          Streamline your productivity with AI-powered tools. Choose an option below to get started.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        <Card className="flex flex-col transform hover:scale-105 transition-transform duration-300 ease-in-out shadow-xl hover:shadow-2xl rounded-lg">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3 mb-2">
              <MessageSquareText className="h-8 w-8 text-primary" />
              <CardTitle className="text-2xl font-semibold">Natural Language Task Manager</CardTitle>
            </div>
            <CardDescription className="text-base min-h-[60px]">
              Input tasks using everyday language and let our AI extract details like assignee, due date, and priority.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="aspect-video bg-muted rounded-md overflow-hidden">
              <Image
                src="https://placehold.co/600x338.png"
                alt="Natural Language Task Manager illustration"
                width={600}
                height={338}
                className="object-cover w-full h-full"
                data-ai-hint="task list organization"
              />
            </div>
          </CardContent>
          <CardFooter className="pt-6">
            <Link href="/tasks" asChild>
              <Button className="w-full text-base py-3">Go to Task Manager</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="flex flex-col transform hover:scale-105 transition-transform duration-300 ease-in-out shadow-xl hover:shadow-2xl rounded-lg">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3 mb-2">
              <Users className="h-8 w-8 text-primary" />
              <CardTitle className="text-2xl font-semibold">AI Meeting Minutes to Tasks</CardTitle>
            </div>
            <CardDescription className="text-base min-h-[60px]">
              Convert your meeting notes or transcripts into actionable tasks automatically. (Coming Soon!)
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="aspect-video bg-muted rounded-md overflow-hidden">
              <Image
                src="https://placehold.co/600x338.png"
                alt="AI Meeting Minutes to Tasks illustration"
                width={600}
                height={338}
                className="object-cover w-full h-full"
                data-ai-hint="meeting notes collaboration"
              />
            </div>
          </CardContent>
          <CardFooter className="pt-6">
            <Button className="w-full text-base py-3" disabled>
              Explore Meeting AI (Soon)
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
