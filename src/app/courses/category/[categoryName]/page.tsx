
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CourseCard } from "@/components/cards/course-card";
import { Button } from "@/components/ui/button";
import { FilterIcon, ListFilterIcon, SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

interface CategoryPageProps {
  params: { categoryName: string };
}

// Dummy courses data - replace with actual data fetching based on categoryName
const allCourses = [
  { id: '1', title: 'Ultimate Next.js 14 Course', instructor: 'Alice Wonderland', imageUrl: 'https://placehold.co/400x225.png', category: 'Frontend', rating: 4.9, reviews: 1250, price: '$99.99', duration: '24 hours', aiHint: 'abstract code' },
  { id: '5', title: 'React Basics for Beginners', instructor: 'Eve Harrington', imageUrl: 'https://placehold.co/400x225.png', category: 'Frontend', rating: 4.5, reviews: 600, price: '$49.99', duration: '12 hours', aiHint: 'simple ui elements' },
  { id: '2', title: 'Python for Data Science Bootcamp', instructor: 'Bob The Builder', imageUrl: 'https://placehold.co/400x225.png', category: 'Data Science', rating: 4.8, reviews: 980, price: '$89.99', duration: '30 hours', aiHint: 'data charts' },
  { id: '6', title: 'Machine Learning A-Z', instructor: 'Frankenstein', imageUrl: 'https://placehold.co/400x225.png', category: 'Data Science', rating: 4.7, reviews: 1500, price: '$129.99', duration: '40 hours', aiHint: 'neural network' },
  { id: '3', title: 'Advanced Node.js & Microservices', instructor: 'Charlie Brown', imageUrl: 'https://placehold.co/400x225.png', category: 'Backend', rating: 4.7, reviews: 750, price: '$109.99', duration: '28 hours', aiHint: 'server architecture' },
  { id: '4', title: 'React Native: Build Mobile Apps', instructor: 'Diana Prince', imageUrl: 'https://placehold.co/400x225.png', category: 'Mobile', rating: 4.9, reviews: 1100, price: '$94.99', duration: '22 hours', aiHint: 'mobile app screen' },
];

// Map category slugs to display names and potential keywords
const categoryDetails: { [key: string]: { name: string, keywords: string[] } } = {
  frontend: { name: "Frontend Development", keywords: ["frontend", "web ui", "react", "vue", "angular"] },
  backend: { name: "Backend Development", keywords: ["backend", "server", "api", "node.js", "python django"] },
  mobile: { name: "Mobile App Development", keywords: ["mobile", "ios", "android", "react native", "swift", "kotlin"] },
  fullstack: { name: "Full Stack Development", keywords: ["fullstack", "web development"] },
  datascience: { name: "Data Science & ML", keywords: ["data science", "machine learning", "python", "r"] },
  devops: { name: "DevOps", keywords: ["devops", "ci/cd", "docker", "kubernetes"] },
};

const fetchCoursesByCategory = async (categorySlug: string) => {
  // Simulate API call and filtering
  await new Promise(resolve => setTimeout(resolve, 300));
  const categoryInfo = categoryDetails[categorySlug.toLowerCase()];
  if (!categoryInfo) return { courses: [], categoryName: "Unknown Category" };

  const filtered = allCourses.filter(course => 
    course.category.toLowerCase().replace(/\s+/g, '-') === categorySlug.toLowerCase() || 
    categoryInfo.keywords.some(kw => course.category.toLowerCase().includes(kw))
  );
  return { courses: filtered, categoryName: categoryInfo.name };
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { categoryName: slug } = params;
  const { courses, categoryName } = await fetchCoursesByCategory(slug);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-12 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-headline font-bold text-foreground mb-2">
              {categoryName} Courses
            </h1>
            <p className="text-lg text-muted-foreground">
              Explore courses in {categoryName.toLowerCase()}.
            </p>
          </div>

          {/* Filters and Search Bar */}
          <div className="mb-8 p-4 border rounded-lg bg-card shadow">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div className="relative md:col-span-1">
                <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search courses in this category..." className="pl-10 h-10" />
              </div>
              <div className="md:col-span-1">
                <Select defaultValue="popularity">
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popularity">Popularity</SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button variant="outline" className="h-10 w-full md:w-auto md:justify-self-end">
                <ListFilterIcon className="mr-2 h-4 w-4" /> More Filters
              </Button>
            </div>
          </div>

          {courses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {courses.map((course) => (
                <CourseCard key={course.id} {...course} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FilterIcon className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
              <h2 className="text-2xl font-semibold mb-2">No Courses Found</h2>
              <p className="text-muted-foreground mb-6">
                There are currently no courses available in the &quot;{categoryName}&quot; category matching your criteria.
              </p>
              <Button asChild>
                <Link href="/">Explore Other Categories</Link>
              </Button>
            </div>
          )}

          {/* Pagination (Placeholder) */}
          {courses.length > 12 && ( // Show pagination if more than 12 courses typically
            <div className="mt-12 flex justify-center">
              <Button variant="outline" className="mr-2">Previous</Button>
              <Button>Next</Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
