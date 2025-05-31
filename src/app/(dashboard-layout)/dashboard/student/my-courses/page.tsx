
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpenTextIcon, PlayCircleIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

// Sample data for enrolled courses
const enrolledCourses = [
  { id: '1', title: 'Ultimate Next.js 14 Course', instructor: 'Alice Wonderland', imageUrl: 'https://placehold.co/400x225.png', progress: 75, category: 'Frontend', aiHint: 'abstract code' },
  { id: '2', title: 'Python for Data Science Bootcamp', instructor: 'Bob The Builder', imageUrl: 'https://placehold.co/400x225.png', progress: 40, category: 'Data Science', aiHint: 'data visualization' },
  { id: '4', title: 'React Native: Build Mobile Apps', instructor: 'Diana Prince', imageUrl: 'https://placehold.co/400x225.png', progress: 90, category: 'Mobile', aiHint: 'mobile interface design' },
];

export default function StudentMyCoursesPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-headline font-bold">My Courses</h1>
            <p className="text-muted-foreground">Continue your learning journey with your enrolled courses.</p>
        </div>
      </div>

      {enrolledCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrolledCourses.map((course) => (
            <Card key={course.id} className="overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl flex flex-col">
              <CardHeader className="p-0 relative">
                <Link href={`/courses/${course.id}`} className="block">
                  <Image
                    src={course.imageUrl}
                    alt={course.title}
                    width={400}
                    height={225}
                    className="w-full h-48 object-cover"
                    data-ai-hint={course.aiHint}
                  />
                   <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <PlayCircleIcon className="h-16 w-16 text-white/90" />
                  </div>
                </Link>
              </CardHeader>
              <CardContent className="p-4 flex-grow space-y-2">
                <Link href={`/courses/${course.id}`}>
                  <CardTitle className="text-lg font-headline leading-tight hover:text-primary transition-colors">{course.title}</CardTitle>
                </Link>
                <p className="text-sm text-muted-foreground">By {course.instructor}</p>
                <div>
                  <div className="h-2 w-full bg-muted rounded-full mb-1">
                    <div className="h-2 bg-primary rounded-full" style={{ width: `${course.progress}%` }}></div>
                  </div>
                  <p className="text-xs text-muted-foreground">{course.progress}% complete</p>
                </div>
              </CardContent>
              <div className="p-4 border-t">
                <Button asChild className="w-full">
                  <Link href={`/courses/${course.id}/learn`}>Continue Learning</Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-10 text-center">
            <BookOpenTextIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Courses Yet</h3>
            <p className="text-muted-foreground mb-4">You haven&apos;t enrolled in any courses. Explore our catalog to find your next learning adventure!</p>
            <Button asChild>
              <Link href="/">Explore Courses</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
