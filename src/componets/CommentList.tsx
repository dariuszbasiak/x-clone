import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
} from "@mui/material";
import { Post } from "../models/post.interface";
import { useSelector } from "react-redux";
import { AppState } from "../models/app-state.interface";
import { AddComment } from "./AddComment";
import { AvatarIcon } from "./AvatarIcon";
import { Link } from "react-router-dom";

export function CommentList({ post }: { post: Post | undefined }) {
  const isAuth = useSelector((state: AppState) => state.auth.isAuth);

  const comments = post?.comments;

  return (
    <Accordion>
      <AccordionSummary>
        {comments?.length && (
          <span className="text-sm">Comments {comments?.length}</span>
        )}
        {!comments?.length && (
          <span className="text-sm">No comments yet? Add some!</span>
        )}
      </AccordionSummary>
      <AccordionDetails>
        {isAuth && post && (
          <div>
            <AddComment post={post} />
          </div>
        )}
        {comments?.map((comment) => (
          <>
            <Divider orientation="horizontal" flexItem />
            <div className="text-sm flex items-center py-2 gap-3">
              <AvatarIcon
                username={comment.author_id}
                sx={{ width: 24, height: 24 }}
              />
              <span>{comment.name}</span>

              <Link
                to={`/user-posts/${post?.author_id}`}
                className="text-sky-600"
              >
                @{post?.author_id}
              </Link>
            </div>
            <p className="text-sm py-1">{comment.text}</p>
          </>
        ))}
      </AccordionDetails>
    </Accordion>
  );
}
