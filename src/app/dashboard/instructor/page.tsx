import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpenTextIcon, UsersIcon, DollarSignIcon, BarChartBigIcon } from "lucide-react";

export default function InstructorDashboardPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-headline font-bold">Instructor Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published Courses</CardTitle>
            <BookOpenTextIcon className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">courses you have published</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <UsersIcon className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,250</div>
            <p className="text-xs text-muted-foreground">students enrolled in your courses</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Earnings</CardTitle>
            <DollarSignIcon className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2,350.00</div>
            <p className="text-xs text-muted-foreground">earnings this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <BarChartBigIcon className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8 <span className="text-sm text-muted-foreground">/ 5.0</span></div>
            <p className="text-xs text-muted-foreground">across all your courses</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Recent Activity</CardTitle>
          <CardDescription>Overview of recent student enrollments and reviews.</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Placeholder for recent activity feed */}
          <div className="p-6 border rounded-md bg-muted/50 text-center text-muted-foreground">
            Recent student activities will appear here.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}