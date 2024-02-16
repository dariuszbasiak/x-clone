import {Post} from "../models/post.interface";
import * as DOMPurify from "dompurify";
import {AvatarIcon} from "./AvatarIcon";
import {Card, CardContent, CardHeader, IconButton} from "@mui/material";
import {CommentList} from "./CommentList";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {useSelector} from "react-redux";
import {AppState} from "../models/app-state.interface";
import {toggleLike, updatePost} from "../shared/update-post";
import {Link, useRevalidator} from "react-router-dom";

export function YItem({post}: { post: Post; children?: any }) {
  const userId = useSelector((state: AppState) => state.auth.user?.id);
  const revalidator = useRevalidator();
  const sanitizedText = () => ({
    __html: DOMPurify.sanitize(post.text),
  });
  const isLiked = post.likes?.includes(userId!);

  const handleToggleLike = async () => {
    if (userId) {

      const newPost = toggleLike(post, userId!);
      await updatePost(newPost);
      revalidator.revalidate();
    }
  };

  return (
      <div className="message-item pb-1 w-[550px]">
        <Card>
          <CardHeader
              avatar={<AvatarIcon username={post.author_id || ""}/>}
              title={
                <>
                  <span className="text-m">{post?.name}</span>
                  <Link
                      to={`/user-posts/${post?.author_id}`}
                      className="text-sky-600 hover:underline"
                  >
                    @{post?.author_id}
                  </Link>
                </>
              }
              action={
                <div className="flex-inline flex-nowrap">
                  <IconButton onClick={handleToggleLike}>
                    {!isLiked && (
                        <>
                    <span className="text-sm">
                      {post?.likes?.length > 0 && post?.likes?.length}
                    </span>
                          <FavoriteBorderIcon/>{" "}
                        </>
                    )}
                    {isLiked && (
                        <>
                    <span className="text-sm">
                      {post.likes.length > 0 && post?.likes?.length}
                    </span>
                          <FavoriteIcon/>
                        </>
                    )}
                  </IconButton>
                </div>
              }
          ></CardHeader>
          <CardContent className="y-item-card-content">
            {post && <p dangerouslySetInnerHTML={sanitizedText()}></p>}
            <CommentList post={post}/>
          </CardContent>
        </Card>
      </div>
  );
}
