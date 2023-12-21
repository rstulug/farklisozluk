import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateComment as updateCommentApi } from "../../services/apiComments";
import { useParams, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

export function useUpdateComment() {
  const [searchParams] = useSearchParams();
  const params = useParams();
  const queryClient = useQueryClient();

  const curPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const { mutate: updateComment, status } = useMutation({
    mutationFn: updateCommentApi,
    onSuccess: () => {
      queryClient.invalidateQueries([
        "comments",
        params.postSlug || params.usernameSlug,
        curPage,
      ]);
      toast.success("Yorum başarıyla düzenlendi");
    },
    onError: (err) =>
      toast.error(
        `Yorum düzenlenirken bir hata oluştu. Lütfen bir müddet sonra tekrar deneyiniz. Muhtemel hata nedeni:${err.message}`,
      ),
  });

  return { updateComment, status };
}
