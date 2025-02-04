import { connectToDatabase } from '@utils/database';
import Prompt from '@models/prompt';
import { PostType } from '@types/post';


export const GET = async () => {
  try {
    await connectToDatabase();
    const prompts: PostType[] = await Prompt.find({}).populate('creator');
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    console.log(error);
    new Response('Failed to fetch all prompts', { status: 500 });
  }
};