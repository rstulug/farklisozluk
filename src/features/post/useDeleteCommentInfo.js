import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCommentInfo as deleteCommentInfoApi } from "../../services/apiComments";

import { useUser } from "../authentication/useUser";

export function useDeleteCommentInfo() {
  const { userMeta } = useUser();

  const queryClient = useQueryClient;
  const { mutate: deleteCommentInfo, status } = useMutation({
    mutationFn: deleteCommentInfoApi,
    onSuccess: () =>
      queryClient.invalidateQueries(["CommentInfo", userMeta?.id]),
  });

  return { deleteCommentInfo, status };
}
