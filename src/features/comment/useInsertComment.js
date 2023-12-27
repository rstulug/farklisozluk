import { useMutation, useQueryClient } from "@tanstack/react-query";
import { insertComment as insertCommentApi } from "../../services/apiComments";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useComments } from "./useComments";
import { COMMENT_PER_PAGE } from "../../utils/constants";

export function useInsertComment() {
  const queryClient = useQueryClient();
  const params = useParams();
  const { count } = useComments();
  const navigate = useNavigate();

  const lastPage = Math.ceil((count + 1) / COMMENT_PER_PAGE);

  const { mutate: insertComment, status } = useMutation({
    mutationFn: insertCommentApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["comments", params.postSlug, lastPage]);
      navigate(`/posts/${params.postSlug}?page=${lastPage}`);
    },
  });
  return { insertComment, status };
}
