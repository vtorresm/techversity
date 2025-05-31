import type { ReactNode } from 'react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar';
import { DashboardNav } from '@/components/dashboard-nav';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { UserCircle, LogOutIcon } from 'lucide-react';
import Link from 'next/link';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider defaultOpen>
      <div className="flex min-h-screen">
        <Sidebar collapsible="icon" className="border-r">
          <SidebarHeader className="p-4 border-b">
            <div className="flex items-center justify-between">
                <Logo />
                <SidebarTrigger className="hidden group-data-[collapsible=icon]:flex" />
            </div>
          </SidebarHeader>
          <SidebarContent className="p-2">
            <DashboardNav />
          </SidebarContent>
          <SidebarFooter className="p-4 border-t">
             <Button variant="ghost" className="w-full justify-start gap-2 text-muted-foreground hover:text-primary group-data-[collapsible=icon]:justify-center">
                <UserCircle className="h-5 w-5" />
                <span className="group-data-[collapsible=icon]:hidden">Profile</span>
            </Button>
            <Button variant="ghost" asChild className="w-full justify-start gap-2 text-destructive hover:text-destructive/80 group-data-[collapsible=icon]:justify-center">
                <Link href="/">
                    <LogOutIcon className="h-5 w-5" />
                    <span className="group-data-[collapsible=icon]:hidden">Log Out</span>
                </Link>
            </Button>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset className="flex-1">
          <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-background px-6 md:justify-end">
            <SidebarTrigger className="md:hidden" /> {/* Mobile trigger */}
            {/* Add any header content for dashboard pages, e.g., user menu, notifications */}
             <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">Welcome, User!</span>
                <UserCircle className="h-8 w-8 text-primary" />
            </div>
          </header>
          <main className="p-6">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}