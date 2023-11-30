import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getUserComments } from "../../services/apiComments";

export function useUserData() {
  const { usernameSlug } = useParams();
  const {
    data: userComments,
    isLoading,
    error,
  } = useQuery({
    queryKey: [usernameSlug],
    queryFn: () => getUserComments(usernameSlug),
  });

  if (error)
    throw new Error(`Kullanıcı bilgileri yüklenemedi: ${error.message}`);

  return { userComments, isLoading };
}
