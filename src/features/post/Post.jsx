import CommentItem from "../../ui/CommentItem";
import Spinner from "../../ui/Spinner";
import Button from "../../ui/Button";

import { useComments } from "./useComments";
import { usePost } from "./usePost";
import { useUser } from "../authentication/useUser";

import { Tiptap } from "../../ui/Tiptap";
import { useInsertComment } from "./useInsertComment";

import { Controller, useForm } from "react-hook-form";
import { useCommentInfo } from "./useCommentInfo";
import Pagination from "../../ui/Pagination";
import { COMMENT_PER_PAGE } from "../../utils/constants";

function Post() {
  const { post, isLoading } = usePost();

  const { user, isLoading: isLoadingUser, isAuthenticated } = useUser();

  const { postComments, count, isLoading: isCommentLoading } = useComments();

  const { handleSubmit, control, reset } = useForm();

  const { insertComment, status } = useInsertComment();

  const { commentInfo, isLoading: isLoadingCommentInfo } = useCommentInfo({
    userId: user?.id,
    postId: post?.id,
    postTitleSlug: post?.titleSlug,
  });

  if (isLoading || isCommentLoading || isLoadingUser || isLoadingCommentInfo)
    return <Spinner />;

  function onSubmit({ comment }) {
    insertComment({ Post: post.id, User: user.id, comment });
  }

  return (
    <div className="ml-5 mt-2">
      <h2 className="mb-5 text-xl font-bold tracking-wide">{post.title}</h2>
      <ul>
        {postComments.map((comment) => (
          <CommentItem
            comment={comment}
            key={comment.id}
            likeStatus={commentInfo?.find(
              (comInfo) => comInfo.Comment === comment.id,
            )}
          />
        ))}
        {COMMENT_PER_PAGE < count && (
          <div className="flex justify-end">
            <Pagination count={count} />
          </div>
        )}
      </ul>
      {isAuthenticated && (
        <form
          className="border-t-2 border-black py-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label className="font-italic text-md mb-2">
            {`${post.title} hakkında bir şeyler yaz`}
          </label>
          <Controller
            render={({ field, fieldState, formState }) => (
              <Tiptap
                onChange={field.onChange}
                error={fieldState?.error}
                formState={formState}
                reset={reset}
              />
            )}
            control={control}
            name="comment"
            rules={{
              required: "Bu alan zorunludur",
              maxLength: {
                value: 500,
                message: "Yorumunuz 500 karakterden fazla olamaz",
              },
            }}
          />

          <Button
            type="green"
            size="small"
            btnName="Yolla gitsin"
            disabled={status.pending}
          />
        </form>
      )}
    </div>
  );
}

export default Post;
