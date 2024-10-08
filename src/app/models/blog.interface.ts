import { User } from './user.interface';

export interface Blog {
  id: string;
  title: string;
  author: User;
  description: string;
  likes: string[];
  comments: Comment[];
  createdAt: string;
}

export interface Comment {
  commentAuthor: User | null | undefined;
  comment: string;
  commentedAt: string;
}
