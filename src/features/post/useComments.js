import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";
import { getPostComments } from "../../services/apiComments";
import { COMMENT_PER_PAGE } from "../../utils/constants";

export function useComments() {
  const { postSlug } = useParams();
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  //Pagination
  const curPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const {
    data: { data: postComments, count } = {},

    isLoading,
  } = useQuery({
    queryKey: ["comments", postSlug, curPage],
    queryFn: () => getPostComments({ postSlug, curPage }),
  });

  //Pre-fetching

  const pageCount = Math.ceil(count / COMMENT_PER_PAGE);

  if (curPage < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["comments", postSlug, curPage + 1],
      queryFn: () => getPostComments({ postSlug, curPage: curPage + 1 }),
    });
  }

  if (curPage > 1) {
    queryClient.prefetchQuery({
      queryKey: ["comments", postSlug, curPage - 1],
      queryFn: () => getPostComments({ postSlug, curPage: curPage - 1 }),
    });
  }

  return { postComments, count, isLoading };
}
