import { connectToDatabase } from '@utils/database';
import Prompt from '@models/prompt';
import { PromptType } from '@app/api/prompt/route';

export const GET = async (req, { params }): Response<PromptType> => {
  try {
    await connectToDatabase();
    const prompt: PromptType | undefined | null = await Prompt.findById(params.id);
    if (!prompt) {
      return new Response('Prompt not found', { status: 404 });
    }
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    new Response('Failed to fetch  prompt', { status: 500 });
  }
};

export const PATCH = async (req, { params }) => {
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
    new Response('Failed to update prompt', { status: 500 });
  }
};

export const DELETE = async (req, { params }) => {
  try {
    await connectToDatabase();
    await Prompt.findByIdAndDelete(params.id);

    return new Response('Prompt deleted successfully', { status: 201 });

  } catch (error) {
    new Response('Failed to delete prompt', { status: 500 });
  }
};