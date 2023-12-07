import { useQuery } from "@tanstack/react-query";

import { getUserCommentInfo } from "../../services/apiComments";

export function useUserCommentInfo({ userId, secondUserId, usernameSlug }) {
  const { data: userCommentInfo, isLoading } = useQuery({
    queryKey: ["commentInfo", userId, usernameSlug],
    queryFn: () => getUserCommentInfo({ userId, secondUserId }),
  });

  return { userCommentInfo, isLoading };
}
