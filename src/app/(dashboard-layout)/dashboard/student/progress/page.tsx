
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3Icon, CheckCircle2Icon, ListChecksIcon, TrendingUpIcon } from "lucide-react";
import { Progress } from "@/components/ui/progress"; // ShadCN UI Progress component

// Sample data for student progress
const progressData = {
  overallProgress: 68,
  courses: [
    { id: '1', title: 'Ultimate Next.js 14 Course', progress: 75, lessonsCompleted: 30, totalLessons: 40 },
    { id: '2', title: 'Python for Data Science Bootcamp', progress: 40, lessonsCompleted: 20, totalLessons: 50 },
    { id: '4', title: 'React Native: Build Mobile Apps', progress: 90, lessonsCompleted: 45, totalLessons: 50 },
  ],
  completedCourses: 1,
  averageScore: 88, // Percentage
};

export default function StudentProgressPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold">My Progress</h1>
        <p className="text-muted-foreground">Track your learning achievements and course completions.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
            <TrendingUpIcon className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-1">{progressData.overallProgress}%</div>
            <Progress value={progressData.overallProgress} aria-label={`${progressData.overallProgress}% overall progress`} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Courses Completed</CardTitle>
            <CheckCircle2Icon className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{progressData.completedCourses}</div>
            <p className="text-xs text-muted-foreground">courses fully completed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <BarChart3Icon className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{progressData.averageScore}%</div>
            <p className="text-xs text-muted-foreground">average on quizzes & assignments</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-xl flex items-center">
            <ListChecksIcon className="mr-2 h-6 w-6 text-primary" />
            Detailed Course Progress
          </CardTitle>
          <CardDescription>See your progress for each enrolled course.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {progressData.courses.map(course => (
            <div key={course.id} className="p-4 border rounded-lg bg-card hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-foreground">{course.title}</h3>
              <p className="text-sm text-muted-foreground mb-2">
                {course.lessonsCompleted} / {course.totalLessons} lessons completed
              </p>
              <Progress value={course.progress} aria-label={`${course.progress}% progress in ${course.title}`} className="h-3" />
              <p className="text-xs text-primary mt-1 text-right">{course.progress}%</p>
            </div>
          ))}
           {progressData.courses.length === 0 && (
            <p className="text-muted-foreground text-center py-4">No active courses to show progress for.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
