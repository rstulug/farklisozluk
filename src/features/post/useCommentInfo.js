import { useQuery } from "@tanstack/react-query";
import { getCommentInfo } from "../../services/apiComments";
import { usePost } from "./usePost";
import { useUser } from "../authentication/useUser";

export function useCommentInfo() {
  const { post } = usePost();
  const { userMeta } = useUser();

  const userId = userMeta?.id || 0;
  const postId = post?.id || 0;

  const { data: commentInfo, isLoading } = useQuery({
    queryKey: ["CommentInfo", userId, postId],
    queryFn: () => getCommentInfo(userId, postId),
  });

  return { commentInfo, isLoading };
}
