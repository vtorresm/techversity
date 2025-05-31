
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { BellIcon, LockIcon, PaletteIcon, ShieldCheckIcon, Trash2Icon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
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


export default function StudentSettingsPage() {
  const { toast } = useToast();
  const [darkMode, setDarkMode] = React.useState(false); // Simplified, real implementation would use theme context

  const handleSettingChange = (settingName: string, value: any) => {
    console.log(`${settingName} changed to:`, value);
    toast({
      title: "Setting Updated",
      description: `${settingName} has been updated.`,
    });
  };

  const handlePasswordChange = () => {
    // Placeholder for password change logic
    toast({
      title: "Password Change Initiated",
      description: "A link to change your password has been sent to your email (not really!).",
    });
  }
  
  const handleDeleteAccount = () => {
    // Placeholder for account deletion logic
    toast({
        title: "Account Deletion Requested",
        description: "Your account deletion process has started (not really!).",
        variant: "destructive"
    });
  }


  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your account preferences and settings.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-xl flex items-center">
            <BellIcon className="mr-2 h-5 w-5 text-primary" />
            Notification Settings
          </CardTitle>
          <CardDescription>Choose how you receive notifications from Techversity.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between space-x-2 p-4 border rounded-lg">
            <Label htmlFor="email-notifications" className="flex flex-col space-y-1">
              <span>Email Notifications</span>
              <span className="font-normal leading-snug text-muted-foreground">
                Receive updates about course progress, new course recommendations, and platform news.
              </span>
            </Label>
            <Switch id="email-notifications" defaultChecked onCheckedChange={(checked) => handleSettingChange("Email Notifications", checked)}/>
          </div>
          <div className="flex items-center justify-between space-x-2 p-4 border rounded-lg">
            <Label htmlFor="push-notifications" className="flex flex-col space-y-1">
              <span>Push Notifications (Mobile App)</span>
              <span className="font-normal leading-snug text-muted-foreground">
                Get real-time alerts on your mobile device. (Requires app installation)
              </span>
            </Label>
            <Switch id="push-notifications" disabled onCheckedChange={(checked) => handleSettingChange("Push Notifications", checked)}/>
          </div>
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
                    // Add logic here to toggle dark mode class on html/body
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
                        This action cannot be undone. This will permanently delete your account and remove your data from our servers.
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
                Deleting your account will remove all your course progress, certificates, and personal information.
            </p>
        </CardContent>
      </Card>
    </div>
  );
}
