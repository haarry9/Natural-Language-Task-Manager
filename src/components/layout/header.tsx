import { ListChecks } from 'lucide-react';

export function AppHeader() {
  return (
    <header className="py-6 px-4 md:px-8 border-b border-border/60 bg-background/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center gap-3">
        <ListChecks className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-semibold text-foreground">
          ClarityFlow
        </h1>
      </div>
    </header>
  );
}
