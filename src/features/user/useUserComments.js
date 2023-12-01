import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getUserComments } from "../../services/apiComments";

export function useUserComments() {
  const { usernameSlug } = useParams();
  const {
    data: userComments,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["comments", usernameSlug],
    queryFn: () => getUserComments(usernameSlug),
  });

  if (error)
    throw new Error(`Kullanıcı yorumları yüklenemedi: ${error.message}`);

  return { userComments, isLoading };
}
