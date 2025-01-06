import { connectToDatabase } from '@utils/database';
import Prompt from '@models/prompt';

export type PromptType = {
  creator: string,
  tag: string,
  prompt: string,
}

export const GET = async (): Promise<PromptType[] | undefined> => {
  try {
    await connectToDatabase();
    const prompts: PromptType[] = await Prompt.find({}).populate('creator');
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    new Response('Failed to fetch all prompts', { status: 500 });
  }
};