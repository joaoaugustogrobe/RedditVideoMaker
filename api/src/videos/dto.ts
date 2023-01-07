export class CreateVideoDto {
  id: string;
  community: string;
  title: string;
  description: string;
  author: string;
  upvotes: number;
  comments: Comment[];
  createdAt: Date;
}

export class Comment {
  id: string;
  parentId: string;
  author: string;
  body: string;
  upvotes: number;
  comments: Comment[];
  createdAt: Date;
}
