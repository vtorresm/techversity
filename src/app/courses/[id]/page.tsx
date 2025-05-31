import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, DownloadIcon, MessageSquareIcon, PlayCircleIcon, StarIcon, UsersIcon, BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface CoursePageProps {
  params: { id: string };
}

// Dummy course data - replace with actual data fetching
const fetchCourseData = async (id: string) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  if (id === "1") { // Example course
    return {
      id: "1",
      title: "Ultimate Next.js 14 Course",
      instructor: "Alice Wonderland",
      imageUrl: "https://placehold.co/800x450.png",
      aiHint: "web development illustration",
      category: "Frontend",
      rating: 4.9,
      reviews: 1250,
      price: "$99.99",
      duration: "24 hours",
      studentsEnrolled: 5320,
      description: "Master Next.js 14 from beginner to advanced! Learn server components, app router, data fetching, authentication, and deployment. Build real-world projects and become a Next.js pro.",
      prerequisites: ["Basic JavaScript knowledge", "Understanding of React fundamentals"],
      learningObjectives: [
        "Understand Next.js core concepts and App Router",
        "Implement server and client components effectively",
        "Manage state and data fetching strategies",
        "Build and deploy full-stack Next.js applications",
        "Integrate authentication and database solutions"
      ],
      resources: [
        { name: "Course Slides (PDF)", size: "5.2 MB" },
        { name: "Project Source Code (ZIP)", size: "12.8 MB" },
        { name: "Cheatsheet - Next.js Hooks", size: "0.5 MB" },
      ],
      curriculum: [
        { title: "Introduction to Next.js 14", lessons: 5, duration: "1.5 hours" },
        { title: "App Router Deep Dive", lessons: 10, duration: "4 hours" },
        { title: "Data Fetching & Caching", lessons: 8, duration: "3.5 hours" },
        { title: "Authentication & Authorization", lessons: 7, duration: "3 hours" },
        { title: "Styling in Next.js", lessons: 6, duration: "2.5 hours" },
        { title: "State Management", lessons: 5, duration: "2 hours" },
        { title: "Building & Deploying", lessons: 9, duration: "4 hours" },
        { title: "Advanced Topics & Best Practices", lessons: 5, duration: "3.5 hours" },
      ]
    };
  }
  return null; // Or throw an error for course not found
};

export default async function CourseDetailPage({ params }: CoursePageProps) {
  const course = await fetchCourseData(params.id);

  if (!course) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-bold mb-4">Course Not Found</h1>
          <p className="text-muted-foreground mb-6">Sorry, the course you are looking for does not exist or is unavailable.</p>
          <Button asChild>
            <Link href="/">Go to Homepage</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-secondary/30 py-8">
        {/* Course Header Section */}
        <section className="bg-primary text-primary-foreground py-12">
            <div className="container mx-auto px-4">
                <p className="text-sm text-primary-foreground/80 mb-2">Category: {course.category}</p>
                <h1 className="text-4xl font-headline font-bold mb-3">{course.title}</h1>
                <p className="text-lg text-primary-foreground/90 max-w-3xl mb-4">{course.description.substring(0, 150)}...</p>
                <div className="flex items-center space-x-4 mb-2 text-sm">
                    <span>Taught by: <span className="font-semibold">{course.instructor}</span></span>
                    <div className="flex items-center">
                        <StarIcon className="h-4 w-4 text-amber-400 fill-amber-400 mr-1" />
                        <span>{course.rating} ({course.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center">
                        <UsersIcon className="h-4 w-4 mr-1" />
                        <span>{course.studentsEnrolled} students</span>
                    </div>
                </div>
            </div>
        </section>

        <div className="container mx-auto px-4 py-8 grid lg:grid-cols-3 gap-8">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline text-2xl">What you&apos;ll learn</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                  {course.learningObjectives.map((obj, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-headline text-2xl">Course Curriculum</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                {course.curriculum.map((section, index) => (
                  <div key={index} className="p-3 border rounded-md bg-background hover:shadow-sm transition-shadow">
                    <div className="flex justify-between items-center">
                        <h4 className="font-semibold text-foreground">{section.title}</h4>
                        <span className="text-xs text-muted-foreground">{section.lessons} lessons &bull; {section.duration}</span>
                    </div>
                  </div>
                ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-headline text-2xl">Description</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none dark:prose-invert">
                <p>{course.description}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="font-headline text-2xl">Prerequisites</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-1">
                  {course.prerequisites.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

          </div>

          {/* Sidebar/Purchase Column */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="sticky top-24 shadow-xl">
              <CardHeader className="p-0 relative">
                <Image src={course.imageUrl} alt={course.title} width={800} height={450} className="rounded-t-lg w-full h-auto" data-ai-hint={course.aiHint}/>
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center rounded-t-lg">
                    <PlayCircleIcon className="h-16 w-16 text-white/80 hover:text-white cursor-pointer transition-colors" />
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="text-3xl font-bold text-primary mb-4">{course.price}</div>
                <Button size="lg" className="w-full bg-accent hover:bg-accent/90">Enroll Now</Button>
                <Button size="lg" variant="outline" className="w-full">Add to Wishlist</Button>
                <p className="text-xs text-muted-foreground text-center">30-Day Money-Back Guarantee</p>
                <hr/>
                <h4 className="font-semibold text-md">This course includes:</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center"><BookOpen className="h-4 w-4 mr-2 text-primary"/>{course.duration} on-demand video</li>
                    <li className="flex items-center"><DownloadIcon className="h-4 w-4 mr-2 text-primary"/>{course.resources.length} downloadable resources</li>
                    <li className="flex items-center"><MessageSquareIcon className="h-4 w-4 mr-2 text-primary"/>Access to course forum</li>
                    <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-primary"/>Certificate of completion</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-lg">Downloadable Resources</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-2">
                        {course.resources.map((res, idx) => (
                            <li key={idx} className="flex items-center justify-between text-sm p-2 bg-muted/50 rounded-md">
                                <div className="flex items-center">
                                    <DownloadIcon className="h-4 w-4 mr-2 text-primary" />
                                    <span>{res.name}</span>
                                