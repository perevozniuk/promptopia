'use client';
import { FC } from 'react';
import { useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { PostType } from '@types/post';


type PromptCardProps = {
  post: PostType;
  handleEdit?: () => void;
  handleDelete?: () => void;
  handleTagClick?: (tag: string) => void;
}

const PromptCard: FC<PromptCardProps> = ({ post, handleEdit, handleDelete, handleTagClick }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const [copied, setCopied] = useState(false);

  const handleProfileClick = () => {
    if (session?.user?.id) {
      if (post?.creator?._id === session?.user.id) return router.push('/profile');
      router.push(`/profile/${post?.creator?._id}?name=${post?.creator?.username}`);
    }
  };

  const handleCopy = () => {
    setCopied(true);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(false), 3000);
  };

  const copyIcon = copied ? '/assets/icons/tick.svg' : '/assets/icons/copy.svg';
  const copyAltText = copied ? 'tick_icon' : 'copy_icon';

  return (
    <div className="prompt_card">
      <div className="flex items-start justify-between gap-5">
        <div
          className="flex items-center justify-start flex-1 cursor-pointer gap-3"
          onClick={handleProfileClick}
        >
          <Image
            src={post?.creator?.image}
            alt="user_image"
            width={40}
            height={40}
            className="object-contain rounded-full"
          />

          <div className="flex flex-col">
            <h3 className="font-semibold text-gray-900 font-satoshi">
              {post?.creator?.username}
            </h3>
            <p className="text-sm text-gray-500 font-inter">
              {post?.creator?.email}
            </p>
          </div>
        </div>

        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={copyIcon}
            alt={copyAltText}
            width={12}
            height={12}
          />
        </div>
      </div>

      <p className="my-4 text-sm text-gray-700 font-satoshi">{post.prompt}</p>
      <p
        className="text-sm cursor-pointer font-inter blue_gradient"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        #{post.tag}
      </p>

      {session?.user?.id === post?.creator?._id && pathName === '/profile' && (
        <div className="pt-3 mt-5 border-t border-gray-100 flex-center gap-4">
          <p
            className="text-sm cursor-pointer font-inter green_gradient"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className="text-sm cursor-pointer font-inter orange_gradient"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;