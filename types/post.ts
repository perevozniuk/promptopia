import { ExistingUserType } from '@types/user';

export type PostType = {
  _id?: string;
  prompt: string;
  tag: string;
  creator?: ExistingUserType;
}