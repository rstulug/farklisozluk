import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteComment as deleteCommentApi } from "../../services/apiComments";
import { useParams, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

export function useDeleteComment() {
  const params = useParams();
  const [searchParams] = useSearchParams();

  const curPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const queryClient = useQueryClient();
  const { mutate: deleteComment, isLoading: isDeleting } = useMutation({
    mutationFn: deleteCommentApi,
    onSuccess: () => {
      queryClient.invalidateQueries([
        "comments",
        params.postSlug || params.usernameSlug,
        curPage,
      ]);
      toast.success("Yorum başarıyla silindi");
    },
    onError: (err) =>
      toast.error(
        `Yorum silinirken bir hata oluştu. Bir müddet sonra tekrar deneyin. Muhtemel hata nedeni: ${err.message}`,
      ),
  });
  return { isDeleting, deleteComment };
}
