import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getPost as getPostApi } from "../../services/apiPost";

export function usePost() {
  const { postSlug } = useParams();

  const { data: post, isLoading } = useQuery({
    queryKey: ["post", postSlug],
    queryFn: () => getPostApi(postSlug),
  });

  return { post, isLoading };
}
