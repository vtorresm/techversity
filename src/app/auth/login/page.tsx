'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AuthFormWrapper } from '@/components/auth-form-wrapper';
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
import { EyeIcon, EyeOffIcon, GithubIcon } from 'lucide-react';
import React from 'react';

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [showPassword, setShowPassword] = React.useState(false);
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function onSubmit(values: LoginFormValues) {
    // Handle login logic here
    console.log(values);
    // Example: router.push('/dashboard/student');
  }

  return (
    <AuthFormWrapper
      title="Welcome Back!"
      description="Sign in to access your courses and learning materials."
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="you@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                    <FormLabel>Password</FormLabel>
                    <Link href="#" className="text-sm text-primary hover:underline">
                        Forgot password?
                    </Link>
                </div>
                <FormControl>
                    <div className="relative">
                        <Input type={showPassword ? "text" : "password"} placeholder="••••••••" {...field} />
                        <Button 
                            type="button" 
                            variant="ghost" 
                            size="icon" 
                            className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 text-muted-foreground hover:text-primary"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                            <span className="sr-only">{showPassword ? 'Hide password' : 'Show password'}</span>
                        </Button>
                    </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
            Sign In
          </Button>
        </form>
      </Form>
      <div className="mt-6">
        <div className="relative">
            <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
            </div>
        </div>
        <Button variant="outline" className="w-full mt-4">
            <GithubIcon className="mr-2 h-4 w-4" />
            GitHub
        </Button>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{' '}
          <Link href="/auth/register" className="font-medium text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </AuthFormWrapper>
  );
}