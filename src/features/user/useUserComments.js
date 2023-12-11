import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";
import { getUserComments } from "../../services/apiComments";
import { COMMENT_PER_PAGE } from "../../utils/constants";

export function useUserComments() {
  const { usernameSlug } = useParams();
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  //Pagination
  const curPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const {
    data: { data: userComments, count } = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["comments", usernameSlug, curPage],
    queryFn: () => getUserComments({ usernameSlug, curPage }),
  });

  if (error)
    throw new Error(`Kullanıcı yorumları yüklenemedi: ${error.message}`);

  //Pre-fetching
  const pageCount = Math.ceil(count / COMMENT_PER_PAGE);

  if (curPage < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["comments", usernameSlug, curPage + 1],
      queryFn: () => getUserComments({ usernameSlug, curPage: curPage + 1 }),
    });
  }

  if (curPage > 1) {
    queryClient.prefetchQuery({
      queryKey: ["comments", usernameSlug, curPage - 1],
      queryFn: () => getUserComments({ usernameSlug, curPage: curPage - 1 }),
    });
  }
  return { userComments, count, isLoading };
}
