// Summarizes a discussion forum thread to provide a quick overview of the key points and solutions.

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeDiscussionForumInputSchema = z.object({
  discussionThread: z
    .string()
    .describe('The complete text of the discussion forum thread.'),
});
export type SummarizeDiscussionForumInput = z.infer<
  typeof SummarizeDiscussionForumInputSchema
>;

const SummarizeDiscussionForumOutputSchema = z.object({
  summary: z
    .string()
    .describe(
      'A concise summary of the discussion forum thread, highlighting key issues, solutions, and decisions.'
    ),
});
export type SummarizeDiscussionForumOutput = z.infer<
  typeof SummarizeDiscussionForumOutputSchema
>;

export async function summarizeDiscussionForum(
  input: SummarizeDiscussionForumInput
): Promise<SummarizeDiscussionForumOutput> {
  return summarizeDiscussionForumFlow(input);
}

const summarizeDiscussionForumPrompt = ai.definePrompt({
  name: 'summarizeDiscussionForumPrompt',
  input: {schema: SummarizeDiscussionForumInputSchema},
  output: {schema: SummarizeDiscussionForumOutputSchema},
  prompt: `You are an expert in summarizing online discussion forums.

  Please provide a concise summary of the following discussion thread, highlighting the main issues discussed, the proposed solutions, and any decisions reached.

  Discussion Thread:
  {{discussionThread}}`,
});

const summarizeDiscussionForumFlow = ai.defineFlow(
  {
    name: 'summarizeDiscussionForumFlow',
    inputSchema: SummarizeDiscussionForumInputSchema,
    outputSchema: SummarizeDiscussionForumOutputSchema,
  },
  async input => {
    const {output} = await summarizeDiscussionForumPrompt(input);
    return output!;
  }
);
