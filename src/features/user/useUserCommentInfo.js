import { useQuery } from "@tanstack/react-query";

import { useUser } from "../authentication/useUser";
import { getUserCommentInfo } from "../../services/apiComments";

export function useUserCommentInfo() {
  const { userMeta } = useUser();

  const userId = userMeta?.id || 0;

  const { data: userCommentInfo, isLoading } = useQuery({
    queryKey: ["userCommentInfo", userId],
    queryFn: () => getUserCommentInfo(userId),
  });

  return { userCommentInfo, isLoading };
}
