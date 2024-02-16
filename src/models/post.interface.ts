import { Comment } from "./comment.interface";

export interface Post {
  id: string;
  author_id: string;
  text: string;
  comments?: Comment[];
  likes: string[];
  name: string;
}
