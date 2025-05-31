import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface TestimonialCardProps {
  name: string;
  role: string;
  avatarUrl: string;
  testimonial: string;
  aiHint?: string;
}

export function TestimonialCard({ name, role, avatarUrl, testimonial, aiHint }: TestimonialCardProps) {
  return (
    <Card className="bg-card border border-border shadow-lg rounded-lg overflow-hidden h-full flex flex-col">
      <CardContent className="p-6 flex-grow flex flex-col items-center text-center">
        <Avatar className="h-20 w-20 mb-4 border-2 border-primary">
          <AvatarImage src={avatarUrl} alt={name} data-ai-hint={aiHint} />
          <AvatarFallback>{name.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <h3 className="text-lg font-headline font-semibold text-foreground">{name}</h3>
        <p className="text-sm text-primary mb-3">{role}</p>
        <blockquote className="text-muted-foreground italic flex-grow">
          <p>&ldquo;{testimonial}&rdquo;</p>
        </blockquote>
      </CardContent>
    </Card>
  );
}