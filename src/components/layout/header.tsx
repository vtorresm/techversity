import Link from 'next/link';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { MenuIcon, SearchIcon } from 'lucide-react';
import { Input } from '../ui/input';

const navLinks = [
  { href: '/#categories', label: 'Categories' },
  { href: '/#popular-courses', label: 'Popular Courses' },
  { href: '/#testimonials', label: 'Testimonials' },
  { href: '/tools/summarize-discussion', label: 'Summarize Tool' },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <Logo />
        <nav className="hidden md:flex items-center gap-4 lg:gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-2">
            <div className="relative">
                <Input type="search" placeholder="Search courses..." className="h-9 pr-8 w-40 lg:w-64" />
                <SearchIcon className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            </div>
          <Button variant="outline" asChild>
            <Link href="/auth/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/auth/register">Sign Up</Link>
          </Button>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full max-w-xs bg-background">
            <div className="flex flex-col gap-6 p-6">
              <Logo />
              <nav className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-base font-medium text-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="relative mt-4">
                <Input type="search" placeholder="Search courses..." className="h-10 pr-10 w-full" />
                <SearchIcon className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              </div>
              <div className="mt-auto flex flex-col gap-2">
                <Button variant="outline" asChild className="w-full">
                  <Link href="/auth/login">Login</Link>
                </Button>
                <Button asChild className="w-full">
                  <Link href="/auth/register">Sign Up</Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}