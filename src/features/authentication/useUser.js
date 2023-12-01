import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export function useUser() {
  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  return {
    user: data?.user?.user,
    userMeta: data?.UserMeta,
    isLoading,
    isAuthenticated: data?.user?.user?.role === "authenticated",
  };
}
