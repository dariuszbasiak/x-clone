import { Post } from "../models/post.interface";
import { User } from "../models/user.interface";

export const addComment = (post: Post, commentValue: string, user: User) => {
  if (!post.comments) {
    post.comments = [];
  }

  post.comments.push({
    text: commentValue || "",
    name: user!.name,
    author_id: user!.id,
  });

  return post;
};
