import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCommentInfo as deleteCommentInfoApi } from "../../services/apiComments";
import { useParams } from "react-router-dom";
import { useUser } from "../authentication/useUser";

export function useDeleteCommentInfo() {
  const params = useParams();
  const { user } = useUser();

  const updateField = params?.postSlug || params?.usernameSlug;

  const queryClient = useQueryClient();
  const { mutate: deleteCommentInfo, status } = useMutation({
    mutationFn: deleteCommentInfoApi,
    onSuccess: () =>
      queryClient.invalidateQueries(["commentInfo", user?.id, updateField]),
  });

  return { deleteCommentInfo, status };
}
