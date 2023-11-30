import { useQuery } from "@tanstack/react-query";
import { getAllPost } from "../../services/apiPost";

export function usePosts() {
  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: getAllPost,
  });

  return { posts, isLoading };
}
