import { connectToDatabase } from '@utils/database';
import Prompt from '@models/prompt';
import { PostType } from '@types/post';

export const GET = async (req: Request, { params }: { params: { id: string } }): Promise<Response | undefined> => {
  try {
    await connectToDatabase();
    const prompt: PostType | undefined | null = await Prompt.findById(params.id);
    if (!prompt) {
      return new Response('Prompt not found', { status: 404 });
    }
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    console.log(error);
    new Response('Failed to fetch  prompt', { status: 500 });
  }
};

export const PATCH = async (req: Request, { params }: { params: { id: string } }): Promise<Response | undefined> => {
  const { prompt, tag } = await req.json();
  try {
    await connectToDatabase();
    const existingPrompt = await Prompt.findById(params.id);

    if (!existingPrompt) {
      return new Response('Prompt not found', { status: 404 });
    }
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;
    existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    console.log(error);
    new Response('Failed to update prompt', { status: 500 });
  }
};

export const DELETE = async (req: Request, { params }: { params: { id: string } }): Promise<Response | undefined> => {
  try {
    await connectToDatabase();
    await Prompt.findByIdAndDelete(params.id);

    return new Response('Prompt deleted successfully', { status: 201 });

  } catch (error) {
    console.log(error);
    new Response('Failed to delete prompt', { status: 500 });
  }
};