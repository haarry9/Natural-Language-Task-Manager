import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
// Removed GeistMono import as it's not directly used here and was causing issues.
// If specific mono sections are needed, ensure 'geist' package is correctly providing it.
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { AppHeader } from '@/components/layout/header';

export const metadata: Metadata = {
  title: 'ClarityFlow - Intelligent Task & Meeting Management',
  description: 'Intelligently parse tasks and manage meeting minutes with ClarityFlow.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body className="antialiased"> {/* bg-background and text-foreground are now applied in globals.css body */}
        <div className="flex flex-col min-h-screen">
          <AppHeader />
          <main className="flex-grow container mx-auto px-4 py-8 md:px-8 md:py-12">
            {children}
          </main>
          <footer className="py-6 text-center text-muted-foreground border-t">
            <p>&copy; {new Date().getFullYear()} ClarityFlow. All rights reserved.</p>
          </footer>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
