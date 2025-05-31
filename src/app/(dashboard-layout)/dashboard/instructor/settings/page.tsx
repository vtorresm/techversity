
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { BellIcon, CreditCardIcon, DollarSignIcon, LockIcon, PaletteIcon, ShieldCheckIcon, Trash2Icon } from "lucide-react";
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function InstructorSettingsPage() {
  const { toast } = useToast();
  const [darkMode, setDarkMode] = React.useState(false);

  const handleSettingChange = (settingName: string, value: any) => {
    console.log(`${settingName} changed to:`, value);
    toast({
      title: "Setting Updated",
      description: `${settingName} has been updated.`,
    });
  };
  
  const handlePasswordChange = () => {
    toast({
      title: "Password Change Initiated",
      description: "A link to change your password has been sent to your email (not really!).",
    });
  }
  
  const handleDeleteAccount = () => {
    toast({
        title: "Account Deletion Requested",
        description: "Your account deletion process has started (not really!).",
        variant: "destructive"
    });
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold">Instructor Settings</h1>
        <p className="text-muted-foreground">Manage your account, payout, and notification preferences.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-xl flex items-center">
            <BellIcon className="mr-2 h-5 w-5 text-primary" />
            Notification Settings
          </CardTitle>
          <CardDescription>Control how you receive updates and alerts.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between space-x-2 p-4 border rounded-lg">
            <Label htmlFor="new-enrollment-notifications" className="flex flex-col space-y-1">
              <span>New Enrollments</span>
              <span className="font-normal leading-snug text-muted-foreground">
                Get notified when a student enrolls in one of your courses.
              </span>
            </Label>
            <Switch id="new-enrollment-notifications" defaultChecked onCheckedChange={(checked) => handleSettingChange("New Enrollment Notifications", checked)} />
          </div>
          <div className="flex items-center justify-between space-x-2 p-4 border rounded-lg">
            <Label htmlFor="course-review-notifications" className="flex flex-col space-y-1">
              <span>New Course Reviews</span>
              <span className="font-normal leading-snug text-muted-foreground">
                Receive notifications for new student reviews and ratings.
              </span>
            </Label>
            <Switch id="course-review-notifications" defaultChecked onCheckedChange={(checked) => handleSettingChange("New Course Review Notifications", checked)} />
          </div>
          <div className="flex items-center justify-between space-x-2 p-4 border rounded-lg">
            <Label htmlFor="payout-notifications" className="flex flex-col space-y-1">
              <span>Payout Updates</span>
              <span className="font-normal leading-snug text-muted-foreground">
                Get notified about your monthly earnings and payouts.
              </span>
            </Label>
            <Switch id="payout-notifications" defaultChecked onCheckedChange={(checked) => handleSettingChange("Payout Notifications", checked)} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-xl flex items-center">
            <DollarSignIcon className="mr-2 h-5 w-5 text-primary" />
            Payout Settings
          </CardTitle>
          <CardDescription>Manage your bank account or PayPal for receiving earnings.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="p-4 border rounded-lg bg-muted/30">
                <Label htmlFor="paypal-email">PayPal Email</Label>
                <Input id="paypal-email" type="email" placeholder="your.paypal.email@example.com" className="mt-1" defaultValue="instructor@example.com" />
                <p className="text-xs text-muted-foreground mt-1">Earnings will be sent to this PayPal account.</p>
            </div>
            <Button>
                <CreditCardIcon className="mr-2 h-4 w-4" /> Update Payout Method
            </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-xl flex items-center">
            <PaletteIcon className="mr-2 h-5 w-5 text-primary" />
            Appearance
          </CardTitle>
          <CardDescription>Customize the look and feel of the platform.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between space-x-2 p-4 border rounded-lg">
            <Label htmlFor="dark-mode" className="flex flex-col space-y-1">
                <span>Dark Mode</span>
                <span className="font-normal leading-snug text-muted-foreground">
                    Enable dark theme for a different visual experience.
                </span>
            </Label>
            <Switch 
                id="dark-mode" 
                checked={darkMode} 
                onCheckedChange={(checked) => {
                    setDarkMode(checked);
                    handleSettingChange("Dark Mode", checked);
                    if (checked) document.documentElement.classList.add('dark');
                    else document.documentElement.classList.remove('dark');
                }}
            />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-xl flex items-center">
            <LockIcon className="mr-2 h-5 w-5 text-primary" />
            Account Security
          </CardTitle>
          <CardDescription>Manage your account security settings.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <Button variant="outline" onClick={handlePasswordChange}>
                <ShieldCheckIcon className="mr-2 h-4 w-4"/> Change Password
            </Button>
            <p className="text-sm text-muted-foreground">
                It&apos;s recommended to use a strong, unique password for your account.
            </p>
        </CardContent>
      </Card>

      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="font-headline text-xl flex items-center text-destructive">
            <Trash2Icon className="mr-2 h-5 w-5" />
            Danger Zone
          </CardTitle>
          <CardDescription>Irreversible actions related to your account.</CardDescription>
        </CardHeader>
        <CardContent>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="destructive">
                        <Trash2Icon className="mr-2 h-4 w-4"/> Delete Account
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your account, including all your courses and earnings data.
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteAccount} className="bg-destructive hover:bg-destructive/90">
                        Yes, delete my account
                    </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <p className="text-sm text-muted-foreground mt-2">
                Deleting your account will remove all your course content, student data, and financial information.
            </p>
        </CardContent>
      </Card>
    </div>
  );
}
