import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { SummarizeForm } from './summarize-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BotIcon } from 'lucide-react';

export default function SummarizeDiscussionPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
                <BotIcon className="mx-auto h-16 w-16 text-primary mb-4" />
                <h1 className="text-4xl font-headline font-bold text-foreground mb-3">AI Discussion Summarizer</h1>
                <p className="text-lg text-muted-foreground">
                    Paste a lengthy discussion thread and let our AI provide a concise summary, highlighting key issues, solutions, and decisions.
                </p>
            </div>
            <Card className="shadow-xl">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Summarize Your Discussion</CardTitle>
                    <CardDescription>Enter the full text of the discussion thread below.</CardDescription>
                </CardHeader>
                <CardContent>
                    <SummarizeForm />
                </CardContent>
            </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}