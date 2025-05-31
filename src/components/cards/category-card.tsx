import type { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRightIcon } from 'lucide-react';

interface CategoryCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  courseCount: number;
}

export function CategoryCard({ icon: Icon, title, description, href, courseCount }: CategoryCardProps) {
  return (
    <Link href={href} className="group block">
      <Card className="h-full transition-all duration-300 ease-in-out hover:shadow-xl hover:border-primary">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-headline font-medium">{title}</CardTitle>
          <Icon className="h-8 w-8 text-primary" />
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-2">{description}</p>
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">{courseCount} Courses</span>
            <ArrowRightIcon className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}