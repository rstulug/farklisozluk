import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useParams } from "react-router-dom";
import { updateCommentLikeNumber } from "../../services/apiComments";

export function useUpdateCommentsUnlike() {
  const queryClient = useQueryClient();
  const params = useParams();

  const { mutate: updateNumLike, status } = useMutation({
    mutationFn: ({ id, obj }) => updateCommentLikeNumber(id, obj),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["post", "comments", params.postSlug],
      }),
  });

  return { updateNumLike, status };
}
