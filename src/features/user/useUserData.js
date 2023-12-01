import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getUserData } from "../../services/apiAuth";

export function useUserData() {
  const { usernameSlug } = useParams();
  const {
    data: userData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user", usernameSlug],
    queryFn: () => getUserData(usernameSlug),
  });

  return { userData, isLoading, error };
}
