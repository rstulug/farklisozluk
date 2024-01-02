import { useQuery } from "@tanstack/react-query";
import { getAllPost } from "../../services/apiPost";
import { useSearchParams } from "react-router-dom";

export function usePosts() {
  const [searchParams] = useSearchParams();

  //Pagination
  const curPage = !searchParams.get("p") ? 1 : Number(searchParams.get("p"));

  const { data: { data: posts, count } = {}, isLoading } = useQuery({
    queryKey: ["posts", curPage],
    queryFn: () => getAllPost({ curPage }),
  });

  //Pre-fetch

  return { posts, count, isLoading };
}
