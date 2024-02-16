import { useLoaderData, useParams, useRoutes } from "react-router-dom";
import { YList } from "../componets/YList";
import { Post } from "../models/post.interface";

export function UserPostsPage() {
  const { id } = useParams();
  const posts: Post[] = useLoaderData() as Post[];

  return (
    <div className="column is-centered">
      <h3 className="text-2xl py-3">Post of {id}</h3>
      <YList posts={posts}></YList>
    </div>
  );
}
