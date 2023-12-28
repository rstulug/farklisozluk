import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserInfo as updateUserInfoApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

export function useUpdateUserInfo() {
  const queryClient = useQueryClient();
  const params = useParams();

  const { mutate: updateUserInfo, status } = useMutation({
    mutationFn: updateUserInfoApi,
    onSuccess: () => {
      toast.success("Kullanıcı bilgileri başarıyla güncellendi");
      queryClient.invalidateQueries(["user"]);
      queryClient.invalidateQueries(["user", params.usernameSlug]);
    },
    onError: (err) =>
      toast.error(
        `Kullanıcı bilgileri güncellenirken bir hata oluştu. Hata: ${err.messge}`,
      ),
  });

  return { updateUserInfo, status };
}
