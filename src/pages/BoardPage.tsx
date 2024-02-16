import { useLoaderData } from "react-router-dom";
import { YList } from "../componets/YList";
import { AddY } from "../componets/AddY";
import { useSelector } from "react-redux";
import { AppState } from "../models/app-state.interface";
import { Post } from "../models/post.interface";

export function BoardPage() {
  const isAuth = useSelector((state: AppState) => state.auth.isAuth);

  const posts: Post[] = useLoaderData() as Post[];

  return (
    <div className="column is-centered">
      <h3 className="text-2xl py-3">Your current feeds</h3>
      {isAuth && <AddY />}
      <YList posts={posts}></YList>
    </div>
  );
}

export const getPosts = async (searchName = "") => {
  const params = searchName.length ? `?author_id=${searchName}` : "";
  const data = await fetch("http://localhost:3001/tweets" + params);
  return data.json();
};
