
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowRight, MessageSquareText, Users, BrainCircuit } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-var(--header-height,100px))]"> {/* Adjust header height if known */}
      {/* Hero Section */}
      <section className="w-full py-20 md:py-32 lg:py-40 bg-gradient-to-br from-primary via-blue-600 to-indigo-700 text-primary-foreground">
        <div className="container mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-center md:text-left">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl drop-shadow-md">
              Unlock Clarity. <br />Flow Through Your Tasks.
            </h1>
            <p className="text-lg md:text-xl text-blue-100/90 max-w-2xl mx-auto md:mx-0 drop-shadow-sm">
              ClarityFlow uses cutting-edge AI to intelligently manage your to-dos and transform meeting notes into actionable items. Focus on what matters, we'll handle the organization.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg py-3 px-8 shadow-lg transform hover:scale-105 transition-transform">
                <Link href="/tasks">
                  Manage Tasks <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg py-3 px-8 border-primary-foreground/50 hover:bg-primary-foreground/10 text-primary-foreground shadow-lg transform hover:scale-105 transition-transform">
                <Link href="/meetings">
                  Parse Meetings <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="relative aspect-video max-w-2xl mx-auto md:max-w-none">
            <Image
              src="https://placehold.co/720x405.png"
              alt="ClarityFlow app interface illustration"
              layout="fill"
              objectFit="cover"
              className="rounded-xl shadow-2xl"
              data-ai-hint="modern productivity app interface"
            />
             <div className="absolute inset-0 bg-black/10 rounded-xl"></div> {/* Subtle overlay */}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-16 md:py-24 bg-background text-foreground">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Why ClarityFlow?</h2>
            <p className="mt-3 text-lg text-muted-foreground max-w-xl mx-auto">
              Leverage the power of AI to streamline your workflow and boost productivity.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-2 text-primary">
                  <MessageSquareText className="h-10 w-10" />
                  <CardTitle className="text-2xl font-semibold text-foreground">Natural Language Task Manager</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base min-h-[60px]">
                  Input tasks using everyday language. Our AI extracts details like assignee, due date, and priority, adding them seamlessly to your list.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-2 text-primary">
                  <Users className="h-10 w-10" />
                   <CardTitle className="text-2xl font-semibold text-foreground">AI Meeting Minutes Parser</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base min-h-[60px]">
                  Paste your meeting transcripts and watch as ClarityFlow automatically identifies actionable tasks, assignees, and deadlines.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
           <div className="text-center mt-16">
             <BrainCircuit className="h-16 w-16 mx-auto text-primary mb-4"/>
              <h3 className="text-2xl font-semibold text-foreground">Powered by Intelligent AI</h3>
              <p className="mt-2 text-muted-foreground max-w-lg mx-auto">
                Our sophisticated AI models are trained to understand context, intent, and nuances in your text, ensuring accurate and efficient task management.
              </p>
            </div>
        </div>
      </section>
    </div>
  );
}
