import { useQuery } from "@tanstack/react-query";
import { getPostCommentInfo } from "../../services/apiComments";

export function useCommentInfo({ userId, postId, postTitleSlug }) {
  const { data: commentInfo, isLoading } = useQuery({
    queryKey: ["commentInfo", userId, postTitleSlug],
    queryFn: () => getPostCommentInfo({ userId, postId }),
  });

  return { commentInfo, isLoading };
}
