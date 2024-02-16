import { Post } from "../models/post.interface";
import { YItem } from "./YItem";

export function YList({ posts }: { posts: Post[]; children?: any }) {
  return (
    <>
      {posts?.length && (
        <div>
          {posts.map((post) => (
            <YItem key={post?.id} post={post} />
          ))}
        </div>
      )}
    </>
  );
}
