import { useQuery } from "@tanstack/react-query";
import { getCommentInfo } from "../../services/apiComments";

export function useCommentInfo({ userId, postId }) {
  const { data: commentInfo, isLoading } = useQuery({
    queryKey: ["CommentInfo", userId],
    queryFn: () => getCommentInfo({ userId, postId }),
  });

  return { commentInfo, isLoading };
}
