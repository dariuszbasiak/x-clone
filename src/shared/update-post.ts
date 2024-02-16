import { Post } from "../models/post.interface";

export const updatePost = async (newPost: Post) => {
  await fetch("http://localhost:3001/tweets/" + newPost.id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...newPost,
    }),
  });
};

export const toggleLike = (post: Post, id: string) => {
  if (!post.likes?.length && id) {
    post.likes = [id];
    return post;
  }

  if (post.likes.includes(id)) {
    post.likes = post.likes.filter((item) => item !== id);
  } else if (id) {
    post.likes.push(id);
  }
  return post;
};
