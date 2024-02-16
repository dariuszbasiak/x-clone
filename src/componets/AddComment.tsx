import { Post } from "../models/post.interface";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { AppState } from "../models/app-state.interface";
import { TextareaAutosize } from "@mui/material";
import Button from "@mui/material/Button";
import { useRevalidator } from "react-router-dom";
import { addComment } from "../shared/update-comment";
import { updatePost } from "../shared/update-post";

export function AddComment({ post }: { post: Post }) {
  const inputRef = useRef<any>();
  const authState = useSelector((state: AppState) => state.auth);
  const revalidator = useRevalidator();

  const update = async () => {
    const newPost = addComment(post, inputRef?.current?.value, authState.user!);
    await updatePost(newPost);
    revalidator.revalidate();
  };

  const handleComment = async () => {
    await update();
  };

  return (
    <div className="flex gap-2 ">
      <TextareaAutosize
        ref={inputRef}
        className="size-full border-solid border-sky-500 border-2 rounded-s h-14"
      />
      <Button variant="outlined" onClick={handleComment}>
        Comment
      </Button>
    </div>
  );
}
