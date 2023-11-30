import { useMutation } from "@tanstack/react-query";
import { insertPost as insertPostApi } from "../../services/apiPost";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useInsertPost() {
  const navigate = useNavigate();
  const { mutate: insertPost, status } = useMutation({
    mutationFn: insertPostApi,
    onSuccess: (data) => {
      toast.success("Yeni konu başarıyla oluşturuldu");
      navigate(`/posts/${data.titleSlug}`);
    },
    onError: (err) => toast.error(err.message),
  });

  return { insertPost, status };
}
