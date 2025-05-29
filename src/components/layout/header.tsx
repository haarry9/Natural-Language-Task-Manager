
'use client';

import * as React from 'react';
import Link from 'next/link';
import { ListChecks, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
  SheetClose, // Import SheetClose
} from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';

export function AppHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <header className="py-4 px-4 md:px-8 border-b border-border/60 bg-background/95 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <ListChecks className="h-7 w-7 text-primary" />
          <span className="text-2xl font-semibold text-foreground tracking-tight">
            ClarityFlow
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-2 lg:space-x-4">
          <Button variant="link" asChild className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            <Link href="#">Features</Link>
          </Button>
          <Button variant="link" asChild className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            <Link href="#">Pricing</Link>
          </Button>
          <Button variant="link" asChild className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            <Link href="#">About Us</Link>
          </Button>
          <Separator orientation="vertical" className="h-6 mx-2 hidden lg:block" />
          <Button variant="ghost" asChild className="text-sm">
            <Link href="#">Sign In</Link>
          </Button>
          <Button asChild className="text-sm">
            <Link href="#">Sign Up</Link>
          </Button>
        </nav>

        {/* Mobile Navigation Trigger */}
        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[300px] p-0">
              <SheetHeader className="p-4 border-b">
                <SheetClose asChild>
                  <Link href="/" className="flex items-center gap-3">
                    <ListChecks className="h-7 w-7 text-primary" />
                    <span className="text-xl font-semibold text-foreground">ClarityFlow</span>
                  </Link>
                </SheetClose>
              </SheetHeader>
              <nav className="flex flex-col space-y-1 p-4">
                <SheetClose asChild>
                  <Button variant="ghost" asChild className="justify-start text-base">
                     <Link href="#">Features</Link>
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button variant="ghost" asChild className="justify-start text-base">
                    <Link href="#">Pricing</Link>
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button variant="ghost" asChild className="justify-start text-base">
                    <Link href="#">About Us</Link>
                  </Button>
                </SheetClose>
                <Separator className="my-3" />
                <SheetClose asChild>
                  <Button variant="outline" className="w-full text-base" asChild>
                    <Link href="#">Sign In</Link>
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button className="w-full text-base mt-2" asChild>
                    <Link href="#">Sign Up</Link>
                  </Button>
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
