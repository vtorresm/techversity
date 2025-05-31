
'use client';

import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontalIcon, SearchIcon, MessageSquareIcon, UserXIcon, ExternalLinkIcon, FileTextIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Sample student data
const allStudents = [
  { id: 's1', name: 'Alice Johnson', email: 'alice@example.com', avatarUrl: 'https://placehold.co/40x40.png', aiHint: 'woman portrait', enrolledCourses: ['Ultimate Next.js 14 Course', 'Advanced Node.js & Microservices'], lastActive: '2024-07-20', progress: 75 },
  { id: 's2', name: 'Bob Williams', email: 'bob@example.com', avatarUrl: 'https://placehold.co/40x40.png', aiHint: 'man smiling', enrolledCourses: ['Ultimate Next.js 14 Course'], lastActive: '2024-07-18', progress: 50 },
  { id: 's3', name: 'Carol Davis', email: 'carol@example.com', avatarUrl: 'https://placehold.co/40x40.png', aiHint: 'person glasses', enrolledCourses: ['Advanced Node.js & Microservices'], lastActive: '2024-07-21', progress: 90 },
  { id: 's4', name: 'David Brown', email: 'david@example.com', avatarUrl: 'https://placehold.co/40x40.png', aiHint: 'man neutral', enrolledCourses: ['Ultimate Next.js 14 Course'], lastActive: '2024-06-15', progress: 20 },
];

// Sample courses for filtering
const courses = [
  { id: 'all', name: 'All Courses' },
  { id: 'c1', name: 'Ultimate Next.js 14 Course' },
  { id: 'c2', name: 'Advanced Node.js & Microservices' },
];

export default function InstructorStudentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('all');

  const filteredStudents = allStudents.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = selectedCourse === 'all' || student.enrolledCourses.some(courseName => 
        courses.find(c => c.id === selectedCourse)?.name === courseName
    );
    return matchesSearch && matchesCourse;
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold">Manage Students</h1>
        <p className="text-muted-foreground">View and interact with students enrolled in your courses.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Student List</CardTitle>
          <CardDescription>
            A list of all students currently enrolled in {selectedCourse === 'all' ? 'any of your courses' : `"${courses.find(c => c.id === selectedCourse)?.name}"`}.
          </CardDescription>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder="Search students by name or email..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} 
              />
            </div>
            <Select value={selectedCourse} onValueChange={setSelectedCourse}>
              <SelectTrigger className="w-full sm:w-[220px]">
                <SelectValue placeholder="Filter by course" />
              </SelectTrigger>
              <SelectContent>
                {courses.map(course => (
                  <SelectItem key={course.id} value={course.id}>{course.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Avatar</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="hidden md:table-cell">Email</TableHead>
                <TableHead className="hidden lg:table-cell">Courses</TableHead>
                <TableHead className="hidden md:table-cell text-center">Progress</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.length > 0 ? filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={student.avatarUrl} alt={student.name} data-ai-hint={student.aiHint}/>
                      <AvatarFallback>{student.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground">{student.email}</TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {student.enrolledCourses.slice(0,2).map(course => (
                        <Badge key={course} variant="secondary" className="text-xs">{course.length > 20 ? course.substring(0,18) + '...' : course}</Badge>
                      ))}
                      {student.enrolledCourses.length > 2 && <Badge variant="outline">+{student.enrolledCourses.length - 2} more</Badge>}
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-center">
                     <div className="flex items-center justify-center">
                        <span className="text-sm font-medium mr-2">{student.progress}%</span>
                        <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-primary" style={{ width: `${student.progress}%` }}></div>
                        </div>
                     </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontalIcon className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                            <ExternalLinkIcon className="mr-2 h-4 w-4" /> View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <FileTextIcon className="mr-2 h-4 w-4" /> View Progress
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <MessageSquareIcon className="mr-2 h-4 w-4" /> Message Student
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive focus:bg-destructive/10 focus:text-destructive">
                            <UserXIcon className="mr-2 h-4 w-4" /> Remove from Course
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                    No students found matching your criteria.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
