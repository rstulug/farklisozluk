import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCommentInfo as deleteCommentInfoApi } from "../../services/apiComments";
import { usePost } from "./usePost";
import { useUser } from "../authentication/useUser";

export function useDeleteCommentInfo() {
  const { post } = usePost();
  const { userMeta } = useUser();

  const userId = userMeta?.id || 0;
  const postId = post?.id || 0;

  const queryClient = useQueryClient;
  const { mutate: deleteCommentInfo, status } = useMutation({
    mutationFn: deleteCommentInfoApi,
    onSuccess: () =>
      queryClient.invalidateQueries(["CommentInfo", userId, postId]),
  });

  return { deleteCommentInfo, status };
}
