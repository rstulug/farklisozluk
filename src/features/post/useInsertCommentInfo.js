import { useMutation, useQueryClient } from "@tanstack/react-query";
import { insertCommentInfo as insertCommentInfoApi } from "../../services/apiComments";
import { usePost } from "./usePost";
import { useUser } from "../authentication/useUser";
import toast from "react-hot-toast";

export function useInsertCommentInfo() {
  const { post } = usePost();
  const { userMeta } = useUser();
  const queryClient = useQueryClient();
  const { mutate: insertCommentInfo, status: insertStatus } = useMutation({
    mutationFn: ({ Comment, status }) =>
      insertCommentInfoApi({
        User: userMeta.id,
        Post: post.id,
        Comment,
        status,
      }),
    onSuccess: () =>
      queryClient.invalidateQueries(["CommentInfo", userMeta.id]),
    onError: (err) => toast.error(err.message),
  });

  return { insertCommentInfo, insertStatus };
}
