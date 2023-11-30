import { useMutation, useQueryClient } from "@tanstack/react-query";
import { insertComment as insertCommentApi } from "../../services/apiComments";
import { useParams } from "react-router-dom";

export function useInsertComment() {
  const queryClient = useQueryClient();
  const params = useParams();
  const { mutate: insertComment, status } = useMutation({
    mutationFn: insertCommentApi,
    onSuccess: queryClient.invalidateQueries([
      "post",
      "comments",
      params.postSlug,
    ]),
  });
  return { insertComment, status };
}
