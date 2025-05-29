
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { ArrowRight, MessageSquareText, Users, BrainCircuit } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-var(--header-height,80px))]">
      
      {/* Hero Section - Styled as a prominent card */}
      <section className="w-full py-16 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-gradient-to-br from-primary via-blue-600 to-indigo-700 text-primary-foreground rounded-2xl shadow-2xl p-8 sm:p-12 md:p-16 lg:p-20">
            <div className="space-y-6 text-center md:text-left mb-10 md:mb-12">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl drop-shadow-md">
                Unlock Clarity. <br />Flow Through Your Tasks.
              </h1>
              <p className="text-lg md:text-xl text-blue-100/90 max-w-3xl mx-auto md:mx-0 drop-shadow-sm">
                ClarityFlow uses cutting-edge AI to intelligently manage your to-dos and transform meeting notes into actionable items. Focus on what matters, we'll handle the organization.
              </p>
            </div>

            {/* Feature Cards replacing buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Link href="/tasks" passHref>
                <Card className="cursor-pointer bg-card/90 hover:bg-card text-card-foreground shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                  <CardHeader className="pb-4">
                    <div className="flex items-start gap-4">
                      <MessageSquareText className="h-10 w-10 text-primary mt-1" />
                      <div>
                        <CardTitle className="text-2xl font-semibold">Natural Language Task Manager</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <CardDescription className="text-base text-muted-foreground">
                      Input tasks using everyday language. Our AI extracts details like assignee, due date, and priority, adding them seamlessly to your list.
                    </CardDescription>
                  </CardContent>
                  <CardFooter className="pt-4">
                     <Button variant="link" className="text-primary p-0 h-auto">
                        Go to Task Manager <ArrowRight className="ml-2 h-4 w-4" />
                     </Button>
                  </CardFooter>
                </Card>
              </Link>

              <Link href="/meetings" passHref>
                <Card className="cursor-pointer bg-card/90 hover:bg-card text-card-foreground shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                  <CardHeader className="pb-4">
                    <div className="flex items-start gap-4">
                      <Users className="h-10 w-10 text-primary mt-1" />
                      <div>
                        <CardTitle className="text-2xl font-semibold">AI Meeting Minutes Parser</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <CardDescription className="text-base text-muted-foreground">
                      Paste your meeting transcripts and watch as ClarityFlow automatically identifies actionable tasks, assignees, and deadlines.
                    </CardDescription>
                  </CardContent>
                  <CardFooter className="pt-4">
                    <Button variant="link" className="text-primary p-0 h-auto">
                        Go to Meeting Parser <ArrowRight className="ml-2 h-4 w-4" />
                     </Button>
                  </CardFooter>
                </Card>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* "Powered by Intelligent AI" Section - Kept from previous version */}
      <section className="w-full py-16 md:py-24 bg-background text-foreground">
        <div className="container mx-auto px-4 md:px-6">
           <div className="text-center">
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
