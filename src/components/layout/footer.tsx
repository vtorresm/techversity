import Link from 'next/link';
import { Logo } from '@/components/logo';
import { GithubIcon, LinkedinIcon, TwitterIcon } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Logo />
            <p className="mt-4 text-sm text-muted-foreground">
              Empowering the next generation of tech professionals.
            </p>
            <div className="mt-6 flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <GithubIcon className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <LinkedinIcon className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <TwitterIcon className="h-6 w-6" />
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-headline font-semibold text-foreground">Courses</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/#categories" className="text-sm text-muted-foreground hover:text-primary">Frontend</Link></li>
              <li><Link href="/#categories" className="text-sm text-muted-foreground hover:text-primary">Backend</Link></li>
              <li><Link href="/#categories" className="text-sm text-muted-foreground hover:text-primary">Mobile</Link></li>
              <li><Link href="/#categories" className="text-sm text-muted-foreground hover:text-primary">Data Science</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-headline font-semibold text-foreground">Company</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">About Us</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Careers</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Press</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Blog</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-headline font-semibold text-foreground">Support</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Help Center</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Contact Us</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-border pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Techversity. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}