
'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CameraIcon, Edit3Icon, SaveIcon, UserCircle2Icon } from "lucide-react";
import { useForm, Controller } from 'react-hook-form';
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
import { useToast } from "@/hooks/use-toast";
import React from "react";

const profileSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  bio: z.string().max(200, "Bio can be up to 200 characters.").optional(),
  linkedinUrl: z.string().url("Invalid URL format.").optional().or(z.literal('')),
  githubUrl: z.string().url("Invalid URL format.").optional().or(z.literal('')),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

// Sample user data
const user = {
  fullName: "Jane Doe",
  email: "jane.doe@example.com",
  avatarUrl: "https://placehold.co/128x128.png",
  aiHint: "woman smiling",
  bio: "Passionate learner and aspiring full-stack developer. Currently diving deep into Next.js and cloud technologies.",
  linkedinUrl: "https://linkedin.com/in/janedoe",
  githubUrl: "https://github.com/janedoe",
};


export default function StudentProfilePage() {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = React.useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: user.fullName,
      email: user.email,
      bio: user.bio || '',
      linkedinUrl: user.linkedinUrl || '',
      githubUrl: user.githubUrl || '',
    },
  });

  const onSubmit = (data: ProfileFormValues) => {
    console.log("Profile updated:", data);
    // Here you would typically send data to your backend
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
    });
    setIsEditing(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-headline font-bold">My Profile</h1>
            <p className="text-muted-foreground">Manage your personal information and preferences.</p>
        </div>
        <Button variant={isEditing ? "outline" : "default"} onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? <SaveIcon className="mr-2 h-4 w-4" /> : <Edit3Icon className="mr-2 h-4 w-4" />}
          {isEditing ? "Save Changes" : "Edit Profile"}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Avatar className="h-24 w-24 border-2 border-primary">
                <AvatarImage src={user.avatarUrl} alt={user.fullName} data-ai-hint={user.aiHint}/>
                <AvatarFallback>{user.fullName?.substring(0, 2).toUpperCase() || 'U'}</AvatarFallback>
              </Avatar>
              {isEditing && (
                <Button variant="outline" size="icon" className="absolute bottom-0 right-0 rounded-full h-8 w-8 bg-background hover:bg-muted">
                  <CameraIcon className="h-4 w-4" />
                  <span className="sr-only">Change picture</span>
                </Button>
              )}
            </div>
            <div>
              <CardTitle className="text-2xl font-headline">{form.watch('fullName')}</CardTitle>
              <CardDescription>{form.watch('email')}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your full name" {...field} disabled={!isEditing} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="your@email.com" {...field} disabled={!isEditing} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Tell us a bit about yourself..." {...field} rows={4} disabled={!isEditing} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                    control={form.control}
                    name="linkedinUrl"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>LinkedIn Profile URL</FormLabel>
                        <FormControl>
                            <Input placeholder="https://linkedin.com/in/yourprofile" {...field} disabled={!isEditing} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="githubUrl"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>GitHub Profile URL</FormLabel>
                        <FormControl>
                            <Input placeholder="https://github.com/yourusername" {...field} disabled={!isEditing} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
              </div>

              {isEditing && (
                <div className="flex justify-end gap-2">
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
