
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AwardIcon, DownloadIcon, EyeIcon, Share2Icon, TrophyIcon } from "lucide-react";
import Link from "next/link";

// Sample data for earned certificates
const certificates = [
  { id: 'cert1', courseTitle: 'Ultimate Next.js 14 Course', dateEarned: '2024-03-15', instructor: 'Alice Wonderland', certificateUrl: '#' },
  { id: 'cert2', courseTitle: 'React Native: Build Mobile Apps', dateEarned: '2023-11-20', instructor: 'Diana Prince', certificateUrl: '#' },
];

export default function StudentCertificatesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold">My Certificates</h1>
        <p className="text-muted-foreground">View and manage certificates you&apos;ve earned.</p>
      </div>

      {certificates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certificates.map((cert) => (
            <Card key={cert.id} className="flex flex-col">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                    <div>
                        <AwardIcon className="h-10 w-10 text-amber-500 mb-3" />
                        <CardTitle className="font-headline text-xl">{cert.courseTitle}</CardTitle>
                        <CardDescription>Earned on: {cert.dateEarned}</CardDescription>
                    </div>
                    <TrophyIcon className="h-6 w-6 text-muted-foreground/50" />
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground">Instructor: {cert.instructor}</p>
              </CardContent>
              <div className="p-4 border-t flex flex-col sm:flex-row gap-2">
                <Button variant="outline" asChild className="flex-1">
                  <Link href={cert.certificateUrl} target="_blank" rel="noopener noreferrer">
                    <EyeIcon className="mr-2 h-4 w-4" /> View Certificate
                  </Link>
                </Button>
                <Button variant="secondary" className="flex-1">
                  <DownloadIcon className="mr-2 h-4 w-4" /> Download
                </Button>
                 <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                  <Share2Icon className="h-4 w-4" />
                  <span className="sr-only">Share Certificate</span>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-10 text-center">
            <AwardIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Certificates Yet</h3>
            <p className="text-muted-foreground mb-4">Complete courses to earn certificates and showcase your skills!</p>
            <Button asChild>
              <Link href="/dashboard/student/my-courses">Go to My Courses</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
