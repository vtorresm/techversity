import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { StarIcon, UserIcon, ClockIcon } from 'lucide-react';

interface CourseCardProps {
  id: string;
  title: string;
  instructor: string;
  imageUrl: string;
  category: string;
  rating: number;
  reviews: number;
  price: string;
  duration: string;
  aiHint?: string;
}

export function CourseCard({ id, title, instructor, imageUrl, category, rating, reviews, price, duration, aiHint }: CourseCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl flex flex-col h-full">
      <CardHeader className="p-0">
        <Link href={`/courses/${id}`} className="block">
          <Image
            src={imageUrl}
            alt={title}
            width={400}
            height={225}
            className="w-full h-48 object-cover"
            data-ai-hint={aiHint}
          />
        </Link>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <Badge variant="secondary" className="mb-2">{category}</Badge>
        <Link href={`/courses/${id}`}>
          <CardTitle className="text-lg font-headline leading-tight mb-1 hover:text-primary transition-colors">{title}</CardTitle>
        </Link>
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <UserIcon className="h-4 w-4 mr-1" />
          <span>{instructor}</span>
        </div>
        <div className="flex items-center text-sm mb-2">
          <span className="text-amber-500 font-semibold mr-1">{rating.toFixed(1)}</span>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <StarIcon key={i} className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`} />
            ))}
          </div>
          <span className="text-muted-foreground ml-1">({reviews} reviews)</span>
        </div>
         <div className="flex items-center text-sm text-muted-foreground">
            <ClockIcon className="h-4 w-4 mr-1" />
            <span>{duration}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 flex justify-between items-center border-t">
        <span className="text-xl font-headline font-bold text-primary">{price}</span>
        <Button asChild size="sm">
          <Link href={`/courses/${id}`}>View Course</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}