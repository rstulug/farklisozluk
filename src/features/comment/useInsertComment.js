import { useMutation, useQueryClient } from "@tanstack/react-query";
import { insertComment as insertCommentApi } from "../../services/apiComments";
import { useParams, useSearchParams } from "react-router-dom";

export function useInsertComment() {
  const queryClient = useQueryClient();
  const params = useParams();
  const [searchParams] = useSearchParams();

  //Pagination
  const curPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const { mutate: insertComment, status } = useMutation({
    mutationFn: insertCommentApi,
    onSuccess: queryClient.invalidateQueries([
      "comments",
      params.postSlug,
      curPage,
    ]),
  });
  return { insertComment, status };
}
