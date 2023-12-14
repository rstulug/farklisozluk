import { useQueries } from "@tanstack/react-query";
import {
  getHighestLikedComment,
  getHighestLikedCommentLastDay,
  getLowestLikedComment,
  getLowestLikedCommentLastDay,
} from "../../services/apiComments";

const dashboardRequest = [
  { id: 1, fn: getHighestLikedComment() },
  { id: 2, fn: getLowestLikedComment() },
  { id: 3, fn: getHighestLikedCommentLastDay() },
  { id: 4, fn: getLowestLikedCommentLastDay() },
];

export function useCommentStats() {
  const results = useQueries({
    queries: dashboardRequest.map((data) => ({
      queryKey: ["dashboard", data.id],
      queryFn: () => data.fn,
      staleTime: 3600,
    })),
    combine: (results) => {
      return {
        data: results.map((result) => result.data),
        isLoading: results.some((result) => result.isLoading),
      };
    },
  });

  return results;
}
