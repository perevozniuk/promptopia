import Link from 'next/link';
import { FC } from 'react';
import { PostType } from '@types/post';

type FormProps = {
  type: string;
  post: PostType;
  setPost?: ({ prompt, tag }: { prompt: string, tag: string }) => void;
  submitting?: boolean;
  handleSubmit?: (e: React.FormEvent) => void;
}

const Form: FC<FormProps> = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <>
      <section className="flex-col w-full max-w-full flex-start">
        <h1 className="text-left head_text">
          <span className="blue_gradient">{type} Post</span>
        </h1>
        <p className="max-w-md text-left desc">
          {type} and share amazing prompts with the world, and let your
          imagination run wild with any AI-powered platform
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full max-w-2xl mt-10 gap-7 glassmorphism"
        >÷
          <label>
            <span className="text-base font-semibold text-gray-700 font-satoshi">
              Your AI Prompt
            </span>

            <textarea
              value={post.prompt}
              onChange={(e) => setPost?.({ ...post, prompt: e.target.value })}
              placeholder="Write your post here"
              required
              className="form_textarea "
            />
          </label>

          <label>
            <span className="text-base font-semibold text-gray-700 font-satoshi">
              Field of Prompt{' '}
              <span className="font-normal">
                (#product, #webdevelopment, #idea, etc.)
              </span>
            </span>
            <input
              value={post.tag}
              onChange={(e) => setPost?.({ ...post, tag: e.target.value })}
              type="text"
              placeholder="#Tag"
              required
              className="form_input"
            />
          </label>

          <div className="gap-4 mx-3 mb-5 flex-end">
            <Link href="/" className="text-sm text-gray-500">
              Cancel
            </Link>

            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
            >
              {submitting ? `${type}ing...` : type}
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Form;