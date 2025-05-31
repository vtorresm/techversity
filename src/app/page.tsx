import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { CategoryCard } from '@/components/cards/category-card';
import { CourseCard } from '@/components/cards/course-card';
import { TestimonialCard } from '@/components/cards/testimonial-card';
import { ArrowRightIcon, BrainCircuitIcon, CloudCogIcon, CodeXmlIcon, DatabaseZapIcon, LayersIcon, SmartphoneIcon, StarIcon } from 'lucide-react';

const categories = [
  { id: 'frontend', title: 'Frontend Development', description: 'Master the art of creating beautiful and interactive user interfaces.', icon: CodeXmlIcon, courseCount: 25, href: '/courses/category/frontend', },
  { id: 'backend', title: 'Backend Development', description: 'Build robust and scalable server-side applications and APIs.', icon: DatabaseZapIcon, courseCount: 30, href: '/courses/category/backend', },
  { id: 'mobile', title: 'Mobile App Development', description: 'Create innovative applications for iOS and Android platforms.', icon: SmartphoneIcon, courseCount: 18, href: '/courses/category/mobile', },
  { id: 'fullstack', title: 'Full Stack Development', description: 'Become a versatile developer proficient in both frontend and backend.', icon: LayersIcon, courseCount: 22, href: '/courses/category/fullstack', },
  { id: 'datascience', title: 'Data Science & ML', description: 'Unlock insights from data and build intelligent systems.', icon: BrainCircuitIcon, courseCount: 15, href: '/courses/category/datascience', },
  { id: 'devops', title: 'DevOps', description: 'Streamline development and operations for faster, reliable software delivery.', icon: CloudCogIcon, courseCount: 12, href: '/courses/category/devops', },
];

const popularCourses = [
  { id: '1', title: 'Ultimate Next.js 14 Course', instructor: 'Alice Wonderland', imageUrl: 'https://placehold.co/400x225.png', category: 'Frontend', rating: 4.9, reviews: 1250, price: '$99.99', duration: '24 hours', aiHint: 'abstract code' },
  { id: '2', title: 'Python for Data Science Bootcamp', instructor: 'Bob The Builder', imageUrl: 'https://placehold.co/400x225.png', category: 'Data Science', rating: 4.8, reviews: 980, price: '$89.99', duration: '30 hours', aiHint: 'data visualization' },
  { id: '3', title: 'Advanced Node.js & Microservices', instructor: 'Charlie Brown', imageUrl: 'https://placehold.co/400x225.png', category: 'Backend', rating: 4.7, reviews: 750, price: '$109.99', duration: '28 hours', aiHint: 'network servers' },
  { id: '4', title: 'React Native: Build Mobile Apps', instructor: 'Diana Prince', imageUrl: 'https://placehold.co/400x225.png', category: 'Mobile', rating: 4.9, reviews: 1100, price: '$94.99', duration: '22 hours', aiHint: 'mobile interface' },
];

const testimonials = [
  { name: 'Sarah L.', role: 'Software Engineer, Google', avatarUrl: 'https://placehold.co/100x100.png', testimonial: 'Techversity courses are top-notch! I was able to upskill and land my dream job thanks to their comprehensive curriculum and supportive instructors.', aiHint: 'woman smiling' },
  { name: 'John B.', role: 'Full Stack Developer', avatarUrl: 'https://placehold.co/100x100.png', testimonial: 'The hands-on projects in the Full Stack course were incredibly valuable. I built a portfolio that really impressed employers.', aiHint: 'man glasses' },
  { name: 'Emily K.', role: 'Data Scientist', avatarUrl: 'https://placehold.co/100x100.png', testimonial: 'I highly recommend Techversity for anyone looking to break into Data Science. The instructors are experts in their field.', aiHint: 'person working' },
];

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero/Spotlight Banner Section */}
        <section className="relative bg-gradient-to-r from-primary to-purple-600 text-primary-foreground py-20 md:py-32">
          <div className="absolute inset-0">
            <Image 
              src="https://placehold.co/1920x800.png" 
              alt="Abstract background" 
              layout="fill" 
              objectFit="cover" 
              className="opacity-20"
              data-ai-hint="abstract technology" 
            />
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-headline font-extrabold mb-6">
              Unlock Your Tech Potential
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-10 max-w-3xl mx-auto">
              Master in-demand programming skills with expert-led courses. Start your journey with Techversity today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href="/#popular-courses">Explore Popular Courses</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                <Link href="/#categories">Browse Categories</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Course Categories Section */}
        <section id="categories" className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-headline font-bold text-foreground">Explore Our Course Categories</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Find the perfect course to match your interests and career goals.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((category) => (
                <CategoryCard key={category.id} {...category} />
              ))}
            </div>
          </div>
        </section>

        {/* Popular Courses Section */}
        <section id="popular-courses" className="py-16 lg:py-24 bg-secondary/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-headline font-bold text-foreground">Most Popular Courses</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Join thousands of students learning the most in-demand tech skills.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {popularCourses.map((course) => (
                <CourseCard key={course.id} {...course} />
              ))}
            </div>
            <div className="text-center mt-12">
              <Button size="lg" asChild variant="outline">
                <Link href="/courses">
                  View All Courses <ArrowRightIcon className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-headline font-bold text-foreground">What Our Students Say</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Real stories from learners who transformed their careers with Techversity.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard key={index} {...testimonial} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}