import CommentItem from "../../ui/CommentItem";
import Spinner from "../../ui/Spinner";
import Button from "../../ui/Button";

import { useComments } from "./useComments";
import { usePost } from "./usePost";
import { useUser } from "../authentication/useUser";

import { Tiptap } from "../../ui/Tiptap";
import { useInsertComment } from "./useInsertComment";

import { Controller, useForm } from "react-hook-form";

function Post() {
  const { post, isLoading } = usePost();

  const {
    user,
    userMeta,
    isLoading: isLoadingUser,
    isAuthenticated,
  } = useUser();
  console.log(userMeta);

  const { postComments, isLoading: isCommentLoading } = useComments();
  const { handleSubmit, control } = useForm();

  const { insertComment, status } = useInsertComment();

  if (isLoading || isCommentLoading || isLoadingUser) return <Spinner />;

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
            isLiked={
              userMeta.liked_comments
                ? userMeta?.liked_comments?.some(
                    (liked) => liked === comment.id,
                  )
                : false
            }
            isUnliked={
              userMeta.unliked_comments
                ? userMeta?.unliked_comments?.some(
                    (unliked) => unliked === comment.id,
                  )
                : false
            }
          />
        ))}
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
            render={({ field, fieldState }) => (
              <Tiptap onChange={field.onChange} error={fieldState?.error} />
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
