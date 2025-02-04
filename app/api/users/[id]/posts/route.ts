import { connectToDatabase } from '@utils/database';
import Prompt from '@models/prompt';
import { PostType } from '@types/post';


export const GET = async (req: Request, { params }: { params: { id: string } }) => {
  try {
    await connectToDatabase();
    const prompts: PostType[] = await Prompt.find({
      creator: params.id,
    }).populate('creator');
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    console.log(error);
    new Response('Failed to fetch all prompts', { status: 500 });
  }


};