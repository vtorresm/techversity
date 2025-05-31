
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarDaysIcon, DollarSignIcon, EyeIcon, TrendingUpIcon, Users2Icon, PickaxeIcon } from "lucide-react";
import { DatePickerWithRange } from "@/components/ui/date-range-picker"; // Assuming this component exists
import React from "react";

// Sample data - replace with actual API calls
const totalStats = {
  revenue: 5850.75,
  enrollments: 1850,
  coursesPublished: 3,
  averageRating: 4.75,
};

const revenueData = [
  { name: 'Jan', revenue: 400 }, { name: 'Feb', revenue: 300 }, { name: 'Mar', revenue: 600 },
  { name: 'Apr', revenue: 800 }, { name: 'May', revenue: 700 }, { name: 'Jun', revenue: 950 },
];

const enrollmentData = [
  { name: 'Jan', enrollments: 50 }, { name: 'Feb', enrollments: 40 }, { name: 'Mar', enrollments: 70 },
  { name: 'Apr', enrollments: 90 }, { name: 'May', enrollments: 80 }, { name: 'Jun', enrollments: 120 },
];

const topCourses = [
    { id: '1', name: 'Ultimate Next.js 14 Course', revenue: 3200, enrollments: 1250, rating: 4.9 },
    { id: '2', name: 'Advanced Python for AI', revenue: 1500, enrollments: 400, rating: 4.8 },
    { id: '3', name: 'Web Security Fundamentals', revenue: 1150.75, enrollments: 200, rating: 4.6 },
];

const coursesForSelect = [
    {id: 'all', name: 'All Courses'},
    ...topCourses,
];

export default function InstructorAnalyticsPage() {
  const [selectedCourse, setSelectedCourse] = React.useState('all');
  const [dateRange, setDateRange] = React.useState<{from: Date | undefined, to: Date | undefined}>({ from: new Date(new Date().getFullYear(), 0, 1), to: new Date() });

  // Filter data based on selectedCourse and dateRange (simplified)
  const filteredRevenueData = revenueData; // Placeholder
  const filteredEnrollmentData = enrollmentData; // Placeholder

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-headline font-bold">Course Analytics</h1>
          <p className="text-muted-foreground">Track performance and gain insights into your courses.</p>
        </div>
        <div className="flex items-center gap-2">
            <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Course" />
                </SelectTrigger>
                <SelectContent>
                    {coursesForSelect.map(course => (
                        <SelectItem key={course.id} value={course.id}>{course.name}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
            {/* DateRangePicker component would be used here. Using a placeholder */}
             <div className="flex items-center gap-2 p-2 border rounded-md text-sm">
                <CalendarDaysIcon className="h-4 w-4 text-muted-foreground" />
                <span>{dateRange.from?.toLocaleDateString()} - {dateRange.to?.toLocaleDateString()}</span>
            </div>
            {/* <DatePickerWithRange date={dateRange} onDateChange={setDateRange} /> */}
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSignIcon className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalStats.revenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">+15.2% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Enrollments</CardTitle>
            <Users2Icon className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStats.enrollments}</div>
            <p className="text-xs text-muted-foreground">+80 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Courses Published</CardTitle>
            <EyeIcon className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStats.coursesPublished}</div>
            <p className="text-xs text-muted-foreground">Actively available</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <TrendingUpIcon className="h-5 w-5 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStats.averageRating.toFixed(2)} <span className="text-sm text-muted-foreground">/ 5.0</span></div>
            <p className="text-xs text-muted-foreground">Across all published courses</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-xl">Revenue Over Time</CardTitle>
            <CardDescription>Monthly earnings from your courses.</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={filteredRevenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value: number) => [`$${value.toFixed(2)}`, "Revenue"]} />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-xl">Enrollments Over Time</CardTitle>
            <CardDescription>Number of new student enrollments per month.</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={filteredEnrollmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value: number) => [value, "Enrollments"]}/>
                <Legend />
                <Bar dataKey="enrollments" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Performing Courses */}
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-xl">Top Performing Courses</CardTitle>
          <CardDescription>Overview of your most successful courses.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topCourses.map(course => (
              <div key={course.id} className="p-4 border rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-card hover:shadow-sm transition-shadow">
                <div>
                  <h4 className="font-semibold text-foreground">{course.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    Revenue: ${course.revenue.toFixed(2)} &bull; Enrollments: {course.enrollments}
                  </p>
                </div>
                <div className="text-right">
                    <p className="text-lg font-bold text-amber-500">{course.rating.toFixed(1)}</p>
                    <p className="text-xs text-muted-foreground">Avg. Rating</p>
                </div>
              </div>
            ))}
             {topCourses.length === 0 && (
                <div className="text-center py-6">
                    <PickaxeIcon className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">No course data to display yet.</p>
                    <p className="text-xs text-muted-foreground">Publish courses and get enrollments to see analytics.</p>
                </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Mock DatePickerWithRange if not available
// You should have this component in your ui library, if not, here's a placeholder
// components/ui/date-range-picker.tsx
// const DatePickerWithRange = ({ date, onDateChange }: { date: any, onDateChange: (date: any) => void }) => {
//   return (
//     <div className="flex items-center gap-2 p-2 border rounded-md text-sm cursor-pointer hover:bg-muted">
//       <CalendarDaysIcon className="h-4 w-4 text-muted-foreground" />
//       <span>{date.from?.toLocaleDateString()} - {date.to?.toLocaleDateString()}</span>
//     </div>
//   );
// };

