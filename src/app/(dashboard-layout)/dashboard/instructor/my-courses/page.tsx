
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpenTextIcon, Edit3Icon, PlusCircleIcon, Trash2Icon, UsersIcon, BarChart3Icon, EyeIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Sample data for instructor's courses
const instructorCourses = [
  { id: '1', title: 'Ultimate Next.js 14 Course', imageUrl: 'https://placehold.co/400x225.png', category: 'Frontend', status: 'Published', students: 1250, rating: 4.9, aiHint: 'abstract code' },
  { id: '3', title: 'Advanced Node.js & Microservices', imageUrl: 'https://placehold.co/400x225.png', category: 'Backend', status: 'Draft', students: 0, rating: 0, aiHint: 'network servers' },
  { id: 'new', title: 'Introduction to Quantum Computing', imageUrl: 'https://placehold.co/400x225.png', category: 'Advanced Topics', status: 'ReviewPending', students: 0, rating: 0, aiHint: 'quantum physics' },
];

const statusColors: { [key: string]: string } = {
  Published: "bg-green-100 text-green-800 border-green-300",
  Draft: "bg-yellow-100 text-yellow-800 border-yellow-300",
  ReviewPending: "bg-blue-100 text-blue-800 border-blue-300",
  Rejected: "bg-red-100 text-red-800 border-red-300",
};

const statusText: { [key: string]: string } = {
  Published: "Published",
  Draft: "Draft",
  ReviewPending: "Pending Review",
  Rejected: "Rejected",
};


export default function InstructorMyCoursesPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-headline font-bold">My Courses</h1>
            <p className="text-muted-foreground">Manage your created courses and view their performance.</p>
        </div>
        <Button asChild>
            <Link href="/dashboard/instructor/create-course">
                <PlusCircleIcon className="mr-2 h-5 w-5" /> Create New Course
            </Link>
        </Button>
      </div>

      {instructorCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {instructorCourses.map((course) => (
            <Card key={course.id} className="overflow-hidden flex flex-col">
              <CardHeader className="p-0">
                <Image
                  src={course.imageUrl}
                  alt={course.title}
                  width={400}
                  height={225}
                  className="w-full h-48 object-cover"
                  data-ai-hint={course.aiHint}
                />
              </CardHeader>
              <CardContent className="p-4 flex-grow space-y-2">
                <div className="flex justify-between items-start">
                    <Badge variant="secondary" className={statusColors[course.status] || 'bg-gray-100 text-gray-800'}>
                        {statusText[course.status] || course.status}
                    </Badge>
                    {course.rating > 0 && (
                        <div className="text-xs text-amber-600 font-semibold flex items-center">
                            {course.rating.toFixed(1)} <StarIcon className="h-3 w-3 fill-amber-500 text-amber-500 ml-1" />
                        </div>
                    )}
                </div>
                <CardTitle className="text-lg font-headline leading-tight">{course.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{course.category}</p>
                <div className="flex items-center text-sm text-muted-foreground">
                  <UsersIcon className="h-4 w-4 mr-1" />
                  <span>{course.students} students</span>
                </div>
              </CardContent>
              <CardFooter className="p-4 border-t grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/dashboard/instructor/edit-course/${course.id}`}>
                    <Edit3Icon className="mr-1.5 h-4 w-4" /> Edit
                  </Link>
                </Button>
                {course.status === 'Published' ? (
                    <Button variant="secondary" size="sm" asChild>
                        <Link href={`/courses/${course.id}`} target="_blank">
                            <EyeIcon className="mr-1.5 h-4 w-4" /> View
                        </Link>
                    </Button>
                ) : (
                    <Button variant="secondary" size="sm" disabled>
                        <EyeIcon className="mr-1.5 h-4 w-4" /> Preview
                    </Button>
                )}
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary col-span-1">
                    <BarChart3Icon className="mr-1.5 h-4 w-4" /> Analytics
                </Button>
                 <Button variant="ghost" size="sm" className="text-destructive hover:bg-destructive/10 hover:text-destructive col-span-1">
                    <Trash2Icon className="mr-1.5 h-4 w-4" /> Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-10 text-center">
            <BookOpenTextIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Courses Created Yet</h3>
            <p className="text-muted-foreground mb-4">Start sharing your knowledge by creating your first course.</p>
            <Button asChild>
              <Link href="/dashboard/instructor/create-course">Create New Course</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
