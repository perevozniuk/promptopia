import PromptCard from './PromptCard';
import { FC } from 'react';
import { PostType } from '@types/post';

type ProfileProps = {
  name: string;
  desc: string;
  data: PostType[]
  handleEdit?: (post: PostType) => void;
  handleDelete?: (post: PostType) => void;
}

const Profile: FC<ProfileProps> = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className="w-full">
      <h1 className="text-left head_text">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="text-left desc">{desc}</p>

      <div className="mt-10 prompt_layout">
        {data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;