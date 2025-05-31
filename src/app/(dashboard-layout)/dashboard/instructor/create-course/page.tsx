
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { BookPlusIcon, CheckIcon, CloudUploadIcon, DollarSignIcon, LayersIcon, ListChecksIcon, PlusCircleIcon, SaveIcon } from "lucide-react";
import React, { useState } from "react";
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const courseModuleSchema = z.object({
  title: z.string().min(3, "Module title must be at least 3 characters."),
  lessons: z.array(z.object({
    title: z.string().min(3, "Lesson title must be at least 3 characters."),
    duration: z.string().regex(/^\d+ (minutes|hours)$/, "Duration must be like '30 minutes' or '1 hours'."),
  })).min(1, "Each module must have at least one lesson."),
});

const courseSchema = z.object({
  title: z.string().min(5, "Course title must be at least 5 characters."),
  description: z.string().min(20, "Description must be at least 20 characters."),
  category: z.string({ required_error: "Please select a category."}),
  price: z.preprocess(
    (a) => parseFloat(z.string().parse(a)),
    z.number().positive("Price must be a positive number.")
  ),
  coverImage: z.any().refine(file => file?.name, "Cover image is required."), // Basic check, more robust validation needed
  learningObjectives: z.array(z.object({ value: z.string().min(5, "Objective must be at least 5 characters.")})).min(3, "At least 3 learning objectives are required."),
  prerequisites: z.array(z.object({ value: z.string().min(5, "Prerequisite must be at least 5 characters.")})).optional(),
  modules: z.array(courseModuleSchema).min(1, "At least one module is required."),
});

type CourseFormValues = z.infer<typeof courseSchema>;

const categories = [
  { id: 'frontend', title: 'Frontend Development' },
  { id: 'backend', title: 'Backend Development' },
  { id: 'mobile', title: 'Mobile App Development' },
  { id: 'fullstack', title: 'Full Stack Development' },
  { id: 'datascience', title: 'Data Science & ML' },
  { id: 'devops', title: 'DevOps & Cloud' },
  { id: 'design', title: 'UI/UX Design' },
  { id: 'other', title: 'Other' },
];

