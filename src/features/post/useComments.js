import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getPostComments } from "../../services/apiComments";

export function useComments() {
  const { postSlug } = useParams();

  const { data: postComments, isLoading } = useQuery({
    queryKey: ["comments", postSlug],
    queryFn: () => getPostComments(postSlug),
  });
  return { postComments, isLoading };
}
