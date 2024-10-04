import { User } from './user.interface';

export interface Blog {
  id: string;
  title: string;
  author: User;
  description: string;
  likes: number;
  comments: Comment[];
  createdAt: string;
}

export interface Comment {
  username: string;
  comment: string;
}
