'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboardIcon,
  BookOpenCheckIcon,
  GraduationCapIcon,
  SettingsIcon,
  PlusCircleIcon,
  BarChart3Icon,
  HelpCircleIcon,
  UsersIcon,
  NewspaperIcon
} from 'lucide-react';
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarMenuSub, SidebarMenuSubItem, SidebarMenuSubButton } from '@/components/ui/sidebar';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const studentLinks = [
  { href: '/dashboard/student', label: 'Dashboard', icon: LayoutDashboardIcon },
  { href: '/dashboard/student/my-courses', label: 'My Courses', icon: BookOpenCheckIcon },
  { href: '/dashboard/student/progress', label: 'My Progress', icon: GraduationCapIcon },
  { href: '/dashboard/student/certificates', label: 'Certificates', icon: NewspaperIcon },
  { href: '/dashboard/student/profile', label: 'Profile', icon: UsersIcon },
  { href: '/dashboard/student/settings', label: 'Settings', icon: SettingsIcon },
];

const instructorLinks = [
  { href: '/dashboard/instructor', label: 'Dashboard', icon: LayoutDashboardIcon },
  { href: '/dashboard/instructor/create-course', label: 'Create Course', icon: PlusCircleIcon },
  { href: '/dashboard/instructor/my-courses', label: 'My Courses', icon: BookOpenCheckIcon },
  { href: '/dashboard/instructor/analytics', label: 'Analytics', icon: BarChart3Icon },
  { href: '/dashboard/instructor/students', label: 'Students', icon: UsersIcon },
  { href: '/dashboard/instructor/profile', label: 'Profile', icon: UsersIcon },
  { href: '/dashboard/instructor/settings', label: 'Settings', icon: SettingsIcon },
];

const commonLinks = [
    { href: '/tools/summarize-discussion', label: 'Summarize Tool', icon: HelpCircleIcon },
];

export function DashboardNav() {
  const pathname = usePathname();
  const isStudentDashboard = pathname.startsWith('/dashboard/student');
  const isInstructorDashboard = pathname.startsWith('/dashboard/instructor');

  let links = commonLinks;
  let dashboardTitle = "Tools";

  if (isStudentDashboard) {
    links = [...studentLinks, ...commonLinks];
    dashboardTitle = "Student Dashboard";
  } else if (isInstructorDashboard) {
    links = [...instructorLinks, ...commonLinks];
    dashboardTitle = "Instructor Dashboard";
  }
  
  // This component would ideally determine the role and display appropriate links
  // For now, we'll show a generic set or allow selection via URL structure for demo

  return (
    <nav className="flex flex-col gap-2">
       <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
        <AccordionItem value="item-1" className="border-none">
          <AccordionTrigger className="px-2 py-2 text-sm font-medium rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0 [&[data-state=open]>svg]:text-primary">
            <div className="flex items-center gap-2 group-data-[collapsible=icon]:w-full group-data-[collapsible=icon]:justify-center">
                {isStudentDashboard ? <GraduationCapIcon className="h-5 w-5 text-primary"/> : <LayoutDashboardIcon className="h-5 w-5 text-primary" />}
                <span className="group-data-[collapsible=icon]:hidden font-headline">{dashboardTitle}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-1 group-data-[collapsible=icon]:hidden">
            <SidebarMenu>
                {(isStudentDashboard ? studentLinks : instructorLinks).map((link) => (
                <SidebarMenuItem key={link.href}>
                    <Link href={link.href} legacyBehavior passHref>
                    <SidebarMenuButton
                        isActive={pathname === link.href}
                        className={cn(
                        'w-full justify-start',
                        pathname === link.href && 'bg-sidebar-accent text-sidebar-accent-foreground'
                        )}
                        tooltip={{children: link.label}}
                    >
                        <link.icon className="h-4 w-4 mr-2" />
                        <span className="group-data-[collapsible=icon]:hidden">{link.label}</span>
                    </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
                ))}
            </SidebarMenu>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2" className="border-none">
          <AccordionTrigger className="px-2 py-2 text-sm font-medium rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0 [&[data-state=open]>svg]:text-primary">
            <div className="flex items-center gap-2 group-data-[collapsible=icon]:w-full group-data-[collapsible=icon]:justify-center">
                <HelpCircleIcon className="h-5 w-5 text-primary"/>
                <span className="group-data-[collapsible=icon]:hidden font-headline">Tools</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-1 group-data-[collapsible=icon]:hidden">
            <SidebarMenu>
                {commonLinks.map((link) => (
                <SidebarMenuItem key={link.href}>
                    <Link href={link.href} legacyBehavior passHref>
                    <SidebarMenuButton
                        isActive={pathname === link.href}
                        className={cn(
                        'w-full justify-start',
                        pathname === link.href && 'bg-sidebar-accent text-sidebar-accent-foreground'
                        )}
                        tooltip={{children: link.label}}
                    >
                        <link.icon className="h-4 w-4 mr-2" />
                        <span className="group-data-[collapsible=icon]:hidden">{link.label}</span>
                    </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
                ))}
            </SidebarMenu>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </nav>
  );
}