import { connectToDatabase } from '@utils/database';
import Prompt from '@models/prompt';
import { PromptType } from '@app/api/prompt/route';

export const GET = async (req, { params }): Promise<PromptType[] | undefined> => {
  try {
    await connectToDatabase();
    const prompts: PromptType[] = await Prompt.find({
      creator: params.id,
    }).populate('creator');
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    new Response('Failed to fetch all prompts', { status: 500 });
  }


};