export default function InstructorCreateCoursePage() {
  const { toast } = useToast();
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(null);

  const form = useForm<CourseFormValues>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: "",
      description: "",
      category: undefined,
      price: 0,
      coverImage: null,
      learningObjectives: [{value: ""}, {value: ""}, {value: ""}],
      prerequisites: [{value: ""}],
      modules: [{ title: "", lessons: [{ title: "", duration: "" }] }],
    },
  });

  const { fields: objectiveFields, append: appendObjective, remove: removeObjective } = useFieldArray({
    control: form.control,
    name: "learningObjectives",
  });
  const { fields: prerequisiteFields, append: appendPrerequisite, remove: removePrerequisite } = useFieldArray({
    control: form.control,
    name: "prerequisites",
  });
  const { fields: moduleFields, append: appendModule, remove: removeModule } = useFieldArray({
    control: form.control,
    name: "modules",
  });

  const onSubmit = (data: CourseFormValues) => {
    console.log("Course data submitted:", data);
    toast({
      title: "Course Created (Simulated)",
      description: `The course "${data.title}" has been submitted for review.`,
    });
    form.reset();
    setCoverImagePreview(null);
  };

  const handleCoverImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      form.setValue("coverImage", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      form.setValue("coverImage", null);
      setCoverImagePreview(null);
    }
  };


  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold flex items-center">
          <BookPlusIcon className="mr-3 h-8 w-8 text-primary" /> Create New Course
        </h1>
        <p className="text-muted-foreground">Fill in the details to launch your new course.</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Basic Information Card */}
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-xl">Basic Information</CardTitle>
              <CardDescription>Provide the fundamental details for your course.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course Title</FormLabel>
                    <FormControl><Input placeholder="e.g., Introduction to Web Development" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course Description</FormLabel>
                    <FormControl><Textarea placeholder="A brief summary of what this course is about..." {...field} rows={4} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger><SelectValue placeholder="Select a category" /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map(cat => <SelectItem key={cat.id} value={cat.id}>{cat.title}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price (USD)</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <DollarSignIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input type="number" placeholder="e.g., 49.99" {...field} onChange={e => field.onChange(e.target.value)} className="pl-8" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="coverImage"
                render={({ field }) => ( /* field is not directly used for input type file value */
                  <FormItem>
                    <FormLabel>Cover Image</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-4">
                        <label htmlFor="cover-image-upload" className="cursor-pointer flex items-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground">
                          <CloudUploadIcon className="h-4 w-4" />
                          Upload Image
                        </label>
                        <Input id="cover-image-upload" type="file" accept="image/*" onChange={handleCoverImageChange} className="hidden" />
                        {coverImagePreview && <Image src={coverImagePreview} alt="Cover preview" width={100} height={56} className="rounded-md object-cover h-14 w-24 border" data-ai-hint="course cover image" />}
                        {field.value?.name && !coverImagePreview && <span className="text-sm text-muted-foreground">{field.value.name}</span>}
                      </div>
                    </FormControl>
                    <FormDescription>Recommended size: 800x450 pixels. Max 2MB.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Learning Objectives & Prerequisites Card */}
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-xl flex items-center">
                <ListChecksIcon className="mr-2 h-5 w-5 text-primary" />
                Learning Details
              </CardTitle>
              <CardDescription>Specify what students will learn and what they need to know.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <FormLabel>Learning Objectives (at least 3)</FormLabel>
                {objectiveFields.map((field, index) => (
                  <FormField
                    key={field.id}
                    control={form.control}
                    name={`learningObjectives.${index}.value`}
                    render={({ field: objectiveInput }) => (
                      <FormItem className="flex items-center gap-2 mt-2">
                        <CheckIcon className="h-4 w-4 text-green-500 shrink-0" />
                        <FormControl><Input placeholder={`Objective ${index + 1}`} {...objectiveInput} /></FormControl>
                        {objectiveFields.length > 3 && <Button type="button" variant="ghost" size="icon" onClick={() => removeObjective(index)} className="text-destructive hover:text-destructive/80 shrink-0">&times;</Button>}
                        <FormMessage/>
                      </FormItem>
                    )}
                  />
                ))}
                <Button type="button" variant="outline" size="sm" onClick={() => appendObjective({ value: "" })} className="mt-2">
                  <PlusCircleIcon className="mr-2 h-4 w-4" /> Add Objective
                </Button>
              </div>
              <div>
                <FormLabel>Prerequisites (optional)</FormLabel>
                {prerequisiteFields.map((field, index) => (
                   <FormField
                    key={field.id}
                    control={form.control}
                    name={`prerequisites.${index}.value`}
                    render={({ field: prereqInput }) => (
                        <FormItem className="flex items-center gap-2 mt-2">
                            <LayersIcon className="h-4 w-4 text-blue-500 shrink-0" />
                            <FormControl><Input placeholder={`Prerequisite ${index + 1}`} {...prereqInput} /></FormControl>
                            <Button type="button" variant="ghost" size="icon" onClick={() => removePrerequisite(index)} className="text-destructive hover:text-destructive/80 shrink-0">&times;</Button>
                            <FormMessage/>
                        </FormItem>
                    )}
                  />
                ))}
                <Button type="button" variant="outline" size="sm" onClick={() => appendPrerequisite({ value: "" })} className="mt-2">
                  <PlusCircleIcon className="mr-2 h-4 w-4" /> Add Prerequisite
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Curriculum / Modules Card */}
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-xl">Course Curriculum</CardTitle>
              <CardDescription>Organize your course content into modules and lessons.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {moduleFields.map((moduleItem, moduleIndex) => (
                <Card key={moduleItem.id} className="p-4 bg-muted/50">
                  <FormField
                    control={form.control}
                    name={`modules.${moduleIndex}.title`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Module {moduleIndex + 1} Title</FormLabel>
                        <FormControl><Input placeholder={`e.g., Getting Started with HTML`} {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <LessonsFieldArray moduleIndex={moduleIndex} control={form.control} />
                  {moduleFields.length > 1 && (
                    <Button type="button" variant="destructive" size="sm" onClick={() => removeModule(moduleIndex)} className="mt-4">Remove Module</Button>
                  )}
                </Card>
              ))}
              <Button type="button" variant="outline" onClick={() => appendModule({ title: "", lessons: [{ title: "", duration: "" }] })}>
                <PlusCircleIcon className="mr-2 h-4 w-4" /> Add Module
              </Button>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => {form.reset(); setCoverImagePreview(null);}}>Discard</Button>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              <SaveIcon className="mr-2 h-4 w-4" />
              {form.formState.isSubmitting ? "Saving..." : "Save & Submit for Review"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

// Component for lesson field array within a module
function LessonsFieldArray({ moduleIndex, control }: { moduleIndex: number; control: any }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `modules.${moduleIndex}.lessons`,
  });

  return (
    <div className="ml-4 mt-4 space-y-3 border-l pl-4">
      <h4 className="text-sm font-medium">Lessons for Module {moduleIndex + 1}</h4>
      {fields.map((lessonItem, lessonIndex) => (
        <div key={lessonItem.id} className="p-3 border rounded-md bg-background space-y-2">
          <FormField
            control={control}
            name={`modules.${moduleIndex}.lessons.${lessonIndex}.title`}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">Lesson {lessonIndex + 1} Title</FormLabel>
                <FormControl><Input placeholder="e.g., HTML Tags" {...field} className="h-8 text-sm" /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={`modules.${moduleIndex}.lessons.${lessonIndex}.duration`}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">Lesson {lessonIndex + 1} Duration</FormLabel>
                <FormControl><Input placeholder="e.g., 30 minutes" {...field} className="h-8 text-sm" /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {fields.length > 1 && (
            <Button type="button" variant="ghost" size="sm" onClick={() => remove(lessonIndex)} className="text-destructive hover:text-destructive/90 text-xs p-1 h-auto">Remove Lesson</Button>
          )}
        </div>
      ))}
      <Button type="button" variant="link" size="sm" onClick={() => append({ title: "", duration: "" })} className="text-primary">
        <PlusCircleIcon className="mr-1 h-3 w-3" /> Add Lesson
      </Button>
    </div>
  );
}

