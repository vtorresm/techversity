
'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { CameraIcon, Edit3Icon, GlobeIcon, LinkedinIcon, SaveIcon, TwitterIcon } from "lucide-react";
import React from "react";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const instructorProfileSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters."),
  headline: z.string().min(10, "Headline must be at least 10 characters.").max(100, "Headline max 100 characters."),
  bio: z.string().min(50, "Bio must be at least 50 characters.").max(500, "Bio max 500 characters."),
  websiteUrl: z.string().url("Invalid URL.").optional().or(z.literal('')),
  linkedinUrl: z.string().url("Invalid LinkedIn URL.").optional().or(z.literal('')),
  twitterUrl: z.string().url("Invalid Twitter URL.").optional().or(z.literal('')),
});

type InstructorProfileFormValues = z.infer<typeof instructorProfileSchema>;

// Sample instructor data
const instructor = {
  fullName: "Dr. Alice Expert",
  email: "alice.expert@example.com", // Not editable in this form, shown for context
  avatarUrl: "https://placehold.co/128x128.png",
  aiHint: "professional woman",
  headline: "Senior AI Researcher & Educator | Author of 'The Future of AI'",
  bio: "With over 15 years of experience in artificial intelligence and machine learning, Dr. Expert is passionate about making complex topics accessible. She has taught thousands of students worldwide and contributed to several open-source AI projects. Her research focuses on ethical AI and its societal impact.",
  websiteUrl: "https://aliceexpert.com",
  linkedinUrl: "https://linkedin.com/in/aliceexpert",
  twitterUrl: "https://twitter.com/aliceexpert",
};

export default function InstructorProfilePage() {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = React.useState(false);

  const form = useForm<InstructorProfileFormValues>({
    resolver: zodResolver(instructorProfileSchema),
    defaultValues: {
      fullName: instructor.fullName,
      headline: instructor.headline,
      bio: instructor.bio,
      websiteUrl: instructor.websiteUrl || '',
      linkedinUrl: instructor.linkedinUrl || '',
      twitterUrl: instructor.twitterUrl || '',
    },
  });

  const onSubmit = (data: InstructorProfileFormValues) => {
    console.log("Instructor profile updated:", data);
    toast({
      title: "Profile Updated",
      description: "Your instructor profile has been saved successfully.",
    });
    setIsEditing(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-headline font-bold">Instructor Profile</h1>
          <p className="text-muted-foreground">Manage your public-facing instructor profile.</p>
        </div>
        <Button variant={isEditing ? "outline" : "default"} onClick={() => {
            if (isEditing) {
                form.handleSubmit(onSubmit)(); // Trigger form submission
            } else {
                setIsEditing(true);
            }
        }}>
          {isEditing ? <SaveIcon className="mr-2 h-4 w-4" /> : <Edit3Icon className="mr-2 h-4 w-4" />}
          {isEditing ? "Save Profile" : "Edit Profile"}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="relative shrink-0">
              <Avatar className="h-32 w-32 border-4 border-primary shadow-md">
                <AvatarImage src={instructor.avatarUrl} alt={form.watch('fullName')} data-ai-hint={instructor.aiHint} />
                <AvatarFallback>{form.watch('fullName')?.substring(0, 2).toUpperCase() || 'AE'}</AvatarFallback>
              </Avatar>
              {isEditing && (
                <Button variant="outline" size="icon" className="absolute bottom-1 right-1 rounded-full h-10 w-10 bg-background hover:bg-muted shadow-md">
                  <CameraIcon className="h-5 w-5" />
                  <span className="sr-only">Change picture</span>
                </Button>
              )}
            </div>
            <div className="space-y-1">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Full Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Your full name" 
                        {...field} 
                        disabled={!isEditing} 
                        className={`text-2xl font-headline font-bold border-0 p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0 ${!isEditing ? 'bg-transparent' : 'bg-input/20 px-2 py-1 rounded-md'}`} 
                      />
                    </FormControl>
                    <FormMessage className="text-xs"/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="headline"
                render={({ field }) => (
                  <FormItem>
                     <FormLabel className="sr-only">Headline</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Your professional headline" 
                        {...field} 
                        disabled={!isEditing} 
                        className={`text-sm text-muted-foreground border-0 p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0 ${!isEditing ? 'bg-transparent' : 'bg-input/20 px-2 py-1 rounded-md'}`} 
                       />
                    </FormControl>
                     <FormMessage className="text-xs"/>
                  </FormItem>
                )}
              />
              <p className="text-xs text-muted-foreground">{instructor.email} (Email not editable here)</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Biography</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Share your experience, expertise, and teaching philosophy..." 
                        {...field} 
                        rows={6} 
                        disabled={!isEditing} 
                        className={!isEditing ? 'text-muted-foreground' : ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <h3 className="text-lg font-semibold text-foreground pt-4 border-t">Social & Professional Links</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="websiteUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center"><GlobeIcon className="mr-2 h-4 w-4 text-primary"/>Website URL</FormLabel>
                      <FormControl><Input placeholder="https://yourpersonalwebsite.com" {...field} disabled={!isEditing} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="linkedinUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center"><LinkedinIcon className="mr-2 h-4 w-4 text-primary"/>LinkedIn Profile URL</FormLabel>
                      <FormControl><Input placeholder="https://linkedin.com/in/yourprofile" {...field} disabled={!isEditing} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="twitterUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center"><TwitterIcon className="mr-2 h-4 w-4 text-primary"/>Twitter Profile URL</FormLabel>
                      <FormControl><Input placeholder="https://twitter.com/yourhandle" {...field} disabled={!isEditing} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {isEditing && (
                <div className="flex justify-end gap-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => { form.reset(); setIsEditing(false); }}>Cancel</Button>
                  <Button type="submit">
                    <SaveIcon className="mr-2 h-4 w-4" /> Save Changes
                  </Button>
                </div>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
