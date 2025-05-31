'use client';

import type { SummarizeDiscussionForumInput, SummarizeDiscussionForumOutput } from '@/ai/flows/summarize-discussion-forum';
import { summarizeDiscussionForum } from '@/ai/flows/summarize-discussion-forum';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2Icon, SparklesIcon } from 'lucide-react';
import { useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function SummarizeForm() {
  const [discussionThread, setDiscussionThread] = useState('');
  const [summary, setSummary] = useState<SummarizeDiscussionForumOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!discussionThread.trim()) {
      toast({
        title: 'Input Required',
        description: 'Please paste the discussion thread text.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    setSummary(null);
    setError(null);

    try {
      const input: SummarizeDiscussionForumInput = { discussionThread };
      const result = await summarizeDiscussionForum(input);
      setSummary(result);
      toast({
        title: 'Summary Generated!',
        description: 'Your discussion thread has been summarized successfully.',
      });
    } catch (err) {
      console.error('Error summarizing discussion:', err);
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`Failed to summarize discussion: ${errorMessage}`);
      toast({
        title: 'Error',
        description: `Failed to summarize: ${errorMessage}`,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Textarea
          placeholder="Paste your lengthy discussion thread here..."
          value={discussionThread}
          onChange={(e) => setDiscussionThread(e.target.value)}
          rows={15}
          className="w-full p-4 border rounded-md shadow-sm focus:ring-primary focus:border-primary"
          disabled={isLoading}
        />
        <p className="text-xs text-muted-foreground mt-1">
          The more detailed the thread, the better the summary. Minimum 50 characters recommended.
        </p>
      </div>
      <Button type="submit" disabled={isLoading || !discussionThread.trim()} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
        {isLoading ? (
          <>
            <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
            Summarizing...
          </>
        ) : (
          <>
            <SparklesIcon className="mr-2 h-4 w-4" />
            Generate Summary
          </>
        )}
      </Button>

      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {summary && (
        <Card className="mt-8 bg-secondary/30">
          <CardHeader>
            <CardTitle className="font-headline text-xl flex items-center">
                <SparklesIcon className="h-5 w-5 mr-2 text-primary" />
                AI Generated Summary
            </CardTitle>
            <CardDescription>Here is a concise overview of the discussion:</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none dark:prose-invert whitespace-pre-wrap rounded-md bg-background p-4 border">
                {summary.summary}
            </div>
          </CardContent>
        </Card>
      )}
    </form>
  );
}