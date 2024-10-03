export interface Blog {
  id?: string;
  title: string;
  author: string;
  description: string;
  likes: number;
  comments: Comment[];
  createdAt: string;
}

export interface Comment {
  username: string;
  comment: string;
}